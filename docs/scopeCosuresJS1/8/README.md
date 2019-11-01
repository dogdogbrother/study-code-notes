# 对象
>**前端界有句耳熟能详的话,万物皆对象**  
this章节里面我们介绍了函数调用位置的不同会造成this绑定对象的不同。但是对象到底是什么,为什么我们需要绑定它们呢？

## 语法
对象可以通过两种形式定义：声明（文字）形式和构造形式。

对象的文字语法大概是这样：
```js
var myObj = { 
    key: value // ... 
}; 
```
构造形式大概是这样：
```js
var myObj = new Object(); 
myObj.key = value; 
```
构造形式和文字形式生成的对象是一样的。唯一的区别是，在文字声明中你可以添加多个 键 / 值对，但是在构造形式中你必须逐个添加属性。

**用上面的“构造形式”来创建对象是非常少见的，一般来说你会使用文字语 法，绝大多数内置对象也是这样做的**

## 类型
对象是 JavaScript 的基础。在 JavaScript 中一共有六种主要类型（术语是“语言类型”）：

+ string
+ number
+ boolean
+ null 
+ undefined 
+ object

注意，简单基本类型（string、boolean、number、null 和 undefined）本身并不是对象。 

null 有时会被当作一种对象类型，但是这其实只是语言本身的一个 bug，即对 null 执行 typeof null 时会返回字符串 "object"。实际上，null 本身是基本类型。
> 原理是这样的，不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判 断为 object 类型，null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“object”。

## 内置对象
JavaScript 中还有一些对象子类型，通常被称为内置对象。有些内置对象的名字看起来和 简单基础类型一样，不过实际上它们的关系更复杂，我们稍后会详细介绍。

+ string
+ number
+ boolean
+ object 
+ Function 
+ Array
+ Date
+ RegExp
+ Error

这些内置对象从表现形式来说很像其他语言中的类型（type）或者类（class），比如 Java 中的 String 类。

但是在 JavaScript 中，它们实际上只是一些内置函数。这些内置函数可以当作构造函数来使用，从而可以构造一个对应子类型的新对象。

代码举例说明一下:
```js
var strPrimitive = "I am a string";
typeof strPrimitive; // "string" 
strPrimitive instanceof String; // false

var strObject = new String( "I am a string" );
typeof strObject; // "object" 
strObject instanceof String; // true

// 检查 sub-type 对象 
Object.prototype.toString.call( strObject ); // [object String]
```
**代码分析:** 这代码什么意思呢,上面的例子是单纯的字面量,它只是个基础类型,而中间用`new String`构造出来的虽然也是`string`,但同时也是对象.  
问题来了,既然上面的不是`object`.那么就不应该会有`.length`等方法.事实上,在必要时语言会自动把字符串字面量转换成一个 String 对象，也就是说你并不需要 显式创建一个对象(也就是说,其实你在创建字符串的时候应该用new形式)。

>前同样的事情发生在数字和布尔值上,`null`和`undefined`没有对应的构造形式，它们只有文字形式。相反,`Date`只有构造，没有文字形式。

## 内容

对象的内容是由一些存储在特定命名位置的（任意类型的）值组成的， 我们称之为属性。

需要强调的一点是，当我们说“内容”时，似乎在暗示这些值实际上被存储在对象内部， 但是这只是它的表现形式。在引擎内部，这些值的存储方式是多种多样的，一般并不会存在对象容器内部。存储在对象容器内部的是这些属性的名称，它们就像指针（从技术角度来说就是引用）一样，指向这些值真正的存储位置。

思考下面的代码：
```js
var myObject = { a: 2 };
myObject.a; // 2 
myObject["a"]; // 2
```
`.a`语法通常被称为“属性访问”，`["a"]`语法通常被称为“键访问”。

在对象中，属性名永远都是字符串。如果你使用 string（字面量）以外的其他值作为属性 名，那它首先会被转换为一个字符串。即使是数字或是对象也不例外.举个代码例子:

