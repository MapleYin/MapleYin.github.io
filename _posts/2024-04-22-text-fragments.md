---
title: "Text Fragments"
categories: ['Technology', 'Front End']
tags: [standard]
---

## Hash Tag

当读到一篇文章发现非常不错的段落想要分享给别人？通常我们知道在前端里面有个概念叫“锚点”，也就是 `<a href="#SomeTitleId">Title</a>` 可以点击直接定位到我们想要定位对应的位置（某个`id` 属性的值为 `SomeTitleId` 的标签，如 `<div id="SomeTitleId"></div>` ）。此时网站开发着会将各个段落都会打好“锚点”，当我们点击后，浏览器 URL 栏里面的 URL 就会被追加这个锚点 `https://example.com#SomeTitleId` ，当我们分享的这个 URL 被打开时，就会被自动跳转到标记的位置。

大多数情况下，网站的维护人员会针对有标题或者小标题的文章标注了“锚点”，对于段落本身大多数情况下是没有的。

```html
<h2 id="title1"><a href="#title1">This is a title</a></h2>
<p>this is paragraph 1.1</p>
<p>this is paragraph 1.2</p>
<p>this is paragraph 1.3</p>
<h2 id="title2"><a href="#title2">This is a title 2</a></h2>
<p>this is paragraph 2.1</p>
<p>this is paragraph 2.2</p>
<p>this is paragraph 2.3</p>
```

此时如果要想分享 'this is paragraph 2.1' 的话，除非维护人员给每个段落都添加“锚点”，否则就没办法用此方法来定位具体位置，所以这里需要一个更加通用一点的方案。

## Text Fragments

一种叫 [Text Fragments](https://developer.mozilla.org/en-US/docs/Web/Text_fragments) 的标准可以满足上面描述的情况。

### 语法

```url
https://example.com#:~:text=[prefix-,]textStart[,textEnd][,-suffix]
```

#### `:~:`

表示接下来就是 Text Fragments 定义了，否则还是会以`锚点` 方式来解析。

#### `text=`

表示需要高亮的文字。

#### `textStart`

高亮文字开始部分。

#### `textEnd`

高亮位置结束。一般情况下只需要提供 `textStart` 。不过，当需要高亮的文字比较长的时候，就可以提供长文本的开始文字和结束文字以此来减少 URL 的长度。

```
As ominous music plays, a broad-faced, beady-eyed man disguises himself as a street fashion photographer, a lab technician, a businessman and a food delivery driver – he even sets up an online honey trap – to glean sensitive state secrets in various places and industries.
```

```URL
https://example.com#:~:text=As%20ominous%20music,places%20and%20industries.
```

#### `prefix-`

高亮位置前缀，一般用于区分如果高亮的文字在文章里面出现的位置比较多，就可以用前/后缀的方式给区分出来。

```
As ominous music plays, a broad-faced, beady-eyed man disguises himself as a street fashion photographer, a lab technician, a businessman and a food delivery driver – he even sets up an online honey trap – to glean sensitive state secrets in various places and industries.
```

如想要高亮 “**a** lab technician” 中的 `a`：

```URL
https://example.com#:~:text=street%20fashion%20photographer%2C-,a,-lab%20technician%2C%20a
```

#### `-suffix`

高亮文字后缀。

> `textStart`, `textEnd`, `prefix-` ， 和 `-suffix`  的值都需要 URL encode 。
{: .prompt-info }

### 高亮文字样式

```css
::target-text {
  background-color: blue;
  color: white;
}
```