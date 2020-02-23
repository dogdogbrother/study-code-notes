# jest命令行指令

前面的测试代码,每修改完都要运行下`npm test`.有点麻烦,我们可以在 script 下的 test 命令后面加上 `--watchAll`.

这样我们没修改完代码就会自动跑测试用例,并且在命令行下多出来一些东西:
```sh
Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

按 f 和按 o 的说明是最简单的,只跑上次未通过的测试用例和只有代码有更改的文件.

## 关于 o 模式
o 模式下,jest如果能知道我们修改的是哪个测试用例的文件,就一定知道我们没修改保存前的代码是怎么样的.  

没有办法,jest必须要依赖git,才能追踪文件的变化.

我们在上面使用了`jest --watchAll`命令,让我们只要更新了代码就把所有的文件全跑一边.其实我们还可以选择`--watch`,这样就只跑更改过的代码,而不用跑全部了.

`--watch`就是 o 模式,当你使用了`--watch`默认 o 模式时,命令行会多出一个 a 模式,也就是`all`模式.

## 其他模式也没啥好说的了,看说明就知道了.


