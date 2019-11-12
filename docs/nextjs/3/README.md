# nextjs集成antd
react的antd和vue的element是我们大家非常熟悉得了,但是nextjs中使用antd有几个问题.
### 1. css问题
nextjs默认不支持css文件的.`import '../test.css'`这样会报错.

这个问题是因为nextjs中其实是有`css in js`的方案的,所以他并不支持css导入.

如果你一定要这样写可以吗?也可以.

安装`@zeit/next-css`

在根目录下创建一个`next.config.js`文件,用来修改next的默认配置.代码如下:
```js
const withCss = require('@zeit/next-css')
if(typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}
module.exports = withCss({})
```
再次执行测试,ok,没问题.没问题的话就删了吧,只是个学习测试的文件.

### 2. 分模块加载组件
1. 先安装antd和babel
```
npm i --save babel-plugin-import
npm i --save antd
```

2. 我们使用下andt,修改index.js文件
```js
import { Button } from 'antd'

export default () => <Button>index</Button>
```
这个时候我们刷新页面,发现的确是有个按钮,但是antd的css样式文件没有加载进来,我们需要全局加载下css样式.

3. 如果要全局加载的话,需要再pages文件夹下新家一个_app.js文件来覆盖他本身的js文件内容,内容如下.
```js
import App from 'next/app'

import 'antd/dist/antd.css'

export default App
```
再测试,发现也没问题了.

但是现在我们不得不思索一个问题,正常我们react开发会使用脚手架,里面的webpack都把我们想要的功能配置好了,例如代码分割,正常的react项目里,这样只引入button组件的js文件,而不是全局的antd的文件.

而nextjs没有默认配置webpack,所以有些内容需要我们手动添加.

4. 我们在根目录下添加个babel文件.babelrc,代码内容如下
```json
{
    "presets": ["next/babel"],
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd"
            }
        ]
    ]
}
```
这个组件的功能是,当我们`import { Button } from 'antd'`的时候,这个插件会帮我们转换成`import Button from 'antd/lib/button'`,这样就避免了加载全部的antd.
