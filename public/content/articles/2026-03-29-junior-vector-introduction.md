---
created_at: 2026-03-29T20:24:58
updated_at: 2026-03-29T20:25:25
title: 给初中生的向量入门
aliases:
  - 给初中生的向量入门
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

- 假设平移前一个点坐标 $(x_{0},y_{0})$ ，平移后为 $(x_{0}',y_{0}')$ ，那图形上原本为 $(x_1, y_1)$ 的点平移后会变为 $(x_{1}+(x_{0}'-x_{0}), y_{1}+(y_{0}'-y_{0}))$ 。即新坐标为原坐标加上对应点平移前后坐标的差值。
- 中点的坐标为 $\left( \frac{x_{1}+x_{2}}{2},\frac{y_{1}+y_{2}}{2} \right)$ ，即两端点坐标的平均值。

这两个问题似乎都对 $x$ 坐标与 $y$ 坐标都做一些批量的相同操作，我们会非常感性地引入”坐标的差值”、”坐标的平均值”等概念。

但这样引入并不严谨。“坐标的差值”是什么，点的坐标又为什么可以加上这个“坐标的差值”？“坐标的平均值”需要两个坐标相加然后除以二，那“两个坐标相加”又会得到什么？

第一个问题似乎还可以继续辩——坐标的差值就是平移所带来的坐标变化，点的原坐标加上这个平移带来的变化，就是平移后点的坐标。但这依然无法解释第二个问题——为什么两个坐标可以相加？

这个解释其实很好，坐标的差值，就是平移这个动作所带来的坐标变化。从平移前的 $A$ 点到平移后的 $A'$ 点，整个平移操作的信息都蕴含在了这坐标的差值中，无论是平移的方向还是平移的距离都能通过这个“坐标的差值”来解释。

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

那么，我们就往前走一步，将这含糊不清的”坐标变化“给个名字——向量。向量可以具象化为平面上的一个箭头——从平移前的点指向平移后的点。

> [!info]
> 向量是一个既有大小，又有方向的量。一个二维向量可以用两个实数组成的数对 $\vec{v}=(x,y)$ 表示。

向量所代表的这个箭头，只要保持大小和方向不变，从平面上哪一个点出发都没关系。这很好理解：不管从哪个点出发，向量起点到向量终点都可以用同一次平移变换得到。代表同一个平移变换的向量，自然是同一个向量。

聪明的同学也能发现了，向量用 $(x,y)$ 表示，点的坐标也能用 $(x,y)$ 表示，那这两者似乎关系密切呀？

是的，平面上任何一个点 $P(x,y)$ ，都能构造出一个从原点指向 $P$ 的向量 $\vec{v}$ ，这个向量的数对表示正好与点的坐标相同 $\vec{v} = (x,y)$ 。如此一来，一个点的坐标可以唯一对应一个向量，一个向量又可以唯一对应一个点的坐标。不同点的坐标不可能对应同一个向量，不同向量也不可能对应同一个点的坐标。

> [!info]
> 所有点的坐标都与一个向量一一对应。

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

而另一方面，两次平移最后得到的图形位置，我们可以通过一次总的平移来得到。而这一次总的平移，其对应的向量正好等于上面求出的两次平移对应的向量坐标分别相加。

我们可以更进一步了——直接定义，将两个向量的坐标分别相加，得出来总的向量，这个过程叫做向量的加法。向量是可以相加的！

> [!info]
> 向量 $\vec{v_{1}}=(x_{1},y_{1})$ 与向量 $\vec{v_{2}}=(x_{2},y_{2})$ 相加得到 $\vec{v}=\vec{v_{1}}+\vec{v_{2}}$ ，有 $\vec{v} =(x_{1}+x_{2}, y_{1}+y_{2})$ 。

仿照着实数的减法，我们也可以定义向量的减法为向量加法的逆运算。已知有向量 $\vec{v_{1}}=(x_{1},y_{1})$ ，与另一个向量 $\vec{v_{2}}$ 相加得到 $\vec{v_{3}} = \vec{v_{1}}+\vec{v_{2}} = (x_{3},y_{3})$ ，那这个向量 $\vec{v_{2}}$ 是多少？

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

首先我们所引入的“坐标的差值”，实际上就是代表这个平移操作的向量。点平移前的坐标对应一个向量 $\vec{p}=(x_{p},y_{p})$ ，平移后的坐标对应另一个向量 $\vec{p'}=(x_{p'},y_{p'})$ 。一个点从原点经过 $\vec{p}$ 平移到了点 P ，再经过一次平移后到了点 P‘ ，那中间这次平移对应的向量，自然是 $\vec{v}=\vec{p'}-\vec{p}$ 了。

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

我们将这称为向量的数乘，即一个数量（就是我们之前理解的整数、有理数、实数等“数”）乘以一个向量的结果，还是一个向量。对于向量 $\vec{v} = (v_{x},v_{y})$ ，实数 $k$ ，有：

$$
k\vec{v} = (kv_{x}, kv_{y})
$$

> [!info]
> 数乘得到的 $k\vec{v}$ ，方向与 $\vec{v}$ 相同，大小为 $\vec{v}$ 的 $k$ 倍。（如果 k 是负数，负数倍长度的意思就是方向相反的向量。这里说的“向量方向相同”更标准的说法是“向量共线”或“向量平行”。）

> [!tip]- 向量数乘的性质
> 容易知道，向量数乘有以下性质：
> - 单位元：对于数的乘法单位元 $1$ ，有 $1\vec{v} = \vec{v}$ 。
> - 对向量加法的分配律：对于任意向量 $\vec{u}$ 、 $\vec{v}$ 和任意数量 $a$ ，有 $a(\vec{u}+\vec{v}) = a\vec{u}+a\vec{v}$ 。
> - 对数量加法的分配律：对于任意向量 $\vec{v}$ 和任意数量 $a$ 、 $b$ ，有 $(a+b)\vec{v}=a\vec{v}+b\vec{v}$ 。
> - 兼容数量的乘法：对于任意向量 $\vec{v}$ 和任意数量 $a$ 、 $b$ ，有 $a(b\vec{v}) = (ab)\vec{v}=b(a\vec{v})$ 。（所以可以简写为 $ab\vec{v}$ 而不会引起歧义）
> 
> 正因为有对加法的分配律，与数量乘法性质类似，所以才会称这种运算为数“乘”。

> [!question] 本节练习
> 1. 已知向量 $\vec{a}=(2, -3)$，计算 $2\vec{a}$ 与 $-3\vec{a}$ 。
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

## 向量点乘

### 引入向量点乘

现在我们知道了有向量，还有向量相关的运算——向量加减与向量数乘。可是大家可能会这个向量数乘感到不自在——这始终是一个向量与一个实数两种不同对象之间的乘法，交换律无从谈起。那像实数可以跟实数自己相乘一样，向量能不能也跟向量相乘呢？

答案是——可以有。我们来引入一种名为**点乘**的向量“乘法”。

在物理中，我们学到过合外力做功的计算——力与在力的方向上的移动的距离的乘积：

