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