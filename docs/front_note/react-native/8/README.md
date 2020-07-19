## 配置下 axios
```shell
npm i axios
```
新建文件 `config/http.ts` ,先简单配置一下，后面会用的到
```ts
import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL;

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
```
`Config`就是我们在根目录下的`.env`环境变量，内容很少: `API_URL=http://39.105.213.120`。

## 修改dva
我们要修改 `models/home.ts` 文件，我们的 axios 动作都是在 dva 里面去执行的。  
之前的关于 add 和异步操作的示例代码就没用了，我们修改一下即可。  
需要注意的是，`ICarousel`的内容是后端的返回格式，并且要导出去，因为使用数据的地方是需要这个接口的。
```ts
// models/home.ts
import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const CAROUSEL_URL = '/mock/11/bear/carousel';

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string]; // 这个参数暂时用不到，后面会有渐变色的功能
}

interface HomeState {
  carousels: ICarousel[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
  };
}
const initialState = {
  carousels: [],
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      yield put({
        type: 'setState',
        payload: {
          carousels: data.data,
        },
      });
    },
  },
};
export default homeModel;
```

## 使用dva所映射的数据
首先使用到的是 `Home.index.tsx`,改动很少，只是改变了dispatch指向和新数据.
```tsx
class Home extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
  }
  render() {
    const {carousels} = this.props;
    return (
      <View>
        <Carousel data={carousels} />
      </View>
    );
  }
}
```
然后就是我们的 `Carousel.tsx` 轮播图组件了，改动不太大：
```tsx
import {viewportWidth, wp, hp} from '@/utils/index';
import {ICarousel} from '@/models/home';

const sliderWidth = viewportWidth;
const sideWidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sideWidth + wp(2) * 2;

interface IProps {
  data: ICarousel[];
}

class Carousel extends React.Component<IProps> {
  state = {
    activeSlide: 0,
  };
  onSnapToItem = (index: number) => {
    this.setState({
      activeSlide: index,
    });
  };
  renderItem = (
    {item}: {item: ICarousel},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item.image}}
        style={styles.image}
        containerStyle={styles.imageContainer}
        parallaxFactor={0.8}
        spinnerColor="rgba(0,0,0,0.25)"
        {...parallaxProps}
      />
    );
  };
  get pagination() {
    const {data} = this.props;
    const {activeSlide} = this.state;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotsLength={data.length}
          dotStyle={styles.dot}
          activeDotIndex={activeSlide}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  }
  render() {
    const {data} = this.props;
    return (
      <View>
        <SnapCarousel
          data={data}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={this.onSnapToItem}
          hasParallaxImages
          loop
          autoplay
        />
        {this.pagination}
      </View>
    );
  }
}
const styles = StyleSheet.create({});

export default Carousel;
```
