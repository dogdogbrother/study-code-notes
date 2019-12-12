# 分支/循环/条件/枚举

## 分支 if
python中代码块不是通过`{}`这种的,而是通过四个空格的缩进来识别的.
```py
mood = False

if mood :
    print('我是真')
else :
    print('我是假')
```
>这里有个问题,如果我缩进后什么都不做呢?这代码就会看起来怪怪的,python提供一个`pass`关键字,用于空语句/占位语句.

## 循环 while for
### 先看下`while`的使用代码:
```py
counter = 1

while counter < = 10 :
    counter += 1
    print(counter)
```
输出了2到11.

大部分的场景下,都会使用for循环,不过需要递归的时候,用while更舒服一些.
### 再看下`for`的使用代码:
```py
a = ['apple','orange','banana']
for x in a:
    print(x)
else: 
    print('当循环结束后,执行这里')
```
依次输出每个水果.

>这里`a`是一个List,但是如果只想循环10次,可以使用`x in range(0,9)`.  
这里就遍历了0~9