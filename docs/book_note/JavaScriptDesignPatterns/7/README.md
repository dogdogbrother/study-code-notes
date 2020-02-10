# 命令模式

## 1-命令模式的简介用途
假设有一个快餐店，当有客人打电话来点餐的时候，服务员会把需求写在清单上，然后交给厨房，客人不用关系是那些厨师帮他炒菜，餐厅还可以满足客人的定时服务，

比如客户要求一小时后开始炒菜，只要订单在，厨师就不会忘记，客人还可以很方便的打电话来撤销订单，如果有太多的客人点餐，厨房还可以按照订单顺序排队炒菜。

记录这些订单信息的清单，便是命令模式中的命令对象。
***
命令模式中的命令指的是一个执行某些特定事情的指令。

命令模式最常见的应用场景是，有时候需要向某些对象发送请求，但是并不知道请求的接受者是谁，也不知道被请求的操作是什么。

此时我们希望用一种松耦合的方式来设计程序，使发送者和请求者消除彼此之间的耦合关系。


拿订餐来说，客人需要向厨师发送请求，但是完全不知道这些厨师的名字和电话，也不需要厨师炒菜的步骤。

命令模式将客人订餐的请求封装成command对象，这个对象可以在程序中被四处传递，就像订单可以被服务员手中传到厨师手中。

除此之外，命令模式还支持撤销、排队等操作。

## 2-命令模式例子-菜单程序
假设我们正在编写一个用户界面呈现，该用户界面有数十个button按钮。

我们让一个程序员辅助画这些按钮，而另外一些程序员负责编写点击按钮后的具体行为，这些行为都将被封装在对象里。

如何在静态页面的按钮上，绑定onclick事件呢？

```html
<button id="button1">按钮1</button>
<button id="button2">按钮2</button>
<button id="button3">按钮3</button>
```
```js
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
```
接下来定义 `setCommand` 函数，`setCommand`函数负责往按钮上面安装命令。

可以肯定的是，点击按钮会执行某个`command`命令，动作被约定为调用`command`对象的`execute()`方法。
```js
var setCommand = function(button,command){
  button.onclick = function(){
    command.execute();
  }
}
```
负责编写点击按钮之后的具体行为的程序员，他们要完成了刷新菜单界面，增加子菜单和删除子菜单这几个功能，功能被分布在 `MenuBar` 和 `SubMenu` 这两个对象中。
```js
var MenuBar = {
  refresh:function(){
    console.log('刷新菜单目录');
  }
}

var SubMenu = {
  add:function(){
    console.log('增加子菜单');
  },
  del:function(){
    console.log('删除子菜单');
  }
};
```
在让buttom变得有用之前，我们要先把这些行为都封装在命令类中
```js
var RefreshMenuBarCommand = function(receiver){
  this.receiver = receiver;
}
RefreshMenuBarCommand.prototype.execute = function(){
  this.receiver.refresh();
}

var AddSubMenuCommand = function(receiver){
  this.receiver = receiver;
}
AddSubMenuCommand.prototype.execute = function(){
  this.receiver.add();
}

var DelSubMenuCommand = function(receiver){
  this.receiver = receiver;
}
DelSubMenuCommand.prototype.execute = function(){
  console.log('删除子菜单');
}
```
最后就是把命令接受者传入到 command 对象中，并且把command对象安装到button上面.
```js
var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);
console.log(refreshMenuBarCommand);

setCommand(button1,refreshMenuBarCommand);
setCommand(button2,addSubMenuCommand);
setCommand(button3,delSubMenuCommand);
```
这就是个很简单的命令模式的实例，但从中可以看到我们是如何把请求发送和请求接收两者解耦开的。
***
**这里我写一些我个人的解释。**
1. 我们先获取到元素。button1，button2，button3

2. 写了setCommand函数，这个函数接受2个参数，第一个参数是dom元素，第二个参数是命令，然后函数内部让这个dom绑定命令。那么命令哪里来的呢？

3. 写了2个对象MenuBar和SubMenu，里面有自己的方法，例如refresh刷新，add添加子菜单。

4. 然后我们创建了三个函数，当类使用的，函数原型链上execute函数绑定了相应的3.中的方法。

5. 然后我们再new下这三个类，得到三个命令对象，这三个对象都有receiver对象，原型链上都有execute方法。回顾4.中execute方法被绑定了相关的执行代码。

6. 回答了2.的问题，命令就是这么来的，setCommand执行三次，安装三个onclick事件。

## 3-JS中的命令模式
1-的示例实在是太麻烦了，绕来绕去也不知道再搞个啥JB玩意，即使不用模式，JS几行代码就能实现相同的功能。
```js
var bindClick = function(button,func){
  button.onclick = func;
}

var MenuBar = {
  refresh:function(){
    console.log('刷新页面');
  }
}

var subMenu = {
  add:function(){
    console.log('增加子菜单');
  },
  del:function(){
    console.log('删除子菜单');
  },
}

bindClick(button1,MenuBar.refresh);
bindClick(button2,subMenu.add);
bindClick(button3,subMenu.del);
```
**命令模式的由来，其实是回调函数的一个面向对象的代替品。**

