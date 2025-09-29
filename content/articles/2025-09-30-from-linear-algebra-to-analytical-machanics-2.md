---
created_at: 2025-09-30T13:42:54
updated_at: 2025-09-30T13:43:10
title: 从线性代数到分析力学（下）
summary: 是《从线性代数到分析力学》系列的下篇，承接上篇的数学基础，重点探讨如何将变分法应用于分析力学。文章从泛函极值问题出发，详细推导了欧拉-拉格朗日方程，并以最短路径问题为例进行演示。随后，沿着物理史脉络，从虚功原理、达朗贝尔原理逐步引出拉格朗日提出的最小作用量原理，定义了拉格朗日量，并引入广义坐标，最终建立起与牛顿力学等价但更具普适性的分析力学框架。全文揭示了数学工具如何为物理理论提供深刻而统一的描述，展现了从局部矢量分析到整体能量描述的思维飞跃。
---
> [!info]
> 这是《从线性代数到分析力学》上下两篇中的下篇，上篇为[[2025-09-29-from-linear-algebra-to-analytical-machanics-1|从线性代数到分析力学]]。

## 极值问题到变分问题

最早，欧拉研究总结了短程线问题、等周问题等一大类类似“求取得极值时的曲线”的问题，并提出能使用了后来被称为“欧拉-拉格朗日方程”的通用的方法来求解这类问题。可惜此时欧拉的推导过程使用了大量分析与几何结合的手段，十分复杂也缺乏严谨，欧拉自己也对此并不满意。[^长河劫变分法]

后来，拉格朗日引入了变分符号 $\delta$ 来表示函数的“微小变化”，将求极值的问题转化为解微分方程的问题，使推导过程更加严谨。拉格朗日在欧拉-拉格朗日方程的基础上继续完善，发明了**变分法**——处理泛函极值问题的纯分析方法，并利用变分法提出了最小作用量原理的正确形式。[^长河劫变分法][^长河劫分析力学]

[^长河劫变分法]: [【数学史】泛函与变分法_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1qx3gzvEGS/?vd_source=ba01a1932b530e32e2576726fdda41d7)
[^长河劫分析力学]: [【科学史】牛顿的未竟之路——分析力学_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1frbXzKEQj/?vd_source=ba01a1932b530e32e2576726fdda41d7)

可以说，变分法，乃至整个泛函分析学科，最初都是为了研究最小作用量这种泛函取极值的问题而发明出来的。

### 函数的极值问题

在研究泛函的极值问题之前，我们先来看看函数的极值我们是怎么求解的。

> [!info] 什么是极值
> 以极小值为例，极大值亦然。简单来说，极小值点就是光滑函数在某一局部范围内的最小值点。严格来说：
> 
> 如果 $\vec{x_{0}}$ 是光滑函数 $f(\vec{x})$ 的一个极小值点，那么，对于某一个足够小的范围 $0<||\mathrm{d}\vec{x}||<\epsilon$ ，在这范围内的所有函数值 $f(\vec{x_{0}}+\mathrm{d}\vec{x})$ ，都有 $f(\vec{x_{0}})<f(\vec{x_{0}}+\mathrm{d}\vec{x})$ 。

对于多元单值函数 $f(\vec{x})$ ，有 $\mathrm{d}f(\vec{x}) = D_{f}\mathrm{d}\vec{x}$ 。当 $f(\vec{x})$ 取得极值时，会有 $D_{f} = \mathbf{0}$ ，即 $\frac{ \partial f }{ \partial x_{1} }=0$ , $\frac{ \partial f }{ \partial x_{2} }=0$ , ……, $\frac{ \partial f }{ \partial x_{n} }=0$ 。

> [!info] 为什么？
> 因为如果 $D_{f}$ 不为零，则意味着在某一个方向上，给 $\vec{x}$ 一个微小的变化 $\mathrm{d}\vec{x}$ ，函数值 $f(\vec{x}+\mathrm{d}\vec{x})$ 会比 $f(\vec{x})$ 要更小（大），即 $f(\vec{x})$ 不是局部的最小（大）值。

这个结论是一个必要条件，但不是充分条件，因为会出现 $f(x) = x^3$ 中 $x=0$ 时的情况。另外这个结论适用的前提是函数 $f(\vec{x})$ 足够光滑。

虽然有如此多的适用前提，但正如背景故事中提到，最早欧拉与拉格朗日都是为了研究物理问题而发明了变分法。而物理问题中的函数基本都能保证光滑，因此求极值的这个条件也足够实用。

### 泛函的极值问题

泛函的极值问题——也就是**变分问题**，是指求在泛函 $J[y]$ 在取得极值时，求此时的输入函数 $y^*$ 的问题。

这样说可能比较抽象，我们举一个具体的🌰：过两点 $A(x_{a}, y_{a})$ 与 $B(x_{b}, y_{b})$ 之间，到底走哪一条路能使走的路程最短？

过两点之间的一条路，我们都能理解为符合 $y(x_{a})=y_{a}$ 且 $y(x_{b})=y_{b}$ 的一个函数 $y(x)$ 。而过两点的路程就是这个函数在区间 $(x_{a}, x_{b})$ 内的路径积分：