```js
var myObject = { };
myObject[true] = "foo";
myObject[3] = "bar"; 
myObject[myObject] = "baz"; 

myObject["true"]; // "foo" 
myObject["3"]; // "bar" 
myObject["[object Object]"]; // "baz"
```

### 1. 可计算属性名

ES6 增加了可计算属性名（与Symbol相关），可以在文字形式中使用 [] 包裹一个表达式来当作属性名：
```js
var prefix = "foo";

var myObject = { 
    [prefix + "bar"]: "hello", 
    [prefix + "baz"]: "world" 
};

myObject["foobar"]; // hello 
myObject["foobaz"]; // world
```

### 2. 数组

数组也支持 [] 访问形式，不过就像我们之前提到过的，数组有一套更加结构化的值存储机制.

数组也是对象，所以虽然每个下标都是整数，你仍然可以给数组添加属性：
```js
var myArray = [ "foo", 42, "bar" ];
myArray.baz = "baz";
myArray.length; // 3
myArray.baz; // "baz"
```
可以看到虽然添加了命名属性（无论是通过 . 语法还是 [] 语法），数组的 length 值并未发 生变化。
> 注意：如果你试图向数组添加一个属性，但是属性名“看起来”像一个数字，那它会变成 一个数值下标,并且数组的长度也会改变.

### 3. 复制对象
> **如何复制一个对象?**  
看起来应该有一个内置的`copy()`方法,实际上事情比你想象的更复杂，因为我们无法选择一个默认的复制算法。

举例说明,我们思考一下这个对象:
```js
function anotherFunction() { /*..*/ }
var anotherObject = { 
    c: true
};
var anotherArray = [];
var myObject = { 
    a: 2,
    b: anotherObject, // 引用一个对象，不是复本！ 
    c: anotherArray, // 另一个引用,是数组！ 
    d: anotherFunction 
};

anotherArray.push( anotherObject, myObject );
```
如何准确地表示 myObject 的复制呢？
> **忍不住要吐槽一句**  
深拷贝是啥浅拷贝又是啥,面试的时候经常问,但是我个人真的很难理解

对于浅拷贝来说，复制出的新对象中 a 的值会复制旧对象中 a 的值，也就是 2，但是新对象中 b、c、d 三个属性其实只是三个引用，它们和旧对象中 b、c、d 引用的对象是一样的。

对于深复制来说，除了复制 myObject 以外还会复 制 anotherObject 和 anotherArray。这时问题就来了，anotherArray 引用了 anotherObject 和 myObject，所以又需要复制 myObject，这样就会由于循环引用导致死循环。(应该怎么办呢,手写递归?JSON序列化?)

浅复制非常易懂并且问题要少得多，所以 ES6 定义了`Object.assign(..)`方法来实现浅复制。

### 4. 属性描述符
在**ES5**之前，JavaScript 语言本身并没有提供可以直接检测属性特性的方法，比如判断属性是否是只读。 

但是从**ES5**开始，所有的属性都具备了属性描述符。
```js
var myObject = { 
    a:2 
};
Object.getOwnPropertyDescriptor( myObject, "a" );

// { 
// value: 2,
// writable: true,
// enumerable: true,
// configurable: true
// }
```
这个对象的值不仅仅只是一个2,它还包含另外三个特性：writable（可写）、 enumerable（可枚举）和 configurable（可配置）。

### 5. [[Get]]
我们先看一个非常普通的代码:
```js
var myObject = { 
    a: 2 
};
myObject.a; // 2
```
> `myObject.a`是一次属性访问，但是这条语句并不仅仅是在`myObjet`中查找名字为`a`的属性，虽然看起来好像是这样。

事实上却不是这样的,在语言规范中，`myObject.a`在`myObject`上实际上是实现了 [[Get]] 操作（有点像函数调 用：[[Get]]()）。对象默认的内置 [[Get]] 操作首先在对象中查找是否有名称相同的属性，如果找到就会返回这个属性的值。然而，如果没有找到名称相同的属性，按照 [[Get]] 算法的定义会执行另外一种非常重要的行为。我们会在后面的章节里介绍这个行为（其实就是遍历可能存在的 [[Prototype]] 链，也就是原型链）。