$$
W = Fs
$$

这个公式是两个数量之间的乘积。但是我们知道，**力**这个物理量是有方向的，是个向量。同时，我们引入另一个向量——**位移**，实际上，功这个物理量，就是力与位移这两个向量的“乘积”。

> [!info] 位移
> 实际上，移动是有方向的。我们用位移这个物理量代表了这种有方向的移动过程。
> 
> 位移的方向为从移动的起点指向终点，位移的大小为从起点到终点的直线距离，用 $\vec{s}$ 表示。
> 
> 我们一开始引入向量时所提到的“代表一个平移运动的向量”，实际上就是位移。

我们称，功就是力与位移这两个向量的**点乘**。符号表示为：

$$
W = \vec{F}\cdot  \vec{s}
$$

那么问题就来了：我们现在只会计算力和位移方向相同的情况。

```jessiecode
---
boundingBox: [-4, 9, 6, -1]
axis: true
grid: true
---
// ==================== 样式定义 ====================
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5,
    label: << fontSize: 16 >>,
    visible: false
>>;

originStyle = <<
    visible: false,
    fixed: true
>>;

// 力向量 F 样式（红色）
forceVectorStyle = <<
    strokeColor: '#FF3300',
    strokeWidth: 4,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: << fontSize: 20, strokeColor: '#FF3300' >>
>>;

// 位移向量 s 样式（蓝色）
displacementVectorStyle = <<
    strokeColor: '#3366FF',
    strokeWidth: 3,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 20, strokeColor: '#3366FF' >>
>>;

// 有效分力 Fcosθ 样式（绿色）
effectiveForceStyle = <<
    strokeColor: '#33AA33',
    strokeWidth: 4,
    dash: 2,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 18, strokeColor: '#33AA33' >>
>>;

// 辅助虚线样式
dashLineStyle = <<
    strokeColor: '#999999',
    strokeWidth: 1,
    dash: 2
>>;

// 角度弧线样式
angleStyle = <<
    strokeColor: '#9933FF',
    strokeWidth: 2,
    fillOpacity: 0.2,
    fillColor: '#9933FF',
    label: << fontSize: 18, strokeColor: '#9933FF' >>
>>;

// ==================== 原点与物体 ====================
O = point(0, 0) originStyle;


// ==================== 滑块控制夹角 θ ====================
// θ 范围 [0°, 180°]，初始值 45°
sliderTheta = slider([0.5, 8.5], [0.5, 7.5], [0, 45, 180]) <<
    strokeColor: '#003366',
    fillColor: '#9933FF',
    label: << strokeColor: '#9933FF', fontSize: 16 >>
>>;
sliderTheta.name = "θ";

// 将角度转换为弧度
thetaRad = function() { return sliderTheta.Value() * PI / 180; };

// ==================== 位移向量 s（固定在 x 轴方向） ====================
// 位移大小固定为 5 个单位
sLength = 5;
endS = point(function() { return sLength; }, function() { return 0; }) pointStyle;
endS.name = "$P'$";

vecS = segment(O, endS) displacementVectorStyle;
vecS.name = "$\\vec{s}$";

// ==================== 力向量 F（可旋转） ====================
// 力的大小固定为 4 个单位
fLength = 4;
endF = point(
    function() { return fLength * cos(thetaRad()); },
    function() { return fLength * sin(thetaRad()); }
) pointStyle;
endF.name = "$F$";

vecF = segment(O, endF) forceVectorStyle;
vecF.name = "$\\vec{F}$";

// ==================== 力的分解 ====================
// 有效分力 Fcosθ（沿位移方向的分力）
effectiveForceEnd = point(
    function() { return fLength * cos(thetaRad()); },
    function() { return 0; }
) << strokeColor: '#33AA33', size: 3, visible: false >>;

vecEffective = segment(O, effectiveForceEnd) effectiveForceStyle;
vecEffective.name = "$\\vec{F}\\cos\\theta$";

// 垂直分力 Fsinθ（垂直于位移方向，不做功）
perpendicularForceEnd = point(
    function() { return 0; },
    function() { return fLength * sin(thetaRad()); }
) << strokeColor: '#FF9999', size: 2, visible: false >>;

vecPerpendicular = segment(O, perpendicularForceEnd) <<
    strokeColor: '#FF9999',
    strokeWidth: 2,
    dash: 2,
    lastArrow: << type: 2, size: 8 >>
>>;
vecPerpendicular.name = "$\\vec{F}\\sin\\theta$";

// ==================== 辅助线 ====================
// 从 F 终点到 x 轴的垂线（虚线）
projLine = segment(endF, effectiveForceEnd) dashLineStyle;


// ==================== 夹角标识 ====================
// 绘制角度弧线
angleArc = angle(endS, O, endF) angleStyle;
angleArc.name = "$\\theta$";
```

如果力和位移的方向不同，功应该怎么计算呢？

### “发明”向量点乘

我们现在完全不懂这个点乘运算应该怎么算。但通过研究他的数学性质，其实不难推理出来。

首先，对力与位移的向量同时旋转一个角度，点乘的结果不变。这个很好理解：空间上换个角度做完全相同的物理实验，结果不可能发生改变。这是因为空间上各个方向的物理定律都是一样的。

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
    label: << fontSize: 16 >>,
    visible: false
>>;

originStyle = <<
    strokeColor: '#000000',
    fillColor: '#000000',
    size: 0,
    fixed: true,
    visible: false
>>;

// 向量 a 样式（红色）
vectorAStyle = <<
    strokeColor: '#FF3300',
    strokeWidth: 4,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: << fontSize: 20, strokeColor: '#FF3300' >>
>>;

// 向量 b 样式（蓝色）
vectorBStyle = <<
    strokeColor: '#3366FF',
    strokeWidth: 4,
    lastArrow: << type: 2, size: 12 >>,
    withLabel: true,
    label: << fontSize: 20, strokeColor: '#3366FF' >>
>>;

// 角度弧线样式
angleStyle = <<
    strokeColor: '#9933FF',
    strokeWidth: 2,
    fillOpacity: 0.2,
    fillColor: '#9933FF',
    label: << 
        strokeColor: '#9933FF',
        fontSize: 18
    >>
>>;

// ==================== 原点 ====================
O = point(0, 0) originStyle;

// ==================== 滑块控制整体旋转角度 α ====================
// α 范围 [0°, 360°]，初始值 0°
sliderAlpha = slider([-5.5, 5.5], [-5.5, 4.5], [0, 0, 360]) <<
    strokeColor: '#003366',
    fillColor: '#9933FF',
    label: << strokeColor: '#9933FF', fontSize: 16 >>
>>;
sliderAlpha.name = "$\\alpha$";

// 将旋转角度转换为弧度
alphaRad = function() { return sliderAlpha.Value() * PI / 180; };

// ==================== 定义两个向量的相对夹角 θ ====================
// 固定夹角 60 度
thetaDeg = 60;
thetaRad = function() { return thetaDeg * PI / 180; };

// ==================== 向量 a 和 b 的定义 ====================
// 向量 a 的长度和 b 的长度
aLength = 3.5;
bLength = 2.5;

