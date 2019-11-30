# rxjs

## 前言
前端的数据管理名气最大的应该就是vue的vux,和react的redux了.

我个人对`rxjs`是不懂的,只是在react Hook特性刚出的时候,在项目中选型的时候对于`react-redux`和`reduce Hook`的选型很困惑,在龙猫的帮助下,尝试了下`rxjs`一些最基本的用法,我感觉很好用啊.


## 安装使用

### 1. 要先安装`rxjs`库到本地:
```sh
npm i --save rxjs
```
### 2. 在src目录下新建一个rxStore目录

这个不是必须的步骤,只是为了更好管理数据,这个目录下可以有很多个js文件,每个js文件都对应一组全局状态的数据.

我们新建一个`user.js`文件,作为用户信息的全局状态,代码内容如下:
```js
import { BehaviorSubject } from "rxjs"

export const userInfo = new BehaviorSubject({
  loginStatus: false, //默认是未登录状态
  userName:'', // 用户名
})

export const updateUserInfo = (obj) => {
  let value = userInfo.value
  userInfo.next({
    ...value,
    ...obj
  })
}
```
`Behavior`是行为的意思,`Subject`是主题,主体的意思,我们通过new这个构造函数的时候,就能创建一个store数据仓库.

我们还可以自定义一个函数,通过函数内部的逻辑来进行数据状态的更新.需要注意的是我们是通过`userInfo.value`来拿到当前store值的.

### 3. 使用下刚才定义的store仓库
```js
import { userInfo, updateUserInfo } from '../../rxStore/user'

const InfoComponent = ()=> {
  let cUserInfo = useObservable(() => userInfo.asObservable()) || userInfo
  // cUserInfo 也就是我们拿到的数据
  updateUserInfo({ userName: '我的用户名', loginStatus: true })
  // 通过导出的函数还覆盖掉 cUserInfo
}
```
简简单单的例子,你却发现redux和vux能做到的他也能做到,`userInfo`是具有双向绑定能力的!!!

## 总结
`rxjs`简单强大,当然功能当然不止这么点(可我知道的就这么点),如果我后面接触的多的了话我会继续更新的.




