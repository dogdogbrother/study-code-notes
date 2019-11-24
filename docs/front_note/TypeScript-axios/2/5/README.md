# 函数

函数章节中的内容是不多的,和js是差不多的,而且例如 **可选参数/默认参数/剩余参数** 这些语法我们在前面 **类型** 的章节中是一样的.

## this
this的存在也是和js一样的,this的指向其实是在运行时才能得知(可以查看你不知道的js上册中关于this的讲解).

ts的优势就是在编译的时候就能检查到错误,那么ts中对this的使用是怎么优化的呢?

我们先看一个例子.
```ts
function log(this: void,log: string) {
  // 确保“this”在此独立函数中不可用
  console.log(log)
}
log('测试this')
```
这行代码是能正常运行的,函数中是不能使用this的,因为this的类型是空值.而且我们发现,`this`是在一位的,但是却不是参数.
这个就是 **ts中对this的优化,ts是可以显性的为指定this**.

再写一个复杂一点的例子,既然能指定`this`,就让`this`指向一个接口.
```ts
interface Dog {
  age: number
  name: string
  introduce: (this: Dog) => void
}
let dog2: Dog = {
  age: 27,
  name: '森林',
  introduce: function (this: Dog){
    console.log('我'+this.age+',叫'+this.name)
  }
}
dog2.introduce()
```
>说实话这么写太麻烦也太笨重了,把`this`灵活的特性直接给干没了...

## 重载
js本身是个动态语言很灵活,如果我们想给一个函数传入一个数字就返回一个字符串,如果传入字符串就返回数字,很容易就做到了.

但是在ts中有不行,因为有参数有类型检查,返回值也有类型检查.不过我们可以使用重载还实现这种需求的兼容.
```ts
function numberOrString(n: number): string

function numberOrString(n: string): number

function numberOrString(n): any {
  if(typeof n === 'number'){
    return '你传入的是数字'
  }else{
    return 999
  }
}
console.log(numberOrString(1)) // 输出 你传入的是数字
console.log(numberOrString("1")) // 输出 999
```
这样改变后，重载的 `numberOrString` 函数在调用的时候会自动选择正确的类型检查。

