# 关于命令的优化

## 编译成js

我们现在命令只有`dev: "ts-node ./src/crowller.ts"`,这个命令会先把ts编译成js后再执行.

再加上`build: "tsc"`命令,tsc会帮我们在ts文件下面生成一个js文件.这样比较乱,我们可以把所有的编译后的js文件放到一个叫做build目录下.这就要修改 `tsconfig.json` 配置文件了.

修改 outDir 参数,值为 `"./build"`.再次执行`npm run build`测试,没问题.

## 自动化编译

因为浏览器不认识TS文件,我们每次写完TS文件后,还要执行build命令才能生成js.太麻烦了,可以通过`build: "tsc -w"`配置,当我们修改了TS文件,就会自动执行tsc.

还有问题,只是编译了js文件,但是还要手动执行js文件啊,这就引出了第二个命令`dev: "nodemon node ./build/crowller.js"`,当然我们现在还没有安装nodemon,安装下:
```ssh
npm i nodemon -D
```
测试下,运行... 发现bug,程序会不停的重启.这个是因为重新执行了`crowller.js`文件后更改了`data/course.json`,导致进入了死循环.我们需要排除监听data目录下的文件,查看nodemon文档,得知配置方法,修改package.json:
```json
{
    //...
    "nodemonConfig": {
        "ignore": [
            "data/*"
        ]
    }
}
```

## 最终版配置

还有一个待优化的点,就是我们要么开启转js的 wtc 命令,要么开启执行js的 nodemon 命令.

如果我们想编写TS的同时,自动转成js并且自动重新执行的话,就需要 concurrently 工具:
```ssh
npm i concurrently -D
```
concurrently 官方用法是这样的`concurrently npm run build & npm run start`,我们可以用个小技巧让代码更可读.全部命令如下:
```json
{
    "scripts": {
        "dev:build": "tsc -w",
        "dev:start": "nodemon node ./build/crowller.js",
        "dev": "concurrently npm:dev:*"
    },
}
```


