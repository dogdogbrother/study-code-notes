## 前言
所谓的手写 promise 是笼统的说法，只要符合 [Promises/A+ 标准](https://promisesaplus.com/) 规范就行，规范里还提供了个工具，用于检测你的promise是否规范合格。  

珠峰培训的公开课里复刻的promise比较全面，缺点是有点复杂，这里是用的掘金的文章 [前面面试常见的手写功能](https://juejin.im/post/6873513007037546510#heading-14) 里面的 promise，简陋一些，也简单一些。

## 思考下手写个 Promise 的需求点:
1. Promise 是 new 出来的，肯定是个class类，要有 constructor，来处理new时传进去的函数参数,要有 then 和 catch 属性。
2. Promise 维持3种状态，pending 、fulfilled 、reject，初始是 pending。根据 resolve 还是 reject 转换状态，但是需要注意的是，状态不能逆转变。
3. Promise 的函数参数中是可以返回新的 Promise，这样就能无限的 `.then` 或者 `.catch`,这功能的思路其实是有个队列来存储状态。
4. Promise 是可以多次非链式调用 `.then`。意思是可以在 then 里面写多段代码，也可以把这几个代码拿出来写在多个平级 then 里面，效果是一样的。

## 直接看代码
```tsx
class MyPromise {
  constructor(func) {
    this.status = 'pending' // 默认状态  
    this.value = null // 因为 promise 中的 resolve 的值是 .then 函数的参数，所以需要个变量存储
    this.resolvedTasks = [] // promise 和平级 then 也有发布订阅的意思在，所以需要个数组记录对应的订阅事件
    this.rejectedTasks = []
    try {
      func(this._resolve, this._reject) // 直接执行我们 new promise 时的参数
    } catch (error) {
      this._reject(error)
    }
  }
  _resolve = (value) => { // 就是 resolve 函数的逻辑，改变状态，保存value值
    this.status = 'fulfilled'
    this.value = value
    this.resolvedTasks.forEach(t => t(value)) // 这是发布动作，订阅动作在then函数里面
  }
  _reject = (reason) => {
    this.status = 'reject'
    this.value = reason
    this.rejectedTasks.forEach(t => t(reason))
  }
  // .then 不仅能接收成功值，也能接受失败值，都是函数
  then(onFulfilled, onRejected) { 
    // 因为then是可以链式调用的，这里是个类递归操作,作用就是可以让我们无限的 .then 下去。
    // 事实上你在使用的时候，即使没有定义返回Promise，也可以无限.then下去的，只是没有then函数的参数是undefined
    return new MyPromise((resolve, reject) => { 

      // 订阅操作，存储个函数，此函数的value其实就是定义时的 resolve 或者 reject 的值(定义的resolve哦，不是最近上面的resolve)，发布时执行这个函数值就好了。
      this.resolvedTasks.push((value) => {  
        try {
          const res = onFulfilled(value) // 我们尝试执行下res函数，如果返回的是 Promise，就递归调用then方法，
          if (res instanceof MyPromise) {
            res.then(resolve, reject)
          } else {  // 如果不是就正常执行 resolve(上面最近的resolve)
            resolve(res)
          }
        } catch (error) { // 如果上面的操作有问题，捕捉到了语法之类的错误，自动reject了
          reject(error)
        }
      })

      // 和上面的是同样的逻辑
      this.rejectedTasks.push((value) => {  
        try {
          const res = onRejected(value)
          if (res instanceof MyPromise) {
            res.then(resolve, reject)
          } else {
            reject(res)
          }
        } catch (error) {
          reject(error)
        }
      })
    })
  } 
  
  catch(onRejected) { // catch 其实就得到了个只有失败逻辑的Promise就行了。
    return this.then(null, onRejected);
  } 
}
``` 
## 测试下
```js
new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
}).then((res) => {
  console.log(res);
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
}).then((res) => {
  console.log(res);
  throw new Error('a error')
}).catch((err) => {
  console.log('==>', err);
})
```
亲测没问题的。

## 总结
这是个简易的promis，而且我也对原版文章里面的内容作了一部分的改动，例如我少了 bind 指定this，少了 timeout。

即使是简易的，也是稍稍有点难理解，其中发布订阅的逻辑是简单的，但是递归promise 和递归then 的操作还是挺精妙的。