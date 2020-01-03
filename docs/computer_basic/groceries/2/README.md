# Linux

## linux下载迅雷资源的摸索

目前采用的是 aria2 的方案.

当前我做了的程序有:
```sh
yum -y install aria2
mkdir /etc/aria2/
vi /etc/aria2/aria2.conf
```
这个配置文件的内容是:
```conf
#用户名
#rpc-user=user
#密码
#rpc-passwd=passwd
#上面的认证方式不建议使用,建议使用下面的token方式
#设置加密的密钥
#rpc-secret=token
#允许rpc
enable-rpc=true
#允许所有来源, web界面跨域权限需要
rpc-allow-origin-all=true
#允许外部访问，false的话只监听本地端口
rpc-listen-all=true
#RPC端口, 仅当默认端口被占用时修改
rpc-listen-port=6800
#最大同时下载数(任务数), 路由建议值: 3
max-concurrent-downloads=5
#断点续传
continue=true
#同服务器连接数
max-connection-per-server=5
#最小文件分片大小, 下载线程数上限取决于能分出多少片, 对于小文件重要
min-split-size=10M
#单文件最大线程数, 路由建议值: 5
split=10
#下载速度限制
max-overall-download-limit=0
#单文件速度限制
max-download-limit=0
#上传速度限制
max-overall-upload-limit=0
#单文件速度限制
max-upload-limit=0
#断开速度过慢的连接
#lowest-speed-limit=0
#验证用，需要1.16.1之后的release版本
#referer=*
#文件保存路径, 默认为当前启动位置
dir=/var/www/html/downloads
#文件缓存, 使用内置的文件缓存, 如果你不相信Linux内核文件缓存和磁盘内置缓存时使用
#disk-cache=0
#另一种Linux文件缓存方式
#enable-mmap=true
#文件预分配, 能有效降低文件碎片, 提高磁盘性能. 缺点是预分配时间较长
file-allocation=prealloc
```
上述的这些步骤都来自于一篇博客,[利用Centos7搭建aria2下载器](https://www.cnblogs.com/dafang/p/9114598.html).可惜往后的都不是我想要的了,因为我不需要ui控制.

***

然后我又看见了一篇博客,[aria2（命令行下载器）使用](https://www.jianshu.com/p/6e6a02e1f15e).根据这里的教程,我尝试的去下载文件:
```sh
aria2c https://download.owncloud.org/community/owncloud-9.0.0.tar.bz2
```
高兴了不少,因为下载成功了(虽然下载很慢,有可能是国外的资源的原因),那么测试下迅雷下载.
```sh
aria2c thunder://QUFmdHA6Ly95Z2R5ODp5Z2R5OEB5ZzM5LmR5ZHl0dC5uZXQ6MzAwNS8lRTklOTglQjMlRTUlODUlODklRTclOTQlQjUlRTUlQkQlQjF3d3cueWdkeTguY29tLiVFNiVCMiU4OSVFNyU5RCVBMSVFOSVBRCU5NCV FNSU5MiU5MjIuQkQuMTA4MHAuJUU0JUI4JUFEJUU4JThCJUIxJUU1JThGJThDJUU1JUFEJTk3JUU1JUI5JTk1Lm1rdlpa
```
**难受**...失败了.

## 放弃
好像迅雷的连接(`thunder...`)就是不能用其他途径去下载的..
