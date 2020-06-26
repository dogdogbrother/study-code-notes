## 安装导航器

react-native是有自己的导航器的，但是不太好用，现在官方都推荐使用 [react-navigation](https://reactnavigation.org/) 了。

```shell
npm install @react-navigation/native
```
还要安装相关的库:
* react-native-reanimated 用组件化的方式实现动画，性能较好。
* react-native-gesture-handler 手势库
* react-native-screens 实现安卓和IOS原生代码的调用
* react-native-safe-area-context 因为异形屏的原因，我们需要知道哪些区域是安全的。
* @react-native-community/masked-view 堆栈式导航器所需要的库

```shell
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```
如果是mac开发IOS的话，需要安装pod:
```shell
npx pod-install ios
```
然后在根js文件引入: `import 'react-native-gesture-handler';`