---
title: 权限认证
description: 本文通过引用掘金上一篇较为不明的文章，对token、cookie、session、jwt、oauth2进行了简单的梳理与辨析
date: 2024-07-14 10:56:16
updated:
top_img:
tags:
  - 本手
---
这两天闲逛掘金，看到了一个19年大火的文章，讲的是token、cookie、session、jwt，和我之前认为的有一些不同
去伪留臻，记而存之

附上链接：https://juejin.cn/post/6844904034181070861?searchId=202407022020106665740BE9EADAA2CD66

主要概念：

- session
- cookie
- token
- jwt json web token
- oauth2

***session和token是一种 ”信息组成“ 的策略***

***jwt是一种高级协议，解决了token中的一些问题***

***cookie是一种信息载体，如同localstorage和sessionstorage***

***Oauth2，第三方登录协议***

**不同概念之间可比较性不高，这也是juejin那篇文章误导性很强的地方之一**

## 存储方式：cookie、localstorage、sessionStorage

### cookie

cookie存储的信息大多被用于：

- 会话状态管理
    - 用户登陆状态等
- 个性化设置
    - 自定义设置、主题和其他设置
- 浏览器行为跟踪
    - 分析用户行为

浏览器第一次请求服务端数据，服务端设置cookie

不过cookie存储空间较小，大约4k

### localStorage、sessionStorage

两者的区别是，sessionStorage只在一次会话中有效

## 验证信息策略

### Session

浏览器第一次向服务端请求，服务端生成一个seesionid，并储存到内存或者redis或者数据库中，之后，并且把sessionid返回给客户端，此时，可以选择存到cookie中并且不设置过期时间（关闭session清除），也可以放到前端内存（即声明一个全局变量）中（关闭应用清除）。每次请求服务端数据时，服务端检查cookie是否存在sessionid并且进行验证，如果缓存中有sessionid，那么则通过，没有则重新登录

sessionId生成策略：可以是随机数、也可以是客户端传来的数据

特点：存放在**服务端**，服务端每次收到请求都会查询是否存在sessionid，会给服务端查询造成压力

### Token

客户端进行登录时，服务端生成一个token（字符串，可以有意义也可以无意义）返回给客户端并由客户端保存，之后每次请求，需要由客户端带上这个token，服务端进行验证

以下是几种token中常用的策略（拓展、变式）

- 双token，（多用于实现无感登录）
    - 即有两种token，access token 用于请求数据，refresh token 用于刷新access token
    - access token 有效期较短，refresh token 有效时间较长
    - 客户端登录时，服务端生成两个token，access token随请求返回到客户端，用于每次请求时进行验证；refresh token 放到 http
      only cookie中，以使客户端无法访问，增加安全性，用于access token过期时进行刷新
- JWT 一种 token 的 格式以及包含的信息 的**规范*
    - 由三部分组成，头部、中部、尾部, 用.分割，如：xxxxx.yyyyy.zzzzz
    - 头部：加密方式等,使用base64编码
    - 中部：用户的信息，如：用户id等，使用base64编码
    - 尾部：头部和中部结合（简单拼接）后，使用头部声明的加密方式进行加密
    - 客户端进行储存，请求时，只需带上jwt，然后客户端进行解码验证，验证无误则有效，节省存储sessionid的服务器压力，用解码时间换取空间
### OAuth2

简单的来说，OAuth2也就是第三方认证，比如你想用微信的号登录小红书这个过程，就是OAuth2的过程

