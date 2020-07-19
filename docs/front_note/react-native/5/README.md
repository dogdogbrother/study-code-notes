# 字体图标
[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)是比较热门的 icon 解决方案，目前star有 13K+。  
但是这个库有个不好的地方，就是如果你只用了其中一个图标，也是要全部加载进来，而且我们平时设计师提供的 Icon 是不好集成进来的。
***
这里使用的方案是[react-native-iconfont-cli](https://github.com/iconfont-cli/react-native-iconfont-cli),配合阿里图标库，会更灵活一些。

## 安装
```shell
npm i react-native-svg
npm i react-native-iconfont-cli -D
```
因为 `react-native-svg` 插件涉及到了原生代码，需要 `cd ios && pod install`.  
然后运行`npx iconfont-init`,生成一个`iconfont.json`的配置文件:
* 里面配置了[iconfont](https://www.iconfont.cn/)项目的连接
* 是否使用TS
* icon文件保存目录路径,我们设置为 `./src/assets/iconfont`
* icon图标前缀
* 默认的字体大小
然后我们运行 `npx iconfont-rn` 生成全部的icon文件。

## 使用
我们给 Home 的tab栏加上icon图标：
```tsx
// navigator/BottomTabs.tsx
import Icon from '@/assets/iconfont/index';
// ...
<Tab.Screen
  name="Home"
  component={Home}
  options={{
    tabBarLabel: '首页',
    tabBarIcon: ({color, size}) => (
      <Icon name="iconhome-fill" size={size} color={color} />
    ),
  }}
/>
```

