# 类型

## 内置类型

JavaScript 有七种内置类型：

* 空值（null）
* 未定义（undefined）
* 布尔值（ boolean）
* 数字（number）
* 字符串（string）
* 对象（object）
* 符号（symbol，ES6 中新增）

我们可以用 typeof 运算符来查看值的类型.

* typeof undefined === "undefined"; // true
* typeof true === "boolean"; // true
* typeof 42 === "number"; // true
* typeof "42" === "string"; // true
* typeof { life: 42 } === "object"; // true
* typeof Symbol() === "symbol"; // true ES6中新加入的类型

需要注意有2点:

1. `typeof null === "object"; // true`,理论上null的类型就是null,但是返回的是object,这个是因为js在判断类型的时候是根据类型的最底层的二进制值的前三位进行判断的,如果前三位是000,那么这就是个对象.而null的值全部都是0,自然也就被误判成了object,这是js的一个20年的bug,未来应该也不会修复了.

如果要判断null的话,我们需要用复合条件来检测.
```js
var a = null;
(!a && typeof a === "object"); // true
```
2. 我们检测下function,`typeof function a(){ /* .. */ } === "function"; // true`.

这样看来似乎function也是js的一个内置类型,然而查阅规范就会知道，它实际上是 object 的一个“子类型”。具体来说，函数是“可调用对象”，它有一个内部属
性 [[Call]]，该属性使其可以被调用。

不过这个对象的属性看起来不太一样,b和c两个属性其实是作为参数传递的
```js
function a(b,c) {
 /* .. */
}
```
函数对象的 length 属性是其声明的参数的个数
```js
a.length; // 2,也就是b和c
```

3. 这里面没有我们常用的数组,是因为数组也是对象。确切地说，它也是 object 的一个“子类型”.
```js
typeof [1,2,3] === "object"; // true
```
数组的元素按数字顺序来进行索引（而非普通像对象那样通过字符串键值），其 length 属性是元
素的个数。

## 值和类型
JavaScript 中的变量是没有类型的，**只有值才有**。变量可以随时持有任何类型的值。

## undefined 和 undeclared
undefined(未定义) 和 undeclared(未声明) 看着差不多,但其实完全是两回事。
```js
var a;
a; // undefined
b; // ReferenceError: b is not defined
```
浏览器对这类情况的处理其实是不好的,“b is not defined”容易让人误以为是“b is undefined”,但其实b是undeclared,所以准确的报错应该是“b is not declared”.
```js
typeof b; // "undefined"
```
请注意虽然 b 是一个 `undeclared` 变量，但 `typeof b` 并没有报错。这是因为 `typeof` 有一个特殊的安全防范机制。

## 小结
JavaScript 有 七 种 内 置 类 型：null、undefined、boolean、number、string、object 和symbol，可以使用 typeof 运算符来查看。

变量没有类型，但它们持有的值有类型。类型定义了值的行为特征。

很多开发人员将 undefined 和 undeclared 混为一谈，但在 JavaScript 中它们是两码事。

undefined 是值的一种。undeclared 则表示变量还没有被声明过。

遗憾的是，JavaScript 却将它们混为一谈，在我们试图访问 "undeclared" 变量时这样报错：ReferenceError: a is not defined，并且 typeof 对 undefined 和 undeclared 变量都返回"undefined"。

然而，通过 typeof 的安全防范机制（阻止报错）来检查 undeclared 变量，有时是个不错的办法。



