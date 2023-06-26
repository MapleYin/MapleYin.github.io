import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as l,c as p,a as n,b as s,d as e,e as t}from"./app-05cf074e.js";const c={},r=n("em",null,"nums",-1),u={href:"https://en.wikipedia.org/wiki/In-place_algorithm",target:"_blank",rel:"noopener noreferrer"},d=n("strong",null,"in-place",-1),m=n("em",null,"once",-1),v={href:"https://en.wikipedia.org/wiki/In-place_algorithm",target:"_blank",rel:"noopener noreferrer"},k=t(`<p><strong>Example 1:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Given nums = [1,1,2],

Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.

It doesn&#39;t matter what you leave beyond the returned length.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 2:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Given nums = [0,0,1,1,1,2,2,3,3,4],

Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.

It doesn&#39;t matter what values are set beyond the returned length.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Clarification:</strong></p><p>Confused why the returned value is an integer but your answer is an array?</p><p>Note that the input array is passed in by <strong>reference</strong>, which means modification to the input array will be known to the caller as well.</p><p>Internally you can think of this:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// nums is passed in by reference. (i.e., without making a copy)
int len = removeDuplicates(nums);

// any modification to nums in your function would be known by the caller.
// using the length returned by your function, it prints the first len elements.
for (int i = 0; i &lt; len; i++) {
    print(nums[i]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),b=t(`<p>关键思路：</p><p>因为是排序好的数组，故我们只需要顺序循环替换即可，代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">removeDuplicates</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">.</span>length <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> cur <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> next <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> length <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>next <span class="token operator">&lt;</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>cur<span class="token punctuation">]</span> <span class="token operator">!=</span> nums<span class="token punctuation">[</span>next<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            cur <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            nums<span class="token punctuation">[</span>cur<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>next<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token operator">++</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> cur <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function h(g,y){const a=o("ExternalLinkIcon");return l(),p("div",null,[n("blockquote",null,[n("p",null,[s("Given a sorted array "),r,s(", remove the duplicates "),n("a",u,[d,e(a)]),s(" such that each element appear only "),m,s(" and return the new length.")]),n("p",null,[s("Do not allocate extra space for another array, you must do this by "),n("strong",null,[s("modifying the input array "),n("a",v,[s("in-place"),e(a)])]),s(" with O(1) extra memory.")]),k]),b])}const _=i(c,[["render",h],["__file","2020-04-08-Remove-Duplicates-from-Sorted-Array.html.vue"]]);export{_ as default};
