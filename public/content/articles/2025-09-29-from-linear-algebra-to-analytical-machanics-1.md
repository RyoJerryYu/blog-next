---
created_at: 2025-09-29T13:38:46
updated_at: 2025-09-29T13:38:50
title: 从线性代数到分析力学（上）
summary: 从线性代数的基础概念出发，以直观的视角重新审视线性性、向量空间和线性映射，强调线性映射的复合与线性组合性质。随后，文章转向微积分，揭示微分作为线性逼近的本质，并通过雅可比矩阵扩展到多元函数，严谨推导链式法则。最后，引入泛函分析，将函数视为无穷维向量，定义泛函和变分法，利用变分法基本引理为分析力学中的极值问题奠定基础。全文以清晰的类比和严谨的推导，打通不同数学分支的界限，帮助读者构建统一的理解框架。
---

## 线性代数

讲线性代数，被同济版线性代数毒害过的人可能都会被唤醒藏于心底的恐惧：哇！又要讲行列式、对角化、增广矩阵算来算去了！

其实线性代数没那么可怕。我们可以很直观地、很感性地去理解线性代数。

### 什么是线性

线性代数，关键当然在于“线性”。（应该没人会觉得线性代数的关键在于“代数”吧？）如果一个函数 $f(x)$ 有以下性质：

$$
f(ax+by) = af(x) + bf(y)
$$

则我们称这个函数 $f(x)$ **是线性的**，有线性性（Linearity）。其中，$X$ 与 $Y$ 都为 $f(x)$ 定义域上的自变量，可以是一个向量（如果 $f(x)$ 是一个多元函数）。 $a$ 与 $b$ 是一个数，一般理解上可以认为就是实数。（但实际上可以是任何域上的元素，如有理数域、实数域、复数域等。）

> [!info] 线性性严格定义
> 如果称一个函数 $L(x)$ 是线性的，指 $L(x)$ 同时具有以下两种性质：
> - 可加性： $L(x+t) = L(x) + L(t)$
> - 一次齐次性： $L(ax) = aL(x)$

可这个时候就有人要问啦，为什么有这种性质就叫做**线性**？这跟**线**有什么关系？

我们可以从两个方面来理解：

一方面，最简单的直线：截距为零的一次函数（即正比例函数） $f(x) = kx$ ，是线性的。我们可以简单证明这一点：

$$
\begin{align}
f(ax) &= af(x) & \impliedby & &k(ax) &= akx \\
f(x+y) &= f(x) + f(y) & \impliedby & &k(x+y) &= kx + ky
\end{align}
$$

另一方面，在空间中的直线（这里没有限制空间的维度哦），所有点输入这种线性的函数后，输出的所有点依然构成一条直线（输出的空间也没有限制纬度，而且与输入的空间维度不一定相同哦）。我们一步一步来证明。

我们假设直线过点 $\vec{p}$ ，且方向向量为 $\vec{v}$ ，则直线上的所有点可以表示为： $\vec{p} + k\vec{v}$ ，其中 $k$ 为任意实数，取全体实数可得直线上的所有点。

让我们把直线上的所有点输入函数中，可得：

$$
f(\vec{p} + k\vec{v}) = f(\vec{p}) + kf(\vec{v})
$$

其中 $f(\vec{p})$ 就是输出空间中的一个点，而 $f(\vec{v})$ 就是输出空间中直线的方向向量， $f(\vec{p}) + kf(\vec{v})$ 依旧是一条直线（不过是输出空间中的一条直线）。


有了线性的直观理解，我们可以具体地、准确地说线性代数是什么了。

> [!info]
> 线性代数（Linear Algebra）是研究**向量空间**和**线性映射**的一个数学分支。

**向量空间**就是指上面函数 $f(x)$ 的输入或输出元素组成的集合。给定一个域，如果一个集合具有向量加法、标量乘法两种运算且符合八条公理，就称这个集合为向量空间。

**线性映射**就是指上面的有线性性的这个函数 $f$ 。如果映射 $f$ 将输入向量空间里的元素映射到输出向量空间里，且能维持向量加法与标量乘法，就成这个映射 $f$ 为线性映射。

定义在向量空间上，可以被线性映射维持的这种形如 $a\vec{x} + b\vec{y}$ 的运算组合形式，就叫作**线性组合**。线性映射的定义也可以换个说法：能维持线性组合的映射叫线性映射。


> [!info]- 线性空间（ Vector Space ）的严格定义
设 $F$ 是一个域（例如实数域  $\mathbb{R}$ 或复数域 $\mathbb{C}$）。一个 $F$**-向量空间** $V$ 是一个非空集合，其中定义了两种运算：
> - **向量加法**：$+ : V \times V \to V$，记作 $(\mathbf{u}, \mathbf{v}) \mapsto \mathbf{u} + \mathbf{v}$ 。
> - **标量乘法**：$\cdot : F \times V \to V$，记作 $(a, \mathbf{v}) \mapsto a \cdot \mathbf{v}$ 。
> 
> 这些运算必须满足以下公理（对任意 $\mathbf{u}, \mathbf{v}, \mathbf{w} \in V$ 和任意 $a, b \in F$)：
> 1. **加法结合律**：$(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})$ 。
> 2. **加法交换律**：$\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$ 。
> 3. **加法单位元**：存在零向量 $\mathbf{0} \in V$，使得 $\mathbf{v} + \mathbf{0} = \mathbf{v}$ 对所有 $\mathbf{v} \in V$ 成立。
> 4. **加法逆元**：对每个 $\mathbf{v} \in V$，存在向量 $-\mathbf{v} \in V$，使得 $\mathbf{v} + (-\mathbf{v}) = \mathbf{0}$ 。
> 5. **标量乘法与域乘法兼容**：$a \cdot (b \cdot \mathbf{v}) = (a b) \cdot \mathbf{v}$ 。
> 6. **标量乘法单位元**：若 $1 \in F$ 是乘法单位元，则 $1 \cdot \mathbf{v} = \mathbf{v}$ 。
> 7. **分配律（标量乘法对向量加法）**：$a \cdot (\mathbf{u} + \mathbf{v}) = a \cdot \mathbf{u} + a \cdot \mathbf{v}$ 。
> 8. **分配律（向量加法对标量乘法）**：$(a + b) \cdot \mathbf{v} = a \cdot \mathbf{v} + b \cdot \mathbf{v}$ 。
> 


