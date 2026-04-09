---
created_at: 2026-03-29T20:24:58
updated_at: 2026-03-29T20:25:25
title: 给初中生的向量入门（上）
aliases:
  - 给初中生的向量入门（上）
---
## 向量引入

我们先看两个问题：

> [!question] 问题一：图形平移
> 平移一个图形，已知其中一对对应点的坐标，其他点坐标如何变化？

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// 定义样式
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5
>>;

subPointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 2
>>;

vectorStyle = <<
    strokeColor: '#FF6600',
    strokeWidth: 2,
    dash: 2,
    lastArrow: << type: 2, size: 10 >>
>>;

// 步骤 1：创建原三角形 ABC 的三个顶点（自由点）
A = point(1, 2) pointStyle;
B = point(4, 1) pointStyle;
C = point(2, 4) pointStyle;

// 步骤 2：创建原三角形 ABC
tri1 = polygon(A, B, C) <<
    strokeColor: '#0066FF',
    strokeWidth: 2,
    fillColor: 'rgba(0, 100, 255, 0.15)'
>>;

// 步骤 3：创建 A' 作为自由点（定义平移的目标位置）
Ap = point(4, 4) pointStyle;
Ap.name = "A'";

// 步骤 4：使用坐标约束创建 B' 和 C'
// 平移向量：A -> A'，即 (Ap.X() - A.X(), Ap.Y() - A.Y())
// B' = B + 平移向量，C' = C + 平移向量
Bp = point(function() { return B.X() + (Ap.X() - A.X()); }, 
           function() { return B.Y() + (Ap.Y() - A.Y()); }) subPointStyle;
Bp.name = "B'";

Cp = point(function() { return C.X() + (Ap.X() - A.X()); }, 
           function() { return C.Y() + (Ap.Y() - A.Y()); }) subPointStyle;
Cp.name = "C'";

// 步骤 5：创建平移后的三角形 A'B'C'
tri2 = polygon(Ap, Bp, Cp) <<
    strokeColor: '#00AA66',
    strokeWidth: 2,
    fillColor: 'rgba(0, 170, 100, 0.15)'
>>;

// 步骤 6：创建从 ABC 指向 A'B'C' 的三个平移向量（虚线箭头）
vecAA = segment(A, Ap) vectorStyle;
vecBB = segment(B, Bp) vectorStyle;
vecCC = segment(C, Cp) vectorStyle;
```

> [!question] 问题二：中点坐标
> 已知线段两端点的坐标，如何求线段中点的坐标？

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// 定义样式
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5
>>;

midpointStyle = <<
    strokeColor: '#FF6600',
    fillColor: '#FF6600',
    size: 6
>>;

// 步骤 1：创建两个自由点 A 和 B
A = point(1, 4) pointStyle;
B = point(5, 2) pointStyle;

// 步骤 2：创建线段 AB
segAB = segment(A, B) <<
    strokeColor: '#003366',
    strokeWidth: 2
>>;

// 步骤 3：创建中点 M（受约束于 A 和 B）
M = midpoint(A, B) midpointStyle;

```

结合平面直角坐标系与方格纸，两个问题不难求解。

- 假设平移前一个点坐标 $(x_{0},y_{0})$ ，平移后为 $(x_{0}',y_{0}')$ ，那图形上原本为 $(x_1, y_1)$ 的点平移后会变为 $(x_{1}+(x_{0}'-x_{0}), y_{1}+(y_{0}'-y_{0}))$ 。即新坐标为原坐标加上对应点平移前后**坐标的差值**。
- 中点的坐标为 $\left( \frac{x_{1}+x_{2}}{2},\frac{y_{1}+y_{2}}{2} \right)$ ，即两端点**坐标的平均值**。

这两个问题似乎都对 $x$ 坐标与 $y$ 坐标都做一些批量的相同操作，我们会非常感性地引入”**坐标的差值**”、”**坐标的平均值**”等概念。

但这样引入并不严谨。“坐标的差值”是什么，点的坐标又为什么可以加上这个“坐标的差值”？“坐标的平均值”需要两个坐标相加然后除以二，那“两个坐标相加”又会得到什么？

第一个问题似乎还可以继续辩——坐标的差值就是平移所带来的坐标变化，点的原坐标加上这个平移带来的变化，就是平移后点的坐标。但这依然无法解释第二个问题——为什么两个坐标可以相加？

这个解释其实很好，**坐标的差值，就是平移这个动作所带来的坐标变化**。从平移前的 $A$ 点到平移后的 $A'$ 点，整个平移操作的信息都蕴含在了这坐标的差值中，无论是平移的方向还是平移的距离都能通过这个“坐标的差值”来解释。

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    visible: false,
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5
>>;

vectorStyle = <<
    strokeColor: '#FF3300',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>
>>;

transVectorStyle = <<
    strokeColor: '#FF6600',
    strokeWidth: 2,
    dash: 2,
    lastArrow: << type: 2, size: 10 >>
>>;

// 三角形样式
triOriginalStyle = <<
    strokeColor: '#CC3366',
    strokeWidth: 2,
    fillColor: 'rgba(204, 51, 102, 0.15)'
>>;
triTranslatedStyle = <<
    strokeColor: '#CC6699',
    strokeWidth: 2,
    fillColor: 'rgba(204, 102, 153, 0.15)'
>>;

// 四边形样式
quadOriginalStyle = <<
    strokeColor: '#3366CC',
    strokeWidth: 2,
    fillColor: 'rgba(51, 102, 204, 0.15)'
>>;
quadTranslatedStyle = <<
    strokeColor: '#6699CC',
    strokeWidth: 2,
    fillColor: 'rgba(102, 153, 204, 0.15)'
>>;

// 五边形样式
pentOriginalStyle = <<
    strokeColor: '#339966',
    strokeWidth: 2,
    fillColor: 'rgba(51, 153, 102, 0.15)'
>>;
pentTranslatedStyle = <<
    strokeColor: '#66CC99',
    strokeWidth: 2,
    fillColor: 'rgba(102, 204, 153, 0.15)'
>>;

// ==================== 主向量（从原点出发） ====================
O = point(0, 0) << strokeColor: '#000000', fillColor: '#000000', size: 6 >>;
V = point(1, 1) pointStyle;
V.visible = true;
mainVector = segment(O, V) vectorStyle;

// ==================== 三角形（第一象限） ====================
T1 = point(2, 1) pointStyle;
T2 = point(3.5, 0.8) pointStyle;
T3 = point(2.8, 2.2) pointStyle;

tri1 = polygon(T1, T2, T3) triOriginalStyle;

// 平移后的三角形
T1p = point(function() { return T1.X() + V.X(); }, function() { return T1.Y() + V.Y(); }) pointStyle;
T2p = point(function() { return T2.X() + V.X(); }, function() { return T2.Y() + V.Y(); }) pointStyle;
T3p = point(function() { return T3.X() + V.X(); }, function() { return T3.Y() + V.Y(); }) pointStyle;

tri1p = polygon(T1p, T2p, T3p) triTranslatedStyle;

// ==================== 四边形（第一象限） ====================
Q1 = point(4.5, 1) pointStyle;
Q2 = point(5.5, 1.2) pointStyle;
Q3 = point(5.2, 3) pointStyle;
Q4 = point(4.2, 2.5) pointStyle;

quad1 = polygon(Q1, Q2, Q3, Q4) quadOriginalStyle;

