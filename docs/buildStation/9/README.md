## 前因
现在对服务器的要求和以前不一样了,例如现在要有mysql,要有redis,正好因为环境崩了,把服务器重装了系统,从头记录下重置过程,便于下次重置复制使用.

## ssh链接
登录时会有警告,`WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!`,远程主机标识已更改.根据提示修改对应的文件中的主机ip和对应的标识即可.

## ssh-key 无密码登录
> mac电脑为例

1. 如果没有秘钥,要先生成秘钥,命令行输出`ssh-keygen -t rsa`.要求指定文件保存密钥,按 enter 使用默认即可.要求输入 passphrase密码,回车跳过即可.再次确认passphrase,回车跳过即可.
> `passphrase` 也可以设置密码,更安全一些.

秘钥的私钥就在`.ssh/id_rsa`中.

2. 把秘钥发送到服务器,正常的想法是把秘钥信息复制到linux下的一个文件中,或者scp发送文件到linux中,可惜都不用,是有专门的命令的.
```
ssh-copy-id username@remote-server
```
> 这里有可能提示需要输入`passphrase`,也就是生成秘钥时输入的密码,如果当时跳过了,就不会生成此输入.

输入服务器密码,后续ssh登录和scp命令就不用输入密码啦.

> linux的秘钥信息在`.ssh/authorized_keys`中, 可以使用`> .ssh/authorized_keys`来清空文件内容,抹去秘钥登录.

3. 每次登陆都要`ssh root@**.***.***.***`着实有点麻烦,可以使用`alias 命令='ssh root@**.***.***.***'`来创建快捷命令.这样登陆就很迅速了.

4. alias 设置的命令重启电脑后就失效了,编辑 `./bashrc` 文件,把 alias 命令输入,再执行 `source ~/.bashrc` 就ok了.

5. 当然你也许还是不能用自定义命令,是因为有可能 zsh shell 下,同理修改 `~/.zshrc` 即可.

## 安装git/node/nginx/yarn
因为这三个环境不太会有环境问题,直接安装即可.
```
cd /opt/
wget https://cdn.npm.taobao.org/dist/node/v12.13.0/node-v12.13.0-linux-x64.tar.xz
tar xvf node-v12.13.0-linux-x64.tar.xz
ln -s /opt/node-v12.13.0-linux-x64/bin/node /usr/local/bin/node
ln -s /opt/node-v12.13.0-linux-x64/bin/npm /usr/local/bin/npm
```
测试:
```
node -v
npm -v
```

git和nginx的安装用yum:
```
yum install git
yum install nginx
```

yarn 在 yum 中没有包,需要手动添加下仓库再安装.
```
wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
yum -y install yarn
```

## 服务器和github的ssh-key
这样拉取github上的代码仓库就方便很多,和在mac上的操作是一样的.先看看`~/.ssh/id_rsa`,没有的话用`ssh-keygen -t rsa`生成.

`cat id_rsa.pub`,把输出的内容粘贴到github的setting中即可.

## 用docker安装mysql
我本机跑的服务没问题,但是到了线上就不行了,这是因为mysql这类的软件配置有些多,在不同的平台的有细微的不同.

这种情况下用docker就比较合适.安装步骤如下:
1. 安装yum工具包
```
yum install yum-utils device-mapper-persistent-data lvm2
```
2. 设置一个下载docker的国内镜像源,要不然下载会很慢
```
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
3. 安装docker
```
yum install docker-ce docker-ce-cli containerd.io
```
> 这时候就可以启动docker了,可以直接启动`systemctl start docker`,也可以设置开机自启动`systemctl enable docker`.

4. 修改docker的下载镜像源
```
vi /etc/docker/daemon.json
```
可能没有这个目录和文件,需要手动创建一下.
```
{
"registry-mirrors": ["https://register.docker-cn.com/"]
}
```
修改好了重启下docker:
```
systemctl daemon-reload
systemctl restart docker
```

5. 安装mysql和配置mysql
```
docker pull daocloud.io/library/mysql:8.0.20
```
这里我们接触到了第一个docker的概念,镜像.`docker images`命令查看全部的本地镜像,会发现我们刚下载的mysql镜像的 tag/id 等信息.

再往下,就要接触到第二个docker的概念,容器.我们有了mysql的镜像,就要运行这个镜像`docker run mysql的images的id`生成mysql容器.

执行到这里就报错了.
> You need to specify one of MYSQL_ROOT_PASSWORD, MYSQL_ALLOW_EMPTY_PASSWORD and MYSQL_RANDOM_ROOT_PASSWORD

需要指定mysql的密码才能运行mysql容器,我们加上参数重新运行:
```
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=abc123456 镜像id
```
* -d 后台运行容器
* -p 为了映射当前linux端口和容器端口
* --name 制定容器的名称
* -e 作用是指定容器内的环境变量,mysql的镜像中是有一个初始化脚本的，这个脚本会读取这个变量初始化root的密码。

执行成功后,输出个很长的id信息,这就是刚刚运行的容器id,可以 `docker ps` 来查看当前在运行的容器.

此时我们的mysql已经运行起来了,理论上可以通过3306端口连接数据库了.但是很可惜,8.0以上版本的 mysql 如果需要外部连接,需要再配置下才行.

那么问题来了,我们怎么配置在容器中运行的 mysql 呢?

## 配置mysql连接
使用docker命令进入容器内部.
```
docker exec -it 容器id sh
```
你会惊讶的发现,你进入了一个新的bash.你的任何操作都和你的服务器无关,恍然大悟,原来docker的容器就是一个隔离的服务器.

在容器内部登录mysql终端:
```
mysql -u root -p
```

输入密码登录后,远程连接授权并刷新权限:
```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION; 
FLUSH PRIVILEGES;
```

更新root用户密码并刷新权限:
```
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'abc123456'; 
FLUSH PRIVILEGES;
```

最后，重新启动下mysql容器:
```
docker restart 容器id
```

最后,打开 navicat ,测试连接.ok!




