# 使用Loader打包静态资源(css篇)

## 打包过程

1. 在5-笔记中,我们import了图片资源,但是能import css资源吗?
`import './index.css '`
尝试打包,失败.很明显,打包img的思路并不适用于css文件.

2. 我们在rules数组中新添加个规则进行配置.
```JavaScript
{
    test:/\.css$/,
    use:['style-loader','css-loader']
}
```
install安装后再次打包,我们发现样式已经生效了.

## style-loader和css-loader的作用

1. `css-loader`可以帮我们处理解析css文件中import css的行为,可以让几个css文件可以相互关联.
2. 打开F12查看便签信息,发现被影响的元素身上挂载了style属性,这就是`style-loader的`的作用.通常这两个工具是搭配使用的.

## 如果我们使用sass,less等预处理工具

1. 很明显我们需要更改配置.`test:/\.sass$/`.
测试打包,成功.打开页面发现没有效果.F12查看便签信息,发现style的值就是sass编写时的值,没有变成可用的css样式.

2. 明显我们缺少一个编译css的loader,在use中添加sass-loader
` use:['style-loader','css-loader',sass-loader]`
intall,测试打包,成功,查看页面也没有问题.

3. loader运行过程是有顺序的,是先执行sass-loader,后执行css-loader,最后执行style-loader;

## 自动添加浏览器前缀的loader-----postcss

1. 相比较上面的loader而言,postcss-loader的安装是稍稍麻烦一点的.他需要在根目录下新建postcss.config.js文件,可以在webpack官网上查看配置教程.

2. 在use数组中添加postcss-loader,打包.

3. 查看页面,css3属性的前面会自动加上`-webkit-`

## 知识点

1. loader工具执行的顺序是从右到左,从下到上执行的.