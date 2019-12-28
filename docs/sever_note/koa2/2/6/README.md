# JWT实现认证与授权

知乎的这个项目登录是用的 JWT,另一个微博的项目用的是 seesion.

## JWT 和 seesion 的比较

* 扩展性
seesion是有状态的登录,例如你得用 radis 去保存所有用户的登录信息,如果用户特别特别多, radis 性能吃紧,进行性能拓展会有些麻烦.

JWT 是 token 授权的形式,本身不用记录用户的登录状态,就没有这样的烦恼.

* RESTful API
在 RESTful 架构中,是要求无状态的,seesion 就直接不符合这样的要求,所以如果是 RESTful 风格的项目的话,通常是使用 JWT 的. 

* 性能.
JWT 性能不是很好,每次 http 请求的时候,都要在 header 中带上加密后的 token,这个 token 包含了很多信息,是比较大的,是不小的开销.  

seesion 就没这个问题,不过也有不好的一点,就是携带的信息比较少,需要每次都要在数据库里面查询一次.

JWT其实就是用空间换时间,不过通常来讲 seesion 性能好一点点,

* 时效性
JWT 比较差,因为 JWT 只能等待时间到了才能销毁,但是 seesion 可以主动在 radis 中销毁.

举两个例子,一个用户是管理员权限,然后 root 给他降级成了普通用户,但是他还是可以行使管理员的权限的,因为 JWT 没有过去.

再比如,你的账号被人异地登录了,即使你修改了密码,盗号者还是可以操作你的账号,因为 JWT 没法主动销毁.

seesion 就没有这个问题.

## 安装
```sh
npm i jsonwebtoken --save
```

## 实现用户注册

用户注册其实就是前面的新建用户,我们把 controllers 层的代码负责过来,并把 password 校验为必填,并且要校验数据库中是否拥有相同 **name** 的用户
```js
async create(ctx) {
    ctx.verifyParams({
        name: { type: 'string', required: true },
        password: { type: 'string', required: true },
    })
    // 如果用户名存在的话没返回 409 状态码
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) { ctx.throw(409,'用户名已占用') }

    const user = await new User(ctx.request.body).save()
    // 通过save方法保存数据到数据库
    ctx.body = user
}
```
逻辑上其实是没我那天的,不过当我们使用 postman 注册新用户的时候却发现返回的数据有待优化:
```json
{
    "name": "李雷",
    "password": "123456",
    "_v_": ".........",
    "_id_": ".......",
}
```
password 竟然也返回给用户了,这太不科学了,而且 _v 这是 mongoDB 自带的字段,返给用户也没啥意义,也给他隐藏了.

当然,我们可以 `ctx.body = { ... }` 这样自定义返回的内容.也可以使用优雅的方式-- 改变 Schema 配置中的 select 值:
```js
const userSchema = new Schema({
    _v: { type: Number, select: false },
    name: { type: String, required: true },
    password: { type: String, required: true, select:false }
})
```
>409 的意思是 **冲突**

## 实现登录获取token

先看 login 逻辑层的处理,再看 model 层.

```js
const jsonwebtoken = require('jsonwebtoken')

async create(ctx) {
    ctx.verifyParams({
        name: { type: 'string', required: true },
        password: { type: 'string', required: true },
    })
    const user = await User.findOne(ctx.request.body)
    if(!user) { ctx,throw(401, '用户名或密码不正确')}
    const { _id, name } = user
    // 把一些不太敏感的参数拿出来,当做加密的身份信息的签名
    const token = jsonwebtoken.sign({ _id, name  }, '签名密码...', { expiresIn: '1d' })
    ctx.body = { token }
}
```
`jsonwebtoken.sign` 第二个参数是签名秘钥,通常是从外部引入,或是用环境变量.第三个参数是个对象,有非常多的选项,不过这里就暂时设置个过期日期为1天.

登录成功了 token 就会交给用户.

## 权限校验和 koa-jwt

用户拿到了 token,但是怎么用呢?怎么让服务器感知我的权限呢?

标准做法是设置 **http的请求头** ,`{ "Authorization": Bearer ${token} }`.不要问为什么,就是这么要求的.

>Bearer 翻译过来就是送信人的意思

```sh
npm i koa-jwt --save
```
koa-jwt 和认证没有关系,它是用来鉴权和保护接口用的,功能很强大,但是暂时只用一些比较简单的功能.

我们在 routes 层去使用它(因为是中间件啊).
```js
// routes/users.js
const jwt = require('koa-jwt')

const auth = jwt({ secret: '你的签名秘钥' })

router.patch('/:id', auth, update )
```

这样,如果 token 不正确的话,在 auth 层就会报错(401), 控制层的 update 函数将不会执行.如果认证通过的话, 用户携带的body信息将会挂在 `ctx.state` 属性下.
