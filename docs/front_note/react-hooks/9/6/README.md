对于 react 而言，**事件**其实就是个**属性**，只不过**key**是关键字。

## app.js
```js
class MyButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement('button', {onclick: this.props.onClick}, `Click me`);
  }
}
const myBtn = React.createElement(MyButton, {onClick: () => alert('点击事件触发')}, null);
ReactDOM.render(myBtn, document.getElementById('root'));
```

## react.js

只需要加一个操作，就是遍历 props,如果有关键字，例如 onclick 等，就给组件 dom 上添加对应的事件。

```js
// ...
function createElement(parentEle, props, ...childEles) {
  if (typeof parentEle === 'function' && /^\s*class\s+/.test(parentEle.toString())) {
    // ...
  } else if (typeof parentEle === 'function') {
    // ...
  } else {
    // 当为html标签组件时遍历key,因为组件最后都会走到这一步。
    Object.keys(props).forEach(key => {
      switch(key) {
        case 'onclick':
          parentElement.addEventListener('click', props[key]);
          break;
        default:
          break;
      }
    });
    // ...
  }
}
// ...
```