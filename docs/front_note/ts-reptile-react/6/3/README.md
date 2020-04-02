# namespace命名空间

## 概念

假如我们 index.html 文件引入了 demo.js 文件,此文件是由 demo.ts 编译来的,ts文件如下:
```ts
class Header {
    constructor() {
        const elem = document.createElement('div')
        elem.innerHTML = 'this is header'
        document.body.appendChild(elem)
    }
}

class Page {
    constructor() {
        new Header()
    }
}
```
我们编译成js文件后,让html文件去引用他:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"> 
        <title>test</title>
    </head>
    <body>test</body>
    <script src="./demo.js"></script>
    <script>
        new Page()
    </script>
</html>
```
刷新页面我们可以看到 this is header 的显示,但是这里有个问题,我们在控制台里面可以直接打印`Page`和`Header`,这俩变量成了全局变量了.

如何让我们在TS声明的变量成为局部变量(类似于模块化)呢?这就带出了命名空间的概念.

## 代码实现
```ts
namespace Home {
    class Header {
        // ...
    }
    export class Page {
        constructor() {
            new Header()
        }
    }
}
```
然后我们在html文件中使用 `new Home.page()` 就行了.我们发现全局只有Home.Page的变量了.当然如果你想使用`Home.headr`的话,TS中`export`保留一下就OK了.

## 多文件的命名空间

我们新建立一个 components.ts 文件,把Headr模块内容移植过去:
```ts
namespace Components {
    export class Header {
        // ...
    }
}
```
demo.ts 里面怎么引用这个命名空间呢?其实不需要引用,直接写就行了:
```ts
/// <reference path='./component' />

namespace Home {
    export class Page {
        constructor() {
            new Components.Header()
        }
    }
}
```
这么写完其实是可以用了,但是html中要引入2次js文件,page.js和components.js.

可以让这两个js文件合并成一个文件,修改下 tsconfig.json 的配置项 `outFile: './page.js'`.

>这和`module: "common"`的配置是冲突的,我们修改值为 `amd` .

## 其他

在命名空间里面还可以导出 interface 接口.

还可以定义导出子namespace,命名空间是可以嵌套的.