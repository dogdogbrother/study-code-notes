# 响应式系统的基本原理
`Object.defineProperty`已经是老生常谈了,你不知道的js里面也详细的说明了.这里写一个小案例,来更好的说明一下:

为了便于理解，不考虑数组等复杂的情况，只对对象进行处理。

`cb()`没有作用,只是模拟视图更新(通知):
```js
function cb (val) {
    /* 渲染视图 */
    console.log("视图更新啦～,值是"+val);
}
```
响应式原理的主要函数,其实就是用了`Object.defineProperty`,这个是简化版本的,收集依赖下章会讲
```js
function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,       /* 属性可枚举 */
        configurable: true,     /* 属性可被修改或删除 */
        get: function reactiveGetter () {
            return val;         /* 实际上会依赖收集，下一小节会讲 */
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            cb(newVal);
        }
    });
}
```
还需要一个函数把对象的属性遍历设置`defineProperty`:
```js
function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}
```
然后模拟个vue的实例,测试下:
```js
class Vue {
    /* Vue构造类 */
    constructor(options) {
        this._data = options.data;
        // vue的data是个函数,这里稍稍简化一下
        observer(this._data);
    }
}
let o = new Vue({
    data: {
        test: "I am test."
    }
});
o._data.test = "hello,world.";  /* 视图更新啦～,值是hello,world. */
o._data.test = "又更新啦";  /* 视图更新啦～,值是又更新啦 */
```
## 完整示例
```js
class Dep {
    constructor () {
        this.subs = [];
    }
    addSub (sub) {
        this.subs.push(sub);
    }
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}
class Watcher {
    constructor () {
        Dep.target = this;
    }
    update () {
        console.log("视图更新啦～");
    }
}
function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}
Dep.target = null;

function defineReactive (obj, key, val) {
    const dep = new Dep();
    
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            dep.addSub(Dep.target);
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            dep.notify();
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        new Watcher();
        console.log('render~', this._data.test); // 模拟get操作
    }
}
let o = new Vue({
    data: {
        test: "I am test."
    }
});
o._data.test = "hello,world.";  /* 视图更新啦～,值是hello,world. */
//o._data.test = "又更新啦";  /* 视图更新啦～,值是又更新啦 */
```
**个人总结一下:**

在new Vue的时候,构造函数时把data进行了一次处理,把data的所有值都设置了get和set.

但是get和set怎么就能做到发布订阅呢?我们有一个闭包变量是个数组,当我们对一个属性取值的时候,get的时候就会push一位,当set的时候我们就会把变量数组循环输出,执行update函数.

所以,当我们定义了一个data属性,但是从来都没用过它(没走过get),当我们设置他的时候,set中也没东西可执行.
