# 原生函数
`JavaScript` 有内建函数，也叫原生函数，如 `String` 和 `Number`。

常用的原生函数有：
* String()
* Number()
* Boolean()
* Array()
* Object()
* Function()
* RegExp()
* Date()
* Error()
* Symbol()——ES6 中新加入的！
原生函数可以被当作构造函数来使用，但其构造出来的对象可能会和我们设想的有所出入：
```js
var a = new String( "abc" );
typeof a; // 是"object"，不是"String"
a instanceof String; // true
Object.prototype.toString.call( a ); // "[object String]"
```
通过构造函数（如 `new String("abc")`）创建出来的是封装了基本类型值（如 "abc"）的封装对象。

请注意：typeof 在这里返回的是对象类型的子类型。

## 内部属性 [[Class]]
所有 `typeof` 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]（我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类）。这个属性无法直接访问，
一般通过 O`bject.prototype.toString(..)` 来查看。例如：
```js
Object.prototype.toString.call( [1,2,3] );
// "[object Array]"
Object.prototype.toString.call( /regex-literal/i );
// "[object RegExp]"
```
数组的内部 [[Class]] 属性值是 "Array"，正则表达式的值是 "RegExp"。

## 封装对象包装
封装对象（object wrapper）扮演着十分重要的角色。由于基本类型值没有`.length`和 `.toString()` 这样的属性和方法，需要通过封装对象才能访问，此时`JavaScript` 会自动为基本类型值包装（box 或者 wrap）一个封装对象：
```js
var a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
```
如果需要经常用到这些字符串属性和方法，比如在 for 循环中使用 `i < a.length`，那么从一开始就创建一个封装对象也许更为方便，这样 JavaScript 引擎就不用每次都自动创建了。

但实际证明这并不是一个好办法，因为浏览器已经为 `.length` 这样的常见情况做了性能优化，直接使用封装对象来“提前优化”代码反而会降低执行效率。

一般情况下，我们不需要直接使用封装对象。最好的办法是让 JavaScript 引擎自己决定什么时候应该使用封装对象。换句话说，**就是应该优先考虑使用 "abc" 和 42 这样的基本类型值，而非 new String("abc") 和 new Number(42)。**


## 总结 
这张的内容其实不少的,但是我只写了一部分,是因为其实都没啥用.  

例如用原生函数作为构造函数来创建基本类型就会有一些奇奇怪怪的特性,在不同的浏览器还有不同的反馈.

着实有点蠢.