// 平移后的四边形
Q1p = point(function() { return Q1.X() + V.X(); }, function() { return Q1.Y() + V.Y(); }) pointStyle;
Q2p = point(function() { return Q2.X() + V.X(); }, function() { return Q2.Y() + V.Y(); }) pointStyle;
Q3p = point(function() { return Q3.X() + V.X(); }, function() { return Q3.Y() + V.Y(); }) pointStyle;
Q4p = point(function() { return Q4.X() + V.X(); }, function() { return Q4.Y() + V.Y(); }) pointStyle;

quad1p = polygon(Q1p, Q2p, Q3p, Q4p) quadTranslatedStyle;

// ==================== 五边形（第一象限） ====================
P1 = point(4, 4) pointStyle;
P2 = point(5, 3.8) pointStyle;
P3 = point(5.8, 4.5) pointStyle;
P4 = point(5.3, 5.5) pointStyle;
P5 = point(4.3, 5.2) pointStyle;

pent1 = polygon(P1, P2, P3, P4, P5) pentOriginalStyle;

// 平移后的五边形
P1p = point(function() { return P1.X() + V.X(); }, function() { return P1.Y() + V.Y(); }) pointStyle;
P2p = point(function() { return P2.X() + V.X(); }, function() { return P2.Y() + V.Y(); }) pointStyle;
P3p = point(function() { return P3.X() + V.X(); }, function() { return P3.Y() + V.Y(); }) pointStyle;
P4p = point(function() { return P4.X() + V.X(); }, function() { return P4.Y() + V.Y(); }) pointStyle;
P5p = point(function() { return P5.X() + V.X(); }, function() { return P5.Y() + V.Y(); }) pointStyle;

pent1p = polygon(P1p, P2p, P3p, P4p, P5p) pentTranslatedStyle;

// ==================== 选取多对顶点展示平移向量 ====================
// 三角形：T1 -> T1'
vecT1 = segment(T1, T1p) transVectorStyle;
// 四边形：Q2 -> Q2'
vecQ2 = segment(Q2, Q2p) transVectorStyle;
// 五边形：P3 -> P3', P5 -> P5'
vecP3 = segment(P3, P3p) transVectorStyle;
vecP5 = segment(P5, P5p) transVectorStyle;
```

那么，我们就往前走一步，将这含糊不清的”坐标变化“给个名字——**向量**。向量可以具象化为平面上的一个箭头——从平移前的点指向平移后的点。

> [!info]
> 向量是一个**既有大小，又有方向**的量。一个二维向量可以用两个实数组成的数对 $\vec{v}=(x,y)$ 表示。

向量所代表的这个箭头，只要保持大小和方向不变，从平面上哪一个点出发都没关系。这很好理解：不管从哪个点出发，向量起点到向量终点都可以用同一次平移变换得到。代表同一个平移变换的向量，自然是同一个向量。

聪明的同学也能发现了，向量用 $(x,y)$ 表示，点的坐标也能用 $(x,y)$ 表示，那这两者似乎关系密切呀？

是的，平面上任何一个点 $P(x,y)$ ，都能构造出一个从原点指向 $P$ 的向量 $\vec{v}$ ，这个向量的数对表示正好与点的坐标相同 $\vec{v} = (x,y)$ 。如此一来，一个点的坐标可以唯一对应一个向量，一个向量又可以唯一对应一个点的坐标。不同点的坐标不可能对应同一个向量，不同向量也不可能对应同一个点的坐标。

> [!info]
> 所有点的**坐标**都与一个**向量**一一对应。

在我们的理解中，点的坐标更像是一个锚点——他是用来定位的，代表一个点的位置。点是几何对象，无法定义关于点的运算，自然也很难说我们能将两个点的坐标进行加减乘除。所以一开始我们的问题是有道理的，两个点相加相减确实不能出来一些什么东西。

但向量不一样。接下来我们来引入定义在向量上的运算。能运算的向量，比不能运算的坐标好用得多。

## 向量的加减

### 向量加法与减法

上面我们说了，一个向量可以代表一个平移动作，不错。

那我们来考虑给一个图形连续两个平移，他对应点最终的坐标会如何变化？

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    visible: false,
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5
>>;

highlightPointStyle = <<
    strokeColor: '#FF3300',
    fillColor: '#FF3300',
    size: 6
>>;

// 向量 1 样式（红色）
vector1Style = <<
    strokeColor: '#FF3300',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>
>>;

// 向量 2 样式（蓝色）
vector2Style = <<
    strokeColor: '#3366FF',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>
>>;

// 和向量样式（紫色虚线）
sumVectorStyle = <<
    strokeColor: '#9933FF',
    strokeWidth: 3,
    dash: 3,
    lastArrow: << type: 2, size: 12 >>
>>;

// 三角形样式
tri0Style = <<
    strokeColor: '#339966',
    strokeWidth: 2,
    fillColor: 'rgba(51, 153, 102, 0.2)'
>>;

tri1Style = <<
    strokeColor: '#3366CC',
    strokeWidth: 2,
    fillColor: 'rgba(51, 102, 204, 0.15)'
>>;

tri2Style = <<
    strokeColor: '#CC3366',
    strokeWidth: 2,
    fillColor: 'rgba(204, 51, 102, 0.15)'
>>;

// ==================== 固定点 A 在原点 ====================
A = point(0, 0) << strokeColor: '#000000', fillColor: '#000000', size: 6 >>;

// ==================== 定义两个平移向量的终点（自由点） ====================
// A' 定义第一次平移向量 AA'
Ap = point(3, 2) highlightPointStyle;
Ap.name = "A'";
// A'' 定义第二次平移向量 A'A''
App = point(4, 6) highlightPointStyle;
App.name = "A''";

// ==================== 三个向量 ====================
// 向量 v⃗₁ = AA'
vec1 = segment(A, Ap) vector1Style;
vec1.name = "v1";
// 向量 v⃗₂ = A'A''
vec2 = segment(Ap, App) vector2Style;
vec2.name = "v2";
// 向量 v⃗₁ + v⃗₂ = AA''
vecSum = segment(A, App) sumVectorStyle;
vecSum.name = "v1+v2";

// ==================== 原三角形（右侧区域） ====================
B0 = point(4, 0) pointStyle;
C0 = point(3, 3) pointStyle;

tri0 = polygon(A, B0, C0) tri0Style;

// ==================== 第一次平移后（+AA'） ====================
// 平移向量 = Ap - A
B1 = point(function() { return B0.X() + (Ap.X() - A.X()); }, function() { return B0.Y() + (Ap.Y() - A.Y()); }) pointStyle;
C1 = point(function() { return C0.X() + (Ap.X() - A.X()); }, function() { return C0.Y() + (Ap.Y() - A.Y()); }) pointStyle;

tri1 = polygon(Ap, B1, C1) tri1Style;

// ==================== 第二次平移后（+A'A''） ====================
// 平移向量 = App - Ap
B2 = point(function() { return B1.X() + (App.X() - Ap.X()); }, function() { return B1.Y() + (App.Y() - Ap.Y()); }) pointStyle;
C2 = point(function() { return C1.X() + (App.X() - Ap.X()); }, function() { return C1.Y() + (App.Y() - Ap.Y()); }) pointStyle;

tri2 = polygon(App, B2, C2) tri2Style;

// 向量标注，随向量线段中点移动
text(function(){return A.X()/2+Ap.X()/2;}, function(){return A.Y()/2+Ap.Y()/2;}, "$\\vec{v_1}$") << fontSize: 20, strokeColor: '#FF3300' >>;
text(function(){return Ap.X()/2+App.X()/2;}, function(){return Ap.Y()/2+App.Y()/2;}, "$\\vec{v_2}$") << fontSize: 20, strokeColor: '#3366FF' >>;
text(function(){return A.X()/2+App.X()/2;}, function(){return A.Y()/2+App.Y()/2;}, "$\\vec{v_1}+\\vec{v_2}$") << fontSize: 20, strokeColor: '#9933FF' >>;
```

