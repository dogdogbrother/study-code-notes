
# 钩子函数和作用域

## 钩子函数
假如测试文件引入了一个变量`a`,值为0.  
第一个测试`a + 1 = 1`,测试通过.  
第二个测试`a - 1 = 0`,测试失败,a其实是1,因为第一个测试用例已经改变了`a`的值.

这很正常,js中就是这样的作用域规则,但是我们发现2个测试用例相互影响了,我想在每个测试用例都用的是引入进来的初始值.

这就用到了 jest 的钩子函数,也可以说是生命周期. 

1. `beforeAll`所有测试用例开始前执行.
2. `afterAll`所有测试用例结束后执行.
3. `beforeEach`每个测试用例开始前执行.
4. `afterEach`每个测试用例结束后执行.

```js
beforeAll(() => {
    console.log('beforeAll');
})
afterAll(() => {
    console.log('afterAll');
})
beforeEach(() => {
    console.log('beforeEach');
})
afterEach(() => {
    console.log('afterEach');
})
test('test1', () => {
    console.log("test1");
})
test('test2', () => {
    console.log("test2");
})
```
依次输出:
```sh
    beforeAll
    beforeEach
    test1
    afterEach
    beforeEach
    test2
    afterEach
    afterAll
```

## 作用域

我们还可以用`describe`对测试用例进行分组,模块化测试.
```js
describe('测试数字相关的代码', () => {
    beforeEach(() => {
        console.log('beforeEach');
    })
    test('test1', () => {
        console.log("test1");
    })
})
```

写过vue/react的话对这个分组作用域是很熟悉的,其实每个`describe`就是一个组件,有自己的生命周期钩子函数.