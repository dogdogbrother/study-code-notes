# 组件的通信：派发与广播——自行实现 dispatch 和 broadcast 方法

## Vue.js 1.x 的 $dispatch 与 $broadcast
既然说要实现它,那么肯定要先知道是什么,这是vue1版本的API,在2中被删除了.

`$dispatch` 用于向上级派发事件，只要是它的父级（一级或多级以上），都可以在组件内通过 $on （或 events，2.x 已废弃）监听到(就近原则,而且会在第一次接收到后停止冒泡，除非返回**true**).  
`$broadcast`相反，是由上级向下级广播事件的。

看一个简单案例:
```html
<!-- 注意：该示例为 Vue.js 1.x 版本 -->
<!-- 子组件 -->
<template>
  <button @click="handleDispatch">派发事件</button>
</template>
<script>
export default {
  methods: {
    handleDispatch () {
      this.$dispatch('test', 'Hello, Vue.js');
    }
  }
}
</script>
```
```html
<!-- 父组件，部分代码省略 -->
<template>
  <child-component></child-component>
</template>
<script>
  export default {
    mounted () {
      this.$on('test', (text) => {
        console.log(text);  // Hello, Vue.js
      });
    }
  }
</script>
```
## 自己写 dispatch 与 broadcast
因为vue内置的方法是$开头的,为了避免冲突我们就正常命名就好了.

这两个方法都接收了三个参数，第一个是组件的 name 值，用于向上或向下递归遍历来寻找对应的组件，第二个和第三个就是上文分析的自定义事件名称和要传递的数据。(和平时的`$emit`方法使用上多了个组件名)

先看下Mixins文件**emitter.js**的代码:
```js
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```
代码不难,就是递归找父级和递归找子级,通过定义$on和$emit来触发函数.

其实到这案例就完事了,但是写个简单的`$on`和`$emit`函数来说明下两者关系:
```html
<template>
  <div>
    <button @click="handleEmitEvent">触发自定义事件</button>
  </div>
</template>
<script>
  export default {
    methods: {
      handleEmitEvent () {
        // 在当前组件上触发自定义事件 test，并传值
        this.$emit('test', 'Hello Vue.js')
      }
    },
    mounted () {
      // 监听自定义事件 test
      this.$on('test', (text) => {
        window.alert(text);
      });
    }
  }
</script>
```