> [!info]- 线性映射（ Linear Map ）的严格定义
> 设 $V$ 和 $W$ 是同一个域 $F$ 上的向量空间。如果一个函数 $T : V \to W$ 满足以下两个条件：
> - **可加性**：对任意 $\mathbf{u}, \mathbf{v} \in V$，有 $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ 。
> - **齐次性**：对任意 $a \in F$ 和 $\mathbf{u} \in V$，有 $T(a \cdot \mathbf{u}) = a \cdot T(\mathbf{u})$ .
> 
> 等价地，对于任意 $a, b \in F$ 和任意 $\mathbf{u}, \mathbf{v} \in V$ ，有 $T(a \mathbf{u} + b \mathbf{v}) = a T(\mathbf{u}) + b T(\mathbf{v})$ .
>
> 我们把这样的函数称为**线性映射**（或线性变换），


> [!info]- 线性组合（Linear Combination）的严格定义
设 $V$ 是域 $F$ 上的一个向量空间，并设 $S = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ 是 $V$ 的一个子集。如果存在有限个标量 $a_1, a_2, \dots, a_n \in F$（称为系数），使得：
> 
> $$
> \mathbf{v} = a_1 \mathbf{v}_1 + a_2 \mathbf{v}_2 + \dots + a_n \mathbf{v}_n = \sum_{i=1}^n a_i \mathbf{v}_i.
> $$
> 
> 我们把这样的向量 $\mathbf{v} \in V$ 称为 $S$ 的**线性组合**，


我们可以从上面这些定义中引申出线性映射两个重要的性质：

- 线性映射的复合还是线性映射
- 线性映射的线性组合还是线性映射

### 线性映射的两个重要性质

首先，**线性映射的复合依然是线性映射**。怎么理解呢？我们可以试着将线性映射出来的结果输入另一个线性映射中：

$$
\begin{align}
g(f(a\vec{x}+b\vec{y})) &= g(af(\vec{x}) + bf(\vec{y})) \\
&= ag(f(\vec{x})) + bg(f(\vec{y}))
\end{align}
$$

其中 $g$ 与 $f$ 都为线性映射。假设 $f$ 将 N 维向量映射到 M 维向量空间中（ $f:\mathbb{R}^n\to \mathbb{R}^m$ ），而 $g$ 将 M 维向量映射到 L 维向量空间中（ $g: \mathbb{R}^m \to \mathbb{R}^l$ ）。

那么如果我们将 $g$ 与 $f$ 这样复合起来（ $g \circ f$ ）的新的映射称为 $h$ ，则这个新的映射 $h$ 将会是一个能将 N 维向量映射到 L 维向量空间中的映射（ $h: \mathbb{R}^n \to \mathbb{R}^l$ ），而且依然是一个线性映射：

$$
\begin{align}
&& g(f(a\vec{x}+b\vec{y})) &= ag(f(\vec{x})) + bg(f(\vec{y})) \\
\implies&& h(a\vec{x}+b\vec{y}) &= ah(\vec{x}) + bh(\vec{y})
\end{align}
$$

> [!note]
> 虽然上面的描述中线性映射 $f$ 与 $g$ 都是基于有限维空间的向量，但实际上这个性质对于任意线性空间上的映射都适用。包括下文提到的线性映射组成的向量空间。

其次，**线性映射的线性组合还是线性映射**。要聊这条性质之前我们还缺了点定义，我们先补上：

> [!info]
> 假设有定义在 $V \to W$ 上的两个线性映射 $f$ 与 $g$ 。我们定义：
> 
> - $f+g$ 为映射的加法，有 ： $(f+g)(\vec{x}) = f(\vec{x}) + g(\vec{x})$
> - $kf$ 为映射的数乘，有： $(kf)(\vec{x}) = kf(\vec{x})$
> - $L(V, W)$ 为所有定义在 $V \to W$ 上的线性映射组成的集合。即 $f \in L(V, W)$ 且 $g \in L(V,W)$

脑袋灵活的同学就会发现了：哎哟，这个加法和数乘出来的结果还是一个定义在 $V\to W$ 上的线性映射哦！换句话说，结果还在 $L(V,W)$ 里！

对于映射的加法 $f + g = h$ ，有：

$$
\begin{align}
h(a\vec{x}+b\vec{y}) &= f(a\vec{x}+b\vec{y}) + g(a\vec{x}+b\vec{y}) \\
&=af(\vec{x})+bf(\vec{y})+ag(\vec{x})+bg(\vec{y}) \\
&=a(f(\vec{x})+g(\vec{x})) + b(f(\vec{y})+g(\vec{y})) \\
&=ah(\vec{x}) + bh(\vec{y})
\end{align}
$$

对于映射的乘法 $kf = h$ ，有：

$$
\begin{align}
h(a\vec{x}+b\vec{y}) &= kf(a\vec{x}+b\vec{y}) \\
&= k(af(\vec{x}) + bf(\vec{y})) \\
&= akf(\vec{x}) + bkf(\vec{y}) \\
&= ah(\vec{x}) + bh(\vec{y})
\end{align}
$$

再推广一点，如果我们称形如 $af+bg$ 为线性映射 $f$  、 $g$ 的线性组合，那么其线性组合的结果 $h(x) = (af + bg)(x)$ 依然是一个线性映射。（即得易见平凡。）

