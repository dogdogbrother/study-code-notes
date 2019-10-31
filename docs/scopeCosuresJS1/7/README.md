# this全面解析

>**本书的精髓之一,这章节有点长,包含了调用位置/绑定规则/优先级/绑定例外/this词法**  
上一章我们说到,this是在调用时绑定的,完全取决于函数的调用位置(也就是函数的调用方法).

## 调用位置

**在理解`this`的绑定过程之前,首先要理解调用位置:只有仔细分析调用位置才能回答这个问题：这个`this`到底引用的是什么?**

通常来说，寻找调用位置就是寻找“函数被调用的位置”，但是做起来并没有这么简单， 因为某些编程模式可能会隐藏真正的调用位置。

所以重要的是要**分析调用栈**.

下面用代码来看看到底什么是调用栈和调用位置.

```js
function baz() { 
    // 当前调用栈是：baz 
    // 因此，当前调用位置是全局作用域 
    console.log( "baz" ); 
    bar(); // <-- bar 的调用位置 
}

function bar() {
    // 当前调用栈是 baz -> bar 
    // 因此，当前调用位置在 baz 中 
    console.log( "bar" ); 
    foo(); // <-- foo 的调用位置 
}

function foo() { 
    // 当前调用栈是 baz -> bar -> foo 
    // 因此，当前调用位置在 bar 中 
    console.log( "foo" ); 
}

baz(); // <-- baz 的调用位置
```
**我们可以把调用栈想象成一个函数调用链**



## 绑定规则

>**我们来看看在函数的执行过程中调用位置如何决定 this 的绑定对象。**  
你必须找到调用位置，然后判断需要应用下面四条规则中的哪一条。我们首先会分别解释 这四条规则，然后解释多条规则都可用时它们的优先级如何排列。

### 1. 默认绑定  

首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用 其他规则时的默认规则。

思考一下下面的代码：

```js
function foo() { 
    console.log( this.a ); 
}

var a = 2; 

foo(); // 2
```

首先,我们知道的是`a`是全局变量,但是为什么`this.a`被解析成了全局变量中的a呢?

是因为在本例中,函数调用时应用了`this`的默认绑定,因此`this`指向全局变量.

那么我们怎么知道这里应用了**默认绑定**呢?

可以通过分析调用位置来看看`foo()`是如何调用的,在代码中,`foo()`是直接使用不带任何修饰的函数引用进行调用的，因此只能使用**默认绑定**,无法应用其他规则。

如果使用严格模式（strict mode）,那么全局对象将无法使用默认绑定，因此`this`会绑定到`undefined`.

### 2. 隐式绑定

这条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包 含，不过这种说法可能会造成一些误导。

思考下面的代码：
```js
function foo() { 
    console.log( this.a ); 
}

var obj = { 
    a: 2, 
    foo: foo 
};

obj.foo(); // 2
```
`foo()`函数是何被当作引用属性添加到`obj`中的,无论是直接在`obj`中定义还是先定义再添加为引用属性，这个函数严格来说都不属于`obj`对象。

然而，调用位置会使用`obj`上下文来引用函数，因此你可以说函数被调用时`obj`对象 **"拥有"** 或者 **"包含"**它。

无论你如何称呼这个模式，当`foo()`被调用时，它的落脚点确实指向`obj`对象。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的`this`绑定到这个上下文对象。因为调用`foo()`时`this`被绑定到`obj`，因此`this.a`和`obj.a`是一样的。

#### 隐式丢失
一个最常见的`this`绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把`this`绑定到全局对象或者`undefined`上，取决于是否是严格模式。

