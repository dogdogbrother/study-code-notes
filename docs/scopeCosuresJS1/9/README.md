# 混合对象"类"
> **这章就别看了,繁琐的很**  
作者更多的是站在面向对象语言的层面讲JS是如何不同的,然而这并不是我所关心的

## 类理论
面向对象编程强调的是数据和操作数据的行为本质上是互相关联的,举例来说:

用来表示一个单词或者短语的一串字符通常被称为字符串。字符就是数据。但 是你关心的往往不是数据是什么，而是可以对数据做什么，所以可以应用在这种数据上的 行为（计算长度、添加数据、搜索，等等）都被设计成 String 类的方法。

我们常说的是面向对象设计模式，比如*迭代器模式*、*观察者模式*、*工厂模式*、*单例模式*，等等。事实上,"类"本身就是一种基础的设计模式.

面向对象编程是可选的,有些语言（比如 Java）并不会给你选择的机会，类并不是可选的——万物皆是类。其他语 言（比如 C/C++ 或者 PHP）会提供过程化和面向类这两种语法，开发者可以选择其中一种 风格或者混用两种风格。

## JavaScript中的“类”

虽然JavaScript中有`new`和`instanceof`,而且 ES6 也新增了`class`关键字.但这只是让JS看着像类,但是在近似类的表象之下，JavaScript 的机制其实和类完全不同。

## 类的机制

## 混入

### 1. 显示混入

来个非常简单的`mixin(..)`例子
```js
function mixin( sourceObj, targetObj ) {
    for (var key in sourceObj) {
        // 只会在不存在的情况下复制
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
}

var Vehicle = {
    engines: 1,
    ignition: function() { 
        console.log( "Turning on my engine." ); 
    },
    drive: function() {
        this.ignition(); 
        console.log( "Steering and moving forward!" ); 
    }
}

var Car = mixin( Vehicle, 
    { 
        wheels: 4, 
        drive: function() { 
            Vehicle.drive.call( this ); 
            console.log( "Rolling on all " + this.wheels + " wheels!" ); 
        } 
    } 
);
```
**代码分析:** 我们定义了一个mixin函数,这个函数接受2个对象,他的做法遍历一个对象,假如这个对象的key在第二个对象是不存在的,给把这个属性赋值给第二个对象.最后返回第二个被扩展后的对象.





