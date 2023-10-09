<template><div><blockquote>
<p>There are N children standing in a line. Each child is assigned a rating value.</p>
<p>You are giving candies to these children subjected to the following requirements:</p>
<ul>
<li>Each child must have at least one candy.</li>
<li>Children with a higher rating get more candies than their neighbors.</li>
</ul>
<p>What is the minimum candies you must give?<br>
Origin URL:<a href="https://leetcode.com/problems/candy/" target="_blank" rel="noopener noreferrer">https://leetcode.com/problems/candy/<ExternalLinkIcon/></a></p>
</blockquote>
<p>通俗的说就是，给定一串有序的数字，数字大的比相邻数字小的要获取的糖果多，对相同的数字相邻没有糖果数量的要求，每个人至少一颗糖果，问至少每个人多少颗糖。</p>
<p>举个几个例子：</p>
<ul>
<li>假设给定的数字是 [1,2,3,3,2]，那么最小的糖果数就是 1+2+3+2+1 = 9。</li>
<li>假设给定的数字是 [4,4,2,2,4]，那么此时最小的糖果数是 1+2+1+1+2 = 7。</li>
</ul>
<p>基于上面的规则，我所想到的实现是：</p>
<ul>
<li>记录当前给的糖果颗数 <code v-pre>candyCount</code>，<code v-pre>candyCount</code>从1颗开始</li>
<li>如果当前的比前一个数字大，则 <code v-pre>candyCount + 1</code>，并加到总数中去</li>
<li>如果当前的和前一数字相同，则将 <code v-pre>candyCount</code> 设置为1</li>
<li>如果当前的比前一个数字小，则 <code v-pre>candyCount - 1</code>，并加到总糖果数中去</li>
<li>如果在2、3情况下，出现 <code v-pre>candyCount &lt; 0</code> 的情况，则意味着连续递减的数字多于前一次上升的数量，则需要更新前一次上升到的最大数字到当前连续递减数字对应的最大数字。</li>
</ul>
<p>下面是实现：</p>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token comment">/* 
There are N children standing in a line. Each child is assigned a rating value.
You are giving candies to these children subjected to the following requirements:
    1. Each child must have at least one candy.
    2. Children with a higher rating get more candies than their neighbors.
What is the minimum candies you must give?

Origin URL:https://leetcode.com/problems/candy/ 
*/</span>


<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">int</span> <span class="token function">candy</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span><span class="token operator">&amp;</span> ratings<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> downCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> candyCount <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

        vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span><span class="token double-colon punctuation">::</span>iterator prev <span class="token operator">=</span> ratings<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span><span class="token double-colon punctuation">::</span>iterator current <span class="token operator">=</span> prev<span class="token punctuation">;</span> current <span class="token operator">!=</span> ratings<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span> <span class="token operator">++</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> shift <span class="token operator">=</span> <span class="token operator">*</span>current <span class="token operator">-</span> <span class="token operator">*</span>prev<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>shift <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sum <span class="token operator">+=</span> <span class="token operator">--</span>candyCount<span class="token punctuation">;</span>
                downCount<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>downCount <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">int</span> addition <span class="token operator">=</span> candyCount <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
                    sum <span class="token operator">+=</span> <span class="token punctuation">(</span>downCount<span class="token operator">+</span>addition<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> candyCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    downCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                    candyCount <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span> shift <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
                    sum <span class="token operator">+=</span> <span class="token operator">++</span>candyCount<span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    candyCount <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                    sum <span class="token operator">+=</span> candyCount<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            prev <span class="token operator">=</span> current<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>downCount <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> addition <span class="token operator">=</span> candyCount <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
            sum <span class="token operator">+=</span> <span class="token punctuation">(</span>downCount<span class="token operator">+</span>addition<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> candyCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


