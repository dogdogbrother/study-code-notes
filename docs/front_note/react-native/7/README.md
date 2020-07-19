## 安装轮播图工具
```shell
npm i react-native-snap-carousel
npm i @types/react-native-snap-carousel -D
```

## 先拿到屏幕宽度等数据
我们需要给图片设置宽高等等，这就需要我们要知道屏幕宽度来动态设置了，我们新建个文件 `utils/index.ts`：
```ts
// utils/index.ts
import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

// 根据百分比获取宽度，就是传入一个百分比数字，返回固定宽度
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

export {viewportWidth, viewportHeight, wp, hp};
```
## 轮播图实现概述

Home目录下新建文件`Carousel.tsx`，先看下我们导入的都有什么:
```tsx
import SnapCarousel, {ParallaxImage, AdditionalParallaxProps, Pagination} from 'react-native-snap-carousel';
```
* `SnapCarousel` 是轮播图的容器标签。
* `ParallaxImage` 是轮播图里面的每一项标签。
* `AdditionalParallaxProps` 是生成`ParallaxImage`标签函数的第二个参数的类型，`Parallax`是视差的意思，作用就是手指滑动轮播图的时候，有一些视觉上的误差，美观一点。
* `Pagination` 是轮播图下面的小按钮，这个和 `SnapCarousel` 没有嵌套关系，同级写在下面就行了

## 完整代码
```tsx
import React from 'react';
import SnapCarousel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination,
} from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from '@/utils/index';
import {StyleSheet, View} from 'react-native';

const data = [
  'http://49.233.185.168/img/couver1.jpg',
  'http://49.233.185.168/img/couver2.jpg'
];

const sliderWidth = viewportWidth;
const sideWidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sideWidth + wp(2) * 2;

class Carousel extends React.Component {
  state = {
    activeSlide: 0,
  };
  onSnapToItem = (index: number) => {
    this.setState({
      activeSlide: index, // 我们需要这个轮播图当前的index值，提供给小按钮使用。
    });
  };
  renderItem = (
    {item}: {item: string},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item}}
        style={styles.image}
        containerStyle={styles.imageContainer}
        parallaxFactor={0.8}
        showSpinner
        spinnerColor="rgba(0,0,0,0.25)"
        {...parallaxProps}
      />
    );
  };
  get pagination() {
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

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: sideHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
});
export default Carousel;
```
Home组件引入即可：
```tsx
import Carousel from './Carousel';
class Home extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Carousel />
      </View>
    );
  }
}
```
效果如下：

![轮播图样式](../../../public/react-native-img/carousel.png)

> **单词小课堂**  
**dimensions**：规模，大小  
**carousel**：旋转木马，轮播图  
**parallax**：视差  
**dot**：点，小圆点  