
## 登陆
session 的鉴权和JWT不同，我们需要把用户的信息存到 redis 数据库中。  
看似复杂但是操作起来极其简单，前面我们 `app.use(session(...))` 配置后，如果我们登陆成功，`ctx.session.userInfo = userInfo` 就把信息存到 redis 中了。

## 401 鉴权中间件
核心就是 ctx.session.userInfo 拿值就行了，拿不到就是 redis 数据库没会话，或是前端没cookie。  
编写一个中间件，想给鉴权的接口加上就行了。
```js
// middlewares/loginChecks.js
// ...
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
}
```

## 退出登陆
一行代码即可。
```js
async function logout(ctx) {
    delete ctx.session.userInfo
}
```

