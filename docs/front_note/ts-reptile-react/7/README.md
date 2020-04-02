# express项目基础搭建

我们在以前的那个简易爬虫的基础上去写,本节的目的是,当我们请求一个借口后,执行次爬取页面的操作.

先修改package.json和安装express:
```json
{
    "scripts": {
        "dev:build": "tsc -w",
        "dev:start": "nodemon node ./build/index.js",
        "dev": "tsc && concurrently npm:dev:*"
    },
}
```
这里修改了2个地方:
1. 不直接执行crowller.js文件了,而是定义个index.js的入口文件.
2. `dev: concurrently npm:dev:*"` 这种写法其实是有问题的,当我们第一次运行的时候,只有index.ts而没有index.js从而报错.为了省一步重启的步骤,加上`tsc &&`.

```ssh
npm i express --save   
npm install @types/express 
```
## 代码
业务是,当我们请求 `/getData` 接口时,就获取爬虫数据.
```ts
// index.ts
import express from 'express'
import router from './router'

const app = express()
app.use(router)

app.listen(7001, () => {
    console.log('server is running');
})
```
```ts
// router.ts
import { Router, Request, Response } from 'express'
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

router.get('/getData', (req: Request, res: Response) => {
    const secret = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const coursePath = '../data/course.json'
    const analyzer = DellAnalyzer.getInstance()
    new Crowller(url, coursePath,  analyzer)
    res.send('GetDtata Success!')
})

export default router
```
没什么好说的,就是把 `crowller.ts` 和 `dellAnalyzer.ts` 作为工具抽出来了.

## 知识点

1. 想不到req的类型定义其实express的定义文件已经定义好了,直接引入 `Request` 使用就行了.