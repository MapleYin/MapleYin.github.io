<template><div><blockquote>
<p>Given an array, rotate the array to the right by <em>k</em> steps, where <em>k</em> is non-negative.</p>
<p><strong>Example 1:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Input: [1,2,3,4,5,6,7] and k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 2:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Input: [-1,-100,3,99] and k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Note:</strong></p>
<ul>
<li>Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.</li>
<li>Could you do it in-place with O(1) extra space?</li>
</ul>
</blockquote>
<ul>
<li>O(1) space  O(k * n) time</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">rotate</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> index <span class="token operator">&lt;</span> k <span class="token punctuation">;</span> <span class="token operator">++</span>index <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> curValue <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token keyword">let</span> cur <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> cur <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token operator">--</span>cur <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>curValue <span class="token operator">!=</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                nums<span class="token punctuation">[</span>cur <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>cur<span class="token punctuation">]</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                curValue <span class="token operator">=</span> nums<span class="token punctuation">[</span>cur<span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> curValue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>O(n) space O(n) time</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">rotate</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> temp <span class="token operator">=</span> nums<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> length <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> <span class="token operator">++</span>index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> newIndex <span class="token operator">=</span> <span class="token punctuation">(</span>index <span class="token operator">+</span> k<span class="token punctuation">)</span> <span class="token operator">%</span> length<span class="token punctuation">;</span>
        nums<span class="token punctuation">[</span>newIndex<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>O(1) space O(n) time</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">rotate</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> count <span class="token operator">=</span> nums<span class="token punctuation">.</span>length
    <span class="token keyword">let</span> startIndex <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> temp <span class="token operator">=</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> length <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> <span class="token operator">++</span>index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> nextIndex <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> k<span class="token punctuation">)</span> <span class="token operator">%</span> count <span class="token operator">+</span> startIndex
        <span class="token keyword">let</span> current <span class="token operator">=</span> nums<span class="token punctuation">[</span>nextIndex<span class="token punctuation">]</span>
        nums<span class="token punctuation">[</span>nextIndex<span class="token punctuation">]</span> <span class="token operator">=</span> temp
        temp <span class="token operator">=</span> current

        <span class="token comment">// 当循环到开始的index 则需要+1</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nextIndex <span class="token operator">==</span> startIndex <span class="token operator">&amp;&amp;</span> startIndex <span class="token operator">&lt;</span> count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            startIndex <span class="token operator">=</span> startIndex <span class="token operator">+</span> <span class="token number">1</span>
            temp <span class="token operator">=</span> nums<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


