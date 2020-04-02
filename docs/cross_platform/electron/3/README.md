# electron核心概念

核心概念其实就是3个。
1. 提供了多进程，并且有一个main主进程。
2. 让网页支持了node的调用和语法。
3. 提供了多进程之间的通讯。
4. 自身提供了API。

## 创建窗口BrowserWmdow

electron项目的入口文件就是 main.js,我们把内容全部删除，手写一下，用于了解 electron 整体结构。

```js
// 这个不用说，导入app程序主体和窗口程序
const {app, BrowserWindow } = require('electron')

// app监听一个事件，当electron加载完成后，执行函数
app.on('ready', () => {
  // new一个窗口进程出来
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // 自动配置一些设置 Preferences 首选项的意思
    webPreferences: {
      // 因为要在程序页面里面使用node，所以这个要开启
      nodeIntegration: true
    }
  })
  //让窗口加载一个html文件
  mainWindow.loadFile('index.html')
})
```
这样我们就能运行一个electron项目了，我们可以再添加一点东西，在开启的窗口中再开启一个子窗口：
```js
app.on('ready', () => {
  // ... 从上面那个例子接着往下写
  const secondWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    parent:mainWindow
  })
  secondWindow.loadFile("second.html")
})
```
测试，OK。

## nodeIntegration作用

这样开启的electron项目页面还和我们浏览器打开的页面是有所区别的。

假如我们的 index.html 文件加载了一个有node语法的js文件，浏览器环境是不可以的，但是因为我们配置了`nodeIntegration`，所以electron里就没问题。

## IPC通讯

我们利用IPC的形式让两个进程之间通讯，一个是页面的js发送事件，一个是main.js主进程接受事件并给出响应。

就不写特别基础的功能代码了，意思到了就行，先写页面js:
```js
const { ipcRenderer } = require('electron')

ipcRenderer.send('message', 'hello from renderer')
```

可以看到很简单，然后我们在main主进程里面用 on 接受下这个事件就行了：
```js
const { app, BrowserWindow, ipcMain } = require('electron')

app.on('ready', () => {
  // ...
  ipcMain.on('message', (event, arg) => {
    console.loh(arg)  //  就是我们传过来的hello
    event.reply('reply,我受到信息了')
  })
})
```
仔细一想，好像页面进程还没有on事件还接收main进程的reply，补上：
```js
ipcRenderer.on('reply', (event, arg) => {
  console.log(arg)  //  这就受到了
})
```

## remote实现跨进程访问

这次我们的需求是，当我们点击一个按钮，调用一个事件，新建一个窗口：
```js
const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width:800, height:600 })
win.loadURL('https://baidu.com')
```

这就完事了。