<template><div><blockquote>
<p>给定一个数组，将数组中的元素向右移动 <em>k</em> 个位置，其中 <em>k</em> 是非负数。</p>
<p><strong>示例 1:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: [-1,-100,3,99] 和 k = 2
输出: [3,99,-1,-100]
解释: 
向右旋转 1 步: [99,-1,-100,3]
向右旋转 2 步: [3,99,-1,-100]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明:</strong></p>
<ul>
<li>尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。</li>
<li>要求使用空间复杂度为 O(1) 的原地算法。</li>
</ul>
</blockquote>
<p>由于需要使用空间复杂度为 <code v-pre>O(1)</code> 的原地算法，所以这里我们进行一次循环来依次替换。</p>
<p>难点在于，怎么样确认数字移动到的下一个 <code v-pre>index</code> ？</p>
<p>我的想法是既然是往后挪 <code v-pre>k</code> 位，那么我只需要从 <code v-pre>0</code> 开始，依次挪 <code v-pre>k</code> 位来替换。</p>
<p>如：假设数组有 7 个元素，往后挪2位，那么替换方式为：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>index     operation
  <span class="token number">0</span>        <span class="token number">0</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">2</span>
  <span class="token number">1</span>        <span class="token number">2</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">4</span>
  <span class="token number">2</span>        <span class="token number">4</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">6</span>
  <span class="token number">3</span>        <span class="token number">6</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">1</span>
  <span class="token number">4</span>        <span class="token number">1</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">3</span>
  <span class="token number">5</span>        <span class="token number">3</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">5</span>
  <span class="token number">6</span>        <span class="token number">5</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果是数组有 8 个元素，往后挪 2 位，那么上门的替换方式需要稍微修正下了：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>修正前：
index     operation
  <span class="token number">0</span>        <span class="token number">0</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">2</span>
  <span class="token number">1</span>        <span class="token number">2</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">4</span>
  <span class="token number">2</span>        <span class="token number">4</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">6</span>
  <span class="token number">3</span>        <span class="token number">6</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">0</span>
  <span class="token number">4</span>        <span class="token number">0</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">2</span>
  <span class="token number">5</span>        <span class="token number">2</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">4</span>
  <span class="token number">6</span>        <span class="token number">4</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">6</span>
  <span class="token number">7</span>        <span class="token number">6</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">0</span>

修正后：
index     operation
  <span class="token number">0</span>        <span class="token number">0</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">2</span>
  <span class="token number">1</span>        <span class="token number">2</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">4</span>
  <span class="token number">2</span>        <span class="token number">4</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">6</span>
  <span class="token number">3</span>        <span class="token number">6</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">0</span>
             <span class="token operator">+</span><span class="token number">1</span>
  <span class="token number">4</span>        <span class="token number">1</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">3</span>
  <span class="token number">5</span>        <span class="token number">3</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">5</span>
  <span class="token number">6</span>        <span class="token number">5</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">7</span>
  <span class="token number">7</span>        <span class="token number">7</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那在什么情况下需要修正呢？当数组元素个数 <code v-pre>n</code> 和挪动位数 <code v-pre>k</code> 的最大公约数不为1时，则需要挪动。</p>
<p>如：<code v-pre>n = 12, k = 8</code> 最大公约数为 <code v-pre>4</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>index     operation
  <span class="token number">0</span>        <span class="token number">0</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">8</span>
  <span class="token number">1</span>        <span class="token number">8</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">4</span>
  <span class="token number">2</span>        <span class="token number">4</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">0</span>
             <span class="token operator">+</span><span class="token number">1</span>
  <span class="token number">3</span>        <span class="token number">1</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">9</span>
  <span class="token number">4</span>        <span class="token number">9</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">5</span>
  <span class="token number">5</span>        <span class="token number">5</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">1</span>
             <span class="token operator">+</span><span class="token number">1</span>
  <span class="token number">6</span>        <span class="token number">2</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">10</span>
  <span class="token number">7</span>        <span class="token number">10</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">6</span>
  <span class="token number">8</span>        <span class="token number">6</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">2</span>
             <span class="token operator">+</span><span class="token number">1</span>
  <span class="token number">9</span>        <span class="token number">3</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">11</span>
  <span class="token number">10</span>       <span class="token number">11</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">7</span>
  <span class="token number">11</span>       <span class="token number">7</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>真对以上思考，具体实现如下：</p>
<div class="language-swift line-numbers-mode" data-ext="swift"><pre v-pre class="language-swift"><code><span class="token comment">// 计算最大公约数</span>
<span class="token keyword">func</span> <span class="token function-definition function">mgn</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> num1<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">,</span><span class="token omit keyword">_</span> num2<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token class-name">Int</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> num2 <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token function">mgn</span><span class="token punctuation">(</span>num2<span class="token punctuation">,</span> num1 <span class="token operator">%</span> num2<span class="token punctuation">)</span> <span class="token punctuation">:</span> num1
    <span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function-definition function">rotate</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> nums<span class="token punctuation">:</span> <span class="token keyword">inout</span> <span class="token punctuation">[</span><span class="token class-name">Int</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token omit keyword">_</span> k<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> k <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> count <span class="token operator">=</span> nums<span class="token punctuation">.</span>count
    <span class="token keyword">var</span> temp <span class="token operator">=</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">var</span> startIndex <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// 是否需要纠正</span>
    <span class="token keyword">let</span> needShift <span class="token operator">=</span> <span class="token function">mgn</span><span class="token punctuation">(</span>nums<span class="token punctuation">.</span>count<span class="token punctuation">,</span> k<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">1</span>
    <span class="token keyword">for</span> index <span class="token keyword">in</span> <span class="token number">0</span><span class="token operator">..&lt;</span>count <span class="token punctuation">{</span>
        <span class="token comment">// 计算下一个 index</span>
        <span class="token keyword">let</span> nextIndex <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> k<span class="token punctuation">)</span> <span class="token operator">%</span> count <span class="token operator">+</span> startIndex
        <span class="token keyword">let</span> current <span class="token operator">=</span> nums<span class="token punctuation">[</span>nextIndex<span class="token punctuation">]</span>
        nums<span class="token punctuation">[</span>nextIndex<span class="token punctuation">]</span> <span class="token operator">=</span> temp
        temp <span class="token operator">=</span> current

        <span class="token keyword">if</span> needShift <span class="token operator">&amp;&amp;</span> nextIndex <span class="token operator">==</span> startIndex <span class="token operator">&amp;&amp;</span> startIndex <span class="token operator">&lt;</span> count <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">{</span>
            startIndex <span class="token operator">=</span> startIndex <span class="token operator">+</span> <span class="token number">1</span>
            temp <span class="token operator">=</span> nums<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


