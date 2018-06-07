---
layout: post
title: "What the f**k"

---


# WKWebView

在加载本地URL时，iOS9 以上的系统需要调用 `loadFileURL(_:allowingReadAccessTo:)  ` 这个其实大家都知道，但是如果想再次加载不同路径下的文件就会报错了，原因在于 `allowingReadAccessTo` 这个参数。

似乎这个参数只要一确定，就无法修改，于是可以做的是将 `allowingReadAccessTo` 改成需要切换的本地文件的根目录。