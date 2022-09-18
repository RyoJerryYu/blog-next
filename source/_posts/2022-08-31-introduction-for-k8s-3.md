---
title: Kubernetes 入门 （3）
date: 2022-09-03 19:51:11
tags:
  - Kubernetes
  - DevOps
  - Docker
  - Cloud Native
---

# Kubernetes 架构

- API Server ： 所有资源定义状态全部存在 etcd 中

关键：所有东西都是资源
可以通过 Controller 来管理资源
Pod 这种资源是特别的，只有 Pod 可以“跑”起来

- Controller Manager ： 负责事件分发，各个 Controller 只监听自己关心的事件
- Sceduler ： 监听集群中没有被 Schedule 的 Pod ，通过筛选、打分来找到最适合部署的 Node ，然后将 Node 信息写入 Pod 的资源定义中
- Kubelet ： 监听被 Scedule 到该 Node 上的 Pod ，与容器运行时交互创建容器
- kube-proxy, kube-dns, 等

# 更高级的部署方式（二）

- 自定义资源与自定义控制器与 Operator
  https://operatorhub.io/

# 基于 K8s 的云原生生态
云原生的定义 http://icyfenix.cn/immutable-infrastructure/msa-to-cn.html

### 可观察性 Observability

tracing:
- jaeger, zepkin

metrics:
- prometheus

logging:
- fluentd
- loki

Open Telemetry

### 云原生的 CI/CD

- Tekton
https://tekton.dev/

- Jenkins X
https://jenkins-x.io/

### GitOps

- Argo CD
- Flux2 CD

- Progressive Delivery: Flagger VS Argo Rollout
- 

### Service Mesh

- istio

### K8s 中的 FaaS

- Knative = Google Cloud Run

# k8s 与 AWS

- ELB Controller
- External DNS
- 卷储存 EBS
- IAM Profile


<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
