
## 技术选型概述.

node基本就是express,koa2,egg三种了.
express比较老了,在逻辑处理上用的回调函数的形式.
koa2是express原版人马打造,以精简轻量为特点.
egg是阿里对koa2的再次封装.

鉴于是学习的角度,我们使用koa2,自己会做一些封装达到类似于egg的功能.

数据库mysql

登录session

前端ejs后端模板引擎

缓存redis,没有对手

单元测试jest,也基本没有对手.

## 安装
```sh
npm i -g koa-generator 
koa2 -e koa2-weibo-code
cd koa2-weibo-code && npm i
```
`-e`的意思是用 ejs 模式.运行`app.js`,访问3000端口即可.

我们还需要设置环境变量,先安装个工具:
```sh
npm i cross-env -D
```
修改package.json中的scripts中的dev和prd命令:
```js
{
  ...
  "dev": "cross-env NODE_ENV=dev ./node_modules/...",
  "prd ": "cross-env NODE_ENV=production pm2 start bin/www"
}
```
## 修改下目录结构
现在不管前后端开发,都习惯有个src目录,这次也不例外,建立src目录后,把app.js/public/routes/views等文件目录全部移到src目录下.

然后不要忘了调整已有的路径,bin/www.js中的app引入修改一下.

app.js文件中有2个logger,我们删除掉第二个logger(只是中间件的演示).
