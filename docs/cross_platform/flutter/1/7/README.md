# 枚举&泛型

## 枚举

* 枚举是一种有穷序列集的数据类型
* 使用关键字`enum`定义一个枚举
* 常用于代替常量,控制语句等.

其实还是挺简单的,没有花花呼哨的功能:
```dart
enum a{
  b,
  c,
  d
}
print(a.b); // 没问题

print(a[0]); // 没问题
```

## 泛型

* dart类型是可选的,可使用泛型限定类型
```dart
var list = new List();
list.add(1);
list.add('1');
```
这段代码是没有问题的,但是如果我们想要让list只接受string不接受number,就需要使用泛型
```dart
var list = new List<String>();
```
* 泛型可以直接在类上使用,也可以在方法上使用
```dart
class Utils<T>{
  T element;

  void put(T element){
    this.element - element
  }
}

var utils = new Utils(String)
utils.push("element")

// var utils = new Utils(int)
// utils.push(123)
```
这样我们参数的类型就会根据你new时候定义,这就是泛型. 
