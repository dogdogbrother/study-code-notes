# Nginx基础讲解

## 安装目录相关
```sh
rpm -ql nginx
```
我们可以输入此命令来查看Nginx的安装目录情况,拿出一些作为讲解.

>etc目录一般是放核心配置.

路径|类型|作用
--|:--:|--|
/etc/logrotate.d/nginx|配置文件|Nginx日志轮转,用于logrotate服务的日志切割
**这个是对Nginx产生的日志进行处理的,例如我们可以使用日来分割日志,这样比较便于管理和查看.**

路径|类型|作用
--|:--:|--|
/etc/nginx/nginx.conf|配置文件|Nginx主配置文件
/etc/nginx/conf.d/default.conf|配置文件|Nginx主配置文件
**nginx.conf是Nginx启动时候加载的文件,在其内容不全时,会加载default.conf的内容进行补充.**

路径|类型|作用
--|:--:|--|
/var/cache/nginx|目录|Nginx缓存目录
**Nginx可以在http代理服务,也能做缓存服务,如果你是通过rpm安装的话,会自动生成这个默认文件夹,里面存放缓存文件.**

路径|类型|作用
--|:--:|--|
/var/log/nginx|目录|Nginx的日志目录
**默认存放成功失败的日志.**

## nginx.conf默认配置



