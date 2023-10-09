export const data = JSON.parse("{\"key\":\"v-445a1c63\",\"path\":\"/code/2018-08-20-area.html\",\"title\":\"任意位置两矩形相交面积\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"任意位置两矩形相交面积\",\"description\":\"给定任意两个矩形的四个顶点坐标，计算出两个矩形重叠的面积\",\"tag\":[\"just-for-fun\"],\"article\":false,\"date\":\"2018-08-20T00:00:00.000Z\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yinheng.me/code/2018-08-20-area.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Best Intention\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"任意位置两矩形相交面积\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"给定任意两个矩形的四个顶点坐标，计算出两个矩形重叠的面积\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Maple Yin\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"just-for-fun\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2018-08-20T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"任意位置两矩形相交面积\\\",\\\"description\\\":\\\"给定任意两个矩形的四个顶点坐标，计算出两个矩形重叠的面积\\\"}\"]]},\"headers\":[{\"level\":2,\"title\":\"问题描述\",\"slug\":\"问题描述\",\"link\":\"#问题描述\",\"children\":[]},{\"level\":2,\"title\":\"解决方案\",\"slug\":\"解决方案\",\"link\":\"#解决方案\",\"children\":[]},{\"level\":2,\"title\":\"具体实现\",\"slug\":\"具体实现\",\"link\":\"#具体实现\",\"children\":[]}],\"readingTime\":{\"minutes\":3.33,\"words\":1000},\"filePathRelative\":\"code/2018-08-20-area.md\",\"localizedDate\":\"2018年8月20日\",\"excerpt\":\"<h2> 问题描述</h2>\\n<p>最近开发一个关于照片打印的小程序，涉及到一个功能的实现——按面积计算价格。</p>\\n<p>用户编辑完图片后，需要计算图片显示的区域面积，然后计算此时打印出来所需要的价格，那么这个问题就简化成：</p>\\n<blockquote>\\n<p>给定任意两个矩形的位置信息，求两个矩形重合的面积。</p>\\n</blockquote>\\n<h2> 解决方案</h2>\\n<p>这里我想以矩形的四个顶点坐标来描述矩形的位置信息。由于两个矩形的位置是任意的，所以可以以任何角度重叠，传统的没有旋转角度的计算重合面积是一个规则的矩形在这里无法适用了，所以我设想的类似微积分的思想，比如在垂直方向上计算每一像素上重叠的部分，然后在水平方向上依次全部加起来。</p>\"}")

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
