## 安装

可以照着官网来安装，相比较flutter虽然好一些的,但是也还是有很多坑，例如我在安装环境的时候怎么都跑不成功，翻阅了茫茫多的问答，最后在 [这里](https://stackoverflow.com/questions/35000729/android-studio-could-not-initialize-class-org-codehaus-groovy-runtime-invokerhel) 发现了答案，非常难受了。

`shell
npx react-native init my-app --template react-native-template-typescript
`
>注意是TS项目。

## 多环境

我们有可能是会在本地环境，也有可能是在线上测试环境，也有可能是在正式环境，有可能每个环境的配置都不太一样。

并且像是 `proscess.env.NODE_ENV === 'development` 的前端方在安卓或是IOS环境下也不能用,这里我们可以去 [js.coach](https://js.coach/) 去找到`react-native-config` 插件。

```shell
npm i react-native-config --save
```
然后我们在根目录下创建个 `.env` 文件,内容如下：
```env
API_URL=https://myapi.com
```
如果是ios环境，需要我们手动去连接环境，`cd ios; pod install`

还需要对安卓进行下配置，进入根目录下的 android/app/build.gradle 文件，在末尾处添加 `apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"`。

## 绝对路径

项目中的层级如果多一些的话，引入就很难受，这里我们利用个插件做到用绝对路径引入(没错，就是`@`)。

```shell
npm i babel-plugin-module-resolver --save
```
然后修改 babel.config.js 文件，添加plugin：
```js
module.exports = {
  // ...
  plugins: [
    [
      'modele-resolver',
      {
        root: ['./src'],
        alias: {
          '@/utiles': './src/utiles',
          '@/pages': './src/pages',
          '@/component': './src/component',
        },
      },
    ],
  ],
};
```

如果是js项目，到这就没问题了，但是ts还不行，因为ts找不到对应的路径了，我们还要修改根目录下的 `tsconfig.json` :
```json
{
  "baseUrl": "./src",  
  "paths": {
    "@/utiles/*": ["utiles/*"],
    "@/pages/*": ["pages/*"],
    "@/component/*": ["component/*"]
  }                         
}
``` 

