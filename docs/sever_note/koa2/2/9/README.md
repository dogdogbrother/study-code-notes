# 关注与粉丝

其实只有两个需求,一个是关注和取消关注,还有一个获取关注人和获取粉丝列表的多对多关系.   
一共四个接口.

## 粉丝和关注的schema

粉丝和关注是不一样的.

* 一个用户关注再多的人也是有限的,我们可以用一个字段,里面是数组,用来存放关注者id.  
但是又不能很死板的真的只存id,例如我想看用户的关注人列表,然后数据库就循环`findById`去查询后再返回名字等信息吗?  
那我们存个对象,对象里面包含id和name可以吗?也不可以,如果需求变动了我想看这个用户的性别怎么办呢?难道把数据库里面的信息都变了吗?或者说关注者里面有人改了性别呢?  
所以解决方案是用 **引用** 的模式

* 粉丝就不行了,有些大V有可能有20W个粉丝,用字段来存储明显是不合理的.
```js
const userSchema = new Schema({
    // ...
    following: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        select: false
    }
})
```
这里的 `type` 不是单纯的类型,而是 mongoose 提供的类型,配合 `ref` 就能找到对应的用户,也可以通过前面`select()`的形式拿到任何你想要的字段.

## 关注与粉丝接口

### 查看用户关注了哪些人
先看接口是怎么定义的:
```js
router.get('/:id/following', listFollowing)
```
>参数后面加接口,这样的逻辑上的嵌套关系(此id下的关注者)也是 RESTful 风格的体现.

再看下控制器内容:
```js
async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id).select('+following').populate('following')
    if (!user) { ctx.throw(404, '该用户不存在') }
    ctx.body = user.following
}
```
>如果不加 `.populate()` 方法的话返回的内容只有 **关注者id**,populate的意思是填充.

## 关注某人
```js
// 先看接口,这个是要鉴权的,没登录的话你怎么关注别人呢
router.put('/following/:id', auth, follow)
```
这个地方直觉思维是用post,但其实用 put 是更语音话一些的,put 的副作用更小一些,对内容的修改不大.

```js
// 再看控制器内容
async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following')
    if(!me.following.map(id => id.toString()).includes(ctx.params.id)){
        // 先拿到自己的关注人列表,判断下被关注者是不是已经被关注了
        me.following.push(ctx.params.id)
        me.save()
    }
    ctx.status = 204
}
```
>204状态码的意思是,操作成功了,但是没有东西返回.

## 取消关注

取消关注和关注的逻辑是差不多的.
```js
async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following')
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
    // 找到你要关注的人的索引位置
    if(index > -1){
        // 如果存在的话,
        me.following.splice(index, 1)
        me.save()
    }
    ctx.status = 204
}
```

## 获取粉丝

获取粉丝其实就是获取用户列表,只是有个条件,就是 following 数组里面有你 id 的用户.
```js
async follow(ctx) {
    const users = await User.find({ following: ctx.params.id })
    ctx.body = users
}
```
>可以发现 find 的方法的参数很灵活..

 