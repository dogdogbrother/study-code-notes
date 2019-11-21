# webpack下Code-Splitting的实现,splictChunks

>8章的例子中,我们是手动分割了业务代码和库代码,虽然能实现效果,但是有点不太方便.这里我们使用webpack自带的工具,splictChunks.

1. 把16的代码恢复下没有进行分割的状态,然后配置下optimization,optimization优化前面其实也用到了,14章中Tree Shaking.
```JavaScript
    optimization:{
        splitChuncks:{
            chunks:'all'
        }
    }
```
打包测试,发现lodash库已经被智能的抽出来了.

>看到这里我们不得不想到一个问题,那就是vue的路由懒加载本身不就是code splitting吗,进入这个路由的时候再加载,不需要的时候就不加载.那么他又是如何实现的呢?慢慢探索.

1. 我们把index.js的库的引入包括业务代码都删了.编写如下代码.

```JavaScript
    function getComponent(){
        return import('lodash').then(({ default : _ }) => {
            var element = document.createElement('div');
            element.innerHTML = _.join([2019,07,16],'/');
            return element;
        })
    }
    getComponent().then(element => {
        document.body.appendChild(element);
    })
```
这个函数的逻辑是,我们异步获取这个库,当我们获取好了,就把元素挂载到页面中.

2. 打包测试,发现报错.说是import()这个语法是实验语法,现在是不支持的.那么明显的,我们现阶段的babel不支持,还需要增加babel的配置才行.

3. `npm install babel-plugin-dynamic-import-webpack --sava-dev`

4. .babelrc中添加这个plugin.`plugins:["dynamic-import-webpack"]`

5. 再次打包,测试,没问题.webpack对异步加载的模块也是会自动代码分割的.需要特殊说明的是,import()引入的文件的代码分割是无需做任何配置的.

## 知识点

### import()动态加载模块的语法要单独说明一下.

1. 先举例下正常的 `import` 导入.
```JavaScript
//  报错
if(x === 2){
    import _ from 'lodash';
}
```

2. 报错的原因是,`import`命令是会被JavaScript引擎静态分析,先于模块内的其他语句执行.引擎处理`import`语句是在编译时,这时不会去执行`if`语句,所以把`import`放在`if`代码块中是毫无意义的.

3. 这样的设计虽然有利于编辑器提高效率,但也导致无法在运行时加载模块.这点`import`就不如`require`,`require`是动态加载模块的,就是说只有当代码运行到`require`语句的时候,才开始加载的动作.