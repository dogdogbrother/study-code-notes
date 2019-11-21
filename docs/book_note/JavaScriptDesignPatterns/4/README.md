# 代理模式
>[菜鸟教程中对代理模式的简介](https://www.runoob.com/design-pattern/proxy-pattern.html) 

## 1- 保护代理和虚拟代理
代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

举个例子，小明想追求女神，但是他不知道女神什么时候有时间，所有他把送花的事情交给了女神的舍友，由舍友把花给女神。这就是一种代理模式。

代理B可以给帮助A过滤掉一些请求，比如送花的人年龄很大或是没有宝马，这种追求就可以直接在代理B处被拒绝掉，这种代理叫做 保护代理 。这样A继续能保持良好的女神形象，不希望直接拒绝任何人，于是找了黑脸B来控制对A的访问。

另外，假设现实中的花价格不菲，导致在程序世界里，new Flower也是一个代价昂贵的操作，那么我们可以把new Flower的操作交给代理B去执行，代理B会选择在A心情好时再执行new Flower,这是代理

模式的另一种形式，叫做 虚拟代理。虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建。

**js中，虚拟模式是比较常见的模式，也是本节主要探讨的内容。**

## 2- 虚拟代理实现图片预加载
我们写一个代理对象 proxyImage，通过这个代理对象，在图片被真正加载好之前，页面中都会有一个loding.gif，提醒用户图片正在被加载。
```js
var myImage = (function(){      
    var imgNode = document.createElement('img');    
    //这是一个自执行的函数，创建一个img标签并加入到body中去。
    document.body.appendChild(imgNode);
    return {                                        
      //但是赋值给src的这个动作却不是立即执行的，而是返回给了外卖，当我们myImage.setSrc('http....')的时候才会给这个src赋值
        setSrc(src){                                
          //对象的setSrc()方法进行赋值。
            imgNode.src = src;
        }
    }
})();   
var proxyImage =(function(){            
  //这个就是代理对象
    var img = new Image;                
    //new 一个img便签出来，只是new出来一个，并没有添加到页面中
    img.onload = function(){            
        myImage.setSrc(this.src);       
        //当img加载完毕后 调用 myImage.setSrc 进行真正的赋值。可是到目前为止还没有给img的src赋值过，所有这个 onload 是等会才执行的。this.src 也可以替换成 img.src
    }
    return {
        setSrc(src){                        
          // 把这 setSrc 抛给外面，当我们下面运行proxyImage.setSrc('http:...')的时候，代表我们是想要渲染一张图片的
            myImage.setSrc('./img.jpg');    
            // 就马上给 myImage 建立的img便签赋值一个 loding 图片(可以替换成图片链接)
            img.src = src;                  
            // 然后给new 出来的img的src属性赋值，然后就发现27行的onload开始执行了，重新给myImage的img赋值了。就这样，完成一个图片预加载的过程
        }
    }
})()
proxyImage.setSrc('https://dogdogbrother.github.io/win10/img/ChMkJlbKyWeINfeGAAf6LP984DMAALINgAjdk0AB_pE874.jpg');
```
现在我们通过 proxyImage 间接的访问 myImage。 proxyImage控制了客户对 myImage 的访问，并在此过程中加入一些自己的操作

### 代理的意义
如果只是在这个案例似乎代理的意义不大，因为我们完全可以把预加载的步骤写在 myImage 函数里面。

但是这样做有一个好处，那就是----单一职责原则。如果有一天我们不再需要预加载功能了，那么我们直接删除掉 proxyImage 函数即可，不需要改动 myImage 函数。

### 接口的一致性
我们发现代理对象和本地都对外提供了 setSrc 方法，在客户看来，代理对象和本体是一致的

## 3- 虚拟代理合并HTTP请求
在web开发中，也行最大的开销就是网络请求，假设我们在做一个文件同步的功能，当我们选中一个 checkbox 的时候，他对应的文件会被同步到另外一台服务器上。

现在我们给这些 checkbox 绑定点击事件，并且在点击的同时往另一台服务器同步文件。

定义一些html结构
```html
<input type="checkbox" id="1" />1
<input type="checkbox" id="2" />2
<input type="checkbox" id="3" />3
<input type="checkbox" id="4" />4
<input type="checkbox" id="5" />5
<input type="checkbox" id="6" />6
<input type="checkbox" id="7" />7
<input type="checkbox" id="8" />8
<input type="checkbox" id="9" />9
```

```js
var synchronousFile = function(id){
    console.log('开始同步文件，id为：' + id);
}
var checkbox = document.getElementsByTagName('input');
for(var i=0,c;c=checkbox[i++];){
    c.onclick = function(){
        if (this.checked === true) {
            synchronousFile(this.id);
        }
    }
}
```
这个函数功能上有一个非常大的问题，如果我手速足够快，就能1S点好几个，如此频繁的网络请求会带来相当大的性能开销。

解决的方案是，我们通过一个代理函数 proxySynchronousFile 来收集一段时间内的请求，最后一次性发送给服务器。比如我们等得2秒之后才把这两秒需要同步的文件ID打包给服务器，

如果不是对实时性要求比较高的系统，2秒的延迟不会带来太大的副作用，却能大大减轻服务器的压力。
```js
var proxySynchronousFile = (function(){
    var cache = [], //保存一段时间内需要同步的ID
        timer;      //定时器
    return function(id){            
        cache.push(id);         
        // 外部调用函数的时候，其实执行的是这个函数,不停的往这个闭包里面塞id。
        if (timer) {    
          //保证不会覆盖已经启动的定时器
            return;
        }
        timer = setTimeout(function(){
            synchronousFile(cache.join(',')); 
            // 2秒后向本体发送需要同步的ID集合。  这个还是本体函数的执行动作，参数是 'id1,id2,id3'这样的
            clearTimeout(timer); //清空定时器
            timer = null;
            cache.length = 0; 
            //清空ID集合  平时我都是 cache = [] 来清内容的，这样的操作也算学习了吧。
        },2000)
    }
})();


for(var i=0,c;c=checkbox[i++];){
    c.onclick = function(){
        if (this.checked === true) {
            proxySynchronousFile(this.id);  
            // 疯狂点击选择，其实走的是一个代理类的接口。
        }
    }
}
```