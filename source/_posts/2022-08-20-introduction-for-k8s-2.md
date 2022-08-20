---
title: Kubernetes 入门 （2）
date: 2022-08-20 21:53:11
tags:
  - Kubernetes
  - DevOps
  - Docker
  - Cloud Native
---

# 部署更多 Pod

### Replica Set

可是上面说了这么多，还只是单个 Pod 的部署，但我们希望能做多副本部署。

其实，只要把 Pod 的 manifest 改一下 `metadata.name` 再部署一次，就能得到一模一样的两个 Pod ，就是一个简单的多副本部署了。（必须改 `metadata.name` ，不然 K8s 会以为你是想修改同一个 Pod ）

可是这样做会有很多问题：

- 要复制一下还要改名字多麻烦啊，我想用同一份模板，只定义一下副本数就能得到对应数量的 Pod 。
- 缩容扩容还要对着 Pod 操作很危险，我想直接修改副本数就能缩容扩容。
- 如果其中一些 Pod 挂掉了不能重启，现在是什么都不会做。我希望能自动建一些新的 Pod 顶上，来保证副本数不变。

为了实现这些需求，就出现了 Replica Set 这种资源。下面是实际应用中一个 Replica Set 的例子：

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  labels:
    app: gateway
  name: gateway-9dc546658
spec:
  replicas: 2
  selector:
    matchLabels:
      app: gateway
  template:
    metadata:
      labels:
        app: gateway
      name: gateway
    spec:
      containers:
        name: gateway
        image: xxxxxxxx.amazonaws.com/gateway:xxxxxxx
        ports:
        - containerPort: 50051
          protocol: TCP
        readinessProbe:
          initialDelaySeconds: 5
          tcpSocket:
            port: 50051
        startupProbe:
          failureThreshold: 60
          tcpSocket:
            port: 50051
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - podAffinityTerm:
              labelSelector:
                matchLabels:
                  app: gateway
              topologyKey: topology.kubernetes.io/zone
            weight: 80
```

我们可以看到， `spec.template` 中就是我们要的 Pod 的模板，在 metadata 里带上了 `app:gateway` 标签。而在 `spec.replicas` 中定义了我们需要的 Pod 数量， `spec.selector` 中描述了我们要对带 `app:gateway` 标签的 Pod 进行控制。把这份 manifest 部署后，我们就会得到除名字以外几乎一摸一样的两个 Pod ：

```yaml
apiVersion: v1
kind: Pod
metadata:
  generateName: gateway-9dc546658-
  labels:
    app: gateway
    pod-template-hash: 9dc546658
  name: gateway-9dc546658-6c9qs
  ownerReferences:
  - apiVersion: apps/v1
    blockOwnerDeletion: true
    controller: true
    kind: ReplicaSet
    name: gateway-9dc546658
    uid: 6633f89c-377c-4c90-bd08-3be5bc7b21bd
  resourceVersion: "49793842"
  uid: f927db88-a39a-4623-852d-4f150a6d853b
spec:
  containers:
    name: gateway
    image: xxxxxxxx.amazonaws.com/gateway:xxxxxxx
    ports:
    # 后续省略

---
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubernetes.io/psp: eks.privileged
  creationTimestamp: "2022-08-09T08:51:25Z"
  generateName: gateway-9dc546658-
  labels:
    app: gateway
    pod-template-hash: 9dc546658
  name: gateway-9dc546658-8trcs
  ownerReferences:
  - apiVersion: apps/v1
    blockOwnerDeletion: true
    controller: true
    kind: ReplicaSet
    name: gateway-9dc546658
    uid: 6633f89c-377c-4c90-bd08-3be5bc7b21bd
  resourceVersion: "49793745"
  uid: 0918e3ed-2965-4237-8828-421a7831c9ed
spec:
  containers:
    image: xxxxxxxx.amazonaws.com/gateway:xxxxxxx
    name: gateway
    ports:
    # 后续省略
