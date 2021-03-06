# 语法

## 语句和表达式
### 语句的结果值
我们在Chrome浏览器的控制台里面输入内容,通常都先有一个`undefined`的输出,这是因为**语句都有一个结果值**.

举例在控制台中输入 `var a = 42` 会得到结果值 `undefined`，而非 42。a的值是42,但规范定义 `var` 的结果值是`undefined`。

怎么才能让他有值呢,代码举例:
```js
var b;
if (true) {
 b = 4 + 38;
}
```
42即最后一个语句 / 表达式 `b = 4 + 38` 的结果值。换句话说，代码块的结果值就如同一个**隐式的返回**，即返回最后一个语句的结果值。

可以使用万恶的 `eval(..)` 来获得结果值:
```js
var a, b;
a = eval( "if (true) { b = 4 + 38; }" );
a; // 42
```

ES7 规范有一项“do 表达式”（do expression）提案，类似下面这样：
```js
var a, b;
a = do {
 if (true) {
 b = 4 + 38; 
 }
};
a; // 42
```
`do { .. }` 表达式执行一个代码块（包含一个或多个语句），并且返回其中最后一个语句的结果值，然后赋值给变量 a。

和`eval`很像是吧,有可能就是为了代替`eval`吧(我猜的).

实际上,其目的是将语句当作表达式来处理（语句中可以包含其他语句），从而不需要将语句封装为函数再调用 `return` 来返回值。

### 表达式的副作用
看一段代码来:
```js
var a = 42;
var b = a++;
a; // 43
b; // 42
```
也许很多开发者会误以为变量 b 和 a 的值都是 43，这是因为没有完全理解 ++ 运算符的副作用何时产生。

++ 在前面时，如 `++a`，它的副作用（将 a 递增）产生在表达式返回结果值之前，而 `a++` 的副作用则产生在之后。所以我们`++a`的话,b就是43了.

如果我们一定要`a++`,可以使用`()`和`,`运算符配合上面说的语句结果值.`var b = (a++, b);`

```js
delete obj.a; // true
```
如果操作成功，`delete` 返回 `true`，否则返回 `false`。其副作用是属性被从对象中删除（或者单元从 array 中删除）。

我们看下利用赋值语句的副作用将两个 `if` 语句合二为一的例子,先看下原代码:
```js
function vowels(str) {
  var matches;
  if (str) {
    // 提取所有元音字母
    matches = str.match( /[aeiou]/g );
    if (matches) {
      return matches;
    } 
  }
}
vowels( "Hello World" ); // ["e","o","o"]
```
新代码:
```js
function vowels(str) {
  var matches;
  // 提取所有元音字母
  if (str && (matches = str.match( /[aeiou]/g ))) {
    return matches;
  }
}
vowels( "Hello World" ); // ["e","o","o"]
```
利用了()和结果值,让代码更简洁了一些.

### 上下文规则

#### 大括号
1. 用大括号定义对象常量
```js
// 假定函数bar()已经定义
var a = {
 foo: bar()
};
```
{ .. } 被赋值给 a，因而它是一个对象常量。

2. 标签
如果将上例中的 var a = 去掉会发生什么情况呢？
```js
{
 foo: bar()
}
```
{ .. } 在这里只是一个普通的代码块。但是这里有个问题,既然不是对象了,为什么 `foo: bar()` 这样奇怪的语法为什么也合法呢？

这里涉及 JavaScript 中一个不太为人知（也不建议使用）的特性，叫作“标签语句”（labeled statement）。

3. JSON
JSON 的确是 JavaScript 语法的一个子集，但是 JSON 本身并不是合法的 JavaScript 语法。

JSON的key值是必须需要用""包起来的,`{"a":42}` 作为 JSON 值没有任何问题，但是在作为代码执行时会产生错误，因为它会被当作一个带有非法标签的语句块来执行。

`{"a":42}` 作为 JSON 值没有任何问题，但是在作为代码执行时会产生错误，因为它会被当作一个带有非法标签的语句块来执行。`foo({"a":42})` 就没有这个问题，因为 `{"a":42}` 在这里是一个传递给 `foo(..)` 的对象常量。

所以准确地说，JSON-P 能将 JSON 转换为合法的JavaScript 语法。

4. 代码块
还有一个坑常被提到,涉及强制类型转换.
```js
[] + {}; // "[object Object]"
{} + []; // 0
```
表面上看 + 运算符根据第一个操作数（[] 或 {}）的不同会产生不同的结果，实则不然。

{} 在后面的时候是被当作一个值（空对象）来处理,[] 会被强制类型转换为 "",所以空对象就是"[object Object]"。

{} 在前面的时候,会被当作一个独立的空代码块,[]会转成0.

5. 对象解构
从 ES6 开始，`{ .. }` 也可用于“解构赋值”,`{ a, b }` 实际上是 `{ a: a, b: b }` 的简化版本，两者均可.

6. else if 和可选代码块
很多人误以为 JavaScript 中有 else if，因为我们可以这样来写代码：
```js
if (a) { 
 // ..
} else if (b) {
 // .. 
} else { 
 // ..
}
```
然而事实上,`JavaScript` 没有 `else if`，但 `if` 和 `else` 只包含单条语句的时候可以省略代码块的`{ }`。

