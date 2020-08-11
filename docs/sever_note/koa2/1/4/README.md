## session 的配置
讲注册前要先把session配置弄明白了。  
session指得是服务端的会话信息，是根据前端的cookie信息生成得来的。koa中可以使用 `koa-generic-session` 来对浏览器的cookie和redis中的session进行操作。
```shell
npm i koa-generic-session --save
```

在根文件下注册使用：
```js
// app.js
const Koa = require('koa')
const app = new Koa()
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')

// session 配置
app.keys = ['UIsdf_7878#$'] // keys是对客户端的cookie值进行加密的。 
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 `koa.sid` 开头
  prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:` 开头
  cookie: {
    path: '/', //值得是生成的cookie在所有目录都能访问
    httpOnly: true, // 只能服务端修改，客户端不能修改。就是你盗用了一个用户的cookie，却不能在另一个浏览器获取信息。
    maxAge: 24 * 60 * 60 * 1000  // 单位 ms。cookie过期时间。其实这里还有一个默认做法，就是把 session 的过期时间也设置为一致的了。 
  },
  store: redisStore({ // 把session的信息存到redis数据库中
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
```
## 注册
先想一想写有个注册接口我们要做什么？  
1. model里面写 schema，定义数据库内容格式。
2. 执行同步数据库函数操作，让mysql的表更新。
3. 定义路由和control业务层。
4. 接受参数时进行僬侥。