// 向量 a 的终点（随旋转角度变化）
endA = point(
    function() { return aLength * cos(alphaRad()); },
    function() { return aLength * sin(alphaRad()); }
) pointStyle;
endA.name = "$A$";

// 向量 b 的终点（与 a 保持固定夹角θ）
endB = point(
    function() { return bLength * cos(alphaRad() + thetaRad()); },
    function() { return bLength * sin(alphaRad() + thetaRad()); }
) pointStyle;
endB.name = "$B$";

// ==================== 两个向量 ====================
vecA = segment(O, endA) vectorAStyle;
vecA.name = "$\\vec{a}$";

vecB = segment(O, endB) vectorBStyle;
vecB.name = "$\\vec{b}$";

// ==================== 夹角标识 ====================
// 绘制角度标记（在两个向量之间）
angleArc = angle(endA, O, endB) angleStyle;
angleArc.name = "$\\theta$";

// ==================== 点乘计算结果 ====================
// 点乘 = |a||b|cos(θ)
dotProduct = function() { return aLength * bLength * cos(thetaRad()); };

// 右下角显示点乘结果
text(3, -5, function() { 
    return "$\\vec{a}\\cdot\\vec{b} = " + dotProduct().toFixed(2) + "$"; 
}) << fontSize: 22, strokeColor: '#FF6600', fillColor: 'white' >>;

// 显示计算公式
text(3, -5.5, "$|\\vec{a}||\\vec{b}|\\cos\\theta$") << fontSize: 16, strokeColor: '#666666' >>;
```

同样地，如果交换两个向量的方向，点乘的结果也不变。这也是由于空间性质导致的，我们空间镜像对称地做同样的物理实验，结果也不应该改变。

```jessiecode
---
boundingBox: [-5, 5, 5, -5]
axis: true
grid: true
---
// ========================================
// 向量镜像变换 - 点乘不变性演示
// ========================================

// ----- 样式定义 -----
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 4,
    label: << fontSize: 16 >>
>>;

mirroredPointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 0,
    label: << fontSize: 16 >>
>>;

vectorStyle = <<
    strokeWidth: 3,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 18 >>
>>;

mirrorLineStyle = <<
    strokeColor: '#666666',
    strokeWidth: 2,
    dash: 2
>>;

originalColor = '#FF3366';
mirroredColor = '#3366FF';

// ----- 原点 -----
O = point(0, 0) pointStyle;
O.fixed = true;
O.size = 0;

// ----- 镜像轴（可旋转的直线）-----
// 通过两个点定义镜像轴方向
axisPoint1 = point(0, -5) << visible: false >>;
axisPoint2 = point(0, 5) << visible: false >>;
// 让 axisPoint2 可以绕原点旋转
axisAngle = slider([-5.5, -5.5], [-3.5, -5.5], [0, 0, 3.14159]) <<
    strokeColor: '#666666',
    label: << strokeColor: '#666666' >>
>>;
axisAngle.name = "θ (镜像轴角度)";

axisPoint2 = point(
    function() { return 5 * cos(axisAngle.Value()); },
    function() { return 5 * sin(axisAngle.Value()); }
) << visible: false >>;

mirrorLine = line(O, axisPoint2) mirrorLineStyle;
mirrorLine.name = "镜像轴";
mirrorLine.withLabel = true;

// ----- 原始向量（可自由拖动终点）-----
// 向量 a 的终点
aEnd = point(3, 2) pointStyle;
aEnd.name = "A";

// 向量 b 的终点
bEnd = point(2, 4) pointStyle;
bEnd.name = "B";

// ----- 原始向量 -----
vecA = segment(O, aEnd) vectorStyle;
vecA.strokeColor = originalColor;
vecA.name = "$\\vec{a}$";
vecA.label.strokeColor = originalColor;

vecB = segment(O, bEnd) vectorStyle;
vecB.strokeColor = originalColor;
vecB.name = "$\\vec{b}$";
vecB.label.strokeColor = originalColor;

// ----- 计算镜像点 -----
// 点关于直线 y = mx 的镜像公式（直线过原点，斜率 m = tan(θ)）
// 或者使用更通用的方法：点关于单位法向量的反射

// 镜像轴的单位方向向量
mirrorUX = function() { return cos(axisAngle.Value()); };
mirrorUY = function() { return sin(axisAngle.Value()); };

// 点 A 关于镜像轴的镜像点 A'
// 公式：P' = 2(P·u)u - P，其中 u 是镜像轴的单位方向向量
aEndMirrored = point(
    function() {
        ax = aEnd.X(); ay = aEnd.Y();
        ux = mirrorUX(); uy = mirrorUY();
        dot = ax * ux + ay * uy;
        return 2 * dot * ux - ax;
    },
    function() {
        ax = aEnd.X(); ay = aEnd.Y();
        ux = mirrorUX(); uy = mirrorUY();
        dot = ax * ux + ay * uy;
        return 2 * dot * uy - ay;
    }
) mirroredPointStyle;
aEndMirrored.name = "A'";

// 点 B 关于镜像轴的镜像点 B'
bEndMirrored = point(
    function() {
        bx = bEnd.X(); by = bEnd.Y();
        ux = mirrorUX(); uy = mirrorUY();
        dot = bx * ux + by * uy;
        return 2 * dot * ux - bx;
    },
    function() {
        bx = bEnd.X(); by = bEnd.Y();
        ux = mirrorUX(); uy = mirrorUY();
        dot = bx * ux + by * uy;
        return 2 * dot * uy - by;
    }
) mirroredPointStyle;
bEndMirrored.name = "B'";

// ----- 镜像向量 -----
vecAMirrored = segment(O, aEndMirrored) vectorStyle;
vecAMirrored.strokeColor = mirroredColor;
vecAMirrored.name = "$\\vec{a'}$";
vecAMirrored.label.strokeColor = mirroredColor;

vecBMirrored = segment(O, bEndMirrored) vectorStyle;
vecBMirrored.strokeColor = mirroredColor;
vecBMirrored.name = "$\\vec{b'}$";
vecBMirrored.label.strokeColor = mirroredColor;

// ----- 连接原始点和镜像点的辅助线 -----
connectA = segment(aEnd, aEndMirrored) <<
    strokeColor: '#999999',
    strokeWidth: 1,
    dash: 3
>>;

connectB = segment(bEnd, bEndMirrored) <<
    strokeColor: '#999999',
    strokeWidth: 1,
    dash: 3
>>;

// ----- 夹角标记 -----
// 原始向量夹角
angleAB = angle(aEnd, O, bEnd) <<
    radius: 0.8,
    strokeColor: originalColor,
    fillColor: 'rgba(255, 51, 102, 0.2)',
    withLabel: true,
    label: << fontSize: 14, strokeColor: originalColor >>
>>;
angleAB.name = "$\\theta$";

