# 话题模块

这章节中,在数据结构设计上和个人资料用户模块是差不多的,我就不重复写了.

不过也有一些其他的知识点:

* 分页
* 模糊搜索
* 话题引用代替部分用户属性

## 分页功能实现
其实很简单,用mongoos自带的 limit 方法和 skip 方法即可.
```js
async find(ctx) {
    const { page_number = 10 } = ctx.query
    const pageSize = Math.max(ctx.query.page * 1, 1) - 1
    const pageNumber = Math.max(page_number * 1, 1) 
    ctx.body = await Topic.find().limit(pageSize).skip(pageSize*pageNumber)
}
```
首选要做边界处理,如果你的 pageSize 和 pageNumber 参数不正确,是0或是小于0的话,修正为1.

skip 的参数指的是从第几个开始拿,例如是第一页的话,从0开始拿.所以要 pageSize -1.

## 模糊搜索的实现
更简单了,就是在find里面加上正则表达式即可.
```js
const Topic = require('../models/topics');

ctx.body = await Topic.find({ name: new RegExp(ctx,query.q) }).limit(pageSize).skip(pageSize*pageNumber)
```


## 话题引用代替部分用户属性
什么意思呢? 当你编辑你的个人资料的时候,你的居住地/所在行业/职业经历,都是可以选择用话题搜索后的结果来当你的选项的.

这样做的原因有3个好处.1是有模糊搜索提示,让你更好的进行选择,2是更好的进行数据分类存储,3是可以帮你分类进行个性化推荐.

>事实上,如果你用户的地区啊学习啊之类如果真的是字符串类型的也太蠢了,没有智能提醒也没有头像也没有后续的功能...

做法也很简单,例如我们在用户 Schema 的 locations 字段里面,本来存的是 String ,现在要改成引入类型.
```js
const userSchema = new Schema({
    locations: { type: [{ type: Schema.Types.ObjectId, ref: "Topic" }]}
}}
```
然后不要忘了我们在获得用户信息的时候使用前面提到的 populate 方法进行链表查询就OK了.

## 用户和话题的多对多的关系

和用户关注用户的多对多关系的逻辑和操作其实是差不多的,没什么好说的.

# 添加日期时间
例如我创建了一个话题,或者修改了话题.这个话题的创建时间和更新时间是应该有所记录的.

正常思维,就是当你创建的时候加createTime,当你更新的时候修改updateTime,但是mongoose已经帮我们处理了,只要在schema的第二个参数里面操作下就ok了.

```js
new Schema({
    // ...
}, { timestamps: true })
```
这样就能以时间戳的形式去记录时间了.