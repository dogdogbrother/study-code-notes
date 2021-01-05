先把 [egg官网](https://eggjs.org/zh-cn/intro/quickstart.html) 奉上。

```
npm init egg --type=simple
```

从脚手架原始的demo中可以发现，路由层和控制层是没有引用关系的，egg底层已经封装好了，帮我们引入了。

除此之外，egg还提供了 `service` 层，`controller` 层写业务逻辑，`service` 层写数据库相关的逻辑。

## service 例子
新建个文件 `app/service/user.js`，内容如下:
```js
const  Service = require("egg").Service
class UserService extends Service {
  async detail(id) {
    // ... 取数据库数据的动作
    return { id } 
  }
}

modele.exports = UserService
```
然后在 `app/controller/user.js` 控制层拿到数据了
```js
const { ctx } = this
const res = await ctx.service.user.detail(10)
// res 就是 {id: 10}
```

## egg 下的扩展
先看见扩展的方式有哪些:

扩展点|说明|this指向|使用说明
:--:|:--:|:--:|:--:|
application|全局应用对象|app对象|this.app
context|请求上下文|ctx对象|this.ctx
request|请求对象，提供属性和方法|ctx.request|this.ctx.request
response|响应对象，提供属性和方法|app.response对象|this.ctx.response
helper|帮助函数|ctx.helper|this.ctx.helper
