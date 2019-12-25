# HTTP参数和响应

我们先整理参数的相关内容,在整理响应的相关内容.

## options方法和allowedMethods

options是选项的意思,其实在功能上也是差不多的,就是在申请接口后返回告诉你,目前这个接口所支持得请求方法.

假如我们在postman中用**OPTIONS**方法请求了`http://example.org`,就会在返回的Headers的Allow字段中列出`OPTIONS,GET,HEAD,POST`等允许方法.

当然了,如果我们一点都不在服务区处理就申请了options方法,肯定是会**404**的,正确的使用姿势是用koa-router中帮我们封装好的方法`allowedMethods`.

```js
const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const router = new Router()

const usersRouter = new Router({prefix:'/users'})

app.use(router.routes())
app.use(usersRouter.routes())

app.use(usersRouter.allowedMethods())
```
这样当你检查user模块下的接口实现方法的话就会很方便快捷.

## 405和501状态码

405和501状态码是allowedMethods封装好的,这两个的意思其实都是未实现的,但是还是有区别的.

假如 **http://example.org** 接口只有 **GET** 和 **POST** 请求,当你用 **DELETE** 去请求的时候,理论上应该是 **404**,但是`allowedMethods`帮你很机智的返回了 **405**,意思是 **DELETE** 的功能我们还没有写,暂时实现不了你想要的功能.

但是如果你用 **LINK** 方法去请求,就会返回 **501**.因为koa2只能实现一些常规的method,不支持 **LINK** 方法,无法显示.

所以405和501的区别就是一个是我**还没写**,一个是我**写不了**.


>除了这两个功能,OPTIONS还可以用来询问这个接口是否支持跨域请求,可以用来作为预检请求来使用.  
具体的实现可以百度,这里就不贴代码了,了解即可.

## 获取请求参数

请求参数中**query/header**的获取都是比较方便的,直接`ctx.query`/`ctx.header`就能拿到.

**params** 路由参数也比较好获取,例如接口是`/users/senlin1991`.这样就能拿到了:
```js
usersRouter.get('/:id',(ctx)=>{
    ctx.params.id === "senlin1991" // true
})
```

一个post请求过去了,却发现怎么都找不到body..原来koa2本身就不支持接收请求体,一定要安装中间件才行.

### koa-bodyparser
```sh
npm i koa-bodyparser --save
```
安装后引入和注册:
```js
const bodyparser = require(koa-bodyparser)

app.use(bodyparser())
```
然后老套路,`ctx.request.body`就能拿到数据对象了.(其实是不对的,我后面改下)


>注意,最好是在尽量前面的位置去使用`bodyparser`

*******
## 响应

响应内容无非是三种:

* 发送body
* 设置status,也就是状态码
* 发送header

body是非常简单的`ctx.body = { name: 'senlin' }`就行了.

设置status也简单,`ctx.status = 401`即可.

设置header也简单,`ctx.set('Allow','GET,POST')`就行了.