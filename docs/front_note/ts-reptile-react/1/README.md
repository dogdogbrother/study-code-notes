# 先写个简单的爬虫

先来个简单的,熟悉下ts语法.

简单爬虫爬的网站是用的教程里面的课件网站,里面需要个 secret 秘钥,这个是会变动的,所以有可能跑不起来.

不过不影响,代码比较简单,看看就行了.

## 环境搭建
要先全局安装typescript.
```sh
npm i typescript -g
```
然后初始化一个项目
```sh
npm init
tsc init
```
`tsc init`命令会帮我们生成一个 `tsconfig.json` 文件,里面是TS的一些基础配置.后续我们会讲到这个配置文件.

## 代码
我们在根目录下新建src目录,下面新建 `crowller.ts`.

根目录下新建data目录,用于本地数据的存储.
```js
import superagent from 'superagent'
/**
 * super超级,agent代理.superagent帮我们代理请求url,并做一些处理,更简单的获得页面信息.
 * superagent 是js语法写的,直接引用的话,ts文件不知道如何使用它,也就是没有代码提示.
 * 解决方案,是TS帮我们构建了 .d.ts 这种的类型文件(翻译文件)
 * 要先安装 npm i @types/superagent -D
 * -D 是--dev--save 的缩写
 */
import cheerio from 'cheerio'
/**
 * cheerio帮助我们像JQ一样简单的去获取页面的元素
*/
import fs from 'fs'
import path from 'path'

interface Course {
    title: string;
    count: number
}

interface CourseResult{
    time: number;
    data: Course[];
    /**
     * 接口的类型不仅仅可以是基础类型,还可以是接口
    */
}

interface Content {
    [propName: number]: Course[]
    /**
     * [propName: number] 的意思是这个对象的key值是个不固定的数字
    */
}

class Crowller {
    private secret = 'x3b174jsx'
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
    private filePath = path.resolve(__dirname, '../data/course.json')

    getCourseInfo(html: string) {
        const $ = cheerio.load(html)
        const courseItems = $('.course-item')
        const courseInfos: Course[] = []
        /**
         * Course[] 的写法意思就是数据是个数组,每一项的对象格式都是Course接口的格式
         */
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc')
            const title = descs.eq(0).text()
            const count = parseInt(descs.eq(1).text().split('：')[1])
            courseInfos.push({
                title,
                count
            })
        })
        return {
            time: new Date().getTime(),
            data: courseInfos
        } 
    }
    async getRawHtml() {
        const result = await superagent.get(this.url)
        return result.text
    }
    // 把获取到的数据存到本地一个json文件中
    generateJsonContent(courseInfo: CourseResult) {
        let fileContent:Content = {}
        // 用 fs.existsSync 判断文件是否存在,存在就取,不存在就创建个.
        if (fs.existsSync(this.filePath)) {
            fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
        }
        fileContent[courseInfo.time] = courseInfo.data
        return fileContent
    }

    writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }

    async initSpiderProcess() {
        // 2. 利用 superagent 工具获取到html页面信息
        const html = await this.getRawHtml()
        // 3. 把页面信息分解成 json 信息
        const courseInfo = this.getCourseInfo(html)
        // 4. 处理下读写的逻辑,就是如果存在json文件,就读取内容,并把新的数据push进去,如果不存在就新建个json数据.并返回json
        const fileContent = this.generateJsonContent(courseInfo)
        // 5. 把第四步返回的json写到 course.json 文件中
        this.writeFile(JSON.stringify(fileContent))
    }
    constructor() {
        // 1. 项目最开始执行的是这个函数
        this.initSpiderProcess()
    }
}

new Crowller()
```

## 知识点总结

1. 类型定义

```ts
getCourseInfo(html: string){}
```
参数html,类型是个字符串,如果你传进来一个number就会报错.

2. 接口
```ts
interface Course {
    title: string;
    count: number
}
fn(obj: Course)
```
如果你的参数是个对象,而你要求这个对象要有一个值为字符串的 title 属性,一个值为数字的 count 属性,那么就可以使用 `interface` 关键字声明接口,自己定义类型.

3. 对象在数组里面
```ts
interface CourseResult{
    time: number;
    data: Course[];
}
```
data为数组,数组里面的对象的格式为 Course 接口类型.

4. 不知道key值得对象的定义
```ts
interface Content {
    [propName: number]: Course[]
}
```
Content 接口的对象的值是任何一个值,只要符合 number 类型就可以.