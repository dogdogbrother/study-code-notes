(window.webpackJsonp=window.webpackJsonp||[]).push([[185],{97:function(t,e,a){"use strict";a.r(e);var s=a(0),i=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"mysql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mysql","aria-hidden":"true"}},[t._v("#")]),t._v(" mysql")]),t._v(" "),a("p",[t._v("下载安装mysql,mysql workbench(可视化操作 )")]),t._v(" "),a("p",[t._v("打开workbench链接mysql服务")]),t._v(" "),a("p",[t._v("安装过程中需要输入root用户名和密码,切记要记住这个密码.")]),t._v(" "),a("h2",{attrs:{id:"模拟建表和基础的sql语句"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模拟建表和基础的sql语句","aria-hidden":"true"}},[t._v("#")]),t._v(" 模拟建表和基础的sql语句")]),t._v(" "),a("p",[t._v("新建名为koa2_weibo_db的数据库,再建立users和blogs 2个表.先看看两个表的内容:")]),t._v(" "),a("p",[a("strong",[t._v("users")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("column")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("datatype")]),t._v(" "),a("th",{staticStyle:{"text-align":"right"}},[t._v("pk主键")]),t._v(" "),a("th",{staticStyle:{"text-align":"right"}},[t._v("nn不为空")]),t._v(" "),a("th",{staticStyle:{"text-align":"right"}},[t._v("AI自动增加")]),t._v(" "),a("th",{staticStyle:{"text-align":"right"}},[t._v("default")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("id")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("int")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})]),t._v(" "),a("tr",[a("td",[t._v("username")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("varchar(20)")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})]),t._v(" "),a("tr",[a("td",[t._v("password")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("varchar(20)")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})]),t._v(" "),a("tr",[a("td",[t._v("nickname")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("varchar(20)")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})])])]),t._v(" "),a("p",[a("strong",[t._v("blogs")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("column")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("datatype")]),t._v(" "),a("th",{staticStyle:{"text-align":"right"}},[t._v("pk主键")]),t._v(" "),a("th",{staticStyle:{"text-align":"right"}},[t._v("nn不为空")]),t._v(" "),a("th",{staticStyle:{"text-align":"right"}},[t._v("AI自动增加")]),t._v(" "),a("th",{staticStyle:{"text-align":"right"}},[t._v("default")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("id")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("int")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})]),t._v(" "),a("tr",[a("td",[t._v("title")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("varchar(50)")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})]),t._v(" "),a("tr",[a("td",[t._v("content")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("text")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})]),t._v(" "),a("tr",[a("td",[t._v("userid")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("int")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("Y")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}}),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})])])]),t._v(" "),a("p",[t._v("我们可以按照这个格式在workbench中新建sers和blogs两个表.")]),t._v(" "),a("p",[t._v("建立好以后我们可以尝试着在users表中去查询内容:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("use koa2_weibo_db;\n\nselect * from users;\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("查询结果为空(因为还没有插入数据),我们去插入一个值:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("insert into users(username,`password`,nickname)value('张三','123','张三')\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("blockquote",[a("p",[t._v("说明一下,id因为是自增的,是不需要传的,password因为是关键字所以比较用"),a("code",[t._v("``")]),t._v("包裹起来."),a("br"),t._v("\n注释的方法是"),a("code",[t._v("--")]),t._v("加个空格")])]),t._v(" "),a("p",[t._v("再次查询就能查到数据了,还可以单独查询key.")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("select username,nickname from users;\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("模仿下登录操作的查询:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("select user,nickname from users where username='张三'and`password`='123';\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("blockquote",[a("p",[t._v("还是能查到的,这里通过and来连接两个条件.")])]),t._v(" "),a("p",[t._v("尝试下更新blogs表.(过滤了插入操作,毕竟是一样的.)")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("update blogs set content='内容1内容1' where id='1';\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("blockquote",[a("p",[t._v("where是查找定位的作用,如果不加的话,blogs表里面的所有数据就都会更新了..")])]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("delete form blogs where id=4\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("再来个倒序查表:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("select * from blogs order by id desc;\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("来个查询数据总行数:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("select count(*) as `count` from blogs;\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("差倒叙第二页,每页2行:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("select * from blogs order by desc limit 2 offset 2;\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("blockquote",[a("p",[t._v("offset 2意思是跳过2行,那么这么一算不就是倒数第二页吗?")])]),t._v(" "),a("h2",{attrs:{id:"外键"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#外键","aria-hidden":"true"}},[t._v("#")]),t._v(" 外键")]),t._v(" "),a("p",[t._v("建立外键什么意思呢,blogs表中有一个userid,用于记录这个博客是哪个用户的,我们可以通过外键来关联这两个表的数据.\n在workbench工具中,我们在表的详情下面选中Foreign keys,里面设置.\n设置好了以后2个表就有了关联,假如我删除了一个用户,那么该用户下面的blogs表中的内容也会删除.")]),t._v(" "),a("p",[t._v("这里操作下连表查询,需求是通过用户名,找到他所有的博客,并且返回他blogs表外的用户名和昵称信息:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("select blogs.*,users.username,users.nickname from blogs inner join users on users.id=blogs.userid where users.username='zhangsan'\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("blockquote",[a("p",[t._v("这种操作其实是不需要外键约束的")])])])}),[],!1,null,null,null);e.default=i.exports}}]);