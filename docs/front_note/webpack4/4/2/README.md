# Hot Module Replacement 热模块更新

>webpackDevServer虽然对开发有所提升,但是每次保存打包都要重新打包,举例我更改了css代码,页面就要刷新,非常的不方便.这不是我想要的热更新.

1. vue也有npm run build 和npm run dev,在dev的时候,并没有dist目录的生成,这是因为vue使用的就是Hot Module Replacement,其实也是打包了,只是打包在了内存里面,这样让我们的更新代码的效率更高.

2. 先要配置devServer选项.
```JavaScript
devServer:{
    contentBase:'./dist',
    open:true,
    port:8080,
    hot:true,
    hotOnliy
}
```
hot是打开Hot Module Replacement功能,hotOnly的意思即使HMR功能没有生效,我也不让浏览器刷新.

3. HMR是webpack自带的插件,所以我们要先引入webpack插件.
`cons weboack = require('webpack');`

4. 在plugins中添加插件`plugins:[...,..,new webpack.HotModuleReplacement()]`

5. 测试,更改样式代码,页面没有刷新,但是样式显示却改变了.完美.

>但是我们发现一个新的问题,就是js代码改变的时候,页面也没有变动.

1. 这个需要我们单独写代码才行,我们在需要热加载的js文件写如下代码.
```JavaScript
if(module.hot){
    module.hot.accept('./index.js',()=>{
        document.body.removeChiold(document.getElementById('app'));
        appInit();
    })
}
```

2. 这段代码的意思是假如module.hot存在,就代表着我们开启了HMR功能,我们监听需要改变的js文件的位置,如果这个文件的代码被改动了,那么我们就清除掉这个js文件挂载的相关元素,然后执行这个文件,让他重新挂载.

3. 这里有个疑问,既然js要单独处理下,难道css就不需要单独处理吗?
答案是css也需要处理,只是css-loader帮我们处理好了,我们感知不到.

4. vue也有热更新,是写在了vue-loader中.