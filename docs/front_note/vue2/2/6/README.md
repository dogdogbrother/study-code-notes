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
再通过`$mount`来进行手动渲染。
```js
const component = new AlertComponent().$mount();
```
`component`就是一个标准的Vue组件实例了，但是它仅仅是被渲染了，还没有挂载到节点上。
>通过查看评论我们发现这种说辞是不对的，应该是------文档里是说组件被挂载到文档之外的元素，后续需要调用原生DOM api插入到文档中
```js
document.body.appendChild(component.$el);
```
当然，除了 body，你还可以挂载到其它节点上。`$mount` 也有一些快捷的挂载方式，以下两种都是可以的：
```js
// 在 $mount 里写参数来指定挂载的节点
new AlertComponent().$mount('#app');
// 不用 $mount，直接在创建实例时指定 el 选项
new AlertComponent({ el: '#app' });
```

实现同样的效果，除了用 extend 外，也可以直接创建 Vue 实例，并且用一个 Render 函数来渲染一个 .vue 文件：
```js
import Vue from 'vue';
import Notification from './notification.vue';

const props = {};  // 这里可以传入一些组件的 props 选项

const Instance = new Vue({
  render (h) {
    return h(Notification, {
      props: props
    });
  }
});

const component = Instance.$mount();
document.body.appendChild(component.$el);
```
这样既可以使用 .vue 来写复杂的组件（毕竟在 template 里堆字符串很痛苦），还可以根据需要传入适当的 props。渲染后，如果想操作 Render 的 Notification 实例，也是很简单的:
```js
const notification = Instance.$children[0];
```
因为 Instance 下只 Render 了 Notification 一个子组件，所以可以用 $children[0] 访问到。

需要注意的是，我们是用 `$mount` 手动渲染的组件，如果要销毁，也要用 `$destroy` 来手动销毁实例，必要时，也可以用 `removeChild` 把节点从 DOM 中移除。

>这样做有什么意义吗，后面的章节会提到他的用法。
