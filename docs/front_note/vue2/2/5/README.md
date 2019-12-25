# 组合多选框组件

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
为了节省