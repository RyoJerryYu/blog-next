---
created_at: 2022-06-28 00:59:41
updated_at: 2022-06-28 22:24:43+08:00
title: 图解经济学原理(1)
license: true
date: 2022-06-28 00:59:41
tags:
---

> 1. 这篇文章参考了曼昆的《经济学原理》与北京大学王辉老师的《微观经济学》课程，内容上会有部分相似。
> 2. 这篇文章中的图使用 3Blue1Brown 的动画生成工具 manim 的 Community Edition 制作，源代码之后会上传到 GitHub 。

我们先不讲课，先来带个货。

德国和加拿大有一种特别的葡萄酒，叫冰酒。这种葡萄酒制作工艺比较特殊，必须要在严冬葡萄被霜冻在藤曼上时采摘下来，再经过发酵、压榨酿造而成。
在冰酒压榨过程中，大量的冰被去除，使得葡萄的成分得到浓缩，因此冰酒口感偏甜。但加工过程对温度要求十分苛刻，温度过高、过低、变化太过剧烈等都会对口感产生影响。由于冰酒工艺特别，主要只有德国、加拿大等少数地区生产。

好了，现在来考虑一个消费场景：
假如你到加拿大去旅游，回国时在机场看到有礼品店在卖冰酒，考虑买一瓶冰酒回国后自己消费饮用。这瓶冰酒容量大概为 400ml ，并且这瓶冰酒只是一个普通牌子，不是奢侈品或高档品牌。
在这个场景下，请大家考虑两个问题：
1. 假设商店中这瓶冰酒标价换算为人民币是 ￥100 ，你是否愿意以这个价格购买一瓶冰酒？
2. 假设你还不知道这瓶冰酒的价格，你会选择购买的最高价格是一瓶冰酒多少元？

在问题 2 中，你愿意支付的最高价格就是你的心理价位，如果商店价格高于心理价位，你就不会购买这件商品。而如果价格低于心理价位，你就会购买这件商品。

# 意愿支付

上面场景中所说的心理价位，在经济学中又叫**意愿支付**。

> **意愿支付**（ willingness to pay ）：是消费者愿意为获得某种物品所支付的最高代价。 —— 曼昆《经济学原理：微观经济学分册》: Page 134

如果这瓶冰酒定价是 100 元，你会觉得太贵了不买，就说明你的意愿支付价格低于 100 元。
然后我们再假设这瓶冰酒 50 元，你觉得很好很便宜，选择买了，就说明你的意愿支付价格在 100 元到 50 元之间。
再把范围收窄一点， 80 元选择不买， 60 元选择买。范围逐渐收敛，买与不买之间的意向会变得越来越模糊。我们假设最终收敛到 70 元，你变得非常犹豫，感觉买与不买没有差别，那 70 元就是你的意愿支付价格。

[[图片：意愿支付价格逼近。价格100时，不买，价格50时，买，80，60，最后70时会犹豫]]

## 意愿支付价格的经济学解释

经济学上有理性人这一概念，实际上是在假设你在决定是否做决策时，会将成本与收益做比较：
- if 收益 > 成本 : 做出决策
- if 收益 < 成本 : 不做出决策

在购买冰酒的场景中，做决策就是指“买冰酒”这个行为。而成本就是冰酒的价格，收益就是你喝下冰酒感觉“爽到”。
而我们不是机器人，我们“爽到”的感觉是很难与价格这种数字相比较的。因此我们要找一个办法把我们的爽到量化为价格。
而意愿支付价格就是这个办法。在上面的例子中，买与不买的价格范围不断逼近，最终到 70 元时你觉得买还是不买都没什么区别。也就是说你喝冰酒爽到，就相当于得到了 70 元。

> **意愿支付价格**：商品消费行为给消费者带来的效用的货币度量。


