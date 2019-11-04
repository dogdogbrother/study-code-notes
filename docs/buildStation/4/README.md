# 运行一个静态页面

一个纯静态页面是没有和接口交互的,例如电子书.这里我就用我这个电子书的项目来完成部署.

这里我们就要涉及到nginx的使用了,不过在配置nginx之前,我们要先把[电子书](https://github.com/dogdogbrother/study-code-notes)的项目拉下来.

## SSH key
如果有ssh的话你直接vim打开就行了,没有的话设置下,毕竟用秘钥管理git项目还是比较方便的.
```
ssh-keygen -t rsa -C "你的邮箱"
```
根据提示路径打开文件,复制后粘贴到git设置中.
```
vim /root/.ssh/id_rsa.pub
```

## nginx
nginx是一个非常强大,但是功能相对集中单一的http服务工具,具体的自行百度吧.

```
yum install nginx
```
