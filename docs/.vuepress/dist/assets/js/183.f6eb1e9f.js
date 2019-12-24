(window.webpackJsonp=window.webpackJsonp||[]).push([[183],{99:function(s,a,e){"use strict";e.r(a);var t=e(0),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"技术选型概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#技术选型概述","aria-hidden":"true"}},[s._v("#")]),s._v(" 技术选型概述.")]),s._v(" "),e("p",[s._v("node基本就是express,koa2,egg三种了.\nexpress比较老了,在逻辑处理上用的回调函数的形式.\nkoa2是express原版人马打造,以精简轻量为特点.\negg是阿里对koa2的再次封装.")]),s._v(" "),e("p",[s._v("鉴于是学习的角度,我们使用koa2,自己会做一些封装达到类似于egg的功能.")]),s._v(" "),e("p",[s._v("数据库mysql")]),s._v(" "),e("p",[s._v("登录session")]),s._v(" "),e("p",[s._v("前端ejs后端模板引擎")]),s._v(" "),e("p",[s._v("缓存redis,没有对手")]),s._v(" "),e("p",[s._v("单元测试jest,也基本没有对手.")]),s._v(" "),e("h2",{attrs:{id:"安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装","aria-hidden":"true"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" i -g koa-generator \nkoa2 -e koa2-weibo-code\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" koa2-weibo-code "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" i\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("p",[e("code",[s._v("-e")]),s._v("的意思是用 ejs 模式.运行"),e("code",[s._v("app.js")]),s._v(",访问3000端口即可.")]),s._v(" "),e("p",[s._v("我们还需要设置环境变量,先安装个工具:")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" i cross-env -D\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("修改package.json中的scripts中的dev和prd命令:")]),s._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dev"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cross-env NODE_ENV=dev ./node_modules/..."')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"prd "')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cross-env NODE_ENV=production pm2 start bin/www"')]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("h2",{attrs:{id:"修改下目录结构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#修改下目录结构","aria-hidden":"true"}},[s._v("#")]),s._v(" 修改下目录结构")]),s._v(" "),e("p",[s._v("现在不管前后端开发,都习惯有个src目录,这次也不例外,建立src目录后,把app.js/public/routes/views等文件目录全部移到src目录下.")]),s._v(" "),e("p",[s._v("然后不要忘了调整已有的路径,bin/www.js中的app引入修改一下.")]),s._v(" "),e("p",[s._v("app.js文件中有2个logger,我们删除掉第二个logger(只是中间件的演示).")])])}),[],!1,null,null,null);a.default=n.exports}}]);