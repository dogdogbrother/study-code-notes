# 响应式系统的依赖收集追踪原理

>先思考一个问题,什么会有收集依赖?

有2点,1是我们data中有的数据是不需要视图显示的,双向绑定是种资源浪费,2是一个属性有可能对应好几个视图,那么就要都更新到才行(应该能猜测到是用数组保存依赖).

感觉是不是有些发布订阅模式的影子在里面...

## 订阅者 Dep
首先我们来实现一个订阅者 `Dep` ，它的主要作用是用来存放 `Watcher` 观察者对象:
```js
class Dep {
    constructor () {
        /* 用来存放Watcher对象的数组 */
        this.subs = [];
    }

    /* 在subs中添加一个Watcher对象 */
    addSub (sub) {
        this.subs.push(sub);
    }

    /* 通知所有Watcher对象更新视图 */
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}
```
## 观察者 Watcher
```js
class Watcher {
    constructor () {
        /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
        Dep.target = this;
    }

    /* 更新视图的方法 */
    update () {
        console.log("视图更新啦～");
    }
}

Dep.target = null;
```
## 依赖收集
这里我们修改下上章节的案例,添加个闭包`Dep`类的对象:
```js
function defineReactive (obj, key, val) {
    const dep = new Dep();
    
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
            dep.addSub(Dep.target);
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
            dep.notify();
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher();
        /* 在这里模拟render的过程，为了触发test属性的get函数 */
        console.log('render~', this._data.test);
    }
}
```