例子代码如下:
```js
function foo() {
    console.log( this.a );
}

var obj = { 
    a: 2, 
    foo: foo 
};

var bar = obj.foo; // 函数别名！

var a = "oops, global"; // a 是全局对象的属性

bar(); // "oops, global"
```
虽然`bar`是`obj.foo`的一个引用，但是实际上，它引用的是`foo`函数本身，因此此时的`bar()`其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：
```js
function foo() { 
    console.log( this.a ); 
}

function doFoo(fn) {
    function doFoo(fn) {
    fn(); // <-- 调用位置！
}

var obj = { 
    a: 2, 
    foo: foo 
};

var a = "oops, global"; // a 是全局对象的属性

doFoo( obj.foo ); // "oops, global"
```
作为参数的`obj.foo`作为一个单独的变量,其实等同于上个例子中的`bar()`.

### 3. 显式绑定

显式绑定其实就是运用`call(..)`和`apply(..)`方法.代码如下:
```js
function foo() { 
    console.log( this.a ); 
}

var obj = { 
    a:2 
};

foo.call( obj ); // 2
```
通过`foo.call(..)`,我们可以在调用`foo`时强制把它的`this`绑定到`obj`上。

如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对 象，这个原始值会被转换成它的对象形式（也就是 new String(..)、new Boolean(..) 或者 new Number(..)）。这通常被称为“装箱”。

可惜，显式绑定仍然无法解决我们之前提出的丢失绑定问题。

#### 1. 硬绑定
```js
function foo() { 
    console.log( this.a ); 
}
var obj = { 
    a:2 
};
var bar = function() { 
    foo.call( obj ); 
};
bar(); // 2 
setTimeout( bar, 100 ); // 2 
// 硬绑定的 bar 不可能再修改它的this 
bar.call( window ); // 2
```
我们分析下这段代码后我们发现,其实我们把 **用call改变this** 的动作单独放到一个动作函数里面,这样我们虽然想调用的是`foo`函数,但是要调用`bar`才行.

硬绑定的典型应用场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值：

```js
function foo(something) { 
    console.log( this.a, something );
    return this.a + something; 
}
var obj = { 
    a:2 
};
var bar = function() {
    return foo.apply( obj, arguments ); 
};
var b = bar( 3 ); // 2 3 
console.log( b ); // 5
```
**代码分析:** 和上个例子是一样的,只是多了一个`return`步骤,精致了一些.

另一种使用方法是创建一个 i 可以重复使用的辅助函数：
```js
function foo(something) { 
    console.log( this.a, something );
    return this.a + something; 
}// 简单的辅助绑定函数
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments ); 
    }; 
}
var obj = { 
    a: 2 
};
var bar = bind( foo, obj );
var b = bar( 3 ); // 2 3 console.log( b ); // 5
```
**代码分析:** 其实和上面2个本质上是一样的,只是多了一层`bind`函数的操作,让`this`和函数变得更好控制,更可读.

由于 **硬绑定** 是一种非常常用的模式，所以在 **ES5** 中提供了内置的方法`Function.prototype.bind`,它的用法如下：
```js
function foo(something) { 
    console.log( this.a, something ); 
    return this.a + something; 
}
var obj = { 
    a: 2 
};
var bar = foo.bind( obj );
var b = bar( 3 ); // 2 3 
console.log( b ); // 5
```
**代码分析:** 我们发现,和上面的代码基本一样,`bind`函数的实现原理也能猜的七七八八了.

#### 2. API调用"上下文"
第三方库的许多函数,以及`JavaScript`语言和宿主环境中许多新的内置函数,都提供了一个可选的参数,通常被称为“上下文”（context）,其作用和`bind(..)`一样,确保你的回调函数使用指定的`this`。

举例来说：

```js
function foo(el) { 
    console.log( el, this.id ); 
}
var obj = { 
    id: "awesome" 
};
// 调用 foo(..) 时把 this 绑定到 obj 
[1, 2, 3].forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```
**代码分析:** 其实我们日常开发中,forEach都不是这么用的,也很少用到第二个参数.[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)上说的很清楚. **第二个参数为可选参数,当执行回调函数时用作this的值**.

其实`forEach`就是通过`call(..)`或者`apply(..)`实现了显式绑定.

### 4. new绑定
在讲解最后一条`this`的绑定规则之前,在讲解它之前我们首先要要澄清一个非常常见的关于`JavaScript`中函数和对象的误解。

