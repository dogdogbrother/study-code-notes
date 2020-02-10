# 组合模式
组合模式其实就是把一个个相似的组件用拼积木的形式去组合在一起。一个组合对象下面有可能还有一个组合对象，或者还有叶对象。

书中前面有一些铺垫例子，但是我感觉有点简单和啰嗦，我就直接从文件夹例子开始写。

## 模拟文件夹

### 需求
可以创建文件夹，文件夹里面可以有文件夹，也可以有文件，我们可以扫描每个文件夹，会打印出里面包含的所有的文件。  
也有删除文件和文件夹的功能。

### 思路
正常思维来讲，用树嵌套的形式是可以做出来这个需求的，文件夹或是文件就是一个对象，可以通过某个属性来判断它是否是文件夹还是文件。  
扫描文件夹就递归，删除比较麻烦，需要拼接处全部的对象路径，才能 delete 语句。

### 组合模式
要定义 Folder 类和 File 类，代表文件夹和文件。
```js
var Folder = function( name ){
    this.name = name;
    this.parent = null; //增加 this.parent 属性
    this.files = [];
}; 
Folder.prototype.add = function( file ){
    file.parent = this; //设置父对象
    this.files.push( file );
};
Folder.prototype.scan = function(){
    console.log( '开始扫描文件夹: ' + this.name );
    for ( var i = 0, file, files = this.files; file = files[ i++ ]; ){
        file.scan();
    }
}; 
Folder.prototype.remove = function(){
    if ( !this.parent ){ //根节点或者树外的游离节点
        return;
    }
    for ( var files = this.parent.files, l = files.length - 1; l >=0; l-- ){
        var file = files[ l ];
    if ( file === this ){
        files.splice( l, 1 );
    }
    }
}; 
```
给每一个文件夹都设置名字，子文件的数组，和父节点。当我们向这个文件夹内添加文件或是文件夹的时候，就是往子文件数组中添加文件实例，删除某个文件的数据，就是遍历父节点中的所有子节点，如果实例相等，就从父节点中移除此文件。

File 类的实现基本一致,只是没有子文件目录：
```js
var File = function( name ){
    this.name = name;
    this.parent = null;
};
File.prototype.add = function(){
    throw new Error( '不能添加在文件下面' );
};
File.prototype.scan = function(){
    console.log( '开始扫描文件: ' + this.name );
};
File.prototype.remove = function(){
    if ( !this.parent ){ //根节点或者树外的游离节点
        return;
    }
    for ( var files = this.parent.files, l = files.length - 1; l >=0; l-- ){
        var file = files[ l ];
    if ( file === this ){
        files.splice( l, 1 );
    }
    }
}; 
```
最后使用测试下：
```js
var folder = new Folder( '学习资料' );
var folder1 = new Folder( 'JavaScript' );
var file1 = new Folder ( '深入浅出 Node.js' ); 
folder1.add( new File( 'JavaScript 设计模式与开发实践' ) );
folder.add( folder1 );
folder.add( file1 );
folder1.remove(); //移除文件夹
folder.scan(); 
```

## 小结
可以看到，通过这样的组合模式，会让我们对于树的结构更加的灵活。