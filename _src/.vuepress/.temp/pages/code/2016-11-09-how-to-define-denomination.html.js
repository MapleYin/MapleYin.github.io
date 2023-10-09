export const data = JSON.parse("{\"key\":\"v-04feee7f\",\"path\":\"/code/2016-11-09-how-to-define-denomination.html\",\"title\":\"钱币面值怎么设定？\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"钱币面值怎么设定？\",\"description\":\"关于钱币组成的探讨\",\"date\":\"2016-11-09T00:00:00.000Z\",\"article\":false,\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://yinheng.me/code/2016-11-09-how-to-define-denomination.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Best Intention\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"钱币面值怎么设定？\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"关于钱币组成的探讨\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Maple Yin\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2016-11-09T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"钱币面值怎么设定？\\\",\\\"description\\\":\\\"关于钱币组成的探讨\\\"}\"]]},\"headers\":[{\"level\":3,\"title\":\"算法的正确性\",\"slug\":\"算法的正确性\",\"link\":\"#算法的正确性\",\"children\":[]},{\"level\":3,\"title\":\"无找钱环节\",\"slug\":\"无找钱环节\",\"link\":\"#无找钱环节\",\"children\":[]},{\"level\":3,\"title\":\"有找钱环节\",\"slug\":\"有找钱环节\",\"link\":\"#有找钱环节\",\"children\":[]}],\"readingTime\":{\"minutes\":3.57,\"words\":1072},\"filePathRelative\":\"code/2016-11-09-how-to-define-denomination.md\",\"localizedDate\":\"2016年11月9日\",\"excerpt\":\"<p>之前和一个朋友聊天的时候提到关于钱币的面值怎么设定好，这里的好，是指怎么规划可以使得组成指定钱所需的平均张数最少。</p>\\n<p>比如我们平时买东西，每次需要使用100元以下数额的钱的时候（1元~99元），需要用到1,5,10,20,50这几种面值的钱，有时需要1张，有时需要两张或多张。比如我需要付款68元，要使所用钱的张数最少我们会这样给钱：1张50元、1张10元、1张5元、3张1元。一共需要6张。有人会说直接给70元（50+20），让别人找2元（1+1），这样就只有4张参与交易了。对！下面我们从有找钱环节和没有找钱环节来说明这个问题。</p>\\n<h3> 算法的正确性</h3>\\n<p>因为下面的所有结论都是根据这个算法算出的结果得出来，所以算法的正确性就最为关键。这个是Demo：<a href=\\\"https://stplayproject.github.io/phpSub/demo/coins/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">Demo</a>。有兴趣的同学可以去试试，看算法是否正确。这个程序是根据你输入的面值的种类，然后生成1到你指定的一个数字之前所有数字的最优（张数最小）组合方式。</p>\"}")

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
