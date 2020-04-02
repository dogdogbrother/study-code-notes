# 泛型中keyof语法的使用

我们先看一段代码:
```ts
interface Person {
    name: string
    age: number
    gender: string
}

class Teacher {
    constructor(private info: Person) {}
    getInfo(key: string) {
        return this.info[key]
    }
}

const teacher = new Teacher({
    name: 'wang',
    age: 29,
    gender: 'nale'
})
const test = teacher.getInfo('name')
```
这代码是可以正常运行的,但是 `this.info[key]` 却是飘红的,为什么呢?

因为我们的key是随意输入的,如果你传的是一个 `hello` ,那么返回的就是undefined的,这是有问题的.解决方法很简单,手动设置个类型保护就行了:
```ts
if(key === 'name' || key === 'age' || key === 'gender') {
    return this.info[key]
}
```

虽然不飘红了但是也有问题,`test`装的是什么呢,ts无法进行准确的推断.

他有可能是tring/number/undefined,如果你对undefined使用了string上的方法不就有问题了嘛,如何限制住或是指定`test`的类型呢?

就要用keyof配合泛型了:
```ts
interface Person {
    name: string
    age: number
    gender: string
}
class Teacher {
    constructor(private info: Person) {}
    getInfo<T extends keyof Person>(key: T): Person[T] {
        return this.info[key]
    }
}
```
这样当你`getInfo('name')`时,返回值就是string,是age时就是number.当传入hello时就会报错.