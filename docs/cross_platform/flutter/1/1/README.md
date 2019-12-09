# 数据类型

## 变量与常量

有`var`,`final`,`const`.

其中`var`和js中的差不多,没有什么特殊的限制,随意使用.

`final`只能被赋值一次,不能被修改.

`const`只能被赋值一次,不能被修改.

>这样看来`final`和`const`好像是一样的,其实不然,区别后面会讲.

## 数值型
数值型一共有3种,`num`数字,`int`整数,`double`浮点数.

其中`num`是其他2个类型的父类,就是可以装整数,也可以装浮点数.

* 运算符
```
+ - * / ~/ %
```

加减乘除取整取余

* 常用属性
`isNan`,`isEvent`,`isOdd`

是否是数字,是否是偶数,是否是奇数.

* 常用方法
```dart
abs()
// 绝对值
round()
// 四舍五入
floor()
// 向下取整
ceil()
// 向上取整
toInt()
// 转成整型
toDouble()
// 转成浮点型
```

## 字符串 String

可以用三种方法创建字符串:

1. 使用单引号双引号创建字符串.
2. 使用三个引号或是双引号创建多行字符串.
3. 使用r创建原始raw字符串.

对于r创建来单独说明一下:
```dart
String str = r'Hello \n Dart'
```
正常来说`\n`是个换行转义符,但是通过r就会让转义符都变成原始的字符串.

* 常用方法:
```dart
str.contains('abc')
// 是否包括此字符串,返回布尔值
str.subString(0,3)
// 从第0位到3位,返回截取后字符串
str.startsWith('a') str.endsWith('a')
// 此字符串是否以a开头(或是结尾)
indexOf() lastIndexOf()
// 对应的下标,和反着的下标
str.split(',')
// 把字符串分割成数组
str.replaceAll('this','that')
// 把字符串中的this全部替换成that.
```

## 布尔值

使用`bool`来表示,值只有`true`和`false`
```dart
bool isTrue = true
```

## 列表 List
dart中List就是数组的概念,三种创建方式.
```dart
var list = [1,2,3]
var list = const [1,2,3] // 创建不可变的list
var list = new List()
```

* 常用方法:
```dart
list.add('我是需要增加的内容') // 等同于js中的push
list.insert(index,element)  // 也是插入
list.remove('java') // 移除list中的java字符串的变量.
list.clear()  // 清空list
list.sublist(index) // 截取数组
list.shuffle() // 打乱数组
list.forEach(function) // 一个参数,就是item
```

## map

和js中的map数据结构一样,是个对象.
```dart
var map1 = {"first":"dart"}
var map2 = const {"first":"dart"} // 创建不可变的map
var map3 = new Map()
```

* 常用方法: 
```dart
map.isEmpty() // 是否为空map
map.key // 返回所有的key值
map.value // 返回所有的value值
map.containsKey() // 是否包含某个key
map.containsValue() // 是否包含某个value
map.remove('first') // 通过key移除某个值
list.forEach(function) // 和list不同的是,有2个参数,一个key一个value
```

## dynamic

这个是Dart中比较特别的类型,动态类型.

上面我们提到了一个例子:
```dart
var a;
a = 10;
a = "Dart";
```
这里的变量a就是默认的dynamic类型,等同于下面代码:
```dart
dynamic a = 10;
a = "Dart";
```




