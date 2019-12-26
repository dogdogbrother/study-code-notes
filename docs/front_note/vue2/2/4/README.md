# 组件的通信：找到任意组件实例——findComponents 系列方法

## findComponents概述

前面的小节我们已经介绍了两种组件间通信的方法：provide / inject 和 dispatch / broadcast.

>provide / inject 是内置方案,通过派发的形式让子组件获取到父组件的状态.  
dispatch / broadcast 是手写的方法,通过递归让父子组件相互查找进行通讯.

本章将实现第三种组件通信方法，也就是 findComponents 系列方法,也是自行实现的,它是一系列的函数，可以说是组件通信的终极方案了.

它适用于以下场景：

* 由一个组件，向上找到最近的指定组件；
* 由一个组件，向上找到所有的指定组件；
* 由一个组件，向下找到最近的指定组件；
* 由一个组件，向下找到所有指定的组件；
* 由一个组件，找到指定组件的兄弟组件。

5 个不同的场景，对应 5 个不同的函数，实现原理也大同小异(都是通过递归、遍历，找到指定组件的 name 选项匹配的组件实例并返回).

在目录 `src` 下新建文件夹 `utils` 用来放置工具函数，并新建文件 `assist.js`，本节所有函数都在这个文件里完成，每个函数都通过 `export` 对外提供.

## 实现的关键

这章节其实含金量不高,原理不难,无非是利用父级是`$parent`,子级是`$children`,组件名是`$options.name`.来进行递归查找.

## 向上找到最近的指定组件——findComponentUpward

直接先上代码:
```js
// assist.js
// 由一个组件，向上找到最近的指定组件
function findComponentUpward (context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
export { findComponentUpward };
```
第一个参数是执行上下文,比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是`this`.第二个参数是要找的组件的`name`.

此方法和上章节的`dispatch`非常像,不同的是`dispatch`是找到组件后设置响应事件,`findComponentUpward`是把直接找到的组件暴露出去.
```js
export default {
  name: 'componentB',
  mounted () {
    const comA = findComponentUpward(this, 'componentA');
    if (comA) {
      console.log(comA.name);  // Aresn
      comA.sayHello();  // Hello, Vue.js
    }
  }
}
```

## 向上找到所有的指定组件——findComponentsUpward

从名字上就能感知得到,和上个组件差不多,只是返回的是个数组(注意命名上有个**s**).
```js
// assist.js
// 由一个组件，向上找到所有的指定组件
function findComponentsUpward (context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}
export { findComponentsUpward };
```
代码实现上不难,递归push就OK了.

## 向下找到最近的指定组件——findComponentDownward
```js
// assist.js
// 由一个组件，向下找到最近的指定组件
function findComponentDownward (context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;

      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}
export { findComponentDownward };
```
## 向下找到所有指定的组件——findComponentsDownward
```js
// assist.js
// 由一个组件，向下找到所有指定的组件
function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}
export { findComponentsDownward };
```
>利用reduce进行的递归,reduce很强大但是平时用的比较少.

## 找到指定组件的兄弟组件——findBrothersComponents
```js
// assist.js
// 由一个组件，找到指定组件的兄弟组件
function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}
export { findBrothersComponents };
```
通过`$parent.$children`找到所有同级组件,在进行过滤操作即可.

>`_uid`是vue内置组件id是不重复的.

这里的findIndex的操作有点让人困惑,这样操作的原因是,你找的有可能是和你一模一样的组件,举例说明吧.
```html
<!-- component-a.vue -->
<template>
  <div>
    组件 A
    <component-b></component-b>
    <component-b></component-b>
  </div>
</template>
```
如果将 B 中 findBrothersComponents 的第三个参数设置为 false
```js
// component-b.vue
export default {
  name: 'componentB',
  mounted () {
    const comsB = findBrothersComponents(this, 'componentB', false);
    console.log(comsB);
  }
}
```
此时就会打印出 `[VueComponent, VueComponent]`，也就是包含自身了。