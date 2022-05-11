# ServerStatus-Hotaru
云探针、多服务器探针、云监控、多服务器云监控

基于 ServerStatus-Toyo 最新版本稍作修改。

## 特性

服务端客户端脚本支持系统：Centos 7、Debian 8、Ubuntu 15.10 及以上、ArchLinux

Python 客户端：支持 Python 版本：Python 2.7+

Go 客户端：如果您的客户端环境无法使用 Python， 可以使用 Go 编写的客户端

开源地址：https://github.com/cokemine/ServerStatus-goclient

流量计算：客户端可以选择使用 vnStat 按月计算流量，会自动编译安装最新版本vnStat（ArchLinux 会从软件源安装最新版本）。如不使用 vnStat ，则默认计算流量方式为重启后流量清零。请注意 ServerStatus 不会把协议为 GPLv2 的 vnStat 作为必须的依赖。

前端基于 Vue 3.0 和 SemanticUI 制作，如需修改前端建议自行修改打包。

前端所使用一些静态资源见前端仓库下的声明。

前端开源地址：https://github.com/cokemine/hotaru_theme

## 其他说明

ServerStatus-Hotaru 将会停留在轻量级的 ServerStatus，不会再添加新的功能

如果你有以下需求：

1、服务端更低的 IO 占用

2、Websocket 支持

3、Docker 支持

4、更方便服务器的顺序调整

5、客户端掉线 Telegram Bot 通知

6、使用 Web 管理、添加、修改客户端信息

7、等等

欢迎使用 NodeStatus: https://github.com/cokemine/nodestatus

本项目仍会继续维护

## 安装方法

服务端：

```bash
wget https://raw.githubusercontent.com/cokemine/ServerStatus-Hotaru/master/status.sh
# wget https://cokemine.coding.net/p/hotarunet/d/ServerStatus-Hotaru/git/raw/master/status.sh 若服务器位于中国大陆建议选择 Coding.net 仓库
bash status.sh s
```

客户端：

```
bash status.sh c
```

## 手动安装服务端

```bash
mkdir -p /usr/local/ServerStatus/server
apt install wget unzip curl vim build-essential
cd /tmp
wget https://github.com/cokemine/ServerStatus-Hotaru/archive/master.zip
unzip master.zip
cd ./ServerStatus-Hotaru-master/server
make #编译生成二进制文件
chmod +x sergate
mv sergate /usr/local/ServerStatus/server
vim /usr/local/ServerStatus/server/config.json #修改配置文件
#下载前端
cd /tmp && wget https://github.com/cokemine/hotaru_theme/releases/latest/download/hotaru-theme.zip
unzip hotaru-theme.zip
mv ./hotaru-theme /usr/local/ServerStatus/web #此为站点根目录，请自行设置
nohup ./sergate --config=config.json --web-dir=/usr/local/ServerStatus/web --port=35601 > /tmp/serverstatus_server.log 2>&1 & #默认端口35601
```

## 手动安装客户端

使用 Psutil 版客户端即可使 ServerStatus 客户端在 Windows 等其他平台运行

```powershell
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py # 若未安装pip
python get-pip.py
python pip install psutil
# 修改 status-psutil.py
python status-psutil.py
```

Linux 版客户端支持绝大部分 Linux 发行版系统，一般不需要使用 psutil 版客户端。

```bash
apt install python3 python3-pip wget
pip3 install psutil
wget https://raw.githubusercontent.com/cokemine/ServerStatus-Hotaru/master/clients/status-psutil.py
vim status-psutil.py #修改客户端配置文件
python3 status-psutil.py
# https://raw.githubusercontent.com/cokemine/ServerStatus-Hotaru/master/clients/status-client.py 默认版本无需 psutil 依赖
```

## 更新前端

默认服务端更新不会更新前端。因为更新前端会导致自己自定义的前端消失。

```bash
rm -rf /usr/local/ServerStatus/web/*
wget https://github.com/cokemine/hotaru_theme/releases/latest/download/hotaru-theme.zip
unzip hotaru-theme.zip
mv ./hotaru-theme/* /usr/local/ServerStatus/web/
service status-server restart
# systemctl restart status-server
```

## 关于前端旗帜图标

目前通过脚本使用旗帜图标仅支援当前国家/地区在 ISO 3166-1 标准里，否则可能会出现无法添加的情况，如欧盟 `EU`，但是前端是具备该旗帜的。你可能需要手动加入。方法是修改`/usr/local/ServerStatus/server/config.json`，将你想修改的服务器的`region`改成你需要的。

同时，前端还具备以下特殊旗帜，可供选择使用，启用也是需要上述修改。

Transgender flag: `trans`

Rainbow flag: `rainbow`

Pirate flag: `pirate`

## Toyo版本修改方法

如果你使用 Toyo 版本或其他版本的 ServerStatus，请备份你的config文件并重新编译安装本版本服务端

配置文件: /usr/local/ServerStatus/server/config.json 备份并自行添加`region`

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

替换配置文件，重启 ServerStatus

## 效果演示

![](https://i.imgur.com/utfcHPV.png)

## 相关开源项目 ： 
* ServerStatus-Toyo：https://github.com/ToyoDAdoubiBackup/ServerStatus-Toyo MIT License
* ServerStatus：https://github.com/BotoX/ServerStatus WTFPL License
* mojeda's ServerStatus: https://github.com/mojeda/ServerStatus WTFPL License -> GNU GPLv3 License (ServerStatus is a full rewrite of mojeda's ServerStatus script and not affected by GPL)
* BlueVM's project: http://www.lowendtalk.com/discussion/comment/169690#Comment_169690 WTFPL License

## 感谢

* i18n-iso-countries: https://github.com/michaelwittig/node-i18n-iso-countries MIT License (To convert country name in Chinese to iso 3166-1 and check if the code is valid)
* jq: https://github.com/stedolan/jq CC BY 3.0 License
* caddy: https://github.com/caddyserver/caddy Apache-2.0 License
* twemoji: https://github.com/twitter/twemoji CC-BY 4.0 License (The flag icons are designed by Twitter)

