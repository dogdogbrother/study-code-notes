## at 创建定时任务
输入 `at 22:10`,进入 at 界面，输入你想执行的命令，例如 `touch file.txt`.再使用 **Ctrl D** 组合键退出。  
* 如果想明天晚上10点执行：`at 22:00 tomorrow`。  
* 具体某日某点执行： `at 22:10 12/10/20`,12/10/20 依次是 月/日/年，这是美国时间格式。  
* 指定间隔时间执行程序： `at now + 10 minutes`，十分钟后执行，除了 minutes ，还可以用 hours，days，weeks，months，years。

## atq 列出正等待执行的at任务
q 是 queue 的首字母，表示队列。

## atrm 删除正在等待执行的at任务
atrm 命令后接 at 任务的编号。

## sleep 中断一段时间
`touch file.txt; sleep 10; rm file.txt`,这个命令会创建个新文件，十秒后删除该文件。  
默认 sleep 后面的数值表示的是秒。也可以手动指定时间类型，m(分钟)，h(小时),d(天)。例如 `sleep 10m`。

## && 和 ||
和语言中的 && 和 || 一样的，&& 前的命令成功后，才会执行后面的命令。|| 号前的命令失败了，才会执行后面的命令。  

> 分号是前面的命令不管成功与否，都会执行后面的命令。

## crontab 指定执行程序
at 命令只会执行命令一次，而 crontab 则可以重复执行，例如每小时、每分钟等等。  
实际上是有两个命令，一个是 crontab 用于修改 crontab 文件。cron 是用于实际执行定时的程序。cron 源于希腊语，意为时间。  
crontab 有三个主要参数

* -l 显示 crontab 文件
* -e 修改 crontab 文件
* -r 删除 crontab 文件

crontab 文件的格式是 **m h dom mon dow command**,意思是：  
* **m** minute,表示分钟
* **hour** hour,表示小时
* **dom** day of month,表示一个月的哪一天
* **mon** month,表示月份
* **dow** day of week,表示星期几
* **command** 需要定时执行的命令

举几个例子：  
* 假如我想每天的22点10分都在家目录下创建 file.txt 文件，可以写入 `10 22 * * * touch ~/file.txt`.
* `0 0 * * 1,3,4 command` 每个星期一三四的凌晨都执行command命令。
* `*/10 * * * 1-5 command` 每个星期1到星期5的每个10的倍数的分钟都执行command命令。  

输入命令保存后会显示**crontab: installing new crontab**，意思是按照新的 crontab 文件。 