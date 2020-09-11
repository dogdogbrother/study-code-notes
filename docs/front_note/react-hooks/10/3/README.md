## 测试工具

* 测试的基础是 jest 工具，jest 提供了一些断言库,例如expect期待值是否大于等于某某等等基础数学层面的断言，不需要安装，create-react-app 内置
* 但是 jest 没有办法直接和react进行关联测试，需要 `@testing-library/react`,也不用安装，create-react-app 内置，他扩展了 jest 没有的方法，例如获取到 innerHTML 为 某某的元素(原生只能通过标签、ID、class之类的)。
* 还需要个 `testing-library` 旗下的 `jest-dom` 工具，他的作用是给 jest 的断言库添加了一些关于 dom 操作的一些新断言，例如你这个元素是否在文档中。

[testing-library](https://testing-library.com/) 集成了很多前端框架的测试工具，例如react，vue，angular等等。


## 先写个简单的测试用例。
这个简单的 demo 是没有 `jest-dom` 的：
```tsx
import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test('our first react test case', () => {
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.queryByText('Nice')
  expect(element).toBeTruthy()
}) 
```
1. 利用测试工具提供的 render 函数生成组件。
2. 利用测试工具提供的 queryByText 方法，根据文字获取元素。
3. 最后判断这个元素是否存在。

> 这个简单的测试demo很简单，但是其实也是有些实际用途的，如果你组件的 children 的渲染逻辑有问题的话，就会报错。 

## jest-demo
使用 `jest-dome` 扩展是需要配置引入的，需要在 src 目录下新建个 setupTests.ts 文件，内容如下:
```tsx
import '@testing-library/jest-dom/extend-expect';
```
这样断言的方法就更多了，使用起来更语义化，例如上面的 `expect(element).toBeTruthy()` 可以改为 `expect(element).toBeInTheDocument()`。

## 完整的 button 测试
先用 describe 分区，先写个完整的，没有属性，并且有点击事件的button:
```tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './button'

const defaultProps = {
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument() // 组件是否存在于页面中
    expect(element.tagName).toEqual('BUTTON') // 组件的标签名是不是 BUTTON 
    expect(element).toHaveClass('btn btn-default') // 组件默认的 className 是否正确
    expect(element.disabled).toBeFalsy()  // 组件的是否存在disabled，不存在为通过
    fireEvent.click(element)  // 点击组件元素
    expect(defaultProps.onClick).toHaveBeenCalled() // 是否执行回调函数，也就是 jest.fn()。
  })
})
```
这里面有几个知识盲点，我列举下:
* 获取元素的时候使用了 `getByText` 而上面的demo使用的是 `queryByText`,这是因为 `queryByText` 获取到的有可能是dom也有可能是null,如果是null的话 `element.tagName` TS编译阶段就会报错。(不过已经 `as HTMLButtonElement` 了，其实2者都一样了)
* 特意把类型指定为 `HTMLButtonElement` 是因为大多数标签是没有 `disabled` 属性的，所以TS会报错。
* 事件的测试方法是利用提供的 `fireEvent` 工具，能模拟各种各种事件，如果定义的 props 中的回调函数 `jest.fn()` 被执行过，那么 `toHaveBeenCalled` 就能通过。

## 写个测试 link 的按钮
```tsx
it('should render a link when btnType equals link and href is provided', () => {
  const wrapper = render(<Button btnType={ButtonType.Link} href="http://dummyurl">Link</Button>)
  const element = wrapper.getByText('Link')
  expect(element).toBeInTheDocument()
  expect(element.tagName).toEqual('A')
  expect(element).toHaveClass('btn btn-link')
})
```
`toHaveClass` 断言并不是单纯的依靠字符串去对比的，填入的 class 就算顺序是反的也是能通过的。

## 最后写个 disabled 的按钮
需要注意的是，disabled 的按钮是不会响应点击事件的。
```tsx

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}
it('should render disabled button when disabled set to true', () => {
  const wrapper = render(<Button {...disabledProps}>Nice</Button>)
  const element = wrapper.getByText('Nice') as HTMLButtonElement
  expect(element).toBeInTheDocument()
  expect(element.disabled).toBeTruthy()
  fireEvent.click(element)
  expect(disabledProps.onClick).not.toHaveBeenCalled()
})
```