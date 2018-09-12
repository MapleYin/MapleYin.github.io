---
title: 买卖股票的最佳时机 II
description: "给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。"
tags: [leetcode, array, algorithms, Easy-Collection]
layout: post
excerpt_separator: <!--more-->
image:
  feature: //image-1257141638.cos.ap-guangzhou.myqcloud.com/post/head/stock.jpg
---

> 给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。
>
> 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
>
> **注意：**你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
>
> **示例 1:**
>
> ```
> 输入: [7,1,5,3,6,4]
> 输出: 7
> 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 
>      这笔交易所能获得利润 = 5-1 = 4 。
>      
>      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 
>      这笔交易所能获得利润 = 6-3 = 3 。
> ```
>
> **示例 2:**
>
> ```
> 输入: [1,2,3,4,5]
> 输出: 4
> 解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 
>      这笔交易所能获得利润 = 5-1 = 4 。
>      
>      注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
>      因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
> ```
>
> **示例 3:**
>
> ```
> 输入: [7,6,4,3,1]
> 输出: 0
> 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
> ```

这里是完全给出所有的走势数据，同时需要保证利润最大，所以这里可以把问题转化成，按数组顺序，数字变大了多少。

![stock-sample](https://image-1257141638.cos.ap-guangzhou.myqcloud.com/post/head/stock-sample.png)

假设股票走势如上图所示，那么最大收益就是所有黑线不分全部加起来，注意，中间连续三段期时可以看作是最低点买入，最高点卖出，这里分开是为了方便程序计算。

所以我们只需要对于数组 `arr` 中满足位置  `arr[index+1] > arr[index]` 情况的差值全部相加，则总和为最大收益。

具体实现如下：

```swift
func maxProfit(_ prices: [Int]) -> Int {
    if prices.count <= 1 {
        return 0
    }

    var sum = 0
    var current = 0
    
    while current < prices.count - 1 {
        let diff = prices[current + 1] - prices[current]
        // 如果下一个数据比当前大，则累加差值
        if diff > 0 {
            sum = sum + diff
        }
        current = current + 1
    }

    return sum
}
```