## 软件包
windows 下软件的安装包就是 .exe 文件,ContOS 的软件包叫做 **Package**，里面包含了安装软件的所有指令，在Red Hat一族里，软件包的后缀是 **.rpm**,s Red Hat Package Manager 的缩写，表示红帽软件包管理器。

## 软件仓库 repository
linux所有的软件都存放软件仓库里面，其中软件仓库全球有很多个，国内的话可以用阿里或是网易的镜像源，可以编辑 **/etc/yum.repos.d/CentOS-Base.repo** 文件来更改镜像源。
1. `mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup`, backup 是备份的意思，如果我们没弄明白还能改回来。
2. `wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo`,下载好后重命名。
3. `yum makecache` 生成缓存。

## yum
yum 是 CentOS 中默认包管理器工具。常用命令有。
1. `yum update` ,和 `yum upgrade` 更新软件包，如果不加参数就是更新全部的软件包，`yum update wget` 就是更新具体某个软件。
2. `yum search` ,搜索某个软件包。
3. `yum install emacs` ,安装 emacs 文本编辑器。
3. `yum remove emacs` ,删除 emacs。

有些软件有可能仓库里面没有，需要到官网下载 .rpm 软件包到本地，然后 `rpm -i *.rpm` 安装，`rpm -e 包名` 用于卸载。  
也可以用 yum 去安装，`yum localinstall *.rpm` 安装,`yum remove 包名`