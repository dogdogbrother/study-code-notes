# import模块化和parcel打包

## import模块化

上个章节的模块化是用的命名空间的形式,但是因为没有明确的导入关系,这会让代码比较难以维护,例如根本不知道 `Components` 是从哪里来的,需要从备注里找到文件点击进去找.

我们把代码修改成 import 的形式:
```ts
// components.ts
export class Header {
    constructor() {
        const elem = document.createElement('div')
        elem.innerHTML = 'this is header'
        document.body.appendChild(elem)
    }
}
```
```ts
// page.ts
import { Header } from './components'

export default class Page {
    constructor() {
        new Header()
    }
}
```
可惜,这种写法是运行不了的,是因为我们在上个章节把commonJS变成了AMD模式,编译后的JS文件用的是define形式的模块加载,浏览器是不支持的.

如果想要让浏览器支持的话,可以引用require.js:
```html
<script src="https://cdnjs......./require.js"></script>
<script>
    require(['page'], function(page) {
        new page.default()
    })
</script>
```
>实际上没啥用,因为我们日常使用ts的通常都是配合webpack的.

## parcel打包

parcel是和webpack功能相似的打包工具,不过不需要配置,简单很多.

我们先初始化一下项目:
```ssh
npm init -y
tsc --init
```

然后我们接着编写 demo.ts 文件,并让 index.html 直接引入 demo.ts 文件:
```ts
// demo.ts
console.log(123)
```
我们运行下 index.html 文件发现没问题,能正常输出123.但是如果我们ts文件中有ts语法,就会报错,因为缺少解析这步,所以我们需要parcel工具:
```ssh
yarn add --dev parcel@next
```
然后我们写一个命令:
```json
{
    "dev": "parcel serve ./src/index.html"
}
```
运行`npm run dev`就行了,parcel帮我们起一个服务,我们再写代码就方便了很多.




