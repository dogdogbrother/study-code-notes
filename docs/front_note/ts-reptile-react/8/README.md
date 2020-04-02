# TS编写express的类型定义问题

我们先写一个需求,根路径下写form表单,提交正确的密码后再执行爬虫操作.

```ts
// router.ts

// 代码省略...

router.get('/', (req: Request, res: Response) => {
    res.send(`
        <html>
            <body>
                <form method="post" action="/getData">
                    <input type="password" name="password">
                    <button>提交</bnutton>
                </form>
            </body>
        </html>
    `)
})

router.post('/getData', (req: Request, res: Response) => {
    const { password } = req.body
    if (password === '123') {
        const secret = 'x3b174jsx'
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
        const coursePath = '../data/course.json'
        const analyzer = DellAnalyzer.getInstance()
        new Crowller(url, coursePath,  analyzer)
        res.send('GetDtata Success!')
    } else {
        res.send('password Error')
    }
})
```

我们发现TS没有报错,但是页面执行的时候却报错了,因为 `req.body` 是undefined.

当然我们可以安装 `body-parser` 中间件就能解决,但是问题是为什么TS没有给我们错误的提示呢?

我们点击进去查看下定义文件,发现req.body其实是个any类型,所以才不报错.

## 安装body-parser
```ssh
npm i body-parser --save
```
引用
```ts
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: false}))
```
测试下,好像是没问题了,但是还有缺陷.我们虽然通过中间件让 `req.body` 有了对应的内容,但是我们的类型 `Request` 并没有得到相应的调整.

## 扩展解决Express的类型定义问题
我们可以定义一个接口,继承 `Request`:
```ts
// router.ts
interface RequestWithBody extends Request{
    body: {
        [key: string]: string | undefined
    }
    
}
```
我们用泛匹配的形式,body上的所有属性都是字符串或是未定义.

## 类型融合

假如我们想写一个中间件,里面给req扩展个新属性:
```ts
// index.ts
import express, { Request, Response, NextFunction } from 'express'
app.use((req:Request, res: Response, next: NextFunction) => {
    req.teacherName = "wang"
    next()
})
```
很明显这样做是不行的,因为req上面并没有 `teacherName` 的属性,我们需要添加一下.新建 `custom.d.ts` 文件:
```ts
// custom.d.ts
declare namespace Express {
    interface Request {
        teacherName: string
    }
}
```
这种写法其实就是照搬了`Express`的类型文件写的,他是不会覆盖带原类型文件的,TS是有融合机制的,会扩展新的属性.

这样我们在路由里面也可以使用 `req.teacherName` 了.