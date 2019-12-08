# 控制语句
`if`,`for`,`for in`,`while`,`do while`,`break`,`continue`,等等和其他语言一样,不用多说.

## switch...case
这个基本也和js的差不多,其中`continue`跳转功能平时也看不到,这里提一嘴.
```dart
String language = 'java'
switch(language){
  D:
  case 'dart':
    print(1);
    break;
  case 'js':
    print(2);
    continue D
}
```
会打印 1,2,1