# ServerStatus-Hotaru
云探针、多服务器探针、云监控、多服务器云监控

基于ServerStatus-Toyo最新版本稍作修改，不太会脚本什么的，前端也垃圾。见谅。

默认图片素材来源: Pixiv:  86597206 默认背景来源：nisekoi.jp

如需用做商业用途请更换主题图片。

For commercial use, please replace the images.

若本仓库用到的一些素材侵犯了您的版权，请联系我处理，谢谢。

If some of the assets used in this repo infringe your copyright, please contact me, thanks.

## 特性

前端基于Vue 3.0和SemanticUI制作，如需修改前端建议自行修改打包：

前端开源地址：https://github.com/CokeMine/Hotaru_theme

客户端支持Python版本：Python2.7 - Python3.7

客户端可以选择使用vnStat按月计算流量，会自动编译安装最新版本vnStat。如不使用vnStat，则默认计算流量方式为重启后流量清零。

## 安装方法

请见：https://www.cokemine.com/serverstatus-hotaru.html

服务端：

```bash
wget https://raw.githubusercontent.com/cokemine/ServerStatus-Hotaru/master/status.sh
# wget https://cokemine.coding.net/p/hotarunet/d/ServerStatus-Hotaru/git/raw/master/status.sh 若服务器位于中国大陆建议选择Coding.net仓库
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
   "disabled": false,
   "region": "US"
},
```

替换配置文件，重启ServerStatus

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
cd /tmp && wget https://github.com/cokemine/Hotaru_theme/releases/latest/download/hotaru-theme.zip
unzip hotaru-theme.zip
mv ./hotaru-theme /usr/local/ServerStatus/web #此为站点根目录，请自行设置
nohup ./sergate --config=config.json --web-dir=/usr/local/ServerStatus/web --port=35601 > /tmp/serverstatus_server.log 2>&1 & #默认端口35601
```

## 更新前端

默认服务端更新不会更新前端。因为更新前端会导致自己自定义的前端消失。

```bash
rm -rf /usr/local/ServerStatus/web/*
wget "https://github.com/cokemine/Hotaru_theme/releases/download/latest/hotaru-theme.zip"
unzip hotaru-theme.zip
mv ./hotaru-theme/* /usr/local/ServerStatus/web/
service status-server restart
```

## 前端旗帜图标

目前通过脚本使用旗帜图标仅支援当前国家/地区在ISO 3166-1标准里，否则可能会出现无法添加的情况，如欧盟 `EU`，但是前端是具备该旗帜的。你可能需要手动加入。方法是修改`/usr/local/ServerStatus/server/config.json`，将你想修改的服务器的`region`改成你需要的。

同时，前端还具备以下特殊旗帜，可供选择使用，启用也是需要上述修改。

Transgender flag: `trans`

Rainbow flag: `rainbow`

Pirate flag: `pirate`

## Psutil版客户端

使用Psutil版即可使ServerStatus客户端在Windows等平台运行

```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py ::若未安装pip
python get-pip.py
python pip install psutil
%修改status-psutil.py%
python status-psutil.py
```

Linux版客户端支持绝大部分Linux发行版系统，一般不需要使用`psutil`

```bash
apt install python3 python3-pip wget
pip3 install psutil
wget https://raw.githubusercontent.com/cokemine/ServerStatus-Hotaru/master/clients/status-psutil.py
vim status-psutil.py #修改客户端配置文件
python3 status-psutil.py
# https://raw.githubusercontent.com/cokemine/ServerStatus-Hotaru/master/clients/status-client.py 默认版本无需psutil依赖
```

## 效果演示

![RktuH.png](https://img.ams1.imgbed.xyz/2021/02/04/1nfJF.png)

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

