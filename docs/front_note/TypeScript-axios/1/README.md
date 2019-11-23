# 初始TypeScript

## 安装TypeScript

有两种主要的方式来获取TypeScript工具：
1. 通过npm.(我们使用这个)
```
// 安装
npm install -g typescript 

// 测试
tsc -v
```
2. 安装Visual Studio的TypeScript插件

## 第一个TypeScript程序
>这里说明一下,后续基础的代码我都会用example的形式去写,代码在[github](https://github.com/dogdogbrother/TypeScript-example)上.

我们新建一个`TypeScript-example`目录,存放所有的example,第一个TypeScript程序我们再新建一个greeter文件夹,里面新建 **greeter.ts** 文件,内容如下:
```js
function greeter(person) {
  return 'hello ' + person
}
let user = 'dog'
console.log(greeter(user))
```
因为js是ts的子集,所以我们虽然写的全部都是js的内容,但是ts也能执行.我们使用安装的TypeScript的来对这个ts文件进行编译.
```
cd ./greeter/

tsc greeter.ts
```
我们发现同级目录下生成一个js文件,内容和ts文件内容一模一样.我们可以使用node命令执行这两个文件,发现输出都是一样的.

**hello dog**

## 类型

这里我们再给ts文件高级一些的功能,给参数加下类型.
```js
function greeter(person: string) {
  return 'hello ' + person
}
```
再次编译,发现js文件和刚才是一样的,这是因为我们本来person就是string,符合预期,我们测试下,把`user`参数变成一个数组后再次编译
```js
let user = [0, 1, 2]
```
```
tsc greeter.ts
```
控制台报错.**Argument of type 'number[]' is not assignable to parameter of type 'string'.**

>虽然报错了,不过我们发现js还是编译了,所有与其叫做错误,更应该叫做警告.  
除了类型不匹配会报错,例如`greeter(user, 1)`参数数量不对也是会报错的.

## interface 接口 
```js
interface person {
  firstName: string,
  lastName: string
}

function greeter(person: person) {
  return 'hello ' + person.firstName + ' ' + person.lastName
}

let user = {
  firstName: 'dog',
  lastName: 'brother'
}

console.log(greeter(user))
```
可以把接口看做一个对象的描述体.

我们再次执行编译,发现js文件其实没什么特殊的,普普通通...
```js
function greeter(person) {
    return 'hello ' + person.firstName + ' ' + person.lastName;
}
var user = {
    firstName: 'dog',
    lastName: 'brother'
};
console.log(greeter(user));
```
>其实这个例子就已经让我们感受到了VSCODE对TS的友好,代码推断很舒服.

### class 类
```js
class User {
  fullName: string
  firstName: string
  lastName: string

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = firstName + ' ' + lastName
  }
}
interface person {
  firstName: string,
  lastName: string
}

function greeter(person: person) {
  return 'hello ' + person.firstName + ' ' + person.lastName
}

let user = new User('dog', 'brother')

console.log(greeter(user))
```
这段代码在输出上是和上面一模一样的,我们再看下编译后的js文件什么样子的.
```js
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
    }
    return User;
}());
function greeter(person) {
    return 'hello ' + person.firstName + ' ' + person.lastName;
}
var user = new User('dog', 'brother');
console.log(greeter(user));
```
可以看到是通过函数的形式实现ts文件中的class语法.

