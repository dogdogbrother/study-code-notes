# 前言

看源码是件很反人类的事情，受到 [build-your-own-react](https://pomb.us/build-your-own-react/) 的启发，又在 github 上找到相似的 [项目](https://github.com/jackiewillen/build-your-own-react) 做参考。
***
最终出炉这篇以逆推的方式剖析 react 源码。  
遗憾的是，因为没有 react-dom 内容，没有办法解析 jsx，所以demo中的元素全部是以 `React.createElement` 的形式创建的，而不是正常的 html 标签。
***
东西很少，几分钟就看完了