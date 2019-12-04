# router

>与以往的class开发的react-router还是有些不一样的,总体而言还是变简单了.

当然要先安装:
```sh
npm i --save react-router-dom
```

## Link 
我们先看下用`<Link>`标签进行的路由跳转,代码如下:
```js
import React from 'react'
import { Route, Link } from 'react-router-dom'

const Aside = ()=> {
  return(
    <Route>
      <Link to="/">去首页</Link>
      <Link to="/login">去登陆页</Link>
    </Route>
  )
}

export default Aside
```
路由定义文件是这样的:
```js
import React from 'react'
import {Route, Switch} from "react-router";

import Home from './home'
import Login from './login'

const LayoutMain = ()=> {
  return(
    <div className="layout-main-box">
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/login" component={ Login }/>
      </Switch>
    </div>
  )
}
```
这就是一个最最基本的路由案例,和vue的router的路由注入的方案不同,react的路由更散漫一些.

可以看到`Route`便签只是根据自身的`path`值来匹配当前应该显示那个组件.

## 逻辑跳转路由
事实上我们的路由需求不可能如此的简单,有可能是要通过函数逻辑处理还跳转路由,也有可能需要带参数.

这就需要react中的`withRouter`函数,再写一个简单的例子:
```js
import React from 'react'
import { withRouter } from 'react-router-dom'


const Aside = ()=> {

  const toRouter = (routerParam, history) => {
    history.push({ pathname:'/login', state:{ routerParam }})
  }

  const SearchButton = withRouter(({ history })=>{
    return (
      <button onLick={() => { toRouter('我是需要带的参数', ) history}}>点击我跳到登陆页面</button>
    )
  })

  return(
    <SearchButton/>
  )
}

export default Aside
```

路由声明定义的文件和上个例子是一样的,这里就不重复写了.

然而`Login`组件却不是单纯的组件了,也需要用`withRouter`包裹一下,代码如下:
```js
import React from 'react'
import { withRouter } from "react-router-dom";

const Login = (props) => {
  return(
    <p>我路由传进来的参数是: {props.location.routerParam}</p>
  )
}

const LoginRouter = withRouter(Login);
export default LoginRouter
```

## TODO
路由懒加载怎么做?不知道,暂时先这样吧.后面我知道了再补