在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 new 初始化类时会 调用类中的构造函数。通常的形式是这样的：
```js
something = new MyClass(..);
```
JavaScript也有一个`new`操作符,在使用上和上面的代码是一样的,但是实际上却是完全不同的.

JS中的构造函数只是一些使用`new`操作符时被调用的函数,它们不会属于某个类,也不会实例化一个类,甚至都不能说是一种特殊的函数类型,它们只是被`new`操作符调用的普通函数而已。

**实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。**

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

   1. 创建（或者说构造）一个全新的对象。 
   2. 这个新对象会被执行 [[ 原型 ]] 连接。 
   3. 这个新对象会绑定到函数调用的 this。 
   4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

思考下面的代码：
```js
function foo(a) {
    this.a = a; 
}
var bar = new foo(2); 
console.log( bar.a ); // 2
```
**代码分析:** 使用`new`来调用`foo(..)`时，我们会构造一个新对象并把它绑定到`foo(..)`调用中的`this`上。`new`是最后一种可以影响函数调用时`this`绑定行为的方法，我们称之为`new`绑定。

## 优先级

如果我们想判断`this`的指向的时候,需要做的就是找到函数的调用位置并判断应当应用哪条规则.

但是，如果某个调用位置可以应用多条规则该怎么办？为了解决这个问题就必须给这些规则设定优先级.

毫无疑问，默认绑定的优先级是四条规则中最低的,这个就先不管它.

**隐式绑定和显式绑定哪个优先级更高？** 我们用代码来测试一下：
```js
function foo() { 
    console.log( this.a ); 
}
var obj1 = { 
    a: 2, 
    foo: foo 
};
var obj2 = { 
    a: 3, 
    foo: foo 
};
obj1.foo(); // 2 
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3 
obj2.foo.call( obj1 ); // 2
```
**代码分析:** `obj1.foo()`是隐式绑定,在隐式绑定的基础上使用`call()`显式绑定后,结果是 **显式绑定** 优先级更高.

**再比较下new 绑定和显式绑定的优先级.** 

我们发现一个问题,`new` 和 `call/apply` 无法一起使用，因此无法通过 `new foo.call(obj1)` 来直接进行测试。但是我们可以使用硬绑定来测试它俩的优先级。

在写代码之前我们要思考一下前面硬绑定的内容,`Function.prototype.bind(..)`会包装一个新的函数,不管当前的`this`是啥都在新函数里面给强制绑定到提供的对象上.

这样看起来似乎硬绑定乎比`new`绑定的优先级更高,我们代码测试下:
```js
function foo(something) {
    this.a = something; 
}
var obj1 = {};
var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2
var baz = new bar(3);
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```
**代码分析:**  
我们`new`了一个`bar`的函数,参数传入3,这个函数已经被用`bind`把`this`指向了`obj1`对象并生成了一个`a`属性.如果我们输出`obj1.a`得到2,这个是没问题的,因为在new之前我们已经更改了`obj1`对象.
我们输出`baz.a`的时候,得到的却不是2,而是`new`时传入的3.`new bar(3)`并没有像我们预计的那样把`obj1.a`修改为3。原因是我们使用的是`new`构造方法,得到的是一个新的对象`baz`,3被赋值到了新的对象上面了.

这里有一个非常大的疑惑,因为如果我们仔细观察上面我们模拟的bind函数,就会发现我们一定是会修改`obj1.a`为3的.如下
```js
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments ); 
    }; 
}
```
答案是什么呢,实际上,ES5中内置的`Function.prototype.bind(..)`是比较复杂的,代码有点多也比较难我看不懂就不贴了.

总体而言就是,`bind`函数会和new构造函数配个,会判断硬绑定函数是否是被 new 调用，如果是的话就会使用新创建 的`this`替换硬绑定的`this`。

**看到这里发现,似乎new中就不应该使用硬绑定,直接使用普通函数不是更简单吗?**

