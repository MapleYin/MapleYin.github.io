---
title: Rotate Array
description: "Given an array, rotate the array to the right by k steps, where k is non-negative."
tag: [TIQ]
date: 2020-04-09
article: false
category: algorithms
---

>Given an array, rotate the array to the right by *k* steps, where *k* is non-negative.
>
>**Example 1:**
>
>```
>Input: [1,2,3,4,5,6,7] and k = 3
>Output: [5,6,7,1,2,3,4]
>Explanation:
>rotate 1 steps to the right: [7,1,2,3,4,5,6]
>rotate 2 steps to the right: [6,7,1,2,3,4,5]
>rotate 3 steps to the right: [5,6,7,1,2,3,4]
>```
>
>**Example 2:**
>
>```
>Input: [-1,-100,3,99] and k = 2
>Output: [3,99,-1,-100]
>Explanation: 
>rotate 1 steps to the right: [99,-1,-100,3]
>rotate 2 steps to the right: [3,99,-1,-100]
>```
>
>**Note:**
>
>- Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
>- Could you do it in-place with O(1) extra space?

- O(1) space  O(k * n) time

```javascript
var rotate = function(nums, k) {
    for ( let index = 0 ; index < k ; ++index ) {
        let curValue = undefined;
        for ( let cur = nums.length - 1; cur >= 0; --cur ) {
            if (curValue != undefined) {
                nums[cur + 1] = nums[cur]
            } else {
                curValue = nums[cur]
            }
        }
        nums[0] = curValue;
    }
};
```

- O(n) space O(n) time

```javascript
var rotate = function(nums, k) {
    let temp = nums.slice(0);
    for (let index = 0, length = nums.length; index < length; ++index) {
        let newIndex = (index + k) % length;
        nums[newIndex] = temp[index];
    }
};
```

- O(1) space O(n) time

```javascript
var rotate = function(nums, k) {
    if (k == 0) {
        return
    }
    let count = nums.length
    let startIndex = 0
    let temp = nums[0]
    for (let index = 0, length = nums.length; index < length; ++index) {
        let nextIndex = ((index + 1) * k) % count + startIndex
        let current = nums[nextIndex]
        nums[nextIndex] = temp
        temp = current

        // 当循环到开始的index 则需要+1
        if (nextIndex == startIndex && startIndex < count - 1) {
            startIndex = startIndex + 1
            temp = nums[startIndex]
        }
    }
};
```

