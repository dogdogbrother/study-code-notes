
## 技术选型概述.

node基本就是express,koa2,egg三种了.
express比较老了,在逻辑处理上用的回调函数的形式.
koa2是express原版人马打造,以精简轻量为特点.
egg是阿里对koa2的再次封装.

鉴于是学习的角度,我们使用koa2,自己会做一些封装达到类似于egg的功能.

数据库mysql

登录session

前端ejs后端模板引擎t

缓存redis,没有对手

单元测试jest,也基本没有对手.

## 安装
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
新建users和blogs 2个表.先看看两个表的内容:
**users**
column|datatype|pk主键|nn不为空|AI自动增加|default
--|:--:|--:|--:|--:|--:
id|int|Y|Y|Y|