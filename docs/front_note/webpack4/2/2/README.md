# 使用Loader打包静态资源(图片篇)

## file-loader

1. 接着4-笔记接着来,如果我们想打包过后的文件命名不被修改的话,添加配置如下.
```JavaScript
rules:[
        {
            test:/\.jpg$/,
            use:{
                    loader:'file-loader',
                    options:{
                        name:'[name].[ext]'
                    }
                }
        }
]
```
`[name].[ext]`的意思是,老的名字和老的后缀,这个规则是placeholder占位符,可以打开官网webpack>loaders>file-loader查看响应的属性.举个例子.
`[name]_[hash].[ext]`,打包出来的图片的名字就是nama_2kj2j3nj988x.jpg.

2. 目前打包好的所以内容都是放在dist目录下的,如果我们想要把所以的图片资源都放在dist-images文件夹下.需要添加配置如下.
```JavaScript
options:{
    name:'[name].[ext]',
    outputPatch:'images/'
}
```

## url-loader

1. file-loader的功能url-loader也都有.我们把`file-loader`更换成`url-loader`,其他配置并不改动.
    重新打包,打包成功.但是有个问题,就是图片资源并没有被打包在dist目录内,但是我们打开html页面,却发现实际图片已经有了.
    
2. 什么情况呢,我们打开bundle.js文件,发现有如下一行代码.
  `eval("module.exports=\"data:image/jpeg;base64,/9j/4aaqsk....)`
  原来url-loader帮我们把图片资源已base64的形式加载到页面中了.
  这种的做法有好有坏,好的是js输入图片,少了一次http请求.但是js文件变大,导致加载js时间变长,页面空白比较久,得不偿失.
  所以优解的方案是,我们对于大的图片的话,就打包在dist文件夹,几KB图片的话就没有必要单独为他http请求,就打包在js文件中.
  
 3. 只要添加limit参数即可.
```JavaScript
options:{
    name:'[name].[ext]',
    outputPatch:'images/',
    limit:10240
}
```
这样再次打包,所有大于10kb的图片都会放到dist文件下面,小于10kb的会注入到js文件中.

## 知识点
1. url-loader和file-loader基本一致,但是url-loader多出一个limit配置.