---
created_at: 2025-08-09 12:00:00+08:00
updated_at: 2025-08-09 12:00:00+08:00
title: 三维空间中两种乘法（二）：几种乘法在 O(3) 上的不变性
license: true
tags:
  - 线性代数
  - 群论
---

## 点乘运算

> [!query]
> 点乘运算在旋转群 O(3) 下是不变的吗？

是的，点乘运算（即向量的点积）在旋转群 O(3) 下是不变的。下面我将详细解释这一点。

### 背景说明
- **点乘运算**：在三维空间中，两个向量 $$\mathbf{a} = (a_1, a_2, a_3)$$ 和 $$\mathbf{b} = (b_1, b_2, b_3)$$ 的点积定义为：
  $$
  \mathbf{a} \cdot \mathbf{b} = a_1 b_1 + a_2 b_2 + a_3 b_3.
  $$
  这等价于矩阵形式 $$\mathbf{a}^T \mathbf{b}$$。
- **旋转群 O(3)**：O(3) 是三维正交群，包含所有正交变换（即保持向量长度不变的线性变换）。正交变换由正交矩阵 $$Q$$ 表示，满足 $$Q^T Q = I$$（其中 $$I$$ 是单位矩阵）。O(3) 包括旋转（行列式为 $$+1$$，即 SO(3) 子群）和反射（行列式为 $$-1$$）。注意，虽然您提到“旋转群”，但 O(3) 严格来说包含反射；如果特指纯旋转（不含反射），则应使用 SO(3)。不过，点积在 O(3) 和 SO(3) 下均不变。

### 不变性证明
点积在 O(3) 下的不变性源于正交群的定义：正交变换保持点积不变。具体证明如下：
- 设 $$Q \in O(3)$$ 是一个正交矩阵（即 $$Q^T Q = I$$）。
- 对任意两个向量 $$\mathbf{a}$$ 和 $$\mathbf{b}$$，施加变换 $$Q$$ 后得到 $$Q\mathbf{a}$$ 和 $$Q\mathbf{b}$$。
- 变换后的点积为：
  $$
  (Q\mathbf{a}) \cdot (Q\mathbf{b}) = (Q\mathbf{a})^T (Q\mathbf{b}) = \mathbf{a}^T Q^T Q \mathbf{b}.
  $$
- 由于 $$Q^T Q = I$$，有：
  $$
  \mathbf{a}^T Q^T Q \mathbf{b} = \mathbf{a}^T I \mathbf{b} = \mathbf{a}^T \mathbf{b} = \mathbf{a} \cdot \mathbf{b}.
  $$
- 因此，$$(Q\mathbf{a}) \cdot (Q\mathbf{b}) = \mathbf{a} \cdot \mathbf{b}$$，即点积在变换前后保持不变。

### 示例验证
考虑一个反射变换（属于 O(3)，但非纯旋转），例如关于 $$xy$$-平面的反射，其正交矩阵为：
$$
Q = \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & -1
\end{pmatrix}.
$$
- 取向量 $$\mathbf{a} = (1, 2, 3)$$ 和 $$\mathbf{b} = (4, 5, 6)$$。
- 原点点积：$$\mathbf{a} \cdot \mathbf{b} = 1 \cdot 4 + 2 \cdot 5 + 3 \cdot 6 = 4 + 10 + 18 = 32$$。
- 变换后向量：$$Q\mathbf{a} = (1, 2, -3)$$，$$Q\mathbf{b} = (4, 5, -6)$$。
- 变换后点积：$$(1, 2, -3) \cdot (4, 5, -6) = 1 \cdot 4 + 2 \cdot 5 + (-3) \cdot (-6) = 4 + 10 + 18 = 32$$，与原点积相同。

### 附加说明
- **O(3) 与 SO(3) 的区别**：虽然您使用了“旋转群 O(3)”的表述，但严格来说：
  - **SO(3)**（特殊正交群）只包含纯旋转（行列式为 $$+1$$），是 O(3) 的子群。
  - **O(3)** 包含旋转和反射（行列式为 $$\pm 1$$）。
  - 点积在 **SO(3) 下也保持不变**，因为 SO(3) 是 O(3) 的子群，且上述证明同样适用。
- **几何意义**：点积不变性意味着正交变换保持向量的夹角和长度（因为 $$\mathbf{a} \cdot \mathbf{b} = \|\mathbf{a}\| \|\mathbf{b}\| \cos \theta$$），这是正交群的核心性质。

