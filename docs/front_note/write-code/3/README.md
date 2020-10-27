## call和apply

> **Function.protoype.call()**  
**Function.protoype.apply()** 

两者很相似,都是用指定的this来调用函数,只是参数上call是列表,apply是数组.

```js
const me = { name: 'Jack' }
function say(age) {
  console.log(`我名字是${this.name || 'default'},年龄是${age}`);
}
say.call(me,20) // 我名字是Jack,年龄是20
say.apply(me,[20]) // 我名字是Jack,年龄是20
```

## 代码实现
实现的过程也比较简单,就是包装了一层.  
把自己的上下文(this),作为传进来的this(我们想要的)的属性,然后执行自己,把结果返回去就行了.  
```js
Function.prototype.myCall = function (context = globalThis, ...args) {
    const key = Symbol('key')
    context[key] = this
    const res = context[key](...args)
    delete context[key]
    return res
};
```
测试下也没问题,如果是apply的话只要更改下形参`[args]`就ok了.
```js
say.myCall(me,20) // 我名字是Jack,年龄是20
say.myApply(me,[20]) // 我名字是Jack,年龄是20
```

