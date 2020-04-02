# 单例模式优化代码

如果我们在其他的文件中也需要使用`DellAnalyzer`这个类,那么我们就要再次`const analyzer = new DellAnalyzer()`来使用 `analyzer` 上的方法.

问题是,`DellAnalyzer`类下面的方法都是固定不变的,没有必要再次生成这个类的实例,让全部的方法挂载到上面.

解决方法就是我们让`new DellAnalyzer()`动作在内部去执行,返回给外部生成好的实例,如果已经存在生成好的实例就不会再次生成.

>单例模式通俗点说就是,如果你想借一个笔,我如果没有我就买一个笔给你用,如果你再想借,我就不用买了,因为上次已经买过了.笔本身就是个单例,只会买入一次,不会浪费.

## 代码
```ts
// src/dellAnalyzer
export default class DellAnalyzer implements Analyzer{
    // 声明一个 变量,类型为 DellAnalyzer
    private static instance: DellAnalyzer
    // 再声明一个变量函数,如果刚才声明的 instance 没有值我们就new一个实例赋值给他
    static getInstance() {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer()
        }
        // 不管怎么样,我们都要实例给外面
        return DellAnalyzer.instance
    }
// ...代码省略
    // 禁止外部生成实例
    private constructor() {}
}
```
```ts
// src/crowller.ts

// ...代码省略

// 以前是 const analyzer = new DellAnalyzer()
const analyzer = DellAnalyzer.getInstance()
```

## 知识点总结

1. 预习了单例和闭包的知识点.

2. 当 constructor 为 private 时,外部是没有办法new出实例的的.
