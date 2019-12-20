# 搭建项目架子

## create-react-app 
基础操作,没什么好说的,安装就完事了.
```sh
create-react-app senlin-music
cd senlin-music
npm start
```
把原始src项目多余内容删除,并把相关多余的import删除,最终目录如下:
```sh
├─api                   // 网路请求代码、工具类函数和相关配置
├─application           // 项目核心功能
├─assets                // 字体配置及全局样式
├─baseUI                // 基础 UI 轮子
├─components            // 可复用的 UI 组件
├─routes                // 路由配置文件
└─store                 //redux 相关文件
  App.js                // 根组件
  index.js              // 入口文件
  serviceWorker.js      // PWA 离线应用配置
  style.js              // 默认样式
```

## 默认样式及字体图标准备

可以看到默认样式文件是js文件,是因为本项目是由**styled-components**来进行开发，也就是利用 **css in js** 的方式.

```sh
npm install styled-components --save
```
在刚刚的 **style.js** 中:
```js
import { createGlobalStyle } from'styled-components';

export const GlobalStyle = createGlobalStyle`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	html, body {
		background: #f2f3f4;;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	a {
		text-decoration: none;
		color: #fff;
	}
`
```

字体库用的阿里的[iconfont官网地址](https://www.iconfont.cn/),选择好图标之后下载至本地 (本项目下载 unicode 模式).

在 assets 目录下新建一个名为 iconfont 的文件夹，将.css, .eot, .svg, .ttf, .woff 为后缀的文件放到这个文件夹中。 然后将这个 css 文件做一些手脚，需要改成 js 代码。iconfont.js代码如下:
```js
import {createGlobalStyle} from'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url ('iconfont.eot?t=1565320061289'); /* IE9 */
  src: url ('iconfont.eot?t=1565320061289#iefix' ... 省略 base64 巨长字符) format ('embedded-opentype'), /* IE6-IE8 */
  url ('data:application/x-font-woff2;charset=utf-8) format ('woff2'),
  url ('iconfont.woff?t=1565320061289') format ('woff'),
  url ('iconfont.ttf?t=1565320061289') format ('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url ('iconfont.svg?t=1565320061289#iconfont') format ('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
...
`
```
接下来，咱们把字体引入 App.js 中:
```js
//App.js
import React from 'react';
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';

function App () {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <i className="iconfont">&#xe62b;</i>
    </div>
  );
}

export default App;
```
接下来大家打开页面可以看到一个小小的放大镜，背景变为浅灰色，字体图标和默认样式起到了效果。

## 路由配置
应用的骨架顶部有固定的内容及**tab**栏，下面对应不同的功能组件。
```sh
npm install react-router react-router-dom react-router-config --save
```
routes 目录下新建 index.js 文件，利用 react-router-config 来对路由进行配置。
```js
//routes/index.js
import React from 'react';
import { Redirect } from "react-router-dom";
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      {
        path: "/recommend",
        component: Recommend
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
]
```

为了让路由文件生效，必须在 App 根组件下面导入路由配置，现在在 App.js 中:

```js
import React from 'react';
import { GlobalStyle } from  './style';
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
import { IconStyle } from './assets/iconfont/iconfont';
import routes from './routes/index.js';
import { HashRouter } from 'react-router-dom';

function App () {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      { renderRoutes (routes) }
    </HashRouter>
  )
}

export default App;
```

### 新建组件文件
在 application 目录下，新建 Home 文件夹，然后新建 index.js 文件:
```js
//src/appliction/Home/index.js
import React from 'react';

function Home (props) {
  return (
    <div>Home</div>
  )
}

export default React.memo (Home);
```
然后类似的，创建 Recommend、Singers 和 Rank 组件。

启动项目，打开页面，你可以看到 "home" 已经显示到屏幕，但是这还不够，我们需要展示下面的功能组件，但是你在地址后面加上 /recommend，却并没有显示 Recommend 组件相应的内容，因为 renderRoutes 这个方法只渲染一层路由，之前 Home 处于数组第一层，后面的功能组件在第二层，当然不能正常渲染啦。其实要解决这个问题也非常简单，只需在 Home 中再次调用 renderRoutes 即可。
```js
//src/appliction/Home/index.js
import React from 'react';
import { renderRoutes } from "react-router-config";

