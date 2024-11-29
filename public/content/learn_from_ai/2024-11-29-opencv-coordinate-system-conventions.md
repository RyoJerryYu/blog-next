---
created_at: 2024-11-29 11:00:00+08:00
updated_at: 2024-11-29 11:00:00+08:00
title: OpenCV 坐标表示：理解 (y, x) 与 (x, y) 的区别
license: true
tags:
  - OpenCV
  - 图像处理
  - 学习笔记
---

> 📝 本文是我在学习 OpenCV 时遇到的一个问题。问题的解答和中文翻译均由 AI 生成。

# OpenCV 坐标表示：理解 (y, x) 与 (x, y) 的区别

## Q
Why sometimes opencv represent a point coordinate as (y,x) (e.g. the result of cv2.findContours) , and sometimes it represent as (x, y) (e.g. the arg `center` of cv2.circle)?

> 为什么 OpenCV 有时用 (y,x) 表示坐标点（比如 cv2.findContours 的返回值），有时又用 (x,y) 表示（比如 cv2.circle 函数的 `center` 参数）？

## A
OpenCV uses different conventions for different functions based on their specific requirements and historical reasons:

> OpenCV 基于不同函数的具体需求和历史原因，使用了不同的坐标表示约定：

1. **(y, x) Convention**: This is often used when dealing with image matrices directly. In image processing, images are typically represented as 2D arrays where the first dimension is the row (height, y-coordinate) and the second dimension is the column (width, x-coordinate). Functions like `cv2.findContours` return coordinates in this order to match the array indexing.

> 1. **(y, x) 约定**：这种表示方法通常用于直接处理图像矩阵时。在图像处理中，图像通常表示为二维数组，其中第一维是行（高度，y坐标），第二维是列（宽度，x坐标）。像 `cv2.findContours` 这样的函数返回这种顺序的坐标是为了匹配数组索引方式。

2. **(x, y) Convention**: This is used in functions that deal with geometric shapes or points in a more traditional Cartesian coordinate system, where `x` is the horizontal axis and `y` is the vertical axis. Functions like `cv2.circle` use this convention to specify the center of the circle.

> 2. **(x, y) 约定**：这种表示方法用于处理几何图形或在传统笛卡尔坐标系中的点，其中 `x` 是水平轴，`y` 是垂直轴。像 `cv2.circle` 这样的函数使用这种约定来指定圆心位置。

The inconsistency arises because OpenCV aims to balance between image matrix operations and geometric operations, each having their own conventional coordinate systems.

> 这种不一致性的出现是因为 OpenCV 需要在图像矩阵运算和几何运算之间取得平衡，而这两种运算各自有其传统的坐标系统表示方法。