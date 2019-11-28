(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{87:function(t,e,s){"use strict";s.r(e);var a=s(0),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 类型")]),t._v(" "),s("h2",{attrs:{id:"内置类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内置类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 内置类型")]),t._v(" "),s("p",[t._v("JavaScript 有七种内置类型：")]),t._v(" "),s("ul",[s("li",[t._v("空值（null）")]),t._v(" "),s("li",[t._v("未定义（undefined）")]),t._v(" "),s("li",[t._v("布尔值（ boolean）")]),t._v(" "),s("li",[t._v("数字（number）")]),t._v(" "),s("li",[t._v("字符串（string）")]),t._v(" "),s("li",[t._v("对象（object）")]),t._v(" "),s("li",[t._v("符号（symbol，ES6 中新增）")])]),t._v(" "),s("p",[t._v("我们可以用 typeof 运算符来查看值的类型.")]),t._v(" "),s("ul",[s("li",[t._v('typeof undefined === "undefined"; // true')]),t._v(" "),s("li",[t._v('typeof true === "boolean"; // true')]),t._v(" "),s("li",[t._v('typeof 42 === "number"; // true')]),t._v(" "),s("li",[t._v('typeof "42" === "string"; // true')]),t._v(" "),s("li",[t._v('typeof { life: 42 } === "object"; // true')]),t._v(" "),s("li",[t._v('typeof Symbol() === "symbol"; // true ES6中新加入的类型')])]),t._v(" "),s("p",[t._v("需要注意有2点:")]),t._v(" "),s("ol",[s("li",[s("code",[t._v('typeof null === "object"; // true')]),t._v(",理论上null的类型就是null,但是返回的是object,这个是因为js在判断类型的时候是根据类型的最底层的二进制值的前三位进行判断的,如果前三位是000,那么这就是个对象.而null的值全部都是0,自然也就被误判成了object,这是js的一个20年的bug,未来应该也不会修复了.")])]),t._v(" "),s("p",[t._v("如果要判断null的话,我们需要用复合条件来检测.")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"object"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br")])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("我们检测下function,"),s("code",[t._v('typeof function a(){ /* .. */ } === "function"; // true')]),t._v(".")])]),t._v(" "),s("p",[t._v("这样看来似乎function也是js的一个内置类型,然而查阅规范就会知道，它实际上是 object 的一个“子类型”。具体来说，函数是“可调用对象”，它有一个内部属\n性 [[Call]]，该属性使其可以被调用。")]),t._v(" "),s("p",[t._v("不过这个对象的属性看起来不太一样,b和c两个属性其实是作为参数传递的")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("a")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("c")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* .. */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("p",[t._v("函数对象的 length 属性是其声明的参数的个数")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2,也就是b和c")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ol",{attrs:{start:"3"}},[s("li",[t._v("这里面没有我们常用的数组,是因为数组也是对象。确切地说，它也是 object 的一个“子类型”.")])]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"object"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("数组的元素按数字顺序来进行索引（而非普通像对象那样通过字符串键值），其 length 属性是元\n素的个数。")]),t._v(" "),s("h2",{attrs:{id:"值和类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#值和类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 值和类型")]),t._v(" "),s("p",[t._v("JavaScript 中的变量是没有类型的，"),s("strong",[t._v("只有值才有")]),t._v("。变量可以随时持有任何类型的值。")]),t._v(" "),s("h2",{attrs:{id:"undefined-和-undeclared"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#undefined-和-undeclared","aria-hidden":"true"}},[t._v("#")]),t._v(" undefined 和 undeclared")]),t._v(" "),s("p",[t._v("undefined(未定义) 和 undeclared(未声明) 看着差不多,但其实完全是两回事。")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\na"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\nb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ReferenceError: b is not defined")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("p",[t._v("浏览器对这类情况的处理其实是不好的,“b is not defined”容易让人误以为是“b is undefined”,但其实b是undeclared,所以准确的报错应该是“b is not declared”.")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "undefined"')]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("请注意虽然 b 是一个 "),s("code",[t._v("undeclared")]),t._v(" 变量，但 "),s("code",[t._v("typeof b")]),t._v(" 并没有报错。这是因为 "),s("code",[t._v("typeof")]),t._v(" 有一个特殊的安全防范机制。")]),t._v(" "),s("h2",{attrs:{id:"小结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#小结","aria-hidden":"true"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),s("p",[t._v("JavaScript 有 七 种 内 置 类 型：null、undefined、boolean、number、string、object 和symbol，可以使用 typeof 运算符来查看。")]),t._v(" "),s("p",[t._v("变量没有类型，但它们持有的值有类型。类型定义了值的行为特征。")]),t._v(" "),s("p",[t._v("很多开发人员将 undefined 和 undeclared 混为一谈，但在 JavaScript 中它们是两码事。")]),t._v(" "),s("p",[t._v("undefined 是值的一种。undeclared 则表示变量还没有被声明过。")]),t._v(" "),s("p",[t._v('遗憾的是，JavaScript 却将它们混为一谈，在我们试图访问 "undeclared" 变量时这样报错：ReferenceError: a is not defined，并且 typeof 对 undefined 和 undeclared 变量都返回"undefined"。')]),t._v(" "),s("p",[t._v("然而，通过 typeof 的安全防范机制（阻止报错）来检查 undeclared 变量，有时是个不错的办法。")])])}),[],!1,null,null,null);e.default=n.exports}}]);