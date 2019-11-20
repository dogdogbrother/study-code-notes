# 了解webpack并安装

## 什么是webpack?
我们在html或者js文件中,如果使用import导入js文件的时候,是会失败的,因为目前的js文件是不支持ES Moudule模块的引入方式的.
这样就需要用webpack充当打包工具,他支持多种模块的引入规范,如ES Module / CommonJS / CMD / AMD

## 搭建webpack环境
webpack是基于nodeJS的工具,所以在使用webpack的时候一定要先按照nodeJS.
1. ` npm init `
    我们要初始一个文件夹.init是一个工具,会帮我们初始化一个符合node规范的一个文件夹.
    可以在命名后面加 -y 这样就会用默认配置进行初始化.
    
2. `npm install webpack webpack-cli -g`
    在这里我们在全局安装了webpack和webpack-cli,安装成功后可以使用 `webpack -v` 查看webpack版本号.
    不推荐全局安装webpack,举个例子,假如你的webpack的版本是4+,而电脑中有2个项目,一个是webpack4+一个是webpack3+.那么3+的项目将无法启动.
    如果你已经全局安装了webpack,那么可以使用 `npm uninstall webpack webpack-cli -g` 来卸载webpack和webpack-cli
 
3. `npm install webpack webpack-cli -D`
    在项目里面安装webpack和webpack-cli,这时候我们发现文件中多出一个node_moudule的文件夹,里面就是webpack工具所需要的资源包.
    我们运行`webpack -v`查看webpack版本,发现报错,这是因为查看的是全局的webpack工具,而我们是局部安装的.
    node提供了一个命令,叫做`npx`,npx工具会帮助我们在当前文件夹中的node_moudule中查找工具,我们运行`npx webpack`,命令行输出4.26.0 成功查看.


## 知识点总结

1. webpack安装当前文件夹中更科学.
2. webpack一般和webpack-cli搭配使用.
3. npx命令可以从当前局部查找工具.
4. 可以用`npm info webpack`查看能用的webpack版本号.
5. 可以用`npm install webpack@4.15.5 webpack-cli -D`来控制安装webpack版本.
6. 在初始化项目的时候,尽量用最近的nodeJS版本和最新的webpack版本,因为新版本的webpack会利用新版本的nodeJS特性,提升性能.