如果无论如何都没有找到名称相同的属性，那 [[Get]] 操作会返回值 undefined.

### 6. [[Put]]
>**既然有可以获取属性值的 [[Get]] 操作，就一定有对应的 [[Put]] 操作。**  
常规来讲,我们会认为给对象的属性赋值会触发 [[Put]] 来设置或者创建这个属性。但是实际情况并不全是这样.

[[Put]] 被触发时，实际的行为取决于许多因素，包括对象中是否已经存在这个属性（这是最重要的因素）。

如果已经存在这个属性，[[Put]] 算法大致会检查下面这些内容。

1. 属性是否是访问描述符,如果是并且存在 `setter` 就调用 `setter`。 
2. 属性的数据描述符中 `writable` 是否是 `false` ？如果是，在非严格模式下静默失败，在 严格模式下抛出 `TypeError` 异常。 
3. 如果都不是，将该值设置为属性的值。

如果对象中不存在这个属性，[[Put]] 操作会更加复杂,后面原型链那里会讲到.

### 7. Getter和Setter

```js
var myObject = { 
    // 给 a 定义一个 getter 
    get a() { 
        return 2; 
    } 
};
Object.defineProperty(
    myObject, // 目标对象 
    "b", // 属性名
    { // 描述符
        get: function(){ return this.a * 2 }, // 给 b 设置一个 getter
        enumerable: true // 确保 b 会出现在对象的属性列表中,可枚举
    }
)
myObject.a; // 2 
myObject.b; // 4
```
>用过 **VUE** 的人对`defineProperty`这个词很熟悉,这就是 **VUE** 双向绑定的实现原理.

**代码分析:** 不管是`a`属性还是`b`属性,都是隐性创建的.`get`方法覆盖了对象自身的[[Get]]操作.

再看一段代码:
```js
var myObject = { 
    // 给 a 定义一个 getter
    get a() {
        return 2; 
    } 
};

myObject.a = 3; 
myObject.a; // 2
```
**代码分析:** 通常来说 `getter` 和 `setter` 是成对出现的,现在没有设置`set`导致我们给`a`赋值的时候`set`操作会忽略赋值操作(所以不会报错).不过即使有合法的`setter`,由于我们自定义的`getter`只会返回2,所以也只会拿到2.

```js
var myObject = { // 给 a 定义一个 getter 
    get a() {
        return this._a_; 
    },
    // 给 a 定义一个 setter 
    set a(val) {
        this._a_ = val * 2; 
    } 
};

myObject.a = 2;
myObject.a; // 4
```
> 属性名 `_a_` 只是一种惯例，没有任何特殊的行为.

### 8. 存在性

`myObject.a`的属性访问返回值可能是`undefined`，但是这个值有可能是属性中存储的`undefined`，也可能是因为属性不存在所以返回`undefined`。那么如何区分 这两种情况呢？

用两种方法的代码举例:
```js
var myObject = { 
    a:2 
};

("a" in myObject); // true 
("b" in myObject); // false

myObject.hasOwnProperty( "a" ); // true 
myObject.hasOwnProperty( "b" ); // false
```
`in`操作符会检查属性是否在对象及其 [[Prototype]] 原型链中。相比之下，`hasOwnProperty(..)`只会检查属性是否在`myObject`对象中，不会检查 [[Prototype]] 链。

> 也有例外,通过`Object.create(null)`来创建的对象没有`Object.prototype`,所以会找不到`hasOwnProperty(..)`方法,我们可以使用`Object.prototype.hasOwnProperty.call(myObject,"a")`强行判断.

#### 1. 枚举

`for..in`循环其实就是枚举,但是需要注意的是,不应该在数组中使用`for..in`,因为这种枚举不仅会包含所有数值索引，还会包含所有可枚举属性。

