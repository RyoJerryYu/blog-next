---
title: Kubernetes Roadmap
date: 2022-08-13 17:45:31
tags:
---

# 容器， Docker 与 K8s

我们知道 K8s 利用了容器虚拟化技术。而说到容器虚拟化就要说 Docker 。可是，容器到底是什么？ Docker 又为我们做了些什么？我们又为什么要用 K8s ？

## 关于容器虚拟化

> 要把一个不知道打过多少个升级补丁，不知道经历了多少任管理员的系统迁移到其他机器上，毫无疑问会是一场灾难。 —— Chad Fowler 《Trash Your Servers and Burn Your Code》

"Write once, run anywhere" 是 Java 曾经的口号。 Java 企图通过 JVM 虚拟机来实现一个可执行程序在多平台间的移植性。但我们现在知道， Java 语言并没能实现他的目标，会在操作系统调用、第三方依赖丢失、两个程序间依赖的冲突等各方面出现问题。

要保证程序拉下来就能跑，最好的方法就是把程序和依赖打包到一起，然后将外部环境隔离起来。容器虚拟化技术就是为了解决这个。

与常说的虚拟机不同， Docker 等各类容器是用隔离名称空间的方式进行资源隔离的。 Linux 系统的内核直接提供了名称空间隔离的能力，是针对进程设计的访问隔离机制，可以进行一些资源封装。

| 名称空间     | 隔离内容                      | 内核版本 |
| :----------- | :---------------------------- | :------- |
| Mount        | 文件系统与路径等              | 2.4.19   |
| UTS          | 主机的Hostname、Domain names  | 2.6.19   |
| IPC          | 进程间通信管道                | 2.6.19   |
| PID          | 独立的进程编号空间            | 2.6.24   |
| Network      | 网卡、IP 地址、端口等网络资源 | 2.6.29   |
| User         | 进程独立的用户和用户组        | 3.8      |
| Cgroup       | CPU 时间片，内存分页等        | 4.6      |
| Time <- New! | 进程独立的系统时间            | 5.6      |

值得注目的是， Linux 系统提供了 Cgroup 名称空间隔离的支持。通过隔离 Cgroup ，可以给单独一个进程分配 CPU 占用比率、内存大小、外设 I/O 访问权限等。再配合 IPC 、 PID 等的隔离，可以让被隔离的进程看不到同一实体机中其他进程的信息，就像是独享一整台机器一样。

由于容器虚拟化技术直接利用了宿主机操作系统内核，因此远远要比虚拟机更轻量，也更适合用来给单个程序进行隔离。但也同样由于依赖了宿主机内核，在不同的架构、不同种类的操作系统间容器可能不能移植。

## 关于 Docker

在介绍 K8s 之前，我们要先搞清楚 Docker 是什么。或者说，我们平时说的“ Docker ”是什么？

我们平时说的 Docker ，可能是以下几个东西：

