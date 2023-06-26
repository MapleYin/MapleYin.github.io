---
title: Best Time to Buy and Sell Stock II
description: "Say you have an array prices for which the ith element is the price of a given stock on day i."
tag: [TIQ]
date: 2020-04-09
article: false
category: algorithms
---

>Say you have an array `prices` for which the *i*th element is the price of a given stock on day *i*.
>
>Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).
>
>**Note:** You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).
>
>**Example 1:**
>
>```
>Input: [7,1,5,3,6,4]
>Output: 7
>Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
>             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
>```
>
>**Example 2:**
>
>```
>Input: [1,2,3,4,5]
>Output: 4
>Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
>             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
>             engaging multiple transactions at the same time. You must sell before buying again.
>```
>
>**Example 3:**
>
>```
>Input: [7,6,4,3,1]
>Output: 0
>Explanation: In this case, no transaction is done, i.e. max profit = 0.
>```
>
> 
>
>**Constraints:**
>
>- `1 <= prices.length <= 3 * 10 ^ 4`
>- `0 <= prices[i] <= 10 ^ 4`

因为可以多次买卖，所以我们只需要知道有多少递增即可。

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length <= 1) {
        return 0;
    }
    let start = prices[0];
    let profit = 0;
    let index = 1;
    while(index < prices.length) {
        if (prices[index] > start) {
            profit += prices[index] - start;
        }
        start = prices[index];
        ++index;
    }
    return profit;
};
```