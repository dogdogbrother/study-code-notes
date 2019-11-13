# nextjs中的路由

## 目录结构
因为有pages的存在,我们讲路由之前先把目录结构中重要的一个讲一下.
1. pages
pages对应页面,虽然这么一说就明白是什么意思了,但是我们还是搞个例子看下.
我们在pages中新建一个a.js,内容很简单.
```js
export default () => <span>a</span>
```
我们刷新页面,还是显示index文件内容,但是我们进入'/a'的路径后,就会显示a了.

文件夹同理.

2. components
就是存放组件的.

3. .next
这是一个特殊的目录,这个是nextjs生成的.

4. next.config.js
next的配置文件.

## 路由基础
### 1. link组件进行标签的前端路由跳转
```js
import Link from 'next/link'
import { Button } from 'antd'

export default () => (
    <Link href="/a">
        <Button>Index</Button>
    </Link>
)
```
需要注意的是,link需要是一个唯一节点.

### 2. router组件进行js的前端路由跳转
```js
import { Button } from 'antd'
import Router from 'next/router'

export default () => {
    const gotoTestA = () => {
        Router.push('/a')
    }
    return(
        <Button onClick={gotoTestA}>test a</Button>
    )
}
```

### 动态路由
动态路由的意思其实就是说带上参数的路由,不管是vue还是react,路由传参都是比较灵活的,但是nextjs目前只支持query形式的传参.
link形式的代码如下:
```js
<Link href="/a?id=1">
    <Button>Index</Button>
</Link>
```
router形式的代码如下:
```js
const gotoTestA = () => {
    Router.push({
        pathname:'/a',
        query: {
            id: 2
        }
    })
}
```
页面取参的方法和react hooks一模一样,用withRouter包装一层把参数当props传进去.
```js
import { withRouter } from 'next/router'

const A = ({ router }) => <span>A,{router.query.id}</span>

export default withRouter(A)
```
## 路由映射
除了query的形式外,我们也会遇到这种形式的路由参数:`/a/1`.

这种的使用方案代码如下,link形式:
```js
<Link href="/a?id=1" as="/a/1"></Link>
```
js router形式:
```js
const gotoTestA = () => {
    Router.push({
        pathname:'/a',
        query: {
            id: 2
        }
    },'/test/b/2')
}
```
取参的时候和上面的一样,`router.query.id`就行.

我们测试一下,没问题,ok.但是我们刷新页面就不行了,404了,正常我SPA项目我们通常都是线上环境Nginx配置,运行环境脚手架搭好了.

这里我们要利用koa自己手动配置一下.server.js更改内容如下:
```js
const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(()=>{
    const server = new Koa()
    const router = new Router()

    router.get('/a/:id', async (ctx) => {
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: { id }
        })
        ctx.respond = false
    })

    server.use(router.routers())

    server.use(async (ctx,next) => {
        await handle(ctx.req, ctx.res)
        ctx.response = false
    })

    server.listen(3000, () => {
        console.log('koa已启动,端口3000');
    })
    
})
```
再次测试,刷新.没问题.

## 路由钩子
路由钩子事件一共有6个.
```js
const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChnageError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]
```
这个就是正常的路由钩子函数,没什么好说的.

