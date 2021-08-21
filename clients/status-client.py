# -*- coding: utf-8 -*-
# Support Python Version 2.7 to 3.7
# Update by: https://github.com/CokeMine/ServerStatus-Hotaru

import socket
import time
import re
import os
import json
import subprocess
from collections import deque

SERVER = "127.0.0.1"
PORT = 35601
USER = "USER"
PASSWORD = "USER_PASSWORD"
INTERVAL = 1  # 更新间隔，单位：秒


def check_interface(net_name):
    net_name = net_name.strip()
    invalid_name = ['lo', 'tun', 'kube', 'docker', 'vmbr', 'br-', 'vnet', 'veth']
    return not any(name in net_name for name in invalid_name)


def get_uptime():
    with open('/proc/uptime', 'r') as f:
        uptime = f.readline().split('.')
    return int(uptime[0])


def get_memory():
    re_parser = re.compile(r'(\S*):\s*(\d*)\s*kB')
    result = dict()
    for line in open('/proc/meminfo'):
        match = re_parser.match(line)
        if match:
            result[match.group(1)] = int(match.group(2))

    mem_total = float(result['MemTotal'])
    mem_free = float(result['MemFree'])
    buffers = float(result['Buffers'])
    cached = float(result['Cached'])
    mem_used = mem_total - (mem_free + buffers + cached)
    swap_total = float(result['SwapTotal'])
    swap_free = float(result['SwapFree'])
    return int(mem_total), int(mem_used), int(swap_total), int(swap_free)


def get_hdd():
    p = subprocess.check_output(
        ['df', '-Tlm', '--total', '-t', 'ext4', '-t', 'ext3', '-t', 'ext2', '-t', 'reiserfs', '-t', 'jfs', '-t', 'ntfs',
         '-t', 'fat32', '-t', 'btrfs', '-t', 'fuseblk', '-t', 'zfs', '-t', 'simfs', '-t', 'xfs']).decode('utf-8')
    total = p.splitlines()[-1]
    used = total.split()[3]
    size = total.split()[2]
    return int(size), int(used)


def get_load():
    return round(os.getloadavg()[0], 1)


def get_cpu_time():
    with open('/proc/stat', 'r') as stat_file:
        time_list = stat_file.readline().split()[1:]
    time_list = list(map(int, time_list))
    return sum(time_list), time_list[3]


def get_cpu():
    old_total, old_idle = get_cpu_time()
    time.sleep(INTERVAL)
    total, idle = get_cpu_time()
    return round(100 - float(idle - old_idle) / (total - old_total) * 100.00, 1)


def get_traffic_vnstat():
    vnstat = os.popen('vnstat --oneline b').readline()
    if "Not enough data available yet" in vnstat:
        return 0, 0
    v_data = vnstat.split(';')
    net_in = int(v_data[8])
    net_out = int(v_data[9])
    return net_in, net_out


class Network:
    def __init__(self):
        self.rx = deque(maxlen=10)
        self.tx = deque(maxlen=10)
        self._get_traffic()

    def _get_traffic(self):
        net_in = 0
        net_out = 0
        re_parser = re.compile(r'([^\s]+):[\s]*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+('
                               r'\d+)\s+(\d+)\s+(\d+)')
        with open('/proc/net/dev') as f:
            for line in f.readlines():
                net_info = re_parser.findall(line)
                if net_info:
                    if check_interface(net_info[0][0]):
                        net_in += int(net_info[0][1])
                        net_out += int(net_info[0][9])
        self.rx.append(net_in)
        self.tx.append(net_out)

    def get_speed(self):
        self._get_traffic()
        avg_rx = 0
        avg_tx = 0
        queue_len = len(self.rx)
        for x in range(queue_len - 1):
            avg_rx += self.rx[x + 1] - self.rx[x]
            avg_tx += self.tx[x + 1] - self.tx[x]
        avg_rx = int(avg_rx / queue_len / INTERVAL)
        avg_tx = int(avg_tx / queue_len / INTERVAL)
        return avg_rx, avg_tx

    def get_traffic(self):
        queue_len = len(self.rx)
        return self.rx[queue_len - 1], self.tx[queue_len - 1]


def get_network(ip_version):
    if ip_version == 4:
        host = 'ipv4.google.com'
    elif ip_version == 6:
        host = 'ipv6.google.com'
    else:
        return False
    try:
        socket.create_connection((host, 80), 2).close()
        return True
    except Exception:
        return False


if __name__ == '__main__':
    socket.setdefaulttimeout(30)
    while True:
        try:
            print('Connecting...')
            s = socket.create_connection((SERVER, PORT))
            data = s.recv(1024).decode()
            if data.find('Authentication required') > -1:
                s.send((USER + ':' + PASSWORD + '\n').encode('utf-8'))
                data = s.recv(1024).decode()
                if data.find('Authentication successful') < 0:
                    print(data)
                    raise socket.error
            else:
                print(data)
                raise socket.error

            print(data)
            if data.find('You are connecting via') < 0:
                data = s.recv(1024).decode()
                print(data)

            timer = 0
            check_ip = 0
            if data.find('IPv4') > -1:
                check_ip = 6
            elif data.find('IPv6') > -1:
                check_ip = 4
            else:
                print(data)
                raise socket.error

            traffic = Network()
            while True:
                CPU = get_cpu()
                NetRx, NetTx = traffic.get_speed()
                NET_IN, NET_OUT = traffic.get_traffic()
                Uptime = get_uptime()
                Load = get_load()
                MemoryTotal, MemoryUsed, SwapTotal, SwapFree = get_memory()
                HDDTotal, HDDUsed = get_hdd()

                array = {}
                if not timer:
                    array['online' + str(check_ip)] = get_network(check_ip)
                    timer = 150
                else:
                    timer -= 1 * INTERVAL

                array['uptime'] = Uptime
                array['load'] = Load
                array['memory_total'] = MemoryTotal
                array['memory_used'] = MemoryUsed
                array['swap_total'] = SwapTotal
                array['swap_used'] = SwapTotal - SwapFree
                array['hdd_total'] = HDDTotal
                array['hdd_used'] = HDDUsed
                array['cpu'] = CPU
                array['network_rx'] = NetRx
                array['network_tx'] = NetTx
                array['network_in'] = NET_IN
                array['network_out'] = NET_OUT
                s.send(("update " + json.dumps(array) + '\n').encode('utf-8'))
        except KeyboardInterrupt:
            raise
        except socket.error:
            print('Disconnected...')
            # keep on trying after a disconnect
            if 's' in locals().keys():
                del s
            time.sleep(3)
        except Exception as e:
            print('Caught Exception:', e)
            if 's' in locals().keys():
                del s
            time.sleep(3)
