# getInitialProps
我们日常的SPA项目多页面可以共享数据,传输数据,是因为我们看似多个页面,其实是一个页面.

这种形式的数据在nextjs这种SSR上就行不通,因为每个页面都是服务器单端渲染出来的,数据之间的关联更复杂一些.

## 个人理解(会跟着对nextjs熟悉的程度而更改)
我们点击淘宝的一个页面,会发现在加载,如果加载成功了,才会跳转到新页面去. 而SPA单页面是先去一个新页面先白屏,再等待加载渲染内容.

淘宝的形式就是传统的服务端渲染的表现,而`getInitialProps`就是做这一点的.

因为是同构渲染,`getInitialProps`还有一个与传统服务端渲染不同的特性就是,他有可能会在服务端运行,也有可能在客户端运行.nextjs会判断,不会让两端重复执行.

两端渲染是什么意思呢?

举个例子,我从A页面点击link跳转B页面,这其实和服务端没什么关系,走的就是前端路由,`getInitialProps`中的异步操作就是在前端执行的.

但是我在B页面刷新了一下,这个时候B页面其实是由服务端渲染得来的,`getInitialProps`就会在服务端执行请求数据等等的操作,然后生成页面发送给前端.

## 基本使用

我们在a.js文件中使用下`getInitialProps`:

```js
import { withRouter } from 'next/router'

const A = ({ router, name }) => <span>{router.query.id}+A+{name}</span>

A.getInitialProps = () => {
    return {
        name: 'senlin'
    }
}

export default withRouter(A)
```
我们在A组件中就能拿到这个`name`值.

这只是个最基础的应用,我们还可以在`getInitialProps`里面进行异步的网络请求.

## APP中获取数据

pages下的任何理由页面都能拿到_app.js文件中的数据,是因为_app.js是nextjs默认内置的一个文件,是所有路由的父组件.

`getInitialProps`能在APP中拿到数据,我们在下一个章节里面去讲.