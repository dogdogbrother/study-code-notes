# 自定义 Hook

自定义hook很有意思,你不能说它是一个传统意义上的组件,也不是一个单纯的函数,感觉是组件和函数的结合体,能做到功能的封装和复用.

这里几个例子,把上面鼠标点击的`useEffect`封装起来,让我们页面组件使用只要使用`position.x`或者`position.y`就能做到点击就显示鼠标位置.

先来自定义 Hook
```js
impor React, { useState, useEffect } from 'react'

const useMousePosition = () => {
  const [ positions, setPositions ] = useState({x: 0, y: 0})
  useEffect(() => {
    const updateMouse = (event) => {
      setPositions({x: event.clientX, y: event.clientY})
    }
    document.addEventListener('click',updateMouse)
    return () => {
      document.removeEventListener('click', updateMouse)
    }
  })
  return positions
}

export default useMousePosition
```
然后我们直接使用此 Hook 就行了
```js
import useMousePosition from './hooks/useMousePosition'
const App = () =>{
  const position = useMousePosition()
  return(
    <p>{position.x}</p>
  )
}
```
**卧槽,牛逼**

>不过需要注意的是,自定义hook是一定要use开头的,要不然react不知道你这是组件还是函数还是hook,也就无法正确处理.