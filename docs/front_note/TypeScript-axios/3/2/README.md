# 初始化项目

## 创建代码仓库
肯定是有脚手架的啊,没有脚手架这配置项就得把人整懵逼了.

**TypeScript library starter**

### 使用方式
先拉脚手架在git上的代码:
```sh
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios
npm install
```
>这个改名的小技巧我以前还不知道...

### 目录文件介绍
`TypeScript library starter` 生成的目录结构如下：
```
├── CONTRIBUTING.md
├── LICENSE 
├── README.md
├── code-of-conduct.md
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.ts // rollup 配置文件
├── src // 源码目录
├── test // 测试目录
├── tools // 发布到 GitHup pages 以及 发布到 npm 的一些配置脚本工具
├── tsconfig.json // TypeScript 编译配置文件
└── tslint.json // TypeScript lint 文件
```

### 优秀工具集成
使用 `TypeScript library starter` 创建的项目集成了很多优秀的开源工具：