function Home (props) {
  const { route } = props;

  return (
    <div>
      <div>Home</div>
      { renderRoutes (route.routes) }
    </div>
  )
}

export default React.memo (Home);
```
好，现在你可以访问 /recommend 路由，应该可以看到 Recommend 中的内容。同理，现在也可以正常访问其它的路由啦。

## 公共组件开发

路由折腾清楚后，我们来着手开发项目的第一个组件: Home 组件。

### 全局样式准备
现在要真正开始写样式了，为了统一风格，需要一些全局样式配置，在 assets 目录下新建 global-style.js, 内容如下:
```js
// 扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}
// 一行文字溢出部分用... 代替
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

export default {
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba (212, 68, 57, .5)',
  'font-color-light': '#f1f1f1',
  'font-color-desc': '#2E3030',
  'font-color-desc-v2': '#bba8a8',// 略淡
  'font-size-ss': '10px',
  'font-size-s': '12px',
  'font-size-m': '14px',
  'font-size-l': '16px',
  'font-size-ll': '18px',
  "border-color": '#e4e4e4',
  'background-color': '#f2f3f4',
  'background-color-shadow': 'rgba (0, 0, 0, 0.3)',
  'highlight-background-color': '#fff',
  extendClick,
  noWrap
}
```
### 顶部栏开发
首先，在 Home 目录下新建 style.js，创建 CSS 样式组件:
```js
import styled from'styled-components';
import style from '../../assets/global-style';

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${style ["theme-color"]};
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`
```
很简单的布局和样式，就不过多解释了。接下来在 Home 组件应用这些样式
```js
//src/appliction/Home/index.js
import React from 'react';
import { renderRoutes } from "react-router-config";
import { Top } from './style';

function Home (props) {
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      { renderRoutes (route.routes) }
    </div>
  )
}

export default React.memo (Home);
```
接着来编写上面的 tab 栏，先定义样式:
```js
export const Tab = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${style ["theme-color"]};
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`
export const TabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
```
在 Home 组件中使用:
```js
import React from 'react';
import { renderRoutes } from "react-router-config";
import {
  Top,
  Tab,
  TabItem,
} from './style';
import { NavLink } from 'react-router-dom';// 利用 NavLink 组件进行路由跳转

function Home (props){
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">Web App</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>
      { renderRoutes (route.routes) }
    </div>
  );
}
 
export default React.memo (Home);
```
打开页面，现在一个像样的 WebApp 头部就出来了，并且点击不同的 tab 会显示不同的功能组件

## redux 准备
```sh
npm install redux redux-thunk redux-immutable react-redux immutable --save
```
其中 redux-immutable 大家可能比较陌生，因为项目中需要用到 immutable.js 中的数据结构，所以合并不同模块 reducer 的时候需要用到 redux-immutable 中的方法.
### 创建 store
在 store 文件夹下面新建 index.js 和 reducer.js 文件:
```js
//index.js
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore (reducer, composeEnhancers (
  applyMiddleware (thunk)
));

export default store;
```
```js
//reducers.js
import { combineReducers } from 'redux-immutable';

export default combineReducers ({
// 之后开发具体功能模块的时候添加 reducer
});
```
### 项目中注入 store
现在 App.js 中代码如下:
```js
import React from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from  './style'
import { renderRoutes } from 'react-router-config'
import { IconStyle } from './assets/iconfont/iconfont'
import store from './store/index'
import routes from './routes/index.js'
import { HashRouter } from 'react-router-dom';

function App () {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        { renderRoutes (routes) }
      </HashRouter>
    </Provider>
  )
}

export default App;
```
现在功能依旧能用，但是打开控制台会有这样报错,因为现在没有开发出具体的 reducer 函数，没关系，随着之后的开发，这个错误会自动消失。