// 镜像向量夹角
angleApBp = angle(bEndMirrored, O, aEndMirrored) <<
    radius: 0.8,
    strokeColor: mirroredColor,
    fillColor: 'rgba(51, 102, 255, 0.2)',
    withLabel: true,
    label: << fontSize: 14, strokeColor: mirroredColor >>
>>;
angleApBp.name = "$\\theta'$";
```

然后我们假设物体所受合外力不变，先移动一段距离然后再移动一段距离，所做的功加起来应当等于力在总的位移上做的功。若位移距离变为原来的 $k$ 倍，最后所做的功也应该变为 $k$ 倍。若位移方向相反（原路返回），所做的功也会变为负功。

$$
\begin{align}
\vec{F}\cdot(\vec{s_{1}}+\vec{s_{2}}) & =\vec{F}\cdot \vec{s_{1}}+\vec{F}\cdot \vec{s_{2}} \\
\vec{F}\cdot(k\vec{s}) & =k(\vec{F}\cdot \vec{s}) \\
\vec{F}\cdot(-\vec{s}) & =-\vec{F}\cdot \vec{s}
\end{align}
$$

这对力也是一样的。运动位移不变时，各个分力分别做功，功的总和应当等于他们的合力所做的功。力的大小变为 $k$ 倍，所做的功也变为 $k$ 倍。 $k=-1$ ，即力的方向相反，做功也应该相反。

$$
\begin{align}
\vec{F}\cdot(\vec{s_{1}}+\vec{s_{2}}) & =\vec{F}\cdot \vec{s_{1}}+\vec{F}\cdot \vec{s_{2}} \\
\vec{F}\cdot(k\vec{s}) & =k(\vec{F}\cdot \vec{s})
\end{align}
$$

这就像是，点乘这个运算对两边的向量加法有分配律，并且与向量数乘“优先级相同”。这也是我们感觉点乘运算是一个“乘法”的原因。

> [!tip] 性质总结
> 我们即将发明一种叫点积的运算 $\vec{a}\cdot \vec{b}$ ，这个运算输入两个向量，输出一个数，我们要求这种运算拥有以下两条性质：
> - **体现空间各向同性**：运算结果只与两个向量的大小、夹角有关，而与向量具体方向无关
> - **是个“乘法”**：对两边的输入向量的加法都有分配律，这种性质叫双线性性

我们可以首先推理出，对于两个垂直的向量 $\vec{a}$ 与 $\vec{b}$ ，他们的点乘 $\vec{a}\cdot \vec{b}$ 性质。

由于双线性，我们将其中一个向量取反，结果应该相反：

$$
(-\vec{a})\cdot \vec{b}=-(\vec{a}\cdot \vec{b})
$$

而同时，即使将其中一个向量取反，他们依然是大小不变、夹角依然成 $90\degree$ 的两个向量。即：

$$
(-\vec{a})\cdot \vec{b}=\vec{a}\cdot \vec{b}
$$

```jessiecode
---
boundingBox: [-5, 5, 5, -5]
axis: true
grid: true
---
// 样式定义
vectorStyle = << 
    strokeColor: 'blue', 
    strokeWidth: 3, 
    strokeOpacity: 0.8,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 18 >>
>>;

colorV1 = 'blue';
colorV2 = 'green';
pointStyle = << strokeC2olor: 'black', size: 3, withLabel: false >>;

// 原点
O = point(0, 0) << fixed: true, visible: false >>;

// 向量 v1 的终点（可拖动）
v1End = point(2, 2) pointStyle;
v1End.name = "A";

// 向量 v2 垂直于 v1（自动计算，保持垂直）
// v2 是 v1 逆时针旋转 90 度
v2End = point(function() { return -1.5*v1End.Y(); }, function() { return 1.5*v1End.X(); }) pointStyle;
v2End.visible = false;

// 向量 -v1 的终点（v1 关于原点对称）
negV1End = point(function() { return -v1End.X(); }, function() { return -v1End.Y(); }) pointStyle;
negV1End.visible = false;

// 绘制向量（使用箭头）
vecV1 = segment(O, v1End) vectorStyle;
vecV1.name = "$\\vec{v_1}$";
vecV1.strokeColor = colorV1;
vecV1.label.strokeColor = colorV1;
vecV2 = segment(O, v2End) vectorStyle;
vecV2.name = "$\\vec{v_2}$";
vecV2.strokeColor = colorV2;
vecV2.label.strokeColor = colorV2;
vecNegV1 = segment(O, negV1End) vectorStyle;
vecNegV1.dash = 2;
vecNegV1.name = "$-\\vec{v_1}$";
vecNegV1.strokeColor = colorV1;
vecNegV1.label.strokeColor = colorV1;
```

如此我们可以得出唯一可行的结论：**互相垂直的两个向量，他们的点乘结果必定为零**。

而对于**方向相同的两个向量**，功的物理公式已经剧透了——**点乘结果就是两个向量大小的乘积**：

$$
\vec{a}\cdot \vec{b}=|\vec{a}||\vec{b}|
$$

接下来就很简单了。对于任意向量 $\vec{a}$ 、 $\vec{b}$  ，我们都可以将其中一个向量 $\vec{a}$ 沿平行于 $\vec{b}$ 方向与垂直于 $\vec{b}$ 方向，分解为 $\vec{a_{\perp}}$ 与 $\vec{a_{\parallel}}$ 。从而得到：

$$
\begin{align}
\vec{a}\cdot \vec{b} & =(\vec{a_{\perp}}+\vec{a_{\parallel}})\cdot \vec{b} \\
 & =\vec{a_{\perp}}\cdot \vec{b}+\vec{a_{\parallel}}\cdot \vec{b} \\
 & =0+|\vec{a_{\parallel}}||\vec{b}|
\end{align}
$$

而实际上，平行向量 $\vec{a_{\parallel}}$ 的长度，就是 $|\vec{a}|\cos \theta$ 。

```jessiecode
---
boundingBox: [-5, 5, 5, -5]
axis: true
grid: true
---
// ==========================================
// 向量投影分解演示
// 展示向量 a 分解为平行于 b 和垂直于 b 的分量
// ==========================================

// ========== 样式定义 ==========
vectorStyle = <<
    strokeWidth: 3,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 16 >>
>>;

auxStyle = <<
    strokeColor: '#999999',
    strokeWidth: 1.5,
    dash: 2
>>;

// 向量颜色
colorA = '#FF3300';      // 向量 a（红色）
colorB = '#3366FF';      // 向量 b（蓝色）
colorPara = '#00AA00';   // 平行分量（绿色）
colorPerp = '#9933FF';   // 垂直分量（紫色）

// ========== 基础点定义 ==========
// 原点 O（固定点）
O = point(0, 0) pointStyle;
O.fixed = true;
O.name = "$O$";
O.size = 3;

// 向量 b 的终点 B（自由点，可拖动）
B = point(3, 1) <<
    strokeColor: colorB,
    fillColor: colorB,
    size: 3,
    withLabel: false
>>;
B.name = "$B$";

// 向量 a 的终点 A（自由点，可拖动）
A = point(1, 3) <<
    strokeColor: colorA,
    fillColor: colorA,
    size: 3,
    withLabel: false
