# ServerStatus-Hotaru
云探针、多服务器探针、云监控、多服务器云监控

基于ServerStatus-Toyo最新版本稍作修改，不太会脚本什么的，前端也垃圾。见谅

Test v0.022：头图来源：Pixiv：72725286

## 特性

模板来自：<https://www.hostloc.com/thread-494384-1-1.html>

以及：<https://www.hostloc.com/thread-493783-1-1.html>

稍作修改，多了个Region调用国家/地区旗帜。

## 安装方法

请见：https://www.cokemine.com/serverstatus-hotaru.html

服务端：

```bash
wget https://raw.githubusercontent.com/CokeMine/ServerStatus-Hotaru/master/status.sh
bash status.sh s
```

客户端：

```
bash status.sh c
```

## 修改方法

如果你使用Toyo版本或原版本，请备份你的config文件并重新编译安装本版本服务端

配置文件：/usr/local/ServerStatus/server/config.json备份并自行添加Region

```json
{
   "username": "Name",
   "password": "Password",
   "name": "Your Servername",
   "type": "KVM",
   "host": "None",
   "location": "洛杉矶",
   "disabled": false ,
   "region": "US"
  },
```

替换配置文件，重启ServerStatus

## 手动安装服务端

```
wget https://github.com/CokeMine/ServerStatus-Hotaru/archive/master.zip
unzip master.zip
cd /root/ServerStatus-Hotaru-master/server
make
vim config.json #修改配置文件
cp -r ../web/* /home/wwwroot/ #此为站点根目录
./sergate --config=config.json --web-dir=/home/wwwroot
```

## Psutil版

使用Psutil版即可使ServerStatus在Windows等平台运行

```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
python pip install psutil
%修改status-psutil.py%
python status-psutil.py
```

## Darkmode

前端已支持Darkmode，点击页面右下角小图标即可切换Darkmode（样式可能不尽如人意，各位有更好的样式或实现方法欢迎提交PR）

如何关闭Darkmode（按钮都不想要）：注释掉index.html第99行即可

## 效果演示

![](https://i.loli.net/2019/04/05/5ca74fb05338f.png)

![](https://i.loli.net/2019/04/05/5ca74fc86db96.png)

前端欢迎自定义。

## 相关开源项目 ： 
* ServerStatus-Toyo：https://github.com/ToyoDAdoubiBackup/ServerStatus-Toyo
* ServerStatus：https://github.com/BotoX/ServerStatus
* mojeda's ServerStatus: https://github.com/mojeda/ServerStatus
* BlueVM's project: http://www.lowendtalk.com/discussion/comment/169690#Comment_169690
