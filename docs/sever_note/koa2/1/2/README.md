# ejs
ejs真的是超级老的技术了,估计至少有十几年了吧.

## ejs是怎么工作的呢?
脚手架已经在app.js中已经使用了中间件了:
```js
app.use(views(__dirname + '/views'.{
  extension: 'ejs'
}))
```
然后在路由处理中:
```js
await ctx.render('index', {
  // 很明显,第一个参数是路径..
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

## ejs组件
ejs也有组件的用法,我们把刚才的isMe的div拿到平级目录下的一个user-info.ejs文件中,然后我们的index.ejs如下引用即可:

```html
<%- include('user-info',{ isMe })%>
```
include函数第一个函数是路径,第二个函数是传进去的参数

##ejs循环
以list数组为例.
```html
<ul>
  <% list.forEach(blog => { %>
    <li><%= blog.itle %></li>
  <% }) %>
</ul>
```