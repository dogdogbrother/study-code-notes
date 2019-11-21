# 迭代器

## 1-内部迭代器
基本上大部分语言很都内置了迭代器,其中像js的forEach等等,都是迭代器.
  
迭代器也分内部迭代器和外部迭代器,其中像forEach就是内部迭代器.
  
内部迭代器在调用的时候非常简单方便,只有在初始调用的时候设置好规则即可,但这同时也是迭代器的缺点.
  
由于迭代器的规则已经被定义好了,所以forEach函数就没办法同时迭代两个数组.

**现在有个需求,要判断2个数组的值是否完全相等.**
```js
var compare = function(ary1,ary2){
  if(ary1.length !== ary2.length){
    throw new Error('ary1和ary2不相等');
  }    
  ary1.forEach((item,index) => {
    if (item!==ary2[index]) {
      throw new Error('ary1和ary2不相等');
    }
  });
  alert('ary1和ary2相等');
}
compare([1,2,3],[1,2,3]);
```
这个函数之所以能执行还要感谢js可以把函数当做参数传递,在其他语言就没有这么幸运了..

## 2-外部迭代器
外部迭代器必须显示的请求迭代下一个元素.

外部迭代器虽然增加了一些调用的复杂度,但相对也增强了迭代器的灵活性,我们可以手动控制迭代器的过程或者顺序.

**下面代码的迭代器实例原本是Ruby写的,这里翻译成了js版本.**
```js
var Iterator = function(obj){ 
  //虽然参数名字是obj,其实这是个数组,应该是arr才对.
  var current = 0;            
  //计数变量,差不多等于内部迭代器的index.
  var next = function(){      
    current += 1;           
  };
  var isDone = function(){    
    return current >= obj.length; //判断这个迭代器是否完成了
  }
  var getCurrItem = function(){   //getters函数,得到当前内容
    return obj[current];
  }
  return {  
    next,
    isDone,
    getCurrItem,
    length:obj.length
  }
}
```
我们在上面已经定义了一个外部的迭代器,下面我们将使用这个迭代器改造下 compatre 函数,来判断两个数组是否相等.
```js
var iterator1 = Iterator([1,2,3]);
//iterator1 有一个长度属性,三个方法,一个方法利用闭包记录了自己的index值,一个方法判断自己是不是已经遍历完毕了,一个方法得到自己当前index的值.
var iterator2 = Iterator([1,2,3]);

var compatre = function(iterator1,iterator2){
  if (iterator1.length !== iterator2.length) {
    alert('不等.')
  }
  while(!iterator1.isDone()&&!iterator2.isDone()){
    //这个地方写的其实有问题,因为上面两个数组的length都确认了,这个&&符没有意义
    if (iterator1.getCurrItem()!==iterator2.getCurrItem()) {  //对比值
      throw new Error('不相等')
    }
    iterator1.next(); 
    //利用闭包,增加自身的index,也就是current闭包变量.
    iterator2.next();
  }
  alert('相等');
}

compatre(iterator1,iterator2)
```

## 3-迭代器的应用示例
有段代码是这样的，根据不同的浏览器获取相应的上传组件对象。因为代码比较繁琐，具体的用伪代码来实现
```js
var getUploadObj = function(){
    try{
        //new IE上传控制
    }catch(e){
        if(supportFlash()){
            // return
        }else{
            // return
        }
    }
}
```
这个函数的去缺点显而易见，然而最不能让人忍受的是，假如我想增加HTML5上传，那么我要在else里面嵌套if。

改造的思路是，我们把每种获取upload对象的方法都封装在各自的函数里面，然后使用一个迭代器，迭代获取这些upload对象，直到获取到一个可用的为止。
```js
var getActiveUploadObj = function(){
    try{
        return new ActiveXObject();
    }catch(e){
        return false;
    }
}

var getFlashUploadObj = function(){
    if (supportFlash()) {
        return;
    }else{
        return false
    }
}

var getFormUploadObj = function(){
    return;
}
```
`getActiveUploadObj`,`getFlashUploadObj`,`getFormUploadObj` 这三个函数都有一个共同约定，如果该函数里面的upload对象是可用的，则让函数返回该对象，反之返回false，提示迭代器继续迭代。

迭代器代码如下:
```js
var iteratorUploadObj = function(){
    for(var i=0,fn;fn=arguments[i++];){
        var uploadObj = fn();
        if (uploadObj !== false) {
            return uploadObj;
        }
    }
}

var uploadObj = iteratorUploadObj(getActiveUploadObj,getFlashUploadObj,getFormUploadObj);
```
重构代码之后，我们可以看到，获取不同上传对象的方法被隔离起来了互不干扰了，如果我们想增加HTML5上传，要做的仅仅是下面的一些工作。
```js
var getHTML5UploadObj = function(){
    // 具体代码 return;
}

var uploadObj = iteratorUploadObj(getActiveUploadObj,getFlashUploadObj,getFormUploadObj,getHTML5UploadObj);
```
**总结下，感觉这小章节讲的不是迭代器，而是策略模式。。。**
