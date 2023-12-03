---
layout: posts
title: 一个奇怪的bug解决（误）经历
date: 2023-12-03 10:47:29
tags:
  - android
  - flutter
---

# 一个奇怪的实现经历

## 背景

事情是这样的:2023年十一月的一个晚上，本人正陷于就业和找实习的泥潭中，焦虑不已。
于是，遂观于某位学长的前端就业讲座之中，讲到最后，学长提到了“开源项目”，大惊。
原因是本人上学期一直想投入到某个开源项目里，奈何实力不允许，便搁置。
搁置也罢，罢不了的是，由于太忙，竟然完全忘了“开源项目”这个概念。
于是便突发奇想：
~~自己开源一个项目。~~
做一个日期闹钟app，不仅在对应的时间提醒，还可以在对应的一段时间一直浮现在桌面上

那么这时候就有人要问了：为什么不在应用商店找一个呢？
原因有二：1.外面的app太繁杂 2.我愿意

## 实现:系统通知功能

几经翻找，发现flutter官方并没有提供闹钟的插件，在第三方库中找到了一个名为：flutter location notice的插件。

事实上，几乎推进的很顺利，直到我发现了一个奇怪的属性。

```dart
 const AndroidNotificationDetails androidNotificationDetails =
    AndroidNotificationDetails('your channel id', 'your channel name',
        channelDescription: 'your channel description',
        importance: Importance.max,
        priority: Priority.high,
        ticker: 'ticker');
const NotificationDetails notificationDetails =
    NotificationDetails(android: androidNotificationDetails);
await flutterLocalNotificationsPlugin.show(
    0, 'plain title', 'plain body', notificationDetails,
    payload: 'item x');
```

什么是channel id!？什么是channel name!？

### 第一步:联想

我之前做过一个腾讯云储存、腾讯云聊天的项目，里面有一个id的概念，那么这个channel id的获取方式是不是类似呢？
思考思考思考思考思考，发现应该不是，这个channel id是一个字符串
我的云储存云聊天，是基于腾讯云服务器的，理应要一个id
但是提醒功能，只是基于本地的，理应不需要一个id

### 第二步:stackoverflow

这一步上，很快，我找到了一篇类似的问题

#### [flutter local notification: what's the channel id?](https://stackoverflow.com/questions/53803552/flutter-local-notification-whats-the-channel-id)

喜悦之情溢于言表，然而细细看去
这篇问题的答案对于我来说就是驴唇不对马嘴：

我要问的是： channel id是什么？怎么获取？
而不是：channel id 有什么用
（悲伤）

一秒回到解放前

### 第三步: developer

究其技术原因，不过是利用了android method channel，封装了一些方法
实现功能还是要依靠原生android的api

既然如此，那么我就去看看android developer的文档吧!

#### [创建和管理通知渠道](https://developer.android.com/training/notify-user/channels?hl=zh-cn#CreateChannel)

> 通知渠道是用户可在 Android 系统的通知设置中看到的通知类别。您可以为您的应用创建多个通知渠道。
> 例如，您可以为您的应用的每个通知类型创建一个通知渠道。您可以在每个渠道上设置通知行为，例如您可以在某些渠道上启用或禁用通知提示、在其他渠道上显示通知标记、或在其他渠道上启用或禁用通知徽标。

所以，通知渠道应该指的是：弹窗、声音、震动等等
但是，文档里面并没有提到channel id的获取方式

### 第四步:从头再捋一遍

既然哪里都没有提到channel id的获取方式，那么我就从头再完成一遍插件的实现吧！

第一步，初始化

```Dart
FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();
const AndroidInitializationSettings initializationSettingsAndroid =
      AndroidInitializationSettings('app_icon');
final InitializationSettings initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid);
await flutterLocalNotificationsPlugin.initialize(initializationSettings,
      onDidReceiveNotificationResponse: onDidReceiveNotificationResponse);
```

第二步，创建通知渠道

```Dart
const AndroidNotificationDetails androidPlatformChannelSpecifics =
      AndroidNotificationDetails('your channel id', 'your channel name',
          'your channel description',
          importance: Importance.max,
          priority: Priority.high,
          showWhen: false);
```

在这时,我凭借一种摆烂直觉，将channel id改为了一个随机字符串，然后运行，发现，没有任何问题，通知竟然也正常弹出了

# 什么是channel id!？什么是channel name!？
