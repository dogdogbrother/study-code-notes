# 配置electron开发环境

通常来讲，应该是有一个脚手架工具，然而并没有。。。

不过仔细想想也是情有可原，毕竟electron里面有可能会用vue或者react等，如果里面的项目用了脚手架而架子也用了脚手架，想想就知道多容易冲突。

如果你想直接简单的起个工程，可以clone官方在github上的项目，[electron-quick-start](https://github.com/electron/electron-quick-start)。

然后`npm install`就好了，不过安装过程会很慢，因为光是Chromie内核，就差不多要50MB了。。。

>18年我安装electron还挺顺利的，现在2020年反而安装不上，electron命令是坏的。。。本以为是因为npm垃圾的原因，换成了yarn安装还是不行。。。折腾了半天发现要安装低版本的才行。。 `npm install electron@6.1.1 --save-dve`

**然后运行npm start才成功。**

>然而很可惜，这样操作是不对的，虽然可以这样起electron项目，然后项目里面放打包好的html文件，但是就没法开发了，不能调试前端和electron之间的通讯。  
所以正确的方法其实是起前端项目，在里面安装electron。

不过这样操作一遍是有必要的，你就可以知道electron项目的目录结构，入口文件等信息了。

## 正式开发配置环境
1. `create-react-app my-post`

2. `npm i electron --save--dev`

为什么只在dev环境下使用呢？是因为正式环境是打包好的electron软件了啊。注意要是安装不上可以尝试更换版本。

3. `npm i electron-is-dev --save--dev`

electron需要知道当前是否为测试环境，因为测试环境指向的文件是localhost:3000，而正式环境指向是index.html。

3. 开始编写electron入口文件main.js
```js
const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true
        }
    })
    const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
    mainWindow.loadURL(urlLocation)
})
```
4. 修改package.json文件，添加electron相关命令。

首先要添加`"main": ""main.js`,然后在script里面添加dev命令，`"dev": "electron ."`。

这样我们就可以先start，再dev就行了。 

5. 明显这样做是不完美的，我们要有顺序的打开运行2个命令行，并且等start好了再dev。

解决的第一反应是把命令里面带上&符号来执行2个命令，事实上我在自动化部署的shell命令里面就是这么写的，然而这样也是不完美的，首先这种写法Windows不支持，其次electron命令比react命令快，这就导致了electron窗口是空白的（start还没成功）。

windows兼容解决方案是concurrently插件，`yarn add concurrently --save-dev`。
```json
{
    "dev": "concurrently \" electron .\" \"npm start\""
}
```
>concurrently正常的用法是 `concurrently "命令1" "命令2"`，`\"`是转译字符。

依次顺序调用解决方案是 **wait-on** 插件，`yarn add wait-on --save-dev`.
```json
{
    "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"npm start\""
}
```
`&&`是 wait-on 的语法，他监听了本地的3000端口，当3000端口准备就绪了，再执行`electron .` 命令。

6. 最后禁止下浏览器自动开启就ok了。

这样是要通过环境变量`BROWSER=none`控制的，但是window下环境变量是`%ENV-VAR%`，linux下是`$ENV-VAR`，两者是不兼容的，所以就又需要一个插件`cross-dev`.(koa2知乎项目中也用到了这个插件)
```ssh
yarn add cross-dev --save-env`
```
```json
{
    "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"cross-env BROWSER=none npm start\""
}
```

## 开发测试工具Devtron
```ssh
yarn add devtron --save-dev
```
官方提供的开发工具，也是集成在开发者工具里面的，可以看进程通话啊之类的很多信息。

光安装没用,我们还要在 main.js 中使用一下才行:
```js
app.on('ready', () => {

    require('devtron').install()
    //  其他的代码
    mainWindow.webContents.openDevTools()
})
```
注意一下，`mainWindow.webContents.openDevTools()`是窗口实例提供的方法，这个可以让你在开启项目的时候自动打开f12.