```

可以看到，创建出来的 Pod 自动生成了两个后缀（ `6c9qs` 与 `8trcs` ），带上了 Replica Set 的信息（在 `metadata.ownerReferences` ），其他部分基本一模一样。如果其中一个 Pod 挂掉了， K8s 会帮我们从模板中重新创建一个 Pod 。而且由于我们在 Pod 模板定义了 affinity ， K8s 还会按照我们的要求自动筛选合适的节点。例如在上面 Replica Set 的例子中，创建出来的 Pod 就会尽量部署在不同的节点上。

> **K8s 中对 Pod 的生存状态检查机制**
> 
> 除了线程直接错误退出以外，还有出现死锁等等各种可能性使得容器中的应用不能正常工作。这些情况下虽然是不健康状态，但容器却不一定会挂掉。因此 K8s 提供了一些探针检查的机制来判断 Pod 是否健康。
> K8s 主要提供了三种探针：
> 1. **存活探针（ liveness probe ）** : Pod 运行时 K8s 会循环执行 liveness probe 检查容器是否健康。如果检查失败， K8s 会认为这个容器不健康，就会尝试重启容器。
> 2. **就绪探针（ readiness probe ）** : 程序可能会有一段时间不能提供服务（比如正在加载数据等）。这时可能既不想杀死应用，也不想给它发送请求，这时就需要 readiness probe 。如果 readiness probe 检查失败， K8s 就会将这个 Pod 从 Service 上摘下来，直到 readiness probe 成功重新加入 Service 。
> 3. **启动探针（ startup probe ）** : 有些程序会有非常长的启动时间，会有较长时间不能提供服务。这时如果 liveness probe 失败了导致重启毫无必要，此时就需要 startup probe 。 startup probe 只会在容器启动时检查直到第一次成功。直到 startup probe 成功为止， liveness probe 与 readiness probe 都不会开始执行检查。
> 
> 而检测方式主要有：
> 1. httpGet: 对指定的端口路径执行 HTTP GET 请求，如果返回 2xx 或 3xx 就是成功。
> 2. tcpSocket: 尝试与容器的端口建立连接，如果不能成功建立连接就是失败。
> 3. exec: 在容器内执行一段命令，如果退出时状态码不为 0 就是失败。
> 4. grpc (New!): K8s 1.24 新出的检查方式，直接用 [GRPC Health Checking Protocol](https://github.com/grpc/grpc/blob/master/doc/health-checking.md) 对 GRPC Server 进行检查。

此外， Replica Set 还提供了简易的缩容扩容功能。 kubectl 中提供了 scale 命令：

```bash
kubectl scale replicaset gateway --replicas=10
```

执行上述命令，就可以将名为 gateway 的 Replica Set 对应的副本数扩容到 10 份。当然，你也可以直接修改 Replica Set 的 `spec.replicas` 字段来实现缩容扩容。

然而， Replica Set 的功能还是有限的。实际上， Replica Set 只关心跟它的 selector 匹配的 Pod 的数量。而至于匹配的 Pod 是否真的是跟 template 字段中描述的一样， Replica Set 就不关心了。因此如果单用 Replica Set ，更新 Pod 就会变得究极麻烦。

### Deployment

为了解决 Pod 的更新问题，我们需要有 Deployment 这种资源。实际上， Replica Set 的主要用途是提供给 Deployment 作为控制 Pod 数量，以及创建、删除 Pod 的一种机制。我们一般不会直接使用 Replica Set 。

下面是实际应用中一个 Deployment 的例子：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: gateway
  name: gateway
spec:
  replicas: 2
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: gateway
  template:
    metadata:
      labels:
        app: gateway
      name: gateway
    spec:
      containers:
        name: gateway
        image: xxxxxxxx.amazonaws.com/gateway:xxxxxxx
        ports:
        # 下略
```

可以看到 Deployment 的 manifest 跟 Replica Set 很像。但实际上， Deployment 不会直接创建 Pod ，而是创建出一个 Replica Set ，再由 Replica Set 来创建 Pod ：


```mermaid
flowchart TB

Deployment1[Deployment]
ReplicaSet11[Replica Set]
Pod11[Pod1]
Pod12[Pod2]
Deployment1 --> ReplicaSet11
ReplicaSet11 --> Pod11
ReplicaSet11 --> Pod12
```

比如在上面的例子中，名为 gateway 的 Deployment 创建后，就会有如下 ReplicaSet 和 Pod ：