>>;
A.name = "$A$";

// ========== 向量 b ==========
vecB = segment(O, B) vectorStyle;
vecB.strokeColor = colorB;
vecB.name = "$\\vec{b}$";
vecB.label.strokeColor = colorB;

// ========== 向量 a ==========
vecA = segment(O, A) vectorStyle;
vecA.strokeColor = colorA;
vecA.name = "$\\vec{a}$";
vecA.label.strokeColor = colorA;

// ========== 计算投影 ==========
// 向量 b 的单位向量方向上的投影
// proj_b(a) = (a·b / |b|²) * b

// 计算点积和 |b|² 的闭包函数
dotProduct = function() { 
    return (A.X() - O.X()) * (B.X() - O.X()) + (A.Y() - O.Y()) * (B.Y() - O.Y()); 
};

bSquared = function() { 
    return (B.X() - O.X())^2 + (B.Y() - O.Y())^2; 
};

// 投影标量系数 t = (a·b) / |b|²
t = function() { 
    if (bSquared() == 0) { return 0; }
    return dotProduct() / bSquared(); 
};

// ========== 平行分量 a∥（投影向量） ==========
// 终点 P = O + t * (B - O)
P = point(
    function() { return O.X() + t() * (B.X() - O.X()); },
    function() { return O.Y() + t() * (B.Y() - O.Y()); }
) << visible: false >>;
P.name = "$P$";

// 平行分量向量 a∥ = OP
vecParallel = segment(O, P) vectorStyle;
vecParallel.strokeColor = colorPara;
vecParallel.name = "$\\vec{a_{\\parallel}}$";
vecParallel.label.strokeColor = colorPara;

// ========== 垂直分量 a⊥ ==========
// 终点 Q = A - (P - O) = A - P + O，但更简单的是 Q = A - vecParallel
// 即 Q = A - (P - O) = A - P（因为 O 是原点）
Q = point(
    function() { return A.X() - (P.X() - O.X()); },
    function() { return A.Y() - (P.Y() - O.Y()); }
) << visible: false >>;
Q.name = "$Q$";

// 垂直分量向量 a⊥ = OQ
vecPerp = segment(O, Q) vectorStyle;
vecPerp.strokeColor = colorPerp;
vecPerp.name = "$\\vec{a_{\\perp}}$";
vecPerp.label.strokeColor = colorPerp;

// ========== 辅助线 ==========
// 从 A 到 P 的虚线（显示垂直关系）
auxAP = segment(A, P) auxStyle;

// 从 A 到 Q 的辅助线（显示平行四边形）
auxOQ = segment(A, Q) auxStyle;

// ========== 直角标记 ==========
// 在 P 点显示直角，表示 a⊥ 垂直于 b
rightAngle = angle(B, P, A) <<
    withLabel: false,
    strokeColor: '#999999',
    strokeWidth: 1
>>;

```

由此可得，对于任意向量 $\vec{a}$ 与 $\vec{b}$ ，都有：

$$
\boxed{\vec{a}\cdot \vec{b}=|\vec{a}||\vec{b}|\cos \theta}
$$

很明显，如果我们将 $\vec{b}$ 沿平行 $\vec{a}$ 与垂直 $\vec{a}$ 方向分解，也能得到同样的结果。

> [!info]
> 我们到这里就能解答章节开头的疑问。对于物理上不同方向的力与位移所做功，计算方式为：
> $$
W = |\vec{F}||\vec{s}|\cos \theta
> $$
> 
> 然而，点乘这个运算不仅在物理上有用，在数学几何上更有大用处。我们接下来抛开物理，继续讨论点乘这个运算在数学上的作用。

### 点乘的坐标表示

之前我们一直在说，一个向量可以与点的坐标一一对应。实际上，如果知道两个向量的坐标表示，他们之间的点乘结果可以更快速地计算出来。

我们先来引入两个好用的向量： x 轴正方向上长度为1的向量 $\vec{e_{x}}=(1,0)$ 与 y 轴正方向上长度为1的向量 $\vec{e_{y}}=(0,1)$ 。我们称他们为 x 方向的单位向量与 y 方向的单位向量。

对于任意向量 $\vec{a}=(a_{x},a_{y})$ ，我们必然能用 $\vec{e_{x}}$ 与 $\vec{e_{y}}$ 来表示他：

$$
\vec{a}=a_{x}\vec{e_{x}}+a_{y}\vec{e_{y}}
$$

```jessiecode
---
boundingBox: [-5, 5, 5, -5]
axis: true
grid: true
---
// ==========================================
// 向量坐标分解演示
// 展示向量 a 分解为 x 轴和 y 轴方向的分量
// ==========================================

// ========== 样式定义 ==========
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5,
    label: << fontSize: 14 >>
>>;

vectorStyle = <<
    strokeWidth: 3,
    lastArrow: << type: 2, size: 5 >>,
    withLabel: true,
    label: << fontSize: 16 >>
>>;

auxStyle = <<
    strokeColor: '#999999',
    strokeWidth: 1.5,
    dash: 2
>>;

// 颜色定义
colorA = '#FF3300';       // 向量 a（红色）
colorX = '#3366FF';       // x 轴分量（蓝色）
colorY = '#00AA00';       // y 轴分量（绿色）
colorIX = '#777777';      // 单位向量 ex（灰色）
colorIY = '#777777';      // 单位向量 ey（灰色）

// ========== 坐标轴单位向量 ==========
// 原点 O
O = point(0, 0) << visible: false >>;

// x 轴正方向单位向量 i = (1, 0)
Ix = point(1, 0) << visible: false >>;
Ix.fixed = true;
Ix.name = "$\\hat{i}$";

// y 轴正方向单位向量 j = (0, 1)
Iy = point(0, 1) << visible: false >>;
Iy.fixed = true;
Iy.name = "$\\hat{j}$";

// 单位向量 i 的向量表示
vecI = segment(O, Ix) vectorStyle;
vecI.strokeColor = colorIX;
vecI.name = "$\\hat{i}$";
vecI.label.strokeColor = colorIX;

// 单位向量 j 的向量表示
vecJ = segment(O, Iy) vectorStyle;
vecJ.strokeColor = colorIY;
vecJ.name = "$\\hat{j}$";
vecJ.label.strokeColor = colorIY;

// ========== 向量 a ==========
// 向量 a 的终点 A（自由点，可拖动）
A = point(3, 2) <<
    strokeColor: colorA,
    fillColor: colorA,
    size: 6,
    label: << fontSize: 16, strokeColor: colorA >>
>>;
A.name = "$A$";

// 向量 a = OA
vecA = segment(O, A) vectorStyle;
vecA.strokeColor = colorA;
vecA.name = "$\\vec{a}$";
vecA.label.strokeColor = colorA;

// ========== 分解点 ==========
// A 在 x 轴上的投影点 Ax = (a_x, 0)
Ax = point(
    function() { return A.X(); },
    function() { return 0; }
) << visible: false >>;

// A 在 y 轴上的投影点 Ay = (0, a_y)
Ay = point(
    function() { return 0; },
    function() { return A.Y(); }
) << visible: false >>;

