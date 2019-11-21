# Tree Shaking概念

## Tree Shaking是什么呢?
>tree是树的意思,shaking是震动的意思,摇树.通过晃动树木把需要的果子取下来.结合代码讲解下.

1. 我们在src目录下写一个math.js文件.
```JavaScript
export const add = (a,b) => {
    console.log( a + b);
}
export const minus = (a,b) => {
    console.log( a - b);
}
```

2. 然后我们在入口文件引入add方法并使用,打包.
```JavaScript
import { add } from './math.js'
add(1,2);
```

3. 打包后我们查看打包文件,发现一个问题,就是minus函数我并没有引入和使用,但是却也被打包进来了.这是不应该的,所以Tree Shaking出现了.

## Tree Shaking的使用
1. Tree Shaking只支持ES Module方式的引入,也就是import引入,这是因为import引入在底层上是静态引入的.

2. 如果我们现在的mode是development,那么是默认没有Tree Shaking配置的,需要手动webpack根对象下配置.
```JavaScript
    optimization:{
        usedExports:true
    }
```
optimization意思是最佳化,usedExports意思是使用导出.

3. 在package.json根对象中再配置下.
```JavaScript
   sideEffects:false
```
sideEffects是副作用的意思,他的值是false就是不开启.这个配置是什么意思呢.举个例子,我们在全局的main.js文件中引入了 `import "@babel/polyfill";` ,虽然我们没有使用babel里面的任何方法,但是我们是需要他存在的.所以Tree Shaking就不应该作用于他

4. 写一下,顺便处理下css文件,否则css模块会被干掉.
```JavaScript
   sideEffects:["@babel/polyfill","*.css"]
```