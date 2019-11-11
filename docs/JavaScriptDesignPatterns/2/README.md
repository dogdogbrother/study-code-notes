# 单例模式

>我觉得[菜鸟教程中对单例模式的简介](https://www.runoob.com/design-pattern/singleton-pattern.html)蛮好的,可以看看

## 1-单例模式的定义与实现

> **单例模式的定义是**  
保证一个类仅有一个实例，并提供一个访问它的全局访问点。

举个例子，当我们点击登录按钮的时候，页面会有一个登录浮窗，而这个浮窗是唯一的，无论点击多少次登录按钮，这个浮窗指挥被创建一次，那么这个登录浮窗就适合用单例模式来创建。

实现一个标准的单例模式并不复杂，无非就是用一个变量记录当前是否为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。

```js
var Singleton = function(name){ 
  //从this.name = name 就猜得出来，这是个构造函数，等到被new
  this.name = name;
}

Singleton.instance = null;      //就是上面所说的，记录变量用的

Singleton.prototype.getName = function(){ 
  //方法，弹出自己的name值
  alert(this.name);
}

Singleton.getInstance = function(name){ 
  if (!this.instance) {                   
    //假如这个记录变量没有被记录过，就代表是第一次执行此函数
    this.instance = new Singleton(name);  
    //new一个Singleton对象出来，name是传参进来的值，可以说instance里面挂载了一个Singleton对象。
  }
  return this.instance;                   
  //把instance返回去，接受的变量里面就包含了Singleton对象，可以调用Singleton.getName();来查看自身的名字
}

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
console.log(a);
console.log(b);

b.getName(); //弹出sven1
// a === b
```
**代码分析:** 代码很简单,看下就知道了.

至此结束了，不管你调用了多少次`Singleton.getInstance`方法并传值，返回的都是对象的name值都是sven1，也就是第一次设置的内容。除非你手动设置下 `Singleton.instance = null;`

> 这个案例有个问题，就是增加了这个类的“不透明性”，使用者在使用的时候必须知道这是个单例模式，和以往的`new ***`的形式不同，使用`Singleton.getInstance`来获取对象让人看不明白。


## 2-透明的单例模式

结合上面的案例，这里实现一个透明的单例类，也就是可以通过这个类创建对象的时候，和使用其他类一样，用`new ***`的方式。

下面将将使用`CreateDiv`单例类，他的作用是负责在页面中创建唯一的div节点.
```js
var CreateDiv = (function(){        
  //尾部有()是个自执行的函数
  var instance;                     
  //备注写到了后面才发觉这是个闭包变量，CreateDiv用到了这个变量，而且CreateDiv被返回给外面了使用了，这个函数没有被销毁，instance成了闭包变量。

  var CreateDiv = function(html){   
    //声明一个函数，参数是创建div里面的html内容。
    if (instance) {                 
      return instance;              
      //假如instance存在，就是返回instance，很熟悉，和上个案例的条件判断有点像。
    }
    this.html = html;               
    //把参数挂载到自己的身上  
    this.init();                    
    //这里我有个疑惑，js有函数预览，但是prototype原型上的函数也会预览吗，我用log(1)和log(2)来测试，事实上是log(2)先执行，log(1)后执行
    console.log(1);                 
    return instance = this;         
    //把函数逻辑动作赋值给instance，下次进入的时候，如果instance有值，就返回给外面执行用
  };
  //CreateDiv变量里面有着一个instance变量，这个变量有html属性和init函数方法。

  CreateDiv.prototype.init = function(){  
    console.log(2);
    var div = document.createElement('div');   
     //函数的逻辑就是创建了div并加到了页面中
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };

  return CreateDiv;       
  //把CreateDiv抛给了外面，也是构造函数的特性？ 什么特性记得查

})();

var a = new CreateDiv('sven1'); 
// 这个构造函数执行的过程中，只有第一次进入才会被执行init函数，也就是添加div的方法。
var b = new CreateDiv('sven2'); 
// 因为instance存在，所以没有走init()，虽然instance.init()是存在的，但是没有被执行过，所以没有重新给html属性赋值和添加div元素。
b.init();  
//b就是构造函数里面的return回的CreateDiv函数，这个函数中有html属性，值为第一次执行init时赋值的sven1，也有init方法.
//执行测试下，发现页面上有给div了。再执行，再加一个。

alert(a===b); 
// true  因为instance闭包变量的存在。规避掉了第二次的不同操作，所以就算参数不同，这两个对象也是一样的。
```
到这为止，就完成了一个透明的单例类的编写，但是他同样不够完美，为了把instance封装起来，我们使用了自执行的匿名函数和闭包，并且让这个匿名函数返回真正的Singleton构造方法。

这增加了程序的复杂度，阅读起来也不是很舒服，我们观察现在的Singleton构造函数
```js
var CreateDiv = function(html){
  if (instance) {
    return instance;
  }
  this.html = html;
  this.init();                                 
  return instance = this;         
}
```
这段代码中CreateDiv的构造函数实际上负责了两件事，第一件是创建了对象和执行初始化init方法，第二保证只有一个对象。虽然现在还没有完全明白什么是真正的单一职责函数，但是也能明白，这是不好的代码，至少看上去有点奇怪。

假如我们某天需要利用这个类，在页面中创建千千万万的div，既要让这个类变成一个普通的类，我们就必须修改删除CreateDiv中的if (instance)判断内容，给我们带来不必要的烦恼。

怎么再次优化呢,这里我们引入代理类的方式，来解决上面提到的问题。

## 3-用代理实现单例模式

依然使用上个章节的代码，首先在CreateDiv构造函数中，把负责管理单例的代码移除出去，使他成为一个普通的创建div的类。
```js
var CreateDiv = function(html){
  this.html = html;
  this.init();        
  //如果我把这行注释掉，那么在创建单例对象的时候，并不会插入dom，除非手动 对象.init();                              
}

CreateDiv.prototype.init = function(){    
  //init初始化的内容比较单纯，就是dom操作，写入值，插入dom。也就是成了一个普通的类函数
  var div = document.createElement('div');    
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

//接下来引入代理类 proxySingletonCreateDiv;
var ProxySingletonCreateDiv = (function(){  
  //这个函数负责管理单例的逻辑，自身是个自执行函数。接受的变量会变成 new CreateDiv 的对象。
  var instance;                           
  return function(html){
    if (!instance) {
      instance = new CreateDiv(html);     
      //不管如果，都把CreateDiv类生成的对象反出去。
    }
    return instance;
  }
})();

var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
alert(a===b); //输出true
b.init(); 
//这样操作下页面有了2个div了，内容都是sven1
```
通过代理类 ProxySingletonCreateDiv ，配合普通函数 CreateDiv，组合起来达到单例模式效果。

## 4-js中的单例模式

补充一点东西，前面提到的几种单例模式的实现，更多的是接近传统面向对象语音中的实现，单例对象从类中创建而来，在以类为中心的语言中，这是很自然的做法。比如在java中，如果需要某个对象，就需要先定义一个类，从而产生对象。

但是在js中，生搬单例模式没有意义，js创建对象很简单，既然需要的是‘唯一’对象,就没有必要为他特意先创建一个类，单例模式的另一个核心是提供全局访问。（全局变量?）

全局变量不是单例模式，但是在javascrip开发中，我们经常会把全局变量当成单例来使用。 例如 var a = {};


然而全局变量是js语言的败笔，如果一定要使用全局变量，可使用下面两种方法稍稍降低全局变量带来的命名污染。

### 1. 命名空间，并不会杜绝全局变量，但是可以减少全局变量的数量。最简单的方法依然是用对象字面量的方式
```js
var namespace1 = {
  //a和b就是我们想要的全局变量
  a:function(){   
      alert(1)
  },
  b(){
      alert(2);
  }
}
```

### 2. 使用闭包封装私有变量。 把变量封装到内部，只暴露一些接口给外界通信。 
```js
var user = (function(){
    var _name = 'sevn',
        _age = 29;
    return {
        getUserInfo:function(){
            return _name + '-' +_age;
        }
    }
})();
```
我们约定了私有变量_name 和 _age 他们被封装在闭包产生的作用域中，避免了全局的命令污染。

## 5-惰性单例 (重点)
>**惰性单例指的是在需要的时候才创建对象实例,不需要的就不创建**  
举个例子来说明下惰性单例的作用和好处。还是说登录浮窗，介绍与全局变量结合实现惰性的单例,我们先写一个dom元素.
```html
<button id="loginBtn">登录</button>
```
第一种方案，也是我第一反应的方法是在页面加载完成后便创建好这个div浮窗，这个浮窗开始是隐藏的，点击了某些条件的时候，他才开始显示。

代码就不写了，比较简单，没有意义。这种方式有一个问题，就是也许我们只是转转不进行登录操作，那么就很有可能拜拜浪费了一个dom节点的操作。

改进一下当我们点击登录按钮的时候在进行dom操作，插入浮窗，关闭时再删除此dom元素。

明显，如此频繁的创建和删除节点明显是不合理的，也是不必要的。

再改进一下，我们可以用一个flag变量来判断是否创建过弹窗，没有的话创建dom，取消是diaplay:none，有的话直接block。

#### 这样我们在逻辑上完成了一个可用的惰性单例，但是我们发现它还有一些问题

1. 违反单一职责原则，创建对象和管理单例的逻辑都放到了一个函数内部。

2. 如果我们下次需要创建页面唯一的iframe，或者script便签，就需要如法炮制，把刚才的函数重抄一遍。

我们需要把不变的部分隔离出来，先不考虑创建一个div和创建一个iframe有多少差异，管理单例的逻辑是可以完全抽象出来的:用一个变量来标记是否创建过对象，如果是，则在下次直接返回这个已经创建好的对象。
```js
var obj;
if (!obj) {
    obj = xxx;
}
```
#### ok,逻辑上理顺了,我们来写代码

把如何管理单例的逻辑从原来的代码中抽出来，这些逻辑封装在getSingle函数内部，创建对象的方法fn当做参数动态传入函数。
```js
var getSingle = function(fn){
    var result;
    return function(){
        return result || (result = fn.apply(this,arguments)); 
        // 如果result存在就返回result，不存在就返回传入的函数。
    }
}
```
接下来我们用创建登录浮窗的方法用fn的形式传入getSingle，我们不仅可以创建浮窗，还可以createIframe等等。

之后让getSingle返回一个新的函数并且用一个变量result来保存计算结果，result变量因为身在闭包中，它永远不会被销毁，在将来的请求中，如果result已经被赋值，那么他将返回这个值。

```js
var createLoginLayer = function(){
    var div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div
}

var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function(){
    var loginLayer = createLoginLayer();        
    //这个函数会返回一个已经被加入body里面的div，然后设置他的block就会显示了。
    loginLayer.style.display = 'block';
}
```
在上面的两个方法，可以相互独立变化互不影响，当他们链接在一起的时候，就完成了创建唯一实例对象的功能。


