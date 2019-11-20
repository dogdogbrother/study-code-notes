# sourceMap的作用和配置

>**我们打包后,打开文件,发现main.js文件96行报错.**  
sourceMap,它是一个映射关系,他知道dist目录下的main.js文件96行实际对应的是src目录下的index.js文件的第一行.


## 配置

1. 上面我们的代码中是可以配置devtool项的,他默认是none,现在我们改成souce-map就行了.

2. 重新打包,依旧报错,但是错误行显示的是src/index.js第一行.

3. 打开webpack官网,搜索devtool,有一张表,里面列举了sourceMap的属性值和相对应的性能影响.可以看到,source-map会让打包变慢的,因为他要构建这种映射关系.
我们还可以看到dist文件中多出一个main.js.map文件.

4. 我们尝试改devtool值为inline-source-map.打包,测试效果和刚才是一样的,不过少了main.ja.map文件.查看main.js文件发现其实映射文件是打包到js文件里面了.

5. 我们再尝试`devtool:cheap-inline-source-map`.打包,测试,发现效果还是一样的.
cheap的作用是在抱错的时候只需要抱哪一行就行了,不用精准到字符列上.所以cheap的打包效率会高一点.
cheap还有一个作用是,他只针对业务代码有效果,像第三方模块,loader都不会建立映射关系.

6. 如果你不禁想处理业务代码,还想管理第三方模块的报错,那么可以修改为
`cheap-module-inline-source-map`

7. eval效率是最高的,具体的后面我查看下其他人的博客,再补.

## 推荐最佳实践
1. 开发过程中,我们的`mode:development`时,`devtool:cheap-module-eval-source-map`