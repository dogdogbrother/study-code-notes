# Flutter 的基础 —— Widget 

## Widget概述

在 flutter 的布局架构里面是有层级的.

* 最顶端的是 **Material** 安卓风格的UI组件, **Cupertino** IOS风格的UI组件(即开即用).
* 第二层是 Widget ,对比前端来讲其实就是个div组件,价格padding啊边框啊之类的,布局用的.
* 第三层是 **Rendering** 渲染层, 第四层 **Animation、Painting、Gestures** 动画、绘制、手势层.第五层是 **Foundation** 基础库层.(因为比较复杂所以不常用,大部分都用封装好的组件就行了)

## 根Widget和key

根Widget只有在一个地方出现在flutter的入口文件中的:
```dart
void main() => runApp(MyApp());
```
`MyApp()` 就是一个 Widget,Flutter会默认把 根Widget 充满屏幕。

在 Flutter 中，根Widget 只能是以下三个:WidgetsApp/MaterialApp/CupertinoApp

Widget的 **key** 和react/vue的 key 作用是一样的,是为了 diff 算法时的渲染优化,不同的是 Widget 的 key 不是必需的,你可以不写.

## Widget的分类

因为渲染是很耗性能的，为了提高 Flutter 的帧率，就要尽量减少不必要的 UI 渲染，所以 Flutter 根据 UI 是否有变化，将 Widget 分为:

* StatefulWidget: UI 可以变化的 Widget，创建完后 UI 还可以在更改。
* StatelessWidget: UI 不可以变化的 Widget，创建完后 UI 就不可以在更改。

## StatefulWidget
