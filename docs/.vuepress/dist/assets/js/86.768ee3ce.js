(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{130:function(s,t,a){"use strict";a.r(t);var n=a(0),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"css文件的代码分割"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css文件的代码分割","aria-hidden":"true"}},[s._v("#")]),s._v(" CSS文件的代码分割")]),s._v(" "),a("h3",{attrs:{id:"我们可以打开webpack官网-documentation下的plugins下的minicssextractplugin-这个工具就能帮我们进行代码分割"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#我们可以打开webpack官网-documentation下的plugins下的minicssextractplugin-这个工具就能帮我们进行代码分割","aria-hidden":"true"}},[s._v("#")]),s._v(" 我们可以打开webpack官网,documentation下的plugins下的MiniCssExtractPlugin,这个工具就能帮我们进行代码分割.")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("前面我们写了很多例子,有些例子里面其实也是引入了css文件,第五章我们其实就是讲的css的loader.可是我们会发现,纵然我们的案例中是有css的引入的,但是在打包后缺没有生成响应的css文件,而是只有main.js.")]),s._v(" "),a("ul",[a("li",[s._v("这是因为css文件的内容被打包进了js文件,这是个概念,叫做"),a("code",[s._v("css in js")]),s._v(".\n如果我们想把css单独抽离出来,不打包进css里面,这就需要"),a("code",[s._v("MiniCssExtractPlugin")]),s._v("这个插件了.")])])]),s._v(" "),a("li",[a("p",[s._v("不过"),a("code",[s._v("MiniCssExtractPlugin")]),s._v("有点缺陷,在官网中我们可以看到,MiniCssExtractPlugin的HMR热更新功能还是列在todo中,还没做好这个功能,这就意味着css代码分割只能用于打包,而不太能用在开发中.")]),s._v(" "),a("ul",[a("li",[s._v("Extract的意思是提取.")])])]),s._v(" "),a("li",[a("p",[s._v("安装官网的指导走,安装 "),a("code",[s._v("npm install --save-dev mini-css-extract-plugin")])])]),s._v(" "),a("li",[a("p",[s._v("2条里面说了,这个适合在线上环境使用,所以我们需要在"),a("code",[s._v("webpack.prod.js")]),s._v("文件里面引入配置下.")])])]),s._v(" "),a("div",{staticClass:"language-JavaScript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" MiniCssExtractPlugin "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"mini-css-extract-plugin"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//省略其他引入的代码")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" prodConfig "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//省略其他配置项的代码")]),s._v("\n    plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MiniCssExtractPlugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("export "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//省略代码")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("ol",{attrs:{start:"4"}},[a("li",[a("p",[s._v("光配置了css还不够,我们还需要配置rules.我们把"),a("code",[s._v("webpack.common.js")]),s._v("文件中关于css的loader剪切一下,拿到"),a("code",[s._v("webpack.dev.js")]),s._v("中,也就是在开发环境中,对css文件的处理还是一样的.这里我们开始修改"),a("code",[s._v("webpack.prod.js")]),s._v("文件,我们把"),a("code",[s._v("'style-loader'")]),s._v("换成"),a("code",[s._v("MiniCssExtractPlugin.loader")]),s._v(".")])]),s._v(" "),a("li",[a("p",[s._v("再次打包测试,发现失败,只有main.js,没有css文件. 原因有很多其中之一就是我们在"),a("code",[s._v("webpack.dev.js")]),s._v("中设置了"),a("code",[s._v("usedExport")]),s._v("属性,这个是为了前面我们说的摇树,tree shaing.因为设置了"),a("code",[s._v("usedExport")]),s._v(",webpack会给所有的模块作用,但是现在我要"),a("code",[s._v("usedExport")]),s._v("不作用于css文件.")])]),s._v(" "),a("li",[a("p",[s._v("修改package.json文件,"),a("code",[s._v('sideEffects:["*.css"]')]),s._v(",然后记得把"),a("code",[s._v("usedExports:true")]),s._v("放到common中去.再次打包测试,发现已经有css文件了.但是这个文件不是压缩的,我们需要压缩,所以还需一步.")])]),s._v(" "),a("li",[a("p",[s._v("安装 "),a("code",[s._v("npm run optimize-css-assets-webpack-plugi -D")])])]),s._v(" "),a("li",[a("p",[s._v("webpack.prod.js中引入加配置.")])])]),s._v(" "),a("div",{staticClass:"language-JavaScript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" OptimizeCssAssetsWebpackPlugi "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"optimize-css-assets-webpack-plugi"')]),s._v("\noptimization"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    minimizer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("OptimizeCssAssetsWebpackPlugi")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("ol",{attrs:{start:"9"}},[a("li",[s._v("再次打包,测试,没问题.")])])])}),[],!1,null,null,null);t.default=e.exports}}]);