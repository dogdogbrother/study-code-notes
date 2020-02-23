# 简单的jest项目

## 先起个项目
先初始化项目:
```sh
npm init
```

再安装jest:
```sh
npm install jest@24.8.0 -D
```

然后复制下上个章节的运算函数,新建`math.js`文件:
```js
function add(a, b) {
    return a + b
}

function minus(a, b) {
    return a - b
}

module.exports = {
    add,
    minus
}
```

再建立`math.test.js`文件,不同的是test和expect函数不需要我们自己定义了:
```js
const { add, minus } = require('./math.js')

test('测试加法 3 + 7',() => {
    expect(add(3,3)).toBe(6)
})
test('测试减法 3 - 3',() => {
    expect(minus(6,3)).toBe(3)
})
```

修改`package.json`的test命令:
```json
{
    "test": "jest"
}
```

当我们运行`npm jest`,jest命令会找到目录下所有以test.js结尾的文件并执行.

OK,测试通过了.

## 对jest简单配置下
我们之所以能使用`npm jest`去测试,是因为 jest 本身就有默认的配置,如果你想对 jest 进行配置你可以这么做,命令行输入:
```sh
npx jest --init
```
会给你一些选项,让你选择.

1. Choose the test environment that will be used for testing
**选择将用于测试的测试环境.**
可以选择node和jsdom(browser-like)浏览器.

2. Do you want Jest to add coverage reports?
**您是否希望Jest添加覆盖率报告？** Y

3. Automatically clear mock calls and instances between every test?
**是否在每次测试之后清除 mock/调用 等事情?** Y

选择结束后,目录就多出一个`jest.config.js`的文件,里面有茫茫多的配置,不过都是被注释掉的,其中只有 clearMocks 和 coverageDirectory 两个刚才我们选择过的配置是没有注释的.
>第一个测试环境的选择呢?  
其实就是已经注释的 `browser: false`,如果是选择的是node环境,这个就开放了.

我们可以再次执行`npx jest --coverage`.

开发现命令行输出了覆盖率报告,不仅如此,我们的目录下还会生成一个coverage的目录,里面有一个index.html文件,打开就会发现网页版的覆盖率报告.

>Directory 是目录的意思,`coverageDirectory: coverage`就是把报告文件放到coverage目录下.  
当然,你可以修改为任何的名字.

## 让jest可以使用import
上面我们的代码都是用的CommonJS的导入导出,这在node中是没问题的,但是我们更多的jest是用在前端的,前端绝大多数都是用import的:
```js
export function add(a, b) {
    return a + b
}

import { add } from './math'
```

所以我们还要通过 **babel** 来把require转成import.
```sh
npm i @babel/core@7.4.5 @babel/preset-env@7.4.5 -D
```

安装了babel就要配置babel文件,根目录下创建`.babelrc`文件:
```json
{
    "presets": [
        [
            "@babel/preset-env", {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}
```
我们再次执行`npm test`,发现 ES module 形式也是没问题的.