(window.webpackJsonp=window.webpackJsonp||[]).push([[149],{116:function(s,t,a){"use strict";a.r(t);var n=a(0),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"next-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#next-js","aria-hidden":"true"}},[s._v("#")]),s._v(" Next.js")]),s._v(" "),a("p",[s._v("服务器端渲染 Server Side Rende,SSR是我们经常听到的词,然而nextjs与以往的php服务器渲染又不太一样,更应该被称为"),a("strong",[s._v("同构渲染")]),s._v(".")]),s._v(" "),a("p",[s._v("同构渲染之所以应用而生,其实都是对于目前前端的主流技术"),a("code",[s._v("vue/react")]),s._v("单页面的2个致命缺点的弥补.\n由于只有一个index.html页面,而且没有任何东西,内容全是js注入,这就带来2个问题:")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("js文件太大,就算是用了路由懒加载等方法尽可能的分割减少vender.js文件,稍稍大一些的项目也要3M起步,如果不用路由懒加载20M的js文件不是梦.")])]),s._v(" "),a("li",[a("p",[s._v("因为内容文字都是在js中的,搜索引擎公司没有扫描你的文档信息而收录你的内容,所以SEO效果极差.")])])]),s._v(" "),a("h2",{attrs:{id:"脚手架create-next-app来安装next项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#脚手架create-next-app来安装next项目","aria-hidden":"true"}},[s._v("#")]),s._v(" 脚手架create-next-app来安装next项目")]),s._v(" "),a("ol",[a("li",[s._v("全局安装这个脚手架工具")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("npm create-next-app\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("然后和其他的脚手架工具差不多的")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("npx create-next-app my-next-app\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("nextjs自带服务器，但是它只是用来处理渲染内容，无法处理服务器，所以我们还要用koa来做后端，next只是用来中间件作用。\n3. 安装koa先，然后根目录下创建一个server.js文件,内容如下")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" Koa "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'koa'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" next "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'next'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" dev "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" process"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("NODE_ENV")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'production'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" dev "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" handle "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getRequestHandler")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("prepare")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" server "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Koa")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("async")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("ctx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("await")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("handle")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ctx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" ctx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        ctx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("response "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("listen")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'koa已启动,端口3000'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br")])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("添加pakes.json中的script命令,")])]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node server.js"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ol",{attrs:{start:"5"}},[a("li",[a("code",[s._v("npm run dev")]),s._v("启动测试,没有问题.我们看到了脚手架工具默认的页面展示.")])]),s._v(" "),a("blockquote",[a("p",[s._v("与vue的cli,react的creat-react-app等脚手架工具不同的是,create-next-app做的事是很少的,我们其实完全可以不通过脚手架来初始化一个next项目."),a("br"),s._v("\n还有一点奇怪的是,我们并没有定义路由信息,但是当我们访问根路径的时候却能访问到,这个是因为pages文件本身的层级关系就是路由信息")])]),s._v(" "),a("h2",{attrs:{id:"手动安装next项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#手动安装next项目","aria-hidden":"true"}},[s._v("#")]),s._v(" 手动安装next项目")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("npm init\nnpm i --save react react-dom next koa\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("我们在根目录下建立一个新的文件夹pages,里面放上一个index.js,内容导出一个标签.")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("span"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("index页面"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("span"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("运行"),a("code",[s._v("npm run dev")]),s._v("就能看到这个页面了,是不是非常的轻量.")]),s._v(" "),a("blockquote",[a("p",[s._v("这个地方引发个思考,我们可以查看network,请求的html文件中就包含了"),a("code",[s._v("<span>index页面</span>")]),s._v("内容,这与以往我们开发的vue和react都是不一样的,页面内容不是由js注入的."),a("br"),s._v("\n带来的好处上面也说了,SEO友好(文档有内容,能抓到),对js的依赖的减轻也让页面加载速度更快了,减少了首页白屏的缺点.")])]),s._v(" "),a("h2",{attrs:{id:"关于一些细节问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于一些细节问题","aria-hidden":"true"}},[s._v("#")]),s._v(" 关于一些细节问题")]),s._v(" "),a("p",[s._v("server.js代码中有个小细节，就是有的时候我们用的是ctx.response,有的时候用的是ctx.res，这两个有什么不同吗?")]),s._v(" "),a("p",[s._v("是因为ctx.response其实是koa封装好的http模块，但是问题是有的中间件不仅仅要和koa配合，有可能会和其他的框架配合，这样使用你暴露的专属API就不太科学，所以koa还可以使用ctx.res来返回原生的http的数据,提供给其他人自行开发使用.")])])}),[],!1,null,null,null);t.default=e.exports}}]);