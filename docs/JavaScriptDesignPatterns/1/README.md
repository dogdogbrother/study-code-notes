# 高级函数
> 本书中所谓的高级函数,其实不过都是对闭包的运用.

## currying函数

函数柯里化,又称部分求值。一个curring的函数会接受一些参数，但是并不会立即计算求值，而是继续返回另一个函数，刚才传入的参数在函数形成的闭包中被保存起来。 

待函数被真正需要求值的时候，之前传入的值会被一次性的用于求值。

```js
var cost = (function(){
  var args = []; //         1.这个就是闭包变量
  return function(){ //闭包函数
    if (arguments.length === 0) { 
      // 3. 如果arguments.length为0，就是说不需要存参数了，而是要求值，于是乎遍历闭包变量，相加后返回给外部。
      var money = 0;
      for(var i=0; i<args.length; i++){
        money += args[i];
      }
      return money;
    }else{  
      //2. 如果有参数，就说明了不需要计算结果，而且储存参数到闭包的变量值里面来。
      [].push.apply(args,arguments);
      //这个其实就是等同于 args.push(...arguments);因为es6之前没有扩展运算符，所以作者利用了apply携带参数有扩展运算的特性。
    }
  }
})();
cost(100,120);
cost(200);
cost(300);
console.log(cost());//输出720
```
**代码分析:** 其实就是通过然后函数的形式用闭包保存一个数组变量,如果调用函数有参数就给这个闭包加数据,没有参数就闭包变量里面的数值,计算相加后的结果并返回.

## 函数节流

就是要求函数500毫秒只能执行一次的操作.  

这个其实比较常见,例如我们要监听滚动事件并执行函数,滚动事件触发的过于频繁让我们浏览器压力过大,我们就可以利用节流函数让事件在500毫秒内只执行一次.

```js
var throttle = function(fn,interval){
  var _selt = fn,           
  //_selt是传参进来的函数，也就是真正要被执行的函数
      timer,                
      //其实就是清除定时器时用的变量
      firstTime = true;     
      //记录下是否是第一次调用
  return function(){        
    //onresize本身就是个函数事件，这里形成了一个闭包
    var args = arguments;   
    //args存储了传进来的参数，正常来讲，传进来的参数应该是与2个，第一个是函数，第二个是数值。
        _me = this;         
        //保存了当前this。  
    if (firstTime) {          
      //firstTime 假如是第一次调用，就不需要延迟执行。因为有闭包的关系，所以能记录这个状态
      _selt.apply(_me,args);      
      //执行传进来的函数 其实这个地方可以直接_selt(args),为啥要修正this指向呢？没看明白，也许没啥深意作者习惯了这么写吧。
      return firstTime = false;   
      // return firstTime = false;这个操作不是真的为了返回什么，只是单纯的把2行代码写在了一行。
    }
    if (timer) {        // 假如定时器还在，停止运行这个程序即可。
      return false;
    }
    timer = setTimeout(function(){  //立一个定时器。
      clearTimeout(timer);          
      //如果能走到这里就代表timer可以清除了，用定时器的时候，即用即清定时器是个好习惯。
      timer = null;                 //和上面同一个操作。
      _selt.apply(_me,args)         //执行传进来的函数
    },interval || 500);             
    //如果没有第二个参数，默认500毫毛延迟执行。
  }
}
window.onresize = throttle(function(){
  console.log(999999);
},1000)
```
**代码分析:** 其实就是利用闭包的特性，记录了 定时器/参数/是否第一个调用 的三个状态。  
如果定时器没走完就停止，走完了接着走。配合第一次的状态，效果就是，正常点击没问题，要是连续点击就不行，至少1000毫秒过后才能让你点击。

## 分时函数
和函数节流不同，有些函数是用户主动调用的，但是因为一些客观原因，这些函数会影响性能。

举个例子说创建qq好友列表，通常一口气操作添加1000个dom元素也有点吃不住

解决方案之一是下面的timeChunk函数，此函数让创建节点的工作分批进行，比如1秒创建1000个节点，改成每隔200毫秒创建8个节点。

timeChunk函数接受三个参数，第一个是创建节点需要用到的参数，第二个参数是封装创建节点逻辑的函数，第三个参数辨识每一批创建节点的数量