有了意愿支付价格，买冰酒这件事就很容易模型化了。我们可以直接套回理性人决策的模型：
- 做决策 = 买冰酒
- 收益 = 意愿支付价格
- 成本 = 冰酒价格

则有：
- if 意愿支付价格 > 冰酒价格 : 买冰酒
- if 意愿支付价格 < 冰酒价格 : 不买冰酒

[[图片：意愿支付价格=收益柱=70元，价格=成本=线，线高于柱=不决策，线低于柱=决策]]

在买冰酒这一决策中，你的收益就是 70 元（喝冰酒爽到）。要你花 100 元（冰酒价格）来换 70 元，你肯定是不干的。而要你花 50 元来换 70 元，你就会爽快答应了。

## 消费者剩余

在上面模型中，如果你的意愿支付价格是 70 元，而冰酒只卖 50 元，你就一定会买买买，因为只要花 50 元就能买到 70 元的“爽到”呀！买到就是赚到。

70 元的“爽到”只要花 50 元就能买到，这中间就差了 20 元呢，你就会觉得买冰酒的这笔钱花得真值，赚到 20 元。经济学上就称这是得到了 20 元的消费者剩余。

> **消费者剩余**（ consumer surplus ）：买者原意为一种物品支付的量减去其为此实际支付的量。 —— 曼昆《经济学原理：微观经济学分册》: Page 135

计算上：
$$
消费者剩余 = 意愿支付价格 - 商品价格 
$$
而实际上，消费者剩余是你买商品时赚到的感觉，是这种感觉的量化。
你感觉买这瓶冰酒赚飞了，量化后表现为这次交易你获得的消费者剩余多；你感觉这次交易一般般，有点小贵（但还是愿意买），量化后就是这次交易你获得的消费者剩余少。你获得多少消费者剩余，就代表你在这场交易中赚到了多少（感觉上）。

现在考虑另一种情况：你的意愿支付价格为 70 元，而冰酒价格为 100 元时。你没有选择交易，因此在这种情况，你没有获得消费者剩余，当然也没有失去消费者剩余。
从另一个角度来说，你觉得交易成立后你会得到负的消费者剩余，因此机制的你决定不交易，防止了这次损失。

话又说回来，实际情况中人的决策是不可能这么理性地去比较成本与收益，甚至有可能根本得不出一个意愿支付价格。因此上述讨论都是建立在假设上的——假设理性人模型成立。
在实际情况中，这一假设可能根本不成立，因此这些讨论在现实中可能根本不适用。可这又有什么关系呢？就算相对论是正确的，牛顿定理仍然有他价值不是吗？

# 需求曲线

好了，上面说了一大堆，其实都是单个消费者（你）进行消费的情况。可实际上，这冰酒总不可能只有一个人买呀！

而实际上，每个人对冰酒的爱好、口感要求、奢侈品需求等都是不同的。这就导致了每个人对冰酒这一商品的意愿支付价格可能都不一样！

## 意愿支付价格统计

我们假设，今天其实有包括你在内的 100 个客人都来过这家冰酒店。我把这 100 个客人全部逮住，按顺序每个人都审问了一遍意愿支付价格。于是得到了这样一幅意愿支付价格统计的图：

[[图：意愿支付价格柱状图，乱序，横坐标是到店时间，纵坐标价格，横线为冰酒价格，上下浮动，意愿支付价格超过冰酒价格就会购买]]

如果冰酒价格为 80 元，那所有意愿支付价格超过 80 元的客人都会选择买冰酒，而意愿支付价格低于 80 元的人都不会选择买。而如果冰酒价格为 60 元，那意愿支付价格超过 60 元的那部分客人也会开始选择买。冰酒价格越低，选择买冰酒的客人就越多。

可是这图有点乱：
1. 看不出客人意愿支付价格的分布
2. 如果有 200 个客人到店，对应价格的冰酒又会有多少人买？

## 需求曲线

为了处理上面提出的两个问题，我把客人按照意愿支付价格从高到低来了个快速排序，然后把柱状图连成了一条曲线：

