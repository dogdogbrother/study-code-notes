# 组合多选框组件

>Checkbox 作为基础表单组件,是完全可以兼容form表单的,所以是不用新建页面,用上章节的页面即可.

## 组件概览

多选框组件也是由两个组件组成：CheckboxGroup 和 Checkbox。单独使用时，只需要一个 Checkbox，组合使用时，两者都要用到。

Checkbox的使用方法如下:
```html
<i-checkbox v-model="single">单独选项</i-checkbox>
```

CheckboxGroup的使用方法如下:
```html
<template>
  <i-checkbox-group v-model="multiple">
    <i-checkbox label="option1">选项 1</i-checkbox>
    <i-checkbox label="option2">选项 2</i-checkbox>
    <i-checkbox label="option3">选项 3</i-checkbox>
  </i-checkbox-group>
</template>
<script>
  export default {
    data () {
      return {
        multiple: ['option1', 'option2']
      }
    }
  }
</script>
```
>**难点在哪里呢?**  
首先 checkbox-group 和 checkbox 的嵌套关系有可能不明朗,不过根据上节内容倒是比较好解决.  
其次 checkbox 的数据形式有时绑定的布尔值,有时是根据父级的数组是否包含了 label 值,这需要稍微复杂的一点兼容.

## 单独使用的 Checkbox

为了不让逻辑特别的麻烦,所以先写单独使用的逻辑.

设计一个组件时，还是要从它的 3 个 API 入手：prop、event、slot。

**prop有什么呢?**

* value: 用于`v-model`的接收值.正常应该是 true/false,但是可以自定义.
* trueValue/falseValue: 对于 `value` 的自定义补充,如果只允许用户传布尔值就太不友好了,让其支持 number 和 string
* disabled: 控制是否禁用

**event有什么呢?**

* input: 用于`v-model`的暴露值
* on-change: 选中 / 取消选中时触发，用于通知父级状态发生了变化。

### 1. 先写个架子展示出来

思考后, Checkbox 结构应该是这样的(先在`src/components`下新建目录`checkbox`):
```html
<template>
  <label>
    <span>
      <input
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change">
    </span>
    <slot></slot>
  </label>
</template>
```
>用 label 和 slot 配合起来,使用时`<i-checkbox>男</i-checkbox>`,更科学直观.

props 的设置就是上面我们列举的一样即可:
```js
export default {
  name: 'iCheckbox',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value
    };
  },
  methods: {
    change (event) {
      if (this.disabled) {
        return false;
      }
      const checked = event.target.checked;
      this.currentValue = checked;

      this.$emit('input', this.currentValue);
    }
  }
}
```

### 2. 添加非布尔值的绑定

假如`'1'`是选中,`'0'`是先看组件的使用:
```html
<i-checkbox v-model="gender" trueValue="1" falseValue="0">男</i-checkbox>
```
组件内部怎么处理?稍稍有点难度,课程里的解决方案还是挺巧的,直接看代码吧:
```js
export default {
  methods: {
      change (event) {
        // ...
        const checked = event.target.checked;
        this.currentValue = checked;
        const value = checked ? this.trueValue : this.falseValue;
        // 暴露给外面的值还是配置的值
        this.$emit('input', value);
        // ...
      }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.currentValue = this.value === this.trueValue;
        // trueValue和falseValue即使没设置也无所谓,因为默认是true和false嘛
        // 就拿 value 硬和 true 字段对比,相等就是 true 反之 false
        // 反正就是不管你设置的是啥,input原生接受的都是布尔值
      } else {
        // 如果都不对应就代表你传进来的格式不对有可能是object
        throw 'Value should be trueValue or falseValue.';
      }
    }
  }
}
```
### 3. 添加值改变时的 change 通知事件
这个比较简单, checkbox 下的 `change`函数内添加`this.$emit('on-change', value);`.

使用时添加`@on-change="fn"`即可.

### 4. 进行form表单的校验

