# String 字符串

## indexOf()/lastIndexOf()/includes()

前两者都一样,未找到文本,均返回 -1.两种方法都接受作为检索起始位置的第二个参数。includes返回的是true和false

## search()

看着和indexOf(),区别在于,`search()`是可以用正则去搜索,但是没有第二个参数.

## startsWith()/endsWith()

查询是否以什么什么开头(结尾)，同样能接收2个参数，1个参数的话在全局找，2个参数的话则从填写的位置往后找，找到返回true，没找到返回false。

## slice/substring/substr

这三种都是提取部分字符串

### slice()
提取字符串的某个部分并在新字符串中返回被提取的部分。

该方法设置两个参数：起始索引（开始位置），终止索引（结束位置）.

```js
var str = "Apple, Banana, Mango";
var res = str.slice(7,13); // Banana
```
如果某个参数为负，则从字符串的结尾开始计数。

如果省略第二个参数，则该方法将裁剪字符串的剩余部分：

### substring()

`substring()` 类似于 `slice()`。不同之处在于 `substring()` 无法接受负的索引。

### replace() 替换字符串内容

另一个值替换在字符串中指定的值,不会改变调用它的字符串。它返回的是新字符串。

## toUpperCase()/toLowerCase()

转成大写和转成小写.

## concat()

连接两个或多个字符串：
```js
var text = "Hello" + " " + "World!";
var text = "Hello".concat(" ","World!");
// 这两行代码是等效的
```

## String.trim()

删除字符串两端的空白符.

## charAt()/charCodeAt()/[]

### charAt() 返回对应的字符
```js
var str = "HELLO WORLD";
str.charAt(0); // 返回 H
```

### charCodeAt() 返回对应的字符 unicode 编码
```js
var str = "HELLO WORLD";
str.charCodeAt(0); // 返回 72
```

### [] 属性索引是ES5添加的.
它是只读的,`str[0] = "A"` 不会产生错误（但也不会工作！）.

## split()

**将字符串转换为数组**
```js
var txt = "a,b";
txt.split(","); // ['a','b']
```

## repeat()

能将原字符串重复几次，并返回一个新的字符串，注意：如果输入的是小数则会被向下取整，NaN会被当做0，输入其他的则会报错。
```js
let str = 'a';
console.log(str.repeat(3)); // 'aaa'
```

## padStart()/padEnd()

用于头部/尾部补全，接收2个参数，第一个参数是补全后的字符串的最大长度，第二个是要补的字符串，返回的是补全后的字符串。如果原字符串长度大于第一个参数，则会返回原字符串。如果不写第二个参数，则会用空格替补。


```js
var str = "ab";
str.padStart(2,'c'); // 'ab' 
str.padStart(3,); // ' ab' 
str.padStart(3,'c'); // 'cab' 
```