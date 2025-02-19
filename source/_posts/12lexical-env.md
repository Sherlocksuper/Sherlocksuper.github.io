---
title: javascript-词法环境
updated:
description:
top_img:
date: 2024-8-14 10:56:16
tags:
  - 本手
---

词法环境：
每个运行的函数、代码块、以及整个脚本，都有一个词法环境，
这个词法环境是一个内部隐藏的关联对象

词法环境包括两个部分：
1. 存储自己作用域内所有的变量
2. 对外部词法环境的引用

思考逻辑：
声明一个变量是在这个变量所处地方的***词法环境***对象（特殊内部对象的属性）添加一个属性
修改一个变量也是修改词法环境内部的一个属性

不过，词法环境只是存在于规范层面，用来具体的描述对象是怎么工作的
事实上并不存在与之对应的对象

### 词法环境间的引用

在一个函数运行时，会自动创建一个新的词法环境来储存他内部的局部变量和参数

![执行过程](functioncreate.png)

此时，我我们有两个词法环境
一个是函数内部的，一个是全局、函数外部的

当代码要访问一个变量的时候，首先会搜索内部词法环境，然后搜索外部，
直到全局词法环境或者找到自己要的

注意：每次某个函数被调用时，都会创建一个新的词法环境对象，词法环境中对外部对象的引用是一样的
所有的函数在“诞生”时都会记住创建它们的词法环境。所有函数都有名为 [[Environment]] 的隐藏属性，该属性保存了对创建该函数的词法环境的引用。

### 使用例子：闭包

闭包指的是一个函数可以记住外部变量并且可以访问这些变量，除了new Function(string)之外的所有函数都是天生带有闭包

javascript的函数会通过[[Environment]]属性记住创建的位置、访问外部变量


### 示例


![示例](count-example.png)

当使用makeCounter()是，改函数创建一个自己的词法环境，并包含count这个属性
之后，调用counter时，会创建一个counter的词法环境，之后添加对外部makeCounter词法环境的引用，并尝试搜索count
但是由于counter词法环境不存在count,于是便会向myCounter搜索

调用counter时，触发 count++ 代码，此时，首先会在counter的此法环境中搜索count，
由于counter函数的词法环境不存在其他变量，于是便会向上搜索，更改myCounter的词法变量的属性

当我们再次调用makCounter()时，makeCounter会再次创建一个词法环境，这个词法环境包含其内部的新的count

词法环境结构如下：
![闭包示例](bibao-example.jpg)
