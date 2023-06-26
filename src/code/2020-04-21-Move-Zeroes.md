---
title: Move Zeroes
description: "Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements."
tag: [TIQ]
date: 2020-04-21
article: false
category: algorithms
---

> Given an array `nums`, write a function to move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.
>
> **Example:**
>
> ```
> Input: [0,1,0,3,12]
> Output: [1,3,12,0,0]
> ```
>
> **Note**:
>
> 1. You must do this **in-place** without making a copy of the array.
> 2. Minimize the total number of operations.



```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let zeroIndex = undefined;
    for (let index = 0 ; index < nums.length; ++index) {
        let value = nums[index];
        if (value == 0) {
            if (zeroIndex == undefined) {
                zeroIndex = index;
            }
        } else {
            if (zeroIndex != undefined) {
                nums[zeroIndex] = nums[index];
                nums[index] = 0;
                ++zeroIndex;
                if (nums[zeroIndex] != 0) {
                    zeroIndex = undefined;
                }
            }
        }
    }
};
```

