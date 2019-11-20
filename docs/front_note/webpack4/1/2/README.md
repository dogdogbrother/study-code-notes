# webpack配置文件

当前的目录是这样的
```
  ├── node_moudule
  ├── index.html
  ├── index.js
  ├── package.json
  ├── package.lock.json
```
1. 我们执行`npx webpack index.js`
    会打包成功,当前目录下会多出一个dist文件夹,里面有main.js文件.
    这里其实有一个问题,那就是我们并没有定义打包后的路径是dist,也就是我们并没有配置webpack,他是如何运作的呢.
    其实是webpack是有默认的配置文件的,现在我们尝试编写下webpack的默认文件.

2. 我们在根目录下新建一个webpack.config.js的文件.
    我们执行`npx webpack`
    发现报错,因为我们并没有告诉webpack我们要编辑打包哪个文件.而webpack的配置文件现在还是空的,也不知道默认文件入口是谁,所以这个时候我们编写下webpack.config.js文件中的代码.
```js
module.exports = {
    entry:'./index.js',       //配置从那个文件开始打包
    output:{                 //配置出口文件信息
        filename:'bundle.js', //打包后的文件名
        path:path.resolve(_dirname,'bundle') //打包后的文件夹,这里需要的是绝对路径
    }
}
``` 
    
3. 运行`npx webpack`
    运行成功,根目录下多了一个bundle文件夹,里面有bundle.js文件.编辑成功.

4. 我们测试一个动作,我们把webpack.config.js文件改名为webpackconfig.js.
    再执行`npx webpack`就会报错,因为找不到配置文件了.
    怎么办呢?
    我们使用`npx webpack --config webpackconfig.js`来指定配置文件.
    测试成功,打包没问题.

5. 我们现在通过修改package.json文件中的配置来简化我们的命令行操作.
```js
'scripts':{
    'bundle':'webpack'
}
```
    这样我们就不用再执行`npx webpack`指令了,而是运行`npm run bundle`
    scripts内的指令和npx很类似,都是先在本地环境找工具命令,如果没有的话,然后在全局查找.
    
## 知识点

1. 安装webpack-cli的作用就是让我们在命令行中能使用webpack命令.