// ========== 分向量 ==========
// x 轴方向分量 a_x = OAx
vecAx = segment(O, Ax) vectorStyle;
vecAx.strokeColor = colorX;
vecAx.name = "$\\vec{a_x}$";
vecAx.label.strokeColor = colorX;

// y 轴方向分量 a_y = OAy
vecAy = segment(O, Ay) vectorStyle;
vecAy.strokeColor = colorY;
vecAy.name = "$\\vec{a_y}$";
vecAy.label.strokeColor = colorY;

// ========== 辅助线（平行四边形） ==========
// 从 Ax 到 A 的虚线
auxX = segment(Ax, A) auxStyle;
auxX.strokeColor = colorY;

// 从 Ay 到 A 的虚线
auxY = segment(Ay, A) auxStyle;
auxY.strokeColor = colorX;

// ========== 动态数值显示 ==========
// 向量 a 的坐标分量
coordX = function() { return A.X() - O.X(); };
coordY = function() { return A.Y() - O.Y(); };

// ========== 倍数关系显示 ==========
// 在 x 轴单位向量旁边显示倍数
multipleX = text(2.5, -0.8, function() {
    return "$\\vec{a_x} = " + coordX().toFixed(2) + "\\hat{i}$";
}) <<
    strokeColor: colorX,
    fontSize: 14
>>;

// 在 y 轴单位向量旁边显示倍数
multipleY = text(1.2, 2.5, function() {
    return "$\\vec{a_y} = " + coordX().toFixed(2) + "\\hat{j}$";
}) <<
    strokeColor: colorY,
    fontSize: 14
>>;

```

由于我们要的点乘运算有分配律，所以对于任意向量 $\vec{a}$ 与 $\vec{b}$ ，都有：

$$
\begin{align}
\vec{a}\cdot \vec{b} & = (a_{x}\vec{e_{x}}+a_{y}\vec{e_{y}})\cdot(b_{x}\vec{e_{x}}+b_{y}\vec{e_{y}}) \\
 & =a_{x}b_{x}\vec{e_{x}}\cdot  \vec{e_{x}}+a_{x}b_{y}\vec{e_{x}}\cdot  \vec{e_{y}}+a_{y}b_{x}\vec{e_{y}}\cdot  \vec{e_{x}}+a_{y}b_{y}\vec{e_{y}}\cdot  \vec{e_{y}}
\end{align}
$$

其中， $\vec{e_{x}}\cdot  \vec{e_{x}}$ 与 $\vec{e_{y}}\cdot  \vec{e_{y}}$ 为两个同向向量相点乘，结果为其长度相乘，即为 1 。 $\vec{e_{x}}\cdot  \vec{e_{y}}$ 与 $\vec{e_{y}}\cdot  \vec{e_{x}}$ 为两个垂直向量相点乘，结果为 0 。

如此可立刻得出：

$$
\boxed{\vec{a}\cdot \vec{b}=a_{x}b_{x}+a_{y}b_{y}}
$$

> [!info]
> 我们回顾整个过程可以发现，我们推理的过程并不受限于二维空间。我们可以通过同样的方式，推理得到三维、四维甚至更高维度的向量点乘运算也是类似的计算方式。

### 向量长度

我们考虑一种特别的情况：两个相同的向量进行点积。由于空间上的对称性，我们不妨将这个向量旋转到 x 轴正方向上，点积的结果不变。

假设向量 $\vec{a}$ 旋转到 x 轴正方向上时，向量为 $(a,0)$ ，其长度为 $|\vec{a}|=a$ 。则应有：

$$
\begin{align}
\vec{a}\cdot \vec{a} & = (a\vec{e_{x}})\cdot(a \vec{e_{x}}) \\
 & = a^2(\vec{e_{x}}\cdot \vec{e_{x}}) \\
 & = a^2
\end{align}
$$

即，向量长度的平方等于它与自己的点积。

其实，用上一节得到的两个公式，也能推出相同的结果：

$$
\begin{align}
\vec{a}\cdot \vec{a} & = a_{x}^2+a_{y}^2 \\
 & = |a|^2\cos 0 \degree  \\
 & = |a|^2
\end{align}
$$

我们由此得到求向量 $\vec{a}$ 的长度 $|\vec{a}|$ 的方式：

$$
|\vec{a}|^2=\vec{a}\cdot  \vec{a}=a_{x}^2+a_{y}^2
$$

```jessiecode
---
boundingBox: [-5, 5, 5, -5]
axis: true
grid: true
---
// ==========================================
// 向量与勾股定理演示
// 展示 |a|² = aₓ² + aᵧ² 的几何意义
// ==========================================

// ========== 样式定义 ==========
vectorStyle = <<
    strokeWidth: 3,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 16 >>
>>;

auxStyle = <<
    strokeColor: '#999999',
    strokeWidth: 1.5,
    dash: 2
>>;

// 颜色定义
colorA = '#FF3300';       // 向量 a（红色）- 斜边
colorX = '#3366FF';       // x 分量（蓝色）- 直角边
colorY = '#00AA00';       // y 分量（绿色）- 直角边

// ========== 原点 ==========
O = point(0, 0) << visible: false >>;
O.fixed = true;
O.name = "$O$";
O.size = 3;

// ========== 向量 a ==========
// 向量 a 的终点 A（自由点，可拖动）
A = point(2, 3) <<
    strokeColor: colorA,
    fillColor: colorA,
    size: 5,
    label: << fontSize: 16, strokeColor: colorA >>,
    withLabel: false
>>;
A.name = "$A$";

// 向量 a = OA（斜边）
vecA = segment(O, A) vectorStyle;
vecA.strokeColor = colorA;
vecA.name = "$\\vec{a}$";
vecA.label.strokeColor = colorA;

// ========== 投影点 ==========
// A 在 x 轴上的投影点 Ax
Ax = point(
    function() { return A.X(); },
    function() { return 0; }
) << visible: false >>;

// ========== 直角边（分向量） ==========
// x 轴方向分量（直角边 1）
vecAx = segment(O, Ax) vectorStyle;
vecAx.strokeColor = colorX;
vecAx.name = "$\\vec{a_x}$";
vecAx.label.strokeColor = colorX;

// y 轴方向分量（直角边 2）
vecAy = segment(Ax, A) vectorStyle;
vecAy.strokeColor = colorY;
vecAy.name = "$\\vec{a_y}$";
vecAy.label.strokeColor = colorY;

// ========== 直角三角形填充 ==========
// 突出显示直角三角形 O-Ax-A
triRight = polygon(O, Ax, A) <<
    fillColor: 'rgba(255, 100, 50, 0.15)',
    strokeColor: 'none'
>>;

// ========== 直角标记 ==========
rightAngle = nonreflexangle(A, Ax, O) <<
    withLabel: false,
    strokeColor: '#999999',
    strokeWidth: 1.5,
    radius: 0.5
>>;

