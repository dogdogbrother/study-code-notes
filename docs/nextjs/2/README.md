# redis数据库

redis是内存数据库，就是说他的数据都是存在了缓存里面，这样的优点显而易见，就是性能很好。

## 安装
redis本身是没有Windows的安装包的，但是微软根据redis的代码自己开发了一个build包，再github上就能找到。虽然版本有点老，但是大部分的功能都能用，问题不大。 
 
我们在下载好msi包后，一路next就行。安装额完成后我们可以打开cmd。输入redis-cli就能开启redis服务了。默认端口是6379.

其他端的安装我没实测过,后续实测的时候我会更新.

## nodejs链接redis
可以使用一个npm包,ioredis,这个是阿里的一个工程师开发的.
```
npm i --save ioredis
```
我们创建一个临时文件夹test用于学习链接的操作,后续会删掉.创建个文件test-redis.js,内容代码如下:
```js
const Redis = require('ioredis')

async function  test() {
    const redis = new Redis({
        port:6379
    })
    const keys = await redis.keys('*')
    console.log(keys);
}
test()
```
我们运行这个js文件测试下
```
node .\test\test-redis.js
```
发现运行正常,并输出[],没有找到任何的key值.

当然,这是正确的,因为我们并没有给这个数据库添加任何的数据.

那么我们现在添加一个数据进去,再打印
```js
await redis.set('c',123)
```
输出`['c']`.我们还可以通过get来获取对应key值的value.
```js
await redis.get('b') // 123
```
我们还可以通过setex来设置数据的有限时间.
```js
await redis.setex('c',10,123) //10不是毫秒,是秒
```
这样我们在十秒内查询c是能找到123的,10秒后就找不到了.
