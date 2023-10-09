<template><div><blockquote>
<p>给定一个数组，它的第 <em>i</em> 个元素是一支给定股票第 <em>i</em> 天的价格。</p>
<p>设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。</p>
<p>**注意：**你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。</p>
<p><strong>示例 1:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 
     这笔交易所能获得利润 = 5-1 = 4 。
     
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 
     这笔交易所能获得利润 = 6-3 = 3 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 
     这笔交易所能获得利润 = 5-1 = 4 。
     
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<!--more-->
<p>这里是完全给出所有的走势数据，同时需要保证利润最大，所以这里可以把问题转化成，按数组顺序，数字变大了多少。</p>
<figure><img src="https://image-1257141638.cos.ap-guangzhou.myqcloud.com/post/head/stock-sample.png" alt="stock-sample" tabindex="0" loading="lazy"><figcaption>stock-sample</figcaption></figure>
<p>假设股票走势如上图所示，那么最大收益就是所有黑线不分全部加起来，注意，中间连续三段期时可以看作是最低点买入，最高点卖出，这里分开是为了方便程序计算。</p>
<p>所以我们只需要对于数组 <code v-pre>arr</code> 中满足位置  <code v-pre>arr[index+1] &gt; arr[index]</code> 情况的差值全部相加，则总和为最大收益。</p>
<p>具体实现如下：</p>
<div class="language-swift line-numbers-mode" data-ext="swift"><pre v-pre class="language-swift"><code><span class="token keyword">func</span> <span class="token function-definition function">maxProfit</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> prices<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Int</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token class-name">Int</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> prices<span class="token punctuation">.</span>count <span class="token operator">&lt;=</span> <span class="token number">1</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">var</span> current <span class="token operator">=</span> <span class="token number">0</span>
    
    <span class="token keyword">while</span> current <span class="token operator">&lt;</span> prices<span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> diff <span class="token operator">=</span> prices<span class="token punctuation">[</span>current <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> prices<span class="token punctuation">[</span>current<span class="token punctuation">]</span>
        <span class="token comment">// 如果下一个数据比当前大，则累加差值</span>
        <span class="token keyword">if</span> diff <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
            sum <span class="token operator">=</span> sum <span class="token operator">+</span> diff
        <span class="token punctuation">}</span>
        current <span class="token operator">=</span> current <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> sum
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


