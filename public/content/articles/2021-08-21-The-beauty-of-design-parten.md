---
created_at: 2021-08-21 08:53:27
updated_at: 2022-03-27 21:30:33+08:00
layout:     post
title:      "设计模式之美读书笔记"
subtitle:   "以我的观点来总结一下设计模式之美这个专栏课的要点，给后人做个导读。"
date:       2021-08-21 08:53:27
author:     "Ryo"
header-img: "img/post-bg-default.jpg"
tags:
    - 设计模式
    - 笔记
---

# 导读

## 02：如何评价代码好坏？

从7个方面评价代码的好坏：

1. 易维护性：根本
2. 可读性：最重要
3. 易扩展性：对修改关闭，对扩展开放
4. 灵活性
5. 简洁性：KISS
6. 可复用性：DRY
7. 可测试性：TDD，单元测试，控制反转与依赖注入

## 03：编程方法论

设计模式之美这一课程不单止讲设计模式，而会讲包括设计模式在内的指导我们进行代码设计的方法论。包括以下5个方面：

1. 面向对象：封装，抽象，继承，多态
2. 设计原则：SOLID（单一职责，开闭原则，里氏替换，接口隔离，依赖倒置），DRY，KISS，YAGNI，LOD
3. 设计模式
4. 编程规范：可读性，命名规范
5. 重构技巧：（目的，对象，时机，方法），保证手段（单元测试与可测性），两种规模

整个课程会以编程方法论为纵轴，以代码好坏的评价为横轴，来讲提高代码质量的方法以及采用这种方法的原因。


# 面向对象

使用封装，抽象，继承，多态，作为代码设计和实现的基石。

1. 面向对象分析（做什么），设计（怎么做），编程

## 05：封装，抽象，继承，多态

|      | 是什么                 | 怎么做                 | 为什么                                                         |
| ---- | ---------------------- | ---------------------- | -------------------------------------------------------------- |
| 封装 | 信息隐藏、数据访问保护 | 访问控制关键字         | 减少不可控因素、统一修改方式、保证可读性与可维护性、提高易用性 |
| 抽象 | 隐藏实现方法           | 函数、接口类、抽象类   | 提高可扩展性与维护性、过滤非必要信息                           |
| 继承 | is-a关系               | 继承机制               | 代码复用、反映真实世界关系                                     |
| 多态 | 子类替代父类           | 继承、接口类、鸭子类型 | 提高扩展性与复用性                                             |

- 继承不应过度使用，会导致层次过深，导致低可读性与低可维护性
- 在我看来，多态的本质与其说是子类替代父类，更应说是用同一个过程方法能适应多种不同类型的对象。
- 有些观点认为，多态除了表中这三种实现方式以外，还有泛型的实现方式，被称为连接时多态。

## 06，07：面向过程与面向对象

1. 面向过程是：数据与方法分离
2. 面向对象优势：适应大规模开发，代码组织更清晰；易复用、易扩展、易维护；人性化；
3. 看似面向对象实际面向过程：滥用getter、setter破坏封装；滥用全局变量与全局方法，Constants类与Utils类；数据与方法分离，贫血模型；
4. 为什么容易面向过程：略
5. 面向过程的用处：略

## 08：接口与抽象类

1. 接口类与抽象类语法特性：略
2. 抽象类表示is-a，为了解决代码复用。接口表示能做什么，为了解耦，隔离接口与实现。
3. 应用场景区别：
    - 抽象类：代表is-a关系，解决代码复用问题
    - 接口类：解决抽象、解耦问题