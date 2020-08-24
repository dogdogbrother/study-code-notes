类组件的动态渲染，也就是数据的变化能够同步到页面上。

> 相比较前几章傻瓜式，这个有了难度。

## app.js
```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }
  onPlusClick() {
    this.setState({value: this.state.value + 1});
  }
  onMinusClick() {
    this.setState({value: this.state.value - 1});
  }
  render() {
    return React.createElement('div', null,
      React.createElement('div', null, `${this.state.value}`),
      React.createElement('button', {onClick: this.onPlusClick.bind(this)}, '+'),
      React.createElement('button', {onClick: this.onMinusClick.bind(this)}, '-')
    );
  }
}
let myCounter = React.createElement(Counter,null,null);
ReactDOM.render(myCounter, document.getElementById('root'));
```
写了2个button，点击button可以加减数值，数值被渲染到一个div中。

## react.js
先思考下 react 应该多出写什么新功能：
1. `this.setState` 函数是继承 React.Component 的，所以 Component 中要定义这个方法。
2. 难点在于，`this.setState` 执行后，如果更新视图呢?

解决方案如下：
1. 在 react.js 中新建2个变量，一个记录我们需要渲染的react组件 rootReactElement，一个记录根组件 rootElement。
2. 当我们执行了 setState 函数后，触发一个 reRender 函数，这个函数会遍历根组件 rootElement，如果有子组件就给他移除掉。
3. 然后再执行 render 函数，把记录的 react组件 rootReactElement 重新挂上去。

问题又来个一个，重新挂载后，createElement 创建节点函数怎么重新执行呢？  
答案是我们要在 render 函数中，appendChild 挂载的时候去执行 class组件的 `render()`,而组件的 `render()` 里面 return 了 `React.createElement(...)`,这样就重新执行了 createElement 渲染函数了。

```js
let rootElement, rootReactElement;
// React基础组件库
class Component {
  constructor(props) {
    this.props = props;
  }
  setState(state) {
    this.state = state;
    reRender();
  }
}

// React.createElement
function createElement(parentEle, props, ...childEles) {
  if (typeof parentEle === 'function' && /^\s*class\s+/.test(parentEle.toString())) {
    // 当为类组件时
    let component = new parentEle(props);
    return component; // 注意，这里变了
  } else if (typeof parentEle === 'function') {
    // 当为函数组件时
    return parentEle(props);
  } else {
    // 当为html标签组件时
    let parentElement = document.createElement(parentEle);
    Object.keys(props || {}).forEach(key => {
      switch(key) {
        case 'onclick':
          parentElement.addEventListener('click', props[key]);
          break;
        case 'onClick':
          parentElement.addEventListener('click', props[key]);
          break;
        default:
          break;
      }
    });
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
  rootElement = rootEle;
  rootReactElement = insertEle;
  rootEle.appendChild(insertEle.render()); // 注意，这里变了
}

function reRender() {
  while(rootElement.hasChildNodes()) {
    rootElement.removeChild(rootElement.lastChild);
  }
  ReactDOM.render(rootReactElement, rootElement);
}

React = {
  createElement,
  Component
}
ReactDOM = {
  render
}
```

## 处理下不同类型组件的兼容
经过上面的改造，组件的渲染都依赖组件 `render()`,但是函数组件没有 `render()`,所以要在 createElement 里面给 class 的组件设置个标签属性。  
这样在 render 时，如果是class 组件就 `rootEle.appendChild(rootReactElement.render())`,不是的话 `rootEle.appendChild(currentEle)`。
```js
// 防止局部变量污染全局，只暴露全局的方法
(() => {
  let rootElement, rootReactElement;
  const REACT_CLASS = 'REACT_CLASS'; // 这个就是标签属性的变量
  // React基础组件库
  class Component {
    constructor(props) {
      this.props = props;
    }
    setState(state) {
      this.state = state;
      reRender();
    }
  }
  // React.createElement
  function createElement(parentEle, props, ...childEles) {
    if (typeof parentEle === 'function' && /^\s*class\s+/.test(parentEle.toString())) {
      // （一）、当为类组件时
      let component = new parentEle(props);
      component.type = REACT_CLASS; // 这里改了，主要是class的就给他赋值
      return component;
    } else if (typeof parentEle === 'function') {
        // （二）、当为函数组件时
      return parentEle(props);
    } else {
      // （三）、当为html标签组件时
      let parentElement = document.createElement(parentEle);
      Object.keys(props || {}).forEach(key => {
        switch(key) {
          case 'onclick':
            parentElement.addEventListener('click', props[key]);
            break;
          case 'onClick':
            parentElement.addEventListener('click', props[key]);
            break;
          default:
            break;
        }
      });
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
    rootElement = rootEle;
    rootReactElement = insertEle;
    // 这里判断下
    let currentEle = rootReactElement.type === 'REACT_CLASS' ? rootReactElement.render() : rootReactElement;
    rootEle.appendChild(currentEle);
  }

  function reRender() {
    while(rootElement.hasChildNodes()) {
      rootElement.removeChild(rootElement.lastChild);
    }
    ReactDOM.render(rootReactElement, rootElement);
  }

  window.React = {
    createElement,
    Component
  }
  window.ReactDOM = {
    render
  }
})();
```
