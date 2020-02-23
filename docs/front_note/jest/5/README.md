# 测试异步代码

假如我有一个 axios 请求文件:
```js
import axions from 'axios'
export const fetchData = (fn) => {
    axios.get('www.baidu.com').then(res => {
        fn(res.data)  // 假设这个返回的数据是 { success: true }
    })
}
```

我想要测试返回的数据是否为 `{ success: true }`,测试用例代码如下:
```js
import { fetchData } from './fetchData'

test('fetchData返回结果为 { success: true } ', () => {
    fetchData(data => {
        expect(data).toEqual({
            success: true
        })
    })
})
```

测试发现用例通过了.但是,是有问题的,假如我们估计用了一个404的接口,这个测试用例还是会通过的.

为什么呢? 是因为测试用例会发现 `fetchData()` 函数能够正常执行后再往下走,没了就结束了,他不会等待回调函数的执行.

## done 参数
done参数是个函数,我们比较要执行过done函数,才能证明这个测试用例已经结束了.
```js
test('fetchData返回结果为 { success: true } ', (done) => {
    fetchData(data => {
        expect(data).toEqual(...)
        done()
    })
})
```
再次测试就没问题了.

## promise 的异步测试

刚才 api 调用是利用了 fn 函数作为接受数据的方式,但是很多时候我们是返回了一个新的 promise 把结果抛给外面.  

这样的情况下我们当然还可以使用 done 方法,但是也可以把这个 promis 再 return 回去,也是可以的.
```js
const fetchData = () => {
    return axios.get('www.baidu.com')
}
```
```js
import { fetchData } from './fetchData'

test('fetchData返回结果为 { success: true } ', () => {
    return fetchData.then(data => {
        expect(data).toEqual(...)
    })
})
```

## 错误状态码 的测试

假如我就是要测试错误状态,例如报错 401 ,代码如下:
```js
test('fetchData返回结果为 401 ', () => {
    return fetchData.catch(e => {
        expect(e.toString().indexOf('401') > -1).toBe(true)
    })
})
```

然而这么写是不对的,因为如果你的接口是200,那么测试就会走 then 回调,而不会走 catch 回调,你这个用例还是能通过的.

接口方法是在用例函数内部的顶部调用`expect.assertion(1)`,意思是在后面的执行代码里,至少要执行一次`expect`语法一次.
```js
test('fetchData返回结果为 401 ', () => {
    expect.assertion(1)
    return fetchData.catch(e => {
        expect(e.toString().indexOf('401') > -1).toBe(true)
    })
})
```

这样再测试就没问题了.

>`expect.assertion(2)`就代表`expect`要执行2次,这能适用于更复杂的一些测试案例.

### 还有另一种写法
```js
test('fetchData返回结果为 { success: true } ', () => {
    return expect(fetchData()).resolves.toMatchObject({
        data: {
            success: true
        }
    })
})
```

```js
test('fetchData返回结果为 401 ', () => {
    return expect(fetchData()).reject.toThrow()
})
```

>代码的里面用的是return,当然awiat也可以,看你习惯了,每天特定的格式,挺灵活的.
