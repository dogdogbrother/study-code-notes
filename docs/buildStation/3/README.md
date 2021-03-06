# 运行第一个node项目

我们以一个国内开发的[网易云音乐API](https://github.com/Binaryify/NeteaseCloudMusicApi)的仓库为例,并运行起来,让我们浏览器可以访问到.

## 先跑得起来
1. 创建目录
我们在 var目录下新建一个www文件夹,作为我们所有git仓库的目录
```
cd /var/

mkdir www

cd www/
```

2. clone一个nodeJS项目
```
git colne https://github.com/Binaryify/NeteaseCloudMusicApi.git
```

3. 安装依赖
```
cd NeteaseCloudMusicApi/

npm i
```

4. 测试下能不能跑起来
```
ls
//发现入口文件是app.js

node app.js
```

浏览器输入你的 **公网ip:3000** ,看是否能进去.

如果访问不到,大概率是你的安全组没有设置,登陆服务器商家的个人中心的控制台的服务器实例,设置安全组即可.

**规范方向:入方向,协议:TCP,端口:3000,授权对象:0.0.0.0**

> 这里我多解释一下,你现在之所以能用ssh进行连接远程服务器,也是因为商家已经默认把22端口打开了的.

**至此我们项目已经跑成功了**

## pm2守护住

虽然跑的起来,也能访问的到,但是有个问题,如果我们本地的cmd关闭了,那么这个node服务也就会相应的关闭.我们就需要一个能帮我们一直开启这个node服务的服务------**pm2**

我们先ctrl+c关闭跑起来的服务.然后pm2守护.

```
pm2 start app.js --name="wangyi-music-api"
```
> `--name`是非必填项,但是我们后面会有好几个项目需要守护,都是app.js也分不清哪个是哪个,起个名字还是非常棒的.

再次浏览器访问测试,没问题!!

> 这个地方其实有个小问题,`0,0,0,0`意味着所有人都可以访问这个借口,但是我们的这个接口其实只是针对于我们服务器内部请求,所以当我们前端项目也上线后,就可以把安全组的授权对象改为本机ip可访问.







