## 微博 model 和外键
其实 model 个 外键的设置前面都写了，userId 也在 session 的 info 去拿就ok了。这里大概弄个意思看下的了。  
```js
const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    // ...
})
```
然后在 index.js 中设置外键。
```js
const User = require('./User')
const Blog = require('./Blog')
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
```
最后同步文件执行一下。
>

## XXS攻击
xxs 就是脚本攻击，假如我在提交的内容带有 `<script />` 标签就能进行攻击了。  
有现成的工具， `xss`,把字符串包裹下就可以了,数据库中有关系 **<** 等符号就会被转义。
```js
const xss = require('xss')
const blog = await createBlog({
    userId,
    content: xss(content),
    image
})
```