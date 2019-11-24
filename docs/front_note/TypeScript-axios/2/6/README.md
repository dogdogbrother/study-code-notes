# 泛型

## 基础示例

直接来个基础示例:
```ts
function identity<T>(arg: T): T {
  return arg
}
let output = identity('myString')
console.log(output); // 输出 myString
```
我们在前面已经学习到了类型的作用,但是如果你指定了类型又太僵硬,如果不确定参数把类型指定为`any`又过于灵活.

泛型就是在这两者中取了个中间值,泛型的泛是广泛的泛.
>还有另一种写法`let output = identity<string>('myString')`

## 泛型变量
我们先看个代码:
```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length)
  return arg
}
```
这段代码看着好像是没有问题,但是编译的时候是会报错说,"arg是没有length属性的",这个是因为我们有可能也会传number过去,而number是没有长度的.

那么我们改善下代码:
```ts
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
```
这样就没问题了,而且也规定了数组的泛型,假如参数是`number []`,那么返回的也必须是`number []`

## 泛型接口
泛型接口比较灵活,先把写法写上,后面如果有碰到泛型接口的话再过来看.
```ts
interface GenericIdentityFn<T> {
  (arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn<number> = identity
console.log(myIdentity(22)); // 使用的时候参数就只能是 number
```

## 泛型类
泛型类看上去与泛型接口差不多。 泛型类使用（ `<>`）括起泛型类型，跟在类名后面。先看一个例子:
```ts
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0 // 不能是非number
myGenericNumber.add = function(x, y) {
  return x + y 
}
console.log(myGenericNumber.add(1, 3)) // 输出 4. 不能是非number
```
我们用这种泛型类的形式让所有的参数包括返回值都必须是`number`才行,与传统的接口相比,优势在于,我们可以限制他们全部为`number`,也可以限制他们为全部是`string`.
```ts
new GenericNumber<string>() // 修改此处即可
```