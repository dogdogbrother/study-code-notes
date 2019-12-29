# 个人资料模块

前面章节对用户进行了不少的操作,但是都不完整,现在如果真正的想做一个完整的个人资料模块,在功能上还有一些缺失.

## 思考需求

* 用户除了用户名密码还有很多其他的字段,有些字段还有非字符串类型的.例如性别,是必传的,但是是有枚举限制的,参数必须只能是男或者女.
* 除了男女的这种简单类型的枚举,还有对象形式的,例如你的教育经历,可以填多项,本身是数组,但是又有多个字段,例如学校专业等等.
* 还有个字段过滤文件,我们如果查询所有用户列表,如果把用户所有的信息都查到是没有必要的.所有我们要通过一种方法,只有查询单人用户信息时,才把全部的字段返回.
* 

## 重新设计schema 
```js
const userSchema = new Schema({
    _v: { type: Number, select: false },
    name: { type: String, required: true },
    password: { type: String, required: true, select:false },
    avatar_url: { type: String },
    gender: { type: String, enum: ['male', 'female'], defaulet: 'male',  required: true },
    locations: { type: [{ type: String }] },
    avatar_url: { type: String },
    educations: {
        type: [{
            school: { type: String},
            major: { type: String },
            diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
            major: { type: String },
        }]
    }
})
```
可以发现,`gender`性别这里,使用枚举是用 **`enum`** 来标识的.

`locations` 居住地这里,前端上传格式是`['杭州','北京']`这样的,model中用数组包 type 来定义即可.

`educations`是教育经历,其中`diploma`是文件的意思,里面也是个枚举,代表大专/本科/...

## 设计参数校验
```js
async update(ctx) {
    // 更新用户信息
    ctx.verifyParams({
        name: { type: 'string', required: false },
        //...
        locations: { type: 'array', itemType: 'string', required: false },
        educations: { type: 'array', itemType: 'object', required: false },
    })
}
```
全部的校验`required`都为非必填是故意的,因为这是个更新用户的接口.

`locations`和`educations`比较特殊,里面的属性可以用`itemType`来校验.

## 字段过滤
是这样设计的,我们默认是只返回用户名性别和头像(正常项目也会有一句话简介)最基础的字段的,如果你想要其他的字段信息,就要在查询字符串上添加`fileds`字段,后端通过这个字段的内容来处理返回显示那些字段.

首先修改下schema,把参数默认的都加上`select: false`.然后我们看下查询字符串的格式:
```sh
http://..../users/${userId}?fields=locations;educations
```
我们让返回的信息还要带上居住地和教育经历.后端处理代码如下:
```js
async findById(ctx) {
    const { fields } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f ).join('')
    const user = await User.findById(ctx.params.id).select(selectFields)
    ctx.body = user; 
}
```
当我们想手动返回某些值的时候,可以在查询方法后面加上`select()`方法,参数是字符串`'+locations+educations'`这样.

我们用字符串分割后组成这种形式即可.(filter过滤是为了防止fileds没有值做的边界处理)