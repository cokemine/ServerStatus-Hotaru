# ServerStatus-Hotaru
云探针、多服务器探针、云监控、多服务器云监控

基于ServerStatus-Toyo最新版本稍作修改，不太会脚本什么的，前端也垃圾。见谅。

默认图片素材来源: Pixiv:  86597206 默认背景来源：nisekoi.jp

如需用做商业用途请更换主题图片。

For commercial use, please replace the images.

若本仓库用到的一些素材侵犯了您的版权，请联系我处理，谢谢。

If some of the assets used in this repo infringe your copyright, please contact me, thanks.

## 特性

前端基于Vue 3.0和SemanticUI制作，如需修改前端建议自行修改打包（也可以尝试直接格式化打包后的js/css文件后修改，但是不建议）：

前端开源地址：https://github.com/CokeMine/Hotaru_theme

客户端支持Python版本：Python2.7 - Python3.7

客户端可以选择使用vnStat按月计算流量，会自动编译安装最新版本vnStat。如不使用vnStat，则默认计算流量方式为重启后流量清零。

## 安装方法

请见：https://www.cokemine.com/serverstatus-hotaru.html

服务端：

```
wget https://cdn.jsdelivr.net/gh/Subeting/ServerStatus-Hotaru/status.sh -O status.sh
bash status.sh s
```

客户端：

```
wget https://cdn.jsdelivr.net/gh/Subeting/ServerStatus-Hotaru/status.sh -O status.sh
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
   "disabled": false,
   "region": "US"
  },
```

替换配置文件，重启ServerStatus

## 手动安装服务端

```
apt install wget unzip curl make build-essential
wget https://github.com/CokeMine/ServerStatus-Hotaru/archive/master.zip
unzip master.zip
cd /root/ServerStatus-Hotaru-master/server
make #手动编译生成二进制文件
chmod +x sergate
vim config.json #修改配置文件
cp -r ../web/* /home/wwwroot/public #此为站点根目录，请自行设置
./sergate --config=config.json --web-dir=/home/wwwroot/public
```

## Psutil版

使用Psutil版即可使ServerStatus客户端在Windows等平台运行

```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py ::若未安装pip
python get-pip.py
python pip install psutil
%修改status-psutil.py%
python status-psutil.py
```

Linux：

```
apt install python3 python3-pip wget
pip3 install psutil
wget https://raw.githubusercontent.com/CokeMine/ServerStatus-Hotaru/master/clients/status-psutil.py
vim status-psutil.py #修改客户端配置文件
python3 status-psutil.py
```

## 效果演示

![RktuH.png](https://img.ams1.imgbed.xyz/2021/02/04/1nfJF.png)

## 相关开源项目 ： 
* ServerStatus-Toyo：https://github.com/ToyoDAdoubiBackup/ServerStatus-Toyo
* ServerStatus：https://github.com/BotoX/ServerStatus
* mojeda's ServerStatus: https://github.com/mojeda/ServerStatus
* BlueVM's project: http://www.lowendtalk.com/discussion/comment/169690#Comment_169690
