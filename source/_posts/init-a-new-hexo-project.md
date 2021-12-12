---
title: init-a-new-hexo-project
date: 2021-12-12 20:09:13
tags:
---

## 使用 hexo 搭建博客

最近使用 hexo 搭建了一个博客，并打算挂载在 github page 上，对之前的那个博客进行替代。

我们可以尝试一下代码块高亮：

```python
def func_echo(s: str):
    print(s)


class HelloPrinter:
    printer: Callable[[str]]

    def __init__(self, printer: Callable[[str]]):
        self.printer = printer
    
    def call(self, s: str):
        self.printer(s)


p = HelloPrinter(func_echo)
p.call("hello world!")
```

然后看看效果。总感觉不是很满意。