(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{167:function(s,n,t){"use strict";t.r(n);var a=t(0),e=Object(a.a)({},(function(){var s=this,n=s.$createElement,t=s._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"z形变换"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#z形变换","aria-hidden":"true"}},[s._v("#")]),s._v(" Z形变换")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://leetcode-cn.com/problems/zigzag-conversion/",target:"_blank",rel:"noopener noreferrer"}},[s._v("原题目地址"),t("OutboundLink")],1)]),s._v(" "),t("h2",{attrs:{id:"需求"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#需求","aria-hidden":"true"}},[s._v("#")]),s._v(" 需求")]),s._v(" "),t("p",[s._v("将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列.")]),s._v(" "),t("p",[s._v("比如输入字符串为 "),t("code",[s._v('"LEETCODEISHIRING"')]),s._v(" 行数为 3 时，排列如下:")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("L   C   I   R\nE T O E S I I G\nE   D   H   N\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："),t("code",[s._v('"LCIRETOESIIGEDHN"')]),s._v("。")]),s._v(" "),t("blockquote",[t("p",[s._v("示例1:"),t("br"),s._v('\n输入: s = "LEETCODEISHIRING", numRows = 3'),t("br"),s._v('\n输出: "LCIRETOESIIGEDHN"')])]),s._v(" "),t("blockquote",[t("p",[s._v("示例2:"),t("br"),s._v('\n输入: s = "LEETCODEISHIRING", numRows = 4'),t("br"),s._v('\n输出: "LDREOEIIECIHNTSG"')])]),s._v(" "),t("p",[t("strong",[s._v("解释:")])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("L     D     R\nE   O E   I I\nE C   I H   N\nT     S     G\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h2",{attrs:{id:"解题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解题","aria-hidden":"true"}},[s._v("#")]),s._v(" 解题")]),s._v(" "),t("p",[s._v("我想了想,思路是这样的,我分割数组,数组中由对象组成,对象的key是1,2,3这种的,根据"),t("code",[s._v("numRows")]),s._v("来定.")]),s._v(" "),t("p",[s._v("这个数组中的两个正常的(满值)对象的间隔是"),t("code",[s._v("numRows")]),s._v("-2.")]),s._v(" "),t("p",[s._v("单蹦的字符串的key值是和index反向对应的,例如"),t("code",[s._v("numRows")]),s._v("是5,那么数组[1]的对象中,obj[4]是有值的.")]),s._v(" "),t("p",[s._v("这个题的关键就是取余.")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * @param {string} s\n * @param {number} numRows\n * @return {string}\n */")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("convert")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("s"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" numRows")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("convert")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("LEETCODEISHIRING")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])])])}),[],!1,null,null,null);n.default=e.exports}}]);