## 关于 menu 和 menuItem 数据问题

### createContext 和 useContext

menu 上有 defaultIndex 和 defaultOpenSubMenus，这就需要 item 在渲染时拿到自己 index 外，还要共享到这两条数据，前面在用 cloneElement 生成组件的时候可以在 props 上挂载 index 的值，那么也可以把  defaultIndex 和 defaultOpenSubMenus 传过去吗？

可以。但是对于有展开页的 item，多了 submenu，这样传起来就很麻烦。这里就需要 react 的新特性的 **createContext** 和 **useContext**。

用 `createContext()` 创建个上下文并导出去,参数是他的默认值，此上下文下有个 Provider 属性，此属性是个标签，此标签接受一个属性 value，也就是子组件能接受到的值(store).

子组件引入 useContext 和 根组件的 上下文, `useContext(上下文)` 得到 store。

```tsx
// menu.tsx
import React, { createContext } from 'react'
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];  
}
export const MenuContext = createContext<IMenuContext>({index: '0'})
const Menu: React.FC<MenuProps> = (props) => {
//...
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

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const context = useContext(MenuContext)
  console.log(context.index)
  context.onSelect()
}
```

