# 使用Loader打包css静态资源(下篇)

## loader的配置项importLoaders

上章我们的loader是这样的
```JavaScript
{
    test:/\.scss$/,
    use:['style-loader','css-loader','sass-loader','postcss-loader']
}
```
如果我们想要控制css-loader具体细节的话,需要配置options
```JavaScript
use:[
    'style-loader',
    {
        loader:'css-loader',
        options:{
            importLoaders:2
        }
    },
    'sass-loader',
    'postcss-loader'
]
```
1. importLoaders用处是什么呢,就是当我们遇到import语法的时候,要再次执行此loader之前的2个loader.

2. 举个例子,当我们解析 `import './index.scss'`的时候,我们会从下倒上先执行`postcss-loader`自动添加上浏览器前缀,再执行`sass-loader`把文件内容变成css,`css-loader`帮我们解析文件中的import行为.

3. 但是如果我们这个时候我们scss文件中引入的是scss文件,那么我们就会解析失败,因为`sass-loader`执行过了.

4. 这个时候我们设置`importLoaders:2`就会告诉webpack,在`css-loader`解析的过程中,如果遇到了import,就跳回2个loader,也就是从`postcss-loader`重新开始解析.

## loader的配置项modules

>当我们的js文件中`import './index.js'`后,此js文件中的创建的元素主要class能对的上,就会样式生效.全局的css文件是不好控制的,所以webpack中对于css文件也有一个模块化的概念.**

1. 定义options配置项modules的值为true,开启css的modules功能.
```JavaScript
    options:{
        importLoaders:2,
        modules:true
    }
```

2. 在import css文件时命名引入而不是执行引入,
`import style from './index,scss'`
给元素添加class时,可以这样添加,`img.classLIist.add(style.setHeight)`

## 引入iconfont的注意事项

1. 当我们打包字体文件的时候,第三方字体scss文件中,会引入eot,ttf,svg等资源,这些资源css-loader是处理不了的.

2. 我们要配合file-loader
```JavaScript
{
    test:/\.(eot|ttf|svg)$/,
    use:{
        loader:'file-loader'
    }
}
```