# 发布-订阅模式
小明看上了一套房子，可惜一期已经售罄了，二期才能购买，具体二期什么时候好还不一定。

于是小明记下了售楼处的电话，每天打一遍询问一下，这个是比较不科学的事情，因为要买房的不一定只有小明，有可能有几百个人，每天售楼处要累死了。

正常的做法是售楼处记下所有想买房子人的电话，当二期可以购买的时候，找着电话簿全部发条短信就行了。

很明显，小明是订阅者，售楼处是发布者。

## 1-DOM事件
事实上，DOM事件本身就是发布订阅模式
```js
document.body.addEventListener('click',function(){
  alert(2)
},false);

document.body.click();
```
我们需要监听用户点击document.body的动作，但是我们没有办法预知用户什么时候点击，所有我们订阅了document.body上的click事件。

当body被点击的时候，body节点便会向订阅者发布这个消息。
 
当然我们还可以随意增加删除订阅者，都不会影响发布者代码的编写。
```js
document.body.addEventListener('click',function(){
  alert(3)
},false);

document.body.click();
```
有几个订阅就会弹几次alert.

## 2-自定义发布订阅事件-简单版本
**除了DOM事件，我们还会经常自定义发布订阅模式，看看如果分步实现发布订阅模式。**
1. 首先指定好谁充当发布者(比如售楼处)

2. 然后给发布者添加一个缓存列表，用于存放回调函数，以便通知订阅者。(售楼处的通讯录)

3. 最后发布消息的时候，发布者会依次触发缓存列表中的回调函数。(遍历通讯录，挨个发短信)

4. 另外，我们还可以给回调函数里面填入一些参数，订阅者可以接受这些参数。例如售楼处的短信里面加上房子的单机，面积等等。
```js
var salesOffices = {};  //定义售楼处

salesOffices.clientList = []; //缓存列表，用于存放订阅者的回调函数

salesOffices.listen = function(fn){ //增加订阅者
  this.clientList.push(fn); //订阅者的消息push到缓存列表
}

salesOffices.trigger = function(){  //发布小消息
  for(var i=0, fn; fn = this.clientList[i++];){
    fn.apply(this,arguments);   //arguments是发布消息时带上的参数
  }
}
```
下面我们进行一些简单的测试
```js
salesOffices.listen(function(price,squareMeter){  //小明订阅消息
  console.log('价格=' + price);
  console.log('squareMeter=' + squareMeter);
});

salesOffices.listen(function(price,squareMeter){  //小红订阅消息
  console.log('价格=' + price);
  console.log('squareMeter=' + squareMeter);
});

salesOffices.trigger(2000000,88);
salesOffices.trigger(3000000,110);
```
到这，一个最简单的发布-订阅模式就完成了，但是他有问题，我们假设小明只想要88平米的房子，但是售楼处全部的订阅信息都发给他了，太多了也会有烦恼。

所以我们有必要增加一个标示key，让订阅者只订阅自己感兴趣的消息.

## 3-自定义发布订阅事件-改良版本
刚才简易版本中，一个最简单的发布-订阅模式就完成了，但是他有问题，我们假设小明只想要88平米的房子，但是售楼处全部的订阅信息都发给他了，太多了也会有烦恼。

所以我们有必要增加一个标示key，让订阅者只订阅自己感兴趣的消息
```js
var salesOffices = {};  //定义售楼处

salesOffices.clientList = {}; 
//缓存列表，用于存放订阅者的回调函数

salesOffices.listen = function(key,fn){ 
  if (!this.clientList[key]) {  
    //如果该用户没有订阅过此key类消息，就给该类创建一个缓存列表。 
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn); 
  //订阅者的消息push到缓存列表
}

salesOffices.trigger = function(){  //发布小消息
  var key = Array.prototype.shift.call(arguments);  //取出消息类型
      fns = this.clientList[key];    
       //取出该消息对应的回调函数集合
  if (!fns || fns.length === 0) {   
    //如果没有订阅该消息，则返回
    return false;
  }

  for(var i = 0, fn; fn = fns[i++];){
    fn.apply(this,arguments);   
    //arguments是发布消息时带上的参数
  }
}
```
下面我们进行一些简单的测试
```js
salesOffices.listen('squareMeter88',function(price){  
  //小明订阅88平米房子的消息
  console.log('价格=' + price);
});

salesOffices.listen('squareMeter100',function(price){  
  //小红订阅100平米的消息
  console.log('价格=' + price);
});

salesOffices.trigger('squareMeter88',800000);
salesOffices.trigger('squareMeter100',1000000);
```
这个改良后的函数就指挥接受自己设置key值的内容了。原理很简单。

