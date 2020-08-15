## 广场模块
广场是每个用户看到的都是一样的，是所有人的发微博动态的集合。  
直接从数据库拿倒是没啥问题，但是也可以把数据存在 redis 中，这样性能会高很多。  
具体的思路是.用 pageIndex 和 pageSize 拼成 key,如果 `get(key)`为 null，就从数据库中拿到对应的数据存到这个 key 里面，并设置60S过时，60秒更新一次数据。

```js
// cache/blog.js
const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    // 尝试获取缓存
    const cacheResult = await get(key)
    if (cacheResult != null) {
        // 获取缓存成功
        return cacheResult
    }

    // 没有缓存，则读取数据库
    const result = await getBlogListByUser({ pageIndex, pageSize })

    // 设置缓存，过期时间 1min
    set(key, result, 60)

    return result
}

module.exports = {
    getSquareCacheList
}
```

## 粉丝模块
和知乎项目的处理不同，新建个 `UserRelation` 表用于存储对应关系。
```js
const seq = require('../seq')
const { INTEGER } = require('../types')
const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户的 id'
    }
})
module.exports = UserRelation
```
然后就能通过这个表来连表查询用户的粉丝或者用户的关注人。