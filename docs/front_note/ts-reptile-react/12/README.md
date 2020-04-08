# 多方法和中间件的装饰器

## 多方法装饰器

思路其实就是把 `@get()` 变成 `@post()`,我们就要在 decorator.ts 去定义post函数。我们目前元数据只挂在了路径信息，router无法获取请求方法，所以要在元数据中挂载 method 字段。

`router[method]()` 会报错，因为method是无限制的，还要定义枚举enum.

```ts
// LoginController.ts
import { Request, Response } from 'express'
import { get, controller, post } from './decorator'
import { getResponseData } from '../utils/util'
interface RequestWithBody extends Request{
  body: {
      [key: string]: string | undefined
  }  
}
@controller
class LoginController {
  @post('/login')
  login(req: RequestWithBody, res: Response){
    const { password } = req.body
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        res.json(getResponseData(false, '已经登录过'))
    } else {
        if (password === '123' && req.session) {
            req.session.login = true
            res.json(getResponseData(true))
        } else {
            res.json(getResponseData(false, '登录失败'))
        }
    }
  }
  @get('/logout')
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
        res.send(`已登录页面`)
    } else {
        res.send(`未登录页面`)
    }
  }
}
```
主要是看装饰器代码：
```ts
// decorator.ts
import { Router } from 'express'
import  'reflect-metadata'
export const router = Router()
enum Method {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
}
function getRequestDecorator(type: string) {
  return function(path: string) {
    return function(target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}
export const get = getRequestDecorator('get')
export const post = getRequestDecorator('post')
export function controller(target: any) {
  for(let key in target.prototype) {
    router
    const path = Reflect.getMetadata('path', target.prototype, key)
    const method: Method = Reflect.getMetadata('method', target.prototype, key)
    const handler = target.prototype[key]
    if (path && method && handler) {
      router[method](path, handler)
    }
  }
}
```
测试下登录页面，没问题嗷。

## 中间件的装饰器

暂时中间件只有 checkLogin 函数，其实就是再来一层装饰器，把 checkLogin 函数传进去挂载到元数据上，类装饰器检测到有中间件就执行有中间件参数函数。

新建 CrowllerController.ts 装爬虫关系的逻辑代码：
```ts
import fs from 'fs'
import path from 'path'
import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { controller, get, use } from './decorator'
import { getResponseData } from '../utils/util'
import Crowller from '../utils/crowller'
import DellAnalyzer from '../utils/analyzer'
interface RequestWithBody extends Request{
  body: {
      [key: string]: string | undefined
  }  
}
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
      next()
  } else {
      res.json(getResponseData(null, '请先登录'))
  }
}
@controller
class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: RequestWithBody, res: Response) {
    const secret = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const coursePath = '../../data/course.json'
    const analyzer = DellAnalyzer.getInstance()
    new Crowller(url, coursePath,  analyzer)
    res.json(getResponseData(true))
  }
  @get('/showData')
  @use(checkLogin)
  showData(req: RequestWithBody, res: Response) {
    try {
      const position = path.resolve(__dirname, '../../data/course.json')
      const result = fs.readFileSync(position, 'UTF-8')
      res.json(getResponseData(JSON.parse(result)))
    } catch(e) {
        res.json(getResponseData(false, '数据不存在'))
    }
  }
}
```
```ts
// decorator.ts
import { Router, RequestHandler } from 'express'
import  'reflect-metadata'

export const router = Router()

enum Method {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
}
function getRequestDecorator(type: string) {
  return function(path: string) {
    return function(target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}
export const get = getRequestDecorator('get')
export const post = getRequestDecorator('post')

export function controller(target: any) {
  for(let key in target.prototype) {
    router
    const path = Reflect.getMetadata('path', target.prototype, key)
    const method: Method = Reflect.getMetadata('method', target.prototype, key)
    const handler = target.prototype[key]
    const middleware = Reflect.getMetadata('middleware', target.prototype, key)
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler)
      } else {
        router[method](path, handler)
      }
      
    }
  }
}

export function use(middleware: RequestHandler) {
  return function(target: any, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}
```
最后不要忘了 index.ts 中引入执行以下 `import './controller/CrowllerController'`
