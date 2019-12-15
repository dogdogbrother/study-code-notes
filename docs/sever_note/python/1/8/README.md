# python的高级语法与用法

## 枚举是个类
想要使用,要先引入枚举类,然后继承他.
```py
from enum import Enum

class VIP(Enum):
    YELLOW = 1
    GREEN = 2
    BLACK = 3
    RED = 4

print(VIP.YELLOW) # 输出 VIP.YELLOW
```
直觉上我们认为应该输出1嗷,然而却不是.想要拿到值的话,可以`VIP.YELLOW.value`拿到1,也可以使用`VIP.YELLOW.name`拿到YELLOW.

>我有个问题,枚举和对象字典普通类有什么优势吗?  
枚举更像是常量状态下的数据格式,例如你不能修改value,不能有重复的key和value等等.

## 枚举重复的value值
```py
class VIP(Enum):
    YELLOW = 1
    GREEN = 1
    BLACK = 3
    RED = 4

print(VIP.GREEN) # 输出 VIP.GREEN
a = 1
print(VIP[a]) # 输出 VIP.YELLOW
```
当有重复的value值的时候,第二个枚举类其实是第一个枚举的别名,我们可以用`for in`来遍历下枚举.
```py
for in VIP:
    print(v)
# VIP.YELLOW VIP.BLACK VIP.RED 
```
如果你就是要拿到全部的key:
```py
for in VIP.__members__:
    print(v)
# YELLOW GREEN BLACK RED 
```

## IntEnum / unique
上面的例子中,我们的value是int,当然也可以是String.

不过当你确认就想明确的让value值必须为int,就使用IntEnum类.

上面的例子中,我们的value是重复会变成别名,如果你想让他就不能重复,可以使用装饰器`unique`.
```py
from enum import IntEnum,unique
@unique
class VIP(Enum):
    YELLOW = 1
    GREEN = 1
# 会报错的.
```