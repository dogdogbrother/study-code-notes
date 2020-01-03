# Mongoose 链接 MongoDB

MongoDB 在 node 是可以直接实现的,是有响应的模块的,不过不是很好用,所以最好还是使用 Mongoose 吧.

MongoDB 是非关联型数据库

## 安装引入和使用连接MongoDB
```sh
npm i mongoose --save
```
```js
const mongoose = require('mongoose')

mongoose.connect('你的MongoDB地址', { useNewUrlParser: true }, () => { console.log('MongoDB已经连接') })
mongoose.connection.on('error', console.error)
```

## 设计用户模块的 Schema
**Monsoose** 的 **Schema** 是 **JSON** 格式的,是写在代码里面的,不是像 **MySQL** 是在数据库里定义的. 

前面的章节中已经定义了 models 目录,就是为了放 Schema 文件的,我们写个案例,用户模型users.js:
```js
const mongoose = require('mongoose')

const { Schema, model } = monsoose

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 0 }
})

module.exports =  model('User', userSchema)
```
modeld的一个参数就是我们集合的名字(表名).

## 实现增删改查 
```js
// controllers/users.js
const User = require('../models/users');

class UsersCtl {
    async find(ctx) {
        // 查询用户列表接口
        ctx.body = await User.find()
    }
    async findById(ctx) {
        // 根据id查询特定用户
        const user = await User.findById(ctx.params.id)
        if(!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user;
    }
    async create(ctx) {
        // 新建用户
        ctx.verifyParams({
            name: { type: 'string', required: true }
        })
        const user = await new User(ctx.request.body).save()
        // 通过save方法保存数据到数据库
        ctx.body = user
    }
    async update(ctx) {
        // 更新用户信息
        ctx.verifyParams({
            name: { type: 'string', required: true }
        })
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if(!user) { ctx.throw(404, '用户不存在,无法更新') }
        ctx.body = user;
    }
    async deleteById(ctx) {
        // 删除用户
        const user = await User.findByIdAndRemove(ctx.params.id)
        if(!user) { ctx.throw(404, '用户不存在,无法删除') }
        ctx.body = user; 
    }
}
module.exports = new UsersCtl()
```