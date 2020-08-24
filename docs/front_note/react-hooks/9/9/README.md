**className** 和 **style** 和 **href** 也都是元素上的属性，和事件没有什么不同，处理起来只不过多加一个 **else if** 而已。这里写个案例，方便复制粘贴。  

## index.html
```html
<!-- ... -->
<style>
  .common-class {
    color: red;
  }
</style>
```
## app.js
```js
const ReactEle = React.createElement('div', {
    className: 'common-class', 
    style: {marginTop: '100px',color: 'blue', border:'1px solid solid'}},
    '我是一个有样式的span标签');
ReactDOM.render(ReactEle, document.getElementById('root'));
```

## react.js

```js
Object.keys(props || {}).forEach(key => {
  if(/^on.*$/.test(key)) {
    // ...
  } else if(key ==='className') {
    parentElement.setAttribute('class',props[key]);
  } else if(key ==='style') {
    Object.keys(props[key]).forEach(attr => 
      parentElement.style[attr] = props[key][attr]
    );
  }else {
    // 添加其他如href等属性直接添加进来
    parentElement.setAttribute(key, props[key]);
  }
});
```