# 全局提示组件——$Alert

以前写过自定义的对话框，是通过一个变量status去控制对话框的显示和隐藏，每个组件用到的时候就引入一次这个组件。  

虽然功能能实现，但是很蠢很蠢，有如下几个缺点:
* 每个使用的地方，都得注册组件；
* 需要预先将 `<Alert>` 放置在模板中；
* 需要额外的 data 来控制 Alert 的显示状态；
* Alert 的位置，是在当前组件位置，并非在 body 下，有可能会被其它组件遮挡。

优雅一点的使用做法就是js调用，像原生的`window.alert('这是一条提示信息');`,或是组件库的`$Message`等等。

## 期望实现

期望最终的 API 是这样的:
```js
methods: {
  handleShow () {
    this.$Alert({
      content: '这是一条提示信息',
      duration: 3
    })
  }
}
```
按照小册子里面的讲解顺序是有点跳的，我觉得应该反向讲解，所以我用我总结后来整理。

## 思路
很明显，`$Alert`是挂载Vue全局上的，要么是Mixins，要么就是prototype挂载，我们姑且算是prototype。  

但是问题是`Vue.prototype.$Alert = Alert`的 Alert 是什么呢？弹窗肯定是个vue组件，是通过 .vue 文件定义的，但是组件用不能直接挂在原型链上啊。

所以肯定的是Alert是一个 alert.js 文件导出的一个函数，alert.js 文件作用就是把 .vue 文件实例化。

实例化的方法就是用 vew Vue render 这个vue组件，然后$mount渲染出html元素，appendChild 填到body下。

## 具体步骤

1. 首先肯定是要有 alert.vue 组件，这个组件维护一个数组，数组里面装着外面传进来的信息(因为通知信息可以共存好几个)。

template中 v-for 这个数组来显示 info 消息。

还有add函数用于push数组，remove函数用于定时器到了删除数组。

2. 建立一个notification文件，用于挂载组件用。此文件引入 alert.vue 和 vue，给 alert 加一个挂载功能的函数，执行此函数挂载后，向外暴露 alert 实例的add方法。

3. 建立 alert.js 文件，专门用于调用实例。引入 Notification ，执行他的挂载函数，(用一个变量记录，如果return过内容，就不用再挂载)。

因为闭包的特性，add函数会一直存在，就能随时随地的进行 info 通知。

4. 总结一下就是，我们写一个 .vue 的样式文件，然后利用一个该对象的属性方法来扩展挂载动作。当我外部调用了这个扩展动作的函数后，该组件就会被渲染，一直不会消失，等等新的info通知调用。

## 具体代码
一个三个文件，`alert.vue` 、`notification` 、 `alert.js`.
```html
<!-- alert.vue -->
<template>
  <div class="alert">
    <div class="alert-main" v-for="item in notices" :key="item.name">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>
<script>
  let seed = 0
  function getUuid() {
    return 'alert_' + (seed++);
  }
  export default {
    data () {
      return {
        notices: []
      }
    },
    methods: {
      add (notice) {
        const name = getUuid();

        let _notice = Object.assign({
          name: name
        }, notice);

        this.notices.push(_notice);

        // 定时移除，单位：秒
        const duration = notice.duration;
        setTimeout(() => {
          this.remove(name);
        }, duration * 1000);
      },
      remove (name) {
        const notices = this.notices;

        for (let i = 0; i < notices.length; i++) {
          if (notices[i].name === name) {
            this.notices.splice(i, 1);
            break;
          }
        }
      }
    }
  }
</script>
<style>
  .alert{
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
  }
  .alert-content{
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    margin-bottom: 8px;
  }
</style>
```
***
```js
// notification.js
import Alert from './alert.vue';
import Vue from 'vue';

// Alert 理论上是一个有这template，script信息的组件。
// 之所以能变成对象是因为被 Webpack 的 vue-loader 编译，把 template 编译为 Render 函数
// 最终就会成为一个 JS 对象
Alert.newInstance = properties => {
  const props = properties || {};

  const Instance = new Vue({
    data: props,
    render (h) {
      return h(Alert, {
        props: props
      });
    }
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);

  const alert = Instance.$children[0];

  return {
    add (noticeProps) {
      alert.add(noticeProps);
    },
    remove (name) {
      alert.remove(name);
    }
  }
};

export default Alert;
```
***
```js
// alert.js
import Notification from './notification.js';

let messageInstance;

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice({ duration = 1.5, content = '' }) {
  let instance = getMessageInstance();

  instance.add({
    content: content,
    duration: duration
  });
}

export default {
  info (options) {
    return notice(options);
  }
}
```

在其他页面调用测试下：
```js
this.$Alert.info({
  content: '我是提示信息 2',
  duration: 3
});`
```
发现没问题，大功告成嗷。

## 需要注意的几个点

1. Alert.vue 的最外层是有一个 .alert 节点的，它会在第一次调用 `$Alert` 时，在 body 下创建，因为不在 `<router-view>` 内，它不受路由的影响，也就是说一经创建，除非刷新页面，这个节点是不会消失的，所以在 alert.vue 的设计中，并没有主动销毁这个组件，而是维护了一个子节点数组 `notices`。

2. notification.js 和 alert.vue 是可以复用的，如果还要开发其它同类的组件，比如二次确认组件 `$Confirm`, 只需要再写一个入口 confirm.js，并将 alert.vue 进一步封装，将 notices 数组的循环体写为一个新的组件，通过配置来决定是渲染 Alert 还是 Confirm，这在可维护性上是友好的。

3. 本例的 content 只能是字符串，如果要显示自定义的内容，除了用 `v-html` 指令，也能用 Functional Render（之后章节会介绍）


