## bind的用法

> **Function.protoype.bind()**

bind与上面的call和apply作用基本是一样的,只是使用bind时函数并没有执行,而是返回改变this的后的函数.

```js
const me = { name: 'Jack' }
function say(age) {
  console.log(`我名字是${this.name || 'default'},年龄是${age}`);
}
say.call(me,20) // 输出 我名字是Jack,年龄是20
say2 = say.bind(me,20) 
say2() // 输出 我名字是Jack,年龄是20
```
除此之外,bind还支持构造函数:
```js
const say2 = say.mbind(me, 20)
const say3 = new say2()
console.log(say3);  //输出 {}
```
再看个例子:
```js
var getname = function(){
    console.log(this.name)
};
var m = getname.bind({name:'q1'})
m(); //输出 q1
```
本来`this.name`是undefined的,但是用bind包装了一下,指定了this.

## 代码实现
如果忽略构造形式的话还是比较简单的:
```js
function myBind(asThis, ...args1) {
    let fn = this;  // 函数调用时，原this其实就是这个调用函数
    return function(...args2) {  // 同时，返回的新函数也可以接受参数
        return fn.call(asThis, ...args1, ...args2);
    }
}
```

## bind作为构造函数使用的绑定函数
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)的下面是这么说的:

> 当一个绑定函数是用来构建一个值的，原来提供的 this 就会被忽略.

用bind可以改变this的调用,但是`new bind生成的函数`却忽略bind时传入this的动作,而是正常的因new而生成的this绑定.看个例子:
```js
const me = { name: 'Jack' }
function say(age) {
  // this.gender = '男' 等同于下面的say.prototype.gender = '男'
  console.log(this.name,this.gender,age);
}
say.prototype.gender = '男'
const say2 = say.bind(me, 20)
say2()  
// 如果函数形式,传入的this有效,输出 Jack undefined 20
const say3 = new say2()
// 如果构造形式,传入的this无效,自身的new绑定的this生效,输出 undefined 男 20
```

### 第一个难点来了,我们的`mybind`如何知道你是函数调用还是构造形式呢?
`mybind`执行后,会返回一个待运行的函数,那么这个函数中如果有this,那this指向的是哪里呢?

答案是不知道,this的是运行时绑定的,如果是函数调用就会this丢失指向全局,new生成的话this指向生成的对象.

### 第二个难点是如何判断this指向?
答案是用 [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 运算符.

MDN上是这么描述的:
> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

以上面的代码举例`say3 instanceof say2`,instanceof 检测**say2(构造函数)**的**prototype**的属性是否存在于**say3(实例对象)**中.

结合2个难点,就可以用 `this instanceof 返回构造函数` 来判断是不是new调用的,如果是函数调用this为全局(false),new调用的的话,this指向的就是构造函数生成的对象(true).

## 最终版本的实现
```js
Function.prototype.myBind = function (context = globalThis, ...args1) {
    // say2 = say.myBind() 是固定会执行的,fn指的就是 函数say.
    let fn = this;
    let resultFn = function(...args2) {
        // 不过是say2()还是 new say2 
        // 执行的其实都是 函数say,只是参数不同,
        // 如果是new调用,就把自身的this传进去,做到忽略this指定
        // 函数调用的话,就把myBind指定的this用call绑定下.
        fn.call(this instanceof resultFn ? this : context, ...args1, ...args2);   
    }
    // 没有这步不行,new的时候有问题.
    resultFn.prototype = Object.create(fn.prototype);
    return resultFn;
}
```
`resultFn.prototype = Object.create(fn.prototype);`存在问题的原因是:
1. 当你通过 `say.myBind()` 得到say2时, say2函数 等同于返回的 resultFn 函数.
2. `new say2()`时,this其实就是 **resultFn构造函数**,并没有say也就是fn原型链上的内容,所以要单独的进行下赋值.
3. `resultFn.prototype = fn.prototype;` 这样直接等于不可以,因为当你改变say原型链上东西的时候,say2 也会受到改变.