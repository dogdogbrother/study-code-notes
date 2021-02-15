## 安装egg插件三部曲
```
npm i egg-jwt
```

```js
exports.jwt = {
  enable: true,
  package: "egg-jwt"
}
```

```js
config.jwt = {
  secret: "senlin"
}
```
Docker操作说明
镜像操作
1，拉取镜像

// http://hub.daocloud.io/ 本次采用的镜像仓库
docker pull 镜像名称
2，查看本地所有镜像

docker images
3，删除本地所有镜像

docker rmi 镜像标识
4，将本地镜像导入和导出

// 导出本地镜像
docker save -o 文件名 镜像id

// 导入本地镜像
docker load -i 镜像文件
5，修改镜像名称

docker tag 镜像id 新的名称
容器操作
1，运行容器

docker run 镜像id|镜像名称
docker run -d -p 宿主机端口:容器端口 --name 容器名称 镜像id|镜像名称
-d 后端运行容器
-p 为了映射当前linux端口和容器端口
--name 制定容器的名称
2，查看正在运行的容器

docker ps [-qa]
-a 查看所有的容器，包括没有运行的
-q 只查看容器的标识
3，查看容器的日志

docker logs -f 容器id
-f 可以滚动查看日志的最后几行
4，进入到容器内部

docker exec -it 容器id bash
docker exec -it 容器id sh
-it 
5，删除容器，删除之前，首先停止容器

# 停止制定的容器
docker stop 容器id
# 停止全部的容器
docker stop $(docker ps -qa)
docker rm 容器id
docker rm $(docker ps -qa)
6，启动容器

docker start 容器id|容器名称
7，修改容器名称

docker commit 容器id 新的名称
SSH登录服务
ssh ${user}@${ip}
​
# 后面会提示输入密码
# 第一次登录会提示保存ssh信息，输入yes即可

# 把文件有本地复制到远端
scp -rp /path/filename username@remoteIP:/path
阿里云部署项目
1，安装yum工具包
yum install yum-utils device-mapper-persistent-data lvm2
2，设置一个下载docker的镜像源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
3，安装docker
yum install docker-ce docker-ce-cli containerd.io
4，启动docker，设置为开机自动启动
// 启动docker服务
systemctl start docker

// 开机自动启动docker
systemctl enable docker

// 测试
docker run hello-world
5，修改镜像源
vi /etc/docker/daemon.json
{
"registry-mirrors": ["https://register.docker-cn.com/"]
}

//重启docker
systemctl daemon-reload
systemctl restart docker
6，安装mysql
docker pull daocloud.io/library/mysql:8.0.20
be0dbf01a0f3
# 运行mysql
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=abc123456 镜像id
7，安装redis
docker pull daocloud.io/library/redis:6.0.3-alpine3.11

# 运行redis
docker run -d -p 6379:6379 --name er_redis 镜像id --requirepass abc123456
8，安装node
docker pull daocloud.io/library/node:12.18

# 启动node容器
docker run -itd --name node 镜像id

# 进入容器创建文件
mkdir egg

# 把文件有本地复制到远端
scp -rp egg.zip root@remoteIP:/path

unzip -u -d server egg.zip
docker build -t egg:1.0 ./server
docker run -d -p 7001:7001 --name egg1.0 镜像id

# 拷贝本地代码
docker cp dist nginx容器id:/egg
9，安装nginx
docker pull daocloud.io/library/nginx:1.13.0-alpine

# nginx配置文件
/etc/nginx/nginx.conf

# nginx中html目录
/usr/share/nginx/html

# 日志文件
/var/log/nginx/access.log

# 把文件有本地复制到远端
scp -rp dist root@remoteIP:/root

# 从宿主机拷文件到容器里面
docker cp dist nginx容器id:/usr/share/nginx/html
配置nginx

vi /etc/nginx/nginx.conf

# 添加内容
server {
  #监听端口
  listen 80;
  #监听地址
  server_name 阿里云公网IP;      

  location / {
    #根目录
    root   /usr/share/nginx/html; 
    #设置默认页
    index  index.html;
  }
  
  # 接口转发
  location ~ /api/ {
    proxy_pass http://阿里云公网IP:7001; # 7001为node服务的端口号
  }

}
运行nginx

# 正常运行nginx
docker run -d -p 80:80 --name nginx 镜像id

# 通过目录映射来运行nginx
# 冒号":"前面的目录是宿主机目录，后面的目录是容器内目录
docker run --name nginx -d -p 80:80 -v /root/nginx/log:/var/log/nginx -v /root/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /root/nginx/conf.d:/etc/nginx/conf.d -v /root/nginx/html:/usr/share/nginx/html 镜像id
生成镜像
docker build -t 镜像名称:版本 Dockerfile路径


-----


Docker安装mysql后，node连接报错解决方式
1.进入mysql容器中

docker exec -it mysql容器id sh
2.进入mysql数据库

mysql -uroot -p
3.输入mysql密码

4.远程连接授权

mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION; 

mysql>FLUSH PRIVILEGES;
5.更改加密规则

mysql>ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
6.更新root用户密码

mysql>ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'abc123456'; 
7.刷新权限

mysql>FLUSH PRIVILEGES;
最后，可以重新启动下mysql容器