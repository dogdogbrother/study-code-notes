## 文件上传
其实没什么好说的，课程里面对于文件的存放处理我觉得也挺傻的。  
主要是用到了2个工具，`formidable-upload-koa` 和 `fs-extra`.

## formidable-upload-koa
使用此中间件后，就可以在 `ctx.req.files['file']` 中拿到上传文件到临时文件夹中的路径信息。
```js
// ...
const koaFrom = require('formidable-upload-koa')
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
    const file = ctx.req.files['file']
})
```

## fs-extra 
再用 `fs-extra` 对文件进行删除移动之类的操作。 `fs-extra`。
```js
// 存储目录
const DIST_FOLDER_PATH = '你自己设置的文件路径常量'
// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024
// 可以先写个兼容函数，如果目标目录不存在，就创建该目录。
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})
async function saveFile({ name, type, size, filePath }) {
    if (size > MIX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 移动文件
    const fileName = Date.now() + '.' + name // 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
    await fse.move(filePath, distFilePath)
    // ...返回信息
}
```