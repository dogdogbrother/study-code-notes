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
然后进入www目录,拉代码就行了
```
cd /var/www/

git clone git@github.com:dogdogbrother/study-code-notes.git
```

打包后的项目入口就是这个项目的 **docs/.vuepress/dist/index.html**.

那么我们已经有了HTML文件了,怎么能让用户看得到呢?

当然,根据上面的node服务的例子,我们可以选择用node的fs模块来发送html文件,并pm2守护住,但这并不是一个好的选择,nginx出厂了.

## nginx
nginx是一个非常强大,但是功能相对集中单一的http服务工具.

1. 安装
```
yum install nginx
```

2. 启用nginx
为了检测我们是否安装成功了嗷,我们现在启用一下
```
service nginx start
```

然后直接输入你的ip地址,如果不再是无服务,就代表nginx启动成功了!!

3. 配置nginx
```
vim /etc/nginx/nginx.conf
```
nginx的配置其实并不复杂,我个人server内容代码片段的代码如下:
```
server {
    listen  3001;
    location / {
        root        /var/www/study-code-notes/docs/.vuepress/dist;
        index       index.html index.htm;
        try_files   $uri $uri/ /index.html;
    }
}
```
> `try_files  $uri $uri/ /index.html;`这段代码是为了处理现在前端路由history的问题,如果是#的路由则不用配置.

4. 跑起来
输入 **你的ip地址:3001** 测试下,大概率是要失败的.为什么呢?

因为安全组没设置啊!

设置一下,再测试还不行..

```
service nginx reload
```
每次配置完nginx都记得要重启服务,这回应该没问题了嗷!!!