## 撤销命令
假如我们有一个需求是让一个小球向右移动200px，如果我们想让他回归原始的位置，当然可以输入-200px。但是更优雅的方法是增加一个撤销按钮，点击该按钮，撤销本次移动，回归上次的位置。

先写一个原始的小球移动的案例。
```html
<body>
  <div id="ball" style="position:absolute;background:#000;width:50px;height:50px"></div>
    输入小球移动后的位置：<input id="pos"/>
  <button id="moveBtn">开始移动</button>
</body>
<script>
  var ball = document.getElementById( 'ball' );
  var pos = document.getElementById( 'pos' );
  var moveBtn = document.getElementById( 'moveBtn' );
  moveBtn.onclick = function(){
  var animate = new Animate( ball );
  // Animate 是我们前面章节写的一个动画类
  animate.start( 'left', pos.value, 1000, 'strongEaseOut' );
  };
</script> 
```

然后我们用命令模式去改造下：
```js
var ball = document.getElementById( 'ball' );
var pos = document.getElementById( 'pos' );
var moveBtn = document.getElementById( 'moveBtn' );
var MoveCommand = function( receiver, pos ){
  this.receiver = receiver;
  this.pos = pos;
};
MoveCommand.prototype.execute = function(){
  this.receiver.start( 'left', this.pos, 1000, 'strongEaseOut' );
};
var moveCommand;
moveBtn.onclick = function(){
  var animate = new Animate( ball );
  moveCommand = new MoveCommand( animate, pos.value );
  moveCommand.execute();
}; 
```
接下来增加撤销按钮：
```html
<button id="cancelBtn">cancel</button>
```
撤销操作的实现一般是给命令对象增加一个名为 unexecude 或者 undo 的方法，在该方法里执行 execute 的反向操作。在 command.execute 方法让小球开始真正运动之前，我们需要先记录小球的当前位置，在 unexecude 或者 undo 操作中，再让小球回到刚刚记录下的位置，代码如下：
```js
var ball = document.getElementById( 'ball' );
var pos = document.getElementById( 'pos' );
var moveBtn = document.getElementById( 'moveBtn' );
var cancelBtn = document.getElementById( 'cancelBtn' );
var MoveCommand = function( receiver, pos ){
  this.receiver = receiver;
  this.pos = pos;
  this.oldPos = null;
};
MoveCommand.prototype.execute = function(){
  this.receiver.start( 'left', this.pos, 1000, 'strongEaseOut' );
  this.oldPos = this.receiver.dom.getBoundingClientRect()[ this.receiver.propertyName ];
  // 记录小球开始移动前的位置
};
MoveCommand.prototype.undo = function(){
  this.receiver.start( 'left', this.oldPos, 1000, 'strongEaseOut' );
  // 回到小球移动前记录的位置
};
var moveCommand; 
moveBtn.onclick = function(){
  var animate = new Animate( ball );
  moveCommand = new MoveCommand( animate, pos.value );
  moveCommand.execute();
};
cancelBtn.onclick = function(){
  moveCommand.undo(); // 撤销命令 
}; 
```
撤销操作并不难，只是用一个变量记录下上一次操作时的值。

## 撤消和重做
上个代码示例只写了一个撤销的动作，但很多时候，我们需要撤销很多步，例如围棋游戏，可以一直悔棋下去。按照上面的代码示例来讲，其实就是把命令存储在列表中，然后倒叙执行这些命令的 undo 操作。

然而，有些情况下这种思路是不合适的，Canvas 画图的程序中我们可以用命令去画线，却不能用撤销去删除线。这种情况下，可以擦除画布，然后用记录的正序列表命令重复执行操作就好了。

书中的案例是作者写的h5版的 街头霸王 游戏，用命令模式用来实现播放录像功能，把用户在键盘的输入都封装成命令，执行过的命令将被存放到堆栈中。
```html
<button id="replay">播放录像</button> 
```
```js
var Ryu = {
  attack: function(){
    console.log( '攻击' );
  },
  defense: function(){
    console.log( '防御' );
  },
  jump: function(){
    console.log( '跳跃' );
  },
  crouch: function(){
    console.log( '蹲下' );
  }
}; 
var makeCommand = function( receiver, state ){ // 创建命令
  return function(){
    receiver[ state ]();
  }
};

var commands = {
"119": "jump", // W
"115": "crouch", // S
"97": "defense", // A
"100": "attack" // D
};
var commandStack = []; // 保存命令的堆栈
document.onkeypress = function( ev ){
var keyCode = ev.keyCode,
command = makeCommand( Ryu, commands[ keyCode ] );
if ( command ){
  command(); // 执行命令
  commandStack.push( command ); // 将刚刚执行过的命令保存进堆栈
}
};

document.getElementById( 'replay' ).onclick = function(){ // 点击播放录像
  var command;
  while( command = commandStack.shift() ){ // 从堆栈里依次取出命令并执行
    command();
  }
}; 
```
