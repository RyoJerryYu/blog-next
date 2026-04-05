---
created_at: 2026-04-04T23:39:06
updated_at: 2026-04-04T23:39:36
---
**调研日期：** 2026-03-28  
**主题：** Kubernetes Pod 生命周期、探针机制与调度原理  
**来源：** Kubernetes 官方文档 v1.35  
**版本：** v2.0（含深入讨论补充）

---

## 📌 TL;DR

Kubernetes Pod 遵循明确定义的生命周期：从 `Pending` 开始，经过 `Running`，最终进入 `Succeeded` 或 `Failed` 终止状态。Pod 的健康状况由三种探针（Liveness、Readiness、Startup）监控，调度器通过多阶段过滤和评分机制将 Pod 分配到最优节点。

**核心洞察：**
- **Pod Phase、Container State、ready 状态** 是三个独立但相关的概念
- **控制器决策依据是 ready 状态，而不是 Pod Phase**
- **探针成功/失败都会影响 ready 状态，但不一定影响 Phase**
- **Deployment 无序并行更新，StatefulSet 有序串行更新**

---

## 1. Pod 生命周期概览

### 1.1 三个核心概念的关系

```
Pending → Running → Succeeded/Failed
   ↑         ↑
   └─────────┘ (容器重启)
```

```
┌─────────────────────────────────────────────────────────┐
│  Pod 生命周期 (Pod Lifecycle)                            │
│  → 抽象概念：Pod 从创建到删除的完整过程                  │
│  → 不是 API 字段，帮助理解                              │
└─────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│  Pod Phase (5 种)                                        │
│  → Pod 整体的状态摘要                                    │
│  → 一个 Pod 只有一个 Phase                               │
│  → API 正式字段：.status.phase                          │
└─────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│  Container State (3 种)                                  │
│  → 每个容器的状态                                        │
│  → 一个 Pod 可以有 N 个容器，N 个 State                   │
│  → API 字段：.status.containerStatuses                  │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Pod 的五种相位（Phase）

| 相位 | 描述 | 触发条件 |
|------|------|----------|
| **Pending** | Pod 已被集群接受，但容器尚未就绪 | 等待调度、镜像下载中 |
| **Running** | Pod 已绑定节点，至少一个容器正在运行 | 所有容器已创建 |
| **Succeeded** | 所有容器成功终止，不再重启 | 任务完成型工作负载 |
| **Failed** | 所有容器终止，至少一个失败退出 | 非零退出码或被系统终止 |
| **Unknown** | Pod 状态无法获取 | 节点通信故障 |

> ⚠️ **注意：** `CrashLoopBackOff` 和 `Terminating` 是 kubectl 显示的状态提示，不是 Pod 的正式 Phase。

### 1.3 容器的三种状态

| 状态 | 含义 | 常见原因 |
|------|------|----------|
| **Waiting** | 容器尚未开始执行 | 拉取镜像、应用 Secret 数据 |
| **Running** | 容器正常执行中 | postStart hook 已完成 |
| **Terminated** | 容器执行完毕或失败 | 包含退出码、起止时间 |

### 1.4 ready 状态（关键！）

```yaml
status:
  containerStatuses:
  - name: app
    ready: true  # ⭐ 控制器决策的核心依据
```

| 概念                  | 作用         | 数量      | 控制器是否使用      |
| ------------------- | ---------- | ------- | ------------ |
| **Pod Phase**       | Pod 整体状态摘要 | 1 个/Pod | ❌ 不直接用于决策    |
| **Container State** | 每个容器的状态    | N 个/Pod | ❌ 不直接用于决策    |
| **ready**           | 容器是否可接收流量  | N 个/Pod | ✅ **核心决策依据** |


> 🎯 **核心结论：** 控制器（Deployment/StatefulSet）的滚动更新决策基于 **ready 状态**，而不是 Pod Phase！

---

## 2. 容器重启策略（restartPolicy）

### 2.1 Pod 级别重启策略

```yaml
spec:
  restartPolicy: Always|OnFailure|Never  # 默认：Always
