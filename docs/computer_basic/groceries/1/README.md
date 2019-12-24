# git 相关内容

## github clone过慢
clone慢估计push也很慢,解决方法是在`.ssh`录下新建一个`config`文件,注意是没有后缀的.文件内容如下:
```
ProxyCommand "D:\codetools\Git\mingw64\bin\connect.exe" -H 127.0.0.1:7078 %h %p
```
路径指的是git安装的地址,-H是说明走的http代理,127.0.0.1是本机,7078是翻墙软件代理的端口.

测试下就会发现从每秒5kb的下载量变成了10MB..

## git emoji

emiji|代码|commit说明
:--:|:--:|:--:|
:art:调色板|`:art:`|改进代码结构/代码格式
:zap:闪电|`:zap:`|提升性能
:racehorse:赛马|`:racehorse:`|提升性能
:fire:火焰|`:fire:`|移除代码或文件
:bug:bug|`:bug:`|修复 bug
:ambulance:急救车|`:ambulance:`|重要补丁
:sparkles:火花|`:sparkles:`|引入新功能
:pencil:铅笔|`:pencil:`|撰写文档
:lipstick:口红|`:lipstick:`|更新 UI 和样式文件
:tada::art:庆祝|`:tada:`|初次提交
:white_check_mark:白色复选框|`:white_check_mark:`|增加测试
:apple:苹果|`:apple:`|修复macOS/ios下的问题
:bookmark:书签|`:bookmark:`|发行/版本标签
:hammer:锤子|`:hammer:`|重大重构
:wrench:扳手|`:wrench:`|修改配置文件

## 杂项
我们在开发一个新功能的时候最好在本地新建一个分支去开发,这个新分支的名字最好也是语义化的.例如

* 如果是开发登录页面,分支名为 **feature-login**