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

### 画个三角形的canvas,颜色为绿色.

### <span>点击登录</span> 手写第三方登录流程