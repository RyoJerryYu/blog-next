---
tags:
- Linux
- systemctl
- journalctl
- timedatectl
- BasicKnowledge
- Operation
title: Linux Systemd
---

#Linux #systemctl #journalctl #timedatectl #BasicKnowledge #Operation 

每一个 Unit 都有一个配置文件，告诉 Systemd 怎么启动这个 Unit 。

Systemd 默认从目录/etc/systemd/system/读取配置文件。但是，里面存放的大部分文件都是符号链接，指向目录/usr/lib/systemd/system/，真正的配置文件存放在那个目录。

systemctl enable命令用于在上面两个目录之间，建立符号链接关系。

```
$ sudo systemctl enable clamd@scan.service
# 等同于
$ sudo ln -s '/usr/lib/systemd/system/clamd@scan.service' '/etc/systemd/system/multi-user.target.wants/clamd@scan.service'
```
如果配置文件里面设置了开机启动，systemctl enable命令相当于激活开机启动。

与之对应的，systemctl disable命令用于在两个目录之间，撤销符号链接关系，相当于撤销开机启动。

```
$ sudo systemctl disable clamd@scan.service
```
配置文件的后缀名，就是该 Unit 的种类，比如sshd.socket。如果省略，Systemd 默认后缀名为.service，所以sshd会被理解成sshd.service。


### 简单例子

```
[Unit]
Description=Ethereum go client
After=syslog.target network.target

[Service]
Type=simple
WorkingDirectory=/home/ec2-user
ExecStart=/home/ec2-user/bin/geth --http --http.addr 0.0.0.0 --http.vhosts '*' --ws --ws.addr 0.0.0.0 --ws.origins '*' --rinkeby
User=ec2-user
Group=ec2-user
KillMode=process
KillSignal=SIGTERM
Restart=on-failure

[Install]
WantedBy=default.target
```

# timedatectl 

时间管理

设置时区
```shell
sudo timedatectl set-timezone zone
```

查看
```shell
timedatectl status
```

# 日志

journalctl

查看所有日志: 不加任何参数
```
journalctl
```

按单位
```
journalctl -u geth
```


参考：
- https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html