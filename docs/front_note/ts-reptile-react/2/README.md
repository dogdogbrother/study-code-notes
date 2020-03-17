# 组合模式优化代码

上个章节的代码跑起来是没有问题的,但是功能缺不太完善.

例如我爬一个新的页面,html的是不同的,存数据时的结构也是有差异,整个业务逻辑都完全不同,那么我们就要单独写一个 `****.ts` 文件.

事实上我们可以分割固定的逻辑如 `superagent`获取页面信息,`writeFile` 函数写入文件等操作放在一个ts文件内.

再把对页面解析的逻辑写在 `***Analyzer.ts` 文件中.

这样如果我想再爬一个Boos直聘的网站,我就只需要在 `crowller.ts` 文件中添加个新的url和json文件名,专注写`bossAnalyzer.ts`就行了.

## 代码
```js
// src/crowller.ts 文件

import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import DellAnalyzer from './dellAnalyzer'

// 4. analyzer的接口要求他有一个analyze方法,参数为2个string,返回string
// 不过为什么要把这个接口导出去呢,解析文件里面有说明.
export interface Analyzer {
    analyze: (html: string, filePath: string) => string
}

class Crowller {
    private filePath = path.resolve(__dirname, this.coursePath)
    async getRawHtml() {
        const result = await superagent.get(this.url)
        return result.text
    }
    writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }
    async initSpiderProcess() {
        const html = await this.getRawHtml()
        // 3. 我们调用了解析类下的analyze方法,他返回的是我们想得到的最终的字符串信息
        // 这个逻辑和动作明白了,也就比较好定义它的接口类型了
        const fileContent = this.analyzer.analyze(html, this.filePath)
        // 5. 写入对应的json文件,程序结束.
        this.writeFile(fileContent)
    }
    // 2. 在new 类时接收的三个参数都用快捷方式创建成私有属性,Analyzer的接口解释看下一步
    constructor(private url: string, private coursePath: string, private analyzer: Analyzer) {
        this.initSpiderProcess()
    }
}
const secret = 'x3b174jsx'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
const coursePath = '../data/course.json'

const analyzer = new DellAnalyzer()
// 1. 先看使用,url和 path 就不用说了, analyzer 就是页面的解析逻辑的类
new Crowller(url, coursePath,  analyzer)
```
再看页面信息解析文件:
```js
// src/dellAnalyzer.ts 文件

import fs from 'fs'
import cheerio from 'cheerio'

import { Analyzer} from './crowller'

interface Course {
    title: string;
    count: number
}

interface CourseResult{
    time: number;
    data: Course[];
}

interface Content {
    [propName: number]: Course[]
}
// 之所以要引入 Analyzer 接口,就是为了用 implements 去继承接口规则
// 当然,这个地方不写也是可以的,但是写了就更严谨一些.
export default class DellAnalyzer implements Analyzer{
    private getCourseInfo(html: string) {
        const $ = cheerio.load(html)
        const courseItems = $('.course-item')
        const courseInfos: Course[] = []
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
    
    generateJsonContent(courseInfo: CourseResult, filePath: string) {
        let fileContent:Content = {}
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[courseInfo.time] = courseInfo.data
        return fileContent
    }

    // 1. analyze 方法是外部调用的核心函数,内容很简单.
    public analyze(html: string, filePath: string) {
        const courseInfo = this.getCourseInfo(html)
        const fileContent = this.generateJsonContent(courseInfo, filePath)
        return JSON.stringify(fileContent)
    }
}
```
测试,跑一下,没问题,和上个章节的功能是一致的.

## 知识点总结

1. 类的合作
负责逻辑的类中,定义个 public 函数作为暴露函数,里面把逻辑运行通.外部调用此类的暴露函数就行了.

2. 创建类时在接收参数的同时,创建该属性.
```ts
constructor(private url: string, private coursePath: string, private analyzer: Analyzer) {
```
这样我们就可以使用 `this.url`, `this.coursePath` 等等,这是种简写.

3. implements 继承接口规则
implements不同于extends,extends是继承一个类的方法属性等等.

implements是继承一个借口中的规则.
```ts
interface Analyzer {
    analyze: (html: string, filePath: string) => string
}
class DellAnalyzer implements Analyzer{}
```
DellAnalyzer 类就要必须有一个 analyze 方法,此方法参数是2个字符串参数,返回字符串值.