换一种说法，映射的加法与数乘就是定义在 $L(V, W)$ 上的向量加法与标量乘法，而且还符合向量空间需要符合的8条公理。（仿照上例显然。）没想到吧，不仅 $V$ 与 $W$ 是向量空间，线性映射的集合 $L(V,W)$ 也是一个向量空间！

### 线性映射与矩阵

实际上，我们可以很直觉地知道，如果我们将列向量左乘一个矩阵视为一个关于该向量的函数，那么这个函数是一种线性映射：

$$
\begin{align}

&若 K = \begin{bmatrix}
k_{11} & k_{12} &\dots &k_{1n} \\
k_{21} & k_{22} &\dots &k_{2n} \\
\vdots & \vdots &\ddots &\vdots \\
k_{m1} & k_{m2} &\dots &k_{mn}
\end{bmatrix} 为一个 M \times N 维矩阵， \vec{x} = \begin{bmatrix}
x_{1} \\
x_{2} \\
\vdots \\
x_{n}
\end{bmatrix} 为 N 维向量自变量。  \\
 \\
&令 f(\vec{x}) = K\vec{x}，有：
\end{align}
$$

$$
\begin{align}
f(a\vec{x}) &= af(\vec{x}) & \impliedby & &K(a\vec{x}) &= aK\vec{x} &(矩阵乘法与数乘的交换律) \\
f(\vec{x}+\vec{y}) &= f(\vec{x}) + f(\vec{y}) & \impliedby & &K(\vec{x}+\vec{y}) &= K\vec{x} + K\vec{y} &(矩阵乘法的分配律)
\end{align}
$$

> [!info]- 矩阵与正比例函数的关系
> 我们发现：哎哟，列向量左乘一个矩阵，跟正比例函数 $f(x) = kx$ 的情况真的很像哦！实际上，我们确实可以将向量左乘一个矩阵理解为高维度下的“正比例函数”。考虑一个最简单的例子，对于输入为二维向量，输出为一维向量（标量）的情况：
>
> $$
> f(x,y) = K\begin{bmatrix} x \\ y \end{bmatrix} = k_{1}x + k_{2}y
> $$
>
> 实际上他就是一个三维空间中过原点的平面。
> 
> - 对于 $x$ 方向，函数随 $x$ 正比例变化。
> - 对于 $y$ 方向，函数随 $y$ 以另一比例正比例变化。
> - 对于其他任意方向，函数以一个混合的比例随这个方向上的距离正比例变化。
>
> 而反过来，正比例函数也是左乘一个矩阵：这个矩阵为 $1 \times 1$ 矩阵，输入向量与输出向量维度都为 1 。

而另一方面，对于有限维的向量空间 $V$ 与 $W$ ，假设 $T: V \to W$ 是一个线性映射，那么 $T$ 就能表示为一个矩阵。相关证明这里就略去了，大家可以自行查找资料证明。（留作习题答案略，读者自证不难。） [^有限维线性映射一定能表示为一个矩阵]

