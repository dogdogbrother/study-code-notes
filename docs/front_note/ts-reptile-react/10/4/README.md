# reflect-metadata

>reflect是映射的意思，metadata是元数据的。

这是TS官方推荐的库，作用就是给类绑定一些隐藏的数据，用于反向获取。

这么说有点很难理解，但是大概意思就是类是处理业务的地方，但是我们也需要让类有一点存储数据的能力，来让外部知道这个类的更多信息。

## 安装和使用

```ssh
npm install reflect-metadata --save
```
在引用上有点另类：
```ts
import 'reflect-metadata'
```

## 基础案例

```ts
const user = {
  name: 'dell'
}
Reflect.defineMetadata('data', 'test', user)
console.log(user);
console.log(Reflect.getMetadata('data', user));
```
存数据的时候，第一个参数是key值，第二个是value值，第三个是你需要绑定在哪个对象上。

但是正常来讲，reflect-metadata 都是用在类上面的。
```ts
@Reflect.metadata('data', 'test')
class User {
  name = 'wang'
}
console.log(Reflect.getMetadata('data', User));
```
除了挂载到类上，还能挂载到类的属性或是方法上：
```ts
class User {
  @Reflect.metadata('data', 'test')
  name = 'wang'
}
console.log(Reflect.getMetadata('data', User.prototype, 'name'))
```

## 其他的API

1. hasMetadata. 检测元素上是否有此元数据：
```ts
Reflect.hasMetadata('data', User.prototype, 'name')
```
值为 true

2. hasOwnMetadata. own是拥有的意思。原数据是可以被 extends 继承的，如果是继承过来的元数据 `hasMetadata` 判断为true， `hasOwnMetadata` 判断就是false。

3. getMetadataKeys. 获取元素的全部的元数据的key。

4. getOwnMetadataKeys. 同2，不查找继承过来的元数据。

5. deleteMetadata. 删除元数据。