---
title: 存在重复
description: "给定一个整数数组，判断是否存在重复元素。如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。"
tag: [leetcode, array, Easy-Collection]
date: 2018-09-13
article: false
category: algorithms
image: https://image-1257141638.cos.ap-guangzhou.myqcloud.com/post/head/Contains-Duplicate.png
---

> 给定一个整数数组，判断是否存在重复元素。
>
> 如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。
>
> **示例 1:**
>
> ```
> 输入: [1,2,3,1]
> 输出: true
> ```
>
> **示例 2:**
>
> ```
> 输入: [1,2,3,4]
> 输出: false
> ```
>
> **示例 3:**
>
> ```
> 输入: [1,1,1,3,3,4,3,2,4,2]
> 输出: true
> ```

直观的想可能需要一个 `Set` 来保存已经出现的数字，如果遍历过程中，发现在 `Set` 中存在当前遍历的数字，则直接证明有重复元素，直接返回 `true` 。但是这里就用了额外的空间，那既然这样，直接以给定的数组初始化一个 `Set` ，然后判断数组和 `Set` 的个数是否相等，从而达到判断是否有重复数据的目的，这种方法比较取巧。

```swift
func containsDuplicate(_ nums: [Int]) -> Bool {
    return Set(nums).count != nums.count
}
```

另外一种想法是先排序，然后再进行判断。