# TS中的配置文件

我们在前面的执行了 `tsc --init` 后,生成了 tsconfig.json 文件,用于编译TS文件时的规则设定.

需要注意的是,`tsc dome.ts` 时, tsconfig.json 是不生效的,因为只有执行 `tsc` 命令时 tsconfig.json 才会生效.

>`ts-node dome.ts`时, tsconfig.json 是会生效的.

## 指定或排除文件编译
tsconfig.json 中的`compilerOptions`选项都是对编译时的规则设定,但是如果我们不想对某个文件编译的话(或者对某个文件),就可以exclude(include)属性:
```json
{
    "include": ["./dome.ts"],
    "compilerOptions":{
        // ...
    }
}
```
除了exclude和include,还可以用files

## compilerOptions
>compiler是编译的意思

这是编译配置的核心主体,内容非常多,捡几个重要的说下.

1. `removeComments: true`,编译时自动去除注释

2. `strict: true`,严格模式是个复合型指令,为true时,下面的几个相关的属性即使被注释掉了也是默认为true的.
  1. noImplicitAny, implicit-隐含的.如果一个变量默认是any的话,是可以`foncun(name){...}`简写的,如果你noImplicitAny为true的话,就必须`name: any`.
  2. strictNullChecks,是否强制检查null类型.如果为false的话,是可以`const name: string = null`这样写的.

3. `rootDir: "./src"`, 对src目录下的ts文件进行编译.

4. `outDir: "./build"`, 编译过后的文件放到build目录下.

5. `incremental: true`, incremental-增加的.只对增加的ts文件进行编译.  
再次执行tsc后,根目录下出现 tsconfig.tsbuildinfo,里面记录着文件的信息版本号之类的.

6. `allowJS: true`, allow-允许.是否编译js文件.

7. `checkJS: true`, 像对TS一样,检测js语法.

8. `noUnusedLocals: true`, unused-未使用.对定义了变量但是未使用警告.

9. `noUnusedParameters: true`, 对定义了函数参数但是未使用警告.