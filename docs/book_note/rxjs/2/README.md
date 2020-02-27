# RxJS⼊门

## RxJS的版本和运⾏环境

⽬前被⼴泛使⽤的RxJS版本有两个：v4和v5，这两个版本的API很相似，但是也有巨⼤的差别,甚至体现在了包的引用上。
```ssh
npm install rx    //  v4版本
npm install rxjs  //  v5版本
```
为什么不同版本的RxJS的npm包名都会不同呢？这是因为在开发v5的时候，考虑到架构的巨⼤差别，另起炉灶重写的.
```js
import Rx from "rxjs";
-------------
import Rx from 'rxjs/Rx';
```
这两种引用方式都可以，是因为项目目录中的 package.json 文件中 `"main": "Rx.js"`，代表rxjs这个npm库默认导出的就是Rx.js

值的注意的是，这样引入会把 rxjs 全部代码都打包进来，有可能你只是想用其中一个功能，这样就需要按需加载了，通常我们想到这样去操作：
```js
import { Observable } from 'rxjs';
```
如果我们只想用 Observable 这一个工具方法，似乎用这种引入配合 webpack的 tree-shaking，就能做到按需加载。但是可惜并不是这样的。

这是因为 import 是在编译阶段执行的，所以 tree-shaking 在打包的时候知道那些函数用到了而哪些没用到，但是我们打开 node_modules/rxjs/Rx.js:
```js
...
require('./add/observable/never');
require('./add/observable/of');
require('./add/observable/onErrorResumeNext');
require('./add/observable/pairs');
...
```
CommonJS 的 require 是没有 tree-shaking 功能的，因为 require 是动态的，是可以写在 if 语句中的，tree-shaking 并不能知道你这个代码到底有没有被执行过，只能不会对其起作用。

>RxJS的⼤部分功能都是围绕Observable类⽽创建,这是RxJS的架构设计决定的。

所以当我们引入`import { Observable } from 'rxjs';`的时候，就会把rxjs全部加载，所以我们要避开直接导入 rxjs 这个命令的文件。

假如我们想要使用`Observable.of`,正确的按需引入是这样的：
```js
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
```
我们先引入了 Observable 的对象，在执行 of.js 文件，让 of挂在 Observable上，我们可以看下 node_modules/add/observable/of.js 的内容：
```js
var Observable_1 = require('../../Observable');
var of_1 = require('../../observable/of');
Observable_1.Observable.of = of_1.of; // 挂载动作
```

## Observable和Observer

顾名思义，`Observable `就是“可以被观察的对象”即“可被观察者”，⽽ `Observer` 就是“观察者”，连接两者的桥梁就是` Observable` 对象的函数 `subscribe`。

可以说 RxJS 的运⾏就是 Observable 和 Observer 之间的互动游戏。

RxJS中的数据流就是Observable对象，Observable实现了下⾯两种设计模式：
+ 观察者模式（Observer Pattern）
+ 迭代器模式（Iterator Pattern）

## 创造Observable

写一个依次输出1，2，3的代码：
```js
import { Observable } from 'rxjs/Observable';
const onSubscribe = observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
};
const source$ = new Observable(onSubscribe);

const theObserver = {
  next: item => console.log(item)
}

source$.subscribe(theObserver);
```
我们分析下这个代码的流程和思路：
1. 我们生成 Observable 的实例（可以理解为是一个发布者，发布的规则与内容已经在参数迭代器函数中了），参数是一个迭代器，迭代器的函数的参数有一个 next 方法。
2. source$ 数据流调用自身的接收订阅的功能函数subscribe，参数是个对象，next 函数对应的是发布时的next方法。

>这个函数只是告诉我们一点 Observable 的用法，还没体现出 rxjs 的作用。

## 无线的发布

我们可以让这个函数更复杂一点，就是输出1，2，3的过程中有一秒的间隔，很明显，这个逻辑是要写在发布函数里面的：
```js
const onSubscribe = observer => {
  let number = 1;
  const handle = setInterval(() => {
    observer.next(number++);
    if (number > 3) {
      clearInterval(handle);
    }
  }, 1000);
};
```
测试下是没问题的，如果我们取消 `number > 3` 的话就会不停的发布消息。

有意思的地方来了，当我们执行`source$.subscribe()`订阅的时候，其实还没有发布过消息，那为什么当有 next() 被发布的时候，数据流是能被接受到的呢？

虽然不明白原理，但是结果上看，这是个发布订阅的异步函数啊！！当发布函数执行了 `next()`，订阅函数就能接受得到！！

## Observable的完结

上面的例子中，我们可以一直调用 next(),观察函数就能一直接受。当我们确认不会再 next 了，就应该停止订阅的接收，节省性能。

我们在订阅函数下添加 complete 函数：
```js
const theObserver = {
  next: item => console.log(item),
  complete: () => console.log('No More Data')
}
```
complete 是完整的，完全的意思，很明显，我们主要在发布的 `onSubscribe` 函数中在适当的时机调用 `observer.complete()` 就能停止发布订阅的功能了。

>除了 next 和 complete，还有 error 作为错误提醒，因为用法是一样的，我就不单独写了。 

## Observer的简单形式

上面的 `source$.subscribe` 参数是个对象，里面订阅了 next 等方法，但其实还可以直接简化一下写法。
```js
source$.subscribe(
  item => console.log(item),
  err => console.log(err),
  () => console.log('No More Data')
);
```
如果不需要 err 报错，第二个参数为 null 就行了。

## 退订Observable

感觉和 complete 有点功能重合呢，具体有啥不同我咱们也不知道，等后面这里有了别的想法再更新吧。