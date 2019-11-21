# 原型
> 原型链是前端同志们面试经常被问到的点,一句话描述就是*JavaScript 中的对象有一个特殊的 [[Prototype]] 内置属性，其实就是对于其他对象的引用*

## [[Prototype]]
我们看一段代码:
```js
var anotherObject = { 
  a:2 
};// 创建一个关联到 anotherObject 的对象

var myObject = Object.create( anotherObject ); 

myObject.a; // 2
```
**代码分析:** 用`create`方法生成的对象其实是个空对象,但是却把`anotherObject`关联到了新创建对象的 [[Prototype]] 中.

> MDN是这样描述的 *`Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。*  

当我们查找`a`属性的时候,`myObject`本身是不存在的,但是在 [[Prototype]] 中找到关联`anotherObject`的`a`.  
如果`anotherObject`中也找不到`a`并且`anotherObject`的[[Prototype]] 链不为空的话，就会继续查找下去。这个过程会持续到找到匹配的属性名或者查找完整条 [[Prototype]] 链。

### Object.prototype
> 但是到哪里是 [[Prototype]] 的“尽头”呢？
所有普通的 [[Prototype]] 链最终都会指向内置的`Object.prototype`。所以我们才能用到很多属性而且通用的方法,例如`.toString()`和`.valueOf()`等等.

### 属性设置和屏蔽
看一个简短的代码:
```js
myObject.foo = "bar";
```
如果`myObject`对象中包含名为`foo`的普通数据访问属性，这条赋值语句只会修改已有的属性值。

如果`foo`不是直接存在于`myObject`中，[[Prototype]] 链就会被遍历，类似 [[Get]] 操作。 如果原型链上找不到`foo`，`foo`就会被直接添加到`myObject`上。

问题来了,如果`foo`存在于原型链上层，赋值语句`myObject.foo = "bar"`的行为就会在直觉上很奇怪,不过这个后面会提及到.

如果属性名`foo`既出现在`myObject`中也出现在 `myObject` 的 [[Prototype]] 链上层，那 `么就会发生屏蔽。myObject` 中包含的 `foo` 属性会屏蔽原型链上层的所有 `foo` 属性，因为 `myObject.foo` 总是会选择原型链中最底层的 `foo` 属性。

**屏蔽**的这个动作比较复杂,我们分析一下如果 `foo` 不直接存在于 `myObject` 中而是存在于原型链上层时 `myObject.foo = "bar"` 会出现的三种情况。
1. 如果在 [[Prototype]] 链上层存在名为 `foo` 的普通数据访问属性并且没有被标记为只读（writable:false），那就会直接在 `myObject` 中添加一个名为 `foo` 的新属性，它是屏蔽属性。
2. 如果在 [[Prototype]] 链上层存在 `foo`，但是它被标记为只读（writable:true），那么无法修改已有属性或者在 `myObject` 上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。
3. 如果在 [[Prototype]] 链上层存在 `foo` 并且它是一个 `setter`，那就一定会 调用这个 `setter``。foo` 不会被添加到（或者说屏蔽于）`myObject`，也不会重新定义 `foo` 这 个 `setter`。
> 虽然在直觉上而且也的确绝大多数情况下会触发屏蔽,但是事实上却只有第一种情况下会触发.

如果你希望在第二种和第三种情况下也屏蔽`foo`，那就不能使用 = 操作符来赋值，而是使 用 `Object.defineProperty(..)`（参见第 3 章）来向 `myObject` 添加`foo`。(也就是get和set)

> 第二种情况是比较有意思的,为什么父类(这么比喻下)的属性设置了只读就不让子类建立了呢?  

这样做主要是为了模拟类属性的继承。你可以把原型链上层的 `foo` 看作是父类中的属性，它会被 `myObject` 继承（复 制），这样一来 `myObject` 中的 `foo` 属性也是只读，所以无法创建.(如果自己建立了把父级覆盖了不就等于修改了吗(使用层面))?

有些情况下会隐式产生屏蔽，一定要当心。思考下面的代码：
```js
var anotherObject = { 
  a:2 
};
var myObject = Object.create( anotherObject );
anotherObject.a; // 2 
myObject.a; // 2
anotherObject.hasOwnProperty( "a" ); // true 
myObject.hasOwnProperty( "a" ); // false
//-----------------  到这都是正常的检查操作 -------
myObject.a++; // 隐式屏蔽！
anotherObject.a; // 2 问题出现了 这里应该是3而不是2
myObject.a; // 3 
myObject.hasOwnProperty( "a" ); // true
```
**代码分析:** 尽管 `myObject.a++` 看起来应该（通过委托）查找并增加 `anotherObject.a` 属性，但是别忘 了 `++` 操作相当于 `myObject.a = myObject.a + 1`。因此 `++` 操作首先会通过 [[Prototype]] 查找属性 `a` 并从 `anotherObject.a` 获取当前属性值 2，然后给这个值加 1，接着用 [[Put]] 将值 3 赋给 `myObject` 中新建的屏蔽属性 `a`.

## "类"
> **无奈**  
其实上面就有很多关于类的废话,这个作者用了巨长巨啰嗦的代码和解释来不停的说明JS和传统面向语言的区别... 而我其实根本就他妈的不关心面向语言和JS有啥区别!!










