---
created_at: 2024-12-08 10:00:00+08:00
updated_at: 2024-12-08 10:00:00+08:00
title: 可执行文件格式对比：ELF、PE、Mach-O等
license: true
tags:
  - Linux
  - Windows
  - macOS
  - 可执行文件
  - 学习笔记
---

> 本文介绍了几种主要的可执行文件格式，包括Linux系统使用的ELF格式、Windows系统使用的PE格式、以及macOS系统使用的Mach-O格式等。文章详细讨论了每种格式的特点、使用平台和历史演变，帮助读者理解不同操作系统中二进制文件格式的差异。

## Q: 解释: ELF 执行文件

ELF（Executable and Linkable Format）执行文件是一种用于Linux和类Unix操作系统的标准二进制文件格式。它包含了可执行程序、共享库、目标文件和核心转储文件。ELF文件格式设计灵活、可扩展，并且可移植，它定义了程序代码的加载和执行方式，包括代码段、数据段、符号表和重定位信息等。操作系统根据ELF文件中的这些信息来和执行程序。ELF格式也允许程序共享库，即多个程序可以共享同一段代码，从而减少内存占用并提高效率。在软件开发过程中，ELF文件作为目标文件格式在编译时生成，并最终由链接器组合形成可执行文件或共享库。

## Q: 有与 ELF 相并列的另外的一些二进制文件格式吗？

是的，除了ELF（Executable and Linking Format）之外，还有其他几种常见的二进制文件格式，它们在不同的操作系统和平台上被广泛使用。以下是一些主要的二进制文件格式：

1. **PE（Portable Executable）**：
   - **使用平台**：主要在Windows操作系统上使用。
   - **特点**：PE格式是COFF（Common Object File Format）的扩展，用于可执行文件、目标文件、动态链接库DLLs）和驱动程序等。PE文件包含一个头部（PE header）、节表（section table）和各个节（sections），如代码节、数据节等。

2. **Mach-O（Mach Object）**：
   - **使用平台**：主要在Apple的macOS和iOS操作系统上使用。
   - **特点**：Mach-O格式用于存储可执行文件、目标文件和动态库。它包含多个段（segments和节（sections），支持多种架构，并且可以包含多个架构的代码（称为"fat binary"）。

3. **COFF（Common Object File Format）**：
   - **使用平台**：早期在Unix System V和Windows NT上使用。
   - **特点**：COFF格式是一种通用的目标文件格式，包含代码、数据和重定位信息。虽然现在较少直接使用，但它的许多概念和结构被PE和ELF继承。

4. **a.out（Assembler Output）**：
   - **使用平台**：早期Unix系统上使用。
   - **特点**：a.out是一种较简单的二进制文件格式，包含可执行代码、数据和符号表。随着ELF格式的出现，a.out逐渐被淘汰。

5. **DOS MZ（Mark Zbikowski）**：
   - **使用平台**：早期DOS和Windows系统上使用。
   - **特点**：DOSZ格式是DOS可执行文件的格式，以"MZ"（开发者Mark Zbikowski的首字母）作为文件头部的标识。它被后来的PE格式所取代。

6. **COM文件**：
   - **使用平台**：早期DOS系统上使用。
   - **特点**：COM文件是一种非常简单的可执行文件格式，仅包含代码和数据，没有头部信息，大小限制为64KB。

这些二进制文件格式各有特点，适用于不同的和场景。它们在文件结构、加载机制和功能支持上有所不同，但都旨在实现程序代码的有效存储和执行。

