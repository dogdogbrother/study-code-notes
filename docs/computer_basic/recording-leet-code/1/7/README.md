# 棒球比赛

>这个是非常非常简单的栈题

## 需求

你现在是棒球比赛记录员。
给定一个字符串列表，每个字符串可以是以下四种类型之一：
1. 整数（一轮的得分）：直接表示您在本轮中获得的积分数。
2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。

每一轮的操作都是永久性的，可能会对前一轮和后一轮产生影响。
你需要返回你在所有回合中得分的总和。

>示例  
输入: ["5","2","C","D","+"]  
输出: 30  
解释:  
第1轮：你可以得到5分。总和是：5。  
第2轮：你可以得到2分。总和是：7。  
操作1：第2轮的数据无效。总和是：5。  
第3轮：你可以得到10分（第2轮的数据已被删除）。总数是：15。  
第4轮：你可以得到5 + 10 = 15分。总数是：30。


## 我的解题

这题是非常非常非常简单的,主要你有栈的思想,就很好解决.

遍历记录数组,根据里面的符号,来给新的数组push值或是pop值.

最后相加,因为太简单的,所以结尾相加的地方我用了平时不常用的 `reduce` 方法
```js
/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
    let resArr = []
    ops.forEach(item => {
        if (item === '+') {
            resArr.push(Number(resArr[resArr.length-1]) + Number(resArr[resArr.length-2]))    
        } else if (item === 'D') {
            resArr.push(resArr[resArr.length-1] * 2)
        } else if (item ==='C') {
            resArr.pop()
        } else {
            resArr.push(Number(item))
        }
    })
    return resArr.reduce((total, num) => total + num)
};
```
>执行用时 :68 ms, 在所有 javascript 提交中击败了62.18%的用户  
内存消耗 :34.1 MB, 在所有 javascript 提交中击败了90.51%的用户
