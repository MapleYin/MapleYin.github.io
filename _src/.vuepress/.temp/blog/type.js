export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-79201ea3","v-1bad7f9d","v-477cb35a","v-7444dcb5"]}},"star":{"/":{"path":"/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":["v-79201ea3","v-1bad7f9d","v-477cb35a","v-7444dcb5"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

