---
created_at: 2020-08-02 00:10:10
updated_at: 2022-03-27 21:30:33+08:00
layout:     post
title:      "Python字典的实现原理"
subtitle:   "逻辑结构与物理结构在Python3.6前后的不同"
date:       2020-08-02 00:10:10
author:     "Ryo"
header-img: "img/post-bg-default.jpg"
tags:
    - Python
    - 数据结构
---

> CPython从3.6开始，字典（dict）不再是无序的了——字典的修改了原先的底层实现，变得能按字典插入的顺序进行遍历。而Python从3.7开始将字典的有序性写入语言特性，不管是Jython、IronPython还是其他Python实现，从3.7开始大家的字典都是有序的了。

# 前言

以前参加Python相关的面试时，面试官经常都会问一个问题：Python里的字典（dict）是有序的吗？

这自然难不倒我，我也照本宣科地讲：Python的字典底层是用哈希表实现的，在不发生冲突时读写的时间复杂度是O（1），比读写时间复杂度为O（logn）的红黑树要更快。但红黑树可以按下标的大小顺序进行遍历，而Dict遍历时是无序的。

我讲的时候没感觉到任何的违和感，估计面试官们也没觉得任何的不对。直到有一天，我查Python各个版本的新特性时，发现Python 3.6的What's New里有[这么一条](https://docs.python.org/3/whatsnew/3.6.html#new-dict-implementation)：

> New dict implementation
> 
> The dict type now uses a “compact” representation based on a proposal by Raymond Hettinger which was first implemented by PyPy. The memory usage of the new dict() is between 20% and 25% smaller compared to Python 3.5.
> 
> The order-preserving aspect of this new implementation is considered an implementation detail and should not be relied upon (this may change in the future, but it is desired to have this new dict implementation in the language for a few releases before changing the language spec to mandate order-preserving semantics for all current and future Python implementations; this also helps preserve backwards-compatibility with older versions of the language where random iteration order is still in effect, e.g. Python 3.5).

啥情况？CPython的dict竟然优化了内存，还变有序了！？

# Python 3.5 以前dict的实现

先不着急看Python 3.6 里的dict，我们先来看看Python 3.5之前的dict是怎么实现的，再拿3.6来做对比。

在Python 3.5以前，dict是用Hash表来实现的，而且Key和Value直接储存在Hash表上。想通过Key获取Value，只需通过Python内部的Hash函数计算出Key对应的Hash值，再映射到Hash表上对应的地址，访问该地址即可获取Key对应的Value。如下图所示：

我们知道，Hash表读写时间复杂度在不发生冲突的情况下都是O（1）。

为什么呢？我们可以把Hash表读写的步骤分开来看：

1. 首先用Hash函数计算key的Hash值，Hash函数一般来说时间复杂度都是O（1）的。
2. 计算出Hash值后，映射到Hash表内的数组下标，一般用取余数或是取二进制后几位的方式实现，时间复杂度也是O（1）。
3. 然后用数组下标读取数组中实际储存的键值，数组的下标读取时间复杂度也是O（1）。

这三个步骤串起来后复杂度并没有提升，总的时间复杂度自然也是O（1）的。

而内部储存空间，Python字典中称为entries。entries相当于一个数组，是一段连续的内存空间，每个位置储存一个（Hash值，指向Key的指针，指向Value的指针）三元组。

当然，由于抽屉原理，我们知道Hash表不可避免的会出现Hash冲突，Python的dict也不例外。

而解决Hash冲突的方法有很多，比如C++的unordered_map和Go的map就用链地址法来解决冲突，用链表储存发生冲突的值。而Java更进一步，当链表长度超过8时就转换成红黑树，将链表O（n）的查找复杂度降为O（logn）。C#的HashTable则是用再散列法，内部有多个Hash函数，一次冲突了就换一个函数再算，直到不冲突为止。

而Python的dict则是利用开放寻址法。当插入数据发生冲突时，就会从那个位置往后找，直到找到有空位的地址为止。要查的时候，也是把下标值映射到到地址后，先对比一下下标值相不相等，若不相等则往后继续对比。

这也造成个问题，dict中的元素不能直接从entries中清理掉，不然往后寻找的查找链就会断掉了。只能是先标记住删除，等到一定时机再一并清理。

此外我们也知道，当冲突过发生得过多，dict读写所需的时间也会变多，时间复杂度不再是O(1)，这也是Hash表的通病了。

Python中dict初始化时，内部储存空间entries容量为8。当内部储存空间占用到一定程度（entries容量×装填因子，Python的dict中装填因子是2/3）后，就会进行倍增扩容。每次扩容都要遍历原先的元素，时间复杂度为O(n)，但基本上插入O(n)次之后才会进行一次扩容，所以扩容的均摊时间复杂度为O(1)。而扩容时会重新进行Hash值到entries位置的映射，此时就是把标记删除但仍留在entries中的元素清理掉的最佳时机。

Python3.5之前这种dict的实现就有两个毛病：

