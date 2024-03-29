export const data = JSON.parse("{\"key\":\"v-2b05e00e\",\"path\":\"/code/2016-11-20-image-min-repeat.html\",\"title\":\"图片最小重复单元\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"图片最小重复单元\",\"description\":\"怎样从一个平铺的图中找到最小重复的那个图？\",\"date\":\"2016-11-20T00:00:00.000Z\",\"article\":false,\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yinheng.me/code/2016-11-20-image-min-repeat.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Best Intention\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"图片最小重复单元\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"怎样从一个平铺的图中找到最小重复的那个图？\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Maple Yin\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2016-11-20T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"图片最小重复单元\\\",\\\"description\\\":\\\"怎样从一个平铺的图中找到最小重复的那个图？\\\"}\"]]},\"headers\":[{\"level\":3,\"title\":\"为什么要找最小重复单元\",\"slug\":\"为什么要找最小重复单元\",\"link\":\"#为什么要找最小重复单元\",\"children\":[]},{\"level\":3,\"title\":\"怎样找图片最小重复单元\",\"slug\":\"怎样找图片最小重复单元\",\"link\":\"#怎样找图片最小重复单元\",\"children\":[]},{\"level\":3,\"title\":\"如何确定长和宽\",\"slug\":\"如何确定长和宽\",\"link\":\"#如何确定长和宽\",\"children\":[]}],\"readingTime\":{\"minutes\":5.83,\"words\":1749},\"filePathRelative\":\"code/2016-11-20-image-min-repeat.md\",\"localizedDate\":\"2016年11月20日\",\"excerpt\":\"<p>很多时候我们会看到一个大图是由很多很多重复出现的小图平铺而成的，就像我们人行道上的砖块，每一个砖块就是一个重复单元，然后很多砖块一起铺成人行道，于是每个砖块就可能是一个最小重复单元（具体情况得看每个砖块上的图形）。于是情况是这样的，给你一张很大的图，找出这个图片最小的那个重复单元，如果没有那整个大图就是一个最小重复单元。</p>\\n<h3> 为什么要找最小重复单元</h3>\\n<p>前端开发中，我们都知道如果一个背景是由一个小图平铺而成，那么我们不用使用一张完整的大图而是只需要用这个小图进行平铺就好，这样就节省了网路的流量开销，同时也加快页面加载速度，这个没什么好说的。</p>\\n<p>问题在于，设计给设计稿时，如果这个背景图是由一个小图平铺而成的，他是不会给你这个最小重复单元的图的（或是没想到或者不知道），于是在切图的时候就需要截取这个最小重复单元，有些图很容易用肉眼看出来哪个是最小重复单元，然后用PS随便截取一个就好了，但是就是有那么些图肉眼看就没那么轻松，又觉得不好去麻烦设计给这个最小重复单元的图，于是就想自己来做一个可以自动寻找到这个最小重复单元的小程序。</p>\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
