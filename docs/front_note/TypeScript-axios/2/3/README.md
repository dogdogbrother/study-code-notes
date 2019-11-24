# 接口

## 接口初探
我们先写一个简单的实例代码来讲解下接口的作用:
```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
```
实例代码就是给一个函数传递了一个对象当参数,函数在定义形参的时候就用了类型判断,要求对象中的`label`属性必须为 string 类型.

但是如果我们对对象里面的属性要求比较复杂的话,我们要在`(...)`里写茫茫长的代码,比较麻烦和不美观,回顾下第一章节我们对 **interface 接口** 的定义:
>可以把接口看做一个对象的描述体.

所有我们可以改良下代码:
```ts
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = {size: 10, label: 'Size 10 Object'}
printLabel(myObj)
```

>**难道说接口只是类型功能的加强吗**  
其实不是,接口的功能还是非常丰富和强大的,下面会逐一展示.

## 可选属性
就是你可以传,也可以不传.`color?: string`,语法是key值后面加个?.

这里我们写一个小案例,函数的功能是接受一个对象参数,如果参数(接口)缺失就用默认的值,然后返回一个新对象(接口).
```ts
interface Square {
  color: string,
  area: number
}

interface SquareConfig {
  color?: string
  width?: number
}

function createSquare (config: SquareConfig): Square {
  let newSquare = {color: 'white', area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({color: 'black'})
```

## 只读属性
显而易见,如果你修改了只读属性就会报错,语法就是在key值前声明标识符`readonly`.
```ts
interface Point {
  readonly x: number
  readonly y: number
}
```
使用这个接口生成的数据后就会发现,他的`x`和`y`都不能修改了.
```ts
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // error!
```
>我们发现一个有趣的现象,接口的只读属性其实是对`const`的一种加强,要知道js中的常量虽然不能改变,但是常量的值是可以改变的.

`TypeScript` 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
```ts
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error!
ro.push(5) // error!
ro.length = 100 // error!
a = ro // error!
```
上面代码的最后一行，可以看到就算把整个 ReadonlyArray 赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
```ts
a = ro as number[]
```

## 额外属性检查
我们在上上个 **可选属性** 的例子中,是可以少传参数的,但是如果我们想多传个没有定义的属性的参数就会报错,怎么能实现随机属性的接口传参呢?代码示例如下:
```ts
interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any
}
```

## 函数类型
前面我们的接口示例都是对象,然而接口也可以定义函数.
```ts
interface SearchFunc {
  (source: string, subString: string): boolean
}
```
这个接口就定义了我们这个函数的两个参数必须都是`string`,返回值比较是`boolean`,我们使用下这个函数类型的接口.
```ts
let mySearch: SearchFunc
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1
}
```
>需要注意的是,函数的参数名不需要与接口里定义的名字相匹配,不仅如此,你还可以不用推断参数类型,因为ts会根据你定义的接口帮你推断.
```ts
let mySearch: SearchFunc
mySearch = function(src, sub) {
  let result = src.search(sub)
  return result > -1
}
```

## 可索引的类型
没看明白,后面再看

## 类类型
看不懂,我先跳过这里先看类的内容,然后我再补这个地方


