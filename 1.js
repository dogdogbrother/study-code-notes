function deepCopy(obj, cache = new WeakMap()) {
    // 如果传进来的不是对象,就直接返回出去
    if (!obj instanceof Object) return obj
    // 防止循环引用
    if (cache.get(obj)) return cache.get(obj)
    if (obj instanceof Function) {
        return obj
        return function () {
          return obj.apply(this, arguments)
        }
    }

    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)

    const res = Array.isArray(obj) ? [] : {}
    cache.set(obj, res)
    Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Object) {
          res[key] = deepCopy(obj[key], cache)
        } else {
          res[key] = obj[key]
        }
    });
    return res
}
const source = {
    name: 'Jack',
    meta: {
      age: 12,
      birth: new Date(),
      ary: [1, 2, { a: 1 }],
      say() {
        console.log('Hello');
      },
      rule: /runoob/i
    }
  }
source.source = source

const newObj = deepCopy(source)
created() {
  this.setTitle('登录', 'index')
  // window.location = "http://www.baidu.com"
  const code = this.$route.query.code
  if (code) {
      axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx482818e04c8a33f7&secret=71723d02e47da830de9c23a61b63e3f3&code=${code}&grant_type=authorization_code`).then(res => {
          console.log(res.data);
          // https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
          axios.get("https://api.weixin.qq.com/sns/userinfo", {
              params: {
                  access_token: res.data.access_token,
                  openid: res.data.openid,
                  lang: "zh_CN"
              }
          }).then(res => {
              console.log(res);
          })
      })
  } else {
      window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx482818e04c8a33f7&redirect_uri=${window.location.href}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  }
}