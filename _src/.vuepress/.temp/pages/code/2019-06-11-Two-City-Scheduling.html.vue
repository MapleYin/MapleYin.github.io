<template><div><blockquote>
<p>公司计划面试 <code v-pre>2N</code> 人。第 i 人飞往 A 市的费用为 <code v-pre>costs[i][0]</code>，飞往 B 市的费用为 <code v-pre>costs[i][1]</code>。</p>
<p>返回将每个人都飞到某座城市的最低费用，要求每个城市都有 N 人抵达。</p>
<p>示例：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：[[10,20],[30,200],[400,50],[30,20]]
输出：110
解释：
第一个人去 A 市，费用为 10。
第二个人去 A 市，费用为 30。
第三个人去 B 市，费用为 50。
第四个人去 B 市，费用为 20。

最低总费用为 10 + 30 + 50 + 20 = 110，每个城市都有一半的人在面试。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示：</p>
<ol>
<li><code v-pre>1 &lt;= costs.length &lt;= 100</code></li>
<li><code v-pre>costs.length</code> 为偶数</li>
<li><code v-pre>1 &lt;= costs[i][0], costs[i][1] &lt;= 1000</code></li>
</ol>
</blockquote>
<p>这里其实不关心每个人去一个城市费用有多么多么的少，而是关心同一个人去两个不同城市费用差别有多大，最大化的减少费用差。</p>
<p>思路大致是去 <code v-pre>A</code> 城市比去 <code v-pre>B</code> 城市费用便宜最多的都去 <code v-pre>A</code> 城市，同理其他的都去 <code v-pre>B</code>  城市。</p>
<p>那么下面就分步：</p>
<ul>
<li>排序</li>
</ul>
<div class="language-swift line-numbers-mode" data-ext="swift"><pre v-pre class="language-swift"><code>costs<span class="token punctuation">.</span>sort <span class="token punctuation">{</span> <span class="token punctuation">(</span>p1<span class="token punctuation">,</span> p2<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token class-name">Bool</span> <span class="token keyword">in</span>
    <span class="token keyword">return</span> p1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">-</span>p1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> p2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">-</span>p2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>从小到大前 <code v-pre>N </code> 个人去 <code v-pre>A</code> ，后 <code v-pre>N</code> 个人去 <code v-pre>B</code></li>
</ul>
<div class="language-swift line-numbers-mode" data-ext="swift"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> maxCount <span class="token operator">=</span> costs<span class="token punctuation">.</span>count <span class="token operator">/</span> <span class="token number">2</span>
<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token number">0</span>
costs<span class="token punctuation">.</span>forEach <span class="token punctuation">{</span> <span class="token punctuation">(</span>person<span class="token punctuation">)</span> <span class="token keyword">in</span>
    <span class="token keyword">if</span> count <span class="token operator">&lt;</span> maxCount <span class="token punctuation">{</span>
        count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span>
        result <span class="token operator">=</span> result <span class="token operator">+</span> person<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> result <span class="token operator">+</span> person<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