$$
L[y] = \int_{a}^b \sqrt{ 1+[y'(x)]^2 }\mathrm{d}x
$$

那求路径最短的那一条路，就是求当 $L[y]$ 取得极小值 $L[y^*]$ 时对应的那个输入函数 $y^*(x)$ 。

> [!info] 泛函极值的严格定义
> 以极小值为例。如果 $y^* (x)$ 是泛函 _J[y]_ 的一个极小值点，那么，对于某个足够小的范围 $0<||\delta y||<\epsilon$ ，在这范围内所有的泛函值 $J[y^*+\delta y]$ ，都有 $J[y^*] < J[y^*+\delta y]$ 。

与函数的极值问题类似，光滑泛函在 $y^*(x)$ 处取得极值时的必要条件，是对于所有方向上的变分 $\delta y(x)$ 都有：

$$
\delta J[y^*;\delta y] = 0
$$

> [!info] 简单证明
> 
> 假设存在某个特定的容许变分 *η(x)*，使得 $δJ [y*; η] ≠ 0$ ，例如 $δJ [y*; η] = c > 0$ 。
> 根据方向导数的定义，对于足够小的正数 $h$ ，我们有：
> 
> $$
> \frac{J[y^* + h \eta] - J[y^*]}{h} \approx c > 0
> $$
> 
> 这意味着 $J[y* + h η] > J[y*]$ 。
> 现在考虑反方向的扰动 $-η(x)$ 。由于定义是线性的，$δJ [y*; -η] = -δJ [y*; η] = -c < 0$ 。
> 那么，对于足够小的 $h$ ，我们有：
> 
> $$
> \frac{J[y^* - h \eta] - J[y^*]}{h} \approx -c < 0
> $$
> 
> 这意味着 $J[y* - h η] < J[y*]$ 。
> 
> 因此，在 $y^* (x)$ 的任意小邻域内（即无论 $||δy||$ 多小），我们总可以找到使 $J$ 值更大（ $y + hη$ ）和更小（$y - hη$）的点。这与 $y^*$ 是局部极值点的假设矛盾。所以最初的假设（存在某个 $η$ 使 $δJ ≠ 0$）是错误的。证毕。

### 变分法

很好，结论很漂亮，可是我们具体要怎么做才能解变分问题呢？

我们以上面已经反复提到的，求两点间最短路径的问题为例。

这个问题很简单，就连小学生都知道最短的路径是走直线。可是这又没那么简单，毕竟这是一个变分问题，我们要从变分法的角度来去解它。

> [!info] 重申一下问题
> 过两点 $A(a, y_{a})$ 与 $B(b, y_{b})$ 之间的每条路，都是符合 $y(a)=y_{a}$ 且 $y(b)=y_{b}$ 的一个函数 $y(x)$ 。而过两点的路程就是这个函数在区间 $(a, b)$ 内的路径积分：
> 
> $$
> L[y] = \int_{a}^b \sqrt{ 1+[y'(x)]^2 }\mathrm{d}x
> $$
> 
> 那求路径最短的那一条路，就是求当 $L[y]$ 取得极小值 $L[y^*]$ 时对应的那个输入函数 $y^*(x)$ 。

假设泛函 $L[y]$ 在 $y^*(x)$ 处取得极小值 $L[y^*]$ 。我们对 $y^*(x)$ 施加一个微小扰动： 

$$
Y(x) = y^*(x) + \delta y(x)
$$

由于 $y^*(x)$ 与 $y^*(x)+\delta y(x)$ 都符合 $y(a)=y_{a}$ 且 $y(b)=y_{b}$ ，那么我们易知，这个微小扰动 $\delta y(x)$ 需要符合：

$$
\delta y(a)=\delta y(b) = 0
$$

我们令 $\eta(x)$ 为符合 $\eta(a)=\eta(b)=0$ 的任意函数，那么在 $\eta$ 方向上的变分 $\delta y$ 就可表示为 $h\eta$ ，其中 $h$ 为一个接近 0 的实数。

> [!note]
> 函数空间也是向量空间，函数也是无穷维向量，函数的方向可以类比向量的方向。

我们将 $Y(x)$ 对 $x$ 求导，由于求导运算的加减法法则与数乘法则（或者也可以说是求导算子的线性性），可得：

$$
Y'(x) = y^{*\prime}(x) + \delta y'(x) = y^{*\prime}(x) + h\eta'(x)
$$

我们把经过微小扰动后的 $y^*(x)+\delta y(x)= y^*(x)+h\eta(x)$ 代入泛函 $L[y]$ ：

$$
L[y^*+h\eta] =  \int_{a}^b \sqrt{ 1+[y^{*\prime}(x)+h\eta'(x)]^2 }\mathrm{d}x
$$

固定住微小扰动的方向 $\eta(x)$ ，此时泛函的输出值就成了关于 $h$ 的一元单值函数 $\Phi(h)$：

$$
\Phi(h) = L[y^*+h\eta] = \int_{a}^b \sqrt{ 1+[y^{*\prime}(x)+h\eta'(x)]^2 }\mathrm{d}x
$$

由于 $L[y]$ 在 $y^*$ 处取得极值，则有对于任意的扰动方向 $\eta(x)$ ，都有 $\Phi(h)$ 在 $h=0$ 处取得极值：

$$
\delta L[y^*;\delta y] = \frac{d}{dh} \Phi(h) \Big|_{h=0}  = 0
$$

我们计算 $\frac{\mathrm{d}\Phi}{\mathrm{d}h}$ ：

$$
\begin{align}
\frac{\mathrm{d}}{\mathrm{d}h}\Phi(h)  & = \frac{\mathrm{d}}{\mathrm{d}h}\int_{a}^b \sqrt{ 1+[y^{*\prime}(x)+h\eta'(x)]^2 }\mathrm{d}x \\ \\
 & = \int_{a}^{b} \frac{ \partial }{ \partial h } (\sqrt{ 1+[y^{*\prime}(x)+h\eta'(x)]^2 } ) \mathrm{d}x  & （莱布尼茨法则） \\
 & = \int_{a}^{b} \left(\frac{1}{2\sqrt{ 1+[y^{*\prime}(x)+h\eta'(x)]^2 }} \times 2[y^{*\prime}(x)+h\eta'(x)] \times \eta'(x) \right) \mathrm{d}x  & （链式法则） \\
 & = \int_{a}^{b} \eta'(x) \left(\frac{y^{*\prime}(x)+h\eta'(x)}{\sqrt{ 1+[y^{*\prime}(x)+h\eta'(x)]^2 }}  \right) \mathrm{d}x
\end{align}
$$

由于 $\Phi(h)$ 在 $h=0$ 处取得极值，代入 $h=0$ 与 $\frac{\mathrm{d}\Phi}{\mathrm{d}h} = 0$ ：

$$
\begin{align}
\frac{\mathrm{d}}{\mathrm{d}h}\Phi(h) \Big|_{h=0}  & = \int_{a}^{b} \eta'(x) \left(\frac{y^{*\prime}(x)+h\eta'(x)}{\sqrt{ 1+[y^{*\prime}(x)+h\eta'(x)]^2 }}  \right) \mathrm{d}x \Big|_{h=0} \\
 & = \int_{a}^{b} \eta'(x) \left(\frac{y^{*\prime}(x)}{\sqrt{ 1+[y^{*\prime}(x)]^2 }}  \right) \mathrm{d}x  \\
 & = \left[ \eta(x) \left( \frac{y^{*\prime}(x)}{\sqrt{ 1+[y^{*\prime}(x)]^2 }}\right)\right]_{a}^b - \int_{a}^{b} \eta(x) \frac{\mathrm{d}}{\mathrm{d}x} \left(\frac{y^{*\prime}(x)}{\sqrt{ 1+[y^{*\prime}(x)]^2 }}  \right) \mathrm{d}x  & （分部积分消去 \eta'） \\
 & = - \int_{a}^{b} \eta(x) \frac{\mathrm{d}}{\mathrm{d}x} \left(\frac{y^{*\prime}(x)}{\sqrt{ 1+[y^{*\prime}(x)]^2 }}  \right) \mathrm{d}x  & （\eta(a) = \eta(b) = 0） \\
 & = 0
\end{align}
$$

> [!info]- 为什么需要消去 $\eta'(x)$ ？
> 
> 对于任意扰动的方向 $\eta(x)$ ，都有一个需要遵守的约束 $\eta(a) = \eta(b) = 0$ 。因此，实际上 $\eta'(x)$ 有一个很强的约束：
> 
> $$
> \int_{a}^{b} \eta'(x)\mathrm{d}x = \eta(a) - \eta(b) = 0
> $$
> 
> 这意味着 $\eta'(x)$ 只能代表那些“平均值为零”的函数，而不能代表所有可能函数，因此也不能直接用 $\eta'(x)$ 来适用变分法基本引理。
> 
> 比如：被积函数中的部分  $f(x) = \frac{(y^*)'(x)}{\sqrt{1 + [(y^*)'(x)]^2}}$ 是一个非零常数（实际上就是这次的情况）。那么积分变为：
> $$
> \int_{a}^{b} \eta'(x) \cdot C \, dx = C \int_{a}^{b} \eta'(x) \, dx = C \cdot [\eta(x_b) - \eta(x_a)] = 0.
> $$
> 
> 这说明，如果 $f(x)$ 是常数，积分总是为零，无论 $C$ 是否为零。但如果直接套用变分法基本引理，会推出 $f(x) \equiv 0$ ，与实际结果谬之千里。

在你的证明中，直接得出结论 \(f(x) \equiv 0\) 是错误的，因为它忽略了 \(\eta'(x)\) 的约束。正确的做法是使用分部积分，将问题转化为更标准的形式。

由于当泛函 $L[y]$ 取极值时，这个等式对所有扰动的方向 $\eta(x)$ 都成立，由变分法基本引理，有以下等式在区间 $(a,b)$ 上恒成立：

$$
\frac{\mathrm{d}}{\mathrm{d}x} \left(\frac{y^{*\prime}(x)}{\sqrt{ 1+[y^{*\prime}(x)]^2 }}  \right) \equiv 0
$$

也即，以下微分方程在区间 $(a,b)$ 上恒成立：

$$
\frac{y^{*\prime}(x)}{\sqrt{ 1+[y^{*\prime}(x)]^2 }} \equiv C
$$

这下看懂了， $y^{*\prime}(x)$ 不就是常数嘛！

$$
y^{*\prime}(x) = \pm \frac{C}{\sqrt{ 1-C^2 }}= k
$$

$y^*(x)$ 的一阶导为常数，那 $y^*(x)$ 就为一次函数。得：

$$
\begin{align}
 & y^*(x) = kx+b
\end{align}
$$

其中， $k$， $b$ 为能使 $y^*(a) = y_{a}$ 且 $y^*(b) = y_{b}$ 的值。


### 欧拉-拉格朗日方程

叽里咕噜说了一大堆，结果只证明了连小学生都懂的两点之间直线最短！这欧拉行不行啊。

实际上，欧拉与拉格朗日所做的工作，并不是证明了一个问题，而是总结出了一大堆类似问题的通用解决方法——欧拉-拉格朗日方程。对于如下形式的泛函：

$$
J[y] = \int_{a}^{b} F(x,y(x), y'(x)) \, \mathrm{d}x
$$

可以直接套用欧拉-拉格朗日方程，求得当 $J[y]$ 取得极值时的函数 $y^*(x)$ 。其中 $F$ 为一个已知的，关于三个变量 $x,y,y'$ 的三元函数。

> [!note]
> 在求路径最短的问题中，对应的 $F$ 为 $F(x,y,y')=\sqrt{ 1+(y')^2 }$ 。此时的 $F$ 只与 $y'$ 有关，与 $x$ 、 $y$ 都不直接相关。

接下来我们仿照之前推导出过两点间直线最短的方式，推导出欧拉-拉格朗日方程。

假设泛函 $J[y]$ 取得极值时的函数为 $y^*(x)$ 。我们令 $\eta(x)$ 为符合 $\eta(a)=\eta(b)=0$ 的任意函数，那么在 $\eta$ 方向上的变分 $\delta y$ 就可表示为 $h\eta$ ，其中 $h$ 为一个接近 0 的实数。

对 $y^*(x)$ 施加一个微小扰动，然后对 $x$ 求导，分别可得： 

$$
\begin{align}
y  & = y^* + \delta y = y^* + h\eta \\
y' & = y^{*\prime} + \delta y' = y^{*\prime} + h\eta'
\end{align}
$$

代入泛函 $J[y]$ ，固定住微小扰动的方向 $\eta(x)$ ，得到一个关于 $h$ 的一元单值函数 $\Phi(h)$：

$$
\Phi(h) = J[y^*+h\eta] = \int_{a}^{b} F(x, y^*+h\eta,y^{*\prime} + h\eta') \, dx 
$$

> [!note]
> 对应到求路径最短的问题中，就是 $\Phi(h) = \int_{a}^b \sqrt{ 1+(y^{*\prime}+h\eta')^2 }\mathrm{d}x$ 。

由于 $J[y]$ 在 $y^*$ 处取得极值，则有对于任意的扰动方向 $\eta(x)$ ，都有 $\Phi(h)$ 在 $h=0$ 处取得极值：

$$
\delta J[y^*;\delta y] = \frac{d}{dh} \Phi(h) \Big|_{h=0}  = 0
$$

展开计算：

$$
\begin{align}
\delta J[y^*;\delta y] & = \frac{\mathrm{d}\Phi}{\mathrm{d}h}\Big|_{h=0} \\
 & = \frac{\mathrm{d}}{\mathrm{d}h} \int_{a}^{b} F(x, y^*+h\eta,y^{*\prime} + h\eta') \, \mathrm{d}x \Big|_{h=0} \\
 & = \int_{a}^{b} \frac{ \partial }{ \partial h } F(x, y^*+h\eta,y^{*\prime} + h\eta') \, \mathrm{d}x \Big|_{h=0} & （莱布尼茨法则） \\
 & = \int_{a}^{b} \left( \frac{ \partial F }{ \partial y } \eta+\frac{ \partial F }{ \partial y' } \eta' \right) \, \mathrm{d}x & （链式法则） \\
 & = \int_{a}^{b} \frac{ \partial F }{ \partial y } \eta \, \mathrm{d}x + \left[\frac{ \partial F }{ \partial y' } \eta \right]_{a}^b - \int_{a}^{b} \eta\frac{\mathrm{d}}{\mathrm{d}x}\frac{ \partial F }{ \partial y' }  \mathrm{d}x & （将含 \eta' 项进行分部积分，消除 \eta' 项） \\
 & = \int_{a}^{b} \eta \left( \frac{ \partial F }{ \partial y } - \frac{\mathrm{d}}{\mathrm{d}x} \frac{ \partial F }{ \partial y' } \right) \mathrm{d}x  & （\eta(a)=\eta(b)=0，消去 \left[\frac{ \partial F }{ \partial y' } \eta \right]_{a}^b 项） \\
 & = 0
\end{align}
$$

> [!note]
> - 对应到求路径最短的问题中，就是 $\int_{a}^{b} \eta \frac{\mathrm{d}}{\mathrm{d}x} \left(\frac{y^{*\prime}}{\sqrt{ 1+(y^{*\prime})^2 }}  \right) \mathrm{d}x = 0$ 。

这对于任意扰动方向 $\eta(x)$ 都成立，由变分法基本引理，得：

$$
\boxed{\frac{ \partial F }{ \partial y } -\frac{\mathrm{d}}{\mathrm{d}x}\frac{ \partial F }{ \partial y' } = 0}
$$

这就是欧拉-拉格朗日方程。

> [!info] 总结一下，就是：
> 对于如下形式的泛函：
> 
> $$
> J[y] = \int_{a}^{b} F(x,y(x), y'(x)) \, \mathrm{d}x
> $$
> 
> 当 $J[y]$ 取得极值时，有：
> 
> $$
> \frac{ \partial F }{ \partial y } -\frac{\mathrm{d}}{\mathrm{d}x}\frac{ \partial F }{ \partial y' } = 0
> $$

我们试着套用欧拉-拉格朗日方程来求解路径最短问题。因为路径最短的问题中 $F=\sqrt{ 1+(y')^2 }$ 与 $y$ 不直接相关，所以 $\frac{ \partial F }{ \partial y } = 0$ 被直接略去。而 $\frac{ \partial F }{ \partial y' }$ 项为：

$$
\frac{ \partial F }{ \partial y' } = \frac{y'}{\sqrt{ 1+(y')^2 }}
$$

代入得：

$$
\begin{align}
\frac{\mathrm{d}}{\mathrm{d}x} \frac{y'}{\sqrt{ 1+(y')^2 }} & = 0 \\
\frac{y'}{\sqrt{ 1+(y')^2 }} & = C \\
y' & = \pm \frac{C}{\sqrt{ 1-C^2 }} \\
y'  & = k
\end{align}
$$

也可解得  $y^*(x)$ 为一次函数。

## 分析力学

上面几章都是数学，进入到最后一章终于要开始讲物理了，路漫漫其修远兮。

我们在介绍数学的时候，一般会从更基础、更抽象、更本质的东西开始讲，因为这个顺序逻辑层层递进，会比较好理解。然而一般来说，越本质、越基础的东西在时间上就越晚被发明。因为在历史上一般都是先研究明显、表层的东西，然后才慢慢深入、挖掘出表象背后的本质。

> [!note]
> 牛顿和莱布尼茨在 17 世纪就发明了微积分，拉格朗日在 18 世纪就已经发明了变分法。然而作为微积分基础的线性代数和极限的严格定义直到 19 世纪才被系统地整理成理论。

介绍物理的顺序会与介绍数学的顺序有很大不一样。物理是用来描述现实世界里的规律的，越是本质、抽象的东西平时就越少接触。没有一个现实里的模型来对照，也就越难理解。如果一上来就讲量子力学，然后才是大数定律回归宏观世界，那谁都遭受不住呀。

反而，物理随着历史的脉络发展，是有一定的逻辑顺序关联的，内容也可以由浅至深。顺着物理史来学，虽然会绕一些弯路，但逻辑脉络上反而更清晰。

接下来我们就顺着历史发展的脉络，来一步一步引入分析力学。

### 虚功原理

搞过物理竞赛的同学可能 DNA 要动了，这不就是静力学大题的必杀技——虚位移原理嘛！

虚位移原理最早由约翰·伯努利（Johann Bernoulli）在1717年提出，后来也叫虚功原理，是同一个原理的两种表述。

虚位移原理简单来说就是：如果一个系统处于惯性状态，运动轨迹为 $\vec{x}$ 是关于时间 $t$ 的函数。给这个系统一个微小的变化“虚位移” $\delta \vec{x}$ ，所有力做功的总和为零：

$$
\delta W = \sum_{i}\vec{F_{i}} \cdot \delta \vec{r} = 0
$$

由于点乘运算双线性，而又由于 $\delta\vec{x}$ 是任意方向的微小位移，实际上上式完全等价于：

$$
\sum_{i} \vec{F_{i}} = 0
$$

好家伙，这不就是牛顿第一定律嘛，系统处于惯性状态时合力为零。又绕回来了。实际上，虚位移原理与受力平衡时的牛顿力学原理就是完全等价的。

### 惯性力和达朗贝尔原理

可是，虚位移原理只适用于静力学问题。当物体受力不平衡，处于非惯性运动时，又该怎么办呢？

达朗贝尔（Jean le Rond d'Alembert）翻开历史堆（其实也就 50 多年前），发现牛顿提出过一种假象的力——**惯性力**：比如做圆周运动的物体，不就像是受到了惯性力的作用吗。

那感情好呀，通过引入这种假想的惯性力，动力学问题不就相当于一个所有受力加上惯性力受力平衡的静力学问题了吗：

$$
\sum_{i}\vec{F_{i}} - m\vec{a} = 0
$$

于是达朗贝尔在1743年提出了达朗贝尔原理：引入假想的惯性力，假设这种惯性力也能做虚功。仿照虚位移原理，给受力不平衡的动力学系统一个虚位移 $\delta \vec{x}$ ，所有力加上惯性力所做功的总和为零：

$$
\sum_{i} \vec{F_{i}} \cdot \delta \vec{r} - m\vec{a}\cdot\delta \vec{r}=0
$$

实际上，达朗贝尔原理与牛顿第二定律也完全等价。

### 最小作用量原理

最小作用量原理最早是由莫佩尔蒂（Pierre-Louis Maupertuis）在1744年提出的。在当年，人类在物理学方面的成就，主要集中在了几何光学和力学这两大类。

然而当年的力学理论，来来去去也主要就是牛爵爷那一套。而几何光学的理论却有两套：一套是由光的直线传播、反射定律、折射定律为基础的局部描述版本，另一套是费马的“光总是沿总时间最短的路径传播“，也就是整体描述版本。

> [!note]
> 费马的整体描述版本中，光就像是开了天眼一样，出发前会先用变分法算一通，找到用时最短的路径。哇，比我们大多数本科生牛逼多了。
> 
> （不过费马那年代还远没有变分法提出的时候呀。）

力学与几何光学差别太大啦，莫佩尔蒂强迫症都要犯啦！于是他在《论此前看似不相容的各种自然规律的统一》中就提出几何光学与力学可以用一个统一的底层原理来解释——最小作用量原理：自然界中的运动规律，都是要把某个叫做“作用量”的东西取到最小。

> [!note]
> 好了，莫佩尔蒂的故事到这就结束了，后面没他的事了。
> 
> 为什么？因为他提出的这个“作用量”，是：
> 
> $$
> 质量\times速度\times路程
> $$
> 
> 这瞎乘一通都什么跟什么呀，也没给解释，说服得了谁呀。

莫佩尔蒂是欧拉的师弟，欧拉与拉格朗日当时已经发明欧拉-拉格朗日方程了。当时欧拉就一直鼓励拉格朗日建立一种正确的，最小作用量形式的力学理论。

拉格朗日坚信，正确的最小作用量形式的力学理论，应当是一种与牛顿力学完全等价的，基于极值形式的力学理论。于是他就从历史堆里翻找，看看有没有能用的类似结论。

他首先找到的是自己师祖约翰·伯努利提出的虚位移原理：

$$
\delta W = \sum_{i}\vec{F_{i}} \cdot \delta \vec{r} = 0
$$

某个东西的变化量等于零？嗯……此时有一道激光从屏幕左上角往右下角穿过，还要配上经典的柯南 BGM 。这不就像是某种泛函取极值时的结论吗！？作为欧拉-拉格朗日方程的发明者之一，这可太熟悉不过了！

外力对物体做的功，代表了环境与物体间能量的转换，从形式上来看这个能量要只与位移有关。只与位移有关的能量，不就是势能嘛。

所以拉格朗日找到了这样的一个势函数 $-V(\vec{r})$ ，他的变分就是虚位移下的做功：

$$
\sum_{i}\vec{F_{i}}\cdot\delta \vec{r} = - \frac{ \partial V }{ \partial \vec{r} } \cdot \delta \vec{r} = -\delta V
$$

这个变分等于零，也就意味着势函数 $-V(\vec{r})$ 取极值。也就是说在受力平衡时，这个取到最小的作用量就是势函数 $-V(\vec{r})$ 。

可是，如果仅有虚位移原理作基础，这样发展出来的最小作用量原理只能用于处理静力学呀。要是受力不平衡怎么办？于是拉格朗日继续找，又找到他好友达朗贝尔在前不久提出的达朗贝尔原理：

$$
\sum_{i} \vec{F_{i}} \cdot \delta \vec{r} - m\vec{a}\cdot\delta \vec{r}=0
$$

我们给这个假想的惯性力项也找一个对应的“势函数”不就好了？可是哪里会有既与位移有关，又与加速度有关的能量呀！

机械运动里除了势能项，自然就剩下动能项了。于是拉格朗日试了试动能函数：

$$
T(\dot{\mathbf{r}}) = \frac{1}{2}m\dot{\mathbf{r}}^2
$$

> [!note]
> 这里变量头上的一点代表一阶导数，是当年牛爵爷发明的微分符号。 $\dot{\mathbf{r}}$ 表示的就是速度 $\vec{v}$ 。如果头上有两个点代表二阶导数，即 $\ddot{\mathbf{r}} = \vec{a}$ 。分析力学在力学符号的表示这一方面还是沿用了牛爵爷的符号。
> 
> 诶不对呀，拉格朗日你不是大陆学派的吗？（莱布尼茨-约翰伯努利-欧拉-拉格朗日四人是一脉相承的师徒关系。）怎么用牛顿版本的微积分符号？你个浓眉大眼的也搞叛变啦？
> 
> 其实主要还是，莱布尼茨那套微积分符号虽然能表现出微积分更深层的含义，在分析学中也更通用，但写起来却太繁琐啦！如果完全只使用莱布尼茨的积分符号，拉格朗日方程就要写成：
> 
> $$
> -\frac{ \partial V }{ \partial \vec{r} } -\frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial T }{ \partial \frac{\mathrm{d}}{\mathrm{d}t}\vec{r} } = 0
> $$
> 
> 看着就能吓死人啦。
> 
> 拉格朗日在分析力学这一块的物理量沿用牛顿的符号，一来能使公式更简洁清晰，二来物理符号一以贯之，在物理研究中不至于太突兀。

将动能函数稍加变形，就有：

$$
m\vec{a}\cdot\delta \vec{r} 
= \frac{\mathrm{d}}{\mathrm{d}t}m \dot{\mathbf{r}} \cdot\delta \vec{r} 
= \frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial T }{ \partial \dot{\mathbf{r}} } \cdot\delta \vec{r}
$$

哎呀，这跟动能的变分可有点差别呀。

> [!info]- 惯性力做功并不直接等于动能变分
> 
> 对于动能 $T = \frac{1}{2} m \dot{\mathbf{r}}^2$ ，动能的变分 $\delta T$ 是对速度的变分，即：
> 
> $$
> \delta T = \frac{\partial T}{\partial \dot{\mathbf{r}}} \cdot \delta \dot{\mathbf{r}} = m \dot{\mathbf{r}} \cdot \delta \dot{\mathbf{r}}.
> $$
> 
> 在变分法中，变分 $\delta \dot{\mathbf{r}}$ 与虚位移 $\delta \mathbf{r}$ 相关，即 $\delta \dot{\mathbf{r}} = \frac{d}{dt} (\delta \mathbf{r})$ 。因此：
> 
> $$
> \delta T = m \dot{\mathbf{r}} \cdot \frac{d}{dt} (\delta \mathbf{r}).
> $$
> 
> 与惯性力的虚功 $m \ddot{\mathbf{r}} \cdot \delta \mathbf{r}$ 并不相同，除非在特殊情况下（如匀速运动或特定边界条件），否则一般不等。
> 
> 但是，在对时间积分后，两者又有联系：
> 
> $$
> \int \delta T \, dt = \int m \dot{\mathbf{r}} \cdot \delta \dot{\mathbf{r}} \, dt
> $$
> 
> 使用分部积分，并假设端点固定（即 $\delta \mathbf{r}$ 在端点为零），可得：
> 
> $$
> \int m \dot{\mathbf{r}} \cdot \delta \dot{\mathbf{r}} \, dt = - \int m \ddot{\mathbf{r}} \cdot \delta \mathbf{r} \, dt.
> $$
> 
> 因此：
> 
> $$
> \int \delta T \, dt = - \int m \vec{a} \cdot \delta \vec{r} \, dt.
> $$
> 
> 这意味着在时间积分意义上，动能的变分与惯性力虚功的负值相等。但对于瞬时值，两者并没有直接联系。

不急，我们先将势能项与动能项整理到一起，就有：

$$
\sum_{i} \vec{F_{i}} \cdot \delta \vec{r} - m\vec{a}\cdot\delta \vec{r}
= \left(-\frac{ \partial V }{ \partial \mathbf{r} } -\frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial T }{ \partial \dot{\mathbf{r}} } \right) \cdot \delta \vec{r}
=0
$$

整条式子的值对于任意方向上的虚位移 $\delta \vec{r}$ 都为零，那就只能是括号里的部分为零：

$$
-\frac{ \partial V }{ \partial \mathbf{r} } -\frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial T }{ \partial \dot{\mathbf{r}} } = 0
$$

哎呀，这个形式可太眼熟啦！拉格朗日回想起当年跟欧拉一起改进过的欧拉-拉格朗日方程：

$$
\boxed{\frac{ \partial F }{ \partial y } -\frac{\mathrm{d}}{\mathrm{d}x}\frac{ \partial F }{ \partial y' } = 0}
$$

如果我整一个函数 $L(\mathbf{r}, \dot{\mathbf{r}}) = T(\dot{\mathbf{r}}) - V(\mathbf{r})$ ，不就有：

$$
\frac{ \partial L }{ \partial \mathbf{r} } -\frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial L }{ \partial \dot{\mathbf{r}} } \\
= -\frac{ \partial V }{ \partial \mathbf{r} } - \frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial T }{ \partial \dot{\mathbf{r}} } 
= 0
$$

而且欧拉-拉格朗日方程是干嘛用的呀？是解决泛函求极值问题用的呀！那我们岂不是可以反推出泛函：

$$
S[\mathbf{r}] = \int_{t_{1}}^{t_{2}} \left[ T(\dot{\mathbf{r}}) - V(\mathbf{r}) \right] \mathrm{d}t
$$

我们从虚位移原理和达朗贝尔原理中推出来的那个方程，不就是这个泛函 $S[\mathbf{r}]$ 取极值时的条件？这个泛函 $S[\mathbf{r}]$ 的值，就是我们要找的最小作用量呀！

让我们重新整理一下表述：

> [!info] 拉格朗日版本的最小作用量原理
> 
> 自然界中系统的真实运动规律，总是会满足：
> 
> $$
> S[\mathbf{r}] = \int_{t_{1}}^{t_{2}} \left[ T(\dot{\mathbf{r}}) - V(\mathbf{r}) \right] \mathrm{d}t
> $$
> 
> 这个作用量取得极值。
> 
> 作用量取得极值时，有：
> 
> $$
> -\frac{ \partial V }{ \partial \mathbf{r} } -\frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial T }{ \partial \dot{\mathbf{r}} } = 0
> $$
> 
> 这个取极值的条件被称为拉格朗日方程。

拉格朗日在 1760 年发表的论文《关于确定不定积分公式极大极小的一种新方法》[^关于确定不定积分公式极大极小的一种新方法]，第一次提出了拉格朗日发明的处理泛函极值问题的纯分析方法——**变分法**。随后一年内发表了第二篇论文《将前篇论文阐述的方法应用于解决动力学各类问题》[^将前篇论文阐述的方法应用于解决动力学各类问题]，提出这个版本的最小作用量原理，并使用最小作用量原理来解决各种力学问题。

[^关于确定不定积分公式极大极小的一种新方法]: [Mémoires extraits des recueils de l’Académie de Turin/Essai d’une nouvelle méthode pour déterminer les maxima et les minima des formules intégrales indéfinies - Wikisource](https://fr.wikisource.org/wiki/M%C3%A9moires_extraits_des_recueils_de_l%E2%80%99Acad%C3%A9mie_de_Turin/Essai_d%E2%80%99une_nouvelle_m%C3%A9thode_pour_d%C3%A9terminer_les_maxima_et_les_minima_des_formules_int%C3%A9grales_ind%C3%A9finies)
[^将前篇论文阐述的方法应用于解决动力学各类问题]: [Mémoires extraits des recueils de l’Académie de Turin/Application de la méthode exposée dans le Mémoire précédent à la solution de différents Problèmes de Dynamique - Wikisource](https://fr.wikisource.org/wiki/M%C3%A9moires_extraits_des_recueils_de_l%E2%80%99Acad%C3%A9mie_de_Turin/Application_de_la_m%C3%A9thode_expos%C3%A9e_dans_le_M%C3%A9moire_pr%C3%A9c%C3%A9dent_%C3%A0_la_solution_de_diff%C3%A9rents_Probl%C3%A8mes_de_Dynamique)

> [!info] 拉格朗日量
> 拉格朗日凑出来的这个函数 $L(\mathbf{r}, \dot{\mathbf{r}}) = T(\dot{\mathbf{r}}) - V(\mathbf{r})$ ，后来被称为拉格朗日量或拉格朗日函数。
> 
> 拉格朗日量体现了系统的某种“动态平衡”：动能代表运动倾向，势能代表约束倾向，它们的差决定了系统如何演化。
> 
> 更深层次的解释来自诺特定理：拉格朗日量的形式保证了守恒律（如能量守恒、动量守恒）与对称性（如时间平移不变性、空间平移不变性）的联系。
> 
> 如果拉格朗日量不显含时间（ $\frac{ \partial L }{ \partial t } = 0$ ），则能量守恒；如果位移项总是以相对位移形式出现 $L(\dot{\vec{r}}_a, (\vec{r}_a - \vec{r}_b))$ ，则动量守恒。

我们可以举一个自由落体运动的例子，来直观看到如何使用拉格朗日方程求解物理问题。

在自由落体运动中，动能 $T=\frac{1}{2}m\dot{h}^2$ ，势能 $V=mgh$ ，向下为正方向。则有拉格朗日量：

$$
L = T - V = \frac{1}{2}m\dot{h}^2 - mgh
$$

计算偏导数：

$$
\begin{align}
\frac{ \partial L }{ \partial h }  & = -mg \\
\frac{ \partial L }{ \partial \dot{h} }  & = m\dot{h} \\
\frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial L }{ \partial \dot{h} }  & = m\ddot{h}
\end{align}
$$

代入拉格朗日方程：

$$
-\frac{ \partial V }{ \partial \mathbf{r} } -\frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial T }{ \partial \dot{\mathbf{r}} } 
= mg - m\ddot{h} = 0
$$

$mg = m\ddot{h}$ ，这不就是牛顿第二定律嘛！

### 广义坐标与分析力学

拉格朗日并未止步于此。

大家可以发现，无论是虚功原理还是达朗贝尔原理，都是从做功、能量这样的整体维度去描述的。那在这其中，基于笛卡尔坐标系的，牛顿意义上的位移与速度，有那么重要吗？

不重要！

拉格朗日提出，系统中只要势能可以表示为一系列量的函数，而动能可以表示为这一系列量对时间的导数的函数，虚功原理、达朗贝尔原理、乃至最小作用量原理就都能适用！

我们来举个例子来直观理解他提出的这一系列的量——**广义位移**，以及广义位移对时间的导数——**广义速度**。

对于一个单摆，我们可以定义摆角 $\theta$ 为广义坐标，则广义速度为角速度 $\dot{\theta}$ 。则有势能 $V$ 与动能 $T$ ：

$$
\begin{align}
V &  = mgh = -mgl\cos \theta \\
T &  = \frac{1}{2}mv^2=\frac{1}{2}ml^2\dot{\theta}^2
\end{align}
$$

于是有拉格朗日量：

$$
L = T - V = \frac{1}{2}ml^2\dot{\theta}^2 + mgl\cos \theta
$$

计算偏导数：

$$
\begin{align}
\frac{ \partial L }{ \partial \theta }  & = -mgl\sin \theta \\
\frac{ \partial L }{ \partial \dot{\theta} } & = ml^2\dot{\theta} \\
\frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial L }{ \partial \dot{\theta} } & = ml^2 \ddot{\theta}
\end{align}
$$

代入拉格朗日方程：

$$
-\frac{ \partial V }{ \partial \theta } -\frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial T }{ \partial \dot{\theta} } 
= msgl\sin \theta - ml^2  \ddot{\theta} = 0
$$

这正是单摆的运动方程。

> [!info]
> 回想起我们在牛顿力学的框架下是如何解决单摆问题的？一般来说会通过把约束性条件列为方程组，通过解方程才能得到这个精确的单摆运动方程。
> 
> 拉格朗日分析力学引入广义坐标，通过将约束性条件隐藏到广义坐标背后，使得解题方法更简洁直观，而不用解复杂的方程组。

从此，拉格朗日的理论终于完全跳脱出牛顿力学中笛卡尔坐标下的位移与速度的局部性束缚，发展为对力学原理进行整体性描述的分析力学理论。因为基于整体性描述，使得分析力学适用范围极广，甚至到量子力学理论里的海森堡矩阵力学、薛定谔波动力学也依然适用。

拉格朗日在 1788 年发表了著作《分析力学》[^分析力学]，最终提出了完整的拉格朗日分析力学。此时，距离 1687 年牛顿在《自然哲学的数学原理》[^自然哲学的数学原理]中提出牛顿力学已经过了将近 100 年。分析力学作为对力学原理的整体性描述，与作为局部性描述的牛顿力学在数学上严格等价，分别被用于处理不同尺度和条件下的力学问题。

[^分析力学]: [Mécanique analytique - Wikipedia](https://en.wikipedia.org/wiki/M%C3%A9canique_analytique)
[^自然哲学的数学原理]: [Philosophiæ Naturalis Principia Mathematica - Wikipedia](https://en.wikipedia.org/wiki/Philosophi%C3%A6_Naturalis_Principia_Mathematica)


## 最后

回顾我们这段从抽象数学到具体物理的旅程，其内在的逻辑链条清晰而有力。

**线性代数**为我们提供了看待“结构”的基本语言。我们理解了**线性**、**线性映射**（及其矩阵表示）和**向量的度量（范数）**。这不仅是处理有限维数据的工具，更是通向无限维空间的基石。

**微积分**将“线性”的思想发挥到极致。**微分，其本质就是局部线性逼近**。通过链式法则等工具，我们获得了分析复杂函数变化率的强大能力。

**泛函分析**是一次关键的观念飞跃。我们将**函数视为无穷维空间中的向量**，将**函数的函数——泛函**作为研究对象。**变分**的概念，即函数本身的微小变化，自然地将微积分中的极值问题推广到了无限维的函数空间。从有限维向量启发而来的**变分法基本引理**则为我们寻找泛函的极值点（平稳点）提供了关键的判别工具。

**变分法**是理论的必然延伸。我们不再满足于寻找一个点使得函数取极值，而是寻找一条路径（一个函数）使得某个累积量（如作用量）取极值。**欧拉-拉格朗日方程**正是这一追求的自然结果，它将泛函极值的复杂条件转化为一个关于路径函数的微分方程。

最终，我们抵达了**分析力学**。通过**虚功原理**和**达朗贝尔原理**，我们将牛顿力学的矢量力学转化为功和能量的标量形式。而**最小作用量原理**则如同皇冠上的明珠，它指出物体的真实运动轨迹是使作用量泛函取平稳值的那条路径。**广义坐标**的引入，最终使得这套理论得以完善，并能够优雅地处理复杂约束系统，其抽象与普适性远超牛顿力学。

但这远非故事的终点。拉格朗日去世后，分析力学这一门学科仍在发展，最小作用量原理的深刻内涵在后来得到了进一步的揭示。

经过哈密顿与雅可比等人的工作，分析力学体系变得更加严密和深刻。他们证明了，自然界之所以总是按作用量最小的方式运动，是因为物理系统在更高维的相空间或时空（配置空间）中，其实做着最简单的“直线”运动（即**测地线**）。我们在三维空间中看到的复杂轨迹，不过是高维时空中这种简单、自然运动在我们维度上的投影。[^长河劫分析力学]这一思想在爱因斯坦的**广义相对论**中达到了顶峰，其中物质和能量的分布决定了时空的弯曲性质，而自由质点的运动轨迹就是弯曲时空中的测地线。

更令人惊叹的是，分析力学与最小作用量原理展现出了惊人的生命力。当物理学进入微观和高速领域，许多牛顿力学的具体结论不再适用，但这套基于变分原理的框架却历久弥新。人们发现，**作用量的量纲（能量×时间）与普朗克常数的量纲相同**，这并非偶然，它暗示了作用量在量子世界中的基本地位。事实上，分析力学的数学结构——尤其是哈密顿体系——直接为**海森堡的矩阵力学**和**薛定谔的波动力学**提供了现成的数学语言。在薛定谔方程中，作用量以相位的角色出现。而后来发展的**量子场论**，其核心依然是作用量原理，只不过泛函的变量从粒子的路径变为了场在时空中的分布。

从线性代数到分析力学，我们看到的是一条数学概念不断抽象化、一般化，从而更深刻地揭示自然本质的道路。分析力学不仅是对牛顿力学的重新表述，更是一种更具前瞻性的世界观。它告诉我们，宇宙的运行或许遵循着某种极简与和谐的经济原理，而数学，正是我们理解这种终极之美的最有力工具。

