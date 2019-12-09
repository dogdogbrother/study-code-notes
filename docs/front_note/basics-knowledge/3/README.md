# Object 对象
***

## Object.assign()

**通过复制一个或多个对象来创建一个新的对象。**

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```
需要注意的是,第一个参数对象会被修改.

## Object.create()

**使用指定的原型对象和属性创建一个新对象**

```js
const person = {
  name: '妖怪',
};
const me = Object.create(person);
// me 和 person 是一样的了,但是又相互不影响
```
除了最简单的复制创建一个对象的功能外,还可以实现类式继承.举个简单的例子:
```js
Rectangle.prototype = Object.create(Shape.prototype);
```

## Object.defineProperty()

**给对象添加一个属性并指定该属性的配置。**

vue2的双向绑定的`get`,`get`就是用的这个方法,东西比较多,直接看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)吧.

## Object.entries()

**返回给定对象自身可枚举属性的 [key, value] 数组。**

```js
const object1 = {
  a: 'somestring',
  b: 42
};
console.log(Object.entries(object1))
//输出 [["a", "somestring"],["b", 42]] 
```
看着有点麻烦,好像没啥用,但是我们可以再通过结构赋值来拿到每次遍历的`key`和`value`.
```js
for (let [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
```

## Object.freeze()

**冻结对象：其他代码不能删除或更改任何属性。**

```js
var obj = {
  foo: 'bar'
};
var o = Object.freeze(obj);
o === obj; // true

//后续对 o 的属性的修改和添加都会无效,严格模式下还会报错.
```

## Object.is()

**比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。**

```js
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true
Object.is([], []);           // false
```
>这个方法解决了不能比较`NaN`的痛点啊!

## Object.keys() / Object.values()

**返回一个包含所有给定对象自身可枚举属性名称/值的数组。**

```js
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']
console.log(Object.values(obj)); // console: ['a', 'b', 'c']
```

## Object.prototype.hasOwnProperty()

**返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。**

```js
const object1 = new Object();
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1')); // true

console.log(object1.hasOwnProperty('toString')); // false
```

## Object.prototype.isPrototypeOf()

**返回一个布尔值，表示指定的对象是否在本对象的原型链中。**

代码示例和上面相反.

## Object.prototype.toString()

**返回一个表示该对象的字符串**

这个用法比较多的地方是判断数据类型.
```js
Object.prototype.toString.call([]) // [object Array]
Object.prototype.toString.call(new Date); // [object Date]
```

