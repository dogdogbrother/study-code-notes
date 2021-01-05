## 先说mysq
安装egg提供的mysql的插件:
```
npm i egg-mysql -S
```

然后在 `/config/plugin.js` 中进行配置开启插件:
```js
exports.mysql = {
  enable: true,
  package: "egg-mysql"
}
```

再在 `/config/config.default.js` 配置参数:
```js
config.mysql = {
  app: true,
  agent: false,
  client: {
    host: "127.0.0.1",
    post: "3306",
    user: "root",
    password: "abc123456",
    database: "egg"
  }
}
```

然后就能在egg中使用mysql插件了，以 service 层代码为例:
```js
const { app } = this.
const res = await app.mysql.select("user")
return res
```
这样就能拿到user表里面的所有的数据了,当然也可以查询到某个值:
```js
app.mysql.get("user", {id: 1})
```

## 再看 sequelize
先安装,注意，还要安装 mysql2 模块:
```
npm i egg-sequelize mysql2
```

`/config/plugin.js` 中开启:
```js
exports.sequelize = {
  enable: true,
  package: "egg-sequelize"
}
```

`/config/config.default.js` 配置参数:
```js
config.sequelize = {
  dialect: "mysql",
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "abc123",
  database: "egg",
  define: {
    timestamps: false,  // 拒绝自动添加时间字段
    freezeTableName: true  // 冻结表名称
  }
}
```

### 开始使用
定义model,新建 `model/user.js`:
```js
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const User = app.model.define("user", {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: STRING(20),
    pwd: STRING(50)
  })
  return User;
}
```

用的时候也很简单，是扩展在 ctx 上的
```js
const { ctx } = this
const res = await ctx.model.User.findAll()
ctx.body = res
```
