## scp
cp是拷贝的意思，s是secure安全的意思，可以用来传输文件。  

格式是 `spc source_file destination_file`， source_file表示源文件也就是被拷贝的文件。

### 示例
`scp file.txt root@0.0.0.0:/root`，这就是把本机的文件拷贝到云服务器上，当然，两者的位置可以互换下，就变成了从服务器拷贝文件到本机了。

还可以添加 `-P` 参数修改端口号，`scp -P 7821 file.txt root@0.0.0.0:/root`.
