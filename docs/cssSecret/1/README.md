# 背景与边框

## hsla
```css
border: 10px solid hsla(0,0%,100%,.5);
```
`hsla`和rgba差不多.
* H：Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
* S：Saturation(饱和度)。取值为：0.0% - 100.0%
* L：Lightness(亮度)。取值为：0.0% - 100.0%
* A：Alpha透明度。取值0~1之间。

## background-clip: padding-box;
我们对一个div添加一个半透明的边框.
```css
border: 10px solid hsla(0,0%,100%,.5);
background: white;
```
我们会发现这个半透明的边框你看不到,是因为边框也受背景色的影响,被白色渗透了.解决方法就是调整`background-clip`(默认值是`border-box`).
```css
background-clip: padding-box;
```

## background-origin
假如给一个宽高100的div的设置一张宽高60的图片,我们应该怎么做呢?最简单常规的方法是`background-position`.
```cs
background-position: right 20px bottom 20px;
```
但是这样有个缺点,就是如果我们的div或是背景图的尺寸变了,我们每次都要right+数值和bottom+数值,稍稍有点麻烦.怎么优化呢?

我们可以把不需要背景图覆盖的地方设置为div的padding区域,然后让背景图覆盖content区域即可.

`background-position` 是以 `padding box` 为准的，我们可以改成 `content-box`.
```css
padding: 20px;
background-position: right bottom;
background-origin: content-box;
```
>处了`background-origin`,还可以使用`calc()`方案.

## calc()
```css
background-position: calc(100% - 20px) calc(100% - 10px);
```
>请不要忘记在 `calc()` 函数内部的 `-` 和 `+` 运算符的两侧各加一个空白符，否则会产生解析错误！这个规则如此怪异，是为了向前兼容：未来，在 `calc()` 内部可能会允许使用关键字，而这些关键字可能会包含连字符（即减号）。

## 伪随机背景
如果我们想要一种元素以不规则的形态平铺在背景图中,要知道css中是没有像JS一样的`random`的,应该如何操作实现呢?

方便起见,我们只实现四种颜色的随机平铺.

1. 我们的第一个想法可能就是创建一个具有四种颜色的条纹图案：
```css
background: linear-gradient(90deg,
 #fb3 15%, #655 0, #655 40%,
 #ab4 0, #ab4 65%, hsl(20, 40%, 90%) 0);
background-size: 80px 100%;
```
效果如下:

![2-53](./img/2-53.png)

2. 后续的我写不下去了,是在看不明白案例中的linear-gradient的使用技巧,也理解不透彻所谓的贴片...

反正就是利用了质数,这个技巧被 Alex Walker 定名为“蝉原则”，他最先提出了通过质数来增加随机真实性的想法。请注意这个方法不仅适用于背景，还可以用于其他涉及有规律重复的情况。

## 连续的图像边框
看不懂,后续我再看

