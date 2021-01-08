## 先定义路由
`app/router`:
```js
module.exports = app => {
  const { router, controller } = app
  router.post("/api/user/register", controller.user.register)
}
```

## service 层处理数据库
`app/service/user.js`下写两个数据库逻辑，一个是获取此用户，一个是添加此用户:
```js
const  Service = require("egg").Service
class UserService extends Service {
  async getUser(username) {
   try {
     const { ctx } = this
     const result = await ctx.model.User.findOne({
       where: {
         username
       }
     })
     return username
   } catch(error) {
     console.log(error)
     return null
   }
  }

  async addparams(params) {
    try {
      const { ctx } = this
      const result = await ctx.model.User.create(params)
      return result 
    } catch(error) {
     console.log(error)
     return null
   }
  }
}

modele.exports = UserService
```

## 写 controller 业务层
用户注册登录是要保持用户密码的，密码加密使用 `md5` 的方式,加密时的盐值，要写在`config.default.js`配置中.
```
npm install md5
```
先写密码盐值的配置,在 `app/config/config.default.js` 文件中:
```js
const userConfig = {
  salt: "senlin"
}
return {...userConfig}
```
`app/controller/user.js`中从app拿到配置即可:
```js
const Controller = require("egg").Controller;
const mds = require("md5")
const dayjs = require("dayjs")
class UserController extends Controller {
  async register() {
    const { ctx, app } = this;
    const parmas = ctx.request.body
    const user = await ctx.service.user.getUser(parmas.username)

    if(user) {
      ctx.body = {
        status: 500,
        errMsg: "用户已经存在"
      }
      return
    }

    const result = await ctx.service.User.add({
      ...parmas,
      password: md5(parmas.password + app.config.salt),
      createTime: dayjs().format("YYYY-MM-DD HH:mm:ss")  
    })
    if(result) {
      ctx.body = {
        status: 200,
        data: result
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: "注册用户失败"
      }
    }
  }
}
```

## 扩展帮助函数来优化代码
上面的例子中有两个待优化的点:
1. 我们给用户返回的信息不需要密码等信息
2. `dayjs` 时间格式化的操作后面会频繁用到。

在`app/extend/helper.js`文件中:
```js
const dayjs = require("dayjs")
module.exports = {
 time() {
   return dayjs().format("YYYY-MM-DD HH:mm:ss") 
 },
 unPick(source, arr) {  // 从对象当中排除某些属性
  if(Array.isArray(arr)) {
    let obj = {}
    for(let i in source) {
      if(!arr.includes(i)) {
        obj[i] = source[i]
      }
    }
    return obj
  }
 }
}
```

改上面的代码:
```js
add({
  // ...
  createTime: ctx.helper.time()
})
// ...
ctx.body = {
  status: 200,
  data: {
    ...ctx.helper.unPick(result.dataValues, ["password"])
  }
}
```

## 用户登录
用户登录的逻辑和注册一致，用`ctx.service.getUser`去查找用户，找不到就是账户名密码错误。

不同的是，附带了`password`参数，所以还要稍稍改造下`getUser`函数。
```js
getUser(username, password) {
  try {
    const { ctx, app } = this
    const _where = password ? { username, password: md5(password + app.config.salt )} : { username }
    const result = await ctx.model.User.findOne({
      where: _where
    })
    return username
  } catch(error) {
    console.log(error)
    return null
  }
}
```