什么意思呢,举个例子,我们简写,在if后面可以不加`{}`.
```js
if (a) { doSomething( a ); }
if (a) doSomething( a ); // 简写
```
自然`else`后面也可以不用加{}.那么其实else if的真实样子是这样的:
```js
if (a) { 
 // ..
} else {
  if (b) { 
  // ..
  } else {
  // .. 
  }
}
```
`else if` 极为常见，能省掉一层代码缩进，所以很受青睐。但这只是我们自己发明的用法，切勿想当然地认为这些都属于 `JavaScript` 语法的范畴。

## 运算符优先级
JavaScript 中的 `&&` 和 `||` 运算符返回它们其中一个操作数的值，而非`true` 或 `false`。
```js
var a = 42;
var b = "foo";
a && b; // "foo"
a || b; // 42
```
但是如果我们有多个运算符呢?
```js
a && b || c; // ???
a || b && c; // ???
```
这就涉及到了运算符的优先级的问题了,我们回顾下前面的例子：
```js
var a = 42, b;
b = ( a++, a );
a; // 43
b; // 43

// 如果没有(),结果就会不一样

b = ( a++, a );
b; // 43
```
这是因为`,`的优先级比`=`低,事实上`,`是所以运算符中最低级的.

再回顾前面的一个例子：
```js
if (str && (matches = str.match( /[aeiou]/g ))) {
 // ..
}
```
这里对赋值语句使用 `( )` 是必要的，因为 `&&` 运算符的优先级高于 `=`，如果没有 `( )` 对其中的表达式进行绑定（bind）的话，就会执行作 `(str && matches) = str.match..`,这样会出错.

`a || b && c; `的结果值是a,因为`&`优先级比`||`高.

如果想看完整的全部的优先级列表,请参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) 的详细说明.

### 短路
对 `&&` 和 `||` 来说，如果从左边的操作数能够得出结果，就可以忽略右边的操作数。我们将这种现象称为“短路”（即执行最短路径）。

这个其实是非常有用而且常用的一个特性,我们可以节省很多if语句,节省代码.举例说明:
```js
if(a){
  console.log('执行A此代码')
} else {
  console.log('执行B此代码')
}
```
优化后的短路代码如下:
```js
a && console.log('执行A此代码')
a || console.log('执行B此代码')
```

## 错误
JavaScript 不仅有各种类型的运行时错误（TypeError、ReferenceError、SyntaxError 等），它的语法中也定义了一些编译时错误。

在编译阶段发现的代码错误叫作“早期错误”,这些错误在代码执行之前是无法用 `try..catch` 来捕获的，相反，它们还会导致解析 / 编译失败。

举几个例子:
```js
var a = /+foo/; // 错误！不合法的的正则表达式
var a;
42 = a; // 错误！语法规定赋值对象必须是一个标识符
```
ES5 规范的严格模式定义了很多早期错误。函数的参数不能重名,对象常量不能包含多个同名属性.

### 提前使用变量
ES6 规范定义了一个新概念，叫作 TDZ（Temporal Dead Zone，暂时性死区）。

TDZ 指的是由于代码中的变量还没有初始化而不能被引用的情况。

对此，最直观的例子是 ES6 规范中的 let 块作用域：
```js
{
 a = 2; // ReferenceError!
 let a; 
}
```
`a = 2` 试图在 `let a` 初始化 `a` 之前使用该变量（其作用域在 { .. } 内），这里就是 `a` 的TDZ，会产生错误。

### 函数参数
另一个 TDZ 违规的例子是 ES6 中的参数默认值.
```js
var b = 3;
function foo( a = 42, b = a + b + 5 ) {
 // ..
}
```
`b = a + b + 5` 在参数 b（= 右边的 b，而不是函数外的那个）的 TDZ 中访问 b，所以会出错。而访问 a 却没有问题，因为此时刚好跨出了参数 a 的 TDZ。

在 ES6 中，如果参数被省略或者值为 undefined，则取该参数的默认值,代码示例如下:
```js
function foo( a = 42, b = a + 1 ) {
 console.log( a, b );
}
foo(); // 42 43
foo( undefined ); // 42 43
foo( 5 ); // 5 6
foo( void 0, 7 ); // 42 7
foo( null ); // null 1
```

## try..finally
`try..catch`是比较常用的,但是其实也可以使用`try..finally`,就是不管结局如何都会执行finally内容.

## switch
现在来简单介绍一下 switch，可以把它看作 if..else if..else.. 的简化版本：
```js
switch (a) {
 case 2:
 // 执行一些代码
 break;
 case 42:
 // 执行另外一些代码
 break;
 default:
 // 执行缺省代码
}
```
这看似并无特别之处，但其中存在一些不太为人所知的陷阱。

a 和 case 表达式的匹配算法与 `===` 相同,如果我们不知道a到底是`'1'`还是`1`的情况下,我们可以如下使用:
```js
var a = "42";
switch (true) {
  case a == 10:
    console.log( "10 or '10'" );
    break;
  case a == 42;
    console.log( "42 or '42'" );
    break;
  default:
 // 永远执行不到这里
}
// 42 or '42'
```
需要注意的是,case后面跟的比较是true或者false,而不能是真值,例如1和0这种的.

default 是可选的，并非必不可少,而且不一定非要在最后面,break 相关规则对 default 仍然适用：
```js
var a = 10;
switch (a) {
  case 1:
  case 2:
  // 永远执行不到这里
  default:
    console.log( "default" );
  case 3:
    console.log( "3" );
    break;
  case 4:
    console.log( "4" );
}
// default
// 3
```
**代码分析:** 首先全部执行了一遍,发现没有合适的,就default,但是没有break,就又走了case 3,然后结束.








