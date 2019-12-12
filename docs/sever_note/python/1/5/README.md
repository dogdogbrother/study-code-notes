# 包/模块/函数

## 包和导入模块

假如你当前的文件同级下面有个`c7.py`文件,导入代码如下:
```py
import c7
print(c7.a)
```
`c7.a`中的`a`就是`c7.py`文件里面定义的变量`a`.
>vscode下import可能会报错,是bug,请忽略

如果不是同级文件,需要路径呢?
```py
import t.c7
print(t.c7.a)
```
>可以发现,py是通过命名空间的形式进行导入,而不是路径的形式.

也可以使用`as`来重命名`import t.c7 as all`.

有个问题,不是每个文件夹都是可以用来当包用的,如果你在文件目录下新建一个`_init_.py`文件才行,这个文件可以是空文件.

## 导入具体的变量

如果我们不想引入整个文件作为模块,而是只是想引入文件中的某个变量怎么做呢?
```py
from t.c7 import a
print(a)
```

还可以这样使用
```py
from t import c7
print(c7.a)
```

我们还可使用`*`还控制引入,假如我们`c7.py`里面有`a`,`b`,`c`,如果想全引进来可以这样用:
```py
from t.c7 import *
print(a)
print(b)
print(c)
```

很明显这样有点不科学,其实我们还可以在`c7.py`中定义`*`包含了什么.
```py
_all_ = ['a','b']
a = 2
b = 3
c = 4
```

还可以这样:
```py
from t.c7 import a,b,c
```
## _init_.py 文件
上面说了,如果定义一个包的话,就要在这个包的目录下新建`_init_.py`文件.

当你import包或模块中的变量的时候,这个`_init_.py`就会被执行一次,像设置`_all_`属性啊之类的都可以.(但是数组中就不是变量,而是文件名了)

这个特性非常有用!!

## 换行问题
如果一行代码太长了需要换行,可以这么操作
```py
from t.c7 import a,b,\
c
```
还可以使用`()`换行
```py
from t.c7 import (a,b,
c)
```

## 函数

用`def`定义函数,默认`return None`.看个基础代码:
```py
def add(x,y):
    result = x + y
print(add(1,2)) # 输出3
```
## 关键字参数
python为了可读性,还可以这样使用函数参数:
```py
def add(x,y):
    result = x + y
print(add(y=2,x=1)) # 输出3
``` 
这样即使你不看函数内部的实现也能猜出个大概,这就大大提升了可读性.而且还不用依赖参数的位置...

## 默认参数
和其他语言一样喽..
```py
def add(x=1,y=2)
    result = x + y
print(add()) # 输出3
```