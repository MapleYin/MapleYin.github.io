---
title: 从排序数组中删除重复项
description: "给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。"
tags: [leetcode, array, algorithms, Easy-Collection]
layout: post
excerpt_separator: <!--more-->
image:
  feature: //image-1257141638.cos.ap-guangzhou.myqcloud.com/post/head/andrew-seaman-597968-unsplash.jpg
---

> 给定一个排序数组，你需要在**原地**删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
>
> 不要使用额外的数组空间，你必须在**原地修改输入数组**并在使用 O(1) 额外空间的条件下完成。
>
> **示例 1:**
>
> ```
> 给定数组 nums = [1,1,2], 
> 
> 函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 
> 
> 你不需要考虑数组中超出新长度后面的元素。
> ```
>
> **示例 2:**
>
> ```
> 给定 nums = [0,0,1,1,1,2,2,3,3,4],
> 
> 函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
> 
> 你不需要考虑数组中超出新长度后面的元素。
> ```
>
> **说明:**
>
> 为什么返回数值是整数，但输出的答案是数组呢?
>
> 请注意，输入数组是以**“引用”**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
>
> 你可以想象内部操作如下:
>
> ```
> // nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
> int len = removeDuplicates(nums);
> 
> // 在函数里修改输入数组对于调用者是可见的。
> // 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
> for (int i = 0; i < len; i++) {
>     print(nums[i]);
> }
> ```

因为数组是排好序的，则我们只需要顺序访问每一个元素就好。然后不停的去比较当前(`current`)和之后(`next`)的元素比较，如果相同就跳过，如果相等则保存到当前位置。

具体实现如下：

```swift
func removeDuplicates(_ nums: inout [Int]) -> Int {
    if nums.count == 0 {
        return 0
    }
    var current = 0
    var next = current + 1

    while next < nums.count {
        // 如果值相同，则后移
        if nums[current] == nums[next] {
            next = next + 1
        } else {
        // 找到不同的值，则把这个不同的值保存到当前位置的后一位
            current = current + 1
            nums[current] = nums[next]
        }
    }
    return current + 1
}
```