```sh
# Replica Set:
$ kubectl get rc -l app=gateway
NAME                 DESIRED   CURRENT   READY   AGE
gateway-9dc546658    2         2         2       5d3h

# Pod:
$ kubectl get po -l app=gateway
NAME                      READY   STATUS    RESTARTS   AGE
gateway-9dc546658-6c9qs   1/1     Running   0          5d3h
gateway-9dc546658-8trcs   1/1     Running   0          5d3h
```

可以看到，gateway Deployment 创建了一个 Replica Set ，然后随机给了它一个 `9dc546658` 后缀。然后 gateway-9dc546658 这个 Replica Set 又根据 template 中创建了两个 Pod ，再在自己名字的基础上加上两个后缀 `6c9qs` 与 `8trcs` 。

接下来就是 Deployment 的重点了： Replica Set 只会根据 template 创建出 Pod ，而不管匹配的 Pod 到底是不是跟 template 中描述的一样。而 **Deployment 则会专门关注 template 的内容变更。**

假如我们现在更新了 Deployment 的 template 中的内容提交给 K8s ， Deployment 就会感知到 template 被修改了， Pod 需要更新。
感知到更新之后， Deployment 就会创建一个新的 Replica Set 。然后逐渐将旧的 Replica Set 缩容到 0 ，并同时将新的 Replica Set 扩容到目标值。最后，所有旧版本的 Pod 将会被更新成新版本的 Pod 。如下图所示：

```mermaid
flowchart TB

subgraph A
direction TB
Deployment1[Deployment]
ReplicaSet11[Replica Set]
ReplicaSet12[New Replica Set]
Pod11[Pod1]
Pod12[Pod2]
Deployment1 --> ReplicaSet11
Deployment1 --> ReplicaSet12
ReplicaSet11 --> Pod11
ReplicaSet11 --> Pod12
end

subgraph B
direction TB
Deployment2[Deployment]
ReplicaSet21[Replica Set]
ReplicaSet22[New Replica Set]
Pod21[New Pod1]
Pod22[Pod2]
Deployment2 --> ReplicaSet21
Deployment2 --> ReplicaSet22
ReplicaSet21 --> Pod22
ReplicaSet22 --> Pod21
end

subgraph C
direction TB
Deployment3[Deployment]
ReplicaSet31[Replica Set]
ReplicaSet32[New Replica Set]
Pod31[New Pod1]
Pod32[New Pod2]
Deployment3 --> ReplicaSet31
Deployment3 --> ReplicaSet32
ReplicaSet32 --> Pod31
ReplicaSet32 --> Pod32
end

A --> B --> C
```

整个过程完成后， Deployment 还不会将旧的 Replica Set 删除掉。我们注意到 Deployment 的声明中有这么一个字段： `revisionHistoryLimit: 10` ，表示 Deployment 会保留历史中 最近的 10 个 Replica Set ，这样在必要的时候可以立刻将 Deployment 回滚到上个版本。而超出 10 个的 Replica Set 才会被从 K8s 中删除。

```sh
# 实际中被 scale 到 0 但还没被删除的 Replica Set
$ kubectl get rs -l app=gateway
NAME                 DESIRED   CURRENT   READY   AGE
gateway-5c4cdf957d   0         0         0       5d4h
gateway-5c56f6d487   0         0         0       17d
gateway-65857cfc78   0         0         0       10d
gateway-6bddbdd85f   0         0         0       16d
gateway-6cc9bb5b4c   0         0         0       13d
gateway-6f4664bc65   0         0         0       17d
gateway-7bd667cb79   0         0         0       9d
gateway-7d658d57f5   0         0         0       13d
gateway-84df97d4c8   0         0         0       6d4h
gateway-9998f4689    0         0         0       13d
gateway-9dc546658    2         2         2       5d4h
```

### Stateful Set

Deployment 中默认了我们不关心自己访问的是哪个 Pod ，因为各个 Pod 的功能是一样的，访问哪个没有差别。

实际上这也符合大多数情况：试想一个 HTTP Server ，如果其所有数据都存放到同一个的数据库中，那这个 HTTP Server 不管部署在哪台主机、不管有多少个实例、不管你访问的是哪个实例，都察觉不出有什么差别。而有了这种默认，我们就能更放心地对 Pod 进行负载均衡、缩扩容等操作。