```js
var timeChunk = function( arr, fn, count){

  var obj,
      t;

  var len = arr.length;               //记录传入数组参数的总长度

  var start = function(){             //记录一个函数
    for(var i=0; i<Math.min(count || 1 , arr.length); i++){  
      //这个判断条件挺巧妙的，把count参数的数值和数组长度进行比较，小的为准。就是为了规避传参传的不好
      var obj = arr.shift();    
      //把参数数组第一位删除并返回给obj，其实这个obj是没用的，这行代码就是为了减少arr，而且这个和上面的判断也有关联，如果arr少于了参数，就以arr为准
      fn(obj); //执行参数函数的操作，也就是添加节点               
    }
  }

  return function(){          
    t = setInterval(function(){   //开启一个定时器
      if (arr.length === 0) {     
        //因为上面arr闭包变量在不停的被减少，所以当被减没的时候，清除定时器，并且终止函数的执行。而且这个判断条件===0就意味着arr长度至少是1，和count || 1 就对应上了，妙啊!!!
        return clearInterval(t);  
      }
      start(); //如果arr数组还有，那就执行上面的start函数，里面会执行参数函数的。直到arr被减成0
    },800)
  }
}
```
**代码分析:** 这个也是个闭包应用,但是这个闭包稍稍麻烦一点,因为他包含的闭包是个函数变量.这个函数变量里面又闭包了其他的变量,具体的逻辑注释已经写的很明白了,不赘述了.

> 分时`timeChunk`函数写好了，我们用一下，创建1000个dom元素，每次创建8个节点。

```js
var ary = [];
for(var i=1; i<=100; i++){
  ary.push(i);
}

var renderFriendList = timeChunk(ary, function(){
  var div = document.createElement('div');
  div.innerHTML = 'nnnnnnnnnnnnnnnnnnnnn';
  document.body.appendChild(div);
},8)

renderFriendList();
```

## 惰性加载函数

> 需要用2个函数结合实际业务来说明惰性加载函数

前端开发中，处理一些兼容的问题是非常常见的，举例写一个在不同浏览器内兼容的事件绑定函数，常见的写法如下。

```js
var addEvent = function(elem,type,handler){
  if (window.addEventListener) {
    return elem.addEventListener(type,handler,false);
  }
  if (window.attachEvent) {
    return elem.attachEvent('on' + type, handler);
  }
}
```

这个函数有缺点，就是每次调用的时候都会执行if条件分支，虽然开销不大，但是毕竟可以避免。改进的方案是我们是判断兼容的条件提前到代码加载的时候，在记载的时候进行判断，返回一个正确的逻辑的函数。

```js
var addEvent = (function(){
  if (window.addEventListener) {
    return function(elem, type, handler){
      elem.addEventListener(type, handler, false);
    }
  }
  if (window.attachEvent) {
    return function(elem, type, handler){
      elem.attachEvent('on' + type, handler);
    }
  }
})();
```

这个函数会先执行一次,返回一个符合当前环境的闭包函数,然后我们后续使用`addEvent(...)`即可.

但是也有一个小缺点,就是如果我们从头到尾都没有使用过这个事件函数，这个函数写的不就是浪费了吗？(还浪费了一次执行)

**所以终极的解决方案就是本案例的重点，惰性载入函数方案.**

开始时，`addEvent`依然为一个普通的带有分支判断的函数，但是在第一次进入添条件分支后，在函数内部会重写这个函数。这样在下次进入的时候，就不存在条件分支。

这里为了方便观看者在本地演示，我写个div作为按钮的HTML结构.

```html
<div id="div1">点击我绑定事件</div>
```
```js
var addEvent = function(elem,type,handler){
  if (window.addEventListener) {
    addEvent = function(elem,type,handler){     
      //这行代码是惰性函数的精髓之一，就是自己函数内部重新给自己赋值，导致了第二次进入的时候，函数内部就变了。变成了修改后的内容。
      elem.addEventListener(type, handler, false);
    }
  }else if(window.attachEvent){
    addEvent = function(elem,type,handler){
      elem.attachEvent('on' + type, handler);
    }
  }
  addEvent(elem,type,handler);    
  //精髓之二，上面虽然修改了自己，但是因为函数没有执行完，并没有销毁，所以还是会执行自己。
  //但是，注意的是，此时的addEvent的指向已经改变的，执行的其实是修改后的内容。
}

var div = document.getElementById('div1');

addEvent(div, 'click', function(){
  alert(1);
});

addEvent(div, 'click', function(){
  alert(2);
});
```
**代码分析:** 这个功能和上面几个不同,没有闭包的应用,他功能核心的实现就是第一次进入这个代码的时候有判断分支,但是在分支内部重新给自己赋值一个新函数,再次进入此函数的时候其实就是新函数了!









