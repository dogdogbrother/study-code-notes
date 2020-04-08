# 装饰器的小例子

先看一个简单的代码：
```ts
const userInfo: any = undefined
class Test {
  getName() {
    return userInfo.name
  }
  getAge() {
    return userInfo.age
  }
}
const test = new Test()
console.log(test.getName());
```

## 第一版改良

因为业务问题，我们不能控制`userInfo`是什么类型以及是否有对应的属性，最基础的改良方法就是 try catch：
```ts
try{
  return userInfo.name
} catch(e) {
  console.log('userInfo.name 不存在')
}
```

## 第二版改良

如果业务多了起来代码就会很长，自然我们就能想到，用装饰器把try catch代码封装起来复用：
```ts
const userInfo: any = undefined
function catchError(target: any, key: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value
  descriptor.value = function() {
    try {
      fn()
    } catch(e) {
      console.log('userInfo 存在问题');
    }
  }
}
class Test {
  @catchError
  getName() {
    return userInfo.name
  }
}
const test = new Test()
console.log(test.getName());
```

## 最终版
还有个缺陷，不管是什么属性的报错都是userInfo 存在问题，我们要可以输入自定义的错误信息：
```ts
const userInfo: any = undefined
function catchError(msg: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = function() {
      try {
        fn()
      } catch(e) {
        console.log(msg);
      }
    }
  }
}
class Test {
  @catchError('userInfo.name 不存在')
  getName() {
    return userInfo.name
  }
}
const test = new Test()
test.getName()
```
