# SplitChunksPlugin 配置参数详解

>刚才我们动态加载了lodash模块,并成功打包.不过现在dist文件下的lodash名字是0.js.

1. 这里可以用一个魔法注释的方式给这个文件命名.修改文件代码如下.
```JavaScript
    function getComponent(){
        return import(/*webpackChunkName:"lodash"*/'lodash').then(({ default : _ }) => {
            var element = document.createElement('div');
            element.innerHTML = _.join([2019,07,16],'/');
            return element;
        })
    }
```

2. 重新打包,测试.发现没有效果,还是0.js.原因是我们在17章里面用的babel插件`dynamic-import-webpack`并不是官方的插件,我们要替换下支持magic comment的插件.

3. 删除package.json中的`babel-plugin-dynamic-import-webpack`插件.还要更改.babelrc文件的plugins值为正确的配置.(`["@babel/plugin-syntax-dynamic-import"]`)

4. 安装 `npm install --sava-dev @babel/plugin-syntax-dynamic-import` 后再次打包,发现dist目录下多了一个vendor~lodash.js文件.

5. 如果想让名字就是lodash,需要在webpack.commom.js修改下optimization. 
```JavaScript
    optimization:{
        splitChuncks:{
            chunks:'all',
            cacheGroups:{
                vendors:false,
                default:false
            }
        }
    }
```
再次打包测试,发现名字已经成了我们期望的lodash.js.

6. 如果我们的`splitChuncks:{}`的话,splitChuncks其实是有默认属性的.
```JavaScript
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 30,
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
              filename:'vendors.js 
            },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
```
### 我们一步步的讲解下这些配置属性.
   1. `chunks:'async` 打包只对异步引入文件生效,同步的`import .. form '...'`的引入就不会进行代码分割.如果想异步同步全部生效,设置`all`即可.这里有个问题,即使我们使用了`all`但是同步的操作依然没有进行代码分割,这是因为虽然webpack知道了你要做代码分割,但是他还是会往下走代码,走到`cacheGroups`执行配置.(这里的`cacheGroups`我们默认是上面的内容).
```JavaScript 
    cacheGroups:{
        vendors:false,
        default:false
    }
```
   2. 我们需要对`cacheGroups`新配置`vendors`进行讲解.`test`会监测我们的文件是不是`node_modules`模块下的,如果是的话,webpack会把这个组件的打包放到vendors这个组里面.打包测试,发现多了个vendors~main.js文件.如果想改名,添加`filename:'vendors.js'`.
  
   3. 如果我们需要分割的代码不在`node_modules`模块下,name他跳过`vendors`进入`default`配置,
  
   4. `minSize`和`maxSize`是判断组件是否被代码分割的判断.`maxSize`一般可以不配置,删除即可.

   5. `minChunks:1` 意思是这个组件引入至少要几次才会进行代码分割.

   6. `maxAsyncRequests:5` 意思是一共允许代码分割五个,如果需要分割的代码文件超过5个就会前面的五个进行分割,后面的不做分割.

   7. `maxInitialRequests:3` 这个是首页的文件,也就是入口文件最多允许分割几个文件.

   8. `automaticNameDelimiter:~` vendor~lodas的来源.

   9. `name:true` 这个是和`cacheGroups`中的配置配合的. 

   10. `priority:-10` 这个的作用是,假如我有一个文件是符合vendors的node_modules,但是因为default没有设置test规则,引入文件也符合default,这种情况下就需要根据`priority`的值来判断group归属了.

   11. `reuseExistingChunk:true` 举个例子,假如a文件里面我引用了b文件,我们在打包a文件的时候,我们会根据规则把a组件规划到default组里面,b文件同是也会被打包到default里面.但是`reuseExistingChunk`的作用是,如果我们以前已经打包过b文件了,那么本次打包将不会再次打包b文件的内容,而是会以引入的方式进行打包.


### 懒加载其实和webpack关系不大.
写一个代码,就是点击页面加载js文件的操作.
```JavaScript
async function getCompinent(){
    const { default:_ } = await import(/*webpackChunkName:"lodash"*/ 'lodash');
    const element = document.createElement('div);
    element.innerHTML = _join([2019,07,17],'/');
    return element;
};
document.addEventListener('click',()=>{
    getCompinent().then(element => {
        document.body.appendChild(element); 
    })
})
```
这样的一个懒加载的功能就实现了,但是我们要明白的是,这样的功能的实现其实功劳并不是webpack,而是es6语法的帮助.


>**chunk的英文意思是大块**  
其实指的就是我们打包后分割好的代码文件,每个文件都是一个代码块.
