---
title: 记录一次开源经历--Ospp
subtitle: 一个企业级Ai提供者Casibase
date: 2024-6-15 10:47:29
updated:
description:
top_img:
tags:
  - 开源
  - ospp
---

之前一直听说开源项目很加分，恰逢最近无事，遂即参与了一个Ospp开源活动的项目
需要说明的是，中选公布日期在7月1日，这篇文章作于6.15，
所以截至目前为止，我还没有中选，但是我觉得这次经历还是值得记录的

## 项目介绍

项目名叫Casibase，一个企业级Ai提供者:

项目链接: [Github链接](https://github.com/casibase/casibase)
技术栈:React + Antd 前端 Go后端

## 项目经历

### 初相见

四月半左右我看到了OSPP这个开源活动，很感兴趣
而且由于学校安排，小学期有一个实训，只有一个月的实习时间，必然是面试不了，所以我就报名了这个活动

看了大概半个多月的项目列表、每个项目的项目介绍以及难易程度，最终选择了Casibase这个项目
其一是因为，技术栈正好对口，React+Go后端，正好符合我的技术栈
其二是因为，我觉得相较于单纯的javascript和go项目，这个项目的技术栈更复杂，申请的人数或许也会相对较少 ，
阻力可能没那么大。（然而事实证明，并不如我所想
并且热门的项目大多是java、linux、ai大模型等等

所以大概在五月初我向导师发送了我的简历,然后导师联系我写了一些pr

### 主要工作以及收获

截至6.15也就是今天，我一共提交了7个pr,合并了6个pr
![pr](prs.png)
![prdetails](prdetails.png)

大致工作有

1. 实现了多模态，即输入消息，实现图片、文本多种回复
2. 仿照tinyColor这个库实现了主题色的自动生成
3. 实现了输入框复制图片
4. 修复了一些bug

虽然和这个导师的交流确实很有压迫力，不过也确实学到了很多东西
比如github 的 ci/cd流程
比如如何写一个好的干净的pr(这一部分被骂了好几次)
还有一些git命令(--amend)

另：
这也是我第一次看到非函数式react组件，使用的是class
之前一直看到生命周期componentDidMount等等，在函数式组件中完全没有，原来是在这里
也是我第一次看见把前端项目放到后端项目下的文件夹里
算是长知识了(

### OVER

总的来说，这次经历还算不错
不过导师跟我说，还有另外一个比较看好的候选人
再加上六月末有许多考试，这半个月没法再提交pr
所以感觉中选的可能性不大(可恶)