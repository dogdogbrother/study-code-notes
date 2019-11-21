# Code Splitting的概念

>Code Splitting就是代码分割，具体从一个例子开始说明

1. 我们安装lodash包，`npm install loadash`.

2. 我们在main.js中引入使用lodash
```JavaScript
import _ from 'lodash';

console.log(_join([2019,18,17],'/'));
//此时省略1000行console.log的业务代码
```

3. 打包,运行测试.结果上是OK的.不过有个问题,如果我们修改了业务逻辑的代码,要重新打包,用户就又要加载一次这2MB的文件.

4. 我们改良一下代码,src目录下我们新建立一个lodash.js的文件.
```JavaScript
import _ from 'lodash';
window._ = _;
```
index.js只写业务逻辑.
```JavaScript
console.log(_join([2019,18,17],'/'));
//此时省略1000行console.log的业务代码
```

5. 以前我们的打包出口文件只有一个`main:'./src/index.js'`,现在我们加一个`lodash:'./src/lodash.js`.

6. 再次打包,查看index.html发现加载了2个script,mian.js和lodas.js都被加载进来了.当我们业务代码发生改变的时候,浏览器只需要加载main.js即可.库只是个举例,我们日常可以把公用的代码抽出来,和经常变动的业务代码分离开来.

## 总结

如果不进行代码分割,那么也是可以的.除了性能不好之外毫无影响.