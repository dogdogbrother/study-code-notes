# webpack和浏览器缓存(caching),Shimming的作用

>场景是这样的,我们打包好后上线了,用户也访问我们的index.html文件了,用户加载了很多js文件,这时候如果用户刷新页面,其实是不会重复加载页面的,而是会从缓存中拿.

##### 那么问题来了,如果在用户浏览的过程中,我们更新了dist目录,用户在刷新页面会重新加载吗?答案是不会,因为我们js文件内容虽然变了,但是名字没变.浏览器还是默认是不变的.

1. 我们在webpack.prod.js中output设置下即可.
```JavaScript
    output:{
        filename:'[name].[contenthash].js',
        chunkFilename:'[name].[contenthash].js'
    }
```

2. 这里我写个备注,`filename`,和`chunkFilename`有什么不同呢,`filename`指的就是我们index.html直接引入的css文件,`chunkFilename1`是我们在js文件中引入的css文件.


>shimming是垫片的意思,这个意思其实是挺广泛的,只是一个概念.

##### 我们在以前用 `_` 来代替lodash,也经常使用 `$` 来来代替jq.那么我们没开一个新的js文件的时候都要import lodash和jq,实在有点麻烦.我们可以使用ProvodePlugin来处理.

>Provode意思是提供,规定,准备的意思.

1. 我们在webpack.common.js中编写如下代码.
```JavaScript
 plugin:[
    ...
    new webpack.ProvodePlugin({
        $:'jquery',
        _:'lodash'
    })
 ]
```

2. 这样,当我们在页面中使用 '$' 来使用jq的时候,webpack会自动帮我们在代码的头部生成`import $ from 'jquery'`.假如我们想使用`_join`这个方法呢,如下设置即可.`_join:['lodash','join']`

3. 如果我们在js文件中打印`this`,会输出什么呢.`this`其实就是当前模块自身,如果我想让这个this指向window可以吗.可以. 