```

| 退出码 | Always | OnFailure | Never | Sidecar 容器 |
|--------|--------|-----------|-------|-------------|
| 0 (成功) | 重启 | 不重启 | 不重启 | 总是重启 |
| 非零 (失败) | 重启 | 重启 | 不重启 | 总是重启 |

### 2.2 作用范围

| 版本 | 作用范围 | 配置位置 |
|------|---------|---------|
| **Kubernetes <1.35** | Pod 级别 | `spec.restartPolicy` |
| **Kubernetes ≥1.35** | Pod 级别 + 容器级别覆盖 | `spec.containers[].restartPolicy` |

```yaml
# v1.35+ 容器级别覆盖示例
spec:
  restartPolicy: OnFailure  # 默认策略
  containers:
  - name: main
    restartPolicy: Always   # 覆盖：这个容器总是重启
  - name: init-once
    restartPolicy: Never    # 覆盖：这个容器从不重启
```

### 2.3 与 Pod Phase 的关系

```
restartPolicy 决定容器终止后是否重启
    ↓
容器重启 → Pod 保持 Running
容器不重启 → Pod 进入 Succeeded/Failed
    ↓
间接影响 Pod Phase
```

### 2.4 典型应用场景

| 工作负载类型 | 推荐策略 | 说明 |
|-------------|---------|------|
| **Deployments** | `Always` | 保持应用持续运行 |
| **Jobs** | `OnFailure` 或 `Never` | 批处理任务 |
| **Sidecar 容器** | `Always` (容器级) | 独立于 Pod 策略 |

### 2.5 指数退避重启机制

```
第 1 次重启：10s 延迟
第 2 次重启：20s 延迟
第 3 次重启：40s 延迟
...
最大延迟：300s (5 分钟)
```

**退避重置：** 容器正常运行 10 分钟后，退避计时器重置。

### 2.6 CrashLoopBackOff 排查流程

```bash
# 1. 查看日志
kubectl logs <pod-name>

# 2. 检查事件
kubectl describe pod <pod-name>

# 3. 审查配置（环境变量、挂载卷）
# 4. 检查资源限制
# 5. 本地调试容器镜像
```

---

## 3. 健康检查探针（Probes）

### 3.1 三种探针类型对比

| 探针类型 | 作用 | 失败后果 | 成功后果 | 默认状态 |
|---------|------|---------|---------|---------|
| **livenessProbe** | 判断容器是否存活 | 杀死容器 | 容器继续运行 | Success |
| **readinessProbe** | 判断容器是否就绪 | 移除流量 | **ready=true，接收流量** | Failure (初始) |
| **startupProbe** | 判断应用是否已启动 | 杀死容器 | **启用其他探针** | Success |

### 3.2 探针与 Phase/State/ready 的关系

| 探针 | 成功影响 | 失败影响 | 影响 State? | 影响 Phase? | 影响 ready? |
|------|---------|---------|-----------|-----------|------------|
| **livenessProbe** | 无变化 | 杀死容器 → restartPolicy 判断 | ✅ 间接 | ✅ 间接 | ✅ 间接 |
| **readinessProbe** | **ready=true** | **ready=false**，移除流量 | ❌ | ❌ | ✅ 直接 |
| **startupProbe** | **启用其他探针** | 杀死容器 → restartPolicy 判断 | ✅ 间接 | ✅ 间接 | ✅ 间接 |

> 🎯 **关键：** readinessProbe **只影响 ready 状态**，不影响 Container State 或 Pod Phase！

### 3.3 探针检查机制

| 机制 | 描述 | 成功条件 | 性能注意 |
|------|------|---------|---------|
| **exec** | 执行容器内命令 | 退出码为 0 | ⚠️ fork 多进程，高密度集群慎用 |
| **httpGet** | HTTP GET 请求 | 状态码 200-399 | ✅ 推荐 |
| **tcpSocket** | TCP 端口检查 | 端口开放 | ✅ 推荐 |
| **grpc** | gRPC 健康检查 | status=SERVING | ✅ 推荐 |

### 3.4 探针配置示例

```yaml
containers:
- name: web-app
  image: nginx:1.14.2
  livenessProbe:
    httpGet:
      path: /healthz
      port: 8080
    initialDelaySeconds: 30
    periodSeconds: 10
    timeoutSeconds: 5
    failureThreshold: 3
  readinessProbe:
    httpGet:
      path: /ready
      port: 8080
    initialDelaySeconds: 5
    periodSeconds: 5
  startupProbe:
    httpGet:
      path: /started
      port: 8080
    failureThreshold: 30  # 允许 300s 启动时间
    periodSeconds: 10
