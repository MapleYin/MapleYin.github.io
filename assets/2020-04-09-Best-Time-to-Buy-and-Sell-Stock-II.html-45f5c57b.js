import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-05cf074e.js";const t={},p=e(`<blockquote><p>Say you have an array <code>prices</code> for which the <em>i</em>th element is the price of a given stock on day <em>i</em>.</p><p>Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).</p><p><strong>Note:</strong> You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).</p><p><strong>Example 1:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
            Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 2:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
            Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
            engaging multiple transactions at the same time. You must sell before buying again.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 3:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= prices.length &lt;= 3 * 10 ^ 4</code></li><li><code>0 &lt;= prices[i] &lt;= 10 ^ 4</code></li></ul></blockquote><p>因为可以多次买卖，所以我们只需要知道有多少递增即可。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">prices</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">maxProfit</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">prices</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prices<span class="token punctuation">.</span>length <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> start <span class="token operator">=</span> prices<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> profit <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>index <span class="token operator">&lt;</span> prices<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>prices<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">&gt;</span> start<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            profit <span class="token operator">+=</span> prices<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">-</span> start<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        start <span class="token operator">=</span> prices<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token operator">++</span>index<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> profit<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(t,[["render",i],["__file","2020-04-09-Best-Time-to-Buy-and-Sell-Stock-II.html.vue"]]);export{d as default};
