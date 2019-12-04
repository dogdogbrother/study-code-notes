# 按照奇偶排序

## 需求

**给定一个非负整数数组 `A`， `A` 中一半整数是奇数，一半整数是偶数。**

**对数组进行排序，以便当 `A[i]` 为奇数时，`i` 也是奇数；当 `A[i]` 为偶数时， `i 也是偶数。**

**你可以返回任何满足上述条件的数组作为答案。**


>示例：  
输入：[4,2,5,7]  
输出：[4,5,2,7]

**解释：** [4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。

>提示：  
2 <= A.length <= 20000  
A.length % 2 == 0  
0 <= A[i] <= 1000

**解释:**

题目中的排序并不是指的大小排序,而是规则排序,就是奇数对奇数,偶数对偶数.

因为数组里面已经确认了奇数和偶数是对应的,这就比较好办了,下标不对应就找下一位,再下一位,肯定会有合适的
所以这题很简单,也不需要做边界处理

## 第一次失败的解题

这是我第一次的解法,本身没什么难度,但是效率很低,只击败了6%的用户,有点难受,所以我打算写第二种解法
```js
/**
 * @param {number[]} A
 * @return {number[]}
 */

var sortArrayByParityII = function(A) {
  const recursion = (newIndex,index)=> {
    if (A[newIndex]%2 === index%2) {
      // 如果移位后的新值和index匹配就把匹配配置的内容删除掉,然后加到进去
      let deleteItem = A.splice(newIndex,1)
      A.splice(index,0,deleteItem[0])
    }else{
      recursion(newIndex+1,index)
    }
  }
  for (let index = 0; index < A.length; index++) {
    if (A[index]%2 !== index%2) {
      // 如果当前索引和值类型对应就没有操作,否则就递归操作
      recursion(index,index)
    }
  }
  return A
}
```

## 第二种正常的解法

第一种解法是有点蠢了,第二种的效率还可以,击败了99的用户

利用了一种叫做双指针的方法:
```js
/**
 * @param {number[]} A
 * @return {number[]}
 */

var sortArrayByParityII = function(A) {
  let B = []  //操作A后的结果放到B中,然后把B返回去
  let index1 = 0
  let index2 = 1
  for(let i=0;i<A.length;++i) { //遍历参数数组A
    // 这个地方是最节省效率的地方了,因为正常我的思路判断是否是偶数是要通过 A[i]%2 === 0 来判断
    // 但是 (A[i]&1)==0 能做到同样的效果,而且效率更高
    // & 符号是什么意思呢, & 会将两侧的数字变成2进制,然后相比每个位数,只有全部是1的情况下才给1,否则就给0
    // 其中右侧的1的二进制就是1,也就意味着不管左侧数值是什么,只取左侧数值的最后一位,0或是1
    // 所以结果最终会变成二进制的 0 和 1,而偶数的二进制的尾值肯定是0,那么结果如果是0的话就代表左侧的数值是0

    if((A[i]&1)==0) {  
      //如果是偶数的话就给空数组的偶数位添加进去,然后给计数 +2,因为本身是0,一直+2都是偶数index
      B[index1]=A[i];
      index1+=2;
      console.log(B[1]);
      console.log(B.length);
    }else {
      //如果不是,就放到奇数index中
      B[index2]=A[i];
      index2+=2;
    }
  }
  return B;
};
console.log(sortArrayByParityII([4,2,2,3,8,2,5,7,9,9]))
```

