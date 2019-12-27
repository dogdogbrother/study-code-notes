# Vue 的构造器——extend 与手动挂载——$mount

extend 和 $mount 这两个vue内置 API 并不常用(如果出现基本都是成对的),是因为在业务开发中，基本没有它们的用武之地，但在独立组件开发时，在一些特定的场景它们是至关重要的。

## 使用场景

在写完 Vue 项目的时候,不论是 CDN 还是 webpack,都会有一个根组件:
```html
<body>
  <div id="app"></div>
</body>
<script>
  const app = new Vue({
    el: '#app'
  });
</script>
```
```js
import Vue from 'vue';
import App from './app.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});
```

因为 vue 只有一个根组件 `#app` ,所有的内容都是根据组件的形式有序的进行填入渲染.
