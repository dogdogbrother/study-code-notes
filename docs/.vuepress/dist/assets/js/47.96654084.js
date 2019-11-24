(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{135:function(s,a,e){"use strict";e.r(a);var t=e(0),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"运行第一个node项目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#运行第一个node项目","aria-hidden":"true"}},[s._v("#")]),s._v(" 运行第一个node项目")]),s._v(" "),e("p",[s._v("我们以一个国内开发的"),e("a",{attrs:{href:"https://github.com/Binaryify/NeteaseCloudMusicApi",target:"_blank",rel:"noopener noreferrer"}},[s._v("网易云音乐API"),e("OutboundLink")],1),s._v("的仓库为例,并运行起来,让我们浏览器可以访问到.")]),s._v(" "),e("h2",{attrs:{id:"先跑得起来"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#先跑得起来","aria-hidden":"true"}},[s._v("#")]),s._v(" 先跑得起来")]),s._v(" "),e("ol",[e("li",[s._v("创建目录\n我们在 var目录下新建一个www文件夹,作为我们所有git仓库的目录")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("cd /var/\n\nmkdir www\n\ncd www/\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("ol",{attrs:{start:"2"}},[e("li",[s._v("clone一个nodeJS项目")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("git colne https://github.com/Binaryify/NeteaseCloudMusicApi.git\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ol",{attrs:{start:"3"}},[e("li",[s._v("安装依赖")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("cd NeteaseCloudMusicApi/\n\nnpm i\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("ol",{attrs:{start:"4"}},[e("li",[s._v("测试下能不能跑起来")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("ls\n//发现入口文件是app.js\n\nnode app.js\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("p",[s._v("浏览器输入你的 "),e("strong",[s._v("公网ip:3000")]),s._v(" ,看是否能进去.")]),s._v(" "),e("p",[s._v("如果访问不到,大概率是你的安全组没有设置,登陆服务器商家的个人中心的控制台的服务器实例,设置安全组即可.")]),s._v(" "),e("p",[e("strong",[s._v("规范方向:入方向,协议:TCP,端口:3000,授权对象:0.0.0.0")])]),s._v(" "),e("blockquote",[e("p",[s._v("这里我多解释一下,你现在之所以能用ssh进行连接远程服务器,也是因为商家已经默认把22端口打开了的.")])]),s._v(" "),e("p",[e("strong",[s._v("至此我们项目已经跑成功了")])]),s._v(" "),e("h2",{attrs:{id:"pm2守护住"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pm2守护住","aria-hidden":"true"}},[s._v("#")]),s._v(" pm2守护住")]),s._v(" "),e("p",[s._v("虽然跑的起来,也能访问的到,但是有个问题,如果我们本地的cmd关闭了,那么这个node服务也就会相应的关闭.我们就需要一个能帮我们一直开启这个node服务的服务------"),e("strong",[s._v("pm2")])]),s._v(" "),e("p",[s._v("我们先ctrl+c关闭跑起来的服务.然后pm2守护.")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('pm2 start app.js --name="wangyi-music-api"\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("blockquote",[e("p",[e("code",[s._v("--name")]),s._v("是非必填项,但是我们后面会有好几个项目需要守护,都是app.js也分不清哪个是哪个,起个名字还是非常棒的.")])]),s._v(" "),e("p",[s._v("再次浏览器访问测试,没问题!!")]),s._v(" "),e("blockquote",[e("p",[s._v("这个地方其实有个小问题,"),e("code",[s._v("0,0,0,0")]),s._v("意味着所有人都可以访问这个借口,但是我们的这个接口其实只是针对于我们服务器内部请求,所以当我们前端项目也上线后,就可以把安全组的授权对象改为本机ip可访问.")])])])}),[],!1,null,null,null);a.default=n.exports}}]);