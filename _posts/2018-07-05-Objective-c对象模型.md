---
title: Objective-c 对象模型
description: ""
tags: [iOS,Runtime]
layout: post
---

# 对象

在 Objective-C 中，每一个对象都是某个类的实例，在苹果开源的 Runtime 文件中我们发现这样的定义

```c
typedef struct objc_object *id;
```

关于 `objc_object` 的定义：

```c++
struct objc_object {
private:
    isa_t isa;

public:
....
}
```

这里就看出，为什么 `id` 类型可以代表所有的对象。

# 类

描述了对象的属性、方法、成员变量、内存大小等。我们具体来看看类的结构

```c
typedef struct objc_class *Class;
```

关于 `objc_class` 的定义：

```c++
struct objc_class : objc_object {
    // Class ISA;
    Class superclass;
    cache_t cache;             // formerly cache pointer and vtable
    class_data_bits_t bits;    // class_rw_t * plus custom rr/alloc flags
    ...
}
```

## isa

通常的，我们经常简单的理解 `isa` 是对象指向自己类的一个指针，每个类又指向自己对应的元类。这里涉及一些方法调用相关知识，这里先不赘述。下面的图大致描述了类之间 `isa` 指针的关系。

![relation of class]({{size.url}}/images/post/class-meta-relative.jpg)

`isa` 本质上是结构体 `isa_t`  定义如下：（针对 `__x86_64__` 架构下的定义）

```c
union isa_t 
{
    isa_t() { }
    isa_t(uintptr_t value) : bits(value) { }

    Class cls;
    uintptr_t bits;
    
#   define ISA_MASK        0x00007ffffffffff8ULL
#   define ISA_MAGIC_MASK  0x001f800000000001ULL
#   define ISA_MAGIC_VALUE 0x001d800000000001ULL
    struct {
        uintptr_t indexed           : 1;
        uintptr_t has_assoc         : 1;  // 对象含有或者曾经含有关联引用，没有关联引用的可以更快地释放内存
        uintptr_t has_cxx_dtor      : 1;  // 表示该对象是否有 C++ 或者 Objc 的析构器
        uintptr_t shiftcls          : 44; // MACH_VM_MAX_ADDRESS 0x7fffffe00000  类的指针
        uintptr_t magic             : 6;  // 判断对象是否初始化完成，在arm64中0x16是调试器判断当前对象是真的对象还是没有初始化的空间。
        uintptr_t weakly_referenced : 1;  // 对象被指向或者曾经指向一个 ARC 的弱变量，没有弱引用的对象可以更快释放
        uintptr_t deallocating      : 1;  // 对象是否正在释放内存
        uintptr_t has_sidetable_rc  : 1;  // 判断该对象的引用计数是否过大，如果过大则需要其他散列表来进行存储。
        uintptr_t extra_rc          : 8;  // 存放该对象的引用计数值减一后的结果。对象的引用计数超过 1，会存在这个这个里面，如果引用计数为 10，extra_rc的值就为 9。
#       define RC_ONE   (1ULL<<56)
#       define RC_HALF  (1ULL<<7)
    };
};
```

可以看到 `isa_t` 是一个 `union` 意味着 `isa_t`、 `cls`、`bits` 以及下面的结构体共用一块地址空间，总空间大小会占据 64 位地址空间。（结构体所占用空间最大）

![relation of class]({{size.url}}/images/post/isa_t_s.png)

## `isa` 初始化

```c++
// initIsa() should be used to init the isa of new objects only.
// If this object already has an isa, use changeIsa() for correctness.
// initInstanceIsa(): objects with no custom RR/AWZ
// initClassIsa(): class objects
// initProtocolIsa(): protocol objects
// initIsa(): other objects
void initIsa(Class cls /*indexed=false*/);
void initClassIsa(Class cls /*indexed=maybe*/);
void initProtocolIsa(Class cls /*indexed=maybe*/);
void initInstanceIsa(Class cls, bool hasCxxDtor);


inline void 
objc_object::initIsa(Class cls, bool indexed, bool hasCxxDtor) 
{ 
    assert(!isTaggedPointer()); 
    
    if (!indexed) {
        isa.cls = cls;
    } else {
        assert(!DisableIndexedIsa);
        isa.bits = ISA_MAGIC_VALUE;
        // isa.magic is part of ISA_MAGIC_VALUE
        // isa.indexed is part of ISA_MAGIC_VALUE
        isa.has_cxx_dtor = hasCxxDtor;
        isa.shiftcls = (uintptr_t)cls >> 3;
    }
}

inline void 
objc_object::initClassIsa(Class cls)
{
    if (DisableIndexedIsa) {
        initIsa(cls, false, false);
    } else {
        initIsa(cls, true, false);
    }
}

inline void
objc_object::initProtocolIsa(Class cls)
{
    return initClassIsa(cls);
}

inline void 
objc_object::initInstanceIsa(Class cls, bool hasCxxDtor)
{
    assert(!UseGC);
    assert(!cls->requiresRawIsa());
    assert(hasCxxDtor == cls->hasCxxDtor());

    initIsa(cls, true, hasCxxDtor);
}
```

