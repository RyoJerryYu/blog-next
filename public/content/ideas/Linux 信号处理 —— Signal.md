---
tags:
- Linux
- Signal
- BasicKnowledge
- Operation
title: Linux 信号处理 —— Signal
---

#Linux #Signal #BasicKnowledge #Operation 

信号是一种中断，为 Linux 提供一种处理异步事件的方法。

 [Linux 信号（signal） - 简书](https://www.jianshu.com/p/f445bfeea40a) 


### 信号的定义
- 9: `SIGKILL`
- 2: `SIGINT`
- 15: `SIGTERM`

### 信号的使用
- `signal.h` 中，调用 `signal` 函数传入一个 `sighandler_t` 类型的 `handler` ，注册信号处理函数 
- 用 `kill` 函数对一个 pid 发送一个信号。已注册信号， `kill` 发送的信号都能收到
- `exec` 函数会将原先要捕捉的信号设置为默认动作
- `fork` 函数的子进程会继承父进程的信号处理方式

原型：
```cpp
#include <signal.h>
typedef void (*sighandler_t)(int);
sighandler_t signal(int signum, sighandler_t handler);
```

```cpp
#include <sys/types.h>
#include <signal.h>
int kill(pid_t pid, int sig);
```

### 未了解
- [ ] 高级信号发送接收： sigaction , sigqueue


# 一文看懂 Linux 信号处理原理与实现

 [一文看懂 Linux 信号处理原理与实现-linux 信号处理流程](https://www.51cto.com/article/675743.html) 

### 信号处理时内核态

信号处理程序代码运行在用户态
A 进程向 B 进程发送信号，发起系统调用陷入内核态，内核触发信号处理函数，返回用户态执行信号处理程序，信号处理程序执行完毕后返回到内核态执行收尾工作，再返回用户态继续执行程序

![[Pasted image 20240819014740.png]]
### 未了解
- [ ] sigaction 详细解释
- [ ] signal 在内核态的处理过程
- [ ]