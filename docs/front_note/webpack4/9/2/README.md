# CSS文件的代码分割

### 我们可以打开webpack官网,documentation下的plugins下的MiniCssExtractPlugin,这个工具就能帮我们进行代码分割.

1. 前面我们写了很多例子,有些例子里面其实也是引入了css文件,第五章我们其实就是讲的css的loader.可是我们会发现,纵然我们的案例中是有css的引入的,但是在打包后缺没有生成响应的css文件,而是只有main.js.
   + 这是因为css文件的内容被打包进了js文件,这是个概念,叫做`css in js`.
如果我们想把css单独抽离出来,不打包进css里面,这就需要`MiniCssExtractPlugin`这个插件了.

2. 不过`MiniCssExtractPlugin`有点缺陷,在官网中我们可以看到,MiniCssExtractPlugin的HMR热更新功能还是列在todo中,还没做好这个功能,这就意味着css代码分割只能用于打包,而不太能用在开发中.
   + Extract的意思是提取.

3. 安装官网的指导走,安装 `npm install --save-dev mini-css-extract-plugin`

4. 2条里面说了,这个适合在线上环境使用,所以我们需要在`webpack.prod.js`文件里面引入配置下.
```JavaScript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
... //省略其他引入的代码
const prodConfig = {
    ... //省略其他配置项的代码
    plugins:[
        new MiniCssExtractPlugin({})
    ]
}
module.export = ... //省略代码
```

4. 光配置了css还不够,我们还需要配置rules.我们把`webpack.common.js`文件中关于css的loader剪切一下,拿到`webpack.dev.js`中,也就是在开发环境中,对css文件的处理还是一样的.这里我们开始修改`webpack.prod.js`文件,我们把`'style-loader'`换成`MiniCssExtractPlugin.loader`.

5. 再次打包测试,发现失败,只有main.js,没有css文件. 原因有很多其中之一就是我们在`webpack.dev.js`中设置了`usedExport`属性,这个是为了前面我们说的摇树,tree shaing.因为设置了`usedExport`,webpack会给所有的模块作用,但是现在我要`usedExport`不作用于css文件.

6. 修改package.json文件,`sideEffects:["*.css"]`,然后记得把`usedExports:true`放到common中去.再次打包测试,发现已经有css文件了.但是这个文件不是压缩的,我们需要压缩,所以还需一步.

7. 安装 `npm run optimize-css-assets-webpack-plugi -D`
  
8. webpack.prod.js中引入加配置.
```JavaScript
const OptimizeCssAssetsWebpackPlugi require("optimize-css-assets-webpack-plugi"
optimization:{
    minimizer:[new OptimizeCssAssetsWebpackPlugi({})]
}
```

9. 再次打包,测试,没问题.