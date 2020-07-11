# centos下搭建 Jenkins 持续集成环境

**Jenkins** 部署比较灵活，例如可以手动更新线上，也能钩子触发，可视化管理多个项目下的多个分支，还是比较方便的。

1. 安装JDK
**Jenkins** 是需要java环境的，先输出 `java` 看看有没有安装，没有的话:
```shell
yum install -y java
```

2. 下载jenkins包
下载的方式很多，我用的是:
```shell
wget http://mirrors.jenkins.io/war-stable/latest/jenkins.war
```
然后启动:
```shell
java -jar jenkins.war
```

