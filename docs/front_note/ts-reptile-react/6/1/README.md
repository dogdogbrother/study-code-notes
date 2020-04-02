# 联合类型和类型保护

## 需求
先看代码:
```ts
interface Bird {
    fly: boolean
    sing: () => {}
}

interface Dog {
    fly: boolean
    bark: () => {}
}

function trainAnimal(animal: Bird | Dog) {
    // ...
} 
```
我们训练动物的函数参数有可能是鸟,也有可能是狗.我们`animal.`后会提示 fly 属性,但不会提示 sing 和 bark 方法,并且 `animal.sing()` 也会报错.  
这是因为TS不知道参数到底是鸟还是狗,所以不能判断是否拥有其独有的方法.

这里我们需要做一些处理来对类型进行保护:

## 逻辑+类型断言
```ts
function trainAnimal(animal: Bird | Dog) {
    if (animal.fly) {
        (animal as Bird).sing()
    } else {
        (animal as Dog).bark()
    }
} 
```
如果 `animal.fly` 就是为true,代表就是Bird,我们手动指定他为 `Bird` 类型.

## in
```ts
function trainAnial(animal: Bird | Dog) {
    if ('sing' in animal) {
        animal.sing()
    } else {
        animal.bark()
    }
} 
```
我们发现不管是sing还是bark方法,TS都能做出正确的代码提示,很智能啊.

## typeof
```ts
function add(first: string | number, second: string | number) {
    if (typeof first === 'string' || typeof second === 'string') {
        return `${first}${second}`
    } else {
        return first + second
    } 
}
```
TS不支持字符串相加或是字符串加数字的语法,直接写 `first + second` 会报错.

## instanceof
```ts
class NumberObj {
    count: number
}

function add(first: object | NumberObj, second: object | NumberObj){
    if (first instanceof NumberObj && second instanceof NumberObj) {
        return first.count + second.count
    }
    return 0
}
``` 

## 知识点总结

1. 联合类型
用 `|` 运算符,可以让一个变量有2种接口类型的可能.

2. 类型保护的方法有很多,我们发现在做类型保护的时候,TS都能很智能的识别出我们的真实意图,有点牛逼嗷.
