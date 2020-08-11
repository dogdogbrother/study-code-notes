## 安装windows下的 Redis
[windows安装redis](https://www.runoob.com/redis/redis-install.html)

## 安装 redis 工具来操作 redis
```shell
npm i redis
```

## 配置 redis 工具 
redis 工具的操作核心是set键对值、key的保存时间、get键对值。

步骤如下：
1. 创建客户端
2. 引入config配置信息
3. config中的ip要根据生产环境来变，所以还要设置cross-env
4. 写好set和get函数，并导出去

新建 `cache/_redis.js` 文件:
```js
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error('redis error', err)
})

function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}
```

REDIS_CONF 内容如下:
```js
// conf/db.js
const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

if (isProd) {
    REDIS_CONF = {
        // 线上的 redis 配置
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    REDIS_CONF
}
```

判断环境的代码如下:
```js
// utils/env.js
const ENV = process.env.NODE_ENV

module.exports = {
    isDev: ENV === 'dev',
    notDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production'
}
```

`process.env.NODE_ENV`的值是我们在启动项目命令时设置的，是需要依赖安装 `cross-env`。

```json
// package.json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
    "prd": "cross-env NODE_ENV=production pm2 start bin/www",
  },
  "devDependencies": {
    "cross-env": "^5.2.0",
    "nodemon": "^1.19.1"
  }
}
```