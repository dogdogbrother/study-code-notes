# 使用webpackDevServer提升开发效率

>**先说个简单的,watch指令**  
我们现在每次编写完代码,都要npn run bunlde打包,打包后才能看到效果,非常的不方便,我想每次编写玩代码保存后自动打包.

1. 在package.json文件中修改scripts参数.
```JavaScript 
scripts:{
    watch:'webpack ---watch'
}
```

2. 执行`npm run bunlde`,测试,每次保存新代码,dist目录中的文件都会更新.

>但是这样还不够好用,我们想要运行一个命令,能自动帮我们打开浏览器,还能模拟一些服务器的特性.这就用到了devServer.

1. 依旧是先按照`npm install webpack-dev-server -D`

2. 在webpack.config.js文件的根级上添加devServwe配置.
``` JavaScript
devServer:{
    contentBase:'./dist'
}
```
contentBase是最基础的配置,webpack帮我们起一个服务器,根路径就是dist目录.

3. 需要在package.json中的scripts写个脚本,`start:'webpack-dev-server'`

4. 测试,输入`npm run start`,CMD提示,locahost:8080服务已经启动.这很vue,也很react,不错,也有热加载的功能.

5. 现在只有contentBase配置,我们还可以添加`open:true`,这样当我们执行npm run start的时候,就会默认打开浏览器.

6. 打开官网看下devServer都有啥配置,就会发现2个非常熟悉的配置,proxy代理,和port端口改变.

## 知识点
1. webpack不仅可以在命令行中执行,也可以通过nodeJS来执行,node有webpack的中间件,webpack官网也有对于node API的介绍.