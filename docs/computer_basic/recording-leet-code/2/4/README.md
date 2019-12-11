# Z形变换

[原题目地址](https://leetcode-cn.com/problems/zigzag-conversion/)

## 需求
将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列.

比如输入字符串为 `"LEETCODEISHIRING"` 行数为 3 时，排列如下:
```
L   C   I   R
E T O E S I I G
E   D   H   N
```
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如：`"LCIRETOESIIGEDHN"`。

>示例1:  
输入: s = "LEETCODEISHIRING", numRows = 3  
输出: "LCIRETOESIIGEDHN"

>示例2:  
输入: s = "LEETCODEISHIRING", numRows = 4   
输出: "LDREOEIIECIHNTSG"

**解释:**  
```
L     D     R
E   O E   I I
E C   I H   N
T     S     G
```

## 解题

我想了想,思路是这样的,我分割数组,数组中由对象组成,对象的key是1,2,3这种的,根据`numRows`来定.

这个数组中的两个正常的(满值)对象的间隔是`numRows`-2.

单蹦的字符串的key值是和index反向对应的,例如`numRows`是5,那么数组[1]的对象中,obj[4]是有值的.

这个题的关键就是取余.
```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    
};
console.log(convert(LEETCODEISHIRING,5))
```