### `indexed` 和 `magic`  

方法参数中 `indexed` 其实表示的是 `isa_t` 的类型，表示是否是指针型 `isa` 。当 `indexed` 为 `false` 时表示为指针型 `isa` 那么此时访问它的时返回的是 `cls` 的地址，即类的地址。

当 `indexed` 为 `true` 则是表示不是指针，不过包含了一些 `cls` 的信息。具体初始化我们看到为：

```c
isa.bits = ISA_MAGIC_VALUE;  // ISA_MAGIC_VALUE = 0x001d800000000001ULL
// isa.magic is part of ISA_MAGIC_VALUE
// isa.indexed is part of ISA_MAGIC_VALUE
```

此时转化成二进制后表示为：

![relation of class]({{size.url}}/images/post/isa_t_set.png)

看到 `magic` 被设置为 `111011` ，`indexed` 被设置为 `1` 。

### `has_cxx_dtor`

```c
isa.has_cxx_dtor = hasCxxDtor;
```

这里设置了表示该对象是否有 C++ 或者 Objc 的析构器，如果没有析构器就会快速释放内存。

### `shiftcls`

```c
isa.shiftcls = (uintptr_t)cls >> 3;
```

`shiftcls` 存储了类的地址，这里看到将当前的 `cls` 地址向右移了3个字节，是因为目前类指针是按照8字节对齐，所以让指针后3位为0来保证地址是8的倍数，这样就可以提高代码运行效率，具体说来就是字节对齐的意义了。这里就把为了字节对齐的3位舍弃来节约内存消耗。

### 获取原始 `isa` 地址

```c++
#   define ISA_MASK        0x00007ffffffffff8ULL
inline Class 
objc_object::ISA() 
{
    assert(!isTaggedPointer()); 
    return (Class)(isa.bits & ISA_MASK);
}
```

上面我们看到用结构体代替了原来的 `isa` 指针指向的类地址，这里就提供一个方法来获取 `cls` 地址。

## cache

`cache` 主要用于方法性能优化，都知道OC里面发消息都需要去方法表里面去查询，当方法很多，又存在继承关系的时候，方法的查询是很费时的，所以这里做了一个对方法进行缓存。下面看一下 `cache_t` 的定义：

```c++
typedef uint32_t mask_t;

struct cache_t {
    struct bucket_t *_buckets;
    mask_t _mask;
    mask_t _occupied;
}

typedef uintptr_t cache_key_t;

struct bucket_t {
private:
    cache_key_t _key;
    IMP _imp;
}
```

这里我们来看一下是怎么缓存的，下面是调用栈：

```c++
void cache_t::setBucketsAndMask(struct bucket_t *newBuckets, mask_t newMask)
    void cache_t::reallocate(mask_t oldCapacity, mask_t newCapacity)
        static void cache_fill_nolock(Class cls, SEL sel, IMP imp, id receiver)
            void cache_fill(Class cls, SEL sel, IMP imp, id receiver)
                IMP lookUpImpOrForward(Class cls, SEL sel, id inst, 
                                       bool initialize, bool cache, bool resolver)
                    IMP lookUpImpOrNil(Class cls, SEL sel, id inst, 
                                       bool initialize, bool cache, bool resolver)
                        Method class_getInstanceMethod(Class cls, SEL sel)
        
```

可以看到当我们调用 `Method class_getInstanceMethod(Class cls, SEL sel)` 如果此时缓存为空，则将 `IMP` 根据 `SEL` 缓存起来。

方法查询的过程的代码片段：

```c++
curClass = cls;
while ((curClass = curClass->superclass)) {
    // Superclass cache.
    imp = cache_getImp(curClass, sel);
    if (imp) {
        if (imp != (IMP)_objc_msgForward_impcache) {
            // Found the method in a superclass. Cache it in this class.
            log_and_fill_cache(cls, imp, sel, inst, curClass);
            goto done;
        }
        else {
            // Found a forward:: entry in a superclass.
            // Stop searching, but don't cache yet; call method 
            // resolver for this class first.
            break;
        }
    }

    // Superclass method list.
    meth = getMethodNoSuper_nolock(curClass, sel);
    if (meth) {
        log_and_fill_cache(cls, meth->imp, sel, inst, curClass);
        // log_and_fill_cache 除了写log 其实就调用了 cache_fill (cls, sel, imp, receiver);
        imp = meth->imp;
        goto done;
    }
}
```

