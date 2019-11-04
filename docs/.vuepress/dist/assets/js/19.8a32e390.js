(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{83:function(a,s,t){"use strict";t.r(s);var n=t(0),r=Object(n.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"作用域是什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#作用域是什么","aria-hidden":"true"}},[a._v("#")]),a._v(" 作用域是什么")]),a._v(" "),t("blockquote",[t("p",[t("strong",[a._v("一脸懵逼")]),t("br"),a._v("\n这章的内容有点抽象，也整理不出多少东西来")])]),a._v(" "),t("h2",{attrs:{id:"编译原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#编译原理","aria-hidden":"true"}},[a._v("#")]),a._v(" 编译原理")]),a._v(" "),t("p",[a._v("在传统的编译语言的流程中，程序的一段源代码在执行之前会经历三个步骤，统称为“编译”。")]),a._v(" "),t("p",[t("strong",[a._v("1. 分词/词法分析")]),t("br"),a._v("\n将字符串分解成有意义的代码块,例如"),t("code",[a._v("var = 2;")]),a._v(",会被分解成"),t("code",[a._v("var")]),a._v("、"),t("code",[a._v("a")]),a._v("、"),t("code",[a._v("=")]),a._v("、"),t("code",[a._v("2")]),a._v("、"),t("code",[a._v(";")])]),a._v(" "),t("p",[t("strong",[a._v("2. 解析/语法分析")]),t("br"),a._v("\n把词法单元流数组([var,a,=,2,;]),转换成一个由元素逐级嵌套组成的树，也就是"),t("strong",[a._v("抽象语法树(AST)")])]),a._v(" "),t("p",[t("strong",[a._v("3. 代码生成")]),t("br"),a._v("\n将AST转换为可执行代码的过程,简单来说就是有某种方法可以将``var a = 2;`的AST转化为一组机器指令,用来创建一个叫做a的变量(包括分配内存等),并将一个值存储在a中.")]),a._v(" "),t("p",[a._v("对于js来说,大部分情况下编译发生在代码执行前的几微妙的时间内.简单来说,任何js代码片段在执行前都会进行编译.")]),a._v(" "),t("h2",{attrs:{id:"理解作用域"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#理解作用域","aria-hidden":"true"}},[a._v("#")]),a._v(" 理解作用域")]),a._v(" "),t("p",[a._v("利用 "),t("strong",[a._v("引擎")]),a._v(","),t("strong",[a._v("编译器")]),a._v(","),t("strong",[a._v("作用域")]),a._v(",来完成"),t("code",[a._v("var a = 2;")]),a._v("的处理")]),a._v(" "),t("ol",[t("li",[t("p",[a._v("当看到"),t("code",[a._v("var a = 2;")]),a._v("时,我们认为这是一个生命,但是编译器却认为这里有两个完全不同的声明,一个由编译器在编译时处理,另一个则由引擎在运行时处理")])]),a._v(" "),t("li",[t("p",[a._v("遇到"),t("code",[a._v("var a")]),a._v(",编译器会询问作用域是否已经有一个该名称的变量存在同一个作用域的集合中,如果是,则忽略该生命继续编译.否则他就会要求作用域在当前集合中声明一个新的变量,并命名为a.")])]),a._v(" "),t("li",[t("p",[a._v("接下来编译器会为引擎生成运行时所需要的代码,这些代码用来处理"),t("code",[a._v("a=2")]),a._v("这个赋值操作.引擎运行时会首先询问作用域,当前集合中是否存在a变量,是的话就赋值给他,不是的话继续查找该变量.如果一直找不到,就抛异常.")])])]),a._v(" "),t("h3",{attrs:{id:"为了进一步理解-我们需要多介绍一点编译器的术语-这章最恶心的地方来了"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为了进一步理解-我们需要多介绍一点编译器的术语-这章最恶心的地方来了","aria-hidden":"true"}},[a._v("#")]),a._v(" 为了进一步理解,我们需要多介绍一点编译器的术语(这章最恶心的地方来了)")]),a._v(" "),t("p",[a._v("编译器在编译的第二步中生成了代码,引擎执行它时,会通过查找a来判断它是否已被声明过.但是引擎执行怎样的查找,会影响最终的查找结果."),t("br"),a._v("\n在上面的例子中,引擎会为变量a进行LHS查询.(另外一种查找的类型叫做RHS)."),t("br"),a._v("\n换句话说,当变量出现在赋值操作的左侧时进行LHS查询,出现在右侧时进行RHS查询.\n讲的更准确一点,RHS查询与简单的查找某个变量的值别无二致而LHS查询是试图找到变量的容器本身."),t("br"),a._v(" "),t("strong",[a._v('可以理解RHS为"得到某某值"的行为')])]),a._v(" "),t("p",[a._v("参考下面的程序,其中既有LHS也有RHS引用")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("function")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("foo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[a._v("a")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("foo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br")])]),t("p",[t("code",[a._v("foo(2)")]),a._v("的调用需要对"),t("code",[a._v("foo")]),a._v("进行RHS引用.代码中还有一个隐形的"),t("code",[a._v("a=2")]),a._v("的操作,这里要用LHS来找到a.还要还要RHS找到2,并把值给"),t("code",[a._v("console.log()")]),a._v(","),t("code",[a._v("console.log")]),a._v("本身需要引用,我们要对console对象进行RHS查询,检查得到的值里面有没有一个叫做"),t("code",[a._v("log")]),a._v("的方法.")]),a._v(" "),t("h2",{attrs:{id:"小测试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#小测试","aria-hidden":"true"}},[a._v("#")]),a._v(" 小测试")]),a._v(" "),t("ol",[t("li",[a._v("找到三处LHS查询.")]),a._v(" "),t("li",[a._v("找到四处RHS查询")])]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("function")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("foo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[a._v("a")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" b "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" a "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" b"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" c "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("foo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br")])]),t("p",[t("code",[a._v("var c = ...")]),a._v("(LHS),"),t("code",[a._v("... = foo()")]),a._v("(RHS),"),t("code",[a._v("(a = 2)")]),a._v("(LFS),"),t("code",[a._v("b = ...")]),a._v("(LFS),"),t("code",[a._v(".. = a")]),a._v("(RHS),"),t("code",[a._v("a+b")]),a._v("(2个RHS)")]),a._v(" "),t("h2",{attrs:{id:"嵌套作用域"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#嵌套作用域","aria-hidden":"true"}},[a._v("#")]),a._v(" 嵌套作用域")]),a._v(" "),t("p",[a._v("这个其实没什么好说,作为一个前端谁还不知道作用域是咋回事啊.")]),a._v(" "),t("h2",{attrs:{id:"异常"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#异常","aria-hidden":"true"}},[a._v("#")]),a._v(" 异常")]),a._v(" "),t("blockquote",[t("p",[t("strong",[a._v("为什么区分LHS和RHS是一件重要的事呢?")]),t("br"),a._v("\n因为在变量还没有还没有声明的情况下,这两种的查询行为是不一样的.")])]),a._v(" "),t("p",[a._v("当我们对一个不存在的变量进行RHS查询时,RHS查询了所有嵌套的作用域都找不到,引擎就会抛出"),t("code",[a._v("ReferenceError")]),a._v("异常.(Reference是引用的意思)")]),a._v(" "),t("p",[a._v('相较之下,当引擎执行LHS查询时,如果也没找到目标变量,全局作用域中就会创建一个具有该名称的变量,并将其返还给引擎,前提是程序运行在非"严格模式"下.')]),a._v(" "),t("p",[a._v('ES5中引入了"严格模式",与正常模式有许多不同.其中一个不同的行为是禁止自动或隐式的创建全局变量.因此在严格模式中LHS查询失败时,并不会创建并返回一个全局变量,引擎同样的会抛出一个'),t("code",[a._v("ReferenceError")]),a._v("异常.")]),a._v(" "),t("p",[a._v("接下来,如果RHS查询找到了个变量,但是你对这个变量的值进行不合理的操作,例如对一个非函数的值进行了函数调用,就会抛出"),t("code",[a._v("TypeError")]),a._v("异常.")])])}),[],!1,null,null,null);s.default=r.exports}}]);