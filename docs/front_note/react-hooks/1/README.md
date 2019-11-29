# useState Hook
其实没什么好说的,data而已.
```js
impor React, { useState } from 'react'

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