组件属性传参分 **函数组件** 和 **类组件**,先实现 **函数组件** 。
## aap.js
这应该算是超常见的 props 父传子参数了。
```js
const Hello = (props) => {
  const { name } = props
  return React.createElement('div', null, `这是 ${name}`);
};
const helloWorld = React.createElement(Hello, {name: '我是父给子的参数'}, null);
ReactDOM.render(helloWorld, document.getElementById('root'));
```
## react.js
```js
function createElement(parentEle, props, ...childEles) {
// ...
  else if (typeof parentEle === 'function'){
    return parentEle(props);
  }
// ...
}
// ...
```
简单到可怕，再看下 class 的 props。

## app.js
```js
class Hello extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement('div', null, `Hello ${this.props.name}`);
  }
}
const helloWorld = React.createElement(Hello, {name: '我是父给子的参数'}, null);
ReactDOM.render(helloWorld, document.getElementById('root'));
```
这就更像我们日常开发的样子了，class 组件继承 **React.Component**。

## react.js
思考下 react 应该增加些什么新的东西呢。
1. 在 React 对象上加个类 Component。
2. 组件在继承 **React.Component** 后，`super(props)` 后就能把参数挂载到 this 上，就说明挂载动作是在 `React.Component` 的 `constructor` 中的。
3. 和函数组件一样，在 new class 的时候把props传进去。
```js
class Component {
  constructor(props) {
    this.props = props; // 所以组件才要 super(props);
  }
}
function createElement(parentEle, props, ...childEles) {
  if (typeof parentEle === 'function' && /^\s*class\s+/.test(parentEle.toString())) {
    // 当为类组件时
    let component = new parentEle(props);
    return component.render();
  }else if (typeof parentEle === 'function') {
    // 当为函数组件时
    return parentEle(props);
  }else {
    // 当为html标签组件时
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
function render(insertEle, rootEle) {
  rootEle.appendChild(insertEle);
}
React = {
  createElement,
  Component
}
ReactDOM = {
  render
}
```