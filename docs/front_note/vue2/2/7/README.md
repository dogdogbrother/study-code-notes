## 动态渲染vue组件

## 需求

我们有一个区域，里面的内容是不固定的，是需要通过后端给的，后端给的不仅是html，逻辑也一并包括了。总体而言，就是后端随机给一个.vue文件，里面包含了css，html，和js。如果让我们的项目，动态去渲染.vue文件呢？

上个章节我们都说明了，利用**Vue 的构造器 ——extend与手动挂载——$mount**

## 思路

1. 首先我们肯定是要有一个后端给过来的字符串，包含了.vue文件内的全部内容。

2. 我们要把这个字符串通过script、style和template给分割一下，获得正确的html、css、和js。

3. 我们可以对比下new vue示例的代码，就能明白怎么做了，创建个对象，把对应的template和data值给挂在上面。这里把对应的结构代码贴出来：
```js
// 分割后的 template 字符串如下
`<div id="app">
    <div>
        <input v-model="message">
        {{ message }}
    </div>
</div>`

// 分割后的 js 字符串如下
`return  {
    data () {
        return {
            message: ''
        }
    }
}`
```
我们再看下 Vue 实例的格式：
```js
Vue.extend({
  template: '<div>{{ message }}</div>',
  data () {
    return {
      message: 'Hello, Aresn'
    };
  },
});
```
>style的样式单独用另一种方法处理，下面会提到

4. 通过上个上节提到的extend、$mount和dom的appendChild进行挂载，这样页面就能显示了。

5. css的处理是这样的，我们创建一个style标签，并生成一个唯一id值，把css内容赋值进去，push到head标签中。

6. 最后在组件销毁时removeChild元素和通过style的id去removeChild style标签，用vue的$destroy卸载组件。

## 代码实现

上面说了大概的思路，但是细节实施起来还是难的。这里直接上代码；

1. 所谓的冬天组件，其实就字符串内容全部当props传进去，那自然要有个容器组件,先看怎么用：
```html
<!-- src/views/display.vue -->
<template>
  <div>
    <h3>动态渲染 .vue 文件的组件—— Display</h3>
    <i-display :code="code"></i-display>
  </div>
</template>
<script>
  import iDisplay from '../components/display/display.vue';
  import defaultCode from './default-code.js';

  export default {
    components: { iDisplay },
    data () {
      return {
        code: defaultCode
      }
    }
  }
</script>
```

2. defaultCode 就是我们的动态模板的字符串，模拟了异步数据：
```js
const code =
`<template>
    <div>
        <input v-model="message">
        {{ message }}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                message: ''
            }
        }
    }
</script>`;
export default code;
```

3. 重头戏就是，动态组件的内容是什么，里面的代码我都加上注释了，配合上面的思路就能明白每个步骤了：
```html
<template>
  <div ref="display"></div>
</template>
<script>
import randomStr from '../../utils/random_str.js';
import Vue from 'vue';
  export default {
    props: {
      code: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        html: '',
        js: '',
        css: '',
        id: randomStr()
      }
    },
    methods: {
      // 第一个参数是组件信息的全部内容，第二个是要分割的内容
      getSource (source, type) {
        // 正则不会
        const regex = new RegExp(`<${type}[^>]*>`);
        let openingTag = source.match(regex);

        if (!openingTag) return '';
        else openingTag = openingTag[0];

        return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
      },
      splitCode () {
        // 记得要把 export default 替换成return
        const script = this.getSource(this.code, 'script').replace(/export default/, 'return ');
        const style = this.getSource(this.code, 'style');
        // app 的div是容错做法，因为用户有可能不会包裹根元素
        const template = '<div id="app">' + this.getSource(this.code, 'template') + '</div>';
        this.js = script;
        this.css = style;
        this.html = template;
      },
      renderCode () {
        this.splitCode();
        console.log(this.html);
        console.log(this.js);
        if (this.html !== '' && this.js !== '') {
          // 因为我们的vue实例其实就是个对象，而现在的this.js，就是return{}这种内容。
          // 我们通过 new Function后直接执行的形式，获取到data，当然，用eval也是一样的
          const parseStrToFunc = new Function(this.js)();
          parseStrToFunc.template =  this.html;
          const Component = Vue.extend( parseStrToFunc );
          // 使用 $mount 渲染组件，在挂载到 display 元素下
          this.component = new Component().$mount();
          this.$refs.display.appendChild(this.component.$el);
          if (this.css !== '') {
            // 创建了一个style标签，给他赋值一个随机的id
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = this.id;
            style.innerHTML = this.css;
            document.getElementsByTagName('head')[0].appendChild(style);
          }
        }
      },
      destroyCode () {
        // 当组件销毁的时候，卸载对应的style标签
        const $target = document.getElementById(this.id);
        if ($target) $target.parentNode.removeChild($target);

        if (this.component) {
          // 还要卸载内容元素，并且用vue的$destroy进行卸载
          this.$refs.display.removeChild(this.component.$el);
          this.component.$destroy();
          this.component = null;
        }
      }
    },
    mounted () {
      this.renderCode();
    },
    beforeDestroy () {
      this.destroyCode();
    }
  }
</script>
```