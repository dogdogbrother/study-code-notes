# loader简介

## loader是什么
我们打开webpack的官网,点击loaders或者plugins,会有茫茫多的工具配置说明,根本看不过来.
1. 接着3-文件我们如果在刚才的js文件中引入一个图片`var avatar = require('./avatar.jpg')`

2. 然后打包,运行`npm run bundle`,发现报错.这是因为webpack默认是知道怎么打包js模块的,但是他没有办法打包图片模块.这时候就需要我们告诉wabpack如何打包.

3. 我们进入webpack.config.js文件,添加如下代码
```JavaScript
module:{
    rules:[
        {
            test:/\.jpg$/,
            use:{
                    loader:'file-loader'
                }
        }
    ]
}
```
这段代码告诉webpack,当匹配到jpg结尾的文件时,就用file-loader工具进行打包.

4. 光添加配置没用啊,还得安装.`npm install file-loader -D`.再次打包,没问题.查看dist文件,多出一个命名乱序的图片,点击查看就是我们刚才引入打包的文件.原来webpack会把资源一并打包到dist目录.


## 知识点
1. 当file-loader发现一个需要打包的资源的时候,他会把这个资源移动到dist目录下,并改名(是可以自定义改名的),然后他会把资源在dist目录下的路径返回给js页面的变量之中.由此可见,file-loader可以打包任何东西,text,png等等,因为他不会解析,只是移动并返回值而已.

2.loader就是个打包的辅助方案,因为webpack只认js文件模块. 