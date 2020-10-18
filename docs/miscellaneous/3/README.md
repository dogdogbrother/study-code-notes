## 10-9 mateApp(笔试)

笔试的卷子没有拍照，按照记忆来的

### 1. 可以自定义标签吗，能在自定义标签上定义属性吗？
可以的,答案就是 **web component**.

其中比较核心的内容就是 **custom elements**, [MDN上的介绍](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements).

次核心的是 **attachShadow** 概念.

#### 先看下最最基本的自定义标签.
```html
<!DOCTYPE HTML>
<html>
<head>
    <title>自定义标签</title>
</head>
<body>
    <word-count text="1222"></word-count>
</body>
</html>
<script>
class WordCount extends HTMLElement {
    constructor() {
        super(); 
        var shadow = this.attachShadow({mode: 'open'});
        var wrapper = document.createElement('span');
        var text = this.getAttribute('text');
        wrapper.textContent = text;
        var style = document.createElement('style');
        style.textContent = 'span {color:red}'
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}
customElements.define('word-count', WordCount);
</script>
```
这个自定义组件的效果就是,你可以通过给自定义组件的 text 属性赋值来填充组件的innerHTML,并且颜色为红色.捋下代码:
1. `customElements.define` 接受第一个参数为标签名,主要的是,这个标签名是有要求的,必须带 **-**,第二个参数为组件的定义 class,也就是组件的内容.
2. shadow 的概念和作用不太好总结,总体而言就是,你可以把 shadow 当做一个能代表你当前类的dom,你可以给他加style或是script标签,还可以填充创建的真实dom.

除此之外,比较常用的就是slot了,不难,看下[MDN的文档就好了](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/slot)

### 2. 何时 alert
```js
let a = true
setTimeout(() => {
    a = false
}, 5000);
while(a) {}
alert(1);
```
卡死了，alert 不了，因为setTimeout是宏任务，只有代码执行完毕后才能执行alert，在while那已经卡死了。

### 3. 如何实现js的多线程,写简易代码
js提供了 **Worker** 类,当使用此类时,会向浏览器申请个新的线程用于单独执行新的文件.

线程文件里可以用 **postMessage** 推送消息,主线程可以 **onmessage** 接受消息
```js
// 主线程文件
const worker = new Worker('js文件路径');
worker.onmessage = function(event){
    console.log(event.data )
};
```
```js
// 新线程文件
setTimeout(() => {
    postMessage('发送消息给主进程');
}, 500)
```

### 4. 常见的http缓存策略(非cookie)
两个概念，协商缓存和强缓存。  
三个关键字,Etag、Cache-Control、Expires。
#### 协商缓存
假如我们重新申请index.html，请求头里面会带上上次请求的 **Etag**，服务端收到后会对比下本地的，没有改动的话就304，浏览器从本地拿资源。
#### 强缓存
1. 如果请求头携带 **Cache-Control** 属性，则查看`s-maxage`或者`max-age`值是否过期，未过期就从本机里面拿。
2. 如果请求头没有 **Cache-Control**，则看 **Expires** 的时间是否过期。注意的是，**Cache-Control** 的优先级比 **Expires** 高。
#### 前端能做的缓存优化
可以在webpack中配置 contentHash，只有当内容改变的时候才会更新文件名。

#### service worker离线缓存
**service worke** 可以拦截http请求，响应的内容的逻辑可以写在本地的js文件中。

### 5. 画个三角形的canvas,颜色为绿色.
可以看下[API](https://www.w3school.com.cn/tags/html_ref_canvas.asp),实现流程如下:
1. 创建 **canvas** 元素，并在js中获取到。
2. 拿到对应的上下文，`const ctx = dom.getContext('2d')`。后续我们操作 **ctx** 即可。
3. `beginPath()`开启一条线路，用 `lineTo(坐标, 坐标)` 画出三条线，然后设置 `fillStyle` 为绿色，在用 `fill()` 填充就ok了。

全部代码:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>canvas画绿色三角形</title>
    <style type="text/css">
      div {
        text-align: center;
        margin-top: 25px;
      }
      #clock {
        border: 1px solid #ccc;
      }
    </style>
  </head>
  <body>
    <div>
      <canvas id="clock" height="200px" width="200px"></canvas>
    </div>
  </body>
  <script type="text/javascript">
    const dom = document.getElementById('clock')
    const ctx = dom.getContext('2d')
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const r = width/2
    ctx.beginPath()
    ctx.lineTo(200,0)
    ctx.lineTo(0,200)
    ctx.lineTo(0,0)
    ctx.fillStyle = 'green'
    ctx.fill()
  </script>
</html>
```
### <span>点击登录</span> 手写第三方登录流程