但实际上我们总会遇到需要保存自己状态的 Pod 。比如我们在 K8s 里部署一个 Kafka 集群，每个 Kafka broker 都需要保存自己的分区数据，而且还要往 Zookeeper 里写入自己的名字来实现选举等功能。如果简单地用 Deployment 来部署， broker 之间可能就会分不清到底哪块是自己的分区，而且由 Deployment 生成出来的 Pod 名字是随机的，升级后 Pod 的名字会变，导致 Kafka 升级后名字与 Zookeeper 里的名字不一致，被以为是一个新的 broker 。

Stateful Set 就是为了解决有状态应用的部署而出现的。下面是 用 bitnami 的 Kafka Helm Chart 部署的一个 Kafka Stateful Set 的例子：

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    app.kubernetes.io/name: kafka
  name: kafka
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: kafka
  serviceName: kafka-headless
  template:
    metadata:
      labels:
        app.kubernetes.io/name: kafka
    spec:
      containers:
      - name: kafka
        image: docker.io/bitnami/kafka:3.1.0-debian-10-r52
        command:
        - /scripts/setup.sh
        ports:
        - containerPort: 9092
          name: kafka-client
          protocol: TCP
        volumeMounts:
        - mountPath: /bitnami/kafka
          name: data
  volumeClaimTemplates:
  - apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: data
    spec:
      resources:
        requests:
          storage: 10Gi
      storageClassName: gp2
```

可以看到其实 Stateful Set 类似 Deployment ，也可以通过 replicas 字段定义实例数，如果更新 template 部分， Stateful Set 也会以一定的策略对 Pod 进行更新。

而其创建出来的 Pod 如下所示：
```sh
$ kubectl get po -l app.kubernetes.io/name=kafka
NAME      READY   STATUS    RESTARTS   AGE
kafka-0   1/1     Running   1          26d
kafka-1   1/1     Running   3          26d
kafka-2   1/1     Running   3          26d
```

与 Replica Set 创建出来的 Pod 相比名字上会有很大差别。 Stateful Set 创建出来的 Pod 会固定的以 `-0` 、 `-1` 、 `-2` 结尾而不是随机生成：

```mermaid
flowchart TB
rs[Replica Set A]
rs --> A-qwert
rs --> A-asdfg
rs --> A-zxcvb

ss[Stateful Set A]
ss --> A-0
ss --> A-1
ss --> A-2
```

这样一来，更新时将 Pod 更换之后，新的 Pod 仍能够跟旧的 Pod 保持相同的名字。此外，与 Deployment 相比， Stateful Set 更新后同名的 Pod 仍能保持原来的 IP ，拿到同一个持久化卷，而且不同的 Pod 还能通过独立的 DNS 记录相互区分。这些内容后面还会详细介绍。

> **宠物与牛（ Cattle vs Pets ）的比喻**
> 
> Deployment 更倾向于将 Pod 看作是牛：我们不会去关心每一个 Pod 个体，如果有一个 Pod 出现了问题，我们只需要把他杀掉并替换成新的 Pod 就好。
> 
> 但 Stateful Set 更倾向于将 Pod 看作是宠物：弄来一直完全一模一样的宠物并不是容易的事，我们对待这些宠物必须小心翼翼。我们要给他们各自一个专属的名字，替换掉一只宠物时，必须要保证它的花色、名字、行为举止都与之前那只宠物一模一样。

### Daemon Set

不管是 Deployment 还是 Stateful Set ，一般都不会在意自己的 Pod 部署到哪个节点。而假如你不在意自己 Pod 的数量，但需要保证每个节点上都运行一个 Pod 时，就需要 Daemon Set 了。

需要保证每个节点上有且只有一个 Pod 在运行这种情况，经常会在基础结构相关的操作中出现。比如我需要在集群中部署 fluentd 采集 log ，一般来说需要在 Pod 里直接挂载节点磁盘上的文件路径。这种时候如果有一个节点上没有运行 Pod ，那个节点的 log 就采集不到；另一方面，一个节点上运行多个 Pod 毫无意义，而且可能还会导致 log 重复等冲突。

这种需求下简单地使用 Replica Set 或是 Stateful Set 都是不能达到要求的，这两种资源都只能通过亲和性达到“尽量不部署在同一个节点”，做不到绝对。而且当节点数有变更时还需要手动更改设置。

下面是一个用 fluent-bit helm chart 部署的 fluent-bit Daemon Set 的例子：

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  labels:
    app.kubernetes.io/instance: fluent-bit
    app.kubernetes.io/name: fluent-bit
  name: fluent-bit
  namespace: fluent-bit
spec:
  selector:
    matchLabels:
      app.kubernetes.io/instance: fluent-bit
      app.kubernetes.io/name: fluent-bit
  template:
    metadata:
      labels:
        app.kubernetes.io/instance: fluent-bit
        app.kubernetes.io/name: fluent-bit
    spec:
      containers:
      - image: cr.fluentbit.io/fluent/fluent-bit:1.9.5
        volumeMounts:
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
        - name: etcmachineid
          mountPath: /etc/machine-id
          readOnly: true
      volumes:
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
          type: ""
      - name: etcmachineid
        hostPath:
          path: /etc/machine-id
          type: File
```

