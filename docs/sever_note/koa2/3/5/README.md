## 安装egg插件三部曲
```
npm i egg-jwt
```

```js
exports.jwt = {
  enable: true,
  package: "egg-jwt"
}
```

```js
config.jwt = {
  secret: "senlin"
}
```