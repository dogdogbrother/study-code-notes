# 登录功能开发和轻微优化

把我们的项目加上登录,退出显示数据的功能.鉴权用的是 cookie-session,自然要先安装:
```ssh
npm i cookie-session --save
npm i @types/cookie-session
```
然后直接上代码:
```ts
// index.ts
import express from 'express'
import router from './router'
import bodyParser from 'body-parser'
// 这里是新加的
import cookieSession from 'cookie-session'

const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
// 这里是新加的
app.use(
    cookieSession({
        name: 'session',
        keys: ['teacher wang'],
        maxAge: 24 * 60 * 60 * 1000
    })
)
app.use(router)

app.listen(7001, () => {
    console.log('server is running');
})
```
```ts
import { Router, Request, Response } from 'express'
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'
import fs from 'fs'
import path from 'path'

interface RequestWithBody extends Request{
    body: {
        [key: string]: string | undefined
    }
    
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        res.send(`
            <html>
                <body>
                    <a href="/getData">爬</a>
                    <a href="/logout">退出</a>
                </body>
            </html>
        `)
    } else {
        res.send(`
            <html>
                <body>
                    <form method="post" action="/login">
                        <input type="password" name="password">
                        <button>登录</bnutton>
                    </form>
                </body>
            </html>
        `)
    }
    
})
router.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.login = undefined
    }
    res.redirect('/')
})
router.post('/login', (req: RequestWithBody, res: Response) => {
    const { password } = req.body
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        res.send('已经登录过')
    } else {
        if (password === '123' && req.session) {
            // 这里要做个类型保护,因为我有可能后面不再用这个session中间件了,那么就会报错.
            if (req.session) {
                req.session.login = true
                res.send('登录成功')
            } else {
                res.send('登录失败')
            }
        } else {
            res.send('登录失败')
        }
    }
})
router.get('/getData', (req: RequestWithBody, res: Response) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        const secret = 'x3b174jsx'
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
        const coursePath = '../data/course.json'
        const analyzer = DellAnalyzer.getInstance()
        new Crowller(url, coursePath,  analyzer)
        res.send('GetDtata Success!')
    } else {
        res.send(`请登录后爬取内容`)
    }
})

router.get('/showData', (req: RequestWithBody, res: Response) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        try {
            const position = path.resolve(__dirname, '../data/course.json')
            const result = fs.readFileSync(position, 'UTF-8')
            res.json(JSON.parse(result))
        } catch(e) {
            res.send('暂时没有爬取到内容')
        }
    } else {
        res.send('尚未登录,请登录后查看内容')
    }
})

export default router
```
代码虽长但是都是以前写的,主要是干了这么几件事:
1. 根页面会看是否登录,没登录的话显示登录表单,已经登录的话显示爬取数据按钮和退出.

2. logout 退出接口清空`req.session.login`,重定向到根路径.

3. 写一个showData接口,读取json文件后发送给前端.

## 轻微优化

我们把代码改造成正常的返回JSON格式的API接口,在 utils 目录下新建  `util.ts` 文件,专门用于处理返回数据格式:
```ts
// utils/util.ts
interface Result {
    sucess: boolean
    errMsg?: string
    data: any
}

export const getResponseData = (data: any, errMsg?: string): Result => {
    if (errMsg) {
        return {
            sucess: false,
            errMsg,
            data
        }
    }
    return {
        sucess: true,
        data
    }
}
```
我们就可以在正常逻辑中`res.json(getResponseData(null, '请先登录'))`就行了.为了方便,我把改造后的文件重复一遍:
```ts
import fs from 'fs'
import path from 'path'
import { Router, Request, Response, NextFunction } from 'express'
import Crowller from './utils/crowller'
import DellAnalyzer from './utils/analyzer'
import { getResponseData } from './utils/util'

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

const router = Router()

router.get('/', (req: Request, res: Response) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        res.send(`
            <html>
                <body>
                    <a href="/getData">爬</a>
                    <a href="/logout">退出</a>
                </body>
            </html>
        `)
    } else {
        res.send(`
            <html>
                <body>
                    <form method="post" action="/login">
                        <input type="password" name="password">
                        <button>登录</bnutton>
                    </form>
                </body>
            </html>
        `)
    }
    
})
router.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.login = undefined
    }
    res.json(getResponseData(true))
})
router.post('/login', (req: RequestWithBody, res: Response) => {
    const { password } = req.body
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        res.json(getResponseData(false, '已经登录过'))
    } else {
        // 这里要做个类型保护,因为我有可能后面不再用这个session中间件了.
        if (password === '123' && req.session) {
            req.session.login = true
            res.json(getResponseData(true))
        } else {
            res.json(getResponseData(false, '登录失败'))
        }
    }
})
router.get('/getData', checkLogin,  (req: RequestWithBody, res: Response) => {
    const secret = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const coursePath = '../../data/course.json'
    const analyzer = DellAnalyzer.getInstance()
    new Crowller(url, coursePath,  analyzer)
    res.json(getResponseData(true))
})

router.get('/showData', checkLogin, (req: RequestWithBody, res: Response) => {
    try {
        const position = path.resolve(__dirname, '../data/course.json')
        const result = fs.readFileSync(position, 'UTF-8')
        res.json(getResponseData(JSON.parse(result)))
    } catch(e) {
        res.json(getResponseData(false, '数据不存在'))
    }
})

export default router
```

## 结尾

学到这里我们不过是学习了TS中比较简单的内容,似乎和JS区别不大,后面我们开始学习难一些的高级语法,后面会再次改造这个项目.