[[图：快速排序，意愿支付价格从高到低，然后连成曲线，最后还是有冰酒价格横线]]

我们能看到，代表冰酒价格（市场价格）的横线与曲线形成了一个交点。交点左边的客人都会选择买冰酒，而右边的人都会选择不买。
冰酒价格下降，交点右移，选择购买冰酒的客人就会变多；冰酒价格上升，交点左移，购买的人就会变少。因此交点的横坐标就是购买冰酒的人数，也就是冰酒交易量。

假设每个客人只会买一瓶冰酒，那么交点的横坐标同时也就是冰酒的需求量（实际上有客人不止买一瓶冰酒也没关系，我们可以当是来了两个客人）。而交点的纵坐标当然就是冰酒的价格。
冰酒价格变化，交点位置也会变化，对应需求量也跟随发生变化。这条曲线描绘的就是冰酒需求量随冰酒价格变化的关系。

[[图：需求曲线与价格的交点，纵坐标横坐标解释，价格变动后，纵坐标与横坐标变化解释，交点连续变为曲线]]

我们称这条曲线为冰酒的需求曲线。

> **需求曲线**（ Demand Curve ）：表示一种物品价格与需求量之间关系的图形 —— 曼昆《经济学原理：微观经济学分册》: Page 68

像这样用需求曲线表示价格与需求量的关系，可以解决上面的两个问题：
1. 客人意愿支付价格的分布就是需求曲线的形状（虽然我们为了简化只画直线，但其实曲线形状也是可以上凸下凹，甚至是S形的）
2. 如果客人数量翻倍，我们一般认为新来的 100 人意愿支付价格分布跟原先 100 人的分布几乎相同，因此需求曲线形状不变，横坐标轴缩短一半（或者说图形横向拉伸一倍）就是我们要的结果了。

值得一提的是，数学中我们常把横坐标当作自变量，而纵坐标表示因变量。但需求曲线中正相反，纵坐标的价格是自变量，需求量才是因变量。
我记得高中老师一般都会说这是因为经济学家不懂数学，然后草草带过。但实际上，消费者意愿支付多少钱容易统计，而不同价格下到底有多少人会想买难以统计。通过统计意愿支付价格并排序生成需求曲线时，将价格放在纵轴是一种很合理的选择。马歇尔当初也是在这一框架下推导出需求曲线的，曼昆也在他的[这篇博客](http://gregmankiw.blogspot.com/2006/09/who-invented-supply-and-demand.html)中对此有过讨论。
（实际上，马歇尔是从效用理论推导出需求曲线的，与我们上面推导的过程不一样，但总的来说还是在同一框架下。说马歇尔不懂数学，就像是在说薛定谔不懂数学——怎么可能嘛。）



## 市场上所有的消费者剩余

店里来了这么多人，每个人意愿支付价格都不一样，那每个人买到同样价格的冰酒，感觉赚到的程度肯定是不一样的。

[[图：柱状图，展示个人的消费者剩余，然后到线图，展示面积，即市场中的消费者剩余]]

对于单个人来说，他的消费者剩余就是意愿支付价格减去商品价格，也就是柱子在价格线以上标橙色的部分。

可现在到店里的不止一个人啊，我要算所有消费者一共感觉赚到了多少。那我就要把所有橙色部分加起来，也就是做了一个积分，积分的结果就是到店里所有人通过买冰酒这件事一共能赚多少了。大家别看到积分就怕，其实意思就是求需求曲线以下，价格线以上这一三角形的面积。
（每个人买冰酒价格肯定是固定的。总不能对不同的人以不同的价格出售吧）

值得一提的是，在价格线与需求曲线交点右边的这些人，是不算消费者剩余的，也不会使总的消费者剩余减少。因为他们嫌冰酒太贵（高于意愿支付价格），根本就没有买冰酒（达成交易）。


# 总结一下
