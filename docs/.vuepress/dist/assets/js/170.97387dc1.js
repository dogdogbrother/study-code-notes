(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{111:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"getinitialprops"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getinitialprops","aria-hidden":"true"}},[t._v("#")]),t._v(" getInitialProps")]),t._v(" "),a("p",[t._v("我们日常的SPA项目多页面可以共享数据,传输数据,是因为我们看似多个页面,其实是一个页面.")]),t._v(" "),a("p",[t._v("这种形式的数据在nextjs这种SSR上就行不通,因为每个页面都是服务器单端渲染出来的,数据之间的关联更复杂一些.")]),t._v(" "),a("h2",{attrs:{id:"个人理解-会跟着对nextjs熟悉的程度而更改"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#个人理解-会跟着对nextjs熟悉的程度而更改","aria-hidden":"true"}},[t._v("#")]),t._v(" 个人理解(会跟着对nextjs熟悉的程度而更改)")]),t._v(" "),a("p",[t._v("我们点击淘宝的一个页面,会发现在加载,如果加载成功了,才会跳转到新页面去. 而SPA单页面是先去一个新页面先白屏,再等待加载渲染内容.")]),t._v(" "),a("p",[t._v("淘宝的形式就是传统的服务端渲染的表现,而"),a("code",[t._v("getInitialProps")]),t._v("就是做这一点的.")]),t._v(" "),a("p",[t._v("因为是同构渲染,"),a("code",[t._v("getInitialProps")]),t._v("还有一个与传统服务端渲染不同的特性就是,他有可能会在服务端运行,也有可能在客户端运行.nextjs会判断,不会让两端重复执行.")]),t._v(" "),a("p",[t._v("两端渲染是什么意思呢?")]),t._v(" "),a("p",[t._v("举个例子,我从A页面点击link跳转B页面,这其实和服务端没什么关系,走的就是前端路由,"),a("code",[t._v("getInitialProps")]),t._v("中的异步操作就是在前端执行的.")]),t._v(" "),a("p",[t._v("但是我在B页面刷新了一下,这个时候B页面其实是由服务端渲染得来的,"),a("code",[t._v("getInitialProps")]),t._v("就会在服务端执行请求数据等等的操作,然后生成页面发送给前端.")]),t._v(" "),a("h2",{attrs:{id:"基本使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本使用","aria-hidden":"true"}},[t._v("#")]),t._v(" 基本使用")]),t._v(" "),a("p",[t._v("我们在a.js文件中使用下"),a("code",[t._v("getInitialProps")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" withRouter "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'next/router'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("A")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" router"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("span"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("router"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("query"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("A")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("span"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("A")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("getInitialProps")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'senlin'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("withRouter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("A")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])]),a("p",[t._v("我们在A组件中就能拿到这个"),a("code",[t._v("name")]),t._v("值.")]),t._v(" "),a("p",[t._v("这只是个最基础的应用,我们还可以在"),a("code",[t._v("getInitialProps")]),t._v("里面进行异步的网络请求.")]),t._v(" "),a("h2",{attrs:{id:"app中获取数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#app中获取数据","aria-hidden":"true"}},[t._v("#")]),t._v(" APP中获取数据")]),t._v(" "),a("p",[t._v("pages下的任何理由页面都能拿到_app.js文件中的数据,是因为_app.js是nextjs默认内置的一个文件,是所有路由的父组件.")]),t._v(" "),a("p",[a("code",[t._v("getInitialProps")]),t._v("能在APP中拿到数据,我们在下一个章节里面去讲.")])])}),[],!1,null,null,null);s.default=e.exports}}]);