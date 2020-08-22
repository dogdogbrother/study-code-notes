## Nano 编辑器
是一个麻雀虽小五脏俱全的编辑器，Nano是毫米的意思，纳米的英文就是 nanometer。  
contos默认安装 Nano，但是纯净版有可能是没有的，需要手动安装一下 `yum install nano`。
### nano 快捷键
输入`nano file`，就能编辑或是创建一个 file 文件，并进入编辑器。编辑器的下面有一堆提示，例如 `^X exitelp` 意思是 **ctrl x** 退出编辑，**ctrl k** 裁剪一行文本，U 粘贴文本。  
如果觉得这帮助文档有点碍事，可以先按 exc 键，再按 x 键。显示的话同样的操作。
### nano 参数
* -m 参数，激活鼠标，可以通过鼠标点击控制光标位置。
* -i 激活自动缩进功能，对程序员友好。
* -A 激活 Home 键功能。
### 通过 .nanorc 来配置Nano
linux很多程序在启动时 都需要 **rc** 后缀的初始文件或配置文件，rc 是 runcomm的缩写，即 run command。  
因为我现在登陆的用户是 senlin，.nanorc 文件应该在 /home/senlin 下。
.nanorc 的每一行的配置语句，都是以 set 或者 unset开头，用于激活或是关闭某个功能。`nano .nanorc` 命令后，文件夹内容如下：
```shell
set mouse
set autoindent
set smarthome
```
对应的就是前面的 **-miA** 参数，**ctrl o**保存即可。全局的默认配置文件在 /etc/nanorc.
