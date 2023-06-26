import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as e,f as t,e as n}from"./app-05cf074e.js";const i={},p=n(`<blockquote><p>给定一个排序数组，你需要在<strong>原地</strong>删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。</p><p>不要使用额外的数组空间，你必须在<strong>原地修改输入数组</strong>并在使用 O(1) 额外空间的条件下完成。</p><p><strong>示例 1:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明:</strong></p><p>为什么返回数值是整数，但输出的答案是数组呢?</p><p>请注意，输入数组是以**“引用”**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。</p><p>你可以想象内部操作如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i &lt; len; i++) {
    print(nums[i]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>`,1),o=n(`<p>因为数组是排好序的，则我们只需要顺序访问每一个元素就好。然后不停的去比较当前(<code>current</code>)和之后(<code>next</code>)的元素比较，如果相同就跳过，如果相等则保存到当前位置。</p><p>具体实现如下：</p><div class="language-swift line-numbers-mode" data-ext="swift"><pre class="language-swift"><code><span class="token keyword">func</span> <span class="token function-definition function">removeDuplicates</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> nums<span class="token punctuation">:</span> <span class="token keyword">inout</span> <span class="token punctuation">[</span><span class="token class-name">Int</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Int</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> nums<span class="token punctuation">.</span>count <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> current <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">var</span> next <span class="token operator">=</span> current <span class="token operator">+</span> <span class="token number">1</span>

    <span class="token keyword">while</span> next <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>count <span class="token punctuation">{</span>
        <span class="token comment">// 如果值相同，则后移</span>
        <span class="token keyword">if</span> nums<span class="token punctuation">[</span>current<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>next<span class="token punctuation">]</span> <span class="token punctuation">{</span>
            next <span class="token operator">=</span> next <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 找到不同的值，则把这个不同的值保存到当前位置的后一位</span>
            current <span class="token operator">=</span> current <span class="token operator">+</span> <span class="token number">1</span>
            nums<span class="token punctuation">[</span>current<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>next<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> current <span class="token operator">+</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function c(l,r){return a(),e("div",null,[p,t("more"),o])}const v=s(i,[["render",c],["__file","2018-09-12-Remove-Duplicates-from-Sorted-Array-cn.html.vue"]]);export{v as default};
