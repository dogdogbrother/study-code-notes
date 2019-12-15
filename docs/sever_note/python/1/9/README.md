# lambda和装饰器

## lambda 匿名函数
用`lambda`关键字声明匿名函数:
```py
def add(x, y):
    return x+y

f = lambda x,y: x+y
```
lambda表达式只能单一的进行返回值,而不能用代码块做复杂的运算. 

## 三元表达式
```py
x = 1
y = 3
r = x if x > y else y
```
如果x大于y就返回x,否则返回y

## map 函数
```py
list_x = [1,2,3,4]

def square(x):
    return x *x

r = map(square,list_x)
# [1,3,9,16]
```
和js的不太一样但是也差不多,如果用lambda表达式就会更简洁一些:
```py
r = map(lambda x: x*x, list_x)
```
>除了map,还有reduc,filter

## 装饰器
**装饰器其实就是对函数进行了一层封装的语法糖.**

说个需求,假如我有十个函数,每个函数都要在开始的时候打印当前时间,这个怎么写最科学呢?先来个代码例子:
```py
import time

def decorator(func):
    def wrapper():
        print(time.time())
        func()
    return wrapper

def f1()
    pass
def f2()
    pass

fn1 = decorator(f1)
fn2 = decorator(f2)

fn1()
fn2()
```
如果用了装饰器,就简洁了不少,而且可读性也更高.
```py
@decorator
def f1()
    pass
f1()
```
这个效果和上面的是一模一样的.

如果我们需要带入参数呢?参数类型个数都是不一定的,所以要用到可变参数.
```py
def decorator(func):
    def wrapper(*args):
        print(time.time())
        func(*args)
    return wrapper
```
>`args`并不是关键字.

