# 计算机单位

## 容量单位

在物理层面,计算机只记录高低电平信息,理论上只认识0(低电平)和1(高电平).

这就是最基础的计算机单位 **bit 比特位**.

当然这太小了,所以有了一些更大的存储单位.
&emsp;|bit|Byte|KB|MB|GB|TB|PB|EB
:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
名字|比特位|字节|千字节|兆字节|吉字节|太字节|拍字节|艾字节
比例|-|8bits|1024B|1024KB|1024MB|1024GB|1024TB|1024PB
常见设备|门电路|-|寄存器|高速缓存|内存/硬盘|硬盘|云硬盘|数据仓库

除了**比特位**和**字节**是8进制位,其他的都是**1024**进制的.
>1024其实就是2的10次方.

像百度云盘之类的就是PB级别的,像腾讯淘宝的服务器,就是EB级别的.

***
### 为什么网上购买的500G硬盘,实际到手只有465G?

这因为硬盘厂商一般用10进制位标记容量,可以计算一下,`500 * 1000 * 1000 * 1000`,再除以1024的三次方,就会约等于465.

其实也不是硬盘厂商故意诈骗,你可以想象一下,一块方方正正的区域,是正好放置1000个内容,严丝合缝.强行放置1024个着实有点得不偿失.

## 速度单位

我们常说宽带有100M,然而这里的 M 就不是我们上面讲的容量了.而是速度单位 **Mbps** 了.

>为啥我拉了个电信100M光纤,测试峰值速度只有12M每秒?

这是因为 `100M/s = 100Mbps = 100Mbit/s`,前面说了,比特位bit的换算是8进制位的.所以真正的网速是`(100/8)MB/S`(应该说是拉了100个千比特位的光纤).