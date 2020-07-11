# 用 npm script 打造超溜的前端工作流

## 跳过`npm init` 的询问环节
`npm init` 的确问题会写到 package.json 里面，可以重复 `npm init` 来修改 package.json。  
如果觉得麻烦，可以使用 `npm init -f` 来跳过确认问答。
> -f 意指 --force，强迫的意思。也可以使用 --yes。

## npm 是如何管理和执行各种 scripts
`npm run` 实际上是 `npm run-script` 命令的简写，`npm run xxx` 时，会从 package.json 文件中读取 `scripts` 对象里面的全部配置,`xxx` 作为键匹配命令，找不到直接报错。  
举例我执行 `npm run eslint`,npm 在执行指定 `script` 之前会把` node_modules/.bin` 加到环境变量 $PATH 的前面,所以我们才不用输入完整的路径命令例如`./node_modules/.bin/eslint **.js`。

## 多条 npm 命令的串行
串行就是有顺序的执行。可以使用 `&&` 符号最为连接，如下：  
```
"test": "npm run lint:js && npm run lint:css && npm run lint:json && npm run lint:markdown
```
> 需要注意的是串行的命令如果报错了，后续的全部都会终止。

## 多条 npm 命令的并行
并行的意思就是一起执行，实现方式更简单，把连接多条命令的 && 符号替换成 & 即可。

## npm-run-all 的使用
如果觉得太繁琐，可以用工具简化下，要先安装:
```shell
npm i npm-run-all -D
```
修改 package.json 命令如下：
```
"test": "npm-run-all lint:js lint:css lint:json lint:markdown"
```
除此之外还支持通配符匹配分组script:
```
"test": "npm-run-all lint:*"
```
如果需要并行的话,加上 parallel(平行线) 参数：
```
"test": "npm-run-all --parallel lint:*"
```

## 给 npm script 简单的添加注释
json格式的文件很严格，不能随便写东西，但是可以使用 `"//": "运行所有代码检查和单元测试"` 的方式，`npm` 会忽略这种key键。

## 调整 npm script 运行时日志输出
可以使用 `--loglevel silent` 或者 `--silent` 或者 `-s` 简写来减少日志输出内容。  
相反的，可以使用 `--loglevel verbose` 或者 `--verbose` 或者 `-d` 来详细的打印出每个步骤的参数、返回值。
> silent寂静的。  verbose冗长的，啰嗦的。

## npm script 的两个钩子
举例来说，运行 npm run test 的时候，分 3 个阶段：
1. 检查 scripts 对象中是否存在 pretest 命令，如果有，先执行该命令；
2. 检查是否有 test 命令，有的话运行 test 命令，没有的话报错；
3. 检查是否存在 posttest 命令，如果有，执行 posttest 命令；

## 使用预定义变量
通过运行 `npm run env` 就能拿到完整的变量列表，这个列表非常长, `npm run env | grep npm_package | sort` 拿到部分排序后的变量。  
变量的使用方法遵循 shell 里面的语法，直接在 npm script 给想要引用的变量前面加上 $ 符号即可。比如：
```shell
{
  "dummy": "echo $npm_package_name"
}
```
> 膈应的是，`$` 引用变量不能使用在windows下，windows必要要用 `%npm_package_name%` ,所以正常还是用 `cross-env` 解决。

## 使用自定义变量
假如我们的测试覆盖率报告分享给别人，就需要本地起一个服务，端口号就可以作为变量配置使用。
```shell
npm i http-server -D    # 等价命令 npm install http-server --save-dev
```
然后在 package.json 中配置下 config 选项，然后就能在 scripts 中用 `$npm_package_config_port` 来调用了：
```json
{
  "config": {
    "port": 3000
  },
  "scripts": {
    "cover:open": "opn http://localhost:$npm_package_config_port",
  }
}
```

## 脚本的跨平台兼容
我们在 `npm script` 中的很多脚本操作，在Linux、Mac上没什么问题，但是在Windows就会不支持了，这是因为不是所有的 shell 命令都是跨平台兼容的。  
最简单的粗暴的方法就是写2个 script 脚本，不过更好一点的做法是利用社区提供的跨平台兼容的包：
1. rimraf 或 del-cli，用来删除文件和目录，实现类似于 rm -rf 的功能；
2. cpr，用于拷贝、复制文件和目录，实现类似于 cp -r 的功能；
3. make-dir-cli，用于创建目录，实现类似于 mkdir -p 的功能；
先安装下:
```shell
npm i rimraf cpr make-dir-cli -D
```
然后直接把对应的shell命令替换下就行了：
* `rm -rf` 直接替换成 `rimraf；`
* `mkdir -p` 直接替换成 `make-dir`；
* `cp -r` 直接替换成 cpr,特别说明下，`cpr` 默认是不覆盖的，需要显示传入 `-o` 配置项，并且参数必须严格是 `cpr <source> <destination> [options]` 的格式，即配置项放在最后面

## 用 cross-env 处理环境变量的兼容
```shell
npm i cross-env -D
```
```json
"scripts": {
  "test": "cross-env NODE_ENV=test mocha tests/",
}
```
如果这个时候你在项目中打印 `process.env.NODE_ENV` ，就会输出 `test` 。