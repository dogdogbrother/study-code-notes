# mysql
下载安装mysql,mysql workbench(可视化操作 )

打开workbench链接mysql服务

安装过程中需要输入root用户名和密码,切记要记住这个密码.

## 模拟建表和基础的sql语句
新建名为koa2_weibo_db的数据库,再建立users和blogs 2个表.先看看两个表的内容:

**users**
column|datatype|pk主键|nn不为空|AI自动增加|default
--|:--:|--:|--:|--:|--:
id|int|Y|Y|Y|
username|varchar(20)||Y||
password|varchar(20)||Y||
nickname|varchar(20)||Y||

**blogs**
column|datatype|pk主键|nn不为空|AI自动增加|default
--|:--:|--:|--:|--:|--:
id|int|Y|Y|Y|
title|varchar(50)||Y||
content|text||Y||
userid|int||Y||

我们可以按照这个格式在workbench中新建sers和blogs两个表.

建立好以后我们可以尝试着在users表中去查询内容:
```
use koa2_weibo_db;

select * from users;
```
查询结果为空(因为还没有插入数据),我们去插入一个值:
```
insert into users(username,`password`,nickname)value('张三','123','张三')
```
>说明一下,id因为是自增的,是不需要传的,password因为是关键字所以比较用` `` `包裹起来.  
注释的方法是`--`加个空格

再次查询就能查到数据了,还可以单独查询key.
```
select username,nickname from users;
```
模仿下登录操作的查询:
```
select user,nickname from users where username='张三'and`password`='123';
```
>还是能查到的,这里通过and来连接两个条件.

尝试下更新blogs表.(过滤了插入操作,毕竟是一样的.)
```
update blogs set content='内容1内容1' where id='1';
```
>where是查找定位的作用,如果不加的话,blogs表里面的所有数据就都会更新了..
```
delete form blogs where id=4
```
再来个倒序查表:
```
select * from blogs order by id desc;
```
来个查询数据总行数:
```
select count(*) as `count` from blogs;
```
差倒叙第二页,每页2行:
```
select * from blogs order by desc limit 2 offset 2;
```
>offset 2意思是跳过2行,那么这么一算不就是倒数第二页吗?

## 外键
建立外键什么意思呢,blogs表中有一个userid,用于记录这个博客是哪个用户的,我们可以通过外键来关联这两个表的数据.
在workbench工具中,我们在表的详情下面选中Foreign keys,里面设置.
设置好了以后2个表就有了关联,假如我删除了一个用户,那么该用户下面的blogs表中的内容也会删除.

这里操作下连表查询,需求是通过用户名,找到他所有的博客,并且返回他blogs表外的用户名和昵称信息:
```
select blogs.*,users.username,users.nickname from blogs inner join users on users.id=blogs.userid where users.username='zhangsan'
```
>这种操作其实是不需要外键约束的