把 clientList 变成一个对象，然后发布的时候把传入的 key 变成自己的属性，该属性的值是数组

数组中放的是80000，如果再发布相同属性的key就会push进去10000

订阅信息是在 listen 函数里面
  
总体而言和最初版本差别不大.

## 4-发布订阅的通用实现
提个需求，假如小明去了另一个房产看了房子，那么刚才的那些发布订阅的代码要重新再写一次吗？

能不能让所有的对象都拥有发布-订阅功能呢

js作为一门解释型语言，给对象动态添加职责是理所应当的事情。

我们把发布-订阅的功能提取出来，放到一个单独的对象内。
```js
var event = {
  clientList:{},
  listen(key,fn){
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn)
  },
  trigger(){
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for(var i=0, fn; fn = fns[i++];){
      fn.apply(this,arguments);
    }
  }
}
```
再定义一个installEvent函数，这个函数可以给所有的对象动态安装发布-订阅功能。
```js
var installEvent = function(obj){
  for(var i in event){
    obj[i] = event[i];
  }
};
```
再来测试一番，我们给售楼处对象 salesOffices 动态添加发布-订阅功能。
```js
var salesOffices = {};  //定义售楼处

installEvent(salesOffices);

salesOffices.listen('squareMeter88',function(price){  
  //小明订阅88平米房子的消息
  console.log('价格=' + price);
});

salesOffices.listen('squareMeter100',function(price){  
  //小红订阅100平米的消息
  console.log('价格=' + price);
});

salesOffices.trigger('squareMeter88',800000);
salesOffices.trigger('squareMeter100',1000000);
```
函数完成，也挺完美。但是怎么做的呢。我们一步步分析下。

我们定义了有个 event 对象，对象里面有`clientList`(类似于数组，不过是key值的唯一性的问题变成了对象)。

`listen`方法，就是订阅时执行的函数，接受一个key值和一个方法，key值作为唯一键，方法作为回调函数保存在key的value中。  

可以理解为，当我们订阅时，订阅时的第二个函数参数就会存在第一个key值参数中。

trigger方法就是发布，他首先会根据你发布时的第一个参数找到相应的key值找到对应的函数，然后把发布时的第二个参数当做订阅时的第一个参数。


解释到这其实没有说 `installEvent` 函数，这个函数的最作用就是把我们定义好的订阅-发布对象的功能继承过去了。

事实上我测试了下，用`Object.assign`也是一样能做到的。

## 5-真实案例，网站登录
假如我们现在正在开发一个网站商城，网站里面有header头部，nav导航，消息列表，购物车等等模块。

这几个模块的渲染都有一个共同特性，就是依赖ajax请求到的用户信息内容。

ajax什么时候能请求成功我们并不确认，不过我们可以使用异步回调的方式对他们的进行统一的整合。
```js
login.succ(data=>{
  header.setAvatar(data.avatar); //设置header模块的头像
  nav.setAvatar(data.avatar);    //设置导航栏模块的头像
  message.refresh();             //刷新消息列表
  cart.refresh();                //刷新购物车列表
})
```
假如登录模块是我写的，而其他模块是不同人写的，那么我在写登录的时候还要知道header，message等等模块下面的方法叫什么，这些耦合性会使程序变的僵硬。

等哪天项目中添加了一个收获地址管理模块，又不得不找到你，让你在你的程序中再次添加 address.refresh();
**----------------**
需求到这，我们就发现了发布-订阅能更好的使这个程序更健壮一些。

我们登陆模块只管去发布登陆信息即可，业务方收到相关的数据后他们进行业务处理就行了。

代码如下:
```js
$.ajax('http://xxx.com?login',(data)=>{ //登陆成功
  login.trigger('loginSucc',data);      //发布登陆成功的消息
})
```
然后我们设置其他模块的订阅即可，其实在业务上这样是反的，我们应该先写订阅，再写发布。
```js
var header = (function(){
  login.listen('loginSucc',function(data){  //注册了订阅。
    header.setAvatar(data.avatar)
  })
  return {
    setAvatar(data){
      console.log('我设置了header模块的头像');
    }
  }
})();
```
这个函数其实写的挺精妙的，函数是个自执行的函数，但是回调函数是不会运行的，当回调函数运行的时候，因为return了函数的原因，还能调用自身函数，秒啊。

如果有一天我们还要增加地址列表模块，那么我们直接注册订阅就行了。
```js
var address = (function(){
  login.listen('loginSucc',function(obj){  //注册了订阅。
    address.refresh(obj);
  })
  return {
    refresh(avatar){
      console.log('刷新收获地址列表');
    }
  }
})();
```
OK。 大功告成。
