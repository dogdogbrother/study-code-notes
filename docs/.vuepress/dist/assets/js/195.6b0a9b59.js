(window.webpackJsonp=window.webpackJsonp||[]).push([[195],{87:function(s,a,t){"use strict";t.r(a);var n=t(0),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"包-模块-函数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#包-模块-函数","aria-hidden":"true"}},[s._v("#")]),s._v(" 包/模块/函数")]),s._v(" "),t("h2",{attrs:{id:"包和导入模块"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#包和导入模块","aria-hidden":"true"}},[s._v("#")]),s._v(" 包和导入模块")]),s._v(" "),t("p",[s._v("假如你当前的文件同级下面有个"),t("code",[s._v("c7.py")]),s._v("文件,导入代码如下:")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" c7\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c7"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[t("code",[s._v("c7.a")]),s._v("中的"),t("code",[s._v("a")]),s._v("就是"),t("code",[s._v("c7.py")]),s._v("文件里面定义的变量"),t("code",[s._v("a")]),s._v(".")]),s._v(" "),t("blockquote",[t("p",[s._v("vscode下import可能会报错,是bug,请忽略")])]),s._v(" "),t("p",[s._v("如果不是同级文件,需要路径呢?")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c7\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c7"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("blockquote",[t("p",[s._v("可以发现,py是通过命名空间的形式进行导入,而不是路径的形式.")])]),s._v(" "),t("p",[s._v("也可以使用"),t("code",[s._v("as")]),s._v("来重命名"),t("code",[s._v("import t.c7 as all")]),s._v(".")]),s._v(" "),t("p",[s._v("有个问题,不是每个文件夹都是可以用来当包用的,如果你在文件目录下新建一个"),t("code",[s._v("_init_.py")]),s._v("文件才行,这个文件可以是空文件.")]),s._v(" "),t("h2",{attrs:{id:"导入具体的变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#导入具体的变量","aria-hidden":"true"}},[s._v("#")]),s._v(" 导入具体的变量")]),s._v(" "),t("p",[s._v("如果我们不想引入整个文件作为模块,而是只是想引入文件中的某个变量怎么做呢?")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c7 "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" a\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("还可以这样使用")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" t "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" c7\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c7"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("我们还可使用"),t("code",[s._v("*")]),s._v("还控制引入,假如我们"),t("code",[s._v("c7.py")]),s._v("里面有"),t("code",[s._v("a")]),s._v(","),t("code",[s._v("b")]),s._v(","),t("code",[s._v("c")]),s._v(",如果想全引进来可以这样用:")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c7 "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("b"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("很明显这样有点不科学,其实我们还可以在"),t("code",[s._v("c7.py")]),s._v("中定义"),t("code",[s._v("*")]),s._v("包含了什么.")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[s._v("_all_ "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'b'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\na "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\nb "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\nc "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("还可以这样:")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c7 "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("b"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("c\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"init-py-文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#init-py-文件","aria-hidden":"true"}},[s._v("#")]),s._v(" "),t("em",[s._v("init")]),s._v(".py 文件")]),s._v(" "),t("p",[s._v("上面说了,如果定义一个包的话,就要在这个包的目录下新建"),t("code",[s._v("_init_.py")]),s._v("文件.")]),s._v(" "),t("p",[s._v("当你import包或模块中的变量的时候,这个"),t("code",[s._v("_init_.py")]),s._v("就会被执行一次,像设置"),t("code",[s._v("_all_")]),s._v("属性啊之类的都可以.(但是数组中就不是变量,而是文件名了)")]),s._v(" "),t("p",[s._v("这个特性非常有用!!")]),s._v(" "),t("h2",{attrs:{id:"换行问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#换行问题","aria-hidden":"true"}},[s._v("#")]),s._v(" 换行问题")]),s._v(" "),t("p",[s._v("如果一行代码太长了需要换行,可以这么操作")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c7 "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("b"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\\\nc\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("还可以使用"),t("code",[s._v("()")]),s._v("换行")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" t"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c7 "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("b"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\nc"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h2",{attrs:{id:"函数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#函数","aria-hidden":"true"}},[s._v("#")]),s._v(" 函数")]),s._v(" "),t("p",[s._v("用"),t("code",[s._v("def")]),s._v("定义函数,默认"),t("code",[s._v("return None")]),s._v(".看个基础代码:")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("y"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    result "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" x "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" y\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("add"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 输出3")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h2",{attrs:{id:"关键字参数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关键字参数","aria-hidden":"true"}},[s._v("#")]),s._v(" 关键字参数")]),s._v(" "),t("p",[s._v("python为了可读性,还可以这样使用函数参数:")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("y"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    result "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" x "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" y\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("add"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("y"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("x"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 输出3")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("这样即使你不看函数内部的实现也能猜出个大概,这就大大提升了可读性.而且还不用依赖参数的位置...")]),s._v(" "),t("h2",{attrs:{id:"默认参数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#默认参数","aria-hidden":"true"}},[s._v("#")]),s._v(" 默认参数")]),s._v(" "),t("p",[s._v("和其他语言一样喽..")]),s._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("y"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    result "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" x "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" y\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("add"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 输出3")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);