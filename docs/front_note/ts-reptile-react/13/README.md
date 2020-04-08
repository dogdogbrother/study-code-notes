# 代码结构优化

## 路由的优化

现在是 decorator.ts 里面引入了 router ，注册了路径后导出去，index.ts 再引入即可。

这样其实比较乱，如果我再有文件注册了路由呢，相互引用的关系就变得不明确了。所以我们在src下新建 router.ts:
```ts
import { Router } from 'express'

export default Router()
```
这样 decorator.ts 引入生成的路由 `import router from './router'`,index.ts 也同样方式的引用。

>这个是同引用的小技巧，decorator中对router的处理index同样能接收的到。

## 枚举的使用

请求方法的type的类型是string，虽然没问题，但是使用枚举其实是更合适和语义化些的：
```ts
enum Methods {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
}
function getRequestDecorator(type: Methods) {
  // ...
}
export const get = getRequestDecorator(Methods.get)
```

## 装饰器的优化

目前装饰器的内容都在写了 controller.ts 里面,包含了类装饰器，请求方法的装饰，中间件的装饰器。

很明显需要拆分一下，新建decorator目录，下面有controller类装饰器文件，request请求方法装饰器文件，use中间件装饰器文件。

把原来的decorator内容移植过后，新建个index.ts文件作为入口文件即可：
```ts
export * from './controller'
export * from './use'
export * from './request'
```
再修改下引用的地方就行了：
```ts
import { controller, use, get } from '../decorator'
```
>`*`的语法是知道的，但是还没用过导出多个*的语法，学习了学习了。

## 检查登录步骤的优化和封装

以前的代码是这样的：
```ts
const isLogin = req.session ? req.session.login : undefined
```
我们鼠标停在 isLogin 上面会发现他的类型是any，这是TS帮我们判断的。然而我们其实想要的是boolean，解决方法是 `!!(...)` 包装下，TS会自动帮我们判定类型为boolean的。

这个判定有2个地方用到了，我们可以封装到类中：
```ts
// ...代码省略
class LoginController {
  static isLogin(req: RequestWithBody): boolean {
    return !!(req.session ? req.session.login : false)
  }
  login(req: RequestWithBody, res: Response) {
    const isLogin = LoginController.isLogin(req)
    // ...代码省略
  }
}
```
注意的是，之所以使用 static 和 LoginController.isLogin 去调用，是因为类从来没有被实例化过，所以没有办法使用this。

## 添加类型

1. 没有返回值的函数加上 void。
2. 像 path 这种变量铁定是 string
3. checkLogin 函数也就是 middleware 中间件是什么类型呢，其实仔细看下 checkLogin 使用了 `next()` 方法，这不就是 express 提供的 `RequestHandler` 吗？

## 结尾
其实还有一些小细节，但是我个人感觉不是很关键。

[完整的代码demo代码地址](https://github.com/dogdogbrother/ts-reptile-react)