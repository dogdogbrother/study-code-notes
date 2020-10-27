## new 是什么
日常通常用 `newObject = new class(....)` 的形式创建个新的对象,并涉及到this绑定.

事实上class就是function的语法糖,class里面的设置的新属性就是function新的`object.prototype.属性`,constructor是已经存在的`Object.prototype.constructor`.

class的初始化参数也就是function的参数.

具体可看[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new).

## 实现的效果
两者效果等同:
```js
const a = New(myFn, 1, 2)
const b = new myFn(1, 2)
```

## 代码实现
```js
function New(Func, ...args) {
    const instance = {};
    if (Func.prototype) {
        // 指定一个对象的原型赋值给新的对象
        Object.setPrototypeOf(instance, Func.prototype)
    }
    // 改变this的指向,让函数中的this指向的是我们新建立的对象
    const res = Func.apply(instance, args) 
    // 这个判断是因为new有个特征,是 `如果该函数没有返回对象，则返回this`, 意思是可以返回对象的当new出来的值得
    if (typeof res === "function" || (typeof res === "object" && res !== null)) {
        return res
    }
    // 返回当前this
    return instance
}
```
[ObjectsetPrototypeOf的MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

## 测试
```js
function myFn(a, b) {
	this.a = a;
    this.b = b;
}
myFn.prototype.say = function() {
    console.log(`我的a值是${this.a}`);
}

const a = New(myFn, 'a', 'b')
a.say()
const b = new myFn('A', 'B')
b.say() 
```
测试下没有问题,但是