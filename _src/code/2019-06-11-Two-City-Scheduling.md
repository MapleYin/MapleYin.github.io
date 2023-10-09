---
title: 两地调度
description: "公司计划面试 2N 人。第 i 人飞往 A 市的费用为 costs[i][0]，飞往 B 市的费用为 costs[i][1]。"
tag: [leetcode, array, Easy-Collection]
date: 2019-06-11
article: false
category: algorithms
---

>公司计划面试 `2N` 人。第 i 人飞往 A 市的费用为 `costs[i][0]`，飞往 B 市的费用为 `costs[i][1]`。
>
>返回将每个人都飞到某座城市的最低费用，要求每个城市都有 N 人抵达。
>
>示例：
>
>```
>输入：[[10,20],[30,200],[400,50],[30,20]]
>输出：110
>解释：
>第一个人去 A 市，费用为 10。
>第二个人去 A 市，费用为 30。
>第三个人去 B 市，费用为 50。
>第四个人去 B 市，费用为 20。
>
>最低总费用为 10 + 30 + 50 + 20 = 110，每个城市都有一半的人在面试。
>```
>
>
>提示：
>
>1. `1 <= costs.length <= 100`
>2. `costs.length` 为偶数
>3. `1 <= costs[i][0], costs[i][1] <= 1000`

这里其实不关心每个人去一个城市费用有多么多么的少，而是关心同一个人去两个不同城市费用差别有多大，最大化的减少费用差。

思路大致是去 `A` 城市比去 `B` 城市费用便宜最多的都去 `A` 城市，同理其他的都去 `B`  城市。

那么下面就分步：

- 排序

```swift
costs.sort { (p1, p2) -> Bool in
    return p1[0]-p1[1] < p2[0]-p2[1]
}
```

- 从小到大前 `N ` 个人去 `A` ，后 `N` 个人去 `B`

```swift
let maxCount = costs.count / 2
var count = 0
var result = 0
costs.forEach { (person) in
    if count < maxCount {
        count = count + 1
        result = result + person[0]
    } else {
        result = result + person[1]
    }
}
return result
```