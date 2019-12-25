# 前言/架子/路由

这个项目是restful风格的API模仿知乎接口设计,和另一篇的模仿微博功能的koa项目功能上有重叠但是不冲突.

## 安装搭建Koa程序
先是命令行操作
```
npm init
npm i koa --save
```
新建一个index.js文件
```JavaScript
const Koa = require('koa')
const app = new Koa()
app.use((ctx)=>{
  ctx.body = 'hello word'
})
app.listen(3000)
```
运行 `node index.js`后,进入locahost:3000网址后就能看到输出了.然后我们安装自动重启
```
npm install nodemon --save-dev
```
这时候我们`nodemon index.js`,失败.是因为nodemon我们没有安装在全局,执行nodemon找不到指令.所以我们需要编写package.josn文件的scripts脚本才行.
```
"start":"nodemon index.js"
```
再次执行`npm start`就能运行了.可以帮我们监听index.js文件的变化,如果有变动就会重启服务.

当然,现在的程序只是运行起来,一点作用都没有,我们需要添加个路由,让他拥有相应接口的能力.

## koa-router 路由

安装

```sh
npm i koa-router --save
```

使用
```JavaScript
const Router = require('koa-router')
const router = new Router()
router.get('/users/:id',(ctx)=>{
    // 操作 ctx 就行了 ctx.params.id 就是传进来的id
})
app.use(router.routes())
```
最基本的路由就实现了,koa-router还有一个比较有用省事功能是**路由前缀**.

## 路由前缀

假如我们user下有茫茫多的接口,那么我们全部都是`router.get('/users/...)`这样的,可读性就比较差.我们可以用prefix参数来进行优化一下:

```js
const usersRouter = new Router({prefix:'/users'})
usersRouter.get('/:id',(ctx)=>{})
app.use(usersRouter.routes())
```
这个的功能和上面的例子代码是一模一样的,我们就可以通过路由的前缀名称知道这个路由是负责哪个模块的.

#### 路由中间件

中间件其实是洋葱模式下的流程,router的参数从左到右依次执行,通过`next()`函数去进行 **下一步** 的操作.

中间件都是有 **ctx** 和 **next** 2个参数的,而且中间件可以无限去写,只有中间件中的`next()`方法执行了,下个中间件才会生效.拿上面的代码举个例子.
```JavaScript
const usersRouter = new Router({prefix:'/users'})
const auth = (ctx,next)=>{
    if(ctx.params.id !== 100){
        ctx.throw(401)
    }else{
        next()
    }
}
usersRouter.get('/:id', auth, (ctx)=>{})
app.use(usersRouter.routes())
```
这个中间件的作用是,如果你请求时候附带的参数id不是100,就会返回401,告诉用户权限不够.


## 结构还能优化
路由写到这里功能都可以实现了,但是所有的路径和响应处理逻辑都写在一个页面,可想而知这个页面会超级长.

所以在结构上还能优化,让项目代码更清晰.举例现在我们有一个user用户模块和blog博客模块.

* 用routes文件夹存放接口和中间件.
* 用controllers文件夹作为对应的逻辑处理和响应.
* 用models文件夹作为定义数据库mongodb的模型Schema.(这步后面会提及,暂时不操作).

### routes目录
有三个文件,`user.js`,`blog.js`,还有作为汇总暴露出去的`index.js`文件.
```js
// user.js
const { login, register } = require('../controllers/users')

const router = new Router()

router.post('/login',login)
router.post('/register',register)

module.exports = router
```

blog模块同理.`index.js`整合文件用的是fs模块循环加载,内容如下:

```js
// index.js
const fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return
    const route = require(`./${file}`)
    app.use(route.routes())
  })
}
```
暴露的是个函数,参数是这个整个项目的实例.

### controllers目录

controllers目录下的文件是和routes目录下的文件对应的.
```js
// controllers/users.js
const User = require('../models/users');

class UsersCtl {
    async login(ctx) {
      // ctx...
    }
    async register(ctx) {
      // ctx...
    }
}

module.exports = new UsersCtl()
```

### 项目的入口文件
```js
const app = new Koa()

const routing = require('./routes')

routing(app)

app.listen(3004, () => {console.log('3004端口已经开启')})
```

### models目录
models层在controllers层引入的,虽然现在没有讲到**mongoose**,但是现在先写一下:
```js
// models/users.js
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String, default: '' }
});

module.exports = model('User', userSchema);
```






