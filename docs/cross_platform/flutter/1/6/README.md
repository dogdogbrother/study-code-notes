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

## 接口

## Mixins

## 操作符的覆写