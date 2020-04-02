# 实现右键菜单

菜单基本上分2种，一种是左上角的一排菜单，另一种是右键上下文菜单，我们实现的就是上下文菜单。

## 需求和难点

首先，我想到的是前端来写，但是右键菜单的组件少之又少，毕竟你要禁用掉浏览器的右键行为本身就很奇怪，其次右键出来的菜单边界毕竟难处理，容易跑出屏幕外。  
并且，如果我们有好几种不同情况下的右键菜单呢，这原生dom写起来可是太累了。最后，样式上也很不原生，山寨味太明显。  
总结下来，抛弃原生右键行为的想法，选用electron的上下文菜单。

用electron方案还是有些难点的，例如我只点li元素才能出发菜单，这就必须要全局监听click，并对dom操作进行判断。  
如果我点击的是li下面的span呢，又如何判断是否能弹出菜单呢，这就涉及到向上查找父级。  
右键删除的话，得知道对应的id信息吧，这又涉及到把信息绑定在行间属性data中。

 ## 先写electron的menu相关API
 ```js
const { remote } = window.require('electron')

const { Menu, MenuItem } = remote

useEffect(() => {
  const menu = new Menu()
  menu.append(new MenuItem({
    label: "删除",
    click: () => {
      console.log('clicking') 
    }
  }))
  const handleContextMenu = (e) => {
    // 弹出菜单的方法，参数是需要弹出菜单的进程，我们用了主进程的方法来获取当前进程
    menu.popup({window: remote.getCurrentWindow()})
  }
  window.addEventListener('contextmenu', handleContextMenu)
  return () => {
    window.removeEventListener('contextmenu', handleContextMenu)
  }
})
```
大体来讲，我们完成了模子。细节还需要打磨。例如限定区域、获取参数、查找父级等等。

## useRef的dom操作
```js
let clickedElement = useRef(null)
useEffect(() => {
  const handleContextMenu = (e) => {
    if(document.querySelector('li').contains(e.target)) {
      clickedElement.current = e.target
      menu.popup({window: remote.getCurrentWindow()})
    }
  })
})
```
通过dom查询和操作，来限定了菜单的出现情况。其中值的获取也是通过dom操作的，我们可以在标签中使用 `data-id` 的形式来获取id。

现在就差子级元素事件上浮了，我们在父级上绑定一个class，让子级一层一层的向上找，找到了就代表能弹出菜单：
```js
const getParentNode = (node,parentClassName) => {
  let current = node
  while(current !== null) {
    if(current.classList.contains(parentClassName)) {
      return current
    }
    current = current.parentNode
  }
  return false
}
```
这个写成了一个方法，因为有可能其他地方也用的到菜单。然后我们就能在菜单事件里面调用这个函数，得到想要的最外层的li，利用`li.dataset.id`拿到id值就ok了:
```js
menu.append(new MenuItem({
  label: "删除",
  click: () => {
    const parentElement = getParentNode(clickedElement.current, 'collection-item')
    console.log(parentElement.dataset.id); // 就能拿到在元素上的data-id属性值了
  }
}))
```
>我们可以封装一下，通过循环添加menu.append。还可以把整个逻辑封装成hooks。