可以看到从当前类开始查询，一直沿着 `superclass` 查询。找到后进行缓存：

```c++
static void cache_fill_nolock(Class cls, SEL sel, IMP imp, id receiver)
{
    cacheUpdateLock.assertLocked();

    // Never cache before +initialize is done
    if (!cls->isInitialized()) return;

    // Make sure the entry wasn't added to the cache by some other thread 
    // before we grabbed the cacheUpdateLock.
    if (cache_getImp(cls, sel)) return;

    cache_t *cache = getCache(cls);
    cache_key_t key = getKey(sel);

    // Use the cache as-is if it is less than 3/4 full
    mask_t newOccupied = cache->occupied() + 1;
    mask_t capacity = cache->capacity();
    if (cache->isConstantEmptyCache()) {
        // Cache is read-only. Replace it.
        cache->reallocate(capacity, capacity ?: INIT_CACHE_SIZE);
    }
    else if (newOccupied <= capacity / 4 * 3) {
        // Cache is less than 3/4 full. Use it as-is.
    }
    else {
        // Cache is too full. Expand it.
        cache->expand();
    }

    // Scan for the first unused slot and insert there.
    // There is guaranteed to be an empty slot because the 
    // minimum size is 4 and we resized at 3/4 full.
    bucket_t *bucket = cache->find(key, receiver);
    if (bucket->key() == 0) cache->incrementOccupied();
    bucket->set(key, imp);
}
```

通过 `sel` 找到对应的 `key` 然后通过 `key` 找到对应的 `bucket` 然后保存 `key` 、`imp` 。

## bits

这个字段主要是来获取一个类型为 `class_rw_t ` 值的指针。可以很直观的看出，这里保存了类的方法、属性，以及遵循的协议。

```c++
struct class_rw_t {
    uint32_t flags;
    uint32_t version;

    const class_ro_t *ro;

    method_array_t methods;
    property_array_t properties;
    protocol_array_t protocols;

    Class firstSubclass;
    Class nextSiblingClass;

    char *demangledName;
}
```

其中有个常量指针 `ro` ，里面保存了在编译期就确定的属性、方法和协议。

```c++
struct class_ro_t {
    uint32_t flags;
    uint32_t instanceStart;
    uint32_t instanceSize;
#ifdef __LP64__
    uint32_t reserved;
#endif

    const uint8_t * ivarLayout;
    
    const char * name;
    method_list_t * baseMethodList;
    protocol_list_t * baseProtocols;
    const ivar_list_t * ivars;

    const uint8_t * weakIvarLayout;
    property_list_t *baseProperties;

    method_list_t *baseMethods() const {
        return baseMethodList;
    }
};
```

在 Runtime 下执行下面的方法：

```c++
/***********************************************************************
* realizeClass
* Performs first-time initialization on class cls, 
* including allocating its read-write data.
* Returns the real class structure for the class. 
* Locking: runtimeLock must be write-locked by the caller
**********************************************************************/
static Class realizeClass(Class cls) {
    // 这里只列出关键代码
    const class_ro_t *ro = (const class_ro_t *)cls->data();
    class_rw_t *rw = (class_rw_t *)calloc(sizeof(class_rw_t), 1);
    rw->ro = ro;
    rw->flags = RW_REALIZED|RW_REALIZING;
    cls->setData(rw);
}
```

初始化的时候，先调用 `data()` 方法返回一个类型为 `class_rw_t` 强转为 `class_ro_t` 的指针，然后初始化一个 `class_rw_t` 然后将设置 `ro` ，以及相关 `flag` ，最后调用 `setData` 替换原来的。

在 `static Class realizeClass(Class cls)` 方法下面还有对类的方法的一些处理：

```c++
// Attach categories
methodizeClass(cls);



/****** implementation of methodizeClass ******/

// Install methods and properties that the class implements itself.
method_list_t *list = ro->baseMethods();
if (list) {
    prepareMethodLists(cls, &list, 1, YES, isBundleClass(cls));
    rw->methods.attachLists(&list, 1);
}

property_list_t *proplist = ro->baseProperties;
if (proplist) {
    rw->properties.attachLists(&proplist, 1);
}

protocol_list_t *protolist = ro->baseProtocols;
if (protolist) {
    rw->protocols.attachLists(&protolist, 1);
}

// Attach categories.
category_list *cats = unattachedCategoriesForClass(cls, true /*realizing*/);
attachCategories(cls, cats, false /*don't flush caches*/);
```

将类原始的方法、属性、协议添加到 `class_rw_t` 中，然后将分类中的方法也添加到 `class_rw_t` 方法列表中。而我们可以看到  `class_ro_t` 中  `    const ivar_list_t * ivars;`  实例变量已经在编译期确定内存地址作为静态变量保存起来了，这也是为什么不能向编译后的类添加实例变量的原因。