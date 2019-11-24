(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{111:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"原型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#原型","aria-hidden":"true"}},[t._v("#")]),t._v(" 原型")]),t._v(" "),s("blockquote",[s("p",[t._v("原型链是前端同志们面试经常被问到的点,一句话描述就是"),s("em",[t._v("JavaScript 中的对象有一个特殊的 [[Prototype]] 内置属性，其实就是对于其他对象的引用")])])]),t._v(" "),s("h2",{attrs:{id:"prototype"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prototype","aria-hidden":"true"}},[t._v("#")]),t._v(" [[Prototype]]")]),t._v(" "),s("p",[t._v("我们看一段代码:")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" anotherObject "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n  a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个关联到 anotherObject 的对象")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" myObject "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Object"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" anotherObject "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\nmyObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br")])]),s("p",[s("strong",[t._v("代码分析:")]),t._v(" 用"),s("code",[t._v("create")]),t._v("方法生成的对象其实是个空对象,但是却把"),s("code",[t._v("anotherObject")]),t._v("关联到了新创建对象的 [[Prototype]] 中.")]),t._v(" "),s("blockquote",[s("p",[t._v("MDN是这样描述的 "),s("em",[s("code",[t._v("Object.create()")]),t._v("方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。")])])]),t._v(" "),s("p",[t._v("当我们查找"),s("code",[t._v("a")]),t._v("属性的时候,"),s("code",[t._v("myObject")]),t._v("本身是不存在的,但是在 [[Prototype]] 中找到关联"),s("code",[t._v("anotherObject")]),t._v("的"),s("code",[t._v("a")]),t._v("."),s("br"),t._v("\n如果"),s("code",[t._v("anotherObject")]),t._v("中也找不到"),s("code",[t._v("a")]),t._v("并且"),s("code",[t._v("anotherObject")]),t._v("的[[Prototype]] 链不为空的话，就会继续查找下去。这个过程会持续到找到匹配的属性名或者查找完整条 [[Prototype]] 链。")]),t._v(" "),s("h3",{attrs:{id:"object-prototype"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#object-prototype","aria-hidden":"true"}},[t._v("#")]),t._v(" Object.prototype")]),t._v(" "),s("blockquote",[s("p",[t._v("但是到哪里是 [[Prototype]] 的“尽头”呢？\n所有普通的 [[Prototype]] 链最终都会指向内置的"),s("code",[t._v("Object.prototype")]),t._v("。所以我们才能用到很多属性而且通用的方法,例如"),s("code",[t._v(".toString()")]),t._v("和"),s("code",[t._v(".valueOf()")]),t._v("等等.")])]),t._v(" "),s("h3",{attrs:{id:"属性设置和屏蔽"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#属性设置和屏蔽","aria-hidden":"true"}},[t._v("#")]),t._v(" 属性设置和屏蔽")]),t._v(" "),s("p",[t._v("看一个简短的代码:")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("myObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("foo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bar"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("如果"),s("code",[t._v("myObject")]),t._v("对象中包含名为"),s("code",[t._v("foo")]),t._v("的普通数据访问属性，这条赋值语句只会修改已有的属性值。")]),t._v(" "),s("p",[t._v("如果"),s("code",[t._v("foo")]),t._v("不是直接存在于"),s("code",[t._v("myObject")]),t._v("中，[[Prototype]] 链就会被遍历，类似 [[Get]] 操作。 如果原型链上找不到"),s("code",[t._v("foo")]),t._v("，"),s("code",[t._v("foo")]),t._v("就会被直接添加到"),s("code",[t._v("myObject")]),t._v("上。")]),t._v(" "),s("p",[t._v("问题来了,如果"),s("code",[t._v("foo")]),t._v("存在于原型链上层，赋值语句"),s("code",[t._v('myObject.foo = "bar"')]),t._v("的行为就会在直觉上很奇怪,不过这个后面会提及到.")]),t._v(" "),s("p",[t._v("如果属性名"),s("code",[t._v("foo")]),t._v("既出现在"),s("code",[t._v("myObject")]),t._v("中也出现在 "),s("code",[t._v("myObject")]),t._v(" 的 [[Prototype]] 链上层，那 "),s("code",[t._v("么就会发生屏蔽。myObject")]),t._v(" 中包含的 "),s("code",[t._v("foo")]),t._v(" 属性会屏蔽原型链上层的所有 "),s("code",[t._v("foo")]),t._v(" 属性，因为 "),s("code",[t._v("myObject.foo")]),t._v(" 总是会选择原型链中最底层的 "),s("code",[t._v("foo")]),t._v(" 属性。")]),t._v(" "),s("p",[s("strong",[t._v("屏蔽")]),t._v("的这个动作比较复杂,我们分析一下如果 "),s("code",[t._v("foo")]),t._v(" 不直接存在于 "),s("code",[t._v("myObject")]),t._v(" 中而是存在于原型链上层时 "),s("code",[t._v('myObject.foo = "bar"')]),t._v(" 会出现的三种情况。")]),t._v(" "),s("ol",[s("li",[t._v("如果在 [[Prototype]] 链上层存在名为 "),s("code",[t._v("foo")]),t._v(" 的普通数据访问属性并且没有被标记为只读（writable:false），那就会直接在 "),s("code",[t._v("myObject")]),t._v(" 中添加一个名为 "),s("code",[t._v("foo")]),t._v(" 的新属性，它是屏蔽属性。")]),t._v(" "),s("li",[t._v("如果在 [[Prototype]] 链上层存在 "),s("code",[t._v("foo")]),t._v("，但是它被标记为只读（writable:true），那么无法修改已有属性或者在 "),s("code",[t._v("myObject")]),t._v(" 上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。")]),t._v(" "),s("li",[t._v("如果在 [[Prototype]] 链上层存在 "),s("code",[t._v("foo")]),t._v(" 并且它是一个 "),s("code",[t._v("setter")]),t._v("，那就一定会 调用这个 "),s("code",[t._v("setter``。foo")]),t._v(" 不会被添加到（或者说屏蔽于）"),s("code",[t._v("myObject")]),t._v("，也不会重新定义 "),s("code",[t._v("foo")]),t._v(" 这 个 "),s("code",[t._v("setter")]),t._v("。")])]),t._v(" "),s("blockquote",[s("p",[t._v("虽然在直觉上而且也的确绝大多数情况下会触发屏蔽,但是事实上却只有第一种情况下会触发.")])]),t._v(" "),s("p",[t._v("如果你希望在第二种和第三种情况下也屏蔽"),s("code",[t._v("foo")]),t._v("，那就不能使用 = 操作符来赋值，而是使 用 "),s("code",[t._v("Object.defineProperty(..)")]),t._v("（参见第 3 章）来向 "),s("code",[t._v("myObject")]),t._v(" 添加"),s("code",[t._v("foo")]),t._v("。(也就是get和set)")]),t._v(" "),s("blockquote",[s("p",[t._v("第二种情况是比较有意思的,为什么父类(这么比喻下)的属性设置了只读就不让子类建立了呢?")])]),t._v(" "),s("p",[t._v("这样做主要是为了模拟类属性的继承。你可以把原型链上层的 "),s("code",[t._v("foo")]),t._v(" 看作是父类中的属性，它会被 "),s("code",[t._v("myObject")]),t._v(" 继承（复 制），这样一来 "),s("code",[t._v("myObject")]),t._v(" 中的 "),s("code",[t._v("foo")]),t._v(" 属性也是只读，所以无法创建.(如果自己建立了把父级覆盖了不就等于修改了吗(使用层面))?")]),t._v(" "),s("p",[t._v("有些情况下会隐式产生屏蔽，一定要当心。思考下面的代码：")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" anotherObject "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n  a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" myObject "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Object"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" anotherObject "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nanotherObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2 ")]),t._v("\nmyObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2")]),t._v("\nanotherObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("hasOwnProperty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"a"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true ")]),t._v("\nmyObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("hasOwnProperty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"a"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//-----------------  到这都是正常的检查操作 -------")]),t._v("\nmyObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 隐式屏蔽！")]),t._v("\nanotherObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2 问题出现了 这里应该是3而不是2")]),t._v("\nmyObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3 ")]),t._v("\nmyObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("hasOwnProperty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"a"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br")])]),s("p",[s("strong",[t._v("代码分析:")]),t._v(" 尽管 "),s("code",[t._v("myObject.a++")]),t._v(" 看起来应该（通过委托）查找并增加 "),s("code",[t._v("anotherObject.a")]),t._v(" 属性，但是别忘 了 "),s("code",[t._v("++")]),t._v(" 操作相当于 "),s("code",[t._v("myObject.a = myObject.a + 1")]),t._v("。因此 "),s("code",[t._v("++")]),t._v(" 操作首先会通过 [[Prototype]] 查找属性 "),s("code",[t._v("a")]),t._v(" 并从 "),s("code",[t._v("anotherObject.a")]),t._v(" 获取当前属性值 2，然后给这个值加 1，接着用 [[Put]] 将值 3 赋给 "),s("code",[t._v("myObject")]),t._v(" 中新建的屏蔽属性 "),s("code",[t._v("a")]),t._v(".")]),t._v(" "),s("h2",{attrs:{id:"类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#类","aria-hidden":"true"}},[t._v("#")]),t._v(' "类"')]),t._v(" "),s("blockquote",[s("p",[s("strong",[t._v("无奈")]),s("br"),t._v("\n其实上面就有很多关于类的废话,这个作者用了巨长巨啰嗦的代码和解释来不停的说明JS和传统面向语言的区别... 而我其实根本就他妈的不关心面向语言和JS有啥区别!!")])])])}),[],!1,null,null,null);a.default=n.exports}}]);