# 处理请求 url 参数

>处理请求 url 参数其实就是把我们的`params`参数内容都拼接在url上面去,因为get请求只能是url传参.

## 需求分析

### 参数值为数组

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
```

最终请求的 `url` 是 `/base/get?foo[]=bar&foo[]=baz'`。

### 参数值为对象

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
```

最终请求的 `url` 是 `/base/get?foo=%7B%22bar%22:%22baz%22%7D`，`foo` 后面拼接的是 `{"bar":"baz"}` encode 后的结果。

### 参数值为 Date 类型

```typescript
const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})
```

最终请求的 `url` 是 `/base/get?date=2019-04-01T05:55:39.030Z`，`date` 后面拼接的是 `date.toISOString()` 的结果。

### 特殊字符支持

对于字符 `@`、`:`、`$`、`,`、` `、`[`、`]`，我们是允许出现在 `url` 中的，不希望被 encode。


```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})
```

最终请求的 `url` 是 `/base/get?foo=@:$+`，注意，我们会把空格 ` ` 转换成 `+`。

### 空值忽略

对于值为 `null` 或者 `undefined` 的属性，我们是不会添加到 url 参数中的。

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})
```

最终请求的 `url` 是 `/base/get?foo=bar`。

### 丢弃 url 中的哈希标记

```typescript
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})
```

最终请求的 `url` 是 `/base/get?foo=bar`

### 保留 url 中已存在的参数

```typescript
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
```

最终请求的 `url` 是 `/base/get?foo=bar&bar=baz`


## buildURL 函数实现

>我们用一个函数来专门处理把参数拼接到url上的行为: **buildURL函数**

我们希望把项目中的一些工具函数、辅助方法独立管理，于是我们创建一个 `helpers` 目录，在这个目录下创建 `url.ts` 文件，未来会把处理 `url` 相关的工具函数都放在该文件中。

`helpers/url.ts`：

```typescript
import { isDate, isObject } from './util'

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL (url: string, params?: any) {
  // params 后面加 ? 说明了是可以选参数,是可以不传的
  // any 定义了类型,是不限制类型
  if (!params) {
    //函数不存在就没啥可处理的了,直接return 
    return url
  }

  // 定义个装string的空数组,是用于最后遍历拼接url的
  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    // axios 里面的所有的参数都是对象形式进来的
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      // 如果这个参数的值为 null 或者 undefined 就不操作了,丢弃此值
      return
    }
    let values: string[] 
    // 声明一个 string 数组

    if (Array.isArray(val)) {
      // Array.isArray es5的方法,判断这个值是不是数组
      values = val
      // 如果是的话 给key值上加个标识,为啥这么干可以翻阅下前面的需求
      key += '[]'
    } else {
      values = [val]
      // 如果不是数组就让他强行变成一位的数组,因为下面要统一遍历
    }
    values.forEach((val) => {
      if (isDate(val)) {
        // js没有办法判断一个值是不是时间,所以 isDate 函数是我们在util工具文件里面定义的,下面会写
        val = val.toISOString()
        // toISOString 是使用 ISO 标准返回 Date 对象的字符串格式
      } else if (isObject(val)) {
        // isObject 同 isDate,如果是object就返回true
        val = JSON.stringify(val)
        // 把对象参数转成字符串
      }
      parts.push(`${encode(key)}=${encode(val)}`)
      // encode 也是我们写的转码函数,不过里面用了 encodeURIComponent 的全局函数
    })
  })

  let serializedParams = parts.join('&')
  // serialized 是序列化的意思,我们把这个用 & 符号连接起来
  if (serializedParams) {
    // 假如 serializedParams 的意思其实就是我们参数的数组至少有2位
    const markIndex = url.indexOf('#')
    // 我们要判断url里面有没有 # ,因为hash值后面的内容不是参数
    if (markIndex !== -1) {
      // 如果存在就把hash后面的内容截掉不要了
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    // 最后判断,如果这个url本身没有 ? 号的话,我们就用 ? 作为参数的开始
    // 如果有的话就代表url上本身就已经有参数了,我们就用 & 连接起来新参数就行了
  }
  return url // 把我们最后处理好的url返回出去就OK了
}
```

`helpers/util.ts`：

>这个就是我们的工具函数,判断参数是不是时间格式或是object,返回布尔值

```typescript
const toString = Object.prototype.toString

export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]'
  // 小技巧嗷,判断是不是时间格式的
}

export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object'
  // 因为null本身也是object,所以要联合判断一下
}

```

## 实现 url 参数处理逻辑

我们已经实现了 `buildURL` 函数，接下来我们来利用它实现 `url` 参数的处理逻辑。

在 `index.ts` 文件中添加代码后如下：

```typescript
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url'

function axios(config: AxiosRequestConfig): void {
  // 我们在使用axios是的参数是 config,我们先要处理一下
  processConfig(config)
  xhr(config)
}

function processConfig (config: AxiosRequestConfig): void {
  // 把参数处理一下后覆盖掉参数的url,处理了什么呢? 
  // 这个函数只是做了个简单的中转为什么还要单独起一个函数呢,我猜想后面会有别的操作.
  config.url = transformUrl(config)
}

function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config 
  // 我们通过结构赋值拿到url和参数对象,通过 bulidURL 函数对url的拼接得到新的url
  return bulidURL(url, params)
}

export default axios
```

那么至此，我们对 `url` 参数处理逻辑就实现完了，接下来我们就开始编写 demo 了。

## demo 编写

在 `examples` 目录下创建 `base` 目录，在 `base` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Base example</title>
  </head>
  <body>
    <script src="/__build__/base.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：
>这里面有很多的请求,其实都是为了测试我们的拼接url字符串是否是正确的
```typescript
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
```

接着在 `server.js` 添加新的接口路由：

```typescript
router.get('/base/get', function(req, res) {
  res.json(req.query)
})
```
>别忘了在入口的html文件加上`<li><a href="base">base</a></li>`

然后在命令行运行 `npm run dev`，接着打开 chrome 浏览器，访问 `http://localhost:8080/` 即可访问我们的 demo 了，我们点到 `Base` 目录下，通过开发者工具的 network 部分我们可以看到成功发送的多条请求，并可以观察它们最终请求的 url，已经如期添加了请求参数。

那么至此我们的请求 `url` 参数处理编写完了，下一小节我们会对 `request body` 数据做处理。

## 个人终结的小知识点

* 业务需求的分析
我在开发个人项目的时候也需要一个明确的需求分析啊,要不然写着写着容易返工,最后写崩了就得重构.一个拼接url的小需求就有这么多种边界处理动作,可见如果真的是比较复杂的业务场景,需要考虑的点就更多了.

* encodeURIComponent 函数
encodeURIComponent是挂载在全局window下的函数方法,可把字符串作为 URI 组件进行编码.这里是[菜鸡教程的说明](https://www.runoob.com/jsref/jsref-encodeuricomponent.html)

* Array.isArray([1])
ES5新增的方法,判断一个变量是不是数组,返回布尔值.[菜鸡教程](https://www.runoob.com/jsref/jsref-isarray.html)

* 判断是否为时间格式的方法
`toString.call(val) === '[object Date]'`
Date是对象的子类型,其实数组,Undefined等等都是可以用这个办法来判断的.
`toString.call([]) === "[object Array]"`
* process 意思是 **加工/处理/审核**
