(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{56:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"词法作用域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#词法作用域","aria-hidden":"true"}},[t._v("#")]),t._v(" 词法作用域")]),t._v(" "),s("blockquote",[s("p",[s("strong",[t._v("无语  ???")]),s("br"),t._v('\n一大章晦涩难懂,结局是,"这些都没用了,已经被抛弃了,我只是给你介绍介绍而已."')])]),t._v(" "),s("h2",{attrs:{id:"词法阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#词法阶段","aria-hidden":"true"}},[t._v("#")]),t._v(" 词法阶段")]),t._v(" "),s("blockquote",[s("p",[t._v("书中絮絮叨叨说了不少,我到底也没看出来词法作用域和变量作用域有啥区别,感觉全是废话.")])]),t._v(" "),s("p",[t._v("第一章介绍过,大部分标准语言编译器的第一个工作阶段叫做词法化(也叫单词化).")]),t._v(" "),s("p",[t._v("这个概念是理解词法作用域及其名称来历的基础.")]),t._v(" "),s("h2",{attrs:{id:"欺骗词法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#欺骗词法","aria-hidden":"true"}},[t._v("#")]),t._v(" 欺骗词法")]),t._v(" "),s("p",[t._v('如果词法作用域完全由写代码期间函数声明的位置来定义,怎样才能在运行时来"修正"词法作用域呢?(也可以说是欺骗).')]),t._v(" "),s("p",[t._v("都不推荐使用,性能也不好.")]),t._v(" "),s("h3",{attrs:{id:"_1-eval"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-eval","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. eval")]),t._v(" "),s("p",[t._v("直接看个例子:")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("fonction "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("str"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("eval")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//欺骗")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"var b = 3;"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//1,3")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])]),s("p",[t._v("根据上面的对词法作用域的说明,打印的b应该是2.事实上却是3,是因为"),s("code",[t._v("eval")]),t._v("函数执行所生成的"),s("code",[t._v("b")]),t._v("覆盖了外层的"),s("code",[t._v("b")]),t._v(",这违背了词法作用域的规则,故此叫做 "),s("strong",[t._v("欺骗词法")]),t._v(".")]),t._v(" "),s("p",[s("code",[t._v("eval()")]),t._v("通常用来动态的创建代码.")]),t._v(" "),s("p",[t._v("在严格模式下"),s("code",[t._v("eval()")]),t._v("有其自己的词法作用域,意味着其中的声明无法修改所在的作用域.")]),t._v(" "),s("h3",{attrs:{id:"_2-with"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-with","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. with")]),t._v(" "),s("p",[t._v("已经在严格模式下完全的禁止了,我是真的懒得看.跳过了.")]),t._v(" "),s("h3",{attrs:{id:"性能"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#性能","aria-hidden":"true"}},[t._v("#")]),t._v(" 性能")]),t._v(" "),s("p",[t._v("js引擎会在编译阶段进行数项的性能优化,其中有些优化依赖于能够根据代码块的词法进行静态分析,并预先确认所有变量和函数的定义位置,才能在执行过程中快速找到标识符.")]),t._v(" "),s("p",[s("code",[t._v("eval()")]),t._v("和"),s("code",[t._v("with")]),t._v("的存在破坏了这种优化,因为你不知道"),s("code",[t._v("eval")]),t._v("里面会创建什么东西出来,会不会和你的标识符有冲突.所以最简单的做法就是 "),s("strong",[t._v("完全不做任何优化")]),t._v(".")]),t._v(" "),s("h3",{attrs:{id:"小结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#小结","aria-hidden":"true"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),s("p",[t._v("词法作用域意味着作用域是由书写代码时的函数声明的位置来决定的."),s("br"),t._v("\n编译的词法分析阶段基本能够知道全部的标识符在哪里以及是如何声明的,从而能够预测在执行过程中如何对他们进行查找.")])])}),[],!1,null,null,null);a.default=e.exports}}]);