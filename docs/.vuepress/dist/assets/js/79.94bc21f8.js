(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{145:function(s,a,t){"use strict";t.r(a);var n=t(0),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"使用babel处理es6语法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用babel处理es6语法","aria-hidden":"true"}},[s._v("#")]),s._v(" 使用babel处理ES6语法")]),s._v(" "),t("blockquote",[t("p",[t("strong",[s._v("前面的操作都是没有对于兼容性的配置的.现在使用babel转换ES6语法,打开babel的官网,上面有比较全的在webpack中怎么配置的步骤.")])])]),s._v(" "),t("ol",[t("li",[t("p",[t("code",[s._v("npm install --save-dev babel-loader @babel/core")]),s._v("\nloader就不用说了,打包工具,babel/core是bael的核心库,他会把ES6语法转成抽象语法树,然后再换成js基础语法.")])]),s._v(" "),t("li",[t("p",[s._v("配置loader.")])])]),s._v(" "),t("div",{staticClass:"language-JavaScript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[s._v("module"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  rules"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" test"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/\\.js$/")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" exclude"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/node_modules/")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" loader"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"babel-loader"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("exclude的意思是,如果你的js文件是在node_modules目录下,我就不对其进行转译.")]),s._v(" "),t("ol",{attrs:{start:"3"}},[t("li",[t("p",[s._v("现在babel-loader和webpack已经有关联了,但是babel-loader是个单一职责的工具,他只负责转义动作,ES6转ES5的规则他其实并不知道.所以,我们还要安装一个工具才行.\n"),t("code",[s._v("npm install @babel/preset-env --save-dev")])])]),s._v(" "),t("li",[t("p",[s._v("在babel-loader中配置这个规则.")])])]),s._v(" "),t("div",{staticClass:"language-JavaScript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[s._v("rules"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" test"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/\\.js$/")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n        exclude"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/node_modules/")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n        loader"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"babel-loader"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        options"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            presets"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"@babel/preset-env"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("blockquote",[t("p",[t("strong",[s._v("光是ES6转ES5,这样还不够,不同浏览器对于API的支持也是不同的,这就好比jQuery修补了ajax（针对不同的浏览器启用不同的xmlhttp对象）。这就需要了polyfill了.")])])]),s._v(" "),t("ol",[t("li",[t("p",[s._v("Polyfilla是一个英国产品,用来刮墙的,也就是腻子.我们把旧浏览器比喻成有裂缝的墙,polyfill的作用就把墙变光滑.首先要安装. "),t("code",[s._v("npm install --save @babel/polyfill")])])]),s._v(" "),t("li",[t("p",[s._v("这个就不是在webpack中配置了,而是要在入口文件main.js顶部引入.\n"),t("code",[s._v('import "@babel/polyfill";')])])]),s._v(" "),t("li",[t("p",[s._v("再次打包测试,成功.但是有个问题,我们现在的项目只是测试用例,里面没有什么东西,以前打包好了,就是20+KB.现在加了babel处理,项目变成了800+KB了.这是因为虽然我们代码少,但是babel把全部的转义规则和API的实现都打包进去了.")])]),s._v(" "),t("li",[t("p",[s._v("如果想按需加载的话,我们需要在webpack中接着配置presets选项.")])])]),s._v(" "),t("div",{staticClass:"language-JavaScript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[s._v("presets"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"@babel/preset-env"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    useBuildIns"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'usage'")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("useBuildIns的作用是,当我们使用babel/polyfill进行填充的时候,不是把所有的差异特性都打包进来,而是你用到了什么函数,他就打包对应的规则信息.再次打包测试,文件变成了180KB+,精简了一些.")]),s._v(" "),t("blockquote",[t("p",[t("strong",[s._v("目前我们在日常项目开发中是没有问题了,但是如果我们开发的是一个组件,那么刚才的全局babel的方法就不是很合适了,会污染全局.")])])]),s._v(" "),t("ol",[t("li",[s._v("怎么办呢,我不想写了,感觉也用不到.")])]),s._v(" "),t("h2",{attrs:{id:"知识点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#知识点","aria-hidden":"true"}},[s._v("#")]),s._v(" 知识点")]),s._v(" "),t("ol",[t("li",[s._v("useBuildIns如果设置了值的话,webpack会自动帮你import babel进来,就不需要在全局的main.js中引入了.")])])])}),[],!1,null,null,null);a.default=e.exports}}]);