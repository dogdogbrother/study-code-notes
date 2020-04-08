# 类的装饰器

装饰器的语法目前还是实验性质的语法，我们需要在 tsconfig.json 配置下:
```json
{
    /* Experimental Options */
    "experimentalDecorators": true,    
    "emitDecoratorMetadata": true
}
```

类的装饰器顾名思义就是用在类上面的装饰器，有几个特点：
1. 本身是一个**函数**
2. 通过 **@** 符号来使用，
3. 装饰器函数的参数就是被使用的类的构造函数。
4. 可以有多个装饰器，执行顺序是从下到上的洋葱模式。

## 最简单的装饰器
```ts
function testDecorator(constructor: any) {
  console.log('decorator'); 
}
@testDecorator
class Test {}
```
会输出 decorator ,与构造器不同的是，我们不需要 `new` 的时候就会执行内容，而当你 `new Test()` 时反而不会执行。

*****

```ts
function testDecorator(constructor: any) {
  constructor.prototype.getName = () => {
    console.log('wang');
  } 
}

@testDecorator
class Test {}

const test = new Test();
(test as any).getName()
```
通过这个代码可以发现参数 `constructor` 其实就是类的构造器。。

假如我们需要一个逻辑来判断该装饰器是否应该生效，可以用工厂模式外面嵌套一层:
```ts
function testDecorator(flag: boolean) {
  if (flag) {
    return function(constructor: any) {
      // ...
    }
  } else {
    return function(constructor: any) {}
  }
}

@testDecorator(true)
class Test {}
```
## 复杂一点的装饰器的写法

上面的代码是有问题的，`test`类型是 Test， 是没有 `getName` 属性的，为了防止报错我们手动指定为 any。

怎么让他有更好的代码提示呢？在解决这个问题前我们先重写下代码：
```ts
function testDecorator<T extends new (...args: any[]) => any>(constructor: T) {
  return class extends constructor {
    name = 'dog'
  }
}
@testDecorator
class Test {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

const test = new Test('wang');
console.log(test.name);
```
输出dog，这代码有点难，问号好几个，我一步步讲解：
1. `(...args: any[]) => any` 这是一个函数类型，函数的参数是个数组，数组里有多个any类型的值。
2. `T extends new (...args: any[]) => {}` 前面有new的意思是，这个函数是构造函数。泛型T继承了此构造函数，就代表后面的`constructor`包含了此构造函数。
3. 简单案例下的扩展是通过`constructor.prototype`的形式，这次我们返回一个空class类，他扩展了实例中的所有属性，所以我们能修改其中的name属性。

可以发现，是先执行类里面的内容，再执行装饰器里面的内容。

这个时候我们扩招`getName`方法也是有效的，不过依旧没有提示，因为Test类就是没有定义此方法，TS是不会查找你的装饰器链的操作的。

怎么办呢，我们要换一种写法了：
```ts
function testDecorator() {
  return function<T extends new (...args: any[]) => any>  (constructor: T) {
    return class extends constructor {
      name = 'dog'
      getName() {
        return this.name
      }
    }
  }
}

const Test = testDecorator()(
  class {
    name: string
    constructor(name: string) {
      this.name = name
    }
  }
)
```
现在就能完成我们想要的功能和代码其实，但是有点蛋疼，这种写法就是通过2层的extends把两个类融合在了一起。

这哪里是装饰器啊，如果你想多个装饰器难道要函数套娃吗？

