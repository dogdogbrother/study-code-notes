# 正则和JSON


## 元字符
所谓学习正则,其实就是学习正则的 **元字符**,例如`\d`代表数字0到9
```py
import re

a = 'C0C++7jAVA8c'

r = re.findall('\d', a)
print(r) # ['0','7','8']
```
`\d`其实就是配置数字,`\D`大写的D是匹配非字符.

## 字符集
```py
a = 'abc,acc,adc,aec,afc,ahc'
```
如果我们想找到所有匹配a开头c结尾中间是cf的单词,怎么找呢?
```py
r = re.findall('a[cf]c', a)
# 输出 ['acc','afc']
```
如果我们想匹配排除cf的字符串,加上`^`即可.
```py
r = re.findall('a[^cf]c', a)
# 输出 ['abc','aec','adc','ahc']
```
如果想匹配`cdefg`四个字符,不用`'a[cdefg]c'`,可以简写为`a[c-g]c`

## 概括字符集
其实上面提到的`\d`和`\D`就是概括字符集,等同于`'[0-9]'`和`'[^0-9]'`.

`\w`能匹配单词字符,等同于`'[A-Za-z0-9_]'`.(下划线也能匹配到),`\W`和小写的相反.

`\s`匹配空白制表字符,就是类似于空格,\n,\r这种的.`\S`相反.

## 数量词
前面的正则匹配都只能匹配单个单词或数字,没啥用,当然我们可以使用多个正则组合起来,例如这样:`'[a-z][a-z][a-z]'`,就能拿到三个字符的字符串了.

当然事实上不可能这么蠢,我们可以用`{}`来达到一模一样的效果.
```py
r = re.findall('[cf]{3}', a)
```

然后又来个个新需求,有个字符串`'python 1111java678php'`,想要把语言名匹配出来.
```py
r = re.findall('[cf]{3,6}', a)
# 最短的php是3,python是6
```

## 贪婪与非贪婪
上个例子里面其实有个小问题,我们匹配的数量区间是3~6,那么pyt就应该匹配好了不会再执行了.

原因就是python默认是倾向于贪婪模式的,会尽可能的取区间最大值.

非贪婪的模式就是加个 `?` 就行了,`'[cf]{3,6}?'`

## 匹配0次或者无限次

* *匹配0次或者无线多次
* +匹配1次或者无线多次
* ?匹配0次或者1 次

来个例子,'pytho0python1pythonn2'
```py
r = re.findall('python*', a)
```
输出内容`['pytho','python','pythonn']`,能匹配到`'pytho'`因为`*`是可以运行前一位的`n`可以0次的.如果想要完整的python的话,用`+`就OK了.

`?`的话,输出`['pytho','python','python']`.

>有一个疑惑的地方,这个`?`一会是非贪婪一会是匹配到底是一个东西吗?  
其实也是看前面是什么,如果前面是范围就是非贪婪,如果不是的话就是匹配规则.

## 边际匹配符
来个需求,我们要校验一个qq号,是否符合4~8位.
```py
qq = '100000001'
r = re.findall('\d{4,8}', qq)
# ['10000000'] 错的,是查找到了8位,而不是拿9位来判断..
```
其实前面的所有的案例的正则其实都是不太符合,因为他们都是从字符串中去查找和截取,并不是整个拿来进行匹配判断.所以这里需要的是边界匹配符.
```py
r = re.findall('^\d{4,8}$', qq)
# [] 正确
```
`^`的意思是从字符串的开头匹配,`$`相反,从结尾处匹配.

## 组
有个字符串是`'PythonPythonPythonPython'`,我们如何判断是否有连续的3个`'Python'`呢?

当然你可以用`('PythonPythonPython', str)`,但明显这样是不对的.我们前面有个例子是这样的`'Python{3}'`,不过这样匹配的结果就是`'Pythonnn'`.

我们可以使用`()`组的概念.
```py
r = re.findall('(python){3}', qq)
```
>前面有`[abc]`,或者匹配.  
这里有`(abc)`,并且匹配.

## 匹配模式参数
`re.findall()`还有第三个参数,例如加上`re.I`的话就能让我们匹配字母忽略大小写.

可以使用多种模式,用`|`连接.`re.findall('c#', str, re.I | re.S)`.

`re.S`模式的作用是生效一个概括字符集`.`,作用是匹配换行符\n之外其他所有字符.
```py
lanuage = 'PythonC#|nJavaPhp'
re.findall('c#.{1}',lanuage. re.I | res.S)
# ['C#|n']
```

## re.sub 正则替换
上面所有的正则介绍`re.findall`都是用来查找,如果是想用来替换,就要用到`res.sub`了.
```py
lanuage = 'PythonC#|nJavaPhp'
re.sub('C#', 'Go', lanuage, 0)
# ['C#|n']
```
第一个参数是查找的内容,第二个是替换的内容,第三个是目标值,第四个默认是0,意思是无线替换下去,如果是1的话,就替换成功一次就不再替换了.

>上述例子也可以用`lanuage.replace('C#', 'Go')`代替,效果是一样的.

正则替换功能是比较灵活的,第二个参数可以为一个函数,通过函数的参数,更加灵活的使用`return`来替换内容.