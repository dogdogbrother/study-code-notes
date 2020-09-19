与测试 button 组件不同，menu 复杂一些，需要手动的创建组件，手写一些必要的css，还要针对横竖两个版本写不同的用例。

## 有注释的代码
```tsx
import React from 'react'
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}
let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
// 测试默认的，水平的 menu 组件，也就是，没有 testVerProps 的
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    // 先生存个组件
    wrapper = render(generateMenu(testProps))
    // 然后把生成的 css 文件加载进去，这个是因为 subMenu下的 item 本身是隐藏的，不过css样式是在style文件夹下的index加载的。
    // 这里生成的组件并没有对应的none的样式，所以需要单独处理加载下
    wrapper.container.append(createStyleFile())
    // 获取元素的方法可以用原生的 byClass，但是testing-library推荐使用他们自己的query。
    // 就是在标签上添加个属性 data-testid="test-menu"，然后就能用 getByTestId 找到这个元素了。
    menuElement= wrapper.getByTestId('test-menu')
    // 默认的 item 项
    activeElement = wrapper.getByText('active')
    // 找到 disabled 禁用的 item 项
    disabledElement = wrapper.getByText('disabled')
  })
  // 测试下这个组件的基本的 UI 情况
  it('should render correct Menu and MenuItem based on default props', () => {
    // 组件是否存在页面
    expect(menuElement).toBeInTheDocument()
    // 组件是否拥有 viking-menu test 两个 class
    expect(menuElement).toHaveClass('viking-menu test')
    // 组件是否拥有5个 menuItem。这个地方有个坑，就是 subMenu 也是个li，只不过这个li下面还有li。  
    // 用了 :scope 伪类代表自己，配合 > 选择器，只选择第一层的li
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
    // 判断是否拥有 is-active， 因为默认的 defaultIndex 是 0,下一个的 disabled 同理
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  // 测试点击 menuItem 能否做到正确的切换index和执行回调函数
  it('click items should change active and call the right callback', () => {
    // 找到第三个 item，并点击他
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    // 判断是否拥有了 is-active 的class，也就是 index 是否被改变了
    expect(thirdItem).toHaveClass('is-active')
    // activeElement 是我们上次点击的 item，如果他没有了 is-active 则代表正确。
    expect(activeElement).not.toHaveClass('is-active')
    // toHaveBeenCalledWith 校验的是点击函数执行时的参数
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    // 测试点击 disabled 的 item，如果没有 is-active 的class，和没有检测到点击事件的参数为1的话就通过
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  // 测试下拉的 submenu
  it('should show dropdown items when hover on subMenu', async () => {
    // 因为 drop1 的 item 是在 subMenu 中的，所以默认应该是不显示的。
    // 这里之所以能生效，是因为上面写了隐藏的 css
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    // dropdown 并不是内容而是标签的属性 title，这也能获取的到吗，瞎了。
    // 拿到 subMenu，模拟鼠标移入
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    // 组件中是要经过 200ms 后隐藏组件的，这里用了 testing-library 提供的 wait 方法来进行的异步校验
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    // drop1 是 subMenu 下的 item，点击他测试是否回调函数的参数是正确的
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    // 测试鼠标移出，元素隐藏
    fireEvent.mouseLeave(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
})

// 这里测试竖向的 menu 组件，也就是有 testVerProps 的
describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  // 测试是否有对应的竖向应该有的 class
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    // 先获取到没展开的 item
    const dropDownItem = wrapper2.queryByText('drop1')
    // 首先是隐藏的
    expect(dropDownItem).not.toBeVisible()
    // 但是如果你点击了他父级的 submenu
    fireEvent.click(wrapper2.getByText('dropdown'))
    // 那么他就会显示了
    expect(dropDownItem).toBeVisible()
  })
  // 测试是否默认是显示的，因为 defaultOpenSubMenus 默认的就是4 对应的就是它
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(wrapper2.queryByText('opened1')).toBeVisible()
  })
})
```

## 知识点总结
* testing-library 的 `render` 回的组件类型是 `RenderResult`.testing-library 已经帮忙定义好了，直接导入就好了。
* `getByTestId` 可以获取到便签元素上的 `data-testid` 属性。如果没有这个方法的话，我们只能通过原生的query去获取元素了。
* `toHaveBeenCalledWith` 可以测试回调函数的参数是否匹配。