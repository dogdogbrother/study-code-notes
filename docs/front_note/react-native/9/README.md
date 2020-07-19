我们先看看要实现的dome的效果:  
![猜你喜欢dome](../../../public/react-native-img/guessLike.png)

## 总结下实现步骤
1. 在 model 层去写接口获取数据。
2. 换一批按钮想要按下变透明的效果，可以使用native提供的 `TouchableOpacity` 组件并封装一下。
3. `pages/Home`下新建个 Guess 组件，用 native 提供的 FlatList 组件进行渲染卡片。