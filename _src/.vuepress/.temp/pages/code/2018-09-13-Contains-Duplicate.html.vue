<template><div><blockquote>
<p>给定一个整数数组，判断是否存在重复元素。</p>
<p>如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。</p>
<p><strong>示例 1:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: [1,2,3,1]
输出: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: [1,2,3,4]
输出: false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p>直观的想可能需要一个 <code v-pre>Set</code> 来保存已经出现的数字，如果遍历过程中，发现在 <code v-pre>Set</code> 中存在当前遍历的数字，则直接证明有重复元素，直接返回 <code v-pre>true</code> 。但是这里就用了额外的空间，那既然这样，直接以给定的数组初始化一个 <code v-pre>Set</code> ，然后判断数组和 <code v-pre>Set</code> 的个数是否相等，从而达到判断是否有重复数据的目的，这种方法比较取巧。</p>
<div class="language-swift line-numbers-mode" data-ext="swift"><pre v-pre class="language-swift"><code><span class="token keyword">func</span> <span class="token function-definition function">containsDuplicate</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> nums<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Int</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token class-name">Bool</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">.</span>count <span class="token operator">!=</span> nums<span class="token punctuation">.</span>count
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外一种想法是先排序，然后再进行判断。</p>
</div></template>


