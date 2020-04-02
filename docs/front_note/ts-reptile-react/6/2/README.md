# Enum枚举类型/generic泛型

## Enum枚举 

其实没什么好说的,直接看代码就行了:
```ts
enum Status {
    OFFLINE,
    ONLINE,
    DELETED
}
console.log(Status.OFFLINE)
console.log(Status.ONLINE)
console.log(Status.DELETED)
```
输出 `0 ,1 ,2`.  

枚举的精髓在于可以反查,`console.log(Status.OFFLINE)` 输出 OFFLINE.

我们还可以指定索引:
```js
enum Status {
    OFFLINE,
    ONLINE = 2,
    DELETED
}
```
输出`0, 2, 3`,可以看到是默认

## 函数泛型

先看下无泛型的代码:
```ts
function join(first: string | number, second: string | number) {
    return `${first}${second}`
}
join(1, "2")
```
这样是没问题的,但是如果我想 join 的两个参数是一致的,就没办法去约束了.

这里就用到泛型的概念了.

```ts
// 最基础的泛型
function join<ABC>(first: ABC, second: ABC) {
    return `${first}${second}`
}
join<string>("1", "2")

// 数组里的泛型
function map<ABC>(params: ABC[]) {
    return params
}
map<string>(['123'])

// 数组里的泛型的另一种写法
function map<ABC>(params: Array[ABC]) {
    return params
}
map<string>(['123'])

// 泛型还支持多种类型的组合
function join<T, P>(first: T, second: P) {
    return `${first}${second}`
}
join<number, string>(1, "2")
```

## 类泛型
先写个没有泛型的代码:
```ts
class DataManager {
    constructor(private data: string[] | number[]) {}
    getItem(index: number): string | number {
        return this.data[index]
    }
}

const data = new DataManager([1])
data.getItem(0)
```

功能上很简单,但是如果我们数组里还会有对象之类的类型,那么就要在联合类型上接着加,这有点麻烦,用泛型改造下会更好点.

```ts
class DataManager<T> {
    constructor(private data: T[]) {}
    getItem(index: number): T {
        return this.data[index]
    }
}
const data = new DataManager<string>(["1"])
data.getItem(0) // 输出 1
```

这是个最基础的类泛型,我们加个需求,我们需要在传入的参数具有 `name` 属性,很明显需要定义一个接口:

```ts
interface Item {
    name: string
}
class DataManager<T extends Item> {
    constructor(private data: T[]) {}
    getItem(index: number): string {
        return this.data[index].name
    }
}
const data = new DataManager([{name: "1"}])
data.getItem(1)
```
>泛型继承接口是个知识点.

## 缺少一个泛型注解,暂时不写了,感觉用处不大