[^有限维线性映射一定能表示为一个矩阵]: [线性映射 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%BA%BF%E6%80%A7%E6%98%A0%E5%B0%84#%E7%9F%A9%E9%99%A3)

一旦将线性变换理解为左乘矩阵，那线性映射的两个重要性质就变得很直观自然了！

对于线性映射的复合：

- 线性变换后再套一层线性变换，在矩阵层面就是左乘两个矩阵
- 由于矩阵乘法的结合律，我们可以先算两个矩阵之间的乘法
- 两个矩阵相乘依然是一个矩阵，也就是结果依然是一个线性变换

对于线性映射的线性组合：

- $\mathbb{R}^m\to \mathbb{R}^n$ 的线性映射，在矩阵层面就是 $M\times N$ 维矩阵，映射的加法、数乘就是矩阵的加法、数乘
- 对于相同维度的矩阵，矩阵加法的结果仍为维矩阵，矩阵数乘的结果仍为矩阵
- 相同维度矩阵的线性组合依然是矩阵，也就是线性变换的线性组合依然是线性变换

从矩阵乘法的角度来看线性变换，线性映射的复合依然是线性映射，线性映射的线性组合依然是线性映射，这两个结论可太自然了！

### 向量的长度：模，或者 L2 范数

严格来说，讲 $L_{2}$-范数之前应该先讲向量内积 $<\vec{x}, \vec{y}>$ 的定义，向量自己与自己内积的开方才是向量的模——或者说 $L_{2}$-范数的定义： $||\vec{x}|| = \sqrt{ <\vec{x}, \vec{x}> } = \sqrt{ \sum x_{i}^2 }$ 。

然而，内积相关的内容展开讲可以讲一大堆，而这些内容与这篇文章的主线偏离太大了。现在网上已经有许多很好的相关讲解，大家可以自行查阅。[^内积相关内容]

[^内积相关内容]: [【无痛线代】向量内积背后，竟然藏着宇宙的对称性？_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1QawbehELC/?spm_id_from=333.337.search-card.all.click&vd_source=ba01a1932b530e32e2576726fdda41d7)

$L_{2}$ 范数代表了一个向量的长度。如果我们想要测量两个向量 $\vec{x}$ $\vec{y}$ 相差的大小，我们可以计算他们之间差的 $L_{2}$ 范数： $||\vec{x}-\vec{y}|| = \sqrt{ <\vec{x}-\vec{y}, \vec{x}-\vec{y}> } = \sqrt{ \sum(x_{i} - y_{i})^2 }$ 。

## 微积分

有了线性代数基础，终于可以开始讲微积分了。大学上过高等数学课的同学要坐不住啦：什么！？微积分的基础不是 $\epsilon-\delta$ 语言和极限吗？不急，我们娓娓道来。

### 微分的本质是线性逼近

这时候就要回忆起我们当初是怎么学导数的了：“在函数上一点做一条**切线**，这样那样这样那样……”。其实这就是在函数上的一点做**线性逼近**：

$$
\mathrm{d}y = f'(x)\mathrm{d}x
$$

看着像正比例函数 $y = kx$ 吧？这里的导数 $f'(x)$ 就是切线的斜率，在函数的某一点附近，因变量微分 $\mathrm{d}y$ 与自变量微分 $\mathrm{d}x$ （也就是 $\Delta x$ ）成正比例关系，也就是线性关系。所以也称 $\mathrm{d}y$ 为 $\Delta y = f(x_{0}+\Delta x) - f(x_{0})$ 的线性主部。

![](https://upload.wikimedia.org/wikipedia/commons/f/f1/Dydx_zh.svg)

所以我们能很直观的感受什么叫微分啦：在离函数上一点足够近的范围内，我们用一个随自变量线性变化的值去近似代替这一点附近的函数值本身，这个线性变化的值就是微分 $\mathrm{d}y$ 。

可这又有人要说了：你这定义不严谨呀！什么叫做“足够近的范围内”？多近才叫做足够近？怎么样的线性变化的值才能跟函数值本身足够像？从上面的图我们也能很清楚的看出， $\mathrm{d}y$ 跟 $\Delta y$ 可不相等呀！

这就要说到“线性逼近”的另一个重点了：**线性逼近**一个重点是**线性**，另一个终点就是**逼近**，也就是极限 $\lim_{ x \to x_{0} }$ 这个符号。

> [!info]- 极限的严格定义
> 
> 对于所有的 $\epsilon > 0$ ，都存在 $\delta > 0$ 使得：
> 对任意的 $x \in D_{f}$ ，满足 $0 < | x-x_{0}| < \delta$ 时，都有 $|f(x) - L| < \epsilon$ 。 则称：
> $$
> \lim_{ x \to x_{0} } f(x) = L
> $$

说人话，就是能够找到一个 $L$ ，使得不管给定精度范围要求多精确，都能找到一个 $x_{0}$ 附近足够窄的范围，使得在这范围内的所有函数值都符合精度要求地近似于 $L$ 。

套回微分里，就是能够找到一个比例系数 $f'(x_{0})$ ，使得不管要求有多精确，都能找到一个足够窄的范围，使得在这范围里所有的 $\mathrm{d}y = f'(x_{0})\mathrm{d}x$ 都符合精度要求地近似于 $\Delta y = f(x+\Delta x) - f(x)$ 。

> [!info] 微分的严格定义
>
> 设函数 $y=f(x)$ 在某区间 $\mathcal {I}$ 内有定义。
> 
> 对于 $\mathcal {I}$ 内一点 $x_{0}$ ，当 $x_{0}$ 变动到附近的 $x_{0}+\Delta x$ （也在此区间内）时，如果函数的增量 $\Delta y=f(x_{0}+\Delta x)-f(x_{0})$ 可表示为 $\Delta y=A\Delta x+o(\Delta x)$ （其中 $A$ 是不依赖于 $\Delta x$ 的常数），而 $o(\Delta x)$ 是比 $\Delta x$ 高阶的无穷小，那么称函数 $f(x)$ 在点 $x_{0}$ 是可微的，且 $A\Delta x$ 称作函数在点 $x_{0}$ 相应于自变量增量 $\Delta x$ 的微分，记作 $\textrm{d}y$ ，即 ${\textrm {d}}y=A\Delta x$ ， ${\textrm {d}}y$ 是 $\Delta y$ 的线性主部。
> 
> 通常把自变量 $x$ 的增量 $\Delta x$ 称为自变量的微分，记作 $\mathrm{d}x$ ，即 $\mathrm{d}x = \Delta x$ 。

### 多元函数与多值函数的微分

线性代数部分我们也提到了，对于多元、多值函数，我们可以看成是自变量、因变量为向量的函数。那对于多元多值函数，我们能做微分吗？怎么定义微分呢？

我们还是回到微分的两个重点，也就是线性逼近的两个重点：线性与逼近。

首先是逼近。对于一个 N 维向量 $x_{0}$ ，怎么定义“ $x_{0}$ 附近足够窄的范围”呢？

我们想啊，“ $x_{0}$ 附近足够窄的范围“ 里的元素，不就是距离 $x_{0}$ 足够近的元素吗？那简单呀！用我们在线性代数里提到过的 $L_{2}$ 范数 $||\vec{x}-\vec{y}|| = \sqrt{ \sum(x_{i} - y_{i})^2 }$ 定义不就好咯！

然后是线性。这也简单呀！一个输入为 N 维向量，输出为 M 维向量的线性变换，不就是向输入变量左乘一个 $M \times N$ 维的矩阵嘛！

于是我们就能直观定义多元、多值函数上的微分了：

对于一个输入为 N 维向量 $\vec{x}$ ，输出为 M 维向量 $\vec{y}$ 的多元多值函数 $\vec{y} = f(\vec{x})$ ，我们称在点 $\vec{x_{0}}$ 处的微分为：

$$
\mathrm{d}\vec{y} = J\mathrm{d}\vec{x}
$$

对于如果我们能找到这样的一个系数矩阵 $J$ ，使得不管要求有多精确，都能找到一个足够窄的范围 $||\Delta \vec{x}|| < \delta$ ，使得这个范围内所有的 $\mathrm{d}\vec{y} = J\mathrm{d}\vec{x}$ 都符合精度地近似于 $\Delta \vec{y} = f(\vec{x_{0}} + \Delta \vec{x}) - f(\vec{x_{0}})$ ，即对于任何方向 $\vec{e}$ 的 $\Delta \vec{x}=h\vec{e}$ ，都有 $||\frac{\Delta \vec{y} - \mathrm{d}\vec{y}}{h}|| < \epsilon$ ，其中 $h=||\Delta \vec{x}||$ 。

> [!info]
> 其中系数矩阵 $J$ 为 $M \times N$ 维矩阵，称为雅可比矩阵：
> 
> $$
> J = \begin{bmatrix}
> \frac{ \partial y_{1} }{ \partial x_{1} }  & \frac{ \partial y_{1} }{ \partial x_{2} }  & \dots & \frac{ \partial y_{1} }{ \partial x_{n} }  \\
> \frac{ \partial y_{2} }{ \partial x_{1} }  & \frac{ \partial y_{2} }{ \partial x_{2} }  & \dots & \frac{ \partial y_{2} }{ \partial x_{n} }  \\
> \vdots  & \vdots & \ddots & \vdots \\
> \frac{ \partial y_{m} }{ \partial x_{1} }  & \frac{ \partial y_{m} }{ \partial x_{2} }  & \dots & \frac{ \partial y_{m} }{ \partial x_{n} } 
> \end{bmatrix}
> $$
> 
> 其中 $y_{m}$ 为因变量 $\vec{y}$ 的第 m 个分量， $x_{n}$ 为自变量 $\vec{x}$ 的第 n 个分量。$\frac{ \partial y_{m} }{ \partial x_{n} }$ 为因变量第 m 个分量对自变量第 n 个分量的偏导数。

这样说可能不够直观。让我们举一个例子作图更直观地感受多元函数的微分。

我们令函数 $z = f(x, y) = x^2 + y^2$ ，这是一个抛物面，在点 $(x_{0}, y_{0}) = (-0.5, 0.5)$ 处的线性逼近应为：

$$
dz = - dx - dy = \begin{bmatrix}
-1 & 1
\end{bmatrix}\begin{bmatrix}
dx \\
dy
\end{bmatrix}
$$


```jessiecode
---
axis: false
---

bound = [-1,1];
zbound = [0, 2];
planeStyle = <<
	fillOpacity:0.2, 
	mesh3d:<<
		stepWidthU:0.2,
		stepWidthV:0.2,
		strokeOpacity:0.2
	>>
>>;
view = view3d([-7,-7], [14,14], [bound,bound, zbound])<<
	xPlaneRear: planeStyle,
	yPlaneRear: planeStyle,
	zPlaneRear: planeStyle,
	projection: "central"
>>;

F = function(x,y){return x**2 + y**2;};
fg = functiongraph3d(view, F, bound, bound)<<strokeWidth:0.5,stepsU:70,stepsV:70>>;

px = slider([4,-8], [8,-8], [-1,-0.5,1]);
py = slider([4,-8], [4,-4], [-1,0.5,1]);

PX = function(){return px.Value();};
PY = function(){return py.Value();};
PZ = function(){return F(px.Value(), py.Value());};
P = point3d(view,PX,PY,PZ);

tanXY = function(x, y) {
	return 2*PX()*x+2*PY()*y-PX()*PX()-PY()*PY();
};
functiongraph3d(view,tanXY, bound,bound);
```



从 desmos 的函数图像里也可以看出，线性逼近组成一个点 $(x_{0},y_{0})$ 处的切平面，这是一个在三维空间中有两个自由度的线性图形。

> [!info]
> 我们可以直观感受到，多元单值函数的微分就是所谓全微分。

### 加减法法则、数乘法则与链式法则

回顾我们在线性代数中推导过的线性映射的两个重要性质：

- 线性映射的复合还是线性映射
- 线性映射的线性组合还是线性映射

既然我们已经知道，微分的本质是线性逼近，那这两个重要性质在微分中有没有什么体现呢？

有的兄弟，有的！

其一，从线性映射的复合可以推导出微分的链式法则。给出函数 $\vec{y}=f(\vec{u})$ 和 $\vec{u}=g(\vec{x})$ （都是多元多值函数哦，不过也对一元单值函数适用），我们要考虑复合函数 $\vec{y} = h(\vec{x}) = f(g(\vec{x}))$ 的微分 $\mathrm{d}\vec{y}$ 长什么样。

你们想啊，既然我们的微分是一个对原函数的逼近，也就是跟原函数的局部足够像！那既然原函数复合起来了，那我们微分是不是也要复合起来？那线性映射的复合，不就表现为矩阵乘法嘛。于是我们就有：

$$
\begin{align}
&\mathrm{d}\vec{y} = J_{f}\mathrm{d}\vec{u} \\
&\mathrm{d}\vec{u} = J_{g}\mathrm{d}\vec{x} \\
\implies &\mathrm{d}\vec{y} = J_{f}J_{g}\mathrm{d}\vec{x} = J_{h}\mathrm{d}\vec{x}\\ \\

即： &J_{h} = J_{f}J_{g}
\end{align}
$$

其二，从线性映射的线性组合还是线性映射，我们可以得到微分的加减法法则与乘法法则。给出函数 $\vec{y_{1}} = f(\vec{x})$ 与 $\vec{y_{2}} = g(\vec{x})$ （函数值 $\vec{y_{1}}$ 与 $\vec{y_{2}}$ 属于同一个向量空间），考虑函数值线性组合得到的新函数 $\vec{y}=h(\vec{x}) = af(\vec{x}) + bg(\vec{x})$ 的微分长什么样。

你们再想啊，函数的线性组合的结果的变化量，不也是变化量的线性组合嘛 $\Delta (af(\vec{x})+bg(\vec{x}))= a\Delta f(\vec{x}) + b\Delta g(\vec{x})$ ！（线性组合的差分是差分的线性组合，读者自证不难。）那既然我们的微分 $\mathrm{d}\vec{y}$ 近似于函数的变化量 $\Delta \vec{y}$ ，那函数线性组合的微分，不也应该是微分的线性组合嘛！

$$
\begin{align}
\mathrm{d}\vec{y} &= \mathrm{d}(a\vec{y_{1}} + b\vec{y_{2}}) \\
&= a\mathrm{d}\vec{y_{1}} + b\mathrm{d}\vec{y_{2}} \\
\implies &= aJ_{f}\mathrm{d}\vec{x} + bJ_{g}\mathrm{d}\vec{x} = J_{h}\mathrm{d}\vec{x}\\
 \\
即： J_{h} &= aJ_{f} + bJ_{g}
\end{align}
$$

其中当 $a = b = 1$ 时即为加法法则， $b = 0$ 时就为数乘法则。

哎哟，这么一看，微分的加减法法则、数乘法则、链式法则，都挺直观的哦！

> [!info]- 这对吗？
> 
> 对的对的对的……哦！不对不对不对。
> 
> 这上面的出来的线性组合、复合后的微分，线性是线性了，还没证明他逼近呀！线性逼近，线性和逼近一个都不能少。
> 
> 回想起 $\Delta \vec{y}$ 与 $\mathrm{d}\vec{y}$ 的关系：
> 
> $$
> \Delta \vec{y} = \mathrm{d}\vec{y} + o(\vec{x}) 
> $$
> 
> 其中 $o(\vec{x})$ 是关于 $\vec{x}$ 的高阶无穷小。要证明在上面线性组合、复合后得到的“微分”依然逼近，就是证明在线性组合、复合后剩余项依旧是关于 $\vec{x}$ 的高阶无穷小。
> 
> 对于函数的线性组合，可以很容易得出：
> 
> $$
> \begin{align}
> \Delta \vec{y} &= a\Delta \vec{y_{1}} + b\Delta \vec{y_{2}} \\
> &=(a\mathrm{d}\vec{y_{1}}+b\mathrm{d}\vec{y_{2}}) + ao_{1}(\vec{x})+bo_{2}(\vec{x}) \\
> &= d\vec{y} + o(\vec{x}) & (高阶无穷小的有限线性组合仍是高阶无穷小)
> \end{align}
> $$
> 
> 
> 而对于函数的复合，也容易得出：
> 
> $$
> \begin{align}
> \Delta \vec{y} &= J_{f}\mathrm{d}\vec{u} + o_{f}(\vec{u}) \\
> &= J_{f}(J_{g}\mathrm{d}\vec{x}+o_{g}(\vec{x})) + o_{f}(\vec{u}) \\
> &= J_{f}J_{g}\mathrm{d}\vec{x}+ J_{f}o_{g}(\vec{x}) + o_{f}(\vec{u}) \\
> &= J_{f}J_{g}\mathrm{d}\vec{x}+ J_{f}o_{g}(\vec{x}) + o_{f}(\vec{x}) && (\vec{u} 可以被 \vec{x} 一阶近似，因此 o_{f}(\vec{u}) 也为关于 \vec{x} 的高阶无穷小) \\
> &= J_{f}J_{g}\mathrm{d}\vec{x}+ o_{g}(\vec{x}) + o_{f}(\vec{x}) && (高阶无穷小的有限线性映射仍为高阶无穷小) \\
> &= J_{f}J_{g}\mathrm{d}\vec{x} + o(\vec{x}) && (有限个高阶无穷小的和仍为高阶无穷小)
> \end{align}
> $$
> 
> 这下我们终于算是严谨而又直观地从线性映射的两个性质证明了微分的加减法、乘法、链式法则了。

> [!info]
> 其实这两个法则可以换一种说法：
> 
> - 函数复合的线性逼近是线性逼近的复合
> - 函数线性组合的线性逼近是线性逼近的线性组合

### 乘法法则

与加减法、数乘法则和链式法则不同，函数值相乘的微分乘法法则似乎不能直接从线性映射的性质推导出来。

这是对的，因为乘法运算本身不是线性的（而是双线性的）。但也无妨，我们可以引入一个双线性函数 $\phi(u,v) = uv$ ，就可以把乘积函数 $h(\vec{x}) = f(\vec{x})g(\vec{x})$ 看作是 $f(\vec{x})$ 和 $g(\vec{x})$ 与双线性函数的复合： $h(\vec{x}) = \phi(f(\vec{x}), g(\vec{x}))$ 。

复合函数的微分链式法则我们上面已经研究过了，所以我们可以着重于研究双线性函数 $\phi(u, v)$ 的微分性质。

双线性函数 $\phi(u, v)$ 是一个二元函数，我们视 $(u, v)$ 为一个向量，自然也可以套入线性代数部分中已经推导得到的多元函数的微分：

$$
\begin{align}
\mathrm{d}\phi(u, v) &= \begin{bmatrix}
\frac{ \partial \phi }{ \partial u }  & \frac{ \partial \phi }{ \partial v }
\end{bmatrix}\begin{bmatrix}
\mathrm{d}u \\
\mathrm{d}v
\end{bmatrix} \\
&= \frac{ \partial \phi }{ \partial u } \mathrm{d}u + \frac{ \partial \phi }{ \partial v } \mathrm{d}v \\
&= v\mathrm{d}u + u\mathrm{d}v
\end{align}
$$

再应用回微分的链式法则，线性映射的复合还是线性映射，即可得：

$$
\begin{align}
\mathrm{d}h(\vec{x}) &= \mathrm{d}\phi(f(\vec{x}),g(\vec{x})) \\
 & = g(\vec{x})\mathrm{d}f(\vec{x})+f(\vec{x})\mathrm{d}g(\vec{x}) \\
 & = g(\vec{x})f'(\vec{x})\mathrm{d}x + f(\vec{x})g'(\vec{x})\mathrm{d}x
\end{align}
$$

即 $h'(\vec{x}) = f'(\vec{x})g(\vec{x}) + f(\vec{x})g'(\vec{x})$ 。


## 泛函分析

上面推导微分的加减法法则、数乘法则中，我们将函数值进行了线性组合。这是当然可行的，因为函数值是一个向量。

可是另一方面，将函数值进行线性组合后，从自变量映射到因变量依然是一个新的函数呀！那是不是能把这样的组合称为函数间的线性组合？难道……

### 函数是无穷维向量

没错，函数空间也是向量空间，函数也是向量。

要说明函数空间也是向量空间，我们还是回到向量空间的定义：定义两种运算，符合八条公理。

我们可以定义如下两种运算：

- **函数加法**：对于函数空间中的函数 $f$ 与 $g$ ，定义 $(f+g)(\vec{x}) = f(x) + g(\vec{x})$ 
- **函数标量乘法**：对于函数空间中的函数 $f$ 与域上的标量 $a$ ，定义 $(af)(\vec{x}) = af(\vec{x})$

容易证明得这两种运算符合八条公理。

我们也可以感性地去认知“函数是无穷维向量”这个结论：对于有限维向量如 $\vec{v} = \begin{bmatrix}v_{1}\\v_{2}\end{bmatrix}$ ，有两个分量 $v_{1}$ 和 $v_{2}$ ，其下标 1 和 2 映射到对应的分量，本身就可以认为是定义在集合 $\{1, 2\}$ 上的函数。向量的加法、数乘就是相同下标对应分量之间的加法、数乘。

而对于一个定义在 $(a,b)$ 上的函数 $f$ ，他的所有自变量的值都是其分量的下标，所有函数值 $f(x_{0})$ 都是其对应于下标 $x_{0}$ 的分量。对于函数的加法、数乘，都是相同下标下对应分量之间的加法、数乘。 $(a,b)$ 中有无穷个自变量，也即函数 $f$ 是无穷维的向量。

### 函数空间里的 L2 范数

要定义两个函数之间的“距离”，我们跟普通向量一样，需要定义函数空间里的 L2 范数。类比于有限维向量空间：

|            | 有限维向量空间 $\mathbb{R}^n$                                                | 函数空间                                                      |
| ---------- | :-------------------------------------------------------------------- | --------------------------------------------------------- |
| 向量         | 一个N维向量 $\vec{v}=\begin{bmatrix}v_1\\v_2\\ \vdots \\v_n \end{bmatrix}$ | 一个定义在 $(a,b)$ 上的函数 $f(x)$                                 |
| 内积         | 所有分量相乘之和 $\vec{u}\cdot\vec{v}=\Sigma u_{i}v_{i}$                      | 所有分量相乘之和 $<f, g> = \int_a^b f(x)g(x)\mathrm{d}x$          |
| $L_{2}$ 范数 | 向量与自己内积的开方 $\|\vec{v}\|=\sqrt{ (\Sigma v_{i}^2) }$                    | 向量与自己内积的开方 $\|f\|=\sqrt{ \int_{a}^b[f(x)]^2\mathrm{d}x }$ |
| 微元         | 变化量趋于零（ $\| \Delta \vec{x} \| \to 0$ ）时的微小变化 $\mathrm{d}\vec{v}$      | 变化量趋于零（ $\| \Delta f \|\to 0$ ）时的微小变化 $\delta f$          |
### 泛函——函数的函数

没想到吧，泛函分析讲这么久，居然还没讲“泛函”。

其实泛函没什么神秘——泛函就是输入为一个函数 $y(x)$ ，输出为一个数 $J[y]$ 的函数。想想编程语言里的高阶函数：既然函数也是一等公民，那函数的参数为一个函数也没什么奇怪的了，对吧。

再回到我们的线性代数与函数空间，我们之前说多元单值函数 $f(x,y)$ 实际上就是输入为一个向量 $\begin{bmatrix}x\\y\end{bmatrix}$，输出为一个数 $f(x,y)$ 的函数，那泛函不就是输入为一个无穷维向量的函数呗。

这样干说可能比较抽象，我们来举个🌰：

给定两个点 $A(x_{a}, y_{a})$ 与 $B(x_{b}, y_{b})$ 。在 $[x_{a}, x_{b}]$ 区间上有定义，且过 $A$ 、 $B$ 两点的不同函数，就是两点间的不同路径，他们组成一个函数空间。那么我们可以在这个函数空间上定义如下泛函：

$$
L[y] = \int_{a}^b \sqrt{ 1+(y'(x))^2 } \mathrm{d}x
$$

很明显，这个泛函的值就是输入函数在 $A$ 、 $B$ 两点之间的长度。

> [!note]
> 泛函这个概念最早在欧拉与拉格朗日研究变分问题（寻求具有某种极大或极小性质的曲线）的时候开始有研究。当时还没有泛函（functional）这个名词，而是模糊地称为“曲线的某种极小值”、“最优路径”、“最优形状”。正因这个历史背景，泛函说是函数的函数，但一般输出为一个标量值，与软件工程领域里说的高阶函数有些不同。
> 
> 但也存在“输入为一个函数，输出为一个函数的函数”，我们一般称之为**算子**。比如求导算子 $D$ 就是这样的一个算子，输入输出都为函数空间里的元素，而且还是一个线性算子： $D(af+bg) = aD(f) + bD(g)$ 。

### 变分——函数的微小变化

变分问题最早提出时，是因为欧拉与拉格朗日在研究类似“**寻求具有某种极大或极小性质的曲线**”的问题。后来，拉格朗日引入变分符号 $\delta$ 来表示函数的微小变化，从而将求极值问题转化为解微分方程的问题，使得推导过程更加系统和严谨。

回想起我们对微分的定义——函数在局部的线性逼近：

$$
\mathrm{d}\vec{y} = J\mathrm{d}\vec{x}
$$

> 如果我们能找到这样的一个系数矩阵 $J$ ，使得不管要求有多精确，都能找到一个足够窄的范围 $||\Delta \vec{x}|| < \delta$ ，使得这个范围内所有的 $\mathrm{d}\vec{y} = J\mathrm{d}\vec{x}$ 都符合精度地近似于 $\Delta \vec{y} = f(\vec{x_{0}} + \Delta \vec{x}) - f(\vec{x_{0}})$ ，即对于任何方向 $\vec{e}$ 的 $\Delta \vec{x}=h\vec{e}$ ，都有 $||\frac{\Delta \vec{y} - \mathrm{d}\vec{y}}{h}|| < \epsilon$ ，其中 $h=||\Delta \vec{x}||$ 。

既然函数空间也是一个向量空间，那我们也可以仿照向量微分来定义函数的变分 $\delta y$ 与泛函的变分 $\delta J[y]$。

假设我们有定义在区间 $[a, b]$ 上的一个光滑函数 $\hat{y} = \hat{y}(x)$ ，假如有一个与 $\hat{y}$ 足够像的光滑函数 $y = \hat{y} + \delta y$ ，使得：

$$
||\delta y|| = \sqrt{ \int_{a}^b [\delta y(x)]^2  \mathrm{d}x }
$$

足够小，则我们称 $\delta y$ 为函数 $y$ 的变分。

可以知道，变分 $\delta y$ 也是一个函数，但他的函数值处处都非常接近为 0 。我们也可类似的到 $\delta y' = y' - \hat{y}'$ ，也是一个函数值处处都几乎为零的函数。（变分可以理解为一个趋向于零的函数空间里的差分 $\Delta y$ ，因此对于线性的求导算子 $D$ 有保持性。）

从此我们就可以定义泛函的变分 $\delta J[y]$ ：

不管要求的精度范围 $\delta$ 有多么精确，都能找到一个足够窄的范围 $||\delta y|| < \epsilon$ ，使得在这个范围内对任何方向 $\delta y$ 的微小变化 $\epsilon\delta y$ ，都能找到一个值 $\delta J[y]$ ，使得 $|\frac{J[y+\epsilon\delta y] -J[y]}{\epsilon}-\delta J[y]|<\delta$ 。则称这个 $\delta J[y]$ 为泛函 $J[y]$ 的变分。

即：

$$
\begin{align}
\delta J[y;\delta y] &= \lim_{ \epsilon \to 0 } \frac{J[y+\epsilon\delta y]-J[y]}{\epsilon}  \\
&= \frac{\mathrm{d}}{\mathrm{d}\epsilon}J[y+\epsilon\delta y] \Big|_{\epsilon=0}
\end{align}
$$

其实我们对比回函数的微积分可以发现，泛函的变分 $\delta J[y]$ 与其说像微积分里的微分 $\mathrm{d}y$ ，不如说更像是导数 $f'(x)$ 。泛函的变分代表了泛函 $J[y]$ 在某一输入函数 $\hat{y}$ 附近的，在 $\delta y$ 方向上的变化率，是一个标量值。

> [!note] 说人话：
> 泛函的变分 $\delta J[y]$ 描述了：给输入函数 $y$ 一点微小扰动 $\delta y$ ，泛函 $\delta J[y]$ 的结果值是增加还是减少，增加得有多快。

### 变分法基本引理

在讲变分法基本原理之前，我们先从有限维的向量引入。我们考虑以下问题：什么样的向量 $\vec{v}$ ，能对任何方向的向量 $\vec{u}$ ，都有内积 $\langle\vec{u},\vec{v}\rangle ={0}$ 成立？

很明显，这个命题成立，当且仅当 $\vec{v}=\mathbf{0}$ 。因为如果 $\vec{v}\neq \mathbf{0}$ ，总能找到一个与 $\vec{v}$ 同方向的非零向量 $\vec{u}$ ，使得 $\langle \vec{u}, \vec{v}\rangle >0$ 。（因为内积有正定性，同向向量的内积总是大于等于 0 ）。

那么，既然函数空间也是一个向量空间，函数是不是也有类似的性质？

是的，这个类似的性质就是“变分法基本引理”。

> [!info] 变分法基本引理
> 
> 对于区间 $[a, b]$ 内无限光滑的所有函数 $f(x)$ 组成的集合 $C^{\infty}[a,b]$ ，容易证明其组成一个向量空间。而满足 $h(a) = h(b) = 0$ 的任意函数 $h(x)$ 也属于这个函数空间。
> 
> 若函数 $f(x) \in C^{\infty}[a,b]$ 满足对任意 $h(x)$ ，都有：
> 
> $$
> \langle f, h\rangle = \int_{a}^{b} f(x)h(x) \mathrm{d}x = 0
> $$
> 
> 那么这个 $f(x)$ 必然为零函数，即 $f(x)\equiv 0$ 。换句话说，对于 $\forall x \in [a, b]$ ，都有 $f(x) = 0$ 。

证明方法与有限维向量的证明类似，使用反证法：证明只要 $f(x)$ 不为零函数，则必然能找到一个 $h(x)$ 使得 $\langle f,h\rangle \neq 0$ 。

假如函数 $f(x)$ 不为零函数，我们可以设计一个函数 $r(x) \in C^{\infty}[a, b]$ ，满足：

$$
\begin{align}
 & r(a) = r(b) = 0 \\
 & \forall x \in (a, b) , 有： r(x) > 0
\end{align}
$$

则令 $h(x) = r(x)f(x)$ ，易知 $h(a) = h(b) = 0$ 且 $h(x) \in C^{\infty}[a, b]$ 。而且：

$$
\langle f, h \rangle = \int_{a}^{b} r(x)[f(x)]^2 \, \mathrm{d}x > 0 
$$

与前提矛盾。

因此，如果 $\langle f, h\rangle = \int_{a}^{b} f(x)h(x) \mathrm{d}x = 0$ ，这个 $f(x)$ 必然为零函数。


> [!info]
> 这是《从线性代数到分析力学》上下两篇中的上篇。下篇为 [[2025-09-29-from-linear-algebra-to-analytical-machanics-1|从线性代数到分析力学（下）]]。