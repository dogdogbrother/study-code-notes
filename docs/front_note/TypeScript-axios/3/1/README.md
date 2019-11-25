# 需求分析
重构axios之前，我们需要简单地做一些需求分析，看一下我们这次重构需要支持哪些 feature(特色)。

## Features

* 在浏览器端使用 XMLHttpRequest 对象通讯
* 支持 Promise API
* 支持请求和响应的拦截器
* 支持请求数据和响应数据的转换
* 支持请求的取消
* JSON 数据的自动转换
* 客户端防止 XSRF
