<template><div><p>从 Objective-C 对象模型来了解一下在 iOS 里面，类是如何被创建以及属性、方法、成员变量等内存是如何分配，来了解运行时的部分内容。</p>
<h1 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h1>
<p>在 Objective-C 中，每一个对象都是某个类的实例，在苹果开源的 Runtime 文件中我们发现这样的定义</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">objc_object</span> <span class="token operator">*</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关于 <code v-pre>objc_object</code> 的定义：</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>struct objc_object {
private:
    isa_t isa;

public:
....
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就看出，为什么 <code v-pre>id</code> 类型可以代表所有的对象。</p>
<h1 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h1>
<p>描述了对象的属性、方法、成员变量、内存大小等。我们具体来看看类的结构</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">objc_class</span> <span class="token operator">*</span>Class<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关于 <code v-pre>objc_class</code> 的定义：</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>struct objc_class : objc_object {
    // Class ISA;
    Class superclass;
    cache_t cache;             // formerly cache pointer and vtable
    class_data_bits_t bits;    // class_rw_t * plus custom rr/alloc flags
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="isa" tabindex="-1"><a class="header-anchor" href="#isa" aria-hidden="true">#</a> isa</h2>
<p>通常的，我们经常简单的理解 <code v-pre>isa</code> 是对象指向自己类的一个指针，每个类又指向自己对应的元类。这里涉及一些方法调用相关知识，这里先不赘述。下面的图大致描述了类之间 <code v-pre>isa</code> 指针的关系。</p>
<figure><img src="https://image-1257141638.cos.ap-guangzhou.myqcloud.com/post/class-meta-relative.jpg" alt="relation of class" tabindex="0" loading="lazy"><figcaption>relation of class</figcaption></figure>
<p><code v-pre>isa</code> 本质上是结构体 <code v-pre>isa_t</code>  定义如下：（针对 <code v-pre>__x86_64__</code> 架构下的定义）</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">union</span> <span class="token class-name">isa_t</span> 
<span class="token punctuation">{</span>
    <span class="token class-name">isa_t</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token class-name">isa_t</span><span class="token punctuation">(</span><span class="token class-name">uintptr_t</span> value<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">bits</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    Class cls<span class="token punctuation">;</span>
    <span class="token class-name">uintptr_t</span> bits<span class="token punctuation">;</span>
    
<span class="token macro property"><span class="token directive-hash">#</span>   <span class="token directive keyword">define</span> <span class="token macro-name">ISA_MASK</span>        <span class="token expression"><span class="token number">0x00007ffffffffff8ULL</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span>   <span class="token directive keyword">define</span> <span class="token macro-name">ISA_MAGIC_MASK</span>  <span class="token expression"><span class="token number">0x001f800000000001ULL</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span>   <span class="token directive keyword">define</span> <span class="token macro-name">ISA_MAGIC_VALUE</span> <span class="token expression"><span class="token number">0x001d800000000001ULL</span></span></span>
    <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        <span class="token class-name">uintptr_t</span> indexed           <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name">uintptr_t</span> has_assoc         <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>  <span class="token comment">// 对象含有或者曾经含有关联引用，没有关联引用的可以更快地释放内存</span>
        <span class="token class-name">uintptr_t</span> has_cxx_dtor      <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>  <span class="token comment">// 表示该对象是否有 C++ 或者 Objc 的析构器</span>
        <span class="token class-name">uintptr_t</span> shiftcls          <span class="token operator">:</span> <span class="token number">44</span><span class="token punctuation">;</span> <span class="token comment">// MACH_VM_MAX_ADDRESS 0x7fffffe00000  类的指针</span>
        <span class="token class-name">uintptr_t</span> magic             <span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">;</span>  <span class="token comment">// 判断对象是否初始化完成，在arm64中0x16是调试器判断当前对象是真的对象还是没有初始化的空间。</span>
        <span class="token class-name">uintptr_t</span> weakly_referenced <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>  <span class="token comment">// 对象被指向或者曾经指向一个 ARC 的弱变量，没有弱引用的对象可以更快释放</span>
        <span class="token class-name">uintptr_t</span> deallocating      <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>  <span class="token comment">// 对象是否正在释放内存</span>
        <span class="token class-name">uintptr_t</span> has_sidetable_rc  <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>  <span class="token comment">// 判断该对象的引用计数是否过大，如果过大则需要其他散列表来进行存储。</span>
        <span class="token class-name">uintptr_t</span> extra_rc          <span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">;</span>  <span class="token comment">// 存放该对象的引用计数值减一后的结果。对象的引用计数超过 1，会存在这个这个里面，如果引用计数为 10，extra_rc的值就为 9。</span>
<span class="token macro property"><span class="token directive-hash">#</span>       <span class="token directive keyword">define</span> <span class="token macro-name">RC_ONE</span>   <span class="token expression"><span class="token punctuation">(</span><span class="token number">1ULL</span><span class="token operator">&lt;&lt;</span><span class="token number">56</span><span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span>       <span class="token directive keyword">define</span> <span class="token macro-name">RC_HALF</span>  <span class="token expression"><span class="token punctuation">(</span><span class="token number">1ULL</span><span class="token operator">&lt;&lt;</span><span class="token number">7</span><span class="token punctuation">)</span></span></span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 <code v-pre>isa_t</code> 是一个 <code v-pre>union</code> 意味着 <code v-pre>isa_t</code>、 <code v-pre>cls</code>、<code v-pre>bits</code> 以及下面的结构体共用一块地址空间，总空间大小会占据 64 位地址空间。（结构体所占用空间最大）</p>
<figure><img src="https://image-1257141638.cos.ap-guangzhou.myqcloud.com/post/isa_t_s.png" alt="relation of class" tabindex="0" loading="lazy"><figcaption>relation of class</figcaption></figure>
<h2 id="isa-初始化" tabindex="-1"><a class="header-anchor" href="#isa-初始化" aria-hidden="true">#</a> <code v-pre>isa</code> 初始化</h2>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>// initIsa() should be used to init the isa of new objects only.
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
        isa.shiftcls = (uintptr_t)cls &gt;&gt; 3;
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
    assert(!cls-&gt;requiresRawIsa());
    assert(hasCxxDtor == cls-&gt;hasCxxDtor());

    initIsa(cls, true, hasCxxDtor);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="indexed-和-magic" tabindex="-1"><a class="header-anchor" href="#indexed-和-magic" aria-hidden="true">#</a> <code v-pre>indexed</code> 和 <code v-pre>magic</code></h3>
<p>方法参数中 <code v-pre>indexed</code> 其实表示的是 <code v-pre>isa_t</code> 的类型，表示是否是指针型 <code v-pre>isa</code> 。当 <code v-pre>indexed</code> 为 <code v-pre>false</code> 时表示为指针型 <code v-pre>isa</code> 那么此时访问它的时返回的是 <code v-pre>cls</code> 的地址，即类的地址。</p>
<p>当 <code v-pre>indexed</code> 为 <code v-pre>true</code> 则是表示不是指针，不过包含了一些 <code v-pre>cls</code> 的信息。具体初始化我们看到为：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>isa<span class="token punctuation">.</span>bits <span class="token operator">=</span> ISA_MAGIC_VALUE<span class="token punctuation">;</span>  <span class="token comment">// ISA_MAGIC_VALUE = 0x001d800000000001ULL</span>
<span class="token comment">// isa.magic is part of ISA_MAGIC_VALUE</span>
<span class="token comment">// isa.indexed is part of ISA_MAGIC_VALUE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时转化成二进制后表示为：</p>
<figure><img src="https://image-1257141638.cos.ap-guangzhou.myqcloud.com/post/isa_t_set.png" alt="relation of class" tabindex="0" loading="lazy"><figcaption>relation of class</figcaption></figure>
<p>看到 <code v-pre>magic</code> 被设置为 <code v-pre>111011</code> ，<code v-pre>indexed</code> 被设置为 <code v-pre>1</code> 。</p>
<h3 id="has-cxx-dtor" tabindex="-1"><a class="header-anchor" href="#has-cxx-dtor" aria-hidden="true">#</a> <code v-pre>has_cxx_dtor</code></h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>isa<span class="token punctuation">.</span>has_cxx_dtor <span class="token operator">=</span> hasCxxDtor<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里设置了表示该对象是否有 C++ 或者 Objc 的析构器，如果没有析构器就会快速释放内存。</p>
<h3 id="shiftcls" tabindex="-1"><a class="header-anchor" href="#shiftcls" aria-hidden="true">#</a> <code v-pre>shiftcls</code></h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>isa<span class="token punctuation">.</span>shiftcls <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">uintptr_t</span><span class="token punctuation">)</span>cls <span class="token operator">>></span> <span class="token number">3</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>shiftcls</code> 存储了类的地址，这里看到将当前的 <code v-pre>cls</code> 地址向右移了3个字节，是因为目前类指针是按照8字节对齐，所以让指针后3位为0来保证地址是8的倍数，这样就可以提高代码运行效率，具体说来就是字节对齐的意义了。这里就把为了字节对齐的3位舍弃来节约内存消耗。</p>
<h3 id="获取原始-isa-地址" tabindex="-1"><a class="header-anchor" href="#获取原始-isa-地址" aria-hidden="true">#</a> 获取原始 <code v-pre>isa</code> 地址</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#   define ISA_MASK        0x00007ffffffffff8ULL
inline Class 
objc_object::ISA() 
{
    assert(!isTaggedPointer()); 
    return (Class)(isa.bits &amp; ISA_MASK);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面我们看到用结构体代替了原来的 <code v-pre>isa</code> 指针指向的类地址，这里就提供一个方法来获取 <code v-pre>cls</code> 地址。</p>
<h2 id="cache" tabindex="-1"><a class="header-anchor" href="#cache" aria-hidden="true">#</a> cache</h2>
<p><code v-pre>cache</code> 主要用于方法性能优化，都知道OC里面发消息都需要去方法表里面去查询，当方法很多，又存在继承关系的时候，方法的查询是很费时的，所以这里做了一个对方法进行缓存。下面看一下 <code v-pre>cache_t</code> 的定义：</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>typedef uint32_t mask_t;

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们来看一下是怎么缓存的，下面是调用栈：</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>void cache_t::setBucketsAndMask(struct bucket_t *newBuckets, mask_t newMask)
    void cache_t::reallocate(mask_t oldCapacity, mask_t newCapacity)
        static void cache_fill_nolock(Class cls, SEL sel, IMP imp, id receiver)
            void cache_fill(Class cls, SEL sel, IMP imp, id receiver)
                IMP lookUpImpOrForward(Class cls, SEL sel, id inst, 
                                       bool initialize, bool cache, bool resolver)
                    IMP lookUpImpOrNil(Class cls, SEL sel, id inst, 
                                       bool initialize, bool cache, bool resolver)
                        Method class_getInstanceMethod(Class cls, SEL sel)
        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到当我们调用 <code v-pre>Method class_getInstanceMethod(Class cls, SEL sel)</code> 如果此时缓存为空，则将 <code v-pre>IMP</code> 根据 <code v-pre>SEL</code> 缓存起来。</p>
<p>方法查询的过程的代码片段：</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>curClass = cls;
while ((curClass = curClass-&gt;superclass)) {
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
        log_and_fill_cache(cls, meth-&gt;imp, sel, inst, curClass);
        // log_and_fill_cache 除了写log 其实就调用了 cache_fill (cls, sel, imp, receiver);
        imp = meth-&gt;imp;
        goto done;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到从当前类开始查询，一直沿着 <code v-pre>superclass</code> 查询。找到后进行缓存：</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>static void cache_fill_nolock(Class cls, SEL sel, IMP imp, id receiver)
{
    cacheUpdateLock.assertLocked();

    // Never cache before +initialize is done
    if (!cls-&gt;isInitialized()) return;

    // Make sure the entry wasn't added to the cache by some other thread 
    // before we grabbed the cacheUpdateLock.
    if (cache_getImp(cls, sel)) return;

    cache_t *cache = getCache(cls);
    cache_key_t key = getKey(sel);

    // Use the cache as-is if it is less than 3/4 full
    mask_t newOccupied = cache-&gt;occupied() + 1;
    mask_t capacity = cache-&gt;capacity();
    if (cache-&gt;isConstantEmptyCache()) {
        // Cache is read-only. Replace it.
        cache-&gt;reallocate(capacity, capacity ?: INIT_CACHE_SIZE);
    }
    else if (newOccupied &lt;= capacity / 4 * 3) {
        // Cache is less than 3/4 full. Use it as-is.
    }
    else {
        // Cache is too full. Expand it.
        cache-&gt;expand();
    }

    // Scan for the first unused slot and insert there.
    // There is guaranteed to be an empty slot because the 
    // minimum size is 4 and we resized at 3/4 full.
    bucket_t *bucket = cache-&gt;find(key, receiver);
    if (bucket-&gt;key() == 0) cache-&gt;incrementOccupied();
    bucket-&gt;set(key, imp);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code v-pre>sel</code> 找到对应的 <code v-pre>key</code> 然后通过 <code v-pre>key</code> 找到对应的 <code v-pre>bucket</code> 然后保存 <code v-pre>key</code> 、<code v-pre>imp</code> 。</p>
<h2 id="bits" tabindex="-1"><a class="header-anchor" href="#bits" aria-hidden="true">#</a> bits</h2>
<p>这个字段主要是来获取一个类型为 <code v-pre>class_rw_t </code> 值的指针。可以很直观的看出，这里保存了类的方法、属性，以及遵循的协议。</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>struct class_rw_t {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中有个常量指针 <code v-pre>ro</code> ，里面保存了在编译期就确定的属性、方法和协议。</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>struct class_ro_t {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Runtime 下执行下面的方法：</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>/***********************************************************************
* realizeClass
* Performs first-time initialization on class cls, 
* including allocating its read-write data.
* Returns the real class structure for the class. 
* Locking: runtimeLock must be write-locked by the caller
**********************************************************************/
static Class realizeClass(Class cls) {
    // 这里只列出关键代码
    const class_ro_t *ro = (const class_ro_t *)cls-&gt;data();
    class_rw_t *rw = (class_rw_t *)calloc(sizeof(class_rw_t), 1);
    rw-&gt;ro = ro;
    rw-&gt;flags = RW_REALIZED|RW_REALIZING;
    cls-&gt;setData(rw);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化的时候，先调用 <code v-pre>data()</code> 方法返回一个类型为 <code v-pre>class_rw_t</code> 强转为 <code v-pre>class_ro_t</code> 的指针，然后初始化一个 <code v-pre>class_rw_t</code> 然后将设置 <code v-pre>ro</code> ，以及相关 <code v-pre>flag</code> ，最后调用 <code v-pre>setData</code> 替换原来的。</p>
<p>在 <code v-pre>static Class realizeClass(Class cls)</code> 方法下面还有对类的方法的一些处理：</p>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>// Attach categories
methodizeClass(cls);



/****** implementation of methodizeClass ******/

// Install methods and properties that the class implements itself.
method_list_t *list = ro-&gt;baseMethods();
if (list) {
    prepareMethodLists(cls, &amp;list, 1, YES, isBundleClass(cls));
    rw-&gt;methods.attachLists(&amp;list, 1);
}

property_list_t *proplist = ro-&gt;baseProperties;
if (proplist) {
    rw-&gt;properties.attachLists(&amp;proplist, 1);
}

protocol_list_t *protolist = ro-&gt;baseProtocols;
if (protolist) {
    rw-&gt;protocols.attachLists(&amp;protolist, 1);
}

// Attach categories.
category_list *cats = unattachedCategoriesForClass(cls, true /*realizing*/);
attachCategories(cls, cats, false /*don't flush caches*/);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将类原始的方法、属性、协议添加到 <code v-pre>class_rw_t</code> 中，然后将分类中的方法也添加到 <code v-pre>class_rw_t</code> 方法列表中。而我们可以看到  <code v-pre>class_ro_t</code> 中  <code v-pre>    const ivar_list_t * ivars;</code>  实例变量已经在编译期确定内存地址作为静态变量保存起来了，这也是为什么不能向编译后的类添加实例变量的原因。</p>
</div></template>


