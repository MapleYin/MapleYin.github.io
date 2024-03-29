<template><div><h2 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述" aria-hidden="true">#</a> 问题描述</h2>
<p>最近开发一个关于照片打印的小程序，涉及到一个功能的实现——按面积计算价格。</p>
<p>用户编辑完图片后，需要计算图片显示的区域面积，然后计算此时打印出来所需要的价格，那么这个问题就简化成：</p>
<blockquote>
<p>给定任意两个矩形的位置信息，求两个矩形重合的面积。</p>
</blockquote>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2>
<p>这里我想以矩形的四个顶点坐标来描述矩形的位置信息。由于两个矩形的位置是任意的，所以可以以任何角度重叠，传统的没有旋转角度的计算重合面积是一个规则的矩形在这里无法适用了，所以我设想的类似微积分的思想，比如在垂直方向上计算每一像素上重叠的部分，然后在水平方向上依次全部加起来。</p>
<!--more-->
<p>![面积计算示意](<a href="https://image-1257141638.cos.ap-guangzhou.myqcloud.com/post/2018-08-20" target="_blank" rel="noopener noreferrer">https://image-1257141638.cos.ap-guangzhou.myqcloud.com/post/2018-08-20<ExternalLinkIcon/></a> 6.05.49 area.png)</p>
<p>如图所示，黑色虚线部分即在竖直方向上重叠部分，当黑色虚线足够多，然后加起来就是重叠部分面积了。</p>
<p>根据这个想法，我想可能需要这样的步骤：</p>
<ol>
<li>给定一个 <code v-pre>x</code> 方向上的值返回计算与矩形边交点的对应 <code v-pre>y</code> 值</li>
<li>寻找起点和终点</li>
<li>计算中间重合的长度</li>
<li>累加</li>
</ol>
<h2 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现" aria-hidden="true">#</a> 具体实现</h2>
<h4 id="矩形交点" tabindex="-1"><a class="header-anchor" href="#矩形交点" aria-hidden="true">#</a> 矩形交点</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * 线性方程，主要定义矩形每条边的在坐标轴的函数
 */</span>
<span class="token keyword">class</span> <span class="token class-name">LineFunction</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> minX<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> maxX<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">Infinity</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 斜率
     * 
     * <span class="token keyword">@type</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">private</span> slope<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 在y轴的偏移量
     * 
     * <span class="token keyword">@type</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">private</span> offset<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>points<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>points<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token string">"miss point when init `LineFunction`"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">let</span> point1 <span class="token operator">=</span> points<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> point2 <span class="token operator">=</span> points<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>minX <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>point1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> point2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>maxX <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>point1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> point2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>slope <span class="token operator">=</span> <span class="token punctuation">(</span>point1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> point2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span>point1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span> point2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>offset <span class="token operator">=</span> point1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>slope <span class="token operator">*</span> point1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>

    <span class="token function">contain</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">>=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>minX <span class="token operator">&amp;&amp;</span> x <span class="token operator">&lt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>maxX <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>minX <span class="token operator">!=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>maxX
    <span class="token punctuation">}</span>

    <span class="token function">YatX</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">contain</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">NaN</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>slope <span class="token operator">*</span> x <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>offset
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 矩形类
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>

    <span class="token keyword">readonly</span> minX<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> maxX<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> lineFunction<span class="token operator">:</span> LineFunction<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 以矩形四个顶点坐标初始化
     * 
     * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number[][]<span class="token punctuation">}</span> rectPoint 矩形的四个顶点坐标
     */</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>rectPoint<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> sortPoint <span class="token operator">=</span> rectPoint<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span> b<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>minX <span class="token operator">=</span> sortPoint<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>maxX <span class="token operator">=</span> sortPoint<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>lineFunction <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createLineFunction</span><span class="token punctuation">(</span>sortPoint<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建每条边的线形函数
     * 
     * <span class="token keyword">@param</span>  <span class="token punctuation">{</span>number[][]<span class="token punctuation">}</span>     sortPoint 四个点的坐标
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span>LineFunction[]<span class="token punctuation">}</span>           4个线性函数
     */</span>
    <span class="token keyword">private</span> <span class="token function">createLineFunction</span><span class="token punctuation">(</span>sortPoint<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> LineFunction<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> lineFuntionList<span class="token operator">:</span> LineFunction<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

        lineFuntionList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LineFunction</span><span class="token punctuation">(</span><span class="token punctuation">[</span>sortPoint<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> sortPoint<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        lineFuntionList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LineFunction</span><span class="token punctuation">(</span><span class="token punctuation">[</span>sortPoint<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> sortPoint<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        lineFuntionList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LineFunction</span><span class="token punctuation">(</span><span class="token punctuation">[</span>sortPoint<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> sortPoint<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        lineFuntionList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LineFunction</span><span class="token punctuation">(</span><span class="token punctuation">[</span>sortPoint<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> sortPoint<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> lineFuntionList
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 确定 x 值后，与矩形相交的两个交点的y坐标
     * 
     * <span class="token keyword">@param</span>  <span class="token punctuation">{</span>number<span class="token punctuation">}</span>   x 距离
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span>number[]<span class="token punctuation">}</span>   
     */</span>
    <span class="token function">pointsOnEdgeAtX</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> pointsY<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>lineFunction<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>func <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> y <span class="token operator">=</span> func<span class="token punctuation">.</span><span class="token function">YatX</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isNaN</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                pointsY<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> pointsY<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="起点和终点" tabindex="-1"><a class="header-anchor" href="#起点和终点" aria-hidden="true">#</a> 起点和终点</h4>
<p>为了方便，我们这里定义起始点就是两个矩形在 <code v-pre>x</code> 方向上，4个顶点最小的 <code v-pre>x</code> 坐标分别为  <code v-pre>minX1</code>、<code v-pre>minX2</code>，4个顶点最大 <code v-pre>x</code> 坐标分别为 <code v-pre>maxX1</code>、<code v-pre>maxX2</code>，则 <code v-pre>x</code> 方向上起点为 <code v-pre>max(minX1,minX2)</code> ，终点为 <code v-pre>mix(maxX1,maxX2)</code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token function-variable function">rangeOfX</span> <span class="token operator">=</span> <span class="token punctuation">(</span>rect1<span class="token operator">:</span> Rectangle<span class="token punctuation">,</span> rect2<span class="token operator">:</span> Rectangle<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        start<span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>rect1<span class="token punctuation">.</span>minX<span class="token punctuation">,</span> rect2<span class="token punctuation">.</span>minX<span class="token punctuation">)</span><span class="token punctuation">,</span>
        end<span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>rect1<span class="token punctuation">.</span>maxX<span class="token punctuation">,</span> rect2<span class="token punctuation">.</span>maxX<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="重合部分" tabindex="-1"><a class="header-anchor" href="#重合部分" aria-hidden="true">#</a> 重合部分</h4>
<p>下面是针对给定的两个线段，计算重合部分</p>
<p>![重合部分计算示意](<a href="https://image-1257141638.cos.ap-guangzhou.myqcloud.com/2018-08-2010.13.36" target="_blank" rel="noopener noreferrer">https://image-1257141638.cos.ap-guangzhou.myqcloud.com/2018-08-2010.13.36<ExternalLinkIcon/></a> repeat-length.png)</p>
<p>重合部分就两种情况：a. 部分重合、b. 完全包含。这两种情况可以看作是四个点排序后中间两个点之间的距离。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token function-variable function">lengthOfCoverLine</span> <span class="token operator">=</span> <span class="token punctuation">(</span>line1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> line2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>line1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">>=</span> line2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">||</span> line2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">>=</span> line1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> all <span class="token operator">=</span> line1<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>line2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> all<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">-</span> all<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="累加" tabindex="-1"><a class="header-anchor" href="#累加" aria-hidden="true">#</a> 累加</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token function-variable function">comput</span> <span class="token operator">=</span> <span class="token punctuation">(</span>rect1Point<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> rect2Point<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> rect1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span>rect1Point<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> rect2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span>rect2Point<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> range <span class="token operator">=</span> <span class="token function">rangeOfX</span><span class="token punctuation">(</span>rect1<span class="token punctuation">,</span> rect2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> area <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> x <span class="token operator">=</span> range<span class="token punctuation">.</span>start<span class="token punctuation">;</span> x <span class="token operator">&lt;</span> range<span class="token punctuation">.</span>end<span class="token punctuation">;</span> x<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> pointsY1 <span class="token operator">=</span> rect1<span class="token punctuation">.</span><span class="token function">pointsOnEdgeAtX</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> pointsY2 <span class="token operator">=</span> rect2<span class="token punctuation">.</span><span class="token function">pointsOnEdgeAtX</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">let</span> length <span class="token operator">=</span> <span class="token function">lengthOfRepeatLine</span><span class="token punctuation">(</span>pointsY1<span class="token punctuation">,</span> pointsY2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        area <span class="token operator">+=</span> length
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> area<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后计算得出面积。</p>
</div></template>


