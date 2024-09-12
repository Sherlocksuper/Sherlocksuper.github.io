---
title: 一码多用——跨端发展史
tags: [ ]
categories: [ "妙手" ]
poster:
  topic:
  headline:
  caption:
  color:
date: 2024-09-12 14:25:53
description:
cover:
sticky: 999
mathjax:
topic:
references:
type:
---

这篇文章以跨端技术的演进过程为中心，重点分析了Cordova、React Native和Flutter的渲染原理，尤其深入介绍了Flutter的独特三层架构。
文章详细阐述了Flutter自有的Skia图形引擎和Dart语言的作用，以及其如何通过渲染流水线和双缓冲机制优化UI性能。

<!-- more -->

# 跨端技术的历史

说实话，我是那种很反感教科书一类的教案上来就讲历史而不是实操的人

1. [Cordova](https://cordova.apache.org/)  和 Ionic 诞生于2009年。
   其中，Cordova是跨端框架，基于WebView和JSBridge，
   Ionic诞生时是基于Cordova的UI组件库

2. [React Native](https://reactnative.dev/) Facebook于2015年推出的一种跨端开发框架。
   并不使用WebView和JSBridge
   其使用的是一种 "Native" 方法，我们后面会讲到

3. [Flutter](https://flutter.dev/)
   是笔者最早接触到的跨端框架，是Google于2017年推出的一种跨端开发框架。

# 原理

## 一句话讲解

1. Cordova/Ionic: 使用WebView嵌入Web应用，对于原生的功能如相机等需要用JSBridge调用
2. React Native: 使用JavaScript和React编写逻辑，映射到iOS和Android的原生组件上
3. Flutter: 自有的Skia图形引擎渲染UI, 自研_**三层架构**_降低多端成本

## [Cordova](https://cordova.apache.org/)

### WebView

WebView是一个基于WebKit引擎的浏览器组件,实现了在移动应用中嵌入网页内容
原理:

1. WebView **_内部使用了操作系统提供的浏览器内核_** (Android的Chrome、IOS的Safari)来渲染网页，类似一个迷你的浏览器
2. WebView是原生应用的一部分，事实上是一个UI组件类似于按钮、文本框
3. WebView允许网页和原生应用通信，通过JSBridge实现，网页和原生应用可以互相调用对方的功能

### [JSBridge](https://javascript.plainenglish.io/what-is-jsbridge-f72f3c0987f1)

什么是JSBridge ?

JSBridge is a bridge between the JavaScript engine and the native platform code.

JSBridge是JavaScript引擎和原生平台（Android、IOS）的一个桥梁
它把javascript代码转化成原生平台能够看懂的语言并调用，然后将调用的结果返回给webView的界面

### 过程

#### 1. **翻译为原生可理解的语言**

- **Web 端调用 JSBridge**：Web 页面使用 JavaScript 代码，通过一个暴露的 `window.bridge` 对象（或其他命名）来调用原生功能.

- **JSBridge 传递**：JSBridge 在 WebView 中监听这些调用（通过注册的方法），并将这些 JavaScript 调用转换为特定的指令，如 "takePhoto"。

- **原生调用**：原生应用事先会在 JSBridge 中提供一系列功能，如拍照、获取地理位置等。JSBridge 将 "takePhoto" 这样的指令映射到原生应用对应的功能调用，

#### 2. **将指令发送给对应平台**

JSBridge 通过两种主要方式将 Web 页面的请求传递给原生应用：

##### **1. URL**

- **原理**：在 WebView 中，JavaScript 可以通过修改 URL 的方式与原生应用通信。JSBridge 会构造一个特定的 URL 格式。
  例如(以拍照为例) `bridge://takePhoto?params=...`，这个 URL 可以被原生识别。

- **触发原生响应**：WebView 拦截这个 URL，识别其内容并通知原生代码执行相应的功能（如调用相机）。

##### **2. 注入 JavaScript 接口**

- **原理**：原生应用可以主动注入一段 JavaScript 代码到 WebView 中，比如通过 `WebView.addJavascriptInterface`（在 Android
  中），这段 JavaScript 暴露出一系列接口让 Web 页面调用。

- **触发原生响应**：Web 页面通过调用这些接口与原生交互，类似于直接调用本地 JavaScript
  方法，但这些方法最终由原生实现。比如 `window.NativeInterface.takePhoto()` 这样的接口实际会触发原生代码。

#### 3. **原生应用执行并返回结果**

- **原生处理**：一旦原生应用接收到 Web 发来的指令（例如通过 URL 或 JavaScript 接口），它会执行相应的功能，比如启动相机等。

- **返回数据到 Web**：原生应用完成任务后，通常会将结果通过 JSBridge 返回给 Web 页面。
  之后通过 调用时候设置的 JavaScript 回调函数进行对应的处理，

原生应用在完成任务后会调用这个回调函数，将数据传回 Web 页面。
之后由web页面进行相应

### 缺点

优点自不必说,我们来着重关注一下缺点

1. 在使用过程中，会频繁调用JSBridge，而JSBridge毕竟不是原生的API，所以会有一定的通信延迟和时间损耗
2. 使用WebView过程中，需要经历 “浏览器的渲染过程” ，而原生代码直接使用操作系统提供的图形控件，避免了多层抽象和额外的处理步骤
3. 原生控件可以更直接的利用GPU加速，而浏览器的GPU加速依赖于内部的实现和优化(增加了额外的抽象层,并且不同浏览器性能不一)
4. JavaScript 代码需要经过解释、编译和优化等多个步骤，相比直接执行原生代码，效率较低

## [React Native](https://reactnative.dev/)

React Native 和 Cordova/Ionic 的区别在于，React Native 不使用 WebView，而是直接使用一种名为 “Native” 的方法。

这种方法能够直接将Javascript界面以及点击、动画等交互变成对应平台的原生组件。
(ps: 这里的方法指的是method而非function)

React Native 和 Weex 通过一种桥梁机制，使用 JavaScript 来定义应用的界面布局和交互逻辑。
但最终实际显示的界面不是基于 Web(WebView) 技术（如 HTML/CSS），而是通过调用手机操作系统的**原生 UI 件**来呈现的。

### 什么是 Native 的控件？

"Native"意为"原生"，指的是对应的平台
**Native 控件**（Native Components）指的是手机操作系统（如 iOS、Android）自带的用户界面组件。
这些控件是系统级别的，专门为该操作系统设计，通常表现更流畅、性能更好，用户体验更接近“原生应用”。

一些常见的 Native 控件包括：

- **iOS 上的原生控件**：
    - `UIView`: 用于显示内容的基础容器。
    - `UIButton`: 原生的按钮组件。
    - `UILabel`: 用于显示文本的组件。

- **Android 上的原生控件**：
    - `View`: Android 上的基础视图。
    - `Button`: 用于用户点击的按钮。
    - `TextView`: 用于显示文本的控件。

### 如何转化为 Native 控件？

在 React Native 和 Weex 中，虽然开发者使用 JavaScript 来编写界面和交互逻辑，但这些框架背后会有一个**桥接层（Bridge）**。

桥接层负责将 JavaScript 描述的界面结构（如 `<View>`、`<Button>` 等）转化为操作系统的原生控件。

同时,桥接层也允许 JavaScript 和 原生 直接按互相调用对方。

例如：

- 在 React Native 中，开发者可能会用这样的 JavaScript 来创建一个按钮：
  ```jsx
  <Button title="Click Me" onPress={handleClick} />
  ```
  虽然这段代码看上去像是 Web 的 JSX 代码，但实际上 React Native 背后的桥接机制会将这个按钮组件映射为 iOS 上的 `UIButton` 或 Android 上的 `Button`。

  也就是说，当你运行这个应用时，用户实际看到和交互的是原生平台的按钮，而不是一个 HTML 按钮。

### 为什么要转化为 Native 控件？

1. **性能**：原生控件由操作系统直接渲染，性能比 WebView 中的 HTML/CSS 渲染更好。操作系统可以更高效地处理这些组件的渲染、动画等任务。
2. **用户体验**：由于使用了系统级别的组件，控件的样式、交互效果和原生应用一致，使得用户体验更加流畅自然，尤其是在复杂的界面上。
3. **系统功能**：原生控件可以更容易地与操作系统的其他功能（如相机、通知、定位等）集成。

## [Flutter](https://flutter.dev/)

本篇的目的就是以Flutter为核心，

Flutter 是 Google 于 2017 年推出的一种跨端开发框架，它的原理和上文的两个跨端方法有所不同。

Flutter 不借助原生的渲染能力（即上文提到的Native）,而是**_自己实现了一套渲染逻辑_**

**Flutter 的三板斧:**

1. **自有的 Skia 图形引擎**：
2. **Dart语言**：
3. **自研的三层架构**：

下面我们以图像的渲染原理来介绍前两板斧的作用(Skia和Dart)

### 图像的渲染原理(以Flutter为例)

在这之前，可以先看看我的这一篇文章

{% link https://holdme.fun/2024/07/10/9flutter-react/ desc:true %}

在Flutter中，图像显示的基本原理依然需要CPU、GPU和显示器的协同配合，但其框架对渲染管线(通俗点说就是渲染的步骤)有一些独特的实现。让我们从Flutter渲染的角度进一步详细说明整个过程：

#### 1. **CPU的角色：Flutter渲染的初步计算**

- **在Widget树的构建**：CPU的任务是根据用户输入、应用状态变化以及开发者编写的代码，构建或重建Widget树。Widget树只是对UI界面的描述。
- **Element树和RenderObject树**：
    - **Element树**：Widget树在被构建/更改后，CPU会生成与之对应的Element树。Element树的每个节点表示Widget的实例化。
    - **RenderObject树**：CPU还会创建和更新RenderObject树，这个树是负责实际布局和渲染的对象。RenderObject树保存了具体的布局和绘制信息（如尺寸、位置等），而CPU负责计算每个节点的布局。
- **布局计算**：Flutter的布局过程是自顶向下进行的。CPU会先确定父节点的尺寸和约束，然后再向子节点传递这些约束。通过这种递归过程，Flutter计算出每个Widget的大小和位置。

#### 2. **GPU的角色：Flutter渲染的实际执行**

- **绘制指令生成**：布局确定之后，CPU会将布局和绘制相关的数据打包成绘制指令。Flutter使用Skia图形库，Skia是一种跨平台的2D图形引擎。CPU生成的绘制指令通过Skia传递给GPU，由GPU完成实际的像素绘制。
- **绘制流水线**：
    - **Layer树**：(CPU生成)Flutter引入了Layer（图层）的概念，每一帧的渲染会产生一个Layer树。**_Layer树是RenderObject树的优化形式_**，包含了具体的**_绘制信息和层次结构_**。有助于高效地管理和合成多个绘制操作。
    - **合成**：当Layer树生成后，CPU会将其交给GPU进行合成。将不同的Layer按照正确的顺序组合并转换为可以显示的帧数据。

#### 3. **帧缓冲区与VSync：协调显示器刷新**

- **帧缓冲区的存储**：当GPU完成了所有图层的合成并生成最终的像素数据后，数据会被存储在**帧缓冲区**中。帧缓冲区是GPU专门用于保存一帧完整图像的区域。(事实上就是一群内存块)
- **垂直同步（VSync）机制**：Flutter使用VSync信号来协调GPU渲染和显示器刷新率。在大多数设备上，显示器的刷新率为60Hz，这意味着显示器每秒更新60次。Flutter会通过VSync信号来确保每次显示器刷新时，能够显示最新的一帧图像，避免撕裂现象。
- **帧速率控制**：Flutter的渲染引擎通过监听VSync信号，确保在适当的时机开始渲染新的一帧。VSync信号通常每秒发送60次（即60Hz），当Flutter接收到VSync信号时，它会驱动新的渲染管线(驱动新的渲染步骤)，计算、生成和合成下一帧。

#### 4. **Flutter的双缓冲机制**

- **前后缓冲区**：Flutter使用双缓冲机制来确保帧的平滑显示。后缓冲区是GPU正在渲染的一帧数据，而前缓冲区则是即将显示的完整帧。当后缓冲区渲染完成并在VSync信号到来时，缓冲区会交换，这样前缓冲区的数据被显示器读取并显示。

### Flutter三层架构

Flutter的架构采用分层设计，从下到上分为三层Embedder、Engine和Framework。

最下层是Embedder层，实现了和操作系统对接，渲染、线程设置以及平台相关特性

中间层是Engine层，包含Dart、Skia，Skia为上层提供了调用底层渲染和排版的能力，Dart则为Flutter提供了运行时调用Dart和渲染引擎的能力。而Engine层的作用，则是将它们组合起来，从它们生成的数据中实现视图渲染

Framework层则是一个用Dart实现的UI库，包含了常规的图形、动画等功能。

# 总结

值得一提的是，Flutter在笔者目前的使用体验来看，他还只是一个类似于UI库的存在

对于Android和IOS的原生服务，比如 通知提示、相机调用等，还是需要通过原生的方法来调用

在Flutter里面，这个叫 "MethodChannel"

# 引申

## 动画中的双缓冲机制

例子：假如我们有一个动画，每秒钟60帧，每一帧都要变化

假设这个动画为：第一帧为红色、第二帧为绿色

1. 第一帧的渲染:
   CPU加工出需要显示的内容，放入后缓冲区
   GPU处理后缓冲区的渲染，当VSync来到的时候，后缓冲区和前缓冲区交换
   第一帧的数据现在在前缓冲区,显示器会读取它并显示,屏幕变成红色
2. 第二帧的渲染:
   CPU加工出需要显示的内容，放入后缓冲区
   GPU处理后缓冲区的渲染，当VSync来到的时候，后缓冲区和前缓冲区交换
   第二帧的数据现在在前缓冲区,显示器会读取它并显示,屏幕变成绿色

(ps:是不是特别像React里的虚拟Dom机制?)

## 明晰几个概念

1. 渲染：把数据转化为图像的过程，在开发中大多指把“数据”转化为“可视化的图像”,
   即：**将抽象的界面结构（如Widget、形状、文本等）转化为可以显示在屏幕上的像素数据**
2. 显示：把渲染好的图像显示在屏幕上