可以看出，两个连续的平移，坐标的变化相当于两次平移变化的相加。

而另一方面，**两次平移**最后得到的图形位置，我们**可以通过一次总的平移来得到**。而这一次总的平移，其对应的向量正好等于上面求出的两次平移对应的向量坐标分别相加。

我们可以更进一步了——直接定义，将两个向量的坐标分别相加，得出来总的向量，这个过程叫做向量的加法。**向量是可以相加的**！

> [!info]
> 向量 $\vec{v_{1}}=(x_{1},y_{1})$ 与向量 $\vec{v_{2}}=(x_{2},y_{2})$ 相加得到 $\vec{v}=\vec{v_{1}}+\vec{v_{2}}$ ，有 $\vec{v} =(x_{1}+x_{2}, y_{1}+y_{2})$ 。

仿照着实数的减法，我们也可以定义**向量的减法为向量加法的逆运算**。已知有向量 $\vec{v_{1}}=(x_{1},y_{1})$ ，与另一个向量 $\vec{v_{2}}$ 相加得到 $\vec{v_{3}} = \vec{v_{1}}+\vec{v_{2}} = (x_{3},y_{3})$ ，那这个向量 $\vec{v_{2}}$ 是多少？

容易得到向量减法： $\vec{v_{2}}=\vec{v_{3}}-\vec{v_{1}}=(x_{3}-x_{1},y_{3}-y_{1})$ 。

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    visible: false,
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5
>>;

highlightPointStyle = <<
    strokeColor: '#FF3300',
    fillColor: '#FF3300',
    size: 6
>>;

// 向量 1 样式（红色）
vector1Style = <<
    strokeColor: '#FF3300',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>
>>;

// 向量 2 样式（蓝色虚线）
vector2Style = <<
    strokeColor: '#3366FF',
    strokeWidth: 3,
    dash: 3,
    lastArrow: << type: 2, size: 12 >>
>>;

// 和向量样式（紫色）
sumVectorStyle = <<
    strokeColor: '#9933FF',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>
>>;

// 三角形样式
tri0Style = <<
    strokeColor: '#339966',
    strokeWidth: 2,
    fillColor: 'rgba(51, 153, 102, 0.2)'
>>;

tri1Style = <<
    strokeColor: '#3366CC',
    strokeWidth: 2,
    fillColor: 'rgba(51, 102, 204, 0.15)'
>>;

tri2Style = <<
    strokeColor: '#CC3366',
    strokeWidth: 2,
    fillColor: 'rgba(204, 51, 102, 0.15)'
>>;

// ==================== 固定点 A 在原点 ====================
A = point(0, 0) << strokeColor: '#000000', fillColor: '#000000', size: 6 >>;

// ==================== 定义两个平移向量的终点（自由点） ====================
// A' 定义第一次平移向量 AA'
Ap = point(3, 2) highlightPointStyle;
Ap.name = "A'";
// A'' 定义第二次平移向量 A'A''
App = point(4, 6) highlightPointStyle;
App.name = "A''";

// ==================== 三个向量 ====================
// 向量 v⃗₁ = AA'
vec1 = segment(A, Ap) vector1Style;
vec1.name = "v1";
// 向量 v⃗₂ = A'A''
vec2 = segment(Ap, App) vector2Style;
vec2.name = "v2";
// 向量 v⃗₁ + v⃗₂ = AA''
vecSum = segment(A, App) sumVectorStyle;
vecSum.name = "v1+v2";

// ==================== 原三角形（右侧区域） ====================
B0 = point(4, 0) pointStyle;
C0 = point(3, 3) pointStyle;

tri0 = polygon(A, B0, C0) tri0Style;

// ==================== 第一次平移后（+AA'） ====================
// 平移向量 = Ap - A
B1 = point(function() { return B0.X() + (Ap.X() - A.X()); }, function() { return B0.Y() + (Ap.Y() - A.Y()); }) pointStyle;
C1 = point(function() { return C0.X() + (Ap.X() - A.X()); }, function() { return C0.Y() + (Ap.Y() - A.Y()); }) pointStyle;

tri1 = polygon(Ap, B1, C1) tri1Style;

// ==================== 第二次平移后（+A'A''） ====================
// 平移向量 = App - Ap
B2 = point(function() { return B1.X() + (App.X() - Ap.X()); }, function() { return B1.Y() + (App.Y() - Ap.Y()); }) pointStyle;
C2 = point(function() { return C1.X() + (App.X() - Ap.X()); }, function() { return C1.Y() + (App.Y() - Ap.Y()); }) pointStyle;

tri2 = polygon(App, B2, C2) tri2Style;

// 向量标注，随向量线段中点移动
text(function(){return A.X()/2+Ap.X()/2;}, function(){return A.Y()/2+Ap.Y()/2;}, "$\\vec{v_1}$") << fontSize: 20, strokeColor: '#FF3300' >>;
text(function(){return Ap.X()/2+App.X()/2;}, function(){return Ap.Y()/2+App.Y()/2;}, "$\\vec{v_3}-\\vec{v_1}$") << fontSize: 20, strokeColor: '#3366FF' >>;
text(function(){return A.X()/2+App.X()/2;}, function(){return A.Y()/2+App.Y()/2;}, "$\\vec{v3}$") << fontSize: 20, strokeColor: '#9933FF' >>;
```

### 对坐标加减的解释

如此一来，我们便可以用向量的加减来解释第一个问题了：“坐标的差值”是什么，点的坐标又为什么可以加上这个“坐标的差值”？

由于点的坐标不可运算，我们可以用可运算的向量来完全代替点的坐标。一个点的坐标总会对应一个向量，不同点的坐标对应的向量总是不同的。

首先我们所引入的“**坐标的差值**”，实际上**就是代表这个平移操作的向量**。点平移前的坐标对应一个向量 $\vec{p}=(x_{p},y_{p})$ ，平移后的坐标对应另一个向量 $\vec{p'}=(x_{p'},y_{p'})$ 。一个点从原点经过 $\vec{p}$ 平移到了点 P ，再经过一次平移后到了点 P‘ ，那中间这次平移对应的向量，自然是 $\vec{v}=\vec{p'}-\vec{p}$ 了。

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// 定义样式
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5
>>;

subPointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 2
>>;

// 向量样式（橙色虚线箭头）
vectorStyle = <<
    strokeColor: '#FF6600',
    strokeWidth: 2,
    dash: 2,
    lastArrow: << type: 2, size: 10 >>
>>;

// 重点向量样式（紫色箭头）
highlightedVectorStyle = <<
    strokeColor: '#9933FF',
    strokeWidth: 2,
    lastArrow: << type: 2, size: 10 >>
>>;

// 固定原点 O
O = point(0, 0) pointStyle;
O.fixed = true;

// 步骤 1：创建原三角形 ABC 的三个顶点（自由点）
A = point(1, 2) pointStyle;
B = point(4, 1) pointStyle;
C = point(2, 4) pointStyle;

// 步骤 2：创建原三角形 ABC
tri1 = polygon(A, B, C) <<
    strokeColor: '#0066FF',
    strokeWidth: 2,
    fillColor: 'rgba(0, 100, 255, 0.15)'
>>;

// 步骤 3：创建 A' 作为自由点（定义平移的目标位置）
Ap = point(5, 3) pointStyle;
Ap.name = "A'";

// 步骤 4：使用坐标约束创建 B' 和 C'
// 平移向量：A -> A'，即 (Ap.X() - A.X(), Ap.Y() - A.Y())
// B' = B + 平移向量，C' = C + 平移向量
Bp = point(function() { return B.X() + (Ap.X() - A.X()); }, 
           function() { return B.Y() + (Ap.Y() - A.Y()); }) subPointStyle;
Bp.name = "B'";

Cp = point(function() { return C.X() + (Ap.X() - A.X()); }, 
           function() { return C.Y() + (Ap.Y() - A.Y()); }) subPointStyle;
Cp.name = "C'";

// 步骤 5：创建平移后的三角形 A'B'C'
tri2 = polygon(Ap, Bp, Cp) <<
    strokeColor: '#00AA66',
    strokeWidth: 2,
    fillColor: 'rgba(0, 170, 100, 0.15)'
>>;

// 步骤 6：创建从 A 指向 A' 的平移向量（虚线箭头）
vecAA = segment(A, Ap) vectorStyle;
vecAA.withLabel = true;
vecAA.name = "$\\vec{p'}-\\vec{p}$";
vecAA.label.fontSize = 20;

// 从原点指向 A 与 A‘ 的向量，展示为 $\vec{p}$ 与 $\vec{p'}$
vecA = segment(O, A) highlightedVectorStyle;
vecA.withLabel = true;
vecA.name = "$\\vec{p}$";
vecA.label.fontSize = 20;
vecAp = segment(O, Ap) highlightedVectorStyle;
vecAp.withLabel = true;
vecAp.name = "$\\vec{p'}$";
vecAp.label.fontSize = 20;
```

