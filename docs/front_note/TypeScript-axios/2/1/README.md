# 基础类型

>TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

## 布尔值
```js
let isDone: boolean = false
```
`isDone`里面就保存了一个布尔值,和js不同之处就是多了个`boolean`的声明.

## 数字
和js一致的,TypeScript 里的所有数字都是浮点数。还支持十六进制字面量,二进制和八进制字面量.
```js
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24
```

## 字符串
```js
let name: string = 'bob'
name = 'smith'
```
大致规则和js差不多,也可以使用模板字符串,不同的是ts支持多行文本,也就是说能换行.
```js
let name: string = `dog`
let age: number = 10
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`
```
## 数组
可以用两种方法定义数组.
```js
let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3] // 数组泛型
```
>这个和js的数组不同的是,元素里面只能有数字,不能有其他类型元素

## 元祖 Tuple
前面的几种基础类型和js都很像.

元祖类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同.
```js
let x: [string, number]
x = ['hello', 10] // OK
x = [10, 'hello'] // Error
```


## 枚举
js中集合类型有数组,也有对象.问题是数组不能用key值,对象不能用索引.

缺少个 **枚举** 类型,幸好ts补充了.
```js
enum Color {Red, Green, Blue}
let c: Color = Color.Green
```
变量`c`里面就保存了`Gree`这个信息,除了用key取值,枚举还可以用索引来取值.
```js
let colorName: string = Color[2]
```
默认情况下，从 `0` 开始为元素编号。你也可以手动的指定成员的数值.
```js
enum Color {Red = 1, Green = 3, Blue} // Blue其实就是4了
let c: Color = Color.Green
```
>这种正反查是怎么做到的呢,我们可以编译成js文件然后学习下,我写在结尾 **扩展** 的地方.

## any
`any` 的意思就是任何的,很明显,这是一个不会进行类型检查的数据类型,就是我们可以声明一个数字,然后变成字符串,都是没问题的.
```js
let notSure: any = 4
notSure = 'maybe a string instead' // 可以变成字符串
notSure = false // 也可以是个 boolean
```
>刚才我们在举例数组的时候,数组内容只能有数字,用`any`就可以很随意了.
```js
let list: any[] = [1, true, 'free']

list[1] = 100 // tree变成了数字,没问题
```
## void
js也有`viod`,作用其实就是生产出一个`undefined`.

ts中,`void` 类型有点像是与 `any` 类型相反，它表示没有任何类型。当一个函数没有返回值时你通常会见到其返回值类型是 `void`:
```js
function warnUser(): void { // 一般都这么用
  console.log('This is my warning message')
}
```

## null 和 undefined
ts也有null 和 undefined,他们的类型也是null 和 undefined,和void一样,单独赋值没啥用.

## never
我们先看一个看不懂的说明:
>`never` 类型表示的是那些永不存在的值的类型,变量也可能是 `never` 类型，当它们被永不为真的类型保护所约束时。

看定义是看不明白什么意思了,在使用上,`never`类型的函数代表函数无法达到终点,例如抛出错误或无限循环.
```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed")
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```

## object
`object` 表示非原始类型，也就是除 `number`，`string`，`boolean`，`symbol`，`null`或`undefined` 之外的类型。

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 API。例如：
```js
declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

create(42) // Error
create('string') // Error
create(false) // Error
create(undefined) // Error
```

## 类型断言
举个例子:
```js
let someValue: any = 'this is a string'
console.log(someValue.length)
```
这个地方有个问题就是放你`.`想要输出 `length` 的时候发现编译器不能识别你是否是个字符串(因为你现在是个any类型,而length是字符串方法).

通过 **类型断言** 我们可以告诉编译器(和运行无关,只针对编译阶段)我们能确认这个类型是什么.类型断言有两种形式:
```js
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length 

```
```js
let someValue: any = 'this is a string'

let strLength: number = (someValue as string).length
```
>两种形式是等价的,推荐 `as` 语法,JSX只支持`as`
