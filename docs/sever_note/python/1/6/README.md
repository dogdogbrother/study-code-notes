# 面向对象

## 基础类
```py
class Student():
    name = ''
    age = 0

    def print_file(self):
        print('name' + self.name)

student = Student()
student.print_file()
```
>和js差不多又不一样,生成实例的时候不需要`new`关键字,`self`就是`this`.

## 构造函数
`_init_`是构造函数
```py
class Student():
    name = ''

    def __init__(self,name):
        self.name = name
        print('我就是构造函数')

student = Student('senlin')
print(student.name) # 输出senlin
```

## 成员可见性
私有属性和方法很好定义,属性和方面名前面是双下划线就行了,`__name`这样..

这里有个坑,当你尝试`student._name = 'gou'`,还是能成功的..说好的私有变量呢?什么情况??

这个是因为`_name`其实是因为你在赋值的时候新加的属性,而你原来的`_name`其实已经被python偷偷改名为`_Student_name`了..

又一个问题来了,`student._Student_name = 'gou'`可以吗?可以..

写python要看自觉啊
