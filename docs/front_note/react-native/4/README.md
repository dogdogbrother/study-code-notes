## 什么是 dva
[DvaJS官网](https://dvajs.com/)  
dva 是由阿里架构师 sorrycc 带领 team 完成的一套前端框架，在作者的 github 里是这么描述它的：“dva 是 react 和 redux 的最佳实践”.  
> dva = React-Router + Redux + Redux-saga

## 安装
dva对TS的支持不是很好，没有官方的TS文件，所以课程的讲师自己把源码down下来，自己加上了类型，上传到了npm。
```shell
npm i dva-core-ts react-redux
```
还需要个TS声明文件：
```shell
npm i @types/react-redux
```

## 先引用定义一下
> 我们写一个功能是页面有一个数字，当我们点击一下，数字就 +10。

使用dva和koa很像，是偏向后端的写法。
* 新建个文件 `config/dva.ts`,作为集成入口文件。
* 新建文件夹 `models` ，里面的 `index.ts` 作为集合导出文件，`home.ts` 作为具体的模型文件。
* 我们还要修改下以前的文件结构，**src** 下新建个 **index** 入口，因为我们入口文件需要集成导航器，还要集成dva。
```tsx
// models/home.ts
import {Model} from 'dva-core-ts';
import {Reducer} from 'redux';
interface HomeState {
  num: number;
}
interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    add: Reducer<HomeState>;
  };
}
const initialState = {
  num: 0,
};
const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    add(state = initialState, {payload}) {
      return {
        ...state,
        num: state.num + payload.num,
      };
    },
  },
};

export default homeModel;
```
> 这里其实缺少个 effects 关于异步函数的选项，后面会补上的。  

因为会有很多**models**，所以要有**index**文件统一管理下:
```tsx
// models/index.ts
import home from './home';
const models = [home];
export type RootState = {
  hemo: typeof home.state;
};
export default models;
```
```tsx
// config/dva.ts
import {create} from 'dva-core-ts';
import models from '@/models/index';
const app = create();
models.forEach((model) => {
  app.model(model);
});
app.start();
export default app._store;
```
新建 `src/index.tsx`, 记得修改下 App.tsx 的引入。
```tsx
// src/index.tsx
import React from 'react';
import Navigator from './navigator';
import {Provider} from 'react-redux';
import store from '@/config/dva';
export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
```
## 开始使用
我们准备工作做好了，接着要在 **Home** 组件中去使用他.
* 从 `react-redux` 中导入 `connect` 函数，`connect` 函数接受一个 mapStateToProps 函数，mapStateToProps 函数返回一个对象，这个对象的作用是让我们把 store 中的数据绑定在组件中。现在`connect`的定义和我们的组件还没关联，最后把`connect` 函数生成出的新的函数，包裹住我们的组件导出去。
* 值得一提的是，我们用 **mapStateToProps** 函数绑定 **props** 时的TS约束是由models里面定义的。
```tsx
// pages/Home.tsx
// ...
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
const mapStateToProps = ({home}: RootState) => ({
  num: home.num,
});

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
  // ...
}
export default connector(Home);
```
* 这样，我们就能通过 `props` 拿到我们在 **model** 层定义的 `num` 属性.还能通过 `props` 拿到 `dispatch` 方法,进行数据的更新。
```tsx
// pages/Home.tsx
class Home extends React.Component<IProps> {
  // ...
  handleAdd = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/add',
      payload: {
        num: 10,
      },
    });
  };
  render() {
    const {num} = this.props;
    return (
      <View>
        <Text>home{num}</Text>
        <Button title="加" onPress={this.handleAdd} />
      </View>
    );
  }
}
```
> `dispatch`之所以能找到对应的**reducers**函数，是因为`type: 'home/add'`，也就是**model**层的 `namespace` 和 `reducers`.

最后我们测试下点击按钮，页面数值跟着变动。

## 异步函数
> 补上前面没有写的 effects。
```tsx
// models/home.ts
import {Model, Effect} from 'dva-core-ts';
interface HomeModel extends Model {
  // ...
  effects: {
    asyncAdd: Effect;
  };
}
function delay(timout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timout);
  });
}
const homeModel: HomeModel = {
  // ...
  effects: {
    *asyncAdd({payload}, {call, put}) {
      yield call(delay, 3000);
      yield put({
        type: 'add',
        payload,
      });
    },
  },
}
```
需要注意的有2点：
1. effects 下的参数都是生成器函数。
2. put 中的 type 并没有像 Home.tsx 的值为 `'home/add'`,是因为默认为同个模块下。

加一个按钮测试异步添加逻辑：
```tsx
asyncAdd = () => {
  const {dispatch} = this.props;
  dispatch({
    type: 'home/asyncAdd',
    payload: {
      num: 5,
    },
  });
};
<Button title="异步加" onPress={this.asyncAdd} />
```
## 插件 dva-loading
我们实现个功能，就是当异步函数加载时，有个文字提示：
```tsx
<Text>{loading && '正在努力计算'}</Text>
```
***
`dva-loading` 对 TS 的支持也不是很好，讲师也是自己 fork 下来加了类型：
```shell
npm i dva-loading-ts
```
首要要 `use` 一下(切记是要在`app.start()`上面)：
```tsx
// config/dva.ts
import createLoading from 'dva-loading-ts';
app.use(createLoading());
```
增加类型：
```tsx
// models/index.ts
import {DvaLoadingState} from 'dva-loading-ts';
export type RootState = {
  // ...
  loading: DvaLoadingState;
};
```
重要的来了，**Home** 组件中使用,先绑定到 props 中，让组件能拿到 `loding`,注意`loading.effects`的值是数组，这也就是说明了，其实可以多个异步函数，公用一个`loading`值。
```tsx
const mapStateToProps = ({home, loading}: RootState) => ({
  num: home.num,
  loading: loading.effects['home/asyncAdd'],
});
class Home extends React.Component<IProps> {
  render() {
    const {num, loading} = this.props;
  }
}
```