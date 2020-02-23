# jest匹配器matchers

我们在前面用的都是`expect(6).toBe(6)`例子,`toBe`的意思不难理解,就是 **===** 相等.

toBe就是一个匹配器.

## 常见的是与否匹配器

### toEqual 对象内容相等
```js
const a = { one: 1 }
expect(a).toBe({ one: 1 })
```
这个案例是不通过的,因为对象是引用型值,但是如果我们想就是单纯判断对象的值是否是相等的,就是可以使用 `toEqual`,测试是通过的.

### toBeNull
```js
const a = null
expect(a).toBeNull()
```
这样是可以通过的,但是`toBeNull(null)`就不行,毕竟js中 `null !== null`.

### toBeUndefined
和null是一样一样的.

### toBeDefined
只要值被定义过,不是`undefined`就能通过.包括你赋值为null.

### toBeTruthy
只要值是true就能通过,例如 `0,null,''` 等等都是不通过的.

### toBeFalsy
相反.

### not
取反操作,例如 `expect(a).not.toBeTruthy()` 其实就是 `expect(a).toBeFalsy()`.

## 常见的数字匹配器

### toBeGreaterThan
greater更大的,than比.`expect(10).toBeGreaterThan(11)`就能通过.

相反的是 **toBeLessThan**

### toBeGreaterThanEqual

就是大于等于.

### toBeCloseTo
js中,0.1+0.2其实不等于0.3,因为有精度丢失的问题,用`to`或是`toEqual`就不行,用`toBeCloseTo`就没问题.

## 常见的string匹配器

### toMatch
`expect('www.baidu.com').toMatch('baidu')`是没问题的,不仅可以匹配字符串,还可以匹配正则,基本就可以满足绝大多数场景了.

## 场景的数组和set匹配器.

### toContain
很明显,是否包含了某一项,类似于`arr.includes()`

## 异常匹配器

### toThrow
就是监听函数里面是否有抛出过异常.`throw new Error('error')`.

>但是需要注意的是`toThrow`的参数是字符串或是正则,是要和你真实抛出的错误信息对应上才能通过的.
