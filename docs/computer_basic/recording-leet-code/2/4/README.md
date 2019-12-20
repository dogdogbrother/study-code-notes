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

## 我的傻屌解题
说不太好,我用数据结构变化的步骤列出来吧.假设`numRows`长度为4,`s`为`'123456789'`
1. 先把字符串变成若干个对象,有1~6个key.
```js
[{ 1:'1',2:'2',3:'3',4:'4',5:'5',6:'6'},{...}]
```
2. 再把这个对象分割成若干个小对象放进数组里面,如下:
```js
[
  { 1:'1',2:'2',3:'3',4:'4'},
  { 1:'',2:'',3:'5',4:'' },
  { 1:'',2:'6',3:'',4:'' },
  { 1:'7',2:'8',3:'9',4:'' },
]
```
3. 然后我们就可以按照顺序去拿值了,从对象的1中依次开始拿,遇到空字符串其实就等于没有.
```js
1+''+''+7+2+''+6+8 ...
```
结果就是`'172683594'`,是正确的.

>这种思路其实很蠢,而且需要处理好多的边界问题,并且要定义很多的新对象和数组,着实弟弟,事实上也很弟弟  
**执行用时 :976 ms, 在所有 javascript 提交中击败了5.06%的用户**  
**内存消耗 :82.1 MB, 在所有 javascript 提交中击败了5.16%的用户**

***

```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  if(s.length<=numRows) return s
  const getKey = (index,group) => {
    //用于计算map真正的key值应该是多少index 是外面的i,group是分割数组的长度
    return (index+1)%group || group
  }
  const getMapFormat = (count) => {
    let mapObj = {}
    for(var i = 1; i < count+1; i++){
      mapObj[i] = ''
    }
    return mapObj
  }
  let mapObj = {}
  let shortArr = []
  let resArr = []
  let groupLength = (numRows*2-2) || 1
  mapObj = getMapFormat(groupLength)
  for(var i=0; i<s.length; i++ ){
    let realKey = getKey(i,groupLength)
    mapObj[realKey] = s[i]
    if((i+1)%groupLength === 0) {
      // 代表一个组已经结束了,我们要把map添加进去并重置map对象组
      shortArr.push(Object.create(mapObj).__proto__)
      mapObj = getMapFormat(groupLength)
    }
  }
  if (mapObj['1'] && mapObj[groupLength] === '') {
    // 这是个边界处理,假如最后一位没有值并第一个有值就代表循环的时候没有处理完
    shortArr.push(Object.create(mapObj).__proto__)
  }
  // 至此为止我们的数据完成了一半,是正确的没问题的.还要再次遍历处理一下,把一个长的对象变成短的对象.
  shortArr.forEach(item => {
    let langLengthobj = {}
    let sortLengthobj = {}
    let sortLengthArr = []
    let objArr = Object.keys(item)
    objArr.forEach(key => {
      if (key<=numRows) {
        langLengthobj[key] = item[key]
        sortLengthobj[key] = ''
      } else {
        let arr2 = getMapFormat(numRows)
        arr2[numRows-(key-numRows)] = item[key]
        sortLengthArr.push(arr2)
      }
    })
    resArr.push(langLengthobj)
    resArr.push(...sortLengthArr)
  })
  // 这里就把z形的排列好了,我们再把resArr给按照属性搞一遍就完事了
  // 目前为止上面的代码没有发现错误
  let resStr = ''
  Object.keys(resArr[0]).forEach(item => {
    // 这里的处理和常规的不太一样,这个是要根据里面的对象的长度定义第一层循环
    // 这个地方的item是对象的key值
    for(var q=0; q<resArr.length; q++){
      resStr += resArr[q][item]
    }
  })
  return resStr
};
console.log(convert('123456789',4))
```

## 官方解题
不仅我说秀,评论区全是秀声一片.

1. 首先定义一个数组,长度是`numRows`,当然如果`s`小于`numRows`就等于`s`的长度.与之对应的是一个index,值的范围是0到数组的长度.

2. 再定义个布尔值goingDown,默认false,当为true的时候+1,false的时候-1

举例`12345678`和4,数组里面有四个`''`.通过循环s,和goingDown配合不停往这四个字符串里面add值,最后合并这四个字符串即可.
```js
//第一次循环
['1','','','']
// 因为index值等于0,于是乎goingDown变成true,index+1,也就导致了第2.3.4次循环
['1','2','3','4']
// index等于4的时候index满足条件,goingDown变成false,于是乎idnex-1了!!!(又循环了3次)
['17','26','35','4']
//因为上次循环index===0,又满足了添加,变成了正序,index+1
['17','268','35','4']
```
结果为**17268354**是正确的,怎么说呢,是很精妙,但是我的感觉有点过于取巧了,着实没什么用.

***

```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  if (numRows == 1) return s;
  let curRow = 0;
  let goingDown = false;
  let rows = []
  for(var i=0; i<Math.min(numRows,s.length); i++){
    rows[i] = ''
  }
  for(var i=0; i<s.length; i++){
    rows[curRow] += s[i]
    if (curRow == 0 || curRow == (numRows - 1)) {
      goingDown = !goingDown;
    }
    curRow += goingDown ? 1 : -1;
  }
  return rows.join('')
}
console.log(convert('12345678',4))
```
