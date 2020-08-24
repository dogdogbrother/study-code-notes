## 打包和压缩
打包是将多个文件变成总的文件，这个总文件成为 archive，存档归档，linux下常用的打包命令是 tar。

压缩是将大文件通过某些算法变成小文件，linux下常用的压缩命令是 gzip 和 bzip2。

## 打包命令
可以先用 tar 命令打包，例如 `tar -cvf test.tar test/`,把当前test目录打包，可以打包多个文件 `tar -cvf test.tar file1 file2`。

* 参数 c 是create，表示创建
* 参数 v 是verbose，表示冗余，会显示操作细节。
* 参数 f 是file，指定归档文件。

## tf 显示归档内容，但不解开归档。
`tar -tf test.tar`

## -rvf 追加文件
`tar -rvf test.tar file3`

## xvf 解开归档
是 cvf 相反的操作,`tar -xvf test.tar`。x 是 extract 的缩写，表示提取。

## gzip 和 bzip2
* .tar.gz 就是用 gzip 命令压缩后的文件后缀名。 压缩是 `gzip test.tar`，解压是 `guzip test.tar.gz`
* .tar.bz2 就是用 bzip2 命令压缩后的文件后缀名。 压缩是 `bzip2 test.tar`，解压是 `bzip2 test.tar.bz2`

## 统一用 tar 完成归档压缩
其实就是多加个参数，还是调用 gzip 和 bzip2。
* `-zcvf` 压缩， `-zxvf` 解压。(gzip)
* `-jcvf` 压缩， `-jxvf` 解压。(bzip2)

### 可以用 zcat/bzcat,zmore/bzmore,zless/bzless 来显示用 gzip/bzip2 压缩的文件的内容。

### zip 文件的解压缩 就是 unzip/zip。

### rar 不常用，甚至yum远里面都没有rar软件包。