```

> [!tip]
> 在二维空间中，这实际上就是勾股定理。直角边的长度分别为向量的横坐标与纵坐标（的绝对值），斜边为向量的长度。
> 
> 但正如前面所提示的，这完全可以扩展到三维甚至更高维空间。比如在三维空间中，就有：
> $$
|\vec{a}|^2=a_{x}^2+a_{y}^2+a_{z}^2
> $$

### 计算两个向量的夹角

通过点积的两个公式，我们可以得到一个等式：

$$
a_{x}b_{x}+a_{y}b_{y}=|\vec{a}||\vec{b}|\cos \theta
$$

左边只与两个向量的坐标分量有关，是点积的代数表示。右边只与两个向量的大小与夹角有关，与坐标系的选取方向无关，是点积的几何表示。

如果我们已知两个向量的坐标表示 $\vec{a}=(a_{x},a_{y})$ 、 $\vec{b}=(b_{x},b_{y})$ ，可知两个向量的长度分别为 $|\vec{a}|=\sqrt{ a_{x}^2+a_{y}^2 }$ 、 $|\vec{b}|=\sqrt{ b_{x}^2+b_{y}^2 }$ 。

从而我们可以通过点积求得两个向量的夹角 $\theta$ ：

$$
\begin{align}
\cos \theta  & = \frac{\vec{a}\cdot \vec{b}}{|\vec{a}||\vec{b}|} \\
 & = \frac{a_{x}b_{x}+a_{y}b_{y}}{\sqrt{ a_{x}^2+a_{y}^2 }\sqrt{ b_{x}^2+b_{y}^2 }}
\end{align}
$$

### 余弦定理

通过点积，我们可以快速地建立起任意三角形边和角的关系。

假设有任意三角形 ABC 。则有：

$$
\vec{AB} = \vec{CB}-\vec{CA}
$$

```jessiecode
---
boundingBox: [-1, 9, 9, -1]
axis: true
grid: true
---
// ==========================================
// 三角形边向量关系演示
// 展示 AB = CA - CB
// ==========================================

// ========== 样式定义 ==========
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5,
    label: << fontSize: 14 >>
>>;

vectorStyle = <<
    strokeWidth: 3,
    lastArrow: << type: 2, size: 10 >>,
    withLabel: true,
    label: << fontSize: 16 >>
>>;

// 颜色定义
colorA = '#FF3300';       // 顶点 A（红色）
colorB = '#3366FF';       // 顶点 B（蓝色）
colorC = '#00AA00';       // 顶点 C（绿色）
colorAB = '#FF3300';      // 向量 AB（红色）
colorCA = '#00AA00';      // 向量 CA（绿色）
colorCB = '#3366FF';      // 向量 CB（蓝色）

// ========== 三角形顶点（自由点） ==========
A = point(2, 5) <<
    strokeColor: colorA,
    fillColor: colorA,
    size: 6,
    label: << fontSize: 16, strokeColor: colorA >>
>>;
A.name = "$A$";

B = point(7, 6) <<
    strokeColor: colorB,
    fillColor: colorB,
    size: 6,
    label: << fontSize: 16, strokeColor: colorB >>
>>;
B.name = "$B$";

C = point(0, 0) <<
    strokeColor: colorC,
    fillColor: colorC,
    size: 6,
    label: << fontSize: 16, strokeColor: colorC >>
>>;
C.name = "$C$";

// ========== 三角形 ==========
tri = polygon(A, B, C) <<
    fillColor: 'rgba(200, 200, 200, 0.1)',
    strokeColor: '#999999',
    strokeWidth: 1
>>;

// ========== 三边向量 ==========
// 向量 AB（从 A 到 B）
vecAB = segment(A, B) vectorStyle;
vecAB.strokeColor = colorAB;
vecAB.name = "$\\vec{AB}=\\vec{CB}-\\vec{CA}$";
vecAB.label.strokeColor = colorAB;

// 向量 CA（从 C 到 A）
vecCA = segment(C, A) vectorStyle;
vecCA.strokeColor = colorCA;
vecCA.name = "$\\vec{CA}$";
vecCA.label.strokeColor = colorCA;

// 向量 CB（从 C 到 B）
vecCB = segment(C, B) vectorStyle;
vecCB.strokeColor = colorCB;
vecCB.name = "$\\vec{CB}$";
vecCB.label.strokeColor = colorCB;
```

将向量 $\vec{AB}$ 与自己点积，有：

$$
\begin{align}
\vec{AB}\cdot \vec{AB} & = (\vec{CB}-\vec{CA})\cdot(\vec{CB}-\vec{CA}) \\
 & =\vec{CB}\cdot  \vec{CB} + \vec{CA}\cdot  \vec{CA} - 2\vec{CA}\cdot \vec{CB}
\end{align}
$$

代入点积的几何表示，则有：

$$
|AB|^2=|CA|^2+|CB|^2-2|CA||CB|\cos C
$$

令三角形三边为 a 、 b 、 c ，则可简写为：

$$
c^2 = a^2+b^2-2ab\cos C
$$

这个等式表明：
- 如果能确定 a 、 b 、 c 三条边，角 C 的大小就可以确定（SSS）
- 如果能确定 a 、 b 两条边与角 C 的大小，第三条边 c 就能确定 （SAS）
- 如果确定 c 的大小与角 C 的大小，以及 a 、 b 其中之一的大小，剩余的第三条边构成一元二次方程，可能有两个解（即 SSA 不能唯一确定一个三角形）

明显对于角 A 、 角 B 也能有对应的等式成立。这个定理被称为余弦定理。

> [!tip] 正弦定理
> 除了余弦定理外，三角形中还有正弦定理。正弦定理为：
> 
> $$
\frac{\sin A}{a}=\frac{\sin B}{b}=\frac{\sin C}{c}
> $$
> 
> 这个定理通过初中知识也能轻易地证明，过程留给各位自己证明。（提示，可以通过两边与夹角的正弦值得到三角形的面积。）

> [!question] 本节练习
> 1. 已知向量 $\vec{a}=(3, 4)$，$\vec{b}=(1, -2)$，求 $\vec{a}\cdot\vec{b}$ 。
> 2. 求向量 $\vec{a}=(3, 4)$ 的长度 $|\vec{a}|$ 。
> 3. 思考：如果在直角三角形里应用余弦定理，会得出什么结论？应用正弦定理呢？

### 圆幂定理

设平面有一个半径为 $R$ 、圆心为 $O$ 的圆。对于过平面上任一点 $P$ 的任意一条直线，设它与圆交于两点 $A$ 和 $B$ （切点视为重合的二点），恒有 $\vec{PA} \cdot  \vec{PB} = \vec{OP}^2 - R^2$ 。这就是圆幂定理。

在初中阶段，圆幂定理被拆分为相交弦定理、切线定理、切割线定理，三个定理分别需要通过不同的步骤证明。实际上，我们可以使用向量，用统一的步骤证明三个定理。

设直线的方向向量（与直线同一方向的长度为1的向量）为 $\vec{v}$ 。从点 $P$ 到直线上任意一点的向量可表示为 $t\vec{v}$ ，其中 $t$ 为任意实数，其绝对值即为由 $P$ 点到该点的长度。

$\vec{PA}$ 和 $\vec{PB}$ 分别可以表示为 $t_1 \vec{v}$ ， $t_2 \vec{v}$ 。其中 $t_{1}$ 与 $t_{2}$ 即为有向线段 $\vec{PA}$ 与 $\vec{PB}$ 的长度。（如果 $t_{1}$ 为负，代表 $\vec{PA}$ 与 $\vec{v}$ 方向相反， $t_{2}$ 同理。）

由于 $\vec{v}\cdot  \vec{v}=1$ ，因此有 $\vec{PA} \cdot  \vec{PB} = t_1 t_2$ 。

```jessiecode
---
boundingBox: [-5, 5, 5, -5]
axis: true
grid: true
---
// ========== 样式定义 ==========
pointStyle = <<
    strokeColor: '#003366',
    fillColor: '#003366',
    size: 5,
    label: << fontSize: 14 >>
