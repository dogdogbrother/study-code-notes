## 前因
现在对服务器的要求和以前不一样了,例如现在要有mysql,要有redis,正好因为环境崩了,把服务器重装了系统,从头记录下重置过程,便于下次重置复制使用.

## ssh链接
登录时会有警告,`WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!`,远程主机标识已更改.根据提示修改对应的文件中的主机ip和对应的标识即可.

## ssh-key 无密码登录
> mac电脑为例

1. 先生成秘钥,命令行输出`ssh-keygen -t rsa`.要求指定文件保存密钥,按 enter 使用默认即可.要求输入 passphrase密码,回车跳过即可.再次确认passphrase,回车跳过即可.
> `passphrase` 也可以设置密码,更安全一些.

秘钥就在`.ssh/id_rsa`中.

2. 把秘钥发送到服务器,正常的想法是把秘钥信息复制到linux下的一个文件中,或者scp发送文件到linux中,可惜都不用,是有专门的命令的.
```
ssh-copy-id username@remote-server
```
> 这里有可能提示需要输入`passphrase`,也就是生成秘钥时输入的密码,如果当时跳过了,就不会生成此输入.

输入服务器密码,后续ssh登录和scp命令就不用输入密码啦.

> linux的秘钥信息在`.ssh/authorized_keys`中, 可以使用`> .ssh/authorized_keys`来清空文件内容,抹去秘钥登录.

3. 每次登陆都要`ssh root@**.***.***.***`着实有点麻烦,可以使用`alias 命令='ssh root@**.***.***.***'`来创建快捷命令.这样登陆就很迅速了.