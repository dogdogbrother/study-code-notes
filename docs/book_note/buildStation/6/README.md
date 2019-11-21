# 数据库

如果是公司项目的话,数据库一般都是会购买阿里云的云数据库,可惜没有免费的.顺便为了熟悉数据库,我们就将数据库安装在本地.

并用新的node和前端项目配合起来.

## 安装mongoDB并测试是否运行 
这个地方的步骤是照着[菜鸟教程](https://www.runoob.com/mongodb/mongodb-linux-install.html)安装的.

1. 下载
```
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz
```

2. 解压

```
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz
```

3. 配置PAth路径
```
export PATH=<mongodb-install-directory>/bin:$PATH
```

**mongodb-install-directory**为你 MongoDB 的安装路径

4. 创建数据库文件夹

mkdir -p /data/db

> **注意：/data/db 是 MongoDB 默认的启动的数据库路径**  
菜鸟教程上是这么说明的,然而事实却有可能不是的,比较新的版本的MongoDB的默认数据库是在自身的文件夹中.

5. 运行测试数据库

```
mongod
```
如输出一大堆东西并没有报错信息及开启成功.

从信息中我们可以发现,数据库默认的是端口是27017,我们可以用浏览器输入你的ip+27017来查看是否真的运行成功了!

>正常的话,浏览器应该输出:It looks like you are trying to access MongoDB over HTTP on the native driver port.

停止服务,pm2守护住,名字为mongodb.
```
pm2 start mongod --name="mongodb"
```
再次测试,木有问题.

### 小结

至此我们的mongodb数据库也在我们服务器跑起来了,如果我们后端想要从数据区取东西的话,就只需要指向localhost:27017即可.