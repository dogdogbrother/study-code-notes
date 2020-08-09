## 引入并使用 sequelize
sequelize是node的一个库，和`mongoose`一样的性质。  

我们`npm init`一个项目,专门用来学习 sequelize 操作 mysql，安装 sequelize 和 mysql2：
```ssh
npm i sequelize mysql2
```
新建个文件`src/seq.js`:
```js
const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}
const seq = new Sequelize('test', 'root', 'wojiaoWH.110', conf)

seq.authenticate().then(() => {
  console.log('连接成功')
}).catch((err) => {
  console.log('连接失败',err)
})

module.exports = seq
```
运行一下没问题，输出 `连接成功`。

## 创建模型
用 workbench 把表 `Drop Table` 情况掉，我们用模型的形式去创建表单。  
新建个 `model.js` 文件：
```js
const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建表的名字user，数据库会默认变成 users
const User = seq.define('user', {
  // id 会自动创建，并设为主键，自增
  userName: {
    type: Sequelize.STRING, // 对应的是 varchar(255)
    allowNull: false // 是否允许为空
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称' // 注释
  }
  // 会自动创建 createdAt 和 updateAt
})

module.exports = {
  User
}
```
再创建 `sync.js` 文件，用于同步数据库数据：
```js
const seq = require('./seq')

require('./model')

// 测试连接
seq.authenticate().then(() => {
  console.log('连接成功')
}).catch((err) => {
  console.log('连接失败',err)
})

// 执行同步
seq.sync({force: true}).then(() => {
  console.log('同步成功');
  process.exit()
})
```
执行`node ./src/sync.js`,依次输出`连接成功`和`同步成功`,再观察数据库，发现新表已经被创建了。

## 设立外键
再弄个 blog 表：
```js
// src/model.js
// ...
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT, // TEXT 字数可以很多
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 关联外键
Blog.belongsTo(User, {
  // 意思是blog表属于User
  foreignKey: 'userId'
})

User.hasMany(Blog, {
  // 意思User表拥有blog
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}
```
这两个关键外键的方法似乎是重复使用了，但是其实有意义的，就是我们后面在连表查询的时候是可以正反去查的。  
我们可以通过一片博客找到该作者，也就是belongsTo。也可以通过作者找到所有的博客，也就是hasMany。

## 关系图
可以点击 workbench 菜单栏上的 database 下的 reverse engineer,来自动生成出多表之间的链表关系。

## 插入数据
直接看代码吧:
```js
// src/create.js
const {Blog, User} = require('./model')

!(async function(){
  const zhangsan = await User.create({
    userName: 'zhangshan',
    password: '123',
    nickName: '张三'
  })
  console.log('zhangsan:', zhangsan.dataValues);

  const blog = await Blog.create({
    title: '标题1',
    content: '内容1',
    userId: zhangsan.dataValues.id
  })
  console.log('blog:', blog.dataValues);
})()
```
执行 `node ./src/create.js`，插入数据成功。

## 查询数据
新建 select.js 文件,写个最简单的查询：
```js
const {Blog, User} = require('./model')
!(async function () {
  const zhangsan = await User.findOne({
      where: {
        userName: 'zhangshan'
      }
  })
  console.log('zhangsan:', zhangsan.dataValues);
}()
```

### 查询特定的列
```js
const zhangsanName = await User.findOne({
  attributes: ['userName', 'nickName'],
  where: {
    userName: 'zhangshan'
  }
})
console.log('zhangsanName:', zhangsanName.dataValues);
```

### 查询列表
```js
const zhangsanBlogList = await Blog.findAll({
  where: {
    userId: 1
  },
  // order是列表的排序规则，这里面是根据id进行反排
  order: [
    ['id', 'desc']
  ]
})
console.log('zhangsanBlogList:', zhangsanBlogList.map(blog => blog.dataValues));
```

### 分页列表
```js
const blogPageList = await Blog.findAll({
  limit: 2, // 限制本次查询2条
  offset: 0,  // 跳过多少条
  order: [
    ['id', 'desc']
  ]
})
console.log('blogPageList:', blogPageList.map(blog => blog.dataValues));
```

### 查询页面列表并能把总数也查询到
```js
const blogListAndCount = await Blog.findAndCountAll({
  limit: 2, // 限制本次查询2条
  offset: 0,  // 跳过多少条
  order: [
    ['id', 'desc']
  ]
})
console.log(
  'blogListAndCount:', 
  blogListAndCount.count, 
  blogListAndCount.rows.map(blog => blog.dataValues)
);
```

## 连表查询
通过博客找到他的作者：
```js
const blogListWithUser = await Blog.findAndCountAll({
  order: [
    ['id', 'desc']
  ],
  include: [
    {
      model: User,
      attributes: ['userName', 'nickName'],
      where: {
        userName: 'zhangshan'
      }
    }
  ]
})
console.log(
  'blogListWithUser:', 
  blogListWithUser.count, 
  blogListWithUser.rows.map(blog => {
    const blogVal = blog.dataValues
    blogVal.user = blogVal.user.dataValues
    return blogVal
  })
);
```
通过所有用户找到他的博客：
```js
const userListWithBlog = await User.findAndCountAll({
  attributes: ['userName', 'nickName'],
  include: [
    {
      model: Blog
    }
  ]
})
console.log(
  'userListWithBlog:', 
  userListWithBlog.count, 
  userListWithBlog.rows.map(user => {
    const userVal = user.dataValues
    userVal.blogs = userVal.blogs.map(blog => blog.dataValues)
    return userVal
  })
);
```
## 更新数据
```js
const updataRes = await User.update({
  nickName: '张三1'
}, {
  where: {
    userName: 'zhangshan'
  }
})
console.log('updataRes...', updataRes[0] > 0);
```

## 删除数据
```js
const delBlogRes = await User.destroy({
  where: {
    id: 1
  }
})
console.log('delBlogRes', delBlogRes > 0);
```

## 连接池
前面我们的操作都是直连数据库，那如果是线上环境，有1W个人同时连接数据库，这样对数据库的压力就很大，所以正常的情况是用连接池。  
假如连接池里面提供了5个连接，而有6个用户在使用的话，第六个用户会等待。  

```js
// src/seq.js
// ...
conf.poll = {
  max: 5, // 连接池中最大的连接数量
  min: 0, // 最小
  idle: 10000 // 如果连接池 10s 内没有被使用，则释放 
}
// ...
```