### 结论
点乘运算在 O(3) 群（包括所有正交变换）下是不变的。这适用于 O(3) 中的任何元素（旋转或反射）。如果您特指纯旋转群 SO(3)，结论同样成立。


## 叉乘运算、逐元素乘积

> [!query]
> 叉乘运算在 O(3) 下是不变的吗？逐元素乘积在 O(3) 下是不变的吗？

### 回答：叉乘运算和逐元素乘积在 O(3) 下的不变性

您的查询涉及叉乘运算（向量积）和逐元素乘积（Hadamard 乘积）在三维正交群 O(3) 下的不变性。O(3) 群包含所有正交变换（即保持向量长度不变的线性变换），由正交矩阵 $$Q$$ 表示（满足 $$Q^T Q = I$$）。O(3) 包括旋转（行列式为 $$+1$$，对应子群 SO(3)）和反射（行列式为 $$-1$$）。不变性指：对任意向量 $$\mathbf{a}, \mathbf{b} \in \mathbb{R}^3$$ 和任意 $$Q \in O(3)$$，运算结果在变换前后保持一致（或协变）。下面我逐一分析。

#### 1. **叉乘运算在 O(3) 下是不变的吗？**
   **答：不是。** 叉乘运算在 O(3) 下不是不变的，因为它在反射变换（行列式 $$-1$$）下不保持结果。具体来说：
   - 叉乘（$$\times$$）的结果是一个伪向量（axial vector），其行为取决于变换的手性。
   - 对于纯旋转（SO(3)，行列式 $$+1$$），叉乘是 **协变** 的：即 $$(Q\mathbf{a}) \times (Q\mathbf{b}) = Q (\mathbf{a} \times \mathbf{b})$$。
   - 但对于反射（行列式 $$-1$$），叉乘会改变符号：$$(Q\mathbf{a}) \times (Q\mathbf{b}) = -Q (\mathbf{a} \times \mathbf{b})$$。

   **数学证明：**
   设 $$Q \in O(3)$$，$$\mathbf{a}, \mathbf{b} \in \mathbb{R}^3$$。叉乘的变换规则为：
   $$
   (Q\mathbf{a}) \times (Q\mathbf{b}) = \det(Q) \cdot Q (\mathbf{a} \times \mathbf{b})
   $$
   - 若 $$\det(Q) = 1$$（SO(3)），则 $$(Q\mathbf{a}) \times (Q\mathbf{b}) = Q (\mathbf{a} \times \mathbf{b})$$。
   - 若 $$\det(Q) = -1$$（反射），则 $$(Q\mathbf{a}) \times (Q\mathbf{b}) = -Q (\mathbf{a} \times \mathbf{b})$$，结果不相等。

   **反例（反射）：**
   考虑反射变换（关于 $$xy$$-平面）：
   $$
   Q = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & -1 \end{pmatrix}, \quad \det(Q) = -1.
   $$
   取 $$\mathbf{a} = (1,0,0)$$, $$\mathbf{b} = (0,1,0)$$：
   - 原点乘：$$\mathbf{a} \times \mathbf{b} = (0,0,1)$$。
   - 变换后：$$Q\mathbf{a} = (1,0,0)$$, $$Q\mathbf{b} = (0,1,0)$$。
   - 叉乘结果：$$(Q\mathbf{a}) \times (Q\mathbf{b}) = (1,0,0) \times (0,1,0) = (0,0,1)$$。
   - 但 $$Q (\mathbf{a} \times \mathbf{b}) = Q(0,0,1) = (0,0,-1)$$。
   - 比较：$$(0,0,1) \neq (0,0,-1)$$，且满足 $$(Q\mathbf{a}) \times (Q\mathbf{b}) = -Q (\mathbf{a} \times \mathbf{b})$$。

   **结论：** 叉乘在 O(3) 下不是不变的（因为反射破坏不变性）。但在 SO(3)（纯旋转群）下，它是协变的，即 $$(Q\mathbf{a}) \times (Q\mathbf{b}) = Q (\mathbf{a} \times \mathbf{b})$$。

