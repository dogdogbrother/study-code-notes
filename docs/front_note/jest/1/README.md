# 自动化测试原理

## 写个基础的测试例子
举个例子,例如我们有个`math.js`文件,里面有加减运算的函数,如下:
```js
function add(a, b) {
    return a + b
}

function minus(a, b) {
    return a - b
}
```

我们该如何测试这两个函数是否正确呢?输出是否符合我们的预期呢?

我们可以再写个测试文件`math.test.js`:
```js
import { add, minus} from './math.js'

function expect(result) {
    return {
        toBe: function(actual) {
            if(result !== actual) {
                throw new Error('预期值和实际值不相等')
            }
        }
    }
}

expect(add(3,3)).toBe(6)
expect(minus(6,3)).toBe(3)
```
>expect/期望    actual/真实

当我们运行`math.test.js`后,什么反应都没有,这说明2个函数都是没问题的,测试通过了.

如果我们函数写的有问题,得到的值不符合预期,那么就会抛出异常.

## 完善下测试用例

上面的测试用例有几个问题.
1. 如果有一个测试用例不通过后报错,我们不知道是具体哪个用例有问题,无法精准定位.
2. 如果测试用例很多,或者是自动生成的案例,我们不太清楚输入的预期值是多少,这样就无法得知实际值和预期值相差多少.

所以我们再次修改下`math.test.js`文件,对expect进行一层封装:
```js
import { add, minus} from './math.js'

function expect(result) {
    return {
        toBe: function(actual) {
            if(result !== actual) {
                throw new Error(`预期值和实际值不相等,预期${actual},结果却是${result}`)
                // 解决了第二个痛点
            }
        }
    }
}

function test(desc, fn) {
    try {
        fn();
        console.log(`${desc} 通过测试`)
    }catch(e) {
        console.log(`${desc} 没有通过测试, ${e}`)
    }
}

test('测试加法 3 + 7',() => {
    expect(add(3,3)).toBe(6)
})
test('测试减法 3 - 3',() => {
    expect(minus(6,3)).toBe(3)
})
```

这样一个简单的测试用例就写好了,当你通过测试时,会输出 **测试加法 3 + 7**.  
虽然简单,不过现在大多数的测试工具的底层大概都是这意思.