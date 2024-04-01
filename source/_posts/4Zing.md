---
layout: posts
title: Zing 一款前后端独立gpt软件
subtitle: 一些总结
date: 2024-3-23 21:23:29
updated:
tags:
  - flutter
  - gpt
  - ai
  - develop
  - go
---

事实上，我并不是一个很聪明的人。

就如同我第二篇文章写的，每写一个字，我都要思量好久。我不知那时那刻落笔的时候是处于一种什么养的自大的心理，
我把它归咎于完美主义，而此时此刻看来这种自我归因又略显简陋了。
我常常会想，会不会有一种完美的笔法，能够穷尽此时此刻我所有的想法于一张纸上。于是我便踌躇住，想要捕捉住它。
然后，我就会在这种踌躇中，一次次的推迟，直到最后，我发现我已经不再是那个想要写下一篇文章的人了。

**Zing** 一个GPT软件

## 概述

大致使用的东西：

后端使用的是go语言，前端使用的是flutter。
Redis用于邮箱验证码
docker用于本地开发验证
Linux一些命令

文本聊天使用的模型是GPT-3.5，图片聊天使用的是Stable-diffusion-xl模型

## 界面功能展示 项目截图

logo设计 与 彩色logo
其中，黑白logo用于纯文字聊天，彩色logo用于图片
<img alt="img.png" src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Flogo.png" width="200px" style="display:inline;"/>  <img alt="img.png" src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Flogo1.png" width="200px" style="display:inline;"/>

### 注册登录界面 login and register

<img alt="img.png" src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Flogin.jpg" width="250px" style="display:inline;"/>  <img alt="img.png" src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Fregister.jpg" width="250px" style="display:inline;"/>

### 主界面 main

<img alt="img.png" src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Fmain.jpg" width="250px"/>

### 聊天界面 chat

1.文字聊天演示 text chat
<video src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Ftext_chat.mp4" controls="controls" width="400px" height="300px"></video>
2.图片聊天演示 image chat
<video src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Fimg_chat.mp4" controls="controls" width="400px" height="300px"></video>

### 一些附加

1.提供prompts
<img alt="img.png" src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Fprovide_prompts.jpg" width="250px"/>

2.使用prompts
<img alt="img.png" src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Fchat_prompts.jpg" width="250px"/>

3.版本检查
<img alt="img.png" src="https://sherlock-1314462060.cos.ap-nanjing.myqcloud.com/self-page/4source%2Fversion_update.jpg" width="250px"/>

## 一些总结

总体开发大致持续了十五天左右，从开始学习go到目前以上展示的进度
可以称得上是收获颇丰

- 技术上来讲,这是第一次真正实操了docker、redis、linux、swagger以及一些问题
- 比之前的纸上谈兵不同 ，实践之后才发现，原来对于我来讲像是一道道关隘的技术概念，真正实操起来也不过尔尔
- 产品上来讲，这次我是真正体会到了文档的重要性，有组织的开发流程以及预先规定好的字段和接口规范、功能规范，对于开发是真的大有益处
  心态上来讲，”先完成再优化“，我在开发过程中，一直在想着如何优化，导致进度缓慢

之后会专门写一篇文章来总结一下这次开发的一些经验和教训
不过，从我对写作的热情来看，这篇文章可能会拖很久，我还是在这里提一嘴吧
也不算太鸽

比如，在用移动端连接pc端的后端的时候，即使使用了跨域，也会无法访问到
即使在同一个wifi下，也会有这个问题，因为即使是同一个网络，也可能会分不同网段
这涉及内网穿透

```