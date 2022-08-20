---
title: introduction-for-k8s-3
date: 2022-08-20 21:56:52
tags:
---


# 其他资源

### 储存

Presistent Volume 与 Presistent Volume Claim 与 Storage Class

### 网络

为什么需要 Service： Pod 可能会挂掉，换成新的之后 IP 会变，找不到就会很尬。
Service 会根据选择器来不断更新指向的 IP

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

### 配置

Config Map 与 Secret

# Kubernetes 架构

- API Server
- Controller Manager
- Sceduler
- Kubelet ： 是 Kubelet 在对 Pod 做生存检测
- kube-proxy, kube-dns, 等

# 更高级的部署方式

- Helm Chart：其实是 go template 代码生成
- kustomize
- 自定义资源与自定义控制器与 Operator

# Furder More

### k8s 与 AWS

- ELB Controller
- External DNS
- 卷储存 EBS
- IAM Profile

### k8s 与云原生
云原生的定义 http://icyfenix.cn/immutable-infrastructure/msa-to-cn.html
- Service Mesh: istio
- GitOpts: argo CD 与 flux CD
- Progressive Delivery: Flagger
- Service Proxy: envoy
- Of course: etcd, jaeger, prometheus, fluentd, open telemetry