而点的坐标对应一个向量，点的坐标加上这个“坐标的差值”，实际上就是向量相加。一个点从原点平移到原图形上的点 Q 后，再经过平移 $\vec{v}$ 到新图形上的点 Q‘ ，那这个新的坐标对应的向量自然也是两个向量相加 $\vec{q'}=\vec{q}+\vec{v}$ 了。

这时我们就发现了，原来我们一开始感性引入的那些概念，实质就是一些对向量的运算！这样那些原本很难讲清的对坐标的加减也就都说得通了。

### 平行四边形与三角形

再看回方格纸，不难发现，将两个向量首尾相接，从第一个向量起点指向第二个向量终点，就是两个向量相加得到的向量。这也很好理解，一个向量可以代表一个点从向量起点平移到向量终点，那连续两次平移最后不就是平移到第二个向量的终点了。

```jessiecode
---
boundingBox: [-1, 5, 5, -1]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5
>>;

// 向量 v1 样式（红色）
vector1Style = <<
    strokeColor: '#FF3300',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: <<
        fontSize: 20,
        strokeColor: '#FF3300'
    >>
>>;

// 向量 v2 样式（蓝色）
vector2Style = <<
    strokeColor: '#3366FF',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: <<
        fontSize: 20,
        strokeColor: '#3366FF'
    >>
>>;

// 和向量 v3 样式（紫色）
vector3Style = <<
    strokeColor: '#9933FF',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: <<
        fontSize: 20,
        strokeColor: '#9933FF'
    >>
>>;

// ==================== 三个关键点（构成三角形） ====================
// A - 起点（自由点）
A = point(0, 0) pointStyle;
// B - v1 的终点，也是 v2 的起点（自由点）
B = point(1.5, 3) pointStyle;
// C - v2 的终点，也是和向量的终点（自由点）
C = point(4, 4) pointStyle;

// ==================== 三个向量 ====================
// v1 = AB（红色）
vec1 = segment(A, B) vector1Style;
vec1.name = "$\\vec{v_1}$";
// v2 = BC（蓝色）
vec2 = segment(B, C) vector2Style;
vec2.name = "$\\vec{v_2}$";
// v3 = AC = v1 + v2（紫色）
vec3 = segment(A, C) vector3Style;
vec3.name = "$\\vec{v_3}=\\vec{v_1}+\\vec{v_2}$";
```

> [!tip]
> 这时图像形成一个三角形，因此称这种规律为**向量加法的三角形法则**。

这种解释下，连续多个向量相加在几何上会变的非常直观——只不过是将多个向量首尾相连，结果就是从第一个向量的起点指向最后一个向量的终点。

```jessiecode
---
boundingBox: [-1, 5, 5, -1]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5
>>;

// 四个分向量样式
vectorStyle = <<
    strokeWidth: 3,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 20 >>
>>;
vector1Color = '#FF3300';
vector2Color = '#3366FF';
vector3Color = '#33CC33';
vector4Color = '#CC9900';

// 和向量样式
sumVectorStyle = <<
    strokeColor: '#9933FF',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: << fontSize: 20 >>
>>;

// ==================== 五个关键点（4 个向量首尾相接） ====================
// P0 - 起点（自由点）
P0 = point(0, 0) pointStyle;

// P1 - v1 终点（水平向右，与 P0 同 y 坐标）
P1 = point(function() { return P0.X() + 2.5; }, function() { return P0.Y(); }) pointStyle;

// P2 - v2 终点（垂直向上，与 P1 同 x 坐标）
P2 = point(function() { return P1.X(); }, function() { return P1.Y() + 2; }) pointStyle;

// P3 - v3 终点（水平向右，与 P2 同 y 坐标）
P3 = point(function() { return P2.X() + 2; }, function() { return P2.Y(); }) pointStyle;

// P4 - v4 终点（垂直向上，与 P3 同 x 坐标）
P4 = point(function() { return P3.X(); }, function() { return P3.Y() + 2.5; }) pointStyle;

// ==================== 五个向量 ====================
// v1 = P0P1（水平向右，红色）
vec1 = segment(P0, P1) vectorStyle;
vec1.strokeColor = vector1Color;
vec1.name = "$\\vec{v_1}$";
// v2 = P1P2（垂直向上，蓝色）
vec2 = segment(P1, P2) vectorStyle;
vec2.strokeColor = vector2Color;
vec2.name = "$\\vec{v_2}$";
// v3 = P2P3（水平向右，绿色）
vec3 = segment(P2, P3) vectorStyle;
vec3.strokeColor = vector3Color;
vec3.name = "$\\vec{v_3}$";
// v4 = P3P4（垂直向上，橙色）
vec4 = segment(P3, P4) vectorStyle;
vec4.strokeColor = vector4Color;
vec4.name = "$\\vec{v_4}$";
// v5 = P0P4 = v1+v2+v3+v4（紫色和向量）
vec5 = segment(P0, P4) sumVectorStyle;
vec5.name = "$\\vec{v_1}+\\vec{v_2}+\\vec{v_3}+\\vec{v_4}$";
```

而另一方面，如果将相加的两个向量起点重叠，那相加得到的向量刚好就是这两个向量张成的平行四边形的对角线。用平行四边形表示可能可以更好地理解速度的合成和力的合成——速度和力也是向量！

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5
>>;

// 两个分向量样式
vector1Style = <<
    strokeColor: '#FF3300',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: << fontSize: 20 >>
>>;

vector2Style = <<
    strokeColor: '#3366FF',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: << fontSize: 20 >>
>>;

// 和向量样式
sumVectorStyle = <<
    strokeColor: '#9933FF',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: << fontSize: 20 >>
>>;

// 平行四边形辅助虚线
dashLineStyle = <<
    strokeColor: '#666666',
    strokeWidth: 1.5,
    dash: 2
>>;

// 虚线向量样式（表示平移后的向量）
dashVectorStyle = <<
    strokeColor: '#3366FF',
    strokeWidth: 2.5,
    dash: 2,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 20 >>
>>;

// ==================== 三个关键点 ====================
// O - 公共起点（固定点）
O = point(0, 0) pointStyle;
O.fixed = true;
// A - 向量 v1 的终点（自由点）
A = point(5, 2) pointStyle;
// B - 向量 v2 的终点（自由点）
B = point(2, 6) pointStyle;

// ==================== 平行四边形第四个顶点 ====================
// C = A + (B - O)，使 OACB 构成平行四边形
C = point(function() { return A.X() + (B.X() - O.X()); }, 
          function() { return A.Y() + (B.Y() - O.Y()); }) pointStyle;

// ==================== 原始两个向量（实线） ====================
// v1 = OA（红色）
vec1 = segment(O, A) vector1Style;
vec1.name = "$\\vec{v_1}$";
// v2 = OB（蓝色）
vec2 = segment(O, B) vector2Style;
vec2.name = "$\\vec{v_2}$";

// ==================== 平行四边形的边 ====================
// AC 虚线（等于 OB，展示为虚线向量，体现三角形法则）
dashAC = segment(A, C) dashVectorStyle;
dashAC.name = "$\\vec{v_1}$";
// BC 虚线（等于 OA）
dashBC = segment(B, C) dashLineStyle;

// ==================== 和向量（对角线，高亮） ====================
sumVec = segment(O, C) sumVectorStyle;
sumVec.name = "$\\vec{v_1}+\\vec{v_2}$";
```

> [!tip]
> 这时图像形成平行四边形，因此这种规律称为**向量加法的平行四边形法则**。

仔细观察一下不难发现，这里的向量加法的平行四边形法则与上面的三角形法则是完全等价的表述——向量与其在平行四边形上对边的向量方向相同、大小相等，是同一个向量。

> [!tip]- 向量加法性质
> 容易知道，向量加法有以下性质：
> - 封闭性：对于任意向量 $\vec{a}$ 与 $\vec{b}$ ，相加结果 $\vec{a}+\vec{b}$ 依然是同一维度的向量。
> - 结合律：对于任意向量 $\vec{a}$ 、 $\vec{b}$ 、 $\vec{c}$ ，有 $(\vec{a}+\vec{b})+\vec{c} = \vec{a}+(\vec{b}+\vec{c})$  。
> - 存在单位元：存在一个向量 $\vec{0} = (0,0)$ ，使得对任意向量，有 $\vec{a}+\vec{0}=\vec{0}+\vec{a}=\vec{a}$ 。
> - 存在逆元：对于任意向量 $\vec{a}$ ，存在向量 $-\vec{a}$ 使得 $\vec{a}+(-\vec{a}) = (-\vec{a})+\vec{a}=\vec{0}$ 。
> - 交换律：对于任意向量 $\vec{a}$ 、 $\vec{b}$ ，有 $\vec{a}+\vec{b}=\vec{b}+\vec{a}$ 。
>
> 由于这些性质，我们可以将向量连续加法不带括号地写成 $\vec{a}+\vec{b}+\vec{c}$ ，而不用担心歧义。

> [!question] 本节练习
> 1. 已知向量 $\vec{a}=(3, 2)$，$\vec{b}=(-1, 4)$，计算 $\vec{a}+\vec{b}$ ，并在平面直角坐标系上画出三个向量。
> 2. 已知向量 $\vec{u}=(5, -3)$，$\vec{v}=(2, 7)$，计算 $\vec{u}-\vec{v}$ ，并在平面直角坐标系上画出三个向量。

## 向量的数乘

很好，我们已经能接受向量这个概念与向量相加了。那两个相同的向量相加会怎么样？

很明显，相加后得到的结果，方向不变，大小变成原来的两倍。如果我们有 $\vec{v}=(v_{x},v_{y})$ ，则有：

$$
\vec{v}+\vec{v} = 2\vec{v} = (2v_{x},2v_{y})
$$

我们也自然能得到三个、四个、以至所有正整数个相同向量相加的结果，就是方向不变，长度变为原来的 n 倍。

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5,
    withLabel: true,
    label: << fontSize: 20 >>
>>;

subPointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 0,
    withLabel: true,
    label: << fontSize: 20 >>
>>;

// 基准向量 v 样式
vectorStyle = <<
    strokeColor: '#FF3300',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 10 >>
>>;

// 3v 和向量样式（高亮）
sumVectorStyle = <<
    strokeColor: '#9933FF',
    strokeWidth: 4,
    lastArrow: << type: 2, size: 14 >>
>>;

// 辅助虚线
dashLineStyle = <<
    strokeColor: '#999999',
    strokeWidth: 1,
    dash: 2
>>;

// ==================== 基准向量 v（两个自由点定义） ====================
P0 = point(0, 0) subPointStyle;
P1 = point(2, 1) pointStyle;

// 基准向量 v = P0P1
vecV = segment(P0, P1) vectorStyle;

// ==================== 首尾相连重复 3 次 ====================
// P2 = P1 + (P1 - P0)，第二个 v 的终点
P2 = point(function() { return P1.X() + (P1.X() - P0.X()); }, 
           function() { return P1.Y() + (P1.Y() - P0.Y()); }) subPointStyle;
P2.visible = false;

// P3 = P2 + (P1 - P0)，第三个 v 的终点（即 3v 的终点）
P3 = point(function() { return P2.X() + (P1.X() - P0.X()); }, 
           function() { return P2.Y() + (P1.Y() - P0.Y()); }) subPointStyle;

// 第二个 v（首尾相连）
vecV2 = segment(P1, P2) vectorStyle;
// 第三个 v（首尾相连）
vecV3 = segment(P2, P3) vectorStyle;

// ==================== 和向量 3v ====================
vec3V = segment(P0, P3) sumVectorStyle;

// ==================== 辅助标注线 ====================
// 在下方画一条长虚线表示总长度
line3V = segment(P0, P3) dashLineStyle;

// 将向量标注在终点上
P1.name = "$\\vec{v}$";
P3.name = "$3\\vec{v}$";
```

> [!info]
> 方向相同的向量相加，不会改变方向。

而由向量减法，我们可以仿照负数的定义，将减去一个向量视为加上这个向量的负一倍。即有：

$$
\vec{u}-\vec{v} = \vec{u}+(-1)\vec{v} = \vec{u} + (-\vec{v})
$$

其中 $-\vec{v}$ 为与 $\vec{v}$ 方向相反，大小相同的向量：

$$
-\vec{v} = (-v_{x}, -v_{y})
$$

依然类似自然数域扩展到整数域，我们可以定义向量的负整数倍。同样的，还能将倍数扩展到分数倍、有理数倍、实数倍。

```jessiecode
---
boundingBox: [-6, 6, 6, -6]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5,
    label: << fontSize: 20 >>
>>;

// 基准向量 v 样式
vectorStyle = <<
    strokeColor: '#FF3300',
    strokeWidth: 4,
    lastArrow: << type: 2, size: 6 >>
>>;

// k·v 向量样式（随 k 值变化）
scaledVectorStyle = <<
    strokeColor: '#9933FF',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 6 >>
>>;

// 辅助虚线
dashLineStyle = <<
    strokeColor: '#999999',
    strokeWidth: 1,
    dash: 2
>>;

// ==================== 滑块（控制倍数 k） ====================
// 滑块位置：左上角，k 范围 [-3, 3]，初始值 2
slider = slider([-4.8, 4], [-2.8, 4], [-3, 2, 3]) <<
    strokeColor: '#003366',
    fillColor: '#9933FF'
>>;

// ==================== 基准向量 v ====================
P0 = point(0, 0) pointStyle;
P0.visible = false;
P0.fixed = true;
P1 = point(2, 1) pointStyle;

// 基准向量 v = P0P1
vecV = segment(P0, P1) vectorStyle;

// ==================== k·v 的计算 ====================
// k 值从滑块获取
k = function() { return slider.Value(); };

// k·v 的终点 Pk = P0 + k * (P1 - P0)
Pk = point(
    function() { return P0.X() + k() * (P1.X() - P0.X()); }, 
    function() { return P0.Y() + k() * (P1.Y() - P0.Y()); }
) pointStyle;
Pk.size = 0; // 调整大小以表示不是自由点

// k·v 向量
vecKV = segment(P0, Pk) scaledVectorStyle;

// ==================== 辅助线（显示共线） ====================
// 基准向量所在的直线（无限延伸）
lineV = line(P0, P1) << strokeColor: '#CCCCCC', strokeWidth: 0.5 >>;

// ==================== 标签显示 ====================
// 向量标签（标记在终点上）
P1.name = "$\\vec{v}$";
Pk.name = "$k\\vec{v}$";
// k 值动态显示
kValueText = text(-4.8, 3.5, function() { return "k = " + k().toFixed(2); }) <<
    fontSize: 18,
    strokeColor: '#9933FF'
>>;
```

我们将这称为**向量的数乘**，即一个数量（就是我们之前理解的整数、有理数、实数等“数”）乘以一个向量的结果，还是一个向量。对于向量 $\vec{v} = (v_{x},v_{y})$ ，实数 $k$ ，有：

$$
k\vec{v} = (kv_{x}, kv_{y})
$$

数乘得到的 $k\vec{v}$ ，**方向与 $\vec{v}$ 相同，大小为 $\vec{v}$ 的 $k$ 倍**。

> [!info]
> 如果 k 是负数，方向相同的负数倍长度的意思就是方向相反的向量。这里说的“向量方向相同”更标准的说法是“向量共线”或“向量平行”。

> [!tip]- 向量数乘的性质
> 容易知道，向量数乘有以下性质：
> - 单位元：对于数的乘法单位元 $1$ ，有 $1\vec{v} = \vec{v}$ 。
> - 对向量加法的分配律：对于任意向量 $\vec{u}$ 、 $\vec{v}$ 和任意数量 $a$ ，有 $a(\vec{u}+\vec{v}) = a\vec{u}+a\vec{v}$ 。
> - 对数量加法的分配律：对于任意向量 $\vec{v}$ 和任意数量 $a$ 、 $b$ ，有 $(a+b)\vec{v}=a\vec{v}+b\vec{v}$ 。
> - 兼容数量的乘法：对于任意向量 $\vec{v}$ 和任意数量 $a$ 、 $b$ ，有 $a(b\vec{v}) = (ab)\vec{v}=b(a\vec{v})$ 。（所以可以简写为 $ab\vec{v}$ 而不会引起歧义）
> 
> 正因为有对加法的分配律，与数量乘法性质类似，所以才会称这种运算为数“乘”。

> [!question] 本节练习
> 1. 已知向量 $\vec{a}=(2, -3)$，计算 $2\vec{a}$ 与 $-3\vec{a}$ 。在平面直角坐标系上画出三个向量。
> 2. 若 $k\vec{v} = (-4, 6)$ 且 $\vec{v} = (2, -3)$，求 $k$ 。

## 向量加减与数乘的应用

### 两点确定一条直线

假设平面上有 $U = (x_{u},y_{u})$ 、 $V=(x_{v},y_{v})$ 两点，两点决定一条直线。这条直线上任意一点 $W$ ，他的坐标如何用 $U$ 、 $V$ 两点的坐标表示？

点的坐标不能直接计算，但我们可以通过将向量的起点定在原点，将点的坐标转换为向量来计算。假设终点为 $U$ 、 $V$ 两点的向量分别为 $\vec{u}$ 与 $\vec{v}$ ，而终点为 $W$ 的向量为 $\vec{w}$ 。问题转换为——这个新的向量用 $\vec{u}$ 与 $\vec{v}$ 怎么表示。

```jessiecode
---
boundingBox: [-5, 5, 5, -5]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 3,
    label: << fontSize: 15 >>
>>;

originStyle = <<
    strokeColor: '#000000',
    fillColor: '#000000',
    size: 0,
    fixed: true,
    label: << fontSize: 15 >>
>>;

// 向量共通样式
vectorStyle = <<
    withLabel: true,
    strokeWidth: 3,
    lastArrow: << type: 2, size: 7 >>,
    label: << fontSize: 20 >>
>>;

colorU = '#FF3300'; // 向量 u 颜色（红色）
colorV = '#3366FF'; // 向量 v 颜色（蓝色）
colorUV = '#33AA33'; // 向量 UV 颜色（绿色）
colorUW = '#9933FF'; // 向量 UW 颜色（紫色）
colorOW = '#FF9900'; // 向量 OW 颜色（橙色）

// 直线 UV 样式
lineStyle = <<
    strokeColor: '#666666',
    strokeWidth: 1
>>;

// 固定文字说明样式
textStyle = << fontSize: 18, strokeColor: colorUW >>;

// ==================== 原点 O ====================
O = point(0, 0) originStyle;

// ==================== 自由点 U 和 V ====================
U = point(1, -3) pointStyle;
V = point(3, 3) pointStyle;

// ==================== 直线 UV ====================
lineUV = line(U, V) lineStyle;

// ==================== 从原点出发的向量 ====================
// 向量 u = OU（红色）
vecU = segment(O, U) vectorStyle;
vecU.strokeColor = colorU;
vecU.name = "$\\vec{u}$";
vecU.label.strokeColor = colorU;

// 向量 v = OV（蓝色）
vecV = segment(O, V) vectorStyle;
vecV.strokeColor = colorV;
vecV.name = "$\\vec{v}$";
vecV.label.strokeColor = colorV;

// 向量 UV（绿色）
vecUV = segment(U, V) vectorStyle;
vecUV.strokeColor = colorUV;
vecUV.name = "$\\vec{UV}=\\vec{v}-\\vec{u}$";
vecUV.label.strokeColor = colorUV;

// ==================== 滑块控制参数 t ====================
// 滑块范围 [-1, 3]，初始值 0.4
sliderT = slider([-4.5, -4.5], [-3, -4.5], [-1, 0.4, 3]) <<
    strokeColor: '#003366',
    fillColor: colorUW,
    label: << strokeColor: colorUW >>
>>;
sliderT.name = "t";

t = function() { return sliderT.Value(); };

// ==================== 点 W = U + t·UV ====================
// W 在直线 UV 上，满足 UW = t·UV
W = point(
    function() { return U.X() + t() * (V.X() - U.X()); },
    function() { return U.Y() + t() * (V.Y() - U.Y()); }
) pointStyle;
W.size = 0.5; // 调整大小以表示不是自由点

// ==================== 向量 UW 和 OW ====================
// 向量 UW（紫色虚线）
vecUW = segment(U, W) vectorStyle;
vecUW.dash = 2;
vecUW.strokeColor = colorUW;
vecUW.name = "$\\vec{UW}=\\vec{w}-\\vec{u}$";
vecUW.label.strokeColor = colorUW;

// 向量 OW = OU + UW = u + t·v（橙色）
vecOW = segment(O, W) vectorStyle;
vecOW.strokeColor = colorOW;
vecOW.name = "$\\vec{w}$";
vecOW.label.strokeColor = colorOW;

// ==================== 动态数值显示 ====================
// UW = t·UV 关系
uwText = text(-4.5, -4, "$\\vec{UW}=t\\vec{UV}$") textStyle;
```

从 $U$ 指向 $V$ 的向量为 $\vec{UV} = \vec{v}-\vec{u}$ ，从 $U$ 指向 $W$ 的向量为 $\vec{UW}=\vec{w}-\vec{u}$ ，很明显这两个向量共线，即存在一个实数 $t$ ，使得 $\vec{UW}=t \vec{UV}$ 。两边代入得：

$$
\begin{align}
\vec{UW} & =t \vec{UV} \\
\vec{w}-\vec{u} & =t(\vec{v}-\vec{u})
\end{align}
$$

整理一下，即得：

$$
\vec{w} = t \vec{v}+(1-t)\vec{u}
$$

> [!tip]- 这条等式的意义
> 在这条等式里， $\vec{v}$ 与 $\vec{u}$ 的系数相加等于 1 。我们可以把这条等式理解为将 $\vec{v}$ 与 $\vec{u}$ 混合，通过调整 t 的大小来调整两者的混合比例。
> 
> - 当 t = 0 时，结果完全由 $\vec{u}$ 组成，点 W 就是点 U 。同理，当 t = 1 时，完全由 $\vec{v}$ 组成，点 W 就是点 V 。
> - 当 t 在 $(0,1)$ 区间内时，整个结果由 $\vec{u}$ 与 $\vec{v}$ 均匀混合，结果落在 $UV$ 两点间的线段上。当 t 逐渐增大，结果逐渐由 $U$ 点移向 $V$ 点。
> - 当 $t>1$ 时，指混合中 $\vec{v}$ 成分过量，结果落在 $V$ 点之外的射线上，而且 t 越大，离 $UV$ 线段越远。同理，当 $t<0$ 时，结果落在 $U$ 点之外的射线上，且 t 越小离 $UV$ 线段越远。

将向量表示变回坐标，即有点 $W$ 的坐标为：

$$
\begin{cases}
x & =tx_{v}+(1-t)x_{u} \\
y & =ty_{v}+(1-t)y_{u}
\end{cases}
$$

> [!tip]
> 这里一共有 $x$ 、 $y$ 、 $t$ 三个变量与两个方程，自由度为 1 ，意味着这是一个一维图形。通过代入消元法用 $x$ 来代表 $t$ ，可以发现 $y$ 其实是一个关于 $x$ 的一次函数。这与一次函数的函数图像是一条直线吻合。
> 
> 但是用这种形式表示一条直线，比用一次函数表示更灵活。如果要表示三维空间里的一条直线，只需要在方程组里以同样的形式加上 $z$ 维度即可，也可以用同样的方式扩展到四维、五维甚至更高维度上。

### 三角形中位线

有了向量的加减与数乘，三角形中位线定理证明起来可以非常简单。

作一三角形 ABC ，以其中两边作同一起点的向量 $\vec{a}$ 与 $\vec{b}$ ，则第三边为 $\vec{BA}= \vec{a}-\vec{b}$ ：

```jessiecode
---
boundingBox: [-6, 6, 6, -6]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5,
    label: << fontSize: 18 >>
>>;
subPointStyle = <<
    strokeColor: '#003366',
    size: 1,
    label: << fontSize: 18 >>
>>;

// 向量通用样式
vectorStyle = <<
    strokeWidth: 2.5,
    lastArrow: << type: 2, size: 7 >>,
    withLabel: true,
    label: << fontSize: 18 >>
>>;

colorA = '#FF3300'; // 向量 a = CA 颜色（红色）
colorB = '#3366FF'; // 向量 b = CB 颜色（蓝色）
colorCM = '#FF9999'; // 向量 CM 颜色（浅红色）
colorCN = '#99CCFF'; // 向量 CN 颜色（浅蓝色）
colorBA = '#33AA33'; // 向量 BA 颜色（绿色）
colorNM = '#9933FF'; // 向量 NM 颜色（紫色）

// 三角形边框样式
triStyle = <<
    strokeColor: '#666666',
    strokeWidth: 1,
    fillOpacity: 0.1
>>;

// ==================== 三角形 ABC（三个自由点） ====================
A = point(-4, 2) pointStyle;
B = point(4, 1) pointStyle;
C = point(0, -3) pointStyle;

// 三角形边框
tri = polygon(A, B, C) triStyle;

// ==================== 向量 a = CA，向量 b = CB ====================
// 向量 a = CA（红色）
vecA = segment(C, A) vectorStyle;
vecA.strokeColor = colorA;
vecA.name = "$\\vec{a}$";
vecA.label.strokeColor = colorA;
vecA.label.position = "80% left";
// 向量 b = CB（蓝色）
vecB = segment(C, B) vectorStyle;
vecB.strokeColor = colorB;
vecB.name = "$\\vec{b}$";
vecB.label.strokeColor = colorB;
vecB.label.position = "80% right";

// ==================== 中点 M 和 N ====================
// M 是 CA 中点
M = midpoint(C, A) subPointStyle;
// N 是 CB 中点
N = midpoint(C, B) subPointStyle;

// 向量 CM = (1/2)a（浅红色虚线）
vecCM = segment(C, M) vectorStyle;
vecCM.strokeColor = colorCM;
vecCM.dash = 2;
vecCM.name = "$\\frac{1}{2}\\vec{a}$";
vecCM.label.strokeColor = colorCM;
// 向量 CN = (1/2)b（浅蓝色虚线）
vecCN = segment(C, N) vectorStyle;
vecCN.strokeColor = colorCN;
vecCN.dash = 2;
vecCN.name = "$\\frac{1}{2}\\vec{b}$";
vecCN.label.strokeColor = colorCN;

// ==================== 向量 BA 与 NM ====================
// 向量 BA = a - b（绿色）
vecBA = segment(B, A) vectorStyle;
vecBA.strokeColor = colorBA;
vecBA.name = "$\\vec{a}-\\vec{b}$";
vecBA.label.strokeColor = colorBA;
// 向量 NM = (1/2)a - (1/2)b（紫色）
vecNM = segment(N, M) vectorStyle;
vecNM.strokeColor = colorNM;
vecNM.name = "$\\frac{1}{2}\\vec{a}-\\frac{1}{2}\\vec{b}$";
vecNM.label.strokeColor = colorNM;
```

而回想起中位线的定义：两边中点所连成的线段。令这两个中点为 M 、 N ，则在上面的小三角形中，有向量 $\vec{CM}=\frac{1}{2}\vec{a}$ 、 $\vec{CN}=\frac{1}{2}\vec{b}$  ，而 $\vec{NM}=\frac{1}{2}\vec{a}-\frac{1}{2}\vec{b}$ 。

又有 $\frac{1}{2}\vec{a}-\frac{1}{2}\vec{b}=\frac{1}{2}(\vec{a}-\vec{b})$ ，即 $\vec{NM} = \frac{1}{2}\vec{BA}$ 。即向量 $\vec{NM}$ 与 $\vec{BA}$ 方向相同，长度为 $\vec{BA}$ 的二分之一。由于向量的长度就是线段的长度，这意味着中位线与第三边平行，长度为第三边的二分之一。

有了向量，我们不仅可以证明中位线的性质，如果我将三角形两边的 $\frac{1}{3}$ 点连线，或是两边 $\frac{1}{4}$ 点连线，甚至更奇怪的比例点连线，我们都能通过类似的方法得到他的性质：与第三边平行，长度为第三边的比例值。

### 三角形重心位置

我们已经知道，三角形三条中线交于一点，这个点就是三角形的重心。重心位于三角形中线的三等分位置处。

这单纯用初中知识证明会比较麻烦，至少也要用到相似三角形。但如果使用向量，证明过程会变得既直观又简单。

作一三角形 ABC ，令从原点到点 A 、 B 、 C 的向量为 $\vec{a}=\vec{OA}$ 、 $\vec{b}=\vec{OB}$ 、 $\vec{c}=\vec{OC}$ 。令 BC 、 CA 、 AB 的中点分别为 D 、 E 、 F 。

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// 样式定义
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5,
    label: << fontSize: 15 >>
>>;

midpointStyle = <<
    strokeColor: '#666666',
    fillColor: '#666666',
    size: 3,
    label: << fontSize: 13 >>
>>;

// 向量样式
vectorStyle = <<
    strokeWidth: 2,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 18 >>
>>;

colorA = '#FF3300'; // 向量 a = OA 颜色（红色）
colorB = '#3366FF'; // 向量 b = OB 颜色（蓝色）
colorC = '#33AA33'; // 向量 c = OC 颜色（绿色）
colorAG = '#9933FF'; // 向量 AG 颜色（紫色）
colorAD = '#FF9900'; // 向量 AD 颜色（橙色）
colorOD = '#888888'; // 向量 OD 颜色（灰色）

// 高亮向量样式
highlightVectorStyle = <<
    strokeWidth: 4,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 18 >>
>>;

// 中线样式（虚线）
medianStyle = <<
    strokeColor: '#999999',
    strokeWidth: 1,
    dash: 5
>>;

// 原点 O
O = point(0, 0) pointStyle;
O.name = "$O$";
O.fixed = true;
O.visible = false;

// 三角形 ABC 的三个顶点（自由点）
A = point(2, 7) pointStyle;
A.name = "$A$";

B = point(1, 2) pointStyle;
B.name = "$B$";

C = point(8, 3) pointStyle;
C.name = "$C$";

// 三角形 ABC
tri = polygon(A, B, C) <<
    strokeColor: '#0066FF',
    strokeWidth: 2,
    fillColor: 'rgba(0, 100, 255, 0.1)'
>>;

// 三边中点 D、E、F
D = midpoint(B, C) midpointStyle;
D.name = "$D$";

E = midpoint(C, A) midpointStyle;
E.name = "$E$";

F = midpoint(A, B) midpointStyle;
F.name = "$F$";

// 三条中线（虚线）
medianAD = line(A, D) medianStyle;
medianBE = line(B, E) medianStyle;
medianCF = line(C, F) medianStyle;

// 重心 G（三条中线的交点）
G = intersection(medianAD, medianBE) <<
    strokeColor: '#FF3300',
    fillColor: '#FF3300',
    size: 2,
    label: << fontSize: 18, strokeColor: '#FF3300' >>
>>;
G.name = "$G$";

// 从原点出发的向量 a、b、c
vecA = segment(O, A) vectorStyle;
vecA.name = "$\\vec{a}$";
vecA.strokeColor = colorA;
vecA.label.strokeColor = colorA;

vecB = segment(O, B) vectorStyle;
vecB.name = "$\\vec{b}$";
vecB.strokeColor = colorB;
vecB.label.StrokeColor = colorB;

vecC = segment(O, C) vectorStyle;
vecC.name = "$\\vec{c}$";
vecC.strokeColor = colorC;
vecC.label.strokeColor = colorC;

// 高亮显示向量 AD
vecAD = segment(A, D) highlightVectorStyle;
vecAD.name = "$\\vec{AD}=\\frac{1}{2}(\\vec{b}+\\vec{c})-\\vec{a}$";
vecAD.strokeColor = colorAD;
vecAD.label.strokeColor = colorAD;

// 向量 AG
vecAG = segment(A, G) vectorStyle;
vecAG.name = "$\\vec{AG}$";
vecAG.dash = 2; // 与其他向量重合，用虚线同时显示
vecAG.strokeColor = colorAG;
vecAG.label.strokeColor = colorAG;

vecOD = segment(O, D) vectorStyle;
vecOD.name = "$\\frac{\\vec{b}+\\vec{c}}{2}$";
vecOD.strokeColor = colorOD;
vecOD.label.strokeColor = colorOD;

// 显示向量关系公式
text(6.5, 8, "$\\vec{AG}=\\frac{2}{3}\\vec{AD}$") <<
    fontSize: 22,
    strokeColor: colorAG,
    fillColor: 'white'
>>;
```

如此，中线 AD 所对应的向量应当有：

$$
\begin{align}
\vec{AD} & =\vec{OD}-\vec{OA} \\
& =\frac{1}{2}(\vec{b}+\vec{c})-\vec{a} \\
\end{align}
$$

作 AD 上的三等分点 $G_{1}$ ，使得 $|AG_{1}|=\frac{2}{3}|AD|$ 。点 $G_{1}$ 对应的位置向量有：

$$
\begin{align}
\vec{OG_{1}} & =\vec{OA}+\vec{AG_{1}} \\
& = \vec{OA}+\frac{2}{3}\vec{AD} \\
& = \vec{a}+\frac{2}{3}\left( \frac{1}{2}(\vec{b}+\vec{c})-\vec{a} \right) \\
& = \frac{1}{3}(\vec{a}+\vec{b}+\vec{c})
\end{align}
$$

用同样的方法，作 BE 上的三等分点 $G_{2}$ ，CF 上的三等分点 $G_{3}$ ，同样能得到：

$$
\begin{cases}
\vec{OG_{1}} & =\frac{1}{3}(\vec{a}+\vec{b}+\vec{c}) \\
\vec{OG_{2}} & =\frac{1}{3}(\vec{a}+\vec{b}+\vec{c}) \\
\vec{OG_{3}} & =\frac{1}{3}(\vec{a}+\vec{b}+\vec{c})
\end{cases}
$$

三个向量相等，即 $G_{1}$ 、 $G_{2}$ 、 $G_{3}$ 三个点是同一个点。由此可得三条中线会交于一点，且这个点位于三条中线各自的三等分点上。

> [!question] 本节练习
> 在三角形 ABC 中，M、N 分别是 AB、AC 边上靠近点 A 的三等分点（即 $\vec{AM}=\frac{1}{3}\vec{AB}$ 、 $\vec{AN}=\frac{1}{3}\vec{AC}$ ）。
> 
> - 若 $\vec{AB} = \vec{u}$，$\vec{AC} = \vec{v}$，求 $\vec{BC}$ 与 $\vec{MN}$（用 $\vec{u}$、$\vec{v}$ 表示）。
> - 说明线段 MN 与线段 BC 的位置关系与长度关系。

> [!info]
> 这是上下两篇文章的上篇。后续内容请见：[[2026-03-30-junior-vector-introduction-2|给初中生的向量入门（下）]]

