## root 用户
### sudo
可以用 `sudo command` 命令暂时获取 root 用户的权限。
可以用 `sudo su` 直接切换到root用户。
`exit` 命令可以退出root用户，回到个人用户。
`su` 或者 `su -` 命令也可以切换到 root 用户(有 - 的会直接定位到家目录，还可以用 i 代替)。
### useradd
在 root 权限下，可以执行 `useradd senlin` 命令增加个新的用户，再使用 `passwd senlin` 来给新用户设置下密码。我们就可以切换该用户了。
### userdel
`userdel -r senlin` 删除用户，如果不加 -r 参数的话，只会删除用户而不会删除 home/shenlin 文件夹(--remove 等同于 -r)。

## 群组
linux 用户权限是有三层的，root 群组 用户。  
刚才我们新建立的 senlin 用户是默认群组为 senlin。
### groupadd
`groupadd friends` 新增 friends 的群组。
### usermod
是 user 和 modify 的缩写，用于修改用户的账户。
* `-l` 参数对用户重命名，但是 /home 下的用户文件夹还需要手动修改命名。
* `-g` 修改用户所在的群组。  
`usermod -g friends senlin`,这样就把 senlin 用户所属放到 friends 群组里面了。  
一个用户还能在多个群组里面，`usermod -G friends,happy senlin`。但是这样用的话有会一个问题，就是 senlin 会被踢出之前的群组，而加入到这两个新群组，如果只是想加入新群组而不改变原先的，就再加上参数 `-a`, append 的缩写。注意的是，只有 -G 才能追加群组，-g 不行。  
`group senlin`, 查看该用户所在的群组。
### groupdel
删除群组。
### chown
我们用 senlin 用户新建个文件，这个文件是属于 senlin 用户的，我们可以改变这个文件的所有者：`chown gouge file.txt`。还可以改变群组`chown gouge:friends file.txt`.  
-R 参数让目录递归改变所有者。  
### chgrp
改变文件的群组。

## 文件权限管理
我们在用 `ls -l` 时，显示的第一排参数 **drwxr-xr-x** 就是目录或是文件的权限。里面的一些字母有对应的意思。
d 是directory缩写，表示目录。  
l 是link，表示链接。
r 是读。
w 是写，也有删除的权限。
x 是execute，表示执行，可执行的文件。如果是在目录上有x权限就代表此目录可以被读。
**-** 就是没有相应权限。  
***
**drwxr-xr-x** 一共10个符号，包含了四个信息，d是属性，后面的rwx是所有者的权限，第二个rwx是群组用户，第三个rwx是其他用户。

### chemod
用于改变文件目录的权限，change 和 mode 的缩写，这个命令不需要root用户才能运行，只要你是此文件的所有者，就可以用chmod来修改文件的访问权限。  
改变权限的方法有一种是利用数字改变权限，每个权限代表一个数字，相加后就等于他真正的权限。  
权限|数字
:--:|:--:|
r|4
w|2
x|1
举例 `chmod 600 files`,意思就是 files 的权限为 rw------。常见的 777 就是任何人都有任何的权限。
***
除了用数组分配权限还能用字母来分配，例如 `chmod u+rx file` 文件file的所有者增加读和运行的权限。 `chmod g+r file` file的群组其他用户增加读的权限，`chmod 0-r file` file的其他用户一出读的权限。  
u g o三个字母分辨代表user用户，group组，other其他。三个字母组合使用，例如 `chmod g+r o-r file`, `chmod go+r file`.  
`chmod +x file` 不加字母代表所有用户增加运行权限。  
这种直接赋值的也是可以的：``chmod u=rwx,g=r,o=- file``.  
当然 -R 递归分配权限也是有用的，