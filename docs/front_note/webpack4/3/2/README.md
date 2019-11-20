# Entry和Output的基础配置

>**现在我有一个需求**  
把资源打包两份,一个叫main.js,一个叫sub.js.

1. 上面2-的章节里面,我们配置了`entry:./src/index.js`,这是一个简写,全貌是
```
entry:{
    main:'./src/index.js'
}
```
从直觉上解读这代码的意思是,入口文件本来是main,现在我改成index.其实是错的,真正意思是打包成main.js的文件从index.js开始打包.

2. 我们可以让他打包两份其实就是在对象里写两次声明.
```
entry:{
    main:'./src/index.js',
    sub:'./src/index.js'
}
```
打包,失败了.原因是你打包多个文件,但是你目前生成的文件都叫bundle.js,冲突了.

3. 我们修改filename,使用占位符命名:`filename'[name].js'`.name就是对应的entry的key值.
打包,成功.发现有2个文件,main.js和sub.js是一样的,并且index.html全部引入了.

>**需求是这样的**  
dist文件中index.html是给后端放在服务器上的,但是js文件为了性能是要放在cdn上的.

1. 只需要配置publicPath即可.
```
output:{
    publicPath:'https://cdn.com.cn',
    filename:'[name].js',
    path:path.resole(_dirname,'dist')
}
```

2. 打包,成功,发现script标签都是引入的cdn的文件地址.

3. 上传js文件到响应的cdn服务器上即可.