这就用到了上个章节的内容了,其实本章节案例也是为了巩固上个章节的知识点..

```js
import Emitter from '../../mixins/emitter.js';
export default {
  mixins: [ Emitter ],
  methods: {
    change (event) {
      // ... 
      this.dispatch('iFormItem', 'on-form-change', value);
    }
  },
}
```
>其实没啥用,因为你还没再form表单页面定义...  
不过也没办法定义,因为单个的 checkbox 是没有校验规则的..

## CheckboxGroup 下的 Checkbox

**CheckboxGroup 的 API 很简单：**

* props：value，与 Checkbox 的类似，用于 v-model 双向绑定数据，格式为数组；
* events：on-change，同 Checkbox；
* slots：默认，用于放置 Checkbox。

**Checkbox 有什么变动呢?**

* Checkbox 要通过上一节的 `findComponentUpward` 方法判断父组件中是否有 CheckboxGroup.
* Checkbox 要把自身的 label 值 push 到 CheckboxGroup 中.

**交互上有什么不同呢?**

* Checkbox 是否勾选不能通过简单的改变一个值 true/false ,而是 Group 数组中是否包含了相应的label.
* change 时的校验和返回值要根据是否为 Group 做不同的派发

### 判断是不是 CheckboxGroup
```js
import { findComponentUpward } from '../../utils/assist.js';

export default {
   mounted () {
    this.parent = findComponentUpward(this, 'iCheckboxGroup');
    // 看能不能找到父级
    if (this.parent) {
      // 能找到的话就用一个字段标识
      this.group = true;
    }

    if (this.group) {
      // 如果是 checkboxGroup ,就用 checkboxGroup组件 内部的逻辑进行初始化赋值
      this.parent.updateModel(true);
    } else {
      // 如果是单个的,就用自己的逻辑初始化赋值
      this.updateModel();
    }
  },
  methods: {
    updateModel () {
        this.currentValue = this.value === this.trueValue;
      }
  }
}
```

### group下的 checkbox 需要兼容 label

html 结构,data 和 prop 都要有些改变

```html
<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change">
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change">
    </span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    // ...
    label: {
      type: [String, Number, Boolean]
    }
  },
  data () {
    return {
      // ...
      model: [],
      group: false,
      parent: null
    };
  },
}
</script>
```
>model 就是 CheckboxGroup 的 value,`v-model`的写法是 vue 封装的语法糖,详情请看[官网](https://cn.vuejs.org/v2/guide/forms.html#%E5%A4%8D%E9%80%89%E6%A1%86)

## CheckboxGroup

CheckboxGroup 的 API 很简单：

* props：value，与 Checkbox 的类似，用于 v-model 双向绑定数据，格式为数组；
* events：on-change，同 Checkbox；
* slots：默认，用于放置 Checkbox。

### 全部代码如下
```html
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/assist.js';
import Emitter from '../../mixins/emitter.js';

export default {
  name: 'iCheckboxGroup',
  mixins: [ Emitter ],
  props: {
    value: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  methods: {
    updateModel (update) {
      this.childrens = findComponentsDownward(this, 'iCheckbox');
      // 通过前面章节定义的方法找到全部的子级 Checkbox
      if (this.childrens) {
        // 假如能找到
        const { value } = this;
        // 拿到自身的 value ,也就是装着 label 的数组
        this.childrens.forEach(child => {
          child.model = value;
          // 遍历每个 Checkbox ,并给他们的 v-model 的值绑定全部的选中值
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            // 这个 currentValue 的值对应的是 checkbox 原生 true/false ,也要去通过 include 去赋值
            child.group = true;
          }
        });
      }
    },
    change (data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('on-change', data);
      this.dispatch('iFormItem', 'on-form-change', data);
    }
  },
  watch: {
    value () {
      this.updateModel(true);
    }
  }
}
</script>
```
## 完结测试
正常操作和校验是否数组为空都是没问题的.应该是OK了.
