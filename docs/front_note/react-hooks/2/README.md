# Context和userContext 

## Context简介
context API是React 16.3版本推出的.(hooks是16.8推出的).

目前react全局状态管理的主流是redux,不过有点重,如果你项目的全局数据不是很多的话,没必要大炮打苍蝇.而且redux的底层其实也是用的context实现的.

context用于跨组件通讯，不用一层一层的去传递,和vue中的 `provide/inject` 差不多.  

利用的是`Provider`, `Consumer`两个组件(命名都类似,提供者/注入/消费者).

## 代码示例
```js
import React, { createContext } from 'react'

const SubApp =  () => {
    return (
        <BatteryContext.Consumer>
        {
            batter => <h1>batter: {batter}</h1>
        }
        </BatteryContext.Consumer>
    )
}
const App = () => {
    const BatteryContext = createContext()
    // Battery 电池
    return (
        <div>
            <BatteryContext.Provider value={60}>
            </BatteryContext.Provider>
        </div>
    )
}
```
打开页面,发现输出页面有显示`batter:60`.流程梳理一下:

1. 用react提供的 createContext 函数创建一个对象.
2. 对象的`Provider`属性是一个父组件,可以用 value 把你想要传的值放进去.
3. 对象的`Consumer`属性是一个子组件,这个组件不能直接套组件,必须要用一个函数return组件,函数的参数就是prop,父组件传过来的参数.

## 默认值和全局污染

### 默认值

假如我们定义了Consumer子组件,而没有定义Provider父组件,那么Consumer的prop值得显示会报错吗?

不会报错,但是会没有显示(空值).如果你想让他有一个默认值怎么办呢?
```js
const BatteryContext = createContext(60)
```

### 全局污染

我们上面的例子是非常简单的,假如我们传入的是`useState`的值和设置值得函数,当我们在`Consumer`组件里面`setValue(90)`后,app组件的状态改变,就会重新渲染整个树.

我们用context通常是为了全局状态,所以一般会写在根组件 APP 上,这样的操作是在是浪费了.

解决方法我倒是看明白了,但是不知道是否真的有意义...,回头明白了再补 [我看的Context博客](https://segmentfault.com/a/1190000019679398)

## userContext 

userContext 和 Context 有什么关系吗? Context 提供 Provider, userContext 提供更简约的 Consumer .
```js
import React, { useContext } from 'react'

const SubApp =  () => {
    const batter = useContext(BatteryContext)
    return (
        <h1>batter: {batter}</h1>
    )
}
```
效果跟上面的应该是一样的,这里其实有个疑惑,就是 `BatteryContext` 这样单独拎出来不会报错未定义吗?还是说useContext已经帮我们隐形的找到了呢?  
后续我会测试的,测试好了再更新.

## useReducer

如果我们需要比较多的 useState , 那就比较麻烦了,所以可以使用 useReducer 来统一处理下.

写过redux的人应该对这种很熟悉,虽然我没怎么用过redux,但是vuex也有点像,因为能理解就不多废话了,直接上代码:
```js
export default function ReducerDemo() {
    const [count, dispath] = useReducer((state,action)=> {
        if(action === 'add'){
            return state + 1;
        }
        return state;
    }, 0);
    return (
        <div>
            <h1 className="title">{count}</h1>
            <button className="btn is-primary"
                onClick={()=> dispath('add')}
                >Increment</button>
        </div>
    )
}
```
> count的起始值是0,每当我们点击按钮的时间,执行dispath函数,dispath的参数就是useReducer回调的action,回调函数通过return state更新 count.

小技巧是,`return { ...state, user: action.user };`,我们可以通过扩展运算符来覆盖掉我们想改的对象属性的值.