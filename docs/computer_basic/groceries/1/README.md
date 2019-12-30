# git 相关内容

## github clone过慢
clone慢估计push也很慢,解决方法是在`.ssh`录下新建一个`config`文件,注意是没有后缀的.文件内容如下:
```
ProxyCommand "D:\codetools\Git\mingw64\bin\connect.exe" -H 127.0.0.1:7078 %h %p
```
路径指的是git安装的地址,-H是说明走的http代理,127.0.0.1是本机,7078是翻墙软件代理的端口.

>除了-H 还有-S,指的socks5

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

## git时候指定仓库名
```sh
git clone https://github.com/rengwuxian/git-practice.git 你想要的仓库名
```

## 新建分支
你想在当前 `commit` 处创建一个叫做 "feature1" 的 `branch`,然后切换该分支
```sh
git branch feature1
git checkout feature1
```
当然,这两步骤可以结合一下:
```sh
git checkout -b feature1
```
很明显 `-b` 就是 branch 的配置.

## 删除分支
```sh
git branch -d feature1
git push origin -d books // 删除远程仓库的分支
```
这样的操作有可能会失败,出于安全考虑，没有被合并到 master 过的 branch 在删除时会失败（因为怕你误删掉「未完成」的 branch 啊）,如果你确认是要删除的话,使用 **-D** 就行了.

## 关于 git push
假如你在 master 分支下,你可以直接执行 `git push`,git会把你当前 master 推到线上的 master,其他分支不操作.

但是,如果有一个分支不是通过 clone 或者 pull 下来的,你要 push 的话,就要加上 `origin 分支名` 才行.

当然,你可以通过 `git config` 指令来设置 `push.default` 的值来改变 push 的行为逻辑，例如可以设置为「所有分支都可以用 git push 来直接 push，目标自动指向 origin 仓库的同名分支」（对应的 `push.default` 值：`current`）.

## 冲突
当你 git pull发现了冲突,而且因为操作不当导致冲突非常非常多,你就后悔 pull 了,怎么能取消这次**冲突merge**呢?

当 Git 仓库处于冲突待解决的中间状态时,可以执行一次 `merge --abort` 来手动取消 merge.

## 查看一个commit中的一个文件的改动
```sh
git show 5e68b0d8 shopping\ list.txt
```

## rebase 解决 merge 的分叉
>rebase 翻译过来是 **变基** 的意思.(改变基处点的意思??)
merge分叉是什么意思呢,假如master分支上有12,然后我们分出一个dev,我们先在 master 开发了2个 commit 34,又在 dev 上开发了2个 commit 56.

这个时候如果我 merge 了 dev 分支,master分支上就会多出一个 commit,也就是7.

此时,commit7 就是所谓的 **merge分叉**,因为这个时候不管你是在 master分支 下,还是在 dev分支 下,commit7 的内容是一样的.就是说commit7其实是2个分支共同拥有的.

这样的分支处理其实是没问题的,但是有个体验上的缺点,如果你现在是 master 的 commit7 上,你想查看 dev 上的 commit5 改动信息,你就要切到 dev 上去查看.

rebase 的作用就能避免这个缺点,所有的 commit 节点信息都会在一个分支下.

```sh
git checkout dev
git rebase master
```
此时你的 dev 分支下变成了基于 master 分支上添加了 78 两个commit 节点,这 78 对应的就是之前的 56.也就是说现在的dev 分支上是 123478,而 56 则丢失了.

当然你现在的 master 分支上还是 1234,这时候再次 merge dev分支下即可,master 的 HEAD 就指向了最近的 commit8 了. 
```sh
git checkout master
git merge dev
```
>需要注意的是 commit 节点丢失的问题,所以千万不要在 master 分支上操作对其他分支 rebase 操作啊.

## 发觉有错误代码怎么办.

能怎么办,最简单粗暴的方法就是再次 add + commit 呗.不过可以用`commit --amend`来更优雅的处理.
```sh
git add new.js
git commit --amend
```
这样你上次的 commit 的记录就不见了,`commit --amend`会生成一个新的 commit 节点来代替最新一次的 commit 节点记录.

## stash隐藏文件
举个例子,当你在 dev 分支去写新功能,同事突然让你去 master 分支改个东西,这个时候你是没有办法直接 checkout 到主分支的.但是你又不想 commit 一次残疾提交,就可以用`git stash`.

我日常开发的时候经常会出现因为文件有改动,不能`git pull`的情况,就是因为没有使用`stash`的原因.

`git stash` 的作用就是把你改动过的文件全部隐藏起来,`git stash pop` 再显示出来.

不过需要注意的是,从未 track 的文件,也就是没有被跟踪过的文件(例如你新建的一个文件),是不会被 stash 起来的,需要加上 -u 参数,意思是`--include-untracked` 的简写.