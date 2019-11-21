# Develoment和Production模式的区分打包

## 回顾

### 通过前面的章节我们大概知道了Develoment和Production的一些区别.

1. 例如Develoment打包是为了让我们开发,打包后的文件是放到内存里面的.Production是会真的生成一个目录,并且会压缩代码.

2. devtool配置也要改.

3. Production下,Tree Shaking概念中的optimization也要去掉

4. 那么问题来了,我们在日常开发中会经常开发和发布,就要不停的改webpack.config.js文件,非常麻烦.

## 所以最终方案是
1. 我们建立2个文件,一个是`webpack.dev.js`,负责Develoment模式下的配置.`webpack.prod.js`是线上打包Production的配置.

2. 更改package.json的scripts的指令.
```JavaScript
    "scripts":{
        "dev":"webpack-dev-server --config webpack.dev.js",
        "build":"webpack --config webpack.prod.js",
    }
```

3. 这样我们就可以用`npm run dev`开发,和`npm run build`打包,这很vue.

4. 这样使用上是没问题的,但是可以再优化一点点,我们的webpack.dev.js和webpack.prod.js有很多重复代码,我们可以再建立一个webpack.common.js来放公共代码.

5. 想一想就发现问题了,抽离后的webpack.dev.js内容很少,只是这样的webpack是执行不了的,怎么把webpack.dev和webpack.common结合起来呢?

6. 安装 `npm install webpack-merge -D`

7. 然后使用webpack-merde结合两个配置即可.webpack.dev.js代码如下.
```JavaScript
const merge = require('webpack-merge);
const commonConfig = require('./webpack.common.js');
const devConfig = {
    mode:'development',
    ...
}
module.exports = merge(commonConfig,devConfig)
```