---
title: 旋转数组
description: "给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。"
tag: [leetcode, array, Easy-Collection]
date: 2018-09-13
article: false
category: algorithms
---

>给定一个数组，将数组中的元素向右移动 *k* 个位置，其中 *k* 是非负数。
>
>**示例 1:**
>
>```
>输入: [1,2,3,4,5,6,7] 和 k = 3
>输出: [5,6,7,1,2,3,4]
>解释:
>向右旋转 1 步: [7,1,2,3,4,5,6]
>向右旋转 2 步: [6,7,1,2,3,4,5]
>向右旋转 3 步: [5,6,7,1,2,3,4]
>```
>
>**示例 2:**
>
>```
>输入: [-1,-100,3,99] 和 k = 2
>输出: [3,99,-1,-100]
>解释: 
>向右旋转 1 步: [99,-1,-100,3]
>向右旋转 2 步: [3,99,-1,-100]
>```
>
>**说明:**
>
>- 尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
>- 要求使用空间复杂度为 O(1) 的原地算法。

由于需要使用空间复杂度为 `O(1)` 的原地算法，所以这里我们进行一次循环来依次替换。

难点在于，怎么样确认数字移动到的下一个 `index` ？

我的想法是既然是往后挪 `k` 位，那么我只需要从 `0` 开始，依次挪 `k` 位来替换。

如：假设数组有 7 个元素，往后挪2位，那么替换方式为：

```javascript
index     operation
  0        0 -> 2
  1        2 -> 4
  2        4 -> 6
  3        6 -> 1
  4        1 -> 3
  5        3 -> 5
  6        5 -> 7
```

但是如果是数组有 8 个元素，往后挪 2 位，那么上门的替换方式需要稍微修正下了：

```javascript
修正前：
index     operation
  0        0 -> 2
  1        2 -> 4
  2        4 -> 6
  3        6 -> 0
  4        0 -> 2
  5        2 -> 4
  6        4 -> 6
  7        6 -> 0

修正后：
index     operation
  0        0 -> 2
  1        2 -> 4
  2        4 -> 6
  3        6 -> 0
             +1
  4        1 -> 3
  5        3 -> 5
  6        5 -> 7
  7        7 -> 1
```

那在什么情况下需要修正呢？当数组元素个数 `n` 和挪动位数 `k` 的最大公约数不为1时，则需要挪动。

如：`n = 12, k = 8` 最大公约数为 `4`

```javascript
index     operation
  0        0 -> 8
  1        8 -> 4
  2        4 -> 0
             +1
  3        1 -> 9
  4        9 -> 5
  5        5 -> 1
             +1
  6        2 -> 10
  7        10 -> 6
  8        6 -> 2
             +1
  9        3 -> 11
  10       11 -> 7
  11       7 -> 3
```

真对以上思考，具体实现如下：

```swift
// 计算最大公约数
func mgn(_ num1: Int,_ num2: Int) -> Int {
        return num2 != 0 ? mgn(num2, num1 % num2) : num1
    }
func rotate(_ nums: inout [Int], _ k: Int) {
    if k == 0 {
        return
    }
    let count = nums.count
    var temp = nums[0]
    var startIndex = 0
    // 是否需要纠正
    let needShift = mgn(nums.count, k) != 1
    for index in 0..<count {
        // 计算下一个 index
        let nextIndex = ((index + 1) * k) % count + startIndex
        let current = nums[nextIndex]
        nums[nextIndex] = temp
        temp = current

        if needShift && nextIndex == startIndex && startIndex < count - 1 {
            startIndex = startIndex + 1
            temp = nums[startIndex]
        }
    }
}
```