1. 元素的顺序不被记录。两个Key值通过Hash函数的出来的Hash值不一定能保证原来的大小关系，由于Hash冲突、扩容等影响元素的顺序也会变化。当然这种无序性也是Hash表通用的特点了。
2. 占用了太多了无用空间。上面说到entries中每个位置储存一个（Hash值，指向Key的指针，指向Value的指针）三元组，没用到或是标记删除的位置占用了大量的空间。

于是，Raymond Hettinger就提出了一种新的dict实现方式。在CPython3.6中就使用了这种新的实现方式。

# CPython3.6中dict的实现

当要实现一个如下的dict时：

```python
d = {
    'timmy': 'red', 
    'barry': 'green', 
    'guido': 'blue'
}
```

如在上一节中所讲，在Python3.5以前，在内存储存的形式可以表示成这样子：

```python
entries = [['--', '--', '--'],
           [-8522787127447073495, 'barry', 'green'],
           ['--', '--', '--'],
           ['--', '--', '--'],
           ['--', '--', '--'],
           [-9092791511155847987, 'timmy', 'red'],
           ['--', '--', '--'],
           [-6480567542315338377, 'guido', 'blue']]
```

而CPython3.6以后，是以这种形式储存在内存中的：

```python
indices =  [None, 1, None, None, None, 0, None, 2]
entries =  [[-9092791511155847987, 'timmy', 'red'],
            [-8522787127447073495, 'barry', 'green'],
            [-6480567542315338377, 'guido', 'blue']]
```

改变了什么？

1. dict内部的entries改为按插入顺序存储，新增了一个indices用于储存元素在entries中的下标。dict整体仍是Hash表结构，但Hash值映射到indices中，而不是直接映射到entries中。
2. 由于entries改为了按插入顺序存储，使得申请entries容量时只要申请Hash表长度的2/3即可，省去了Hash表中的无用空间，储存更紧凑。
3. dict读写步骤从原先的3步变为4步：计算key的Hash值，映射到indices内存空间，从indices读取entries的下标值，用下标从entries中读写数据。读写时间复杂度仍保持为O(1)，冲突、删除标记等Hash表的特性也仍然存在。indices的扩容策略也仍然是倍增扩容，但因为填充因子仍然为2/3，entries每次扩容时只需申请indices长度的2/3即可。

有什么好处？

1. 压缩空间：原先Hash映射是直接映射到entries上，会有大量的空隙。现在Hash映射到indices上，而entries中可更紧凑地存储元素。而indices中储存的entries下标占用内存可以比entries元素要小得多——当entries长度足够短时每个下标只需占一个字节。indices中确实也还仍有空隙，但占用空间总要比旧的dict实现要小得多了。
2. 更快的遍历：以前的实现遍历dict要遍历整个Hash表，需要挨个位置读取一下，判断它是空闲位置还是实际存在的元素。而现在只需要对变得更紧凑的entries遍历就行了。这也带来一个新的特性：entries是按照元素插入的顺序存储的，遍历entries自然也会按元素插入的顺序输出。这就给dict带来了有序性。
3. 扩容时关注的内存块更少。原先的entries扩容时所有数据都要重新映射到内存上，cache利用率不好。现在扩容时基本可以整个entries直接复制（当然，有删除标记的数据这时要忽略）。

综上，CPython3.6以后通过增加了一个indices增加了空间利用率，在维持读写时间复杂度不变的情况下增加了遍历与扩容效率。至于dict遍历变得有序，倒是有点次要的特性了。

# 我们是否应利用新dict的有序性？

既然Python中dict变得有序了，那我们是否应该主动去利用它呢？我是这么认为的：

1. 在Python3.6中，我们不推荐利用dict的有序性。3.6时dict的有序性还只是CPython的一个实现细节，并不是Python的语言特性。当我们的代码不是在CPython环境下运行，dict的有序性就不起作用，就容易出莫名其妙的BUG了。
2. 在Python3.7后，dict按插入顺序进行遍历的性质被写入Python语言特性中。这时确实在代码中利用dict有序性也没什么大问题。但dict这种数据结构，最主要的特性还是表现在Key映射到Value的这种关系，以及O(1)的读写时间复杂度。当我们的代码中需要关注到dict的遍历顺序时，我们就要先质问一下自己：是否应该改为用队列或是其他数据结构来实现？


# 参考文献

- [Are dictionaries ordered in Python 3.6+?](https://stackoverflow.com/questions/39980323/are-dictionaries-ordered-in-python-3-6)
- [[Python-Dev] Python 3.6 dict becomes compact and gets a private version; and keywords become ordered](https://mail.python.org/pipermail/python-dev/2016-September/146327.html)
- [[Python-Dev] More compact dictionaries with faster iteration](https://mail.python.org/pipermail/python-dev/2012-December/123028.html)
- [关于python3.6中dict如何保证有序](https://zhuanlan.zhihu.com/p/36167600)
- [python3.7源码分析－字典_小屋子大侠的博客-CSDN博客_python 字典源码](https://blog.csdn.net/qq_33339479/article/details/90446988)
- [《深度剖析CPython解释器》9. 解密Python中字典和集合的底层实现，深度分析哈希表](https://www.cnblogs.com/traditional/p/13503114.html)
- [CPython 源码阅读 - dict](http://blog.dreamfever.me/2018/03/12/cpython-yuan-ma-yue-du-dict/)