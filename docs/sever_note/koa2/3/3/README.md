## 用 sql 语句创建表
在根目录下创建文件，`/app.sql`:
```sql
create database egg_house;

use egg_house;

--用户表
create table `user`(
  `id` int not null auto_increment,
  `username` varchar(20) default null comment '用户名',
  `password` varchar(64) default null commont '密码',
  `avatar` text comment '头像',
  `phone` varchar(20) default null comment '电话',
  `sign` varchar(300) default null comment '用户签名',
  `createTime` timestamp default null comment '创建时间',
  `updateTime` timestamp default null comment '更新时间',
  primary key(`id`)
)engine=InnoDB auto_increment=1 default charset=utf8 comment='用户表';
```

打开 mysql 的客户端，把这三条数据依次输入，创建表成功！

## 创建 model
根据我们的sql语句中表的解决，我们在model层也要写对应的内容:
```js
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize
  const User = app.model.define("user", {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    username: STRING(20),
    password: STRING(64),
    avatar: TEXT("long"),
    phone: STRING(20),
    sign: STRING(300),
    createTime: DATE,
    updateTime: DATE
  })
  
  return User;
}
```