# 利用装饰器去重构路由

## 创建控制器和装饰器

>这里就要用到上个章节的 reflect-metadata 的工具了。

前面的爬虫都是面向过程的，这里改成class开发，并利用上 reflect-metadata 来获取到对应的路由。

新建 controller 目录，新建 LoginController.ts 写登录业务代码,新建 decorator.ts 放对应的控制器。

把router里面的代码迁移到对应的 LoginController.ts 中：
```ts
// src/controller/LoginController.ts
import { Request, Response } from 'express'
import { get, controller } from './decorator'

@controller
class LoginController {
  @get('/')
  home(req: Request, res: Response) {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        res.send(`已登录的html`)
    } else {
        res.send(`未登录的html`)
    }
  }
}
```
再看 decorator.ts 中的装饰器是怎么定义的：
```ts
import 'reflect-metadata'
export function get(path: string) {
  return function(target: any, key: string) {
    Reflect.defineMetadata('path', path, target, key)
  }
}
export function controller(target: any) {
  for(let key in target.prototype) {
    console.log(Reflect.getMetadata('path', target.prototype, key))
  }
}
```
可以看到，函数装饰器把路由信息写到了元数据中，类装饰器就能拿得到。我们可以 `tsc` 后 `node ./build/controller/LoginController.js` ,就能输出 `/`。

没错，我们要通过装饰器实现项目的路由功能。

## 通过装饰器实现项目的路由功能

其实做法很简单，上面我们通过 reflect-metadata 拿到对应的路由信息，就直接使用`router.get(path, handler)`来指定路径和执行事件就行了,记得要导出给 index.ts 使用。

因为目前的装饰器是没有办法处理非get请求和有中间件的路由的，所以先移植 logout 和根页面：
```ts
// src/index.ts
import './controller/LoginController'
// 因为装饰器是在定义的时候执行的，所以要引入执行一下才行
import { router } from './controller/decorator'

app.use(router)
```
```ts
// src/controller/decorator.ts
import { Router } from 'express'
import  'reflect-metadata'

export const router = Router()

export function get(path: string) {
  return function(target: any, key: string) {
    Reflect.defineMetadata('path', path, target, key)
  }
}
export function controller(target: any) {
  for(let key in target.prototype) {
    router
    const path = Reflect.getMetadata('path', target.prototype, key)
    const handler = target.prototype[key]
    if (path) {
      router.get(path, handler)
    }
  }
}
```
```ts
// src/controller/LoginController.ts
import { Request, Response } from 'express'
import { get, controller } from './decorator'
import { getResponseData } from '../utils/util'

interface RequestWithBody extends Request{
  body: {
      [key: string]: string | undefined
  }  
}


@controller
class LoginController {
  @get('./logout')
  logout(req: Request, res: Response) {
    if (req.session) {
        req.session.login = undefined
    }
    res.json(getResponseData(true))
    }
  @get('/')
  home(req: Request, res: Response) {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        res.send(`非登录页面`)
    } else {
        res.send(`登录页面`)
    }
  }
}
```



