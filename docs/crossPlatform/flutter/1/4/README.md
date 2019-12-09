# 方法

Dart中的方法是`function`对象,匿名函数,把方法当做参数使用,闭包等等都是和js非常相似的.

## 方法定义
```js
String getPerson(String name,int age) {
  return "name=$name,age=$age"
}

print(getPerson('张三', 18))
```
`String`定义了这个函数的返回值必须是`string`类型的.

返回类型和参数类型都可以省略.

可以使用箭头函数.

方法都有返回值,如果没有指定,默认`return null`.

## 可选参数

### 可选命名参数:`{param1, param2, ...}`
```js
printPerson(String name,{int age,String gender}) {
  print("name=$name,age=$age,gender=$gender")
}
printPerson('李四',age:20)
```
打印出来的是没有`gender`这个字符串的,为空.因为没有指定对应的参数名字.
### 可选位置参数:`[param1, param2, ...]`
```js
printPerson(String name,[int age,String gender]) {
  print("name=$name,age=$age,gender=$gender")
}
printPerson('李四',20)
```
和上个例子输出结果是一样的,但是不需要指定名称,而是通过位置定位.

## 默认参数值

使用`=`指定参数默认值.
```js
printPerson(String name = '张三',[int age=30]) {
  // ...
}
```
## 方法对象

方法是一个叫做`function`的对象.

