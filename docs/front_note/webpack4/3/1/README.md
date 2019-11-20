# 使用plugin让打包更便捷

>前面的所有的打包后都有一个问题,当我们打包成功后是没有index.html文件的,需要我们手动添加入口文件,并引入打包好的js文件.比较麻烦,我们用plugin插件来解决这个问题.

1. 先安装plugin,打开官网,照着安装就行了.
   + 安装 `npm install html-webpack-plugin -D`
   + 引入 `const HtmlWebpackPlugin = require('html-webpack-plugin')`
   + 配置使用
```
{
    entry:...,
    output:...,
    plugins:[new HtmlWebpackPlugin()]
}
    
```
  
 2. 打包测试,成功.但是思考个问题.我们在使用vue-cli脚手架的时候,我们全部的操作其实都是建立于dom挂载到id为app的div中.而打包自动生成的html文件,自身是没有内容的.并且我们可以在src/index.html文件中添加css,js引入等等都是不影响打包过后的效果的.由此可见,plugins是可以配置模板的.如下
```
plugins:[new HtmlWebpackPlugin({
    template:'src/index.html'
})]
```

>我们在每次打包的成功时候,其实都是往dist目录中添加文件,并没有清空dist目录.

1. 什么意思呢,就是当我们没有删除dist目录下的文件的时候,更改了output配置,这样再打包,就会发现新老版本的js文件都存在.这样虽然没问题,但毕竟不太好.我们可以使用clean-webpack-plugin改善.

2. 安装和引入就忽略了吧,看完成后的代码.
```
plugins:[new HtmlWebpackPlugin({
    template:'src/index.html'
}),new CleanWebpackPlugin(['dist'])]
```

3. 每次打包的时候clean-webpack-plugin都会帮我们删除掉dist目录.

4. 这里我有个以为,这两个plugin插件的执行顺序是怎么控制的呢?如果我们是先执行HtmlWebpackPlugin再执行CleanWebpackPlugin岂不是在搞笑吗.事实上我们控制不了,只能通过查看文档来获得他们动作节点,自行判断顺序.
  
  
## 知识点
1. plugin 可以在webpack运行到某个时刻的时候,帮你做一些事情

2. html-webpack-plugin会在打包结束后,自动生成一个html文件,并把打包生成的js自动引入到这个html文件中.

3. clean-webpack-plugin都会帮我们在每次打包动作即将开始前,删除掉指定目录.