# 上传图片

## koa-body 获取上传文件

koa-body 其实是 koa-bodyparser 的升级版本,koa-bodyparser 不支持文件form格式.

```sh
npm i koa-body --save
```
```js
const koaBody = require('koa-body')
const path = require('path')

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname,'/public/uploads') ,
        keepExtensions: true
    }
}))
```
multipart 是声明了支持文件格式,(像 json 格式的就是 appliction).

formidable 是个npm包,koa-body 是完全的引入了它.

uploadDir 是设置文件目录,我们用 path 指定当前目录下的`public/uploads`.

keepExtensions 是保留文件的拓展名后缀,默认是 false.

我们写一个接口和控制器测试下效果:
```js
router.post('/upload', upload)
```
```js
upload(ctx) {
    const file = ctx.request.files.file;
    ctx.body = { path: file.path }
}
```
看似没问题,但是没卵子用,因为用户得到了 path 也访问不到图片地址啊.

## koa-static 生成图片链接
```sh
npm i koa-static --save
```
```js
const koaStatic = require('koa-static')

// 注册在最上面
app.use(koaStatic(path.join(__dirname, 'public')))
```
我们让返回的不是单纯的 path,而是能直接查看的 url.

```js
const path = require('path')

upload(ctx) {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.body = { url: `${ctx.origin}/upload/${basename}` }
}
```
basename 是过滤掉路径后真正的文件名,可以自己写正则匹配.不过 path 模块提供了这样的接口,非常的方便.

ctx.origin 是我们这个后端服务的地址,这两个配合起来就能实现返回url了.



