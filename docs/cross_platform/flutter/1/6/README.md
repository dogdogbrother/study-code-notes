# 面向对象 下

相比上章,这章比较难一些,继承/抽象类/接口/Mixins/操作符的覆写.

## 继承

* 使用关键字`extends`继承一个类.
* 自雷会继承父类可见的属性和方法,不会继承构造方法.
* 子类能够复写父类的方法,`getter`和`setter`.
* 单继承,多态性.

和js是一样的,就不写了.
>`@override`作为注释标签,意思就是复写了父级的方法.

## 继承中的构造方法

* 子类的构造方法默认调用父类的无名无参数构造方法
* 如果父类没有无名无参构造方法,则需要显示调用父类的构造方法
* 在构造方法参数后使用 `:` 显示调用父类构造方法.
```dart
class Person{
  String name;
  Person(this.name);
  Person.withName(this.name);
} 

class Student extends Person{
  int age;

  Student(String name) : super.withName(name);
}
```

## 抽象类

* 抽象类使用`abstract`表示,不能直接被实例化.
```dart
abstract class Person{
  void run(){}; // 在java中, 是要 abstract void run(); 这样定义
} 

var person = new Person(); // 报错
```
>dart中的抽象类相比较其他语言,更像是接口.

## 接口

* dart中的接口和其他语言不太一样,类就是接口.
```dart
class Person{
  String name;

  int get age => 18;

  void run() {
    // ...
  }
}

class Student implements Person{
  @override
  String name;

  @override
  int get age => 18;

  @override
  void run() {
    // ...
  }
}
```
这里就不是`extends`继承,而是`implements`接口了.


## Mixins

* dart本身是单继承模式,如果想要多类继承,那么就要使用Mixins.
```dart
class A{
  void a(){
    // ...
  }
}
class B{
  void b(){
    // ...
  }
}
class C{
  void c(){
    // ...
  }
}

class D extends A with B,C{

}

var d = new D()
// 这里d就有a方法,b方法,c方法了.
```
* 多个mxins用`with`连接.
* 作为Mixin的类不能有显示的声明的构造方法.
```dart
class A{
  A(){} //报错
}
```
* 作为mixin的类智能继承自Object
```dart
class A extends Test{ // 报错
  // ...
}
```

## 操作符的覆写
可覆写的操作有十几个,大于小于等于取余什么的等等.

本身我们是没有办法办法对比两个对象的大小的,但是我们可以在类内部去重新写一下逻辑.
```dart
var person1 = new Person(20);
var person2 = new Person(18);

print(person1>person2)

class Person{
  int age;

  Person(thos.age)

  bool operator >(Person person){
    return this.age > person.age
  }
}
```