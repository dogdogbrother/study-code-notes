# 类

## 基本示例
```ts
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('world')
// greeter 就拥有了greeting属性和greet方法.
```
和js的类基本一模一样,就是多个一个类型判断`message: string`.

## 继承
似乎所有讲继承的例子都是用的Animal和dog有没有..
```ts
class Animal {
  move(distance: number = 0) {
    console.log(`Animal moved ${distance}m.`)
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)
```
和js也是一模一样的,包括`constructor()`构造函数,和`extends`中必须有的`super()`方法.

## 公共，私有与受保护的修饰符

### 默认为 public
其实我们上面的例子里,所有的类属性和方法都是public,与c#等语言不同的是,ts是默认的,是可以不写的.代码的原貌如下:
```ts
class Greeter {
  public  greeting: string
  public  constructor(message: string) {
    this.greeting = message
  }
  public  greet() {
    return 'Hello, ' + this.greeting
  }
}
```

### private 私有变量
当成员被标记成 private 时，它就不能在声明它的类的外部访问。
```ts
class Animal {
  private name: string
  constructor(name: string) { 
    this.name = name
  }
}
new Animal('Cat').name // 错误: 'name' 是私有的.
```
>变量如果是私有的,就代表不能暴露在除了声明类之外的地方,但是可以在构造器里面处理,也能通过函数处理后暴露给外部使用.

### protected 受保护的
其实和`private`很像,不同的是,通过`extends`继承,子级类还是可以使用这个属性的.

### readonly 只读修饰符
```ts
class Person {
  readonly name: string
  constructor(name: string) {
    this.name = name
  }
}

let john = new Person('John')
john.name = 'peter' // 报错,提醒name为只读属性
```
## 存取器
其实就是js的`getters/setters`,来看代码,我们先检查用户密码是否正确，然后再允许其修改员工信息。我们把对 `fullName` 的直接访问改成了可以检查密码的 `set` 方法。 我们也加了一个 `get` 方法:
```ts
let passcode = 'secret passcode'

class Employee {
  private _fullName: string

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if (passcode && passcode == 'secret passcode') {
      this._fullName = newName
    }
    else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  console.log(employee.fullName)
}
```
我们尝试编译却会发生错误,是因为ts默认对应的js版本为es3,而`getters/setters`是es5中`Object.defineProperty`中的方法.所以我们在编译的时候需要再后面指定下版本`--target es5`.

## 静态属性
静态属性`static`是存在类本身上面的,而不是在类实例上的,看个代码示例:
```ts
class Grid {
  static origin = {x: 0, y: 0}

  scale: number

  constructor (scale: number) {
    this.scale = scale
  }

  calculateDistanceFromOrigin(point: {x: number; y: number}) {
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
  }
}

let grid1 = new Grid(1.0)  // 1x scale
let grid2 = new Grid(5.0)  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 3, y: 4}))
console.log(grid2.calculateDistanceFromOrigin({x: 3, y: 4}))
```
>我们有注意到,调用`origin`的时候用的是`Grid.origin`而不是`this.origin`.

## 抽象类
>我对抽象类的理解就是,抽象类不能被实例化,他是个只能用于被`extends`的类,一个类如果继承了抽象类,那么这个类实例后的对象只能拥有继承类里面的方法属性,和被指派的函数任务.

举个例子,我们现在就有一个抽象类:
```ts
abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earth...')
  }
}
```
首先要知道的是,他是不能被实例化的:
```ts
let animal = new Animal() // 报错信息为: 无法创建抽象类实例
```
然后在测试下用抽象类派发新类:
```ts
class Dog extends Animal {
  makeSound(): void {  // 这个成员函数必须有!因为抽象类规定的!
    console.log('狗在叫')
  },
  eat(): void {
    console.log('狗在吃饭')
  }
}
let dog = new Dog()
dog.makeSound()
dog.move()
dog.eat()
```
>`eat()`我测试是可以执行的,但是课程中说是不可以执行的..有可能是ts版本有变动吧.具体原因后面查明了我会更新的.