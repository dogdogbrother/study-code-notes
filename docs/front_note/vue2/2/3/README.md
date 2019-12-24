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

1. 失去焦点校验.`trigger: 'blur'`
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

这方法比较长,而且通用与其他组件,例如input/select等等,所用的方法是一样的,所以我们可以写成一个mixins,内容如下:
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

找到了对应的父级就执行监听函数`$on`中的逻辑进行校验就好了,因为有监听change和blur两种逻辑,我们在`mounted`中写`setRules`函数封装一下(后续还有别的操作).
```js
export default {
  methods: {
    setRules () {
      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      this.validate('change');
    },
  }
  mounted () {
    if (this.prop) {
      // 对规则的操作的前提是,你这个item有规则的item
      this.setRules();
    }
  },
  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue () {
      return this.form.model[this.prop];
    }
  },
}
```

`validate`函数就是真正的负责校验的函数,内容如下:
```js
getRules () {
  let formRules = this.form.rules;

  formRules = formRules ? formRules[this.prop] : [];

  return [].concat(formRules || []);
},
getFilteredRule (trigger) {
  const rules = this.getRules();
  // 在过滤的时候还要再次过滤一下 拿到rules全部的规则,用当前的prop找到对应的,真正的规则数组才行.
  return rules.filter(rule => !rule.trigger || rule.trigger === trigger);
},
validate(trigger) {
  // 校验的时候首先你要拿到正确的对应的校验信息,因为trigger可能是blur,也有可能是change
  // 其实还有可能是 '',下面会讲解
  let rules = this.getFilteredRule(trigger);

  // 如果没有符合的规则那就直接结束这个校验.
  if (!rules || rules.length === 0) {
    return true;
  }

  // 设置状态为校验中
  this.validateState = 'validating';

  // 以下为 async-validator 库的调用方法

  const validator = new AsyncValidator({
    [this.prop]: rules
  });
  //这个参数的对象这个样子: {name:[{ ... }]}
  let model = {};

  model[this.prop] = this.fieldValue; // fieldValue是个计算属性,返回的是 this.form.model[this.prop];
  validator.validate(model, { firstFields: true }, errors => {
    this.validateState = !errors ? 'success' : 'error';
    // 根据校验是否通过,来让校验的那个div是否显示
    this.validateMessage = errors ? errors[0].message : '';
    // 赋予他错误的校验信息.
  });
}
```
至此校验就完成了,功能实现的核心梳理如下:

1. form组件通过provide把this下发下子组件中,自身的prop也就顺理成章的让子组件用inject拿到了.
2. 然后form-item根据自身的prop值来对比传进来的rules的key值就能确定自身的规则数组.
3. blur和change都会触发校验函数,用参数表明动作.对比rules设定时候的trigger字段,就能拿到最终的校验规则数组.
4. 用第三方的库 AsyncValidator 把参数传进去,根据返回来的错误信息控制报错显示和字段.

## 实现 点击提交校验
先在使用form组件的页面定义下两个按钮:
```html
<button @click="handleSubmit">提交</button>
<button @click="handleReset">重置</button>
```
先实现提交函数,校验形式上和**ELEMENT-UI**是一模一样的啊:
```js
handleSubmit () {
  this.$refs.form.validate((valid) => {
    if (valid) {
      window.alert('提交成功');
    } else {
      window.alert('表单校验失败');
    }
  })
}
```
`validate`方法是挂载在form上的.能进行校验的条件是什么呢?肯定是要知道所有有prop的form-item,并且rules中有这个规则,并且规则有内容.

事实上也差不多,form-item在生成的时候,利用`dispatch`方法让form组件监听`on-form-item-add`,参数就是`this`,form-item组件的全部内容,form组件把这个存放起来.当form-item组件销毁的时候再发送`on-form-item-remove`命令让其移除(假如你让这个form-item都v-if了,自然就不需要校验了).

先看form-item组件内容:
```js
mounted () {
  if (this.prop) {
    this.dispatch('iForm', 'on-form-item-add', this);
    this.setRules();
  }
},
beforeDestroy () {
  this.dispatch('iForm', 'on-form-item-remove', this);
}
```
form组件除了监听还需要一个数组变量,存放所以的form-item,当我们提交的时候其实操作的就是这个数组.
```js
data () {
  return {
    fields: []
  }
},
created () {
  this.$on('on-form-item-add', (field) => {
    if (field) this.fields.push(field);
  });
  this.$on('on-form-item-remove', (field) => {
    if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
  });
}
```
在校验时,用的是`.then`,明显form组件的validate返回的是个`Promise`,参数是回调函数,`Promise`中要返回状态.
```js
validate (callback) {
  return new Promise(resolve => {
      let valid = true;
      // 这个变量是标识校验结果,只要有一个不通过他就是false
      let count = 0;
      // 
      this.fields.forEach(field => {
        // 遍历全部的form-item实例
        field.validate('', errors => {
          //validate就是form-item下的validate函数,这里多出一个回调函数,下面的地方我说明一下.
          if (errors) {
            valid = false;
          }
          if (++count === this.fields.length) {
            // 全部完成
            resolve(valid);
            if (typeof callback === 'function') {
              callback(valid);
            }
          }
        });
      });
  });
}
```
这样的代码执行起来会报错的.有2个问题:

1. form-item下的`validate()`对比参数字段挑选符合的规则

`field.validate()`第一个参数应该是什么?我们在单个校验的时候会判断第一个参数是change还是blur,来和rules中的tagger字段对比,得到真正的规则类型和报错信息.

但是全部校验并没有响应的动作,他是不管blur还是change,只要不合适就要失败.如何兼容呢?可以利用任何字符串都包含空字符串的小技巧.我们改造下规则过滤函数:
```js
getFilteredRule (trigger) {
  // ...
  return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
}
```

2. form-item下的`validate()`回调函数的困惑.

我们现在的功能是可以实现提醒报错的,但是并不能知道`this.$refs.form.validate((valid) => {...}`中的`valid`的状态.

所以我们要写这么一个回调函数,让form-item下去判断自己的校验状态,但凡有一个返回了报错信息,那么久让`valid`变成true,并再次用回调函数暴露给外面去使用.

明白了原理我们就很清楚的明白了应该改在哪里,我们给form-item下的`validate`函数添加第二个参数`callback`,当校验失败的时候,让`callback(false)`.
```js
validate(trigger,  callback = function () {}) {
  // ...
  validator.validate(model, { firstFields: true }, errors => {
    // ...
    callback(this.validateMessage);
  }
}
```

## 完结
大功告成,真的有点累了.看起来好吃力,只能自己重新写一下完完全全的给吃透了才行啊...



