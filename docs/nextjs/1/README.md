# Next.js
服务器端渲染 Server Side Rende,SSR是我们经常听到的词,然而nextjs与以往的php服务器渲染又不太一样,更应该被称为**同构渲染**.

同构渲染之所以应用而生,其实都是对于目前前端的主流技术`vue/react`单页面的2个致命缺点的弥补.
由于只有一个index.html页面,而且没有任何东西,内容全是js注入,这就带来2个问题:
1. js文件太大,就算是用了路由懒加载等方法尽可能的分割减少vender.js文件,稍稍大一些的项目也要3M起步,如果不用路由懒加载20M的js文件不是梦.

2. 因为内容文字都是在js中的,搜索引擎公司没有扫描你的文档信息而收录你的内容,所以SEO效果极差.

## 脚手架create-next-app来安装next项目

1. 全局安装这个脚手架工具
```
npm create-next-app
```
2. 然后和其他的脚手架工具差不多的
```
npx create-next-app my-next-app
```
nextjs自带服务器，但是它只是用来处理渲染内容，无法处理服务器，所以我们还要用koa来做后端，next只是用来中间件作用。
3. 安装koa先，然后根目录下创建一个server.js文件
```js

```
4. 添加pakes.json中的script命令,
```json
"dev": "node server.js"
```
5. `npm run dev`启动测试,没有问题.我们看到了脚手架工具默认的页面展示.

>与vue的cli,react的creat-react-app等脚手架工具不同的是,create-next-app做的事是很少的,我们其实完全可以不通过脚手架来初始化一个next项目.

## 手动安装next项目
```
npm init
npm i --save react react-dom next koa
```
我们在根目录下建立一个新的文件夹pages,里面放上一个index.js,内容导出一个标签.
```js
export default () +> <span>index页面</span>
```
运行`npm run dev`就能看到这个页面了,是不是非常的轻量.
>这个地方引发个思考,我们可以查看network,请求的html文件中就包含了`<span>index页面</span>`内容,这与以往我们开发的vue和react都是不一样的,页面内容不是由js注入的.  
带来的好处上面也说了,SEO友好(文档有内容,能抓到),对js的依赖的减轻也让页面加载速度更快了,减少了首页白屏的缺点.


