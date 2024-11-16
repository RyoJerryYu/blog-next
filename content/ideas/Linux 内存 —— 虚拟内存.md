---
tags:
- Linux
- memory
- Operation
- BasicKnowledge
title: Linux 内存 —— 虚拟内存
---

#Linux #memory #Operation #BasicKnowledge 

> 每个**进程**分配一套**虚拟内存**地址，由操作系统管理，**进程间独立**互不干涉。
> 程序访问虚拟地址时，由操作系统转换成物理地址，使得这样不同进程内存不会冲突。

 [kernel_memory_management/✍ 文章/一文带你了解，虚拟内存、内存分页、分段、段页式内存管理.md at main · 0voice/kernel_memory_management](https://github.com/0voice/kernel_memory_management/blob/main/%E2%9C%8D%20%E6%96%87%E7%AB%A0/%E4%B8%80%E6%96%87%E5%B8%A6%E4%BD%A0%E4%BA%86%E8%A7%A3%EF%BC%8C%E8%99%9A%E6%8B%9F%E5%86%85%E5%AD%98%E3%80%81%E5%86%85%E5%AD%98%E5%88%86%E9%A1%B5%E3%80%81%E5%88%86%E6%AE%B5%E3%80%81%E6%AE%B5%E9%A1%B5%E5%BC%8F%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86.md) 
 
CPU是直接操作内存的物理地址。

两个线程占用内存空间不能重叠，否则会相互擦除。如果直接使用物理内存，需要各线程都要理解其他所有线程占用住的空间，违反隔离原理。因此需要一种隔离内存的机制。

这个机制就是虚拟内存。

> [!important]
> 每个**进程**分配一套**虚拟内存**地址，由操作系统管理，**进程间独立**互不干涉。

- 程序所使用的内存地址叫做**虚拟内存地址**（_Virtual Memory Address_）
- 实际存在硬件内存里面的空间地址叫**物理内存地址**（_Physical Memory Address_）

程序访问虚拟地址时，由操作系统转换成物理地址，使得这样不同进程内存不会冲突。

操作系统引入了虚拟内存，进程持有的虚拟地址会通过 CPU 芯片中的内存管理单元（MMU）的映射关系，来转换变成物理地址，然后再通过物理地址访问内存

操作系统通过**内存分页**和**内存分段**等机制来管理虚拟内存与物理内存的映射。

深入：[[Linux 内存 —— 内存分页、分段]]



## Extra

内存管理是以进程为单元，线程的栈在主进程的堆中。[[Linux 内存 —— 堆和栈]]