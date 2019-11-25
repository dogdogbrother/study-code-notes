# 类型推断

## 基础
TypeScript里，在有些没有明确指出类型的地方，类型推断会帮助提供类型。例如:
```ts
let x = 3
// x = '' error
```

## 上下文类型
TypeScript类型检查器使用 `window.onmousedown` 函数的类型来推断右边函数表达式的类型,如果你访问了一个不存在的类型,那么就会报错.
```ts
window.onmousedown = function(mouseEvent) {
  // mouseEvent.clickTime = null  也是会报错的
  console.log(mouseEvent.clickTime)  // Error
}
```
>这个特性很有意思,我们只能使用`evnt`参数有的属性和方法,想添加都不行.如果想忽略上下文加上`any`就行了:
```ts
window.onmousedown = function(mouseEvent:any) {
  // mouseEvent.clickTime = null  ok的
  console.log(mouseEvent.clickTime)  // OK
}
```
