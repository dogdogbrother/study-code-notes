## 先看数组子元素下的 app.js
```js
const ReactEle = React.createElement('div', null, [
  React.createElement('span',null, '你好！'),
  React.createElement('span',null, '啊...')
]);
ReactDOM.render(ReactEle, document.getElementById('root'));
```

## react.js
感觉没啥可思考的，简单的很。反正都是 `parentElement.appendChild()`,判断下，如果是数组就 forEach 的 appendChild，不是的话直接 appendChild。
```js
function createElement(parentEle, props, ...childEles) {
  if (typeof parentEle === 'function' && /^\s*class\s+/.test(parentEle.toString())) {
    //...
  } else if (typeof parentEle === 'function') {
    //...
  } else {
    //...
    childEles.forEach(child => {
      if(typeof child === 'string') {
        // (1)当子元素是一个字符时
        parentElement.innerHTML += child;
      } else if (Array.isArray(child)) { //此处更改
        // (2)当子元素是一个数组中包含多个Node节点时
        child.forEach((childItem) => parentElement.appendChild(childItem)); 
      } else if(typeof child === 'object') {
        // (3)当子元素是一个Node节点是直接附加到父节点
        parentElement.appendChild(child);
      }
    });
  }
}
```

## 多事件 app.js
```js
const ReactEle = React.createElement('input', {onFocus: function(){console.log('我被聚焦了')}});
ReactDOM.render(ReactEle, document.getElementById('root'));
```

## 多事件 react.js
以前写了 onClick，是用的 switch 判断的，然后事件一共有几十种，写几十个 case 也不现实。可以用判断 class 的方法，如果是 on 开头的属性，我们都给他注册事件。然后用 `slice(2)` 方法把 on 去掉，再转小写，就是事件名了。
```js
// ...
Object.keys(props || {}).forEach(key => {
  if(/^on.*$/.test(key)) {
    eventName = key.slice(2).toLowerCase();
    parentElement.addEventListener(eventName, props[key]);
  }
});
```
