## HTML
先写个 html，很简单。引入 **react.js** 和我们开发的 **app.js**,有一个 **root** 挂载标签。
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Sample</title>
</head>
<body>
  <div id="root"></div>
  <script src="./React.js"></script>
  <script src="./app.js"></script>
</body>
</html>
```
## app.js
app.js 内容也很简单，创建个有一点点内容的 react 组件，然后把这个组件挂载到 root 元素上。
```js
const helloWorld = React.createElement('div', null, `Hello World`);
ReactDOM.render(helloWorld, document.getElementById('root'));
```

## react 
思考下 react 应该怎么写？
* 首先要有2个对象 **React** 和 **ReactDOM**,分别有 createElement 和 render 的方法函数。
* createElement 函数通过标签名创建对应的html元素，并把内容当做 innerHTml，最后把元素信息返回给组件。
* render 做的是把**有着元素内容的组件** append 到根元素上。
```js
function createElement(parentEle, props, childEle) {
    let parentElement = document.createElement(parentEle);
    parentElement.innerHTML = childEle;
    return parentElement;
}
function render(insertEle, rootEle) {
    rootEle.appendChild(insertEle);
}
React = {
    createElement
}
ReactDOM = {
    render
}
```

## 兼容函数组件
如果是函数组件的话:
```js
const Hello = function () {
    return React.createElement('div', null, `Hello Version2.0`);
};
```
react 把函数组件执行掉，函数自己会再次调用 createElement，最终走向最后的 dom 操作。
```js
function createElement(parentEle, props, childEle) {
    if(typeof parentEle === 'function') {
        return parentEle();
    } else {
        // ...
    }
}
```