Selector 之类的都是一样的了，而 Daemon Set 不能指定 replicas 。另外可以看到一个比较刺激的地方： Volume 里使用了 `hostPath` 这种 Volume ，在 Pod 里直接指定了宿主机磁盘上的路径。

K8s 认为经过抽象后， Pod 不应该去关心自己在哪台宿主机上，一般来说是不推荐在 Pod 里直接访问宿主机路径的（不过也没有强制禁止）。不过 Daemon Set 是个特例，由于 Daemon Set 生成的 Pod 与节点强相关， K8s 十分推荐在且仅在 Daemon Set 的 Pod 中访问宿主机路径。

### Job 与 CronJob

Replica Set ， Stateful Set ， Daemon Set 的 Pod 中运行的一般是持续运行的程序，因此这些 Pod 运行终止后会有相应的机制重启这些 Pod 。而 Job 与 Cron Job 这两种资源则专门负责调度不会持续运行的程序。

下面是 《Kubernetes in Action》 书中的一个例子：

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  completions: 5
  parallelism: 2
  template:
    spec:
      containers:
      - name: pi
        image: perl:5.34.0
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
```

可以看到，这个 Job 描述了一个会输出 PI 小数点后 2000 位的 Pod 模板。这个 Job 部署后，一共会以这个模板跑完 5 个 Pod ，其中最多并行跑 2 个，并在其中一个成功终止后再跑剩下的 Pod 。可以通过调整 `completions` 与 `parallelism` 字段调整并行与穿行数量。

顺带一提，在 Job 定义中一般不会出现 selector ，但其实 Job 有 selector 字段，一般会由 K8s 为每个 Job 生成一个 uuid 作为 selector 。

另外，可以通过部署 CronJob 这种资源来定时执行 Job 。下面是 《Kubernetes in Action》 书中关于 CronJob 的例子：

```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: pi
spec:
  schedule: "0 0 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: pi
            image: perl:5.34.0
            command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
          restartPolicy: Never
```

这个例子中， CronJob 会在每天的 0 点创建一个只运行一个 Pod 的 Job 。 CronJob 不会直接创建 Pod ，而是创建一个 Job ，再由 Job 创建 Pod （就像 Deployment 与 Replica Set 的关系）。另外， CronJob 创建的 Job 会限制 `completions` 与 `parallelism` 都只能等于 1 。

> 关于资源的名称空间
> 
> 在 K8s 中，各资源都是不能重名的。不能部署两个都叫 `gateway` 的 Pod ，资源之间有可能因为名字冲突而导致部署不成功。（部署一个叫 `gateway` 的 Pod 和一个叫 `gateway` 的 Deployment 倒是可以，因为 `gateway` 不是他们两个的全名，他们的全名分别叫 `pod/gateway` 及 `deployment/gateway` 。）
> 另外我们已经知道 Deployment 等资源一般会通过标签等来管理自己创建的资源，那两份不相关的应用完全有可能会撞标签，这时候部署逻辑就有可能会出问题。
> 
> K8s 中提供了名称空间这种资源，用于进行资源隔离。K8s 中大部分资源都从属于一个且仅从属于一个名称空间， Deployment 等资源一般只能控制在同一名称空间下的资源，而不会影响其他名称空间。
> 
> 另外，也有一些资源是名称空间无关的，比如节点 `Node` 。


<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
