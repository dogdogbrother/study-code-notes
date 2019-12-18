
技术选型概述.

node基本就是express,koa2,egg三种了.
express比较老了,在逻辑处理上用的回调函数的形式.
koa2是express原版人马打造,以精简轻量为特点.
egg是阿里对koa2的再次封装.

鉴于是学习的角度,我们使用koa2,自己会做一些封装达到类似于egg的功能.

数据库mysql,不用mongodb

登录session,不用jwt

前端ejs后端模板引擎,不用vue/react

缓存redis,没有对手

单元测试jest,也基本没有对手.
## git commit单词
feat:路由演示. 添加功能

# 安装
```sh
npm i -g koa-generator 
koa2 -e koa2-weibo-code
cd koa2-weibo-code && npm i
```
`-e`的意思是用 ejs 模式.运行`app.js`,访问3000端口即可.

我们还需要设置环境变量,先安装个工具:
```sh
npm i cross-nev -D
```
修改package.json中的scripts中的dev和prd命令:
```js
{
  ...
  "dev": "cross-nev NODE_ENV=dev ./node_modules/...",
  "prd ": "cross-nev NODE_ENV=production pm2 start bin/www"
}
```
# 修改下目录结构
现在不管前后端开发,都习惯有个src目录,这次也不例外,建立src目录后,把app.js/public/routes/views等文件目录全部移到src目录下.

然后不要忘了调整已有的路径,bin/www.js中的app引入修改一下.

app.js文件中有2个logger,我们删除掉第二个logger(只是中间件的演示).

## ejs是怎么工作的呢?
我们在app.js中已经使用了中间件了.
```js
app.use(views(__dirname + '/views'.{
  extension: 'ejs'
}))
```
然后在路由处理中:
```js
await ctx.render('index', {
  title: 'hello koa2'
})
```
最后我们在index.ejs文件中就能拿到这个`title`变量:
```html
<title><%= title %></title>
```
假如我们的变量不是字符串,而是布尔值呢?:
```html
<div>
  <% if (isMe) { %>
    <span>isMe为true</span>
  <% } else{} %>
  <span>isMe为false</span>
  <% } %>
</div>
```
ejs也有组件的用法,我们把刚才的isMe的div拿到平级目录下的一个user-info.ejs文件中,然后我们的index.ejs如下引用即可:
```html
<%- include('user-info',{ isMe })%>
```
include函数第一个函数是路径,第二个函数是传进去的参数

### ejs的循环渲染,以list数组为例.
```html
<ul>
  <% list.forEach(blog => { %>
    <li><%= blog.itle %></li>
  <% }) %>
</ul>
```

### mysql 
下载安装mysql,mysql workbench(可视化操作 )
打开workbench链接mysql服务
安装过程中需要输入root用户名和密码,切记要记住这个密码.

### 模拟建表和基础的sql语句
新建名为koa2_weibo_db的数据库,再建立users和blogs 2个表.先看看两个表的内容:
**users**
column|datatype|pk主键|nn不为空|AI自动增加|default
--|:--:|--:|--:|--:|--:
id|int|Y|Y|Y|
username|varchar(20)||Y||
password|varchar(20)||Y||
nickname|varchar(20)||Y||

**blogs**
column|datatype|pk主键|nn不为空|AI自动增加|default
--|:--:|--:|--:|--:|--:
id|int|Y|Y|Y|
title|varchar(50)||Y||
content|text||Y||
userid|int||Y||

我们可以按照这个格式在workbench中新建sers和blogs两个表.

建立好以后我们可以尝试着在users表中去查询内容:
```
use koa2_weibo_db;

select * from users;
```
查询结果为空(因为还没有插入数据),我们去插入一个值:
```
insert into users(username,`password`,nickname)value('张三','123','张三')
```
>说明一下,id因为是自增的,是不需要传的,password因为是关键字所以比较用` `` `包裹起来.  
注释的方法是`--`加个空格

再次查询就能查到数据了,还可以单独查询key.
```
select username,nickname from users;
```
模仿下登录操作的查询:
```
select user,nickname from users where username='张三'and`password`='123';
```
>还是能查到的,这里通过and来连接两个条件.

尝试下更新blogs表.(过滤了插入操作,毕竟是一样的.)
```
update blogs set content='内容1内容1'where id='1';
```
>where是查找定位的作用,如果不加的话,blogs表里面的所有数据就都会更新了..
```
delete form blogs where id=4
```
再来个倒序查表:
```
select * from blogs order by id desc;
```