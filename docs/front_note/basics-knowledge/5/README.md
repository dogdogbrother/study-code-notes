# number 数字

## toString()
以字符串返回数值.
```js
(123).toString(); // '123'
```
## toFixed()

返回字符串值，它包含了指定位数小数的数字
```js
var x = 9.656;
x.toFixed(0); // '10'
```

## toPrecision()

返回字符串值，它包含了指定长度的数字
```js
var x = 9.656;
x.toPrecision(2); // '9.7'
```

## parseFloat()/parseInt()

解析一段字符串并返回数值。允许空格。只返回首个数字.

`parseFloat()`返回浮点数,`parseInt()`返回整数.
```js
parseFloat("10.33");     // 返回 10.33
parseFloat("10 years");  // 返回 10
parseFloat("years 10");  // 返回 NaN

parseInt("10.33");      // 返回 10
```