#### 2. **逐元素乘积在 O(3) 下是不变的吗？**
   **答：不是。** 逐元素乘积（Hadamard 乘积）在 O(3) 下不是不变的，因为它依赖于坐标系的选择，且一般正交变换不保持这种运算。逐元素乘积定义为：
   $$
   (\mathbf{a} \circ \mathbf{b})_i = a_i b_i \quad \text{（分量 wise）}, \quad \mathbf{a}, \mathbf{b} \in \mathbb{R}^3.
   $$
   不变性要求：$$(Q\mathbf{a}) \circ (Q\mathbf{b}) = Q (\mathbf{a} \circ \mathbf{b})$$。然而，这在一般正交变换（包括旋转和反射）下不成立。

   **数学分析：**
   - 逐元素乘积是坐标相关的运算，不是几何不变的（即不保持内蕴性质）。
   - 正交变换 $$Q$$ 改变向量的分量，但逐元素乘积在新坐标系中计算时，通常不等于先计算乘积再变换的结果。
   - 形式化：设 $$Q \in O(3)$$，则：
     $$
     (Q\mathbf{a}) \circ (Q\mathbf{b}) \neq Q (\mathbf{a} \circ \mathbf{b}) \quad \text{（一般成立）}.
     $$

   **反例（旋转）：**
   考虑绕 $$z$$-轴旋转 45°（SO(3) 元素）：
   $$
   Q = \begin{pmatrix} \frac{\sqrt{2}}{2} & -\frac{\sqrt{2}}{2} & 0 \\ \frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & 0 \\ 0 & 0 & 1 \end{pmatrix}, \quad \det(Q) = 1.
   $$
   取 $$\mathbf{a} = (1,0,0)$$, $$\mathbf{b} = (0,1,0)$$：
   - 原乘积：$$\mathbf{a} \circ \mathbf{b} = (1 \cdot 0, 0 \cdot 1, 0 \cdot 0) = (0,0,0)$$。
   - 变换后：$$Q\mathbf{a} = (\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2}, 0)$$, $$Q\mathbf{b} = (-\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2}, 0)$$。
   - 逐元素乘积：$$(Q\mathbf{a}) \circ (Q\mathbf{b}) = \left( \frac{\sqrt{2}}{2} \cdot (-\frac{\sqrt{2}}{2}), \frac{\sqrt{2}}{2} \cdot \frac{\sqrt{2}}{2}, 0 \cdot 0 \right) = (-\frac{2}{4}, \frac{2}{4}, 0) = (-0.5, 0.5, 0)$$。
   - 但 $$Q (\mathbf{a} \circ \mathbf{b}) = Q(0,0,0) = (0,0,0)$$。
   - 比较：$$(-0.5, 0.5, 0) \neq (0,0,0)$$。

   **反例（反射）：**
   考虑反射（关于 $$xy$$-平面）：
   $$
   Q = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & -1 \end{pmatrix}, \quad \det(Q) = -1.
   $$
   取 $$\mathbf{a} = (1,2,3)$$, $$\mathbf{b} = (4,5,6)$$：
   - 原乘积：$$\mathbf{a} \circ \mathbf{b} = (1 \cdot 4, 2 \cdot 5, 3 \cdot 6) = (4,10,18)$$。
   - 变换后：$$Q\mathbf{a} = (1,2,-3)$$, $$Q\mathbf{b} = (4,5,-6)$$。
   - 逐元素乘积：$$(Q\mathbf{a}) \circ (Q\mathbf{b}) = (1 \cdot 4, 2 \cdot 5, (-3) \cdot (-6)) = (4,10,18)$$。
   - 但 $$Q (\mathbf{a} \circ \mathbf{b}) = Q(4,10,18) = (4,10,-18)$$。
   - 比较：$$(4,10,18) \neq (4,10,-18)$$。

   **结论：** 逐元素乘积在 O(3) 下不是不变的（旋转和反射均破坏不变性）。它仅在特定变换（如恒等或坐标轴置换）下可能成立，但对一般正交变换不成立。

### 总结
- **叉乘运算**：在 O(3) 下 **不是不变的**（因反射导致符号变化）；在 SO(3) 下是协变的。
- **逐元素乘积**：在 O(3) 下 **不是不变的**（因正交变换改变分量间的关联）。
这些结果凸显了向量运算的几何性质：点积（如前所述）在 O(3) 下不变，因为它与内积相关；而叉乘和逐元素乘积有更强的坐标系依赖性。