>>;

vectorStyle = <<
    strokeWidth: 2.5,
    lastArrow: << type: 2, size: 8 >>,
    withLabel: true,
    label: << fontSize: 18 >>
>>;

// 颜色定义
colorP = '#FF3300';       // 点 P（红色）
colorA = '#3366FF';       // 交点 A（蓝色）
colorB = '#00AA00';       // 交点 B（绿色）
colorV = '#9933FF';       // 单位方向向量 v（紫色）

// ========== 原点 ==========
O = point(0, 0) <<visible: false, fixed: true >>;

// ========== 半径滑块 ==========
sliderR = slider([-4.5, -4.5], [-3, -4.5], [0.5, 2.5, 4.5]) <<
    strokeColor: '#003366',
    fillColor: '#FF3300',
    label: << strokeColor: '#FF3300' >>
>>;
sliderR.name = "$R$";

R = function() { return sliderR.Value(); };

// ========== 圆 ==========
circleO = circle(O, R) <<
    strokeColor: '#003366',
    strokeWidth: 2,
    fillColor: 'rgba(0, 100, 200, 0.05)'
>>;

// ========== 点 P（自由点） ==========
P = point(-1, 1) <<
    strokeColor: colorP,
    fillColor: colorP,
    size: 5,
    label: << fontSize: 16, strokeColor: colorP >>
>>;
P.name = "$P$";

// ========== 方向控制点 D（自由点） ==========
// 拖动 D 改变过 P 的直线方向
D = point(-4, -1) <<
    size: 5,
    withLabel: false
>>;

// ========== 直线 PD ==========
linePD = line(P, D) <<
    strokeColor: '#666666',
    strokeWidth: 1.5,
    dash: 1
>>;

// ========== 交点 A 和 B ==========
// 直线与圆的交点
A = intersection(linePD, circleO, 0) << size: 0 >>;
B = intersection(linePD, circleO, 1) << size: 0 >>;

// ========== 单位方向向量 v ==========
// 计算 PD 方向的单位向量
dirX = function() {
    dx = P.X() - D.X();
    dy = P.Y() - D.Y();
    len = sqrt(dx*dx + dy*dy);
    if (len == 0) { return 1; }
    return dx / len;
};

dirY = function() {
    dx = P.X() - D.X();
    dy = P.Y() - D.Y();
    len = sqrt(dx*dx + dy*dy);
    if (len == 0) { return 0; }
    return dy / len;
};

// 单位向量 v 的终点 V
V = point(
    function() { return D.X() + dirX(); },
    function() { return D.Y() + dirY(); }
) << visible: false >>;

// 单位方向向量 v（从 D 出发，避免与主要内容重叠）
vecV = segment(D, V) vectorStyle;
vecV.strokeColor = colorV;
vecV.name = "$\\vec{v}$";
vecV.label.strokeColor = colorV;

// ========== 向量 OA 、 OB 、 OP ==========
vecOA = segment(O, A) vectorStyle;
vecOA.strokeColor = colorA;
vecOA.name = "$\\vec{OA}$";
vecOA.label.strokeColor = colorA;

vecOB = segment(O, B) vectorStyle;
vecOB.strokeColor = colorB;
vecOB.name = "$\\vec{OB}$";
vecOB.label.strokeColor = colorB;

vecOP = segment(O, P) vectorStyle;
vecOP.strokeColor = colorP;
vecOP.name = "$\\vec{OP}$";
vecOP.label.strokeColor = colorP;

// ========== 向量 PA 和 PB ==========
vecPA = segment(P, A) vectorStyle;
vecPA.strokeColor = colorA;
vecPA.name = "$\\vec{PA}$";
vecPA.label.strokeColor = colorA;

vecPB = segment(P, B) vectorStyle;
vecPB.strokeColor = colorB;
vecPB.name = "$\\vec{PB}$";
vecPB.label.strokeColor = colorB;
```

另一方面，由圆的定义，在圆上任取一点 $X$ ，满足圆的向量方程 $|\vec{OX}|^2 = R^2$ 。对于点 $A$ 和 $B$ ，它们满足：

$$
|\vec{OA}|^2 = R^2,\quad |\vec{OB}|^2 = R^2
$$

对于 $A$ 点，由于 $\vec{OA}=\vec{OP}+\vec{PA}$ ，代入得：

$$
|\vec{OP} + t_1 \vec{v}|^2 = R^2
$$

展开得：

$$
\vec{OP}^2 + 2t_1 (\vec{OP} \cdot \vec{v}) + t_1^2 = R^2
$$

整理为：

$$
t_1^2 + 2 (\vec{OP} \cdot \vec{v}) t_1 + (\vec{OP}^2 - R^2) = 0
$$

对于给定的点 $O$ 、点 $P$ 与半径 $R$ ， $\vec{OP}\cdot  \vec{v}$ 与 $\vec{OP}^2-R^2$ 都是常数。因此这是一个关于 $t_{1}$ 的一元二次方程。

同理，将点 $B$ 代入也会得到完全相同的二次方程，因此 $t_1$ 和 $t_2$ 正是这个二次方程的两个根。

根据韦达定理，两根之积为：

$$
t_1 t_2 = \vec{OP}^2 - R^2
$$

由于 $\vec{PA} \cdot  \vec{PB} = t_1 t_2$ ，我们便得到了圆幂定理的表达式：

$$
\boxed{\vec{PA} \cdot  \vec{PB} = \vec{OP}^2 - R^2}
$$

这个推导对 $P$ 的位置没有任何限制：

-   $P$ 在圆内： $t_1$ 和 $t_2$ 符号相反，乘积为负，对应相交弦定理。
-   $P$ 在圆外： $t_1$ 和 $t_2$ 符号相同，乘积为正，对应割线定理。
-   $P$ 在圆上： $t_{1}$ 与 $t_{2}$ 中必有一个为零，乘积为零，点 $P$ 必定与点 $A$ 或点 $B$ 重合。
-  直线与圆相切 ： $t_{1}=t_{2}$ ，二次方程有重根，切线长 $t = \sqrt{\vec{OP}^2 - R^2}$ ，对应切割线定理。

