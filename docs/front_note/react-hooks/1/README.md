# useState和useEffect

## useState Hook
其实没什么好说的,data而已.
```js
import React, { useState } from 'react'

const LikeButton = () => {
  const [ like, setLike ] = useState(0)
  return(
    <button onClick={() => {setLike(like + 1)}}>
      {like}
    </button>
  )
}
```
1. 我们可以通过数组的结构赋值拿到`useState`结构的前两位.

2. `like`就是我们的变量,可以是任意类型,例如`number`,`object`等等,`useState`的参数就是`like`变量的原始值.

3. 如果想要改变`like`值,就通过给第二个值`setLike()`方法传参覆盖`like`值.

## useEffect Hook
>Effect是副作用的意思.

### 不需要清除的Effct
说一个需求,如果我们想要在一个组件加载和更新的时候,修改页面的title,以往的react方法怎么做呢?

我们要在生命周期函数里面写动作:
```js
componentDidMount() {
  // 组件挂载生命周期函数
  document.title = `你点击了 ${this.state.like} 次`;
}

componentDidUpdate() {
  // 组件更新重新渲染生命周期函数
  document.title = `你点击了 ${this.state.like} 次`;
}
```
这样我们在组件初始化的时候就会更改title,当`like`值变动的时候,触发更新渲染,title会再次更新.

我们用`useEffect`重写下这个需求(延续上一章的代码):
```js
import React, { useState, useEffect } from 'react'

const LikeButton = () => {
  const [ like, setLike ] = useState(0)
  useEffect(() => {
    document.title = `你点击了 ${like} 次`;
  })
  return(
    <button onClick={() => {setLike(like + 1)}}>
      {like}
    </button>
  )
}
```

### 需要清除的Effct
我们再提一个需求,在进入一个页面的时候,每当我们鼠标点击,就显示当前鼠标所在的X和Y值.

比较好做,只要在生命周期挂载函数里面写一个`click`监听函数,再在卸载的声明周期函数里面`remove`掉监听函数就行了.

但是通过上个例子我们知道,`useEffect`函数包含了全部的周期函数,那么清除动作是需要通过return回调函数来定义的:
```js
import React, { useState, useEffect } from 'react'

const LikeButton = () => {
  const [ positions, setPositions ] = useState({x: 0, y: 0})
  useEffect(() => {
    const updateMouse = (event) => {
      console.log('inner')
      setPositions({x: event.clientX, y: event.clientY})
    }
    console.log('add listener')
    document.addEventListener('click',updateMouse)
    return () => {
      console.log('remove listener')
      document.removeEventListener('click', updateMouse)
    }
  })
  return(
    <p>X: {positions.x}, Y: {positions.y}</p>
  )
}
```
这样我们每次点击都会在p标签里面打印出当前的鼠标位置.

我们还通过三种不同的`console.log`来观察`useEffect`运行的规律.

1. 当我们刷新页面的时候,打印add listener.

2. 当我们鼠标点击,依次打印`inner`,`remove listener`,`add listener`.

3. 所有我们猜测,`useEffect`会保存return的回调函数,当需要再次执行的时候会先把上次保存的回调函数执行了,才会继续执行.

### 可控的Effct
刚才的例子代码有一个非常大的问题,就是每次我们点击都会执行一次挂载add函数和卸载remove函数,非常的不人性化,也很耗费性能.

如果我们页面的`useState`变量比较多,这互相嵌套刷新简直就是个灾难.很有可能进入死循环的怪圈.

解决方法我就不贴例子代码直接公布答案吧,我们可以直接给`useEffect`函数添加第二个参数就行了,参数为数组.
```js
useEffect(() => {
  // 我要执行的函数
},[])
```
这样的`useEffect`只会执行一次,如果你想控制他执行的,你可以在数组里面push进去一个`useState`值,只有当这个值变化的话,`useEffect`函数才会重新执行.

### 总结
`useEffect`函数很有意思,值得我们总结一下.

相比较以前的class或是vue 2.0的生命周期开发,`useEffect`更灵活更省事了,函数式开发牛逼就完事了.