如何区分属性是否可枚举：
```js
myObject.propertyIsEnumerable( "b" ); // false
```
`propertyIsEnumerable(..)`会检查给定的属性名是否直接存在于对象中（而不是在原型链 上）并且满足`enumerable:true`。

`Object.keys(..)`会返回一个数组，包含所有可枚举属性.

`Object.getOwnPropertyNames(..)`会返回一个数组，包含所有属性，无论它们是否可枚举。

#### 2. 遍历

遍历的方法有很多,上面说了`for in`,还有我们平时常用的`for`循环,`forEach`辅助迭代器等等.

但是这些遍历的方法这实际上并不是在遍历值，而是遍历下标来指向值.

> **如何直接遍历值而不是数组下标（或者对象属性）呢？**  
`ES6`增加了一种用来遍历数组的`for..of`循环语法（如果对象本身定义了迭代器的话也可以遍历对象）

```js
var myArray = [ 1, 2, 3 ];
for (var v of myArray) { 
    console.log( v ); 
}
// 1 
// 2 
// 3
```
`for..of`循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的`next()`方法来遍历所有返回值。

数组有内置的 @@iterator，因此 `for..of` 可以直接应用在数组上。我们使用内置的 @@ iterator 来手动遍历数组，看看它是怎么工作的：
```js
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();
it.next(); // { value:1, done:false } 
it.next(); // { value:2, done:false } 
it.next(); // { value:3, done:false } 
it.next(); // { done:true }
```
> **Symbol**  
我们使用 ES6 中的符号`Symbol.iterator`来获取对象的 @@iterator 内部属性

调用迭代器的 `next()` 方法会返回形式为 `{ value: .. , done: .. }` 的值， `value` 是当前的遍历值，`done` 是一个布尔值，表示是否还有可以遍历的值。

和数组不同，普通的对象没有内置的 @@iterator，所以无法自动完成`for..of`遍历。之所以要这样做，有许多非常复杂的原因(简单来说就是js中对象以后可能变得不同,为了避免冲突).

当然，你可以给任何想遍历的对象定义 @@iterator，代码举例：
```js
//本来我是想写代码的,但是感觉又有点复杂,虽然for..of配合自定义迭代器很灵活很强大,但是真的需要的时候我再翻书看这里把.
```
## 小结
1. JavaScript 中的对象有字面形式（比如 `var a = { .. }`）和构造形式（比如 `var a = new Array(..)`）。字面形式更常用，不过有时候构造形式可以提供更多选项。

2. 许多人都以为“JavaScript 中万物都是对象”，这是错误的。对象是 6 个（或者是 7 个，取决于你的观点）基础类型之一。对象有包括`function`在内的子类型，不同子类型具有不同的行为，比如内部标签 [object Array] 表示这是对象的子类型数组。

3. 对象就是键 / 值对的集合。可以通过`.propName`或者 ["propName"] 语法来获取属性值。访问属性时，引擎实际上会调用内部的默认 [[Get]] 操作（在设置属性值时是 [[Put]]）， [[Get]] 操作会检查对象本身是否包含这个属性，如果没找到的话还会查找 [[Prototype]] 链

4. 属性的特性可以通过属性描述符来控制，比如`writable`和`configurable`。此外，可以使用 `Object.preventExtensions(..)`、`Object.seal(..)` 和 `Object.freeze(..)` 来设置对象（及其 属性）的不可变性级别。(不变性的内容我没有写,被我忽略了,我感觉没啥大用)

5. 属性不一定包含值——它们可能是具备 getter/setter 的“访问描述符”。此外，属性可以是可枚举或者不可枚举的，这决定了它们是否会出现在`for..in`循环中。

6. 你可以使用 ES6 的 `for..of` 语法来遍历数据结构（数组、对象，等等）中的值，`for..of` 会寻找内置或者自定义的 @@iterator 对象并调用它的 `next()` 方法来遍历数据值。









