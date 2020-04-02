# 描述文件中的全局类型

我们在前面讲过,有些工具是js写的,ts文件中直接使用会报错,所以我们要有一个描述文件 `**.d.ts`.

下面用个例子来讲解,我们先在html文件中引入jquery.js:
```html
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
```
再在TS文件中使用他:
```ts
// page.ts
$(function() {
    alert(1)
})
```
这样做是会报错的,因为我们没有定义`$`是什么,所以我们需要个`jquery.d.ts`文件:
```ts
declare var $ : (param: () => void) => void
```
我们用了 `declare` 关键字创建了全局变量 `$` ,他的值是一个函数,没有返回.这时候再看我们的ts文件就不会报错了.当然还可以定义全局的函数,和变量是一样的.
```js
declare function $(param: () => void): void
```

问题来了,我们如果再使用jq别的功能呢?
```js
$(function() {
    $('body').html('<div>123</div>')
})
```
其实只要再添加declare函数就行了,同名的函数也是写多个进行重载,TS会智能判断的.
```ts
interface JqueryInstance {
     html: (html: string) => JqueryInstance  // 因为jq返回的还是jq对象.
}
declare function $(params: string): JqueryInstance
```

## 接口实现函数重载
```ts
interface JQuery {
    (readyFunc: () => void): void
    (selector: string): JqueryInstance
}
declare var $: JQuery
```
功能和上面的是一样的.

现在还差一种情况,就是对象或是类的定义,假如有如下代码:
```ts
new $.fn.init()
```
类型应该利用命名空间去定义:
```ts
declare namespace $ {
    namespace fn {
        class init()
    }
}
```

## import导入的定义
```ts
import $ from 'jquery'
```
会报错,我们缺失定义:
```ts
declare module 'jquery' {
    interface JqueryInstance {
        html: (html: string) => JqueryInstance 
    }
    
    interface JQuery {
        (readyFunc: () => void): void
        (selector: string): JqueryInstance
    }
    var $: JQuery
    export = $
}
```
ok了.