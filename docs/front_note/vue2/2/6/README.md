# Vue 的构造器——extend 与手动挂载——$mount

extend 和 $mount 这两个vue内置 API 并不常用(如果出现基本都是成对的),是因为在业务开发中，基本没有它们的用武之地，但在独立组件开发时，在一些特定的场景它们是至关重要的。

>extend延伸，扩展的意思。

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

因为 vue 只有一个根组件 `#app` ,所有的内容都是根据组件的形式有序的进行填入渲染.比如你要使用一个组件 `<i-date-picker>`，渲染时，这个自定义标签就会被替换为组件的内容，而且在哪写的自定义标签，就在哪里被替换。换句话说，常规的组件使用方式，只能在规定的地方渲染组件。

通常来讲这样是没问题的，但是有些需求就很难去实现：
1. 组件的模板是通过调用接口从服务端获取的，需要动态渲染组件。(正常的组件是通过vue打包后生成了常规组件，你异步过来的组件就没经过编译这步。)
2. 实现类似原生 window.alert() 的提示框组件，它的位置是在 `<body>` 下，而非 `<div id="app">`，并且不会通过常规的组件自定义标签的形式使用，而是像 JS 调用函数一样使用。(在JQ时代，利用操作dom来实现dialay的none和block，但是不太vue了。)

## 用法
创建一个 Vue 实例时，都会有一个选项 el，来指定实例的根节点，如果不写 el 选项，那组件就处于未挂载状态。

`Vue.extend` 的作用，就是基于 Vue 构造器，创建一个“子组件”。再配合 `$mount` ，就可以让组件渲染，并且挂载到任意指定的节点上，比如 body。

```js
import Vue from 'vue';

const AlertComponent = Vue.extend({
  template: '<div>{{ message }}</div>',
  data () {
    return {
      message: 'Hello, Aresn'
    };
  },
});
```