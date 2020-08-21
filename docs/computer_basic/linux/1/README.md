## [root@test ~]# 什么意思
**root**代表用户，**@test**代表主机名字，**~**代表当前用户的家目录，也就是home，**#**是你所具有的权限，**#**就是超级用户root，如果是 **$**就代表是普通用户。  
如果你现在是普通用户，输入 `sudo su` 命令，再输入root用户密码，就能切换回root用户了。  

## 短参数和长参数
`-a`一个 **-** 的参数就是短参数，短参数可以有多个并且可以合并并且严格区分大小写，例如 `-p -a -T -c` 可以写成 `-paTC`。  
长参数是是由两个 **-** 开头的，是不能进行参数合并的，只能用空格分开。  
有些长短参数是一样的，例如 `--all` 和 `-a`。  
长短参数的赋值是不一样的，短参数赋值为`command -p 10`,长参数为 `command --parameter=10`。

## 命令补齐
**tab** 键有补齐功能，有单机和双击，假如你空命令下双击 **tab** 会提示你是否显示全部的命令，然后可以回车查看下一行，空格下一页，**N** 返回。

## 查找历史命令
向上键可以翻出输入过的命令，`crtl r`可以模糊定位搜索到使用过的命令，`history` 命令会把所有用过的命令编号的形式铺开，我们可以用`!编号`的方法输出命令

## 快捷键
* `ctrl L` 清屏，等同于 clear。
* `ctrl D` 退出。
* `shift PgUp` 向上滚屏。
* `ctrl A` 光标跳动命令行开头，如同 Home。`ctrl E`光标跳动命令行开结尾，如同 end。
* `ctrl U` 清除光标左侧的字符，`ctrl K`相反。
* `ctrl W` W指的是word，清除光标左侧的一个单词(用空格分辨单词)。
* `ctrl Y` 粘贴。