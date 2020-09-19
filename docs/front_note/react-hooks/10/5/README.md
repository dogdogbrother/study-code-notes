## 关于 menu 和 menuItem 数据问题

### createContext 和 useContext

menu 上有 defaultIndex 和 defaultOpenSubMenus，这就需要 item 在渲染时拿到自己 index 外，还要共享到这两条数据，前面在用 cloneElement 生成组件的时候可以在 props 上挂载 index 的值，那么也可以把  defaultIndex 和 defaultOpenSubMenus 传过去吗？

可以。但是对于有展开页的 item，多了 submenu，这样传起来就很麻烦。这里就需要 react 的新特性的 **createContext** 和 **useContext**。

用 `createContext()` 创建个上下文并导出去,参数是他的默认值，此上下文下有个 Provider 属性，此属性是个标签，此标签接受一个属性 value，也就是子组件能接受到的值(store).

子组件引入 useContext 和 根组件的 上下文, `useContext(上下文)` 得到 store。

```tsx
// menu.tsx
import React, { useState, createContext } from 'react'
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];  
}
export const MenuContext = createContext<IMenuContext>({index: '0'})
const Menu: React.FC<MenuProps> = (props) => {
//...
  const [ currentActive, setActive ] = useState(defaultIndex)
  const handleClick = (index: string) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
//...
}
```
***
```tsx
// menuItem
import React, { useContext } from 'react'
import { MenuContext } from './menu'
import classNames from 'classnames'

// 。。。
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}
```
对于 menu 和 menuItem 上关于 index 和 defaultIndex 和点击切换 index，或是执行回调函数(返回index)，都是通过 Context 去调度的，认真看下代码就能清楚逻辑。

## subMenu
没有什么特殊难度，有几个 TS 的点说明下:
1. 事件中的 event 对象的类型是 `React.MouseEvent`。
2. `React.Children.map` 下的 child 的类型需要强制断言下才能拿到 `displayName` 属性，`child as FunctionComponentElement<MenuItemProps>`