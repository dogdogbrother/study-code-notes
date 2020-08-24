## app.js
```js
const HelloVersion3 = function () {
    return React.createElement('div', null, `版本2.0`);
};
const helloWorld1 = React.createElement(HelloVersion3, null, null);
const helloWorld2 = React.createElement(HelloVersion3, null, null);
const divEle = React.createElement('div', null, `我被一个div标签包裹`);
const parent = React.createElement('div', null,
  helloWorld1,
  helloWorld2,
  divEle,
  `我是文本内容哦`
);
ReactDOM.render(parent, document.getElementById('root'));
```
没有什么好说的，就是 createElement 参数传入更多为组件的参数(也可以是字符串，也就是自身的内容)。

## react.js
其实认真思考下就发现，与上一章的相比，只有两个不同：
1. 参数的数量不等。
2. 参数有可能是组件，也有可能是字符串。

问题是比较好解决的，用es6的 `...childEles` 就能得到参数中子组件的数组，然后遍历他，如果是 string 就 innerHTML ,如果是 Object 就 append。

```js
function createElement(parentEle, props, ...childEles) {
  if(typeof parentEle === 'function') {
    return parentEle();
  } else {
    let parentElement = document.createElement(parentEle);
    childEles.forEach(child => {
      if(typeof child === 'string') {
        parentElement.innerHTML += child;
      } else if(typeof child === 'object') {
        parentElement.appendChild(child);
      }
    });
    return parentElement;
  }
}
// ...
```
