# 高级类型

## 交叉类型
交叉类型是将 **多个类型合并为一个类型**。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 

我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在 JavaScript 里发生这种情况的场合很多！） 下面是如何创建混入的一个简单例子:
```ts
function extend<T, U> (first: T, second: U): T & U {
  // 这个  T & U 是交叉类型的精髓.
  let result = {} as T & U // 声明一个空对象,先断言成了交叉类型

  for (let id in first) { 
    // 先遍历 first ,复制所有的属性
    result[id] = first[id] as any 
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      // 再遍历 second
      result[id] = second[id] as any
    }
  }
  return result
}
// 方法定义好了,我们开始使用!
class Person {
  constructor (public name: string) {
  }
}

interface Loggable {
  log (): void
}

class ConsoleLogger implements Loggable {
  log () {
    // ...
  }
}
var jim = extend(new Person('Jim'), new ConsoleLogger())
// 通过 extend,我们让 jim 拥有了2中类型,可以使用name,也可以使用log()
var n = jim.name
jim.log()
```

## 联合类型
学不动了,先停止

## 类型保护

## 可以为 null 的类型

## 字符串字面量类型


