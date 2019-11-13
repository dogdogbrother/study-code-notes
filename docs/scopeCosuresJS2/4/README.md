# 强制类型转换

## 值类型转换
转换也有两种,“隐式强制类型转换”和“显式强制类型转换”.代码举例:
```js
var a = 42;
var b = a + ""; // 隐式强制类型转换
var c = String( a ); // 显式强制类型转换
```
>**这两种形式并不是官方定义的,而是大家约定俗成的说法**  
这里的“显式”和“隐式”以及“明显的副作用”和“隐藏的副作用”，都是相对而言的。  
要是你明白 `a + ""` 是怎么回事，它对你来说就是“显式”的。相反，如果你不知道`String(..)`可以用来做字符串强制类型转换，它对你来说可能就是“隐式”的。

## 抽象值操作

### ToString 和 stringify

#### toString
基本类型值的字符串化规则为：`null` 转换为 "null"，`undefined` 转换为 "undefined"，`true`转换为 "true"。数字的字符串化则遵循通用规则，不过在前面的章节中讲过的那些极小和极大的数字使用指数形式：
```js
// 1.07 连续乘以七个 1000
var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
// 七个1000一共21位数字
a.toString(); // "1.07e21"
```
对普通对象来说，除非自行定义，否则 toString()（Object.prototype.toString()）返回内部属性 [[Class]] 的值（参见第 3 章），如 "[object Object]"。

如果对象有自己的 `toString()` 方法，字符串化时就会调用该方法并使用其返回值。

例如数组的默认 `toString()` 方法经过了重新定义，将所有单元字符串化以后再用 "," 连接起来：
```js
var a = [1,2,3];
a.toString(); // "1,2,3"
```

#### JSON 字符串化
对大多数简单值来说，JSON 字符串化和 toString() 的效果基本相同.

所有安全的 `JSON` 值（JSON-safe）都可以使用 `JSON.stringify(..)` 字符串化。安全的 `JSON` 值是指能够呈现为有效 `JSON` 格式的值。

那么问题来了,什么是不安全的 `JSON` 值呢? 

`undefined`、`function`、`symbol` 和包含循环引用（对象之间相互引用，形成一个无限循环）的对象都不符合 JSON 结构标准，支持 JSON 的语言无法处理它们。

`JSON.stringify(..)` 在对象中遇到 undefined、function 和 symbol 时会自动将其忽略，在数组中则会返回 `null`. 例如:
```js
JSON.stringify( undefined ); // undefined
JSON.stringify( function(){} ); // undefined
JSON.stringify(
 [1,undefined,function(){},4]
); // "[1,null,null,4]"
JSON.stringify(
 { a:2, b:function(){} }
); // "{"a":2}"
```
>这里介绍一个不错的小技巧

我们可以向 `JSON.stringify(..)` 传递一个可选参数 `replacer`，它可以是数组或者函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除，和 `toJSON()` 很像。

如果 `replacer` 是一个数组，那么它必须是一个字符串数组，其中包含序列化要处理的对象的属性名称，除此之外其他的属性则被忽略。

如果 `replacer` 是一个函数，它会对对象本身调用一次，然后对对象中的每个属性各调用一次，每次传递两个参数，键和值。如果要忽略某个键就返回 `undefined`，否则返回指定的值。
```js
var a = { 
 b: 42,
 c: "42",
 d: [1,2,3] 
};

JSON.stringify( a, ["b","c"] ); // "{"b":42,"c":"42"}"

JSON.stringify( a, function(k,v){
 if (k !== "c") return v;
} );
// "{"b":42,"d":[1,2,3]}"
```

### ToNumber
有时我们需要将非数字值当作数字来使用,这个需求太常见了!!

ES5中定义了抽象操作`ToNumber`。

其中 `true` 转换为 `1，false` 转换为 `0。undefined` 转换为 `NaN`，`null` 转换为 0。





