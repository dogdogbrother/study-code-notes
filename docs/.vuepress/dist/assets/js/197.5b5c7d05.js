(window.webpackJsonp=window.webpackJsonp||[]).push([[197],{85:function(a,s,t){"use strict";t.r(s);var n=t(0),e=Object(n.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"正则和json"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#正则和json","aria-hidden":"true"}},[a._v("#")]),a._v(" 正则和JSON")]),a._v(" "),t("h2",{attrs:{id:"元字符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#元字符","aria-hidden":"true"}},[a._v("#")]),a._v(" 元字符")]),a._v(" "),t("p",[a._v("所谓学习正则,其实就是学习正则的 "),t("strong",[a._v("元字符")]),a._v(",例如"),t("code",[a._v("\\d")]),a._v("代表数字0到9")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("import")]),a._v(" re\n\na "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'C0C++7jAVA8c'")]),a._v("\n\nr "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'\\d'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("r"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# ['0','7','8']")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br")])]),t("p",[t("code",[a._v("\\d")]),a._v("其实就是配置数字,"),t("code",[a._v("\\D")]),a._v("大写的D是匹配非字符.")]),a._v(" "),t("h2",{attrs:{id:"字符集"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#字符集","aria-hidden":"true"}},[a._v("#")]),a._v(" 字符集")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("a "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'abc,acc,adc,aec,afc,ahc'")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br")])]),t("p",[a._v("如果我们想找到所有匹配a开头c结尾中间是cf的单词,怎么找呢?")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("r "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'a[cf]c'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 输出 ['acc','afc']")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("p",[a._v("如果我们想匹配排除cf的字符串,加上"),t("code",[a._v("^")]),a._v("即可.")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("r "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'a[^cf]c'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 输出 ['abc','aec','adc','ahc']")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("p",[a._v("如果想匹配"),t("code",[a._v("cdefg")]),a._v("四个字符,不用"),t("code",[a._v("'a[cdefg]c'")]),a._v(",可以简写为"),t("code",[a._v("a[c-g]c")])]),a._v(" "),t("h2",{attrs:{id:"概括字符集"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#概括字符集","aria-hidden":"true"}},[a._v("#")]),a._v(" 概括字符集")]),a._v(" "),t("p",[a._v("其实上面提到的"),t("code",[a._v("\\d")]),a._v("和"),t("code",[a._v("\\D")]),a._v("就是概括字符集,等同于"),t("code",[a._v("'[0-9]'")]),a._v("和"),t("code",[a._v("'[^0-9]'")]),a._v(".")]),a._v(" "),t("p",[t("code",[a._v("\\w")]),a._v("能匹配单词字符,等同于"),t("code",[a._v("'[A-Za-z0-9_]'")]),a._v(".(下划线也能匹配到),"),t("code",[a._v("\\W")]),a._v("和小写的相反.")]),a._v(" "),t("p",[t("code",[a._v("\\s")]),a._v("匹配空白制表字符,就是类似于空格,\\n,\\r这种的."),t("code",[a._v("\\S")]),a._v("相反.")]),a._v(" "),t("h2",{attrs:{id:"数量词"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数量词","aria-hidden":"true"}},[a._v("#")]),a._v(" 数量词")]),a._v(" "),t("p",[a._v("前面的正则匹配都只能匹配单个单词或数字,没啥用,当然我们可以使用多个正则组合起来,例如这样:"),t("code",[a._v("'[a-z][a-z][a-z]'")]),a._v(",就能拿到三个字符的字符串了.")]),a._v(" "),t("p",[a._v("当然事实上不可能这么蠢,我们可以用"),t("code",[a._v("{}")]),a._v("来达到一模一样的效果.")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("r "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'[cf]{3}'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br")])]),t("p",[a._v("然后又来个个新需求,有个字符串"),t("code",[a._v("'python 1111java678php'")]),a._v(",想要把语言名匹配出来.")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("r "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'[cf]{3,6}'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 最短的php是3,python是6")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("h2",{attrs:{id:"贪婪与非贪婪"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#贪婪与非贪婪","aria-hidden":"true"}},[a._v("#")]),a._v(" 贪婪与非贪婪")]),a._v(" "),t("p",[a._v("上个例子里面其实有个小问题,我们匹配的数量区间是3~6,那么pyt就应该匹配好了不会再执行了.")]),a._v(" "),t("p",[a._v("原因就是python默认是倾向于贪婪模式的,会尽可能的取区间最大值.")]),a._v(" "),t("p",[a._v("非贪婪的模式就是加个 "),t("code",[a._v("?")]),a._v(" 就行了,"),t("code",[a._v("'[cf]{3,6}?'")])]),a._v(" "),t("h2",{attrs:{id:"匹配0次或者无限次"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#匹配0次或者无限次","aria-hidden":"true"}},[a._v("#")]),a._v(" 匹配0次或者无限次")]),a._v(" "),t("ul",[t("li",[a._v("*匹配0次或者无线多次")]),a._v(" "),t("li",[a._v("+匹配1次或者无线多次")]),a._v(" "),t("li",[a._v("?匹配0次或者1 次")])]),a._v(" "),t("p",[a._v("来个例子,'pytho0python1pythonn2'")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("r "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'python*'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br")])]),t("p",[a._v("输出内容"),t("code",[a._v("['pytho','python','pythonn']")]),a._v(",能匹配到"),t("code",[a._v("'pytho'")]),a._v("因为"),t("code",[a._v("*")]),a._v("是可以运行前一位的"),t("code",[a._v("n")]),a._v("可以0次的.如果想要完整的python的话,用"),t("code",[a._v("+")]),a._v("就OK了.")]),a._v(" "),t("p",[t("code",[a._v("?")]),a._v("的话,输出"),t("code",[a._v("['pytho','python','python']")]),a._v(".")]),a._v(" "),t("blockquote",[t("p",[a._v("有一个疑惑的地方,这个"),t("code",[a._v("?")]),a._v("一会是非贪婪一会是匹配到底是一个东西吗?"),t("br"),a._v("\n其实也是看前面是什么,如果前面是范围就是非贪婪,如果不是的话就是匹配规则.")])]),a._v(" "),t("h2",{attrs:{id:"边际匹配符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#边际匹配符","aria-hidden":"true"}},[a._v("#")]),a._v(" 边际匹配符")]),a._v(" "),t("p",[a._v("来个需求,我们要校验一个qq号,是否符合4~8位.")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("qq "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'100000001'")]),a._v("\nr "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'\\d{4,8}'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" qq"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# ['10000000'] 错的,是查找到了8位,而不是拿9位来判断..")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br")])]),t("p",[a._v("其实前面的所有的案例的正则其实都是不太符合,因为他们都是从字符串中去查找和截取,并不是整个拿来进行匹配判断.所以这里需要的是边界匹配符.")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("r "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'^\\d{4,8}$'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" qq"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# [] 正确")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("p",[t("code",[a._v("^")]),a._v("的意思是从字符串的开头匹配,"),t("code",[a._v("$")]),a._v("相反,从结尾处匹配.")]),a._v(" "),t("h2",{attrs:{id:"组"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#组","aria-hidden":"true"}},[a._v("#")]),a._v(" 组")]),a._v(" "),t("p",[a._v("有个字符串是"),t("code",[a._v("'PythonPythonPythonPython'")]),a._v(",我们如何判断是否有连续的3个"),t("code",[a._v("'Python'")]),a._v("呢?")]),a._v(" "),t("p",[a._v("当然你可以用"),t("code",[a._v("('PythonPythonPython', str)")]),a._v(",但明显这样是不对的.我们前面有个例子是这样的"),t("code",[a._v("'Python{3}'")]),a._v(",不过这样匹配的结果就是"),t("code",[a._v("'Pythonnn'")]),a._v(".")]),a._v(" "),t("p",[a._v("我们可以使用"),t("code",[a._v("()")]),a._v("组的概念.")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("r "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'(python){3}'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" qq"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br")])]),t("blockquote",[t("p",[a._v("前面有"),t("code",[a._v("[abc]")]),a._v(",或者匹配."),t("br"),a._v("\n这里有"),t("code",[a._v("(abc)")]),a._v(",并且匹配.")])]),a._v(" "),t("h2",{attrs:{id:"匹配模式参数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#匹配模式参数","aria-hidden":"true"}},[a._v("#")]),a._v(" 匹配模式参数")]),a._v(" "),t("p",[t("code",[a._v("re.findall()")]),a._v("还有第三个参数,例如加上"),t("code",[a._v("re.I")]),a._v("的话就能让我们匹配字母忽略大小写.")]),a._v(" "),t("p",[a._v("可以使用多种模式,用"),t("code",[a._v("|")]),a._v("连接."),t("code",[a._v("re.findall('c#', str, re.I | re.S)")]),a._v(".")]),a._v(" "),t("p",[t("code",[a._v("re.S")]),a._v("模式的作用是生效一个概括字符集"),t("code",[a._v(".")]),a._v(",作用是匹配换行符\\n之外其他所有字符.")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("lanuage "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'PythonC#|nJavaPhp'")]),a._v("\nre"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("findall"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'c#.{1}'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("lanuage"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v(" re"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("I "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" res"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("S"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# ['C#|n']")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br")])]),t("h2",{attrs:{id:"re-sub-正则替换"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#re-sub-正则替换","aria-hidden":"true"}},[a._v("#")]),a._v(" re.sub 正则替换")]),a._v(" "),t("p",[a._v("上面所有的正则介绍"),t("code",[a._v("re.findall")]),a._v("都是用来查找,如果是想用来替换,就要用到"),t("code",[a._v("res.sub")]),a._v("了.")]),a._v(" "),t("div",{staticClass:"language-py line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-py"}},[t("code",[a._v("lanuage "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'PythonC#|nJavaPhp'")]),a._v("\nre"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("sub"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'C#'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'Go'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" lanuage"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# ['C#|n']")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br")])]),t("p",[a._v("第一个参数是查找的内容,第二个是替换的内容,第三个是目标值,第四个默认是0,意思是无线替换下去,如果是1的话,就替换成功一次就不再替换了.")]),a._v(" "),t("blockquote",[t("p",[a._v("上述例子也可以用"),t("code",[a._v("lanuage.replace('C#', 'Go')")]),a._v("代替,效果是一样的.")])]),a._v(" "),t("p",[a._v("正则替换功能是比较灵活的,第二个参数可以为一个函数,通过函数的参数,更加灵活的使用"),t("code",[a._v("return")]),a._v("来替换内容.")])])}),[],!1,null,null,null);s.default=e.exports}}]);