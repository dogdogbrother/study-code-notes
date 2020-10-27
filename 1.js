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
