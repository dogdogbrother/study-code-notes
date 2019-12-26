# 参数校验 koa-parameter

校验参数的作用不言而喻,是必须要做的.

## 安装引用和注册
```sh
npm i koa-parameter --save
```
```js
const parameter = require('koa-parameter')

app.use(parameter(app))
```
>**有2点需要注意一下**  
因为parameter是对参数体进行校验,所以在注册的时候最好放在bodyparser注册下面.  
parameter有个参数是app,这个其实是因为提供了一些全局方法,用来需要修改程序的全局实例.

## 使用校验
在 controllers 的逻辑层去使用,举例我们在 create 接口函数里面去创建新用户,这个新用户,校验规则如下:

* name 参数为**必填**,并且必须是字符串.
* age 参数为**选填**,但是如果传的话必须为**number**

```js
create(ctx) {
    ctx.verifyParams({
        name: { type: 'string', required: true },
        age: { type: 'number', required: false }
    })
}
```
如果你传参格式有误的话,就会报**422错误**,并且会有非常详细的JSON格式的报错信息.


