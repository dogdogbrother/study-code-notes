# TDD下的react测试

## 什么是TDD

**Test Driven Development**

测试驱动开发,这种开发方式是先写测试用例.因为完全没有代码,测试用例自然全部爆红,前端的任务就是不停的补齐完成测试用例的代码,一点点的全部跑绿.

TDD开发有一些优势:
1. **长期减少回归bug.** 这个自然不必说,只要测试能通过,我们就没有必要关注代码内部的实现,就算忘了当时怎么写的也无所谓.
2. **代码质量好.**  因为你在编写测试用例的时候,规范/模块化/功能函数等等的细分都规划好了,自然比写一步算一步强.
3. **测试覆盖率高.**  现有测试用例,后有代码.肯定是覆盖率高啊.
4. **错误的测试代码不容易出现.**  如果是先有代码,后有测试,那么测试有可能是有问题而导致通过了,这回会让我们误以为代码是ok额.但是先写测试就没这个问题,因为开始测试就是未通过的.

## react下配置jest

当我们用 `create-react-app` 脚手架去生成react项目的时候,在 src 目录下其实是有 App.test.js 文件的,说明react脚手架已经集成了jest工具.但是因为配置文件被隐藏了,我们无法进行自定义配置.需要释放(弹射)配置:
```sh
npm run eject
```
这样我们的项目多出了几个文件,像 package.json 文件, config 和 scripts 目录.但是我们发现没有前面我们章节用到的 jest.config.js 文件.

这是因为 jest 的配置不仅仅可以写在 js 文件中,也可以写在 package.json 中.我们查看这个文件,果然,有jest命令,包含了很多的内容.我们可以尝试在根目录下新建 jest.config.js 文件,把 jest 下面的内容全部移植过去:
```js
module.exports = {
    ......
}
```
运行`npm test`.发现没问题,jest配置还是没问题的.这里大概介绍下jest的每个配置项的内容:
```json
{
    "collectCoverageForm": [ //  collect 收集
        "src/**/*.{js,jsx,ts,tsx}", //  我们在测试的过程中只测试src下的 js/jsx/ts/tsx 文件
        "!src/**/*.d.ts"    //  ! 的意思是不是测试 .d.ts 文件,这类文件一般是ts里面的类型生命文件,不是业务代码,没必要测试.
    ],
    "setupFiles": [ //  setup 设置/组织/调整
        "react-app-polyfill/jsdom"  //  当我们进行测试之前,需要进行什么样的额外准备.这里需要一个jsdom的垫片用于解决兼容问题.
    ]
}
```