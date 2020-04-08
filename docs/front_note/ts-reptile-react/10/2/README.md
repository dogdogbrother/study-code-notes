# 方法/访问器/属性/参数的装饰器

## 方法装饰器

1. 方法装饰器是定义在类的方法上的，和类装饰器一样，是在类声明时就执行的。
2. 有三个参数，target，key，descriptor。
3. target是什么并不一定，通常对应的是类的prototype，但是如果你的方法是静态static的，那么对应的就是类的构造函数。
4. key比较好猜，就是方法的名字。
5. descriptor是描述符号的意思，下面有一些属性方法来对类方法进行管理。

## 最基础的方法装饰器
```ts
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(target)
  console.log(key)
}
class Test {
  name: string;
  constructor(name :string) {
    this.name = name
  }
  @getNameDecorator
  getName() {}
}
```
输出`Test { getName: [Function] }`和 `getName`。

如果是 `static getName() {}`，那么输出 `[Function: Test] { getName: [Function] }`。

## descriptor简单应用
```ts
class Test {
  name: string;
  constructor(name :string) {
    this.name = name
  }
  @getNameDecorator
  getName() {
    return this.name
  }
}
const test = new Test('wang')
console.log(test.getName());
```
这么做肯定是输出的wang，但是如果我们在打印前更改了getName函数：
```ts
test.getName = () => {
  return 'dog'
}
```
那么输出的是dog。

如果我不想让别人修改我的函数的完整性，我们可以在装饰器里面`descriptor.writabel = false`,再执行就会报错了。

还有`descriptor.value = fn()` 来彻底更改重写函数。

## 访问器装饰器

装饰器还可以用在访问器上，也就是get，set函数上，也是和在方法上差不多(都是函数嘛)，就不多说了。

## 属性装饰器

感觉没啥用，先空着，等我明白了再补上。

## 参数装饰器
```ts
function paramDecorator(target: any, method: string, paramIndex: number): any {
  console.log(target, method, paramIndex);
}

class Test {
  getInfo(@paramDecorator name: string, age: number) {}
}

const test = new Test()
test.getInfo('wang', 28)
```
输出`Test { getInfo: [Function] }` `getInfo` `0`其实也蛮简单的，就是位置是在参数的前面。

装饰器的三个参数分别是原型，方法名，参数所在的位置。