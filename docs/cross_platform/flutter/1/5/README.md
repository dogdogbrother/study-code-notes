# 面向对象 上

这章节比较简单,是面向对象的基本操作.

## 类与对象

* 使用关键字`class`声明一个类.
* 使用关键字`new`创建一个对象,`new`可省略.
* 所有对象都继承于`Object`类.
* 属性默认会生成`getter`和`setter`方法.
* 使用`final`声明的属性只有`getter`方法.
* 方法不能被重载.
* 使用`_`表示库的私有性.

来个代码例子:
```dart
class Person {
  String name;
  int age
  final String address;
  
  void work () {
    print('name is $name, age is $age')
  }
  void work () {
    // 报错,不能重载
  }
}

var person = new Person()
person.name = '张三'
person.age = 20
person.work() // 正常输出内容
person.address = 'china' // 报错,final属性是只读的
```

## 计算属性

概念上和vue的计算属性差不多的意思.

```dart
class Rectangle{
   num width,height;

   num get area => width * height;
       set area(value) {
         width = value /20;
       }
}

var rect = new Rectangle()
rect.width = 20;
rect.height = 10;

print(rect.area); // 输出200
rect.area = 200;
print(rect.width); // 输出10
``` 

## 构造方法
和js不同的是,构造方法不是统一的`constructor`,而是和类名相同的函数.
```dart
class Person{
  final String gender;
  Person(this.gender)
}

var person = new Person('男')
```
>这里注意一下,final本身是不能修改的,但是参数简写的形式因为是在构造函数执行之前运行的,所以是可以修改的.

还可以拥有多个构造方法,用 **类名.构造名** 来使用
```dart
class Person{
  final String gender;
  Person(this.gender)
  Person.change(this.gender)
}

var person = new Person.change('男')
```

## 常量的构造方法
上面我们定义的构造方法是用`var`去接受的,如果我们尝试使用`const`就会报错.

如果想要一个常量的构造方法,则需要在定义的时候就要声明`const`,并且成员属性也要是`final`.
```dart
class Person{
  final String gender;
  const Person(this.gender)
}

const person = const Person('男')
```

## 工厂构造方法

* 工厂构造方法类似于设计模式中的工厂模式
* 在构造方法前添加关键字`factory`实现一个工厂构造方法.
* 在工厂构造方法中可返回对象.

## 初始化列表

* 初始化列表会在构造方法体执行之前执行
* 使用逗号分隔初始化表达式
* 初始化列表常用于设置`final`变量的值.

## 静态成员

* 使用`static`关键字来实现类级别的变量和函数
* 静态成员不能访问非静态成员,非静态成员可以访问静态成员
* 类中的常量需要使用`static const`声明.

## 对象操作符

### 条件成员访问 ?
假如我们对空对象调用了属性或方法的话,就会出现空指针的问题,我们可以这样避免.
```dart
person?.work();
```
意思是person如果存在就调用它的`work()`方法,否则就不执行.

### 类型转换 as
直接代码注释举例:
```dart
class Person{
  String name;
}

var person;
person = '';
person = const Person('男')
// 这个时候 person 是动态类型,没有办法使用 person.name

print((person as Person).name);
// 但是我们可以通过 as 来指定 person 的类型
```

### 是否指定类型 is,is!
```dart
class Person{
  String name;
}

if (person is Person) {
  // 如果 person 是 Person 类型
  print(person.name)
}
```

### 级联操作 ..
级联操作就是个语法糖,可以不停的调用.
```dart
class Person{
  String name;
  void work () {
    // ...
  }
}
var person = new Person();
person..name = '森林'
      ..work();
```

### 对象 call 方法

直接代码举例说明:
```dart
class Person{
  String name;
  Strinbg call (String name,int age) {
    return 'name is $name,age is $age'
  }
}
var person = new Person();

print(person('senlin',80)) // call 的存在,让对象也变成了函数..
```
