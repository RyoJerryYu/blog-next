---
tags:
- Linux
- memory
- BasicKnowledge
title: Linux 内存 —— 堆和栈
---

#Linux #memory #BasicKnowledge 

> 堆区与栈区都是程序内存分段中的一段。

[[Linux 内存 —— 内存分页、分段]]

## 栈

- 是逻辑栈，连续
- 有大小限制， Windows 下为 2M
- 入栈出栈为 CPU 指令，申请、读取快

### 储存内容

- 下条指令地址（ pop 后运行那条指令）
- 函数参数
- 函数局部变量

## 堆

- 逻辑上是链表，不连续
- 基本无大小限制
- 申请慢，容易产生内存碎片

### 储存内容

- 堆的大小
- 堆变量