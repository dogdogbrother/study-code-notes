# 策略模式
>[菜鸟教程中对策略模式的简介](https://www.runoob.com/design-pattern/strategy-pattern.html)  
其实就是行为型模式,定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换

在程序设计中，我们经常会遇到类似的情况，要实现某一种功能有多种方案。

比如一个压缩文件的程序，既可以选择zip算法，也可以选择gzip的算法。

这些算法灵活多样，而且可以随意相互替换。这种解决方案就是本章要介绍的策略模式。

## 1-策略模式计算奖金
很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如绩效是S的人有四倍年终奖，绩效是A的有三倍。现在财务部要求我们提供一段代码，来方便他们计算员工的年终奖。

最初的代码实现。我们编写一个 calculateBonus 的函数，此函数需要接受两个参数，员工的工资数额和他的绩效考核等级。
```js
var calculateBonus = function(performancelevel,salary){
    if (performancelevel === 'S') {
        return salary * 4;
    }
    if (performancelevel === 'A') {
        return salary * 3;
    }
    if (performancelevel === 'B') {
        return salary * 2;
    }
}

calculateBonus('B',20000);  //输出：40000
calculateBonus('S',6000);   //输出：24000
```
这明显是个烂函数.
1. 函数庞大，有些语句有可能会走遍全部的分支。
2. 函数缺乏弹性，假如我要增加一个新的等级C，或是改掉系数就没办法，要进入函数内部去修改
3. 算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法，就要复制粘贴。

#### 这里我们使用策略模式重构代码
一个基于策略模式的程序至少由两部分组成，第一个部分是一组策略类，策略类封装了具体的算法，负责计算过程，第二部分是环境类Context，Context接受了客户的请求，随后把请求委托给某一个策略类。

要做到这一点，说明Context中要维持对某个策略对象的引用。

先把每种绩效的设计规则封装好在对应的策略类里面。

```js
var performanceS = function(){};
performanceS.prototype.calculate = function(salary){
    return salary * 4;
}

var performanceA = function(){};
performanceA.prototype.calculate = function(salary){
    return salary * 3;
}

var performanceB = function(){};
performanceB.prototype.calculate = function(salary){
    return salary * 2;
}

// 接下来定义奖金类Bonus
var Bonus = function(){
    this.salary = null;     //原始工资
    this.strategy = null;   //绩效等级对应的策略对象
}
Bonus.prototype.setSalary = function(salary){
    this.salary =  salary;
}
Bonus.prototype.setStrategy = function(strategy){
    this.strategy =  strategy;
}
Bonus.prototype.getBonus = function(){
    if (!this.strategy) {
        throw new Error('未设置strategy属性')
    }
    return this.strategy.calculate(this.salary);
}
```
基础代码写好了，现在开始使用，先创建一个bonus对象，并给bonus对象设置一些原始数据，比如员工的原始工资数额。接下来把某个计算奖金的策略对象也传入bonus对象内部保存起来。

当调用 bonus.getBonus() 来计算奖金的时候，bonus对象本身并没有能力进行计算，而是把请求委托给了之前保存好的策略对象。
```js
var bonus = new Bonus();    
//生成一个类，这个类有2个属性， salary strategy，初始都是为null 55-58行代码
bonus.setSalary(1000);       
// setSalary 是挂载到构造函数原型上的方法，是设置 salary 属性的值。
bonus.setStrategy(new performanceS); 
// performanceS 会生成一个类，这个类有一个计算的方法。setStrategy函数会那个这个类，并赋值给自身的 strategy 属性
console.log(bonus.getBonus());      
// 执行 bonus 原型链上的 getBonus方法，此方法先判断 strategy 属性上有没有挂载 new performanceS 出来的类.
// 没有的话报错，有的话就调用类的计算方法，最后返回真正的计算结果。

bonus.setStrategy(new performanceA);
console.log(bonus.getBonus());
```
## 2-JS版本的策略模式和多态的体现
JS中，函数也是对象，所以更简单和直接的做法是把 strategy 直接定义为函数
```js
var strategies = {
    'S':function(salary){
        return salary * 4;
    },
    'A':function(salary){
        return salary * 3;
    },
    'B':function(salary){
        return salary * 2;
    },
}

var calculateBonus = function(level,salary){
    return strategies[level](salary);
}
console.log(calculateBonus('S',20000)); //输出80000
```
>**多态在策略模式中的体现**  
通过使用策略模式重构代码，我们消除了原程序中大片的条件分支语句。（其实是用了对象属性来判断的）
计算奖金的逻辑不在调用函数里面，而是委托给了某个策略对象，每个策略对象每个属性都有自己赋负责的算法，可以根据函数的参数随意替换，这也是多态的一种体现。

## 3-使用策略模式实现缓动动画
我们先来一个dom元素
```html
<div style="position:absolute;background:blue" id="div">我是div</div>
```
再来一些准备工作，定义下运动动画函数.
```js
var tween = {
    linear:function(t,b,c,d){
        return c*t/d+b;
    },
    easeIn:function(t,b,c,d){
        return c*(t/=d)*t+b;
    },
    strongEaseOut:function(t,b,c,d){
        return  c*((t=t/d-1)*t*t*t*t+1)+b;
    }
}
```
先放置一个div，然后我们定义 Animate 类，Animate的构造函数接受一个参数：即将运动起来的dom节点。代码如下
```js
var Animate = function(dom){
    this.dom = dom;          //进行运动的dom节点
    this.startTime = 0;      //动画开始的时间
    this.startPos = 0;       //动画开始时，dom节点的位置，即dom的初始位置。
    this.endPos = 0;         //动画结束时，dom节点的位置，即dom的目标位置。
    this.propertyName = null;//dom节点需要被改变的css属性名
    this.easing = null;      //缓动算法
    this.duration = null;    //动画持续时间
}
```
接下来Animate.prototype.start方法负责启动这个动画，在动画被启动的瞬间，要记录一些信息，供缓动算法在以后计算小球当前位置的时候使用。在记录完这些信息之后，此方法还要负责启动定时器。代码如下
```js
Animate.prototype.start = function(propertyName,endPos,duration,easing){
    this.startTime = +new Date;
    this.startPos = this.dom.getBoundingClientRect()[propertyName]; //dom节点初始位置
    this.propertyName = propertyName; //dom节点需要被改变的css属性名。
    this.endPos = endPos; //dom节点目标位置
    this.duration = duration;//动画持续时间
    this.easing = tween[easing];//缓动算法

    var self = this;
    var timeId = setInterval(function(){ //开启定时器，开始执行动画
        if (self.step() === false) {    //如果定时器已结束，则清除定时器
            clearInterval(timeId);
        }
    },19);
};
```
Animate.prototype.start 方法接受四个参数，propertyName:'left','top'之类的，endPos:小球运动的目标位置，duration 动画持续时间，easing: 缓动算法.

Animate.prototype.step 该方法代表小球运动的每一帧要做的事。
```js
Animate.prototype.step = function(){
    var t = +new Date; //取得当前时间
    if (t >= this.startTime + this.duration) { //(1)
        this.update(this.endPos); //更新小球的css属性值
        return false;        
    }
    var pos = this.easing(t - this.startTime, this.startPos,this.endPos-this.startPos,this.duration); 
    //pos为小球当前位置,这行代码有点精妙啊 其实 this.easing 执行的就是 tween.strongEaseOut 函数，然后的是新的动画位置。牛逼。
    this.update(pos); //更新小球的css属性值
}
```
Animate.prototype.update 该方法负责小球的当前位置和调用更新css属性值的方法，是最后的方法。
```js
Animate.prototype.update = function(pos){
    this.dom.style[this.propertyName] = pos + 'px';
}

var div = document.getElementById('div');
var animate = new Animate(div);
animate.start('left',500,1000,'strongEaseOut');
//最后我们可以测试下
```

## 4-策略模式实现表单校验
策略模式指的是定义一系列的算法，并且封装起来，刚才的缓动动画的算法就是封装的体现。但如果把策略模式仅仅用来封装算法，未免有点大材小用，实际上，策略模式也可以用来封装一系列的业务规则。

只要这些业务规则指向的目标一致，并且可以被替换使用，我们就能用策略模式来封装。这里我们使用策略模式来完成表单检验的例子。

web项目中，我们经常力所能及的做一些表单校验的工作，减轻服务器压力。假设现在在编写一个注册页面，在点击注册按钮之前，有下面几条校验逻辑。

用户名不能为空，密码长度不能少于6位，手机号码必须符合格式。

写个表单
```html
<form action="" id="registerForm" method="post">
    请输入用户名：<input type="text" name="userName"/>
    请输入密码：<input type="text" name="password"/>
    请输入手机号：<input type="text" name="phoneNumber"/>
    <button>提交</button>
</form>
```
我们先写个逻辑非常简单的校验代码
```js
var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function(){
    if (registerForm.userName.value === '') {
        alert('用户名不能为空');
        return;
    }
    if (registerForm.password.value.length < 6){ 
        alert('密码长度不能少于6位');
        return;
    }
}
```
别问，问就是垃圾代码，函数缺乏弹性，if语句繁琐，算法复用性差。这里我们用策略模式重构下表单验证。
```js
var strategies = {  
  // 很显然第一步我们将这些校验逻辑封装成策略对象
    isNonEmpty(value,errorMsg){
        if (value === '') return errorMsg;
    },
    minLength(value,length,errorMsg){
        if (value.length<length) return errorMsg;
    },
    isMobile(value,errorMsg){
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg;
    }
}
// 这里我们实现 validator 类,负责接收用户的请求并委托给strategy对象。
var validataFunc = function(){
    var validator = new Validator(); 
        //*******  添加一些校验规则  **************
    validator.add(registerForm.userName,'isNonEmpty','用户名不能为空');
    validator.add(registerForm.password,'minLength:6','密码长度不能少于6位');
    //这行代码其实有个反常规了。冒号后面的数字6表示校验过程中所必需的一些参数，如果不包含冒号就说明校验过程中不需要额外参数信息。
    validator.add(registerForm.phoneNumber,'isMobile','手机号码格式不正确');

    var errorMsg = validator.start(); //获得校验结果
    return errorMsg; //返回校验结果
}
var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function(){     //这个是真正的提交代码
    var errorMsg = validataFunc(); //如果errorMsg有确切的返回值，说明未通过校验
    if (errorMsg) {
        alert(errorMsg);
        return false; //阻止表单提交
    }
}
// 最后是 validator 类的实现：
var Validator = function(){
    this.cache = []; //保存校验规则
}
Validator.prototype.add = function(dom,rule,errorMsg){
    var ary = rule.split(':'); 
    // 把 strategy 和参数分开，对应了53行的注释，也算是学到了传参的小技巧吧。。。聊胜于无
    this.cache.push(function(){ 
      //把校验的步骤用空函数包装起来，并且放入cache
        var strategy = ary.shift(); //用户挑选的 strategy
        ary.unshift(dom.value); //把input的value添加进参数列表
        ary.push(errorMsg);  //把errorMsg添加进参数列表
        return strategies[strategy].apply(dom,ary);
    })
}
Validator.prototype.start = function(){
    for(var i=0, validataFunc;validataFunc = this.cache[i++];){
        var msg = validataFunc(); //开始校验
        if (msg) {  //如果有确切的返回值，说明校验没有通过
            return msg;
        }
    }
}
```
这样，我们仅仅通过**配置**的方式就可以完成一个表单的校验，这些校验规则也可以复用在其他地方，还能作为插件的形式，方便移植到其他项目中。

如果想添加，或是修改规则，也只需要修改少量代码即可。
```js
validator.add(registerForm.userName,'minLength:10','用户名长度不能小于10位');
```
总结下这个策略模式的代码， strategies 对象其实就是策略模式的核心，里面封装了方法和逻辑，外部灵活使用即可。

的确是有点秀，秀到了我现在看完理解了，转眼就忘了逻辑了。只能说，放在这吧，有需求就在来看看。

## 5-给文本框添加多种校验规则 
刚才的例子中有一个小遗憾，就是校验只能应对一种，如果我需要用户名不能为空并且长度要小于10呢。我期望以这样的形式进行校验。
```js
Validator.add(registerForm.userName,[
    {
        strategy:'isNonEmpty',
        errorMsg:'用户名不能为空'
    },
    {
        strategy:'minLength:10',
        errorMsg:'用户名长度不能小于10位'
    },
]);
```
下面我们正式编写代码，提供可用于文本输入框对应多种校验规则

**----------------策略对象-----------------**
```js
var strategies = {
    isNonEmpty(value,errorMsg){
        if (value === '') return errorMsg;
    },
    minLength(value,length,errorMsg){
        if (value.length < length)  return errorMsg;
    },
    isMobile(value,errorMsg){
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value))  return errorMsg;
    }
}
```
**----------------validator对象-----------------**
```js
var Validator = function(){
    this.cache = [];
}
Validator.prototype.add = function(dom,rules){
    var self = this;            
    for (var i = 0, rule; rule = rules[i++];) {  
      // 这里的for循环的使用是比较反人类的,把for循环的第二三个参数合并到了一起。
      // 当i大于rules最大下标的时候，返回的就是undefined,那么for循环就会被终止
        (function(rule){        
          // rule 其实就是用户add时的第二个参数，也就是校验规则
            var strategyAry = rule.strategy.split(':'); 
            //这个分割下校验参数的，为啥要分割呢，因为minLength:10是调用的策略对象中的minLength属性，需要分割后取[0]位作为真正的匹配规则
            var errorMsg = rule.errorMsg;    //add时填写的校验错误信息
            self.cache.push(function(){      // cache是挂载到自己身上的一个属性，值是一个数组,里面被塞满了函数
                var strategy = strategyAry.shift();     
                // 把strategyAry数组的第一位删除，并保持起来。
                // 注意的是，strategyAry 有可能是长度为2，也有可能是长度是1，strategy的作用就一个，那就是用它找到真正的校验规则，例如strategies.isNonEmpty 这样的
                strategyAry.unshift(dom.value);         
                // 往 strategyAry 中push form表单中对应的校验规则的值
                strategyAry.push(errorMsg);             
                // strategyAry 尾部添加错误信息  strategyAry完整会是什么样子的呢。 ['森林','用户名不能为空'] 或 ['森林','10',用户名长度不能小于6位]
                return strategies[strategy].apply(dom,strategyAry); 
                // 这个函数的结尾是调用了 strategies 中的方法，参数就是 strategyAry，而这个方法有一个特性就是如果校验通过了就不会有 errorMsg 返回值
            })
        })(rule)
    }
}
Validator.prototype.start = function(){         
  // start函数开始校验
    for(var i=0,validatorFunc;validatorFunc=this.cache[i++];){ 
      //会遍历this.cache[i++]，也就是我们存储的校验规则
        var errorMsg = validatorFunc();         
        //执行这个校验规则函数就会执行最下面的函数，也就是返回 errorMsg 或空的
        if (errorMsg) {
            return errorMsg;
        }
    }
}
```
**----------------客户调用代码-----------------**
```js
var registerForm = document.getElementById('registerForm');

var validataFunc = function(){
    var validator = new Validator();
    validator.add(registerForm.userName,[{ 
      // 这章代码，最精髓的就是这个 add 和 start 函数，我们先看add函数干了什么
        strategy:'isNonEmpty',
        errorMsg:'用户名不能为空'
    },
    {
        strategy:'minLength:6',
        errorMsg:'用户名长度不能小于6位'
    },
    ]);
    validator.add(registerForm.password,[{strategy:'minLength:6',errorMsg:'密码长度不能小于6位'}]);
    validator.add(registerForm.phoneNumber,[{strategy:'isMobile',errorMsg:'手机号码格式不正确'}]);
    var errorMsg = validator.start(); 
    return errorMsg;
}
```
开始执行校验
```js
registerForm.onsubmit = function(){
    var errorMsg = validataFunc();  
    //运行validataFunc函数，validataFunc函数里面 add了一些规则，然后执行 start 函数，如果有返回值就说明校验不通过。
    if (errorMsg) {
        alert(errorMsg);
        return false;
    }
}
```

## 策略模式的总结
其实策略模式在js中没啥卵子用，因为策略类通常会被函数所代替，这时策略模式就是一种隐形的模式了。

只能说了解策略模式能让我们明白使用函数的好处。


