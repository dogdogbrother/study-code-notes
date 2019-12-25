# 错误处理

## koa-json-error

从中间件的名字上就能看出来,这是个专门对 **JSON** 格式数据的错误处理工具.

先安装引用和注册:
```sh
npm -i koa-json-error --save
```
```js
const error = require("koa-json-error")

app.use(error())
```
这个时候如果你请求了一个 **404** 接口的话,会发现除了返回404状态码外,还给提供了JSON格式的返回数据.

除了404,412/500等等错误都是默认帮你处理好的,非常的舒服. 

## 错误堆栈 stack

举个服务区500错误的返回信息吧.

```json
{
    "name": "ReferenceError",
    "message": "a is not defined",
    "stack": "ReferenceError: a is not defined\n at find(D:\\code\\zhihu\\app...)",
    "status": 500
}
```
**stack** 字段会把具体的报错信息都返回给客户端,这样虽然便于调试,但是不安全(把目录信息都暴露了),所以线上环境是一定要禁止返回 **stack** 字段的.

做法很简单,配合 **koa-json-error** 自带的API参数配置和**环境变量**相互配合即可实现.
```js
app.use(error({
    postFormat: (e, {stack, ...rest})=> process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}))
```
`koa-json-error`方法接收一个回调函数,第一个参数是error错误信息本身,第二个参数利用了解构语法反操作把全部的字段参数都重命名了.

通过判断`process`环境变量,来确定是否返回`stack`.(也是利用了解构语法)

## 环境变量的设置 cross-env

很明显,环境变量还没设置过,是缺失的.

正常来讲,环境变量直接在`package.json`中写就行了:
```json
{
    "script":{
        "dev": "NODE_ENV=dev nodemon app",
        "start": "NODE_ENV=production app"
    }
}
```
但是在Windows电脑中这么写是会报错的,所以我们可以使用一个比较好用的插件: **cross-env**