```

---

## 4. 调度与 Pod Phase 的关系

### 4.1 调度流程中的 Phase 变化

```
Pod 创建 (无 Phase)
    ↓
调度器绑定节点
    ↓
Pod Phase: Pending  ⭐
    ↓
容器启动
    ↓
Pod Phase: Running  ⭐
```

| 调度阶段 | Pod Phase | 说明 |
|---------|-----------|------|
| 未调度 | 无/Pending | Pod 刚创建 |
| 已调度 | Pending | 等待容器启动 |
| 容器启动 | Running | 至少一个容器运行 |
| 调度失败 | Pending (持续) | 无法找到合适节点 |

### 4.2 Deployment vs StatefulSet 更新策略

| 特性 | Deployment | StatefulSet |
|------|-----------|-------------|
| **Pod 名称** | 每次更新都变化 (带随机 hash) | 保持不变 (db-0, db-1, db-2) |
| **更新顺序** | 无序，可并行 | 有序，从后向前 (N-1→0) |
| **更新速度** | 快 (多个 Pod 同时更新) | 慢 (一次只更新一个) |
| **适用场景** | 无状态应用 (Web、API) | 有状态应用 (数据库、缓存) |
| **存储** | 临时存储，Pod 删除后丢失 | 持久存储 (PVC)，Pod 重建后保留 |
| **调度偏好** | 无偏好 | 优先原节点 (PVC 绑定) |

### 4.3 控制器决策逻辑（核心！）

```
┌─────────────────────────────────────────────────────────┐
│  控制器滚动更新决策依据：                                │
│                                                         │
│  ❌ 不是 Pod Phase (Pending/Running/Succeeded/Failed)   │
│  ✅ 是 Pod ready 状态 (.status.containerStatuses[].ready)│
│                                                         │
│  ready = true  →  Pod 可用，计入可用副本数               │
│  ready = false →  Pod 不可用，不计入可用副本数          │
└─────────────────────────────────────────────────────────┘
```

#### Deployment 滚动更新流程

```
创建新 Pod (v2)
    ↓
新 Pod Pending → Running (ready=false)
    ↓
⚠️ 此时不删除旧 Pod（可用副本数不足）
    ↓
readinessProbe 成功
    ↓
新 Pod ready=true  ⭐
    ↓
✅ 现在删除旧 Pod（可用副本数满足）
```

#### StatefulSet 滚动更新流程

```
终止 db-2 (v1)
    ↓
重建 db-2 (v2)，同名 Pod
    ↓
db-2 Pending → Running (ready=false)
    ↓
⚠️ 等待 db-2 ready
    ↓
db-2 ready=true  ⭐
    ↓
✅ 继续更新 db-1
```

---

## 5. Pod 终止流程（含详细状态变化）

### 5.1 优雅终止时序图（含状态变化）

```
┌─────────────────────────────────────────────────────────────────┐
│  T0: 正常运行                                                    │
│  Pod Phase: Running | 容器 State: Running | ready: true         │
└─────────────────────────────────────────────────────────────────┘
    ↓ kubectl delete pod
┌─────────────────────────────────────────────────────────────────┐
│  T1-T2: API Server 设置 deletionTimestamp                        │
│  Pod Phase: Running | 容器 State: Running | ready: true         │
│  ⚠️ 此时 Pod 仍接收流量！                                        │
└─────────────────────────────────────────────────────────────────┘
    ↓ kubelet 检测到删除标记
