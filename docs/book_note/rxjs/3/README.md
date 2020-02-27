# 操作符基础

使⽤和组合操作符是RxJS编程的重要部分，是解决某个具体应⽤问题的模式。

当我们要⽤RxJS解决问题时，⾸先需要创建Observable对象，于是需要创建类操作符；当需要将多个数据流中的数据汇合到⼀起处理时，需要合并类操作符等等。

## 为什么要有操作符

在所有操作符中最容易理解的可能就是map和filter，因为JavaScript的数组对象就有这样两个同名的函数map和filter，对⽐这两个函数在数组和RxJS中的⽤法就能够理解⼆者的联系和区别。

先看下正常的js：
```js
const source = [1, 2, 3, 4];
const result = source.filter(x => x % 2 === 0).map(x => x * 2);
console.log(result);  //  输出 [4, 8]
```
这段代码展⽰了⼏个关键点：
* filter和map都是数组对象的成员函数。
* filter和map的返回结果依然是数组对象。
* filter和map不会改变原本的数组对象。
这样写代码的好处不⾔⾃明，⼀个复杂的功能可以分解为多个⼩任务来完成，每个⼩任务只需要关注问题的⼀个⽅⾯。此外，因为数组对象本⾝不会被修改，⼩任务之间的耦合度很低，这样的代码就更容易维护。

filter 和 map 就是操作符的作用。

## 操作符的分类

RxJS v5版⾃带60多个操作符，掌握这些操作符最困难之处是当遇到⼀个实际问题的时候，该选择哪⼀个或者哪⼀些操作符来解决问题，所以，⾸先要对这些操作符分门别类，知道各类操作符的特点。

根据功能，操作符可以分为以下类别：
+ 创建类（creation）
+ 转化类（transformation）
+ 过滤类（filtering）
+ 合并类（combination）
+ 多播类（multicasting）
+ 错误处理类（error Handling）
+ 辅助⼯具类（utility）
+ 条件分⽀类（conditional&boolean）
+ 数学和合计类（mathmatical&aggregate）

>像上面的 map 属于转化率， filter 属于过滤类。

## 静态和实例分类

操作符除了从功能上可以从的上面分类，还可以从存在形式（定义方法）上区分。

静态操作符，比如 of，可以认为是这样添加给Observable类的：
```js
Observable.of = functionToImplementOf;
```
实例操作符，⽐如名为map，可以认为是通过下⾯这样添加：
```js
Observable.prototype.map = implementationOfMap;
```

在导入上，静态操作符和示例操作符的路径也不一样
```js
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
```

不同之处在于哪里呢？of 方法我们只能用在 Observable 上，而 map 不仅可以 Observable.map ,也可以用在 `new Observable` 出来的实例对象上。

一个操作符应该是静态的形式还是实例的形式，完全由其功能决定。有意思的是，有些功能既可以作为Observable对象的静态⽅法，也可以作为Observable对象的实例⽅法，⽐如merge这个合并类的操作符：
```js
import 'rxjs/add/observable/merge';
const result$ = Observable.merge(source1$, source2$);
-------------------
import 'rxjs/add/operator/map';
const result$ = Observable.merge(source1$, source2$);
```



