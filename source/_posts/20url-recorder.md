---
title: 浏览器提效插件：URL参数记录与管理
tags: []
categories: []
date: 2025-05-13 21:07:10
description:
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

# URL参数管理工具：提升浏览器操作效率

本文将介绍一款自行开发的 Chrome 浏览器扩展——“URL Params Recorder”（URL参数记录器），旨在解决日常工作中因频繁手动修改和记忆 URL 参数而导致的效率问题。

## 问题背景

在以下场景中，URL 参数的管理常常带来不便：

*   **开发与调试**：测试不同功能时，需要在同一页面的 URL 中反复切换参数组合，如 `?debug=true`、`?user_id=123` 或 `?feature_flag=on`。手动修改不仅耗时，也容易出错。
*   **特定功能访问**：部分网站的特定功能或视图依赖 URL 参数进行访问。长期未使用后，这些参数组合难以记忆，需要查阅文档或咨询同事。
*   **演示与分享**：分享带有特定参数的页面链接时，接收方可能无意中修改或丢失参数，导致演示内容不准确或无法快速恢复至特定状态。
*   **工作效率优化案例**：例如，在处理公司内部系统（如 Bits 流水线）时，查找特定任务（如“火车”）通常需要手动搜索关键词（如 `Creation_Fontend`）。通过 URL 参数直接定位可以显著提高效率。若有工具能保存这些含参 URL，便可实现一键直达。
*   **开源项目筛选优化**：在参与 OSPP 开源夏令营等活动中，筛选符合技术栈（如 `html`, `js`, `ts`）的项目时，官网筛选器在页面刷新或重新访问后可能丢失筛选条件。通过记录含筛选参数的 URL，可以便捷地恢复项目列表。

这些重复性的操作降低了工作效率，尤其是在开发和信息检索过程中。因此，开发一款能够自动记录和应用常用 URL 参数组合的工具显得尤为必要。

## “URL 参数记录器”的实现

基于上述需求，开发了这款 Chrome 扩展。其核心设计思路如下：

1.  **参数保存**：用户访问带参数的 URL（例如 `https://example.com/path?param1=value1&param2=value2`）时，可以一键保存基础路径 (`example.com/path`) 及对应的参数 (`?param1=value1&param2=value2`)。
2.  **自动应用**：当用户再次访问已保存的基础路径时（无论是否携带参数），扩展会自动应用之前保存的参数并刷新页面。
3.  **参数管理**：提供对已保存参数的管理功能，包括禁用（暂时停用自动应用）和删除。
4.  **快速访问**：允许用户从扩展界面直接点击已保存的配置，在新标签页中打开对应的带参页面。

![插件弹窗截图](image.png)

## 主要功能

该扩展提供以下主要功能：

*   **参数保存**：在目标页面点击扩展图标，选择“Save Parameters”即可保存当前页面的域名、路径及查询参数。
*   **自动应用参数**：当访问已保存且启用的主路径时，扩展会自动附加已存参数并刷新页面，实现无缝操作。
*   **配置列表管理**：
    *   **启用/禁用 (Enable/Disable)**：临时停用或启用某个参数配置的自动应用功能。
    *   **删除 (Delete)**：永久移除某个参数配置（操作前有确认提示）。
    *   **快速跳转 (Goto)**：点击直接在新标签页打开配置好的带参页面。
*   **搜索功能**：在扩展弹窗顶部提供搜索框，可根据关键词实时过滤已保存的配置列表。搜索框会记录上次的搜索内容，并在下次打开时自动填充和聚焦。

## 安装与使用

目前该扩展需要手动安装：

1.  下载项目代码 (例如通过 `git clone`)。
2.  打开 Chrome 浏览器，在地址栏输入 `chrome://extensions`。
3.  启用页面右上角的“开发者模式”。
4.  点击“加载已解压的扩展程序”，选择下载的项目文件夹。

安装完成后，扩展图标将出现在浏览器工具栏。

使用方法：

*   **保存参数**：打开目标网页，点击扩展图标，然后点击“Save Parameters”。
*   **管理或跳转**：点击扩展图标，在弹出的列表中进行相应操作。
*   **自动应用**：访问已保存且启用的路径时，参数将自动应用。

## 技术栈

该工具主要采用以下技术：

*   **JavaScript (ES6+)**：作为主要的编程语言，负责实现核心逻辑。
*   **Chrome Extension APIs**：利用 `chrome.storage.local` 进行数据存储，`chrome.tabs` 获取页面信息及操作标签页，`chrome.action` 控制扩展图标和弹窗。
*   **HTML & CSS**：用于构建扩展的弹窗界面。
*   **Manifest V3**：遵循 Chrome 最新的扩展程序规范。

## 总结

“URL 参数记录器”是一个为解决日常工作中 URL 参数管理痛点而开发的工具。虽然目前功能相对基础，但核心的参数保存和自动应用功能已能有效运行。如果您也面临类似的 URL 参数管理问题，可以尝试使用此工具。

该项目已开源（MIT 许可），源代码位于 [这里](https://github.com/your-username/url-params-recorder) (请替换为实际的 GitHub 仓库链接)。欢迎提出问题、贡献代码或分享改进建议。

希望此工具能为您提升工作效率。