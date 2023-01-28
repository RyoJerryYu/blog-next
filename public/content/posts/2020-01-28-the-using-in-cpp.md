---
created_at: 2020-01-28 18:00:00
updated_at: 2022-03-27 21:30:33+08:00
layout:     post
title:      "C++中using关键字的使用"
subtitle:   "整理C++中using关键字的用法，重点整理C++11中声明别名时使用using与typedef的不同。"
date:       2020-01-28 18:00:00
author:     "Ryo"
header-img: "img/post-bg-default.jpg"
tags:
    - C++
    - 杂技
---

## using的用法
#### using与命名空间

1. 引入整个命名空间中的成员
   
   不引入命名空间时，使用其中变量需要使用`<命名空间名>::<变量名>`的方式使用。
   ```C++
   using namespace foo;
   ```
   如此会将命名空间foo下所有的成员名称引入，可在直接以`<变量名>`的形式使用。但如此做有可能会使得命名空间foo中部分变量与当前定义的变量名冲突，违反命名空间隔离编译时名称冲突的初衷，因此不建议如此使用。

2. 引入命名空间中的部分成员
   
   可通过仅引入命名空间中部分的成员，避免命名冲突。
   ```C++
   using foo::bar;
   ```
   这种方法仅会引入在语句中明确声明的名称。如using一个枚举类时，不会连其定义的枚举常量也一同引入。

#### using与基类成员

1. 子类中引入基类名称
   
   ```C++
    class Base {
    public:
        std::size_t size() const { return n; }
    protected:
        std::size_t n;
    };

    class Derived : private Base {
    public:
        using Base::size;
    protected:
        using Base::n;
    // ...
    };
    ```
    例中子类private继承基类，由于private继承使得`Base::size`与`Base::n`可视性变为private。而使用`using Base::size`、`using Base::n`后，可分别使其变为public与protected。

2. 子类成员函数与基类同名时保留基类函数用以重载
   
   ```C++
    class Base
    {
    public:
        int Func(){return 0;}
    };
    class Derived : Base
    {
    public:
        using Base::Func;
        int Func(int);
    };
    ```
    子类中定义的成员函数与基类中重名时，即使函数原型不同，子类函数也会覆盖基类函数。
    
    如果基类中定义了一个函数的多个重载，而子类中又重写或重定义了其中某些版本，或是定义了一个新的重载，则基类中该函数的所有重载均被隐藏。

    此时可以在子类中使用`using Base::Func`，令基类中所有重载版本在子类中可见，再重定义需要更改的版本。

又如cppreference中的[例子](https://en.cppreference.com/w/cpp/language/using_declaration#In_class_definition)：
```C++
#include <iostream>
struct B {
    virtual void f(int) { std::cout << "B::f\n"; }
    void g(char)        { std::cout << "B::g\n"; }
    void h(int)         { std::cout << "B::h\n"; }
protected:
    int m; // B::m is protected
    typedef int value_type;
};

struct D : B {
    using B::m; // D::m is public
    using B::value_type; // D::value_type is public

    using B::f;
    void f(int) { std::cout << "D::f\n"; } // D::f(int) overrides B::f(int)
    using B::g;
    void g(int) { std::cout << "D::g\n"; } // both g(int) and g(char) are visible
                                        // as members of D
    using B::h;
    void h(int) { std::cout << "D::h\n"; } // D::h(int) hides B::h(int)
};

int main()
{
    D d;
    B& b = d;

//    b.m = 2; // error, B::m is protected
    d.m = 1; // protected B::m is accessible as public D::m
    b.f(1); // calls derived f()
    d.f(1); // calls derived f()
    d.g(1); // calls derived g(int)
    d.g('a'); // calls base g(char)
    b.h(1); // calls base h()
    d.h(1); // calls derived h()
}
```
`using`语句可以改变基类成员的可访问性，也能在子类中重载(Overload)、重写(Override)基类的函数，或是通过重定义隐藏(Hide)对应的基类函数。


#### using与别名

using在C++11开始，可用于别名的声明。用法如下：
```C++
using UPtrMapSS = std::unique_ptr<std::unordered_map<std::string, std::string>>;//普通别名
using FP = void (*) (int, const std::string&);//函数指针别名

template <typename T>
using Vec = MyVector<T, MyAlloc<T>>;//模板别名
Vec<int> vec;//模板别名的使用
```

## using关键字与typedef关键字定义别名的不同

在STL容器或是其他泛型中若是再接受一个容器类型，类型名称就会写得很长。使用typedef或using定义别名会变得比较方便：
```C++
typedef std::unique_ptr<std::unordered_map<std::string, std::string>> UPtrMapSS;

using UPtrMapSS = std::unique_ptr<std::unordered_map<std::string, std::string>>;
```

对于函数指针，使用using语句可以把函数原型与别名强制分到左右两边，比使用typedef易读得多：
```C++
typedef void (*FP) (int, const std::string&);

using FP = void (*) (int, const std::string&);
```

---

在C++中，若试图使用typedef定义一个模板：
```C++
template <typename T>
typedef MyVector<T, MyAlloc<T>> Vec;

// usage
Vec<int> vec;
```
编译就会报错，提示：
> error: a typedef cannot be a template

在一些STL中，通过如下方式包装一层来使用：
```C++
template <typename T>
struct Vec
{
  typedef MyVector<T, MyAlloc<T>> type;
};

// usage
Vec<int>::type vec;
```

如此显得十分不美观，且要是在模板类中或参数传递时使用typename强制这为类型，而不是其他如静态成员等语法：
```C++
template <typename T>
class Widget
{
  typename Vec<T>::type vec;
};
```

而using关键字可定义模板别名，则一切都会显得十分自然：
```C++
template <typename T>
using Vec = MyVector<T, MyAlloc<T>>;

// usage
Vec<int> vec;

// in a class template
template <typename T>
class Widget
{
  Vec<T> vec;
};
```

---

能做到类似别名功能的，还有宏#define。但#define运行在编译前的宏处理阶段，对代码进行字符串替换。没有类型检查或其他编译、链接阶段才能进行的检查，不具备安全性。在C++11中不提倡使用#define。



   
   