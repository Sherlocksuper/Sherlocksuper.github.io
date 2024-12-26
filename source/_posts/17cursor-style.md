---
title: Cursor一键导入WebStorm样式
tags: [
  "其他"
]
categories: [
  "本手"
]
date: 2024-10-14 10:56:16
description:
  "想体验Cursor的AI但是苦于vscode的快捷键不习惯？想感受vscode的丰富插件生态但是对其配色实在反感？别急..."
cover:
banner:
sticky:
mermaid:
katex:
mathjax:
topic:
author:
references:
comments:
indexing:
breadcrumb:
leftbar:
rightbar:
h1:
type:
---
想体验Cursor的AI但是苦于vscode的快捷键不习惯？想感受vscode的丰富插件生态但是对其配色实在反感？别急...

说实话，本人一直是Webstorm的忠实拥趸

但是没办法Cursor的ai功能实在是太香了

而在webstorm中只有copilot和jetbrain的ai assistance

并且copilot不够智能、ai assistance又和vim插件非常不兼容

所幸cursor的炒鸡生态和完整的快捷键设置方案

话不多说，开始导入（文章末尾看效果）

1. 复制链接： https://gist.github.com/Sherlocksuper/7376c4e8104ee0a87d7476045ece062f

2. 打开cursor，文件-> 首选项 -> 配置文件

3. 然后点击新建配置文件右边的导入配置文件，复制链接即可

看样式

[cursor展示](15cursor-style/cursor-overview.png)

[webstorm展示](15cursor-style/webstorm-overview.png)

还适配了包括但不限于以下的快捷键：

1. ctrl shift f  触发搜索框
2. alt + 左右快捷键切换 终端或者编辑器（使用when表达式）

and soon

不过设置中默认使用了vim编辑器

cursor打起字来还是没有webstorm做的好，并且vim编辑器bug很多