之所以要在 new 中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用 new 进行初始化时就可以只传入其余的参数。bind(..) 的功能之一就是可以把除了第一个 参数（第一个参数用于绑定 this）之外的其他参数都传给下层的函数（这种技术称为“部 分应用”，是“柯里化”的一种）。举例来说：
```js
function foo(p1,p2) {
    this.val = p1 + p2; 
}
// 之所以使用 null 是因为在本例中我们并不关心硬绑定的 this 是什么 
// 反正使用 new 时 this 会被修改
var bar = foo.bind( null, "p1" );
var baz = new bar( "p2" );
baz.val; // p1p2
```
**代码分析:** 如果不了解`bind`方法这函数看的有点懵,`bind`方法中除了第一个参数是当`this`外,其余的参数都会push进新函数的参数列表中.  
从结果上看 *参数（第一个参数用于绑定 this）之外的其他参数都传给下层的函数* 也做到了.  
总结下就是说我们虽然在`new`构造方法中使用`bind`,但并不是为了改变this指向,而是为了对参数的管理.

### 判断this
根据我们上面的一顿铺垫,我们终于可以根据优先级来判断函数在某个调用位置应用的是哪条规则。

1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
```js
var bar = new foo()
```

2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是 指定的对象。
```js
ar bar = foo.call(obj2) // this是obj2
```

3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。
```js
var bar = obj1.foo()  // this是obj1
```

4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到 全局对象。 
```js
var bar = foo()  // this是window,如果是严格模式的话,是undefined
```

## 绑定例外

在某些场景下 this 的绑定行为会出乎意料，你认为应当应用其他绑定规则时，实际上应用 的可能是默认绑定规则。

### 被忽略的this

如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值 在调用时会被忽略，实际应用的是默认绑定规则：
```js
function foo() { 
    console.log( this.a ); 
}
var a = 2;
foo.call( null ); // 2
```
**代码分析:** 因为传入的是null,所以`this.a`找的是全局的`a`变量.

哪里会用到传入`null`这种操作呢?前面讲到`new`和`bind`优先级的例子中已经有所体现了,为的是**对参数的管理**.

但是这种的做法有一个的副作用,默认绑定规则会把`this`绑定到全局对象window上,有可能会污染,发生一些奇奇怪怪的问题.

### 更安全的this
一种“更安全”的做法是传入一个特殊的对象，把`this`绑定到这个对象上,而不是通过传入`null`绑定到全局上,这就不会对你的程序产生任何副作用。

**怎么做呢?** 我们可以创建一个“DMZ”（demilitarized zone，非军事区）对象——它就是一个空的非委托的对象,我们在忽略`this`绑定时传入一个DMZ对象,那就什么都不用担心了,因为任何 对于 this 的使用都会被限制在这个空对象中，不会对全局对象产生任何影响。

用代码举个例子:
```js
function foo(a,b) { 
    console.log( "a:" + a + ", b:" + b ); 
}
// 我们的 DMZ 空对象 
var ø = Object.create( null );
// 把数组展开成参数 
foo.apply( ø, [2, 3] ); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```
**代码分析:** 这里有个小技巧,用`Object.create( null );`创建空对象对`{}`更好,因为它不会创建`Object. prototype`这个委托，所以它比`{}`“更空”.

### 间接引用
另一个需要注意的是，你有可能（有意或者无意地）创建一个函数的“间接引用”，在这 种情况下，调用这个函数会应用默认绑定规则。

间接引用最容易在赋值时发生：
```js
function foo() { 
    console.log( this.a ); 
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2
```
**代码分析:** 赋值表达式 `p.foo = o.foo` 的返回值是目标函数的引用，因此调用位置是 **`foo()`** 而不是`p.foo()`或者`o.foo()`。根据我们之前说过的，这里会应用默认绑定。

## 小结
至此书上this的内容大部分我都写下了(小部分的例如箭头函数啥的不太绕的或是太复杂看不懂的就没写),终于完成这个无比冗余的MarckDown文档了.
































