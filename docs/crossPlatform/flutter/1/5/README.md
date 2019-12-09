# 面向对象 上

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
    print('name is $name, age is $age)
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