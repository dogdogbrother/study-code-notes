# 值

## 数组
其实只要你意识到数组也是个对象,那么也就没什么可说的了,这里写几个奇怪的代码看看数组的问题(bug).
```js
var a = [ ];
a[0] = 1;
// 此处没有设置a[1]单元
a[2] = [ 3 ];
a[1]; // undefined
a.length; // 3
```
需要注意的是,“稀疏”数组（sparse array，即含有空白或空缺单元的数组）中的“空白单元”（empty slot）,a[1] 的值为 undefined，但这与将其显式赋值为 undefined（a[1] = undefined）还是有所区别的.
***
```js
var a = [ ];
a[0] = 1;
a["foobar"] = 2;
a.length; // 1
a["foobar"]; // 2
a.foobar; // 2
```
数组通过数字进行索引，但有趣的是它们也是对象，所以也可以包含字符串键值和属性
（但这些并不计算在数组长度内）
***
```js
var a = [ ];
a["13"] = 42;
a.length; // 14
```
如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理。

## 数字
JavaScript 只有一种数值类型：number（数字），包括“整数”和带小数的十进制数。

此处“整数”之所以加引号是因为和其他语言不同，JavaScript 没有真正意义上的整数，这也是它一直以来为人诟病的地方。

JavaScript中的“整数”就是没有小数的十进制数。所以 42.0 即等同于“整数”42。

### 数字的语法
特别大和特别小的数字默认用指数格式显示，与 `toExponential()` 函数的输出结果相同。
```js
var a = 5E10;
a; // 50000000000
a.toExponential(); // "5e+10"
var b = a * a;
b; // 2.5e+21
var c = 1 / a;
c; // 2e-11
```
由于数字值可以使用 Number 对象进行封装，因此数字值可以调用 Number.prototype 中的方法。例如，tofixed(..) 方法可指定小数部分的显示位数.

但是有个不常见的现象是,这些方法不仅适用于数字变量，也适用于数字常量。不过对于 `.` 运算符需要给予特别注意，因为它是一个有效的数字字符，会被优先识别为数字常量的一部分，然后才是对象属性访问运算符。
```js
// 无效语法：
42.toFixed( 3 ); // SyntaxError
// 下面的语法都有效：
(42).toFixed( 3 ); // "42.000"
0.42.toFixed( 3 ); // "0.420"
42..toFixed( 3 ); // "42.000"
```
`42..toFixed( 3 )`这个看起来有点奇怪但是没问题,因为42.其实就等于42.0,数字中的第一个.是被当做自身的内容的(小数符合).

下面的语法也是有效的（请注意其中的空格）：
```js
42 .toFixed(3); // "42.000"
```

### 较小的数值
二进制浮点数最大的问题如下
```js
0.1 + 0.2 === 0.3; // false
```
简单来说，二进制浮点数中的 0.1 和 0.2 并不是十分精确，它们相加的结果并非刚好等于0.3，而是一个比较接近的数字 0.30000000000000004，所以条件判断结果为 false。

么应该怎样来判断 0.1 + 0.2 和 0.3 是否相等呢？

最常见的方法是设置一个误差范围值，通常称为“机器精度”（machine epsilon）,从 ES6 开始，该值定义在 `Number.EPSILON` 中，我们可以直接拿来用.
```js
function numbersCloseEnoughToEqual(n1,n2) {
 return Math.abs( n1 - n2 ) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;
numbersCloseEnoughToEqual( a, b ); // true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); // false
```
**代码分析:** `Number.EPSILON`是个极小的常量,实际上是 JavaScript 能够表示的最小精度.误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。如果判断两个数是否相等就让他们俩减一下,如果值小于极小常量就等于他们俩相等了.

## 整数的安全范围
数字的呈现方式决定了“整数”的安全值范围远远小于 Number.MAX_VALUE。

能够被“安全”呈现的最大整数是 2^53 - 1，即 9007199254740991，在 ES6 中被定义为`Number.MAX_SAFE_INTEGER`。最小整数是 -9007199254740991，在 ES6 中被定义为 `Number.MIN_SAFE_INTEGER`。
>**safe**是安全的意思

## 整数检测
要检测一个值是否是整数，可以使用 ES6 中的 `Number.isInteger(..)` 方法：
```js
Number.isInteger( 42 ); // true
Number.isInteger( 42.000 ); // true
Number.isInteger( 42.3 ); // false
```

要检测一个值是否是安全的整数，可以使用 ES6 中的 Number.isSafeInteger(..) 方法：
```js
Number.isSafeInteger( Number.MAX_SAFE_INTEGER ); // true
Number.isSafeInteger( Math.pow( 2, 53 ) ); // false
Number.isSafeInteger( Math.pow( 2, 53 ) - 1 ); // true
```
>`Math.pow( 2, 53 )`是2的53次方,正好等于安全整数,-1了就不是了.

## undefined
在非严格模式下，我们可以为全局标识符 `undefined` 赋值(这样设计是不对的,很糟糕).
```js
function foo() {
 undefined = 2; // 非常糟糕的做法！
}
foo();
```
这样做虽然`undefined`还是`undefined`,并没有变成2,但是这样的赋值竟然没有报错的确不应该.(严格模式下就会报错了).

在非严格和严格两种模式下，我们都可以声明一个名为 `undefined` 的局部变量。
```js
function foo() {
 "use strict";
 var undefined = 2;
 console.log( undefined ); // 2
}
foo();
```

## void 运算符
`undefined` 是一个内置标识符（除非被重新定义，见前面的介绍），它的值为 `undefined`，通过 `void` 运算符即可得到该值。

表达式 `void ___` 没有返回值，因此返回结果是 `undefined`。`void` 并不改变表达式的结果，只是让表达式不返回值：
```js
var a = 42;
console.log( void a, a ); // undefined 42
```
按惯例我们用 `void 0` 来获得 `undefined`（这主要源自 C 语言，当然使用 `void true` 或其他void 表达式也是可以的）。`void 0`、`void 1` 和 `undefined` 之间并没有实质上的区别。