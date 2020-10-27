## 常用的对象拷贝方法
为了防止js值引用问题,通常我们想复制一个对象的时候,常用这几种方法:
```js
const obj1 = { 
    // 有着茫茫多的对象
}
// 方法1 扩展运算符
const obj2 = {...obj1}
// 方法2 用assign创建个新的对象
const obj3 = Object.assign({}, obj2)
```
这两个方法只能复制第一层属性,如果 `obj1.a = { ... }` 的话,就会有问题了,a属性的对象还是值引用.

再看一种方案:
```js
const obj2 = JSON.parse(JSON.stringify(obj1))
```
这种把对象变成字符串,再解析回json的到是可以解决上面的问题.  
但是他也有个挺致命的缺陷,无法复制属性值为`undefined`,`function`,`RegExp`等等的类型.
```js
const obj = {
    a: '我能被复制',
    b: undefined,
    c: () => { console.log(2) },
    d: /runoob/i // 正则
}   
console.log(JSON.parse(JSON.stringify(obj)));
// 输出  { a: '我能被复制', d: {} }
```
属性 b 和 c 丢失了,这是因为 `JSON.stringify` 解析函数的时候会传化成undefined,而`JSON.parse`解析undefined会过滤掉空值.

d的值也是错误的(原因不明).

## 需求有哪些
> js自身并没有提供比较好的深拷贝的方案,需要手动去写个函数.其中有几个细节的点需要注意下.

1. 看个循环引用死循环的问题(关键点):
```js
const a = {
    b: a
}
```
无法递归赋值,死循环了.处理起来有2个难点:
* 层级递归下如何获知你当前处理的对象你曾经处理过呢?
* 就算你知道了你又如何知道这两个对象是一个对象呢?要知道对象是存址的,无法通过对比属性值来判断.

`WeakMap`([MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap))是解决这个问题的关键.  

`WeakMap` 特性是,他的key值是对象址.我们所有的递归维护一个WeakMap,当能用 `WeakMap对象.get(要赋值的obj)` 获取到值得话,说明你已经存在过此对象了.停止解析.

2. 如果你传进来的不是参数的类型不是对象,那么就直接返回就好了,做个兼容处理不要报错影响到其他地方的代码运行.

3. 如果参数对象是特殊类型的对象呢?例如**date/map/set/正则**等等,直接返回去还是会出现普通对象址不变的问题.所以要重新生成这个特殊对象,但是值还是以前的值,但是怎么生成的话就要看具体的类型了.
```js
function deepCopy(obj, cache = new WeakMap()) {
    // 支持时间
    if (obj instanceof Date) return new Date(obj)
    // 支持正则对象
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
    // 其他的就自己查文档吧
}
```
4. 如果参数是对象函数,不用继续解析了,当然也不能直接返回导致址不变,而是返回个新的函数,当你执行新函数的时候,里面会运行参数函数.但是注意,有个this的坑,你调用此函数时,真正的函数的this其实是return的那个新函数,而内部执行的真正的函数就丢失了this.所以还要apply传入修正的this.
5. 最后一个问题,如果我们传入的对象是数组呢?我们还要判断下,传入的是数组返回也要是输入,而且如果数组里面的值不少对象,而是number的话,还不能添加到`weakMap`中.

## 完整代码
```js
function deepCopy(obj, cache = new WeakMap()) {
    // 如果传进来的不是对象,就直接返回出去
    if (!obj instanceof Object) return obj
    // 防止循环引用,如果 cache 里面有个这个值,就停止解析
    if (cache.get(obj)) return cache.get(obj)
    if (obj instanceof Function) {
        return function () {
          return obj.apply(this, arguments)
        }
    }

    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
    
    const res = Array.isArray(obj) ? [] : {}

    cache.set(obj, res)

    Object.keys(obj).forEach((key) => {
        // 判断属性是不是对象,是的话继续解析
        if (obj[key] instanceof Object) {
          res[key] = deepCopy(obj[key], cache)
        } else {
          res[key] = obj[key]
        }
    });

    return res
}
```
## 测试
```js
const source = {
    name: 'Jack',
    meta: {
        age: 12,
        birth: new Date(),
        ary: [1, 2, { a: 1 }],
        say() {
            console.log('Hello');
        },
        rule: /runoob/i
    }
}
source.source = source
const newObj = deepCopy(source)
```