- Docker Engine: 在宿主机上跑的一个进程，专门用来管理各个容器的生命周期、网络连接等，还暴露出一些 API 供外部调用。有时会被称为 Docker Daemon 或是 dockerd 。
- Docker Client: 命令行中的 `docker` 命令，其实只会跟 Docker Server 通信，不会直接创建销毁一个容器进程。
- Docker Container: 宿主机上运行的一组被资源隔离的进程，在容器中看来像是独占了一台虚拟的机器，不需要考虑外部依赖。
- Docker Image: 是一个打包好的文件系统，可以从一个 Image 运行出复数个 Container 。 Image 内部包含了程序运行所需的所有文件、库依赖，以及运行时的环境变量等。
- Docker 容器运行时: 是 Docker Engine 中专门管理容器状态、生命周期等的那个组件，原来名为 libcontainer 。[《开放容器交互标准》](https://en.wikipedia.org/wiki/Open_Container_Initiative)制定后， Docker 公司将此部分重构为 [runC 项目](https://github.com/opencontainers/runc)，交给 Linux 基金会管理。而 Docker Engine 中与运行时进行交互的部分则抽象出来成为 [containerd 项目](https://containerd.io/)，捐献给了 CNCF 。

我们平时在 linux 机上运行 `yum install docker` 之类的命令，安装的其实是 Docker Engine + Docker Client 。（而在 Windows 或 MacOS 上安装的 Docker Desktop 其实是一个定制过的 linux 虚拟机。）下面说的 Docker 的功能其实都是指 Docker Engine 的功能。

而 Docker 提供给我们的功能，除了最基础的运行和销毁容器外，还包括了一些容器网络编排、重启策略、文件路径映射、端口映射等功能。

而我认为 Docker 最大的贡献，还是容器的镜像与镜像仓库。有了镜像与镜像仓库，人们就可以把自己的程序与执行环境直接打包成镜像发布，也可以直接拿打包好的镜像来运行容器进行部署，而不需要额外下载或是安装一些东西，也不需要担心程序会与已经跑起来的其他程序冲突。

## 为什么要用 K8s ？

其实 Docker 有一个很强大的工具叫 docker-compose ，可以通过一个 manifest 对多个容器组成的网络进行编排。那为什么我们还需要 K8s 呢？换句话说，有什么事是 Docker 不能做的？而 K8s 设计出来的目标是为了解决什么问题？

首先， Docker 做不到以下的功能：

1. **Docker 不能做跨多主机的容器编排。** docker-compose 再方便，他也只能编排单台主机上的容器。对跨主机的集群编排无能为力。（实际上，用了 Docker-Swarm 后是可以多主机编排的，但一来 Docker-Swarm 出现的比 K8s 晚，而来 Docker-Swarm 功能不如 K8s ，因此用的人很少，我们下面就默认 Docker-Swarm 不存在了。）
2. **Docker 提供的容器部署管理功能不够丰富。** Docker 有一些简单的容器重启策略，但也只是简单的失败后重启之类的，没有完整的应用状态检查等功能。同时，版本升级、缩扩容等策略选择的余地也不多。
3. **Docker 缺乏高级网络功能。**要让 Docker 的容器间进行网络通信，也只能是说把容器放到同一个网络下，然后再通过各自的 Hostname 来找到对方。但实际上，我们更会想要一些负载均衡、自定义域名、选择某些容器端口不暴露之类的功能。
and more...

总的来说， Docker 更关注单台主机上容器怎么跑，而对部署管理的功能则支持不多。而最大的痛点，就是 Docker 对多主机的集群部署支持的实再很差。然而，为了实现多区可用、负载均衡等功能，多主机集群的容器编排又是必不可少的。

K8s 的出现，主要就是为了解决多主机集群上的容器编排问题。

1. **K8s 可以进行多主机调度。**用户只需要描述自己需要运行怎样的应用， K8s 就可以自己选择一个合适的节点进行部署，用户不需要关心自己的应用部署到哪个节点上。
2. **K8s 中一切皆资源。** K8s 有完善的抽象资源机制，用户几乎不需要知道磁盘、网络等任何硬件信息，只需要对着统一的抽象资源进行操作。
3. **K8s 能保证较强的可用性。**除了能跨多主机调度实现多区可用外， K8s 还提供了很完善的缩扩容机制、健康检查机制以及自动恢复机制。

可以说， K8s 是容器编排工具的主流选择。

## K8s 与 Docker 的关系

K8s 与 Docker 关系很复杂，是一个逐渐变化的过程。

一开始 K8s 是完全依赖于 Docker Engine 进行容器启动与销毁的。后来[容器运行时接口（CRI）](https://kubernetes.io/blog/2016/12/container-runtime-interface-cri-in-kubernetes/)、 [CRI-O 标准](https://github.com/cri-o/cri-o)、开放容器交互标准（OCI）等标准逐渐建立，可替代 Docker Engine 的工具越来越多， K8s 中已经完全可以不使用 Docker Engine 了。

[《凤凰架构》](http://icyfenix.cn/)一书中有下面这样一张图来描述 K8s 与 Docker Engine 的关系：

![K8s 与 Docker Engine 的关系](http://icyfenix.cn/assets/img/kubernetes.495f9eae.png)

《凤凰架构》书中[这一章节](http://icyfenix.cn/immutable-infrastructure/container/history.html#%E5%B0%81%E8%A3%85%E9%9B%86%E7%BE%A4%EF%BC%9Akubernetes)详细介绍了 K8s 与 Docker 的历史，我这里就不再赘述。

# 部署一个 Pod

## Pod 示例
## Replica Set
## Deployment　
## Job 与 CronJob
## Stateful Set
## Daemon Set

※ Pod 的检查机制
※ Pod 的重启机制
※ Pod 的环境变量
※ 资源的名称空间
※ 部署模式 initContainer 与 SideCar 

# 其他资源

## 网络

Service
- 域名解析
- 种类: 
    - ClusterIP
    - NodePort
    - LoadBalancer
    - ExternalName
    - Headless Service

外部访问
- NodePort
- LB
- Ingress

## 储存

Presistent Volume 与 Presistent Volume Claim 与 Storage Class

## 配置

Config Map 与 Secret

# Kubernetes 架构

- API Server
- Controller Manager
- Sceduler
- Kubelet
- kube-proxy, kube-dns, 等

# 更高级的部署方式

- Helm Chart：其实是 go template 代码生成
- kustomize
- 自定义资源与自定义控制器与 Operator

# Furder More

## k8s 与 AWS

- ELB Controller
- External DNS
- 卷储存 EBS
- IAM Profile

## k8s 与云原生
云原生的定义 http://icyfenix.cn/immutable-infrastructure/msa-to-cn.html
- Service Mesh: istio
- GitOpts: argo CD 与 flux CD
- Progressive Delivery: Flagger
- Service Proxy: envoy
- Of course: etcd, jaeger, prometheus, fluentd, open telemetry


<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