┌─────────────────────────────────────────────────────────────────┐
│  T3-T4: 执行 preStop hook (如有)                                 │
│  Pod Phase: Running | 容器 State: Running | ready: false ⭐     │
│  ⭐ ready 立即变 false，停止接收新流量！                          │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│  T5: 发送 SIGTERM 信号                                           │
│  Pod Phase: Running | 容器 State: Running | ready: false        │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│  T6: 从 EndpointSlice 移除                                       │
│  Pod Phase: Running | 容器 State: Running | ready: false        │
│  EndpointSlice: ready=false, serving=false, terminating=true   │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│  T7: 容器优雅关闭中                                              │
│  Pod Phase: Running | 容器 State: Running | ready: false        │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│  T8: 容器退出 (退出码 0)                                         │
│  Pod Phase: Running ⚠️ | 容器 State: Terminated ⭐ | ready: false│
│  ⚠️ 容器已终止，但 Pod Phase 仍为 Running！                       │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│  T9: 宽限期内等待                                                │
│  Pod Phase: Running | 容器 State: Terminated | ready: false    │
│  (多容器 Pod 可能仍有其他容器在运行)                              │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│  T10: 所有容器终止，Pod Phase 变化                                │
│  Pod Phase: Succeeded/Failed ⭐ | 容器 State: Terminated        │
│  ⭐ Pod Phase 终于变化！                                         │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│  T11: Pod 从 API Server 删除                                      │
│  Pod 对象消失                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 完整状态变化表

| 步骤 | 事件 | Pod Phase | 容器 State | ready | kubectl get 显示 |
|------|------|-----------|-----------|-------|-----------------|
| T0 | 正常运行 | Running | Running | true | `1/1 Running` |
| T2 | 删除标记 | Running | Running | true | `1/1 Running` |
| T4 | preStop 执行 | Running | Running | **false** | `0/1 Running` |
| T6 | EndpointSlice 移除 | Running | Running | false | `0/1 Terminating` |
| T8 | 容器终止 | Running | **Terminated** | false | `0/1 Terminating` |
| T10 | 所有容器终止 | **Succeeded/Failed** | Terminated | false | (即将删除) |
| T11 | Pod 删除 | 无 | 无 | 无 | (不显示) |

### 5.3 关键发现

| 发现 | 说明 |
|------|------|
| **ready 变化最早** | preStop 执行时就变 false，确保流量提前切断 |
| **Pod Phase 变化最晚** | 所有容器都终止后才变化 |
| **中间状态窗口** | 容器已 Terminated 但 Pod 仍显示 Running |
| **多容器复杂状态** | Phase 由最后一个终止的容器决定 |

### 5.4 Sidecar 容器终止顺序

**Kubernetes v1.35 行为：**
1. 等待所有主容器终止
2. 按定义顺序的**逆序**终止 Sidecar 容器
3. 确保 Sidecar 服务持续到不再需要

### 5.5 强制删除 Pod

```bash
# 立即从 API Server 删除（不等待 kubelet 确认）
kubectl delete pod <pod-name> --grace-period=0 --force
```

> ⚠️ **警告：** 强制删除可能导致资源在节点上继续运行，仅用于极端故障场景。

---

## 6. Pod 垃圾回收（PodGC）

### 6.1 PodGC 触发条件

PodGC 是控制平面中的控制器，在以下情况清理 Pod：

1. **超过阈值：** 终止 Pod 数量超过 `terminated-pod-gc-threshold`
2. **孤儿 Pod：** 绑定到不存在的节点
3. **未调度终止 Pod：** 始终无法调度的终止 Pod
4. **不可用节点上的终止 Pod：** 节点标记为 `out-of-service`

### 6.2 清理行为

- 将非终端相位的 Pod 标记为 `Failed`
- 添加 Pod 中断条件（Pod disruption condition）
- 从 API Server 删除 Pod 对象

---

## 7. 实践建议与最佳实践

