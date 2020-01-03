# 其他的一些杂事

其实教程中的很多内容都被我省略了,因为其实只要用户模块设计的好了,其实其他的都是重复工作了,是差不多的.

后续的一些其他散装的知识点就在这里记录一下吧.

## mongoDB

假如我想看下我想了解下我的数据库里面的内容,我得知道有啥东西吧,或是删删减减啥的.

1. 先执行`mongo`把数据库程序运行起来.

2. 直接看下mongos列表,你的数据就在其中一个表里面,具体是那个是要看你node项目中的mongoose配置信息了.
```sh
show dbs
```
>这个有可能是不显示空数据库的.

3. 如果想查看当前连接在哪个数据库下面，可以直接输入`db`,我就是输出`test`(是空的,导致我dbs的时候没有显示这个数据).

4. 如果我想切换到 music 这个数据库,`use music`.

5. 想查看该数据库下有哪些表(也叫作 collection 集合),`show collections`.

6. 查询数据的语法.`db.col.find()`,不过这种查出来的是缩进起来的,不好查看,可以加上`db.col.find().pretty()`来查看格式化后的内容.当然了,find里面你就可以使用各种各种的查询条件了.内容比较多,就参考[菜鸟教程](https://www.runoob.com/mongodb/mongodb-query.html).

7. 最后我要删除music数据库,重新写后端程序了.先切换到`music`库下,然后执行`db.dropDatabase()`即可.

## mongoose

在定义 Schema 的时候有一个默认添加 _v 的字段,是版本号的意思,可以在创建表的时候给关闭了.
```js
var mySchema = new mongoose.Schema({
    username:  'string'
}, {versionKey: false}
```





