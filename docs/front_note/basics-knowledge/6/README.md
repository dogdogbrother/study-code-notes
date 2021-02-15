# 你不知道的 Chrome 调试技巧

## copy(...)
假如在 console 输入 locatiob，会输出一大堆东西，太多了很难复制，我们就可以使用 `copy(locatiob)`,粘贴板就会把全部内容都复制住。

## Store as global (存储为一个全局变量)
假如在 console 输入 `[1,2,3,4]`,可以右键这个内容，然后选择`Store as global variable`。会自动生成 `temp1` 变量，后续我们如果需要操作的话，直接用它就像行了。 

## 保存堆栈信息 Stack trace
有的时候给同事分享报错信息，用截图的形式虽然快捷，但是同事不好复制去搜索，可以右键选择 `save as ...` 来下载 `.log` 文件。

## 快捷键 --DevTools方向，控制台切换，数值调节
1. DevTools 开发的位置有可能是在下面，调试起来方便，可以用 `ctrl + shift + D` 切换位置。
> Mac上是 `!@#$⌘ + shift + D`

2. 打开控制台，如果想从 elements 切换到 console，是要用手点的，不过我们可以在`DevTools` >> `Settings` >> `Preferences` >> `*Preferences*` 中打开 `enable ctrl + 1-9 shortcut to switch panels` 选项，我们就可以用 `ctrl + 2` 来切换到控制台了。
> enable: 使能够，启动。shortcut: 快捷。panels: 面板。

3. 数值的递增/递减
当我们调节数值时，例如高度，我们可以双击数值用上下箭头来调整数值，如果想十位数调整，按住 shift 调整，百位按住 ctrl，小数位按住 alt。

## 使用 Command --截图，控制面板方向
在调试状态下，按下 ctrl + shift + p，或者在设置旁边的按钮中点击 `run command`。

1. 截屏新姿势
输入 `Capture full size screenshot` 命令进行浏览器内容的全部截屏(这可以长截屏哦)，也可以选中一个 DOM 节点后，输入 `screen` 关键字找到 `capture node screenshot` 命令来给节点截图。

2. 改变面板布局
我们在打开调试面板的时候，html预览在上面，样式面板在下面，需要拉大控制台的宽度才能左右显示，比较麻烦。  
可以输入 `layout` 命令，选择横向面板布局。`Appearance: Use vertical panel layout` 。
> Appearance: 外貌,外观

3. 主题
`theme` 命令，切换主题。

## 代码块的使用
文章的例子是写了个js的小脚本，用dom来爬到页面上所有鼓掌数，然后加起来返回下。但是这个也只是偶尔运行一下，记住一段这样的脚本会很麻烦。  
解决方法是，进入 `sources` 面板，在导航栏里选中 `Snippets` 这栏，点击 New snippet(新建一个代码块) ，然后输入你的代码之后保存，大功告成！现在你可以通过右击菜单或者快捷键： `ctrl + enter` 来运行它了.  

事实上每次使用代码片段不需要如此麻烦，只要 `ctrl + p` 打开 Command Menu，输入 `!`，就能快速选择预设代码块。

## console 中的 '$'
`Elements` 面板中， `$0` 是对我们当前选中的 `html` 节点的引用, `$1` 是上次选择节点的引用， `$2` 是上上次。
> 当然了，我们也可以 `$1.appendChild($0)` 这样操作。
1. `$` 就是 `document.querySelector` 的别名， `$$` 不仅是 `document.QuerySelectorAll`,并且它返回的是：一个节点的**数组** ，而不是一个 `Node list`.
2. `$_`,经常会通过打印查看一些变量的值，但如果你想看一下上次执行的结果，用 `$_` 就行了。

##  异步的 console
`console` 版块里面的内容其实都是默认被 `async` 包裹的，你可以直接 `awit fetch(...)` 来得到结果。  

## 更多的 console 操作

### console.assert
经常有种需求，就是判断一个值是否为 `true`，是的话就打印。我们可以利用 `console.assert` 避开 `if` 语句。
> 当我们传入的第一个参数为**假**时，`console.assert` 打印跟在这个参数后面的值. assert: 断言。
```js
const value = null
console,assert(value, '打印成功')
```

### 增强 log 的阅读体验
如果我们正常的打印多个变量，`console.log(value1, value2, value3)`，观感非常差，我们可以使用ES6的小技巧增强观感：
```js
console.log({value1, value2, value3})
```

### 用 table 显示打印内容
平时我们经常 `console.log`，但是对于 json 或者 数组格式的数据，其实更应该用的是 `console.table()`(是不推荐的API，随时会被停掉)。  
显示出的table表单能缩放还能排序，还可以通过传入第二个参数(数组)来控制table的表头:
```js
const a = [{ a:1, b:2 }]
console.table(a, ['a'])
// 输出只有a表头的数组表格
```

### 上面两个功能结合一下
```js
console.table({value1, value2, value3})
```

### 给 logs 加上时间戳
`ctr + p`，或者 F1 或者 `⋮` 中开启Commands Menu,找到**show timestamps**并开启，所有的 log 日志都会有时间戳。

### 监测执行时间
* `console.time()` — 开启一个计时器
* `console.timeEnd() `— 结束计时并且将结果在 console 中打印出来
如果是多个 log，可以传入不同的标签值。(例如: `console.time('loading')` ，` console.timeEnd('loading')` )

### 给 console.log 加上 CSS 样式
如果你给打印文本加上 %c 那么 console.log 的第二个参数就变成了CSS 规则。   
```js
console.log('%c牛逼','font-size: 50px; color: red;')
```

## 重新发送 XHR 请求
以前是刷新页面，也可以右键 Network 中的请求，选择 Replay XHR.

## 通过 'h' 来隐藏元素
按一下 'h' 就可以隐藏你在元素面板中选择的元素。再次按下 'h' 可以使它出现。某些的时候这很有用：例如你想截图，但你想去掉里面的敏感信息。

## 颜色选择器
平时我们想知道文字的颜色很好操作，但是想知道图片的颜色就会很僵硬。在style面板具体样式下面，鼠标悬浮 `⋮` 就能选择颜色选择器。

> chrom版本不一样,有的是点击style中的色块唤起颜色选择器。





