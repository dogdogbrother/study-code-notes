# 自动部署项目

根据前面的章节,咱们完成了一个node后台接口的项目,一个前端静态页面的项目.

虽然能够暂时和使用,但是有个小小的问题.就是我如何更新我线上的页面的.

正常的操作是这样的:

1. 打包,`git push`到仓库.

2. 服务器这边git pull.

3. 如果是node服务还要重启pm2.

比较繁琐,又要打开ssh又要输入路径什么的.所以我们可以选择释放下双手,利用webhooks进行自动化部署.

下面我就利用一个新的node仓库配合webhooks功能实现我电子书的自动更新发布.

## webhooks

hooks部署流程大致就是,你在git平台的webhooks预留一个请求的api,github会监听master分支,当你push代码的时候,自动向你预留的api接口发送一个请求.

你在服务器有一个node服务处理这个接口请求,当收到请求的时候,执行shell脚本,你可以执行pull代码,打包,重启服务等等的操作.

1. 点击右上角github头像,设置里面有一个webhooks的选项,比较简单.
![webhooks](../../public/content-img/webhooks.jpg)

2. 本地服务运行一下.这里我本人的github上有一个[node简易项目](https://github.com/dogdogbrother/web-hooks),是专门服务于webhooks的,大家可以点击进去看两眼,十几行代码而已,非常简单.

我在这里就从头演示一下流程.首选肯定是要进入www目录,下载项目,安装依赖,pom2改名启动.一气呵成.

```
cd /var/www/

git clone git@github.com:dogdogbrother/web-hooks.git

cd web-hooks/

npm i

pm2 start app/index.js --name="web-hooks"

```

我们看看nodeJS文件里面的简单代码

```js
const express = require('express');
const app = express();
const request = require('request');
const shell = require('shelljs');

app.post('/blog/hooks',(req,res) =>{
	shell.exec('cd /var/www/study-code-notes/ && git pull origin master')
})

app.listen(7999);
```

当有人调用`ip:7999/blog/hooks`接口的时候,我们就利用`shelljs`工具来执行进入目录并执行拉取代码的操作.`/blog/hooks`就是你在github的setting中设置的.

> 当然你可以让自动部署更智能一些,例如你在webhooks中设置只有在master分支发生merge时间的时候才发送post请求.这样你平时dev环境开发,当你自己测过没有问题的话,在合并到主分支,线上就自动更新了.
你还可以把打包这个动作写在shell脚本里,这样你本地更轻了.`shell.exec('... && npm run build')`.  
你还可以写一个webhooks,服务于这个node服务,就是当提交了代码后自己拉自己,重启pm2.  

这里温馨提示下,注意你的node版本,如果是webpack4而你的node小于10.0的话有可能会打包失败.