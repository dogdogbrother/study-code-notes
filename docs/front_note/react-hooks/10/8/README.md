课程里面组件还有 transition 的封装，input 和 autoConplete(下拉提示)，upload等组件，但是精髓其实都是在 button 和 menu 组件中。  

所以省时间就不都写了，这几个组件中我不知道的知识点列举下。

## Input 组件
Input 自己的接口信息部分如下:
```tsx
type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' > {
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
}
```
组件的属性不仅要有自己定义的，还要能用原生的input属性，所以 extends `InputHTMLAttributes<HTMLElement>`,但是原生 input 上就有size属性，再定义就冲突了，所以用 TS 提供的Omit工具剔除掉 size 属性。(前面也提到过)

## autoComplete

### 接口类型
看了下代表，就是纯业务逻辑，可提的点不多,先看下接口:
```tsx
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}
```
类型别名 DataSourceType 的逻辑大概就是他接受一个泛型T，默认是空对象，此空对象联合另个接口。效果就是，此类型的参数就是必须是个对象，并且这个对象必须要有 value 属性，其他属性随意。

### event类型
input 键盘事件中的 event 类型:
```tsx
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  // ...
}
```
input 值改变时的event类型为 `ChangeEvent<HTMLInputElement>`。

> KeyboardEvent 还是 ChangeEvent 都是从 react 中导出的
### Promise 
上面代码中 fetchSuggestions 是个函数，参数是个 string，返回数组或是返回Promise，其中包含数组，什么意思呢，看代码就知道了:
```tsx
if (results instanceof Promise) {
  setLoading(true)
  results.then(data => {
    setLoading(false)
    setSugestions(data)
    if (data.length > 0) {
      // console.log(data[0].) 会发现自动提示有value属性了
      setShowDropdown(true)
    }
  })
}
```
我们先用 instanceof 判断 results 是不是 Promise，是的话就 .then 拿到 data 值，而这个data就是 DataSourceType[].

### 文档
和前面几个略有不同的是，AutoComplete智能提示的功能是需要发送网络请求的，其实也不需要单独处理，就是单纯的写个函数就OK了。
```tsx
const SimpleComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleFetch}
    />
  )
}
storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)
```
### 测试用例
有一个坑先要指明一下，代码里面会用注释填坑：
1. 组件使用了 react-transition-group 组件，显示都是异步的，也就是说当你操作dom后不会立即有相应的元素改变或者存在，前面的 toBeInTheDocument 判断方法就不好用了。
2. 当input change事件时，直接 expect 下拉选项是否存在是不行的，因为 input 有默认300ms的防抖。
```tsx
import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps } from './autoComplete'

config.disabled = true  // 这对应的就是第一个问题，答案就是直接禁用掉动画，把异步变同步

const testArray = [ // 模拟的 mock 数据
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}/>)  // 生成测试用例节点
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    // input 输入值改变时，change的元素是 inputNode， 值是 a
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {  // 这就回答了 2 的问题，使用 wait 即可，原理不清，后面知道了补上。
      expect(wrapper.queryByText('ab')).toBeInTheDocument() // a 自然匹配的是 ab
    })
    // a 除了匹配ab还匹配abc，自然是dom元素长度为2
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // 当我们点击某个item时
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11}) // 期待函数触发的参数也要是对应的，
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument() // 下拉框消失
    expect(inputNode.value).toBe('ab')  // input的值也要变为对应的
  })
  it('should provide keyboard support', async () => {
    //  当我们输入a时
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // 获取到这两个元素，也是匹配的 item 
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')

    // 按下键时，第一个匹配项获得选择 class
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass('is-active')
    //arrow down 
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('is-active')
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass('is-active')

    // 当按回车选择时，触发正确参数的回调函数，并移除对应的节点
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // 当我们点击非下拉框时，下拉框元素消失
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
})
```

## upload上传组件
课程里面的上传组件写的思路挺有意思，也不复杂，整理下：
1. 写一个input标签用ref获取到，然后none掉，再写一个元素， click 时执行 `ref.current.click()`，模拟点击input按钮，然后就可以选择文件了。
2. 选择好文件后，会触发input上定义好的 onChange 事件，event 类型为 `ChangeEvent<HTMLInputElement>`，`e.target.files`就是我们选择的文件，因为是可以多选的，所以是数组，但是注意是类数组，如果想要操作的话还需要 `Array.from(files)`。这是数组里面的每个file的类型是内置的 `File` 类型。
3. 然后可以用 FormDate 生成表单提交，再用 axios 提供的钩子函数去获取上传进度，代码简写下，大概如下：
```tsx
const formData = new FormData()
formData.append(name || 'file', file) // name是props，默认key是file，可以自定义
axios.post(action, formData, {  // action 是上传地址，也是props传进来的
  headers: {
    ...headers, //传进来的headers设置给弄上
    'Content-Type': 'multipart/form-data' // 必须要设置的，告知是文件格式提交
  },
  withCredentials,
  onUploadProgress: (e) => {  // axios的钩子函数，反馈
    let percentage = Math.round((e.loaded * 100) / e.total) || 0;   // 
    if (percentage < 100) {
      
    }
  }
}).then(resp => {}
```

