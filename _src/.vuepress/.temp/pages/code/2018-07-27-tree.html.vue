<template><div><p>树，作为计算机技术里面最常见的数据结构，一直想系统的梳理下，对于一些名词真的只是听过，具体定义也可能当时了解，然后全部忘干净，然后使用场景以及意义都没仔细去思考。所以想系统的来对 “树” 这个数据结构来梳理下。</p>
<h1 id="什么是-树" tabindex="-1"><a class="header-anchor" href="#什么是-树" aria-hidden="true">#</a> 什么是“树”</h1>
<blockquote>
<p>在计算机科学中，树（英语：tree）是一种抽象数据类型（ADT）或是实作这种抽象数据类型的数据结构，用来模拟具有树状结构性质的数据集合。它是由n（n&gt;0）个有限节点组成一个具有层次关系的集合。把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的。</p>
</blockquote>
<p>具体的特别如下：</p>
<ul>
<li>每个节点有零个或多个子节点</li>
<li>没有父节点的节点称为根节点</li>
<li>每一个非根节点有且只有一个父节点</li>
<li>除了根节点外，每个子节点可以分为多个不相交的子树</li>
</ul>
<figure><img src="https://image-1257141638.cos.ap-guangzhou.myqcloud.com/post/tree.png" alt="tree" tabindex="0" loading="lazy"><figcaption>tree</figcaption></figure>
<p><strong>树</strong>典型的的样子如上图所示，<code v-pre>1</code> 则被称为根节点。</p>
<h1 id="一些概念" tabindex="-1"><a class="header-anchor" href="#一些概念" aria-hidden="true">#</a> 一些概念</h1>
<ul>
<li><strong>节点的度</strong>：一个节点含有的子树的个数称为该节点的度</li>
<li><strong>树的度</strong>：一棵树中，最大的节点的度称为树的度</li>
<li><strong>叶节点</strong>或<strong>终端节点</strong>：度为零的节点</li>
<li><strong>非终端节点</strong>或<strong>分支节点</strong>：度不为零的节点</li>
<li><strong>父亲节点</strong>或<strong>父节点</strong>：若一个节点含有子节点，则这个节点称为其子节点的父节点</li>
<li><strong>孩子节点</strong>或<strong>子节点</strong>：一个节点含有的子树的根节点称为该节点的子节点</li>
<li><strong>兄弟节点</strong>：具有相同父节点的节点互称为兄弟节点</li>
<li>节点的<strong>层次</strong>：从根开始定义起，根为第1层，根的子节点为第2层，以此类推</li>
<li><strong>深度</strong>：对于任意节点n,n的深度为从根到n的唯一路径长，根的深度为0</li>
<li><strong>高度</strong>：对于任意节点n,n的高度为从n到一片树叶的最长路径长，所有树叶的高度为0</li>
<li><strong>堂兄弟节点</strong>：父节点在同一层的节点互为堂兄弟</li>
<li><strong>节点的祖先</strong>：从根到该节点所经分支上的所有节点</li>
<li><strong>子孙</strong>：以某节点为根的子树中任一节点都称为该节点的子孙</li>
<li><strong>森林</strong>：由m（m&gt;=0）棵互不相交的树的集合称为森林</li>
</ul>
<h1 id="常见树的种类" tabindex="-1"><a class="header-anchor" href="#常见树的种类" aria-hidden="true">#</a> 常见树的种类</h1>
<ul>
<li>二叉树</li>
<li>霍夫曼树</li>
<li>B 树</li>
</ul>
</div></template>