### 7.1 生命周期设计原则

| 原则 | 说明 |
|------|------|
| **云原生弹性设计** | 预期任意时刻容器可能被重启 |
| **无状态优先** | 数据持久化到外部存储 |
| **优雅终止** | 实现 SIGTERM 处理逻辑，完成正在进行的工作 |
| **健康检查分离** | liveness 和 readiness 使用不同端点 |

### 7.2 探针配置建议

```yaml
# 推荐配置模板
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 15   # 给启动留时间
  periodSeconds: 10         # 每 10 秒检查
  timeoutSeconds: 5         # 5 秒超时
  failureThreshold: 3       # 3 次失败后重启

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5    # 快速进入就绪
  periodSeconds: 5
  successThreshold: 1
  failureThreshold: 3

startupProbe:  # 慢启动应用必备
  httpGet:
    path: /started
    port: 8080
  failureThreshold: 30      # 允许 300s 启动
  periodSeconds: 10
```

### 7.3 调试命令速查

```bash
# 查看 Pod Phase
kubectl get pod <name> -o jsonpath='{.status.phase}'

# 查看容器 ready 状态
kubectl get pod <name> -o jsonpath='{.status.containerStatuses[*].ready}'

# 查看容器状态
kubectl get pod <name> -o jsonpath='{.status.containerStatuses[*].state}'

# 查看容器重启次数
kubectl get pod <name> -o jsonpath='{.status.containerStatuses[*].restartCount}'

# 查看删除时间戳
kubectl get pod <name> -o jsonpath='{.metadata.deletionTimestamp}'

# 查看详细状态和事件
kubectl describe pod <name>

# 观察状态变化
kubectl get pod <name> -w

# 查看 Pod 条件
kubectl describe pod <name> | grep -A 10 "Conditions:"
```

---

## 8. 关键发现总结

### 8.1 三个概念的关系

| 概念 | 描述对象 | 数量 | 控制器是否使用 |
|------|---------|------|---------------|
| **Pod 生命周期** | Pod 整体过程 | 1 个概念 | - |
| **Pod Phase** | Pod 整体状态 | 1 个/Pod | ❌ |
| **Container State** | 每个容器状态 | N 个/Pod | ❌ |
| **ready** | 容器是否就绪 | N 个/Pod | ✅ **核心依据** |

### 8.2 生命周期核心要点

1. **Pod 相位是高级摘要**，不是详细状态机
2. **容器重启有指数退避**，防止系统过载
3. **Sidecar 容器有独立生命周期**，Always 重启
4. **优雅终止是默认行为**，30 秒宽限期
5. **ready 在 preStop 执行时就变 false**，提前切断流量
6. **Pod Phase 变化最晚**，所有容器终止后才变化

### 8.3 探针核心要点

1. **三种探针职责分离**，不应混用
2. **startupProbe 保护慢启动应用**，避免误杀
3. **exec 探针有 CPU 开销**，高密度集群慎用
4. **readinessProbe 控制流量**，livenessProbe 控制生死
5. **readinessProbe 成功 → ready=true，接收流量**
6. **readinessProbe 失败 → ready=false，移除流量**

### 8.4 调度与更新核心要点

1. **调度是 Pod 从 Pending 到 Running 的关键触发点**
2. **控制器决策依据是 ready 状态，不是 Pod Phase**
3. **Deployment 无序并行更新**，Pod 名称变化
4. **StatefulSet 有序串行更新**，Pod 名称不变
5. **新 Pod ready 后才删除旧 Pod**，确保服务可用

---

## 9. 参考资料

- [Kubernetes Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)
- [Liveness, Readiness, and Startup Probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)
- [Kubernetes Scheduler](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/)
- [Assigning Pods to Nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/)
- [Container Lifecycle Hooks](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/)
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

---

_本报告基于 Kubernetes v1.35 官方文档整理，部分特性（如 ContainerRestartRules）可能处于 Alpha/Beta 阶段。_

_报告版本：v2.0（含深入讨论补充）_
