# mock和快照snapshot

先看下一个关于 callback 的函数:
```js
export const runCallback = (callback) => {
    callback()
}
```
我们要测试这个回调函数是否被执行过:
```js
import { runCallback } from './demo'

test('测试 runCallback', () => {
    const func = () => {
        return 'hello'
    }
    expect(runCallback(func)).toBe('hello')
})
```
能通过吗?失败,得到的是 `undefined` ,因为 `runCallback` 里面的确没有返回东西,除非 `return callback()`,测试用例才能拿到正常的值.

函数本身是没有问题的,为了迎合测试用例而修改没问题的代码并不是一个好的解决方案.

## mock

我们可以借助 jest 提供的生成的mock假函数来进行测试
```js
test('测试 runCallback', () => {
    const func = jest.fn()
    runCallback(func)
    expect(func).toCalled()
})
```
什么意思呢?

func是假的空函数,如果我们能确保让func执行过一次(所以用的 toCalled 的匹配器),就代表函数是没问题的.

如果我们是自己用 const 定义的函数的话,jest是没办法追踪你自己定义过的这个函数是否被执行过的,这就是mock函数的捕获调用的作用.

`func`还提供了一个 mock 属性,如果我们在测试用例的底部打印下 `console.log(func.mock)`,就会其中发现有一个calls的数组,`[ [] ]`.

这就说明了我们调用了1次mock函数.如果我们在正常的代码函数里面传入了参数`abc`,并且func也被执行过2次,那么calls的值就是`[ ["abc"], ["abc"] ]`.

如果我们要测试 callback 是否被执行过2次,那我们就可以`expect(func.mock.calls).toBe(2)`就行了.

## fn.mock 的其他属性

除了 fn.mock.calls 外,还有三个属性.
+ results,指的是fn中return的值是什么.
+ invocationCallOrder,调用fn函数的顺序.
+ instances,指的是fn被调用时的this执行.上面例子中的callback至少个普通函数,所以值是 undefined.

我个人感觉这三个属性没啥用,就不写代码例子了,如果有用到可以百度自行查阅.

## 其他
其实mock的内容很快,这也就是写了一半,但是有点累了,所以就先这样,后续有时间再补mock的东西