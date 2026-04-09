---
created_at: 2026-03-30T01:03:59
updated_at: 2026-03-30T01:04:13
aliases:
  - 给初中生的向量入门（下）
title: 给初中生的向量入门（下）
---
> [!info]
> 这是上下两篇文章中的下篇。上篇为：[[2026-03-29-junior-vector-introduction|给初中生的向量入门（上）]]

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
> W = |\vec{F}||\vec{s}|\cos \theta
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
> |\vec{a}|^2=a_{x}^2+a_{y}^2+a_{z}^2
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

## 向量点乘的应用

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
> \frac{\sin A}{a}=\frac{\sin B}{b}=\frac{\sin C}{c}
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
