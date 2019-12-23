# 具有数据校验功能的表单组件——Form
具有校验功能form表单太常见了,基本上所有的组件库都有实现.这里将书写一个简单的form组件.看似简单,实则难度不低.

**难点在哪里呢?:**
1. form最为一个大组件,内部的form-item的层级嵌套有可能并不是一级,v-mode值可以prop接收,但是校验规则怎么接收和反馈呢?
2. 点击提交会校验全部的form-item,单个form-item中的input事件的时候也会校验自身,但是这些校验动作全部是在form表单这个大组件外层(使用者)进行的,数据这么转来转去着实头晕.

## 先写组件架子.
App.vue 中使用`<my-form>`组件,组件内容如下:
```html
<template>
  <div>
    <h3>具有数据校验功能的表单组件——Form</h3>
    <i-form>
      <i-form-item>
        <i-input></i-input>
      </i-form-item>
    </i-form>
  </div>
</template>
```
这个就是使用form组件的地方,我们使用时的数据和校验都是在这个组件里面.

可以发现,form表单由三个内容组成,form/form-item/input,依次看下文件内容:
```html
<!-- form -->
<template>
  <form>
    <slot></slot>
  </form>
</template>
```
```html
<!-- form-item -->
<template>
  <div>
    <label>测试</label>
        <div>
            <slot></slot>
            <div>校验信息</div>
        </div>
  </div>
</template>
```
```html
<!-- input -->
<template>
  <input type="text"/>
</template>
```

## 补齐组件的基本值
我们目前要写的是用户名和邮箱需要校验,有提交和重置2个功能.

#### 先定义业务层的form页面:
```html
<template>
  <div>
    <h3>具有数据校验功能的表单组件——Form</h3>
    <i-form ref="form" :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleSubmit () {},
    handleReset () {}
  }
}
</script>
```
>为了节省空间我就不写引入和components注册了.

#### 定义form的props(不需要其他操作):
```js
export default {
  name: 'iForm',
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
},
```
#### 定义form-item里面的label和prop:
```html
<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{ label }}</label>
      <div>
        <slot></slot>
        <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'iFormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    },
  },
  data () {
    return {
      isRequired: false,  // 是否为必填
      validateState: '',  // 校验状态
      validateMessage: '',  // 校验不通过时的提示信息
    }
  }
}
</script>
```
这里需要单独设立三个变量
* `isRequired`: 是否必填,默认是flase,会在mounted中确认是否为真的必填.(光从prop去判断还不够,因为有可能你的规则是空的)
* `validateState`: 校验状态,默认是没有,失败是`error`,通过是`success`.
* `validateMessage`: 校验失败的信息,默认是没有,具体的是要看你不通过规则的设置.

>需要注意的是,`name:'iFormItem'`,以往不写name是没关系的,但是在这个案例中,name是一定要写的,因为数据的传递依赖这个name值的正确性.
#### 定义input
```html
<template>
  <input type="text" :value="currentValue" @input="handleInput"/>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      currentValue: ''
    }
  },
  methods: {
    handleInput (event) {
      const value = event.target.value;
      this.currentValue = value;
      this.$emit('input', value);
    },
  },
  watch: {
    value (val) {
      this.currentValue = val;
    }
  },
}
</script>
```
这里有2个需要注意的小细节:
1. input外部定义的时候使用的是v-model,但是在定义props的时候字段为`value`.如果`$emit('input',value)`,外面改变的其实也是v-model的值.
2. value因为是props,不能被修改,所以用了单独的变量接受监听改变修改.

## 想想接下来应该干啥
已经定义好了基础的数据,接下来就要实现功能了,能做的有这么几个.

1. 失去焦点校验
2. 改变值change校验.`trigger: 'change'`
3. 点击提交校验.
4. 重置校验.

失去焦点和change似乎是差不多的,就从这个功能下手,进行校验处理.

## blur 和 change 校验.
input有本身有input事件了,再加一个`@blur="handleBlur"`.相应的方法也跟上:
```js
handleInput (event) {
  // ...
  this.dispatch('iFormItem', 'on-form-change', value);
},
handleBlur () {
  this.dispatch('iFormItem', 'on-form-blur', this.currentValue);
}
```
`dispatch`意思就是派发,第一个参数是组件的名字,我们在上面提醒了,组件要有自己的名字,作用就要找到对应的组件并找到相应的声明方法.

这方便比较长,而且通用与其他组件,例如input/select等等,所用的方法是一样的,所以我们可以写成一个mixins,内容如下:
```js
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      // 先拿到目前的父级组件的名字
      while (parent && (!name || name !== componentName)) {
        // 如果父级存在,并且这个组件名不存在,并且组件名不等于参数就等于没找到,循环执行此代码
        parent = parent.$parent;
        if (parent) {
            name = parent.$options.name;
        }
      }

      if (parent) {
        // 最终找到了想要的父级组件,修正下this执行就OK了
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  }
};
```
`dispatch`函数利用了while循环特性(匹配不到就一直循环),实现了跨级向上查找父级组件.