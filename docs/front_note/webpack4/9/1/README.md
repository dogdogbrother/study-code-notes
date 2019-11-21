# 用Preloading和Prefetching懒加载文件

### coverage工具分析打包后js的利用率,性能检查.

1. 打开coverage操作如下.打开控制台--》点击‘Sources’--》ctrl+shift+p--》在命令窗口输入coverage--》在下边新出现的窗口中点击左上角刷新按钮。

2. 我们可以看到加载的js文件的大小,还可以看到利用率是多少.这里我们会发现一个待优化的地方,就是我们在渲染首页内容的时候,除了渲染了展示页面所需要的js,还把一个事件函数的js加载了进来.然而我们也许根本就不需要点击这个页面进行任何操作,那么这段事件代码就等于白加载了.我们先优化一点点,根据前面的文章我们发现可以用异步加载函数的形式,让用户点击时才加载js文件.我们新定义一个click.js文件.
```JavaScript
function handleClick(){
    const element = document.createElement('div');
    element.innerHTML = '我测试点击了';
    document.body.appendChild(element);
}
export default handleClick();
```

3. 这里我们的优化是,当用户点击加载页面的时候,我们在执行动作所需要的代码.

```JavaScript
document.addEventListener('click',() =>{
    import('./click.js').then(({default:func}) => {
        func();
    })
})
```

4. 打包,测试,我们控制台中并没有加载click.js文件,当我们点击页面,才加载文件.但是这样问题又来了,我们点击才加载文件这也需要时间的啊.还可以再优化,我们可以让用户在首页文件加载完毕后,网络空闲的时候再把click.js文件下载下来,而不用等待用户操作.这样我们就需要用到webpack的`Preloading`和`Prefetching`了.
```JavaScript
document.addEventListener(/*webpackPrefetch*/'click',() =>{
    import('./click.js').then(({default:func}) => {
        func();
    })
})
```

5. `Preload`和`Prefetch`不同的地方在于`Preload`会和主文件一起加载,`Prefetch`是等待网络空闲的时候