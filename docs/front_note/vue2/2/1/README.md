# 组件的通信 1：provide / inject

组件间通讯我觉得最方便的就是`$parent` 和 `$children`.
```html
<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.title);  // Vue.js
      comA.sayHello();  // 弹窗
    }
  }
</script>
```
如果是想要调用父级方法的话就用`this.$parent.title`.这种方法很方便但是有个缺点就是无法在**跨级**或**兄弟**间通信,如果你的子级的子级需要传参,那么把一个变量变量转手2次是非常痛苦的.

## 什么是 provide / inject
官方文档是这么介绍的:
>这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。  
如果你熟悉 React，这与 React 的上下文特性很相似。  
provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。

这里写个非常简单的例子来说明这个API怎么用,现在有2个组件,**A.vue**和**B.vue**:
```js
// A.vue
export default {
  provide: {
    name: 'Aresn'
  }
}

// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // Aresn
  }
}
```
>**需要注意的是**  
provide 和 inject 绑定并不是**可响应**的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的.  
   
## provide / inject 能否代替 Vuex
虽然代替vuex没有必要,但是在功能上是可以的,在 **main.js** 文件中通常导入一个入口文件app.vue作为根组件,很明显我们可以在跟组件上定义`provide`而让所有的子组件接收到数据.
```html
<script>
  export default {
    provide () {
      return {
        app: this
      }
    },
    data () {
      return {
        userInfo: null
      }
    },
    methods: {
      getUserInfo () {
        // 这里通过 ajax 获取用户信息后，赋值给 this.userInfo，以下为伪代码
        $.ajax('/user/info', (data) => {
          this.userInfo = data;
        });
      }
    },
    mounted () {
      this.getUserInfo();
    }
  }
</script>
```
这样,我们在任何组件中都可以使用根组件定义的方法和属性了.比如:
```html
<template>
  <div>
    {{ app.userInfo }}
  </div>
</template>
<script>
  export default {
    inject: ['app'],
    methods: {
      changeUserInfo () {
        // 这里修改完用户数据后，通知 app.vue 更新，以下为伪代码
        $.ajax('/user/update', () => {
          // 直接通过 this.app 就可以调用 app.vue 里的方法
          this.app.getUserInfo();
        })
      }
    }
  }
</script>
```
如果你硬要代替vuex的话,属性参数一多似乎会变得很乱,`Mixins`登场了!!!  
似乎很完美啊.
