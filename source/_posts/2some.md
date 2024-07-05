---
layout: posts
title: 鸟宿池边树
description: 一些关于flutter以及android的问题
date: 2024-1-13 10:47:29
tags:
   - android
   - flutter
---
总的来说，我不是一个爱写文章的人。记起来从写人生第一篇作文开始，我的写作之路就没有遇到过坦途。曾经试着反思原因，大抵是因为一些完美主义倾向。譬如写了上一句，要对下一句的方向内容乃至把字句被字句都要犹豫很久。不过这也是可贵的，古代诗人曾经有过诗句。鸟宿池边树，僧敲月下门。为人性僻耽佳句，语不惊人死不休。想来那些欧阳修、柳宗元之类的大家都曾如此。

就譬如写上一段以及这一段，大抵改了二十次有余。



最近还是在做我名为 ”电梯维保“ 的项目，不过近几日工作少了些枯燥。添加了些百度api定位之类的，由此引出来了种种。

以下是这几日我遇到的一些问题，权当是总结，也是为了以后找起来方便。

##  1. sourcetree 配置 github  SSH

原因：在像往常一样用ssh拉取git仓库的时候报了 port：22   timeout错误，故此总结了两篇比较简洁的技术博客



配置ssh ：https://juejin.cn/post/7224017330724175927

修改config（如果没有config则新建）：https://blog.csdn.net/the__future/article/details/130038818



## 2.百度api

### 	1.百度api  location定位功能   封装代码

以下是代码：

```dart
class GetLocation {
  static int count = 0;
  static bool starLocate = false;
  static double latitude = 0;
  static double longitude = 0;

  GetLocation();

  static LocationFlutterPlugin myLocPlugin = LocationFlutterPlugin();
  static BaiduLocation baiduLocation = BaiduLocation();

  static Future<bool> locationInit() async {
    log("定位初始化");

    /// 动态申请定位权限
    if (await requestPermission()) {
      myLocPlugin.setAgreePrivacy(true);
      myLocPlugin.getApiKeyCallback(callback: (String result) {
        String str = result;
        log('鉴权结果：' + str);
      });

      myLocPlugin.seriesLocationCallback(
          callback: (BaiduLocation result) async {
        if (count >= 10) {
          await myLocPlugin.stopLocation();
        } else {
          if (result.latitude != null && result.longitude != null) {
            await myLocPlugin.stopLocation();
            longitude = result.longitude!;
            latitude = result.latitude!;
          }else{
            log("错误码:${result.errorCode}  ${result.errorInfo} ${result.getMap().toString()}");
          }
        }
      });
      Map androidMap = initAndroidOptions().getMap();
      Map iosMap = initIOSOptions().getMap();
      var _suc = await myLocPlugin.prepareLoc(androidMap, iosMap);
      return true;
    } else {
      return false;
    }
  }

  static BaiduLocationAndroidOption initAndroidOptions() {
    BaiduLocationAndroidOption options = BaiduLocationAndroidOption(
        locationMode: BMFLocationMode.hightAccuracy,
        isNeedAddress: false,
        isNeedAltitude: false,
        isNeedLocationPoiList: false,
        isNeedNewVersionRgc: true,
        isNeedLocationDescribe: true,
        openGps: true,
        locationPurpose: BMFLocationPurpose.sport,
        coordType: BMFLocationCoordType.bd09ll,
        scanspan: 0);
    return options;
  }

  static BaiduLocationIOSOption initIOSOptions() {
    BaiduLocationIOSOption options = BaiduLocationIOSOption(
      coordType: BMFLocationCoordType.bd09ll,
      locationTimeout: 10,
      reGeocodeTimeout: 10,
      activityType: BMFActivityType.automotiveNavigation,
      desiredAccuracy: BMFDesiredAccuracy.best,
      isNeedNewVersionRgc: true,
      pausesLocationUpdatesAutomatically: false,
      allowsBackgroundLocationUpdates: true,
      distanceFilter: 10,
    );
    return options;
  }

  static Future<Map> getLocationSingle() async {
    await myLocPlugin.stopLocation();
    longitude = 0;
    latitude = 0;
    starLocate = false;
    count = 0;
    Map result = {"success": false};
    log("进入");
    while (count < 10) {
      if (!starLocate) {
        starLocate = true;
        bool test=await myLocPlugin.startLocation();
      }
      await Future.delayed(const Duration(seconds: 1))
          .then((_) {
        count++;
        if (longitude != 0 || latitude != 0) {
          double tlong = longitude;
          double tl = latitude;
          result = {"success": true, "longitude": tlong, "latitude": tl};
          starLocate=false;
        }
      });
      if (!starLocate) {
        break;
      }
    }
    longitude = 0;
    latitude = 0;
    starLocate = false;
    count = 0;
    starLocate = false;
    myLocPlugin.stopLocation();
    return result;
  }

  static Future<bool> requestPermission() async {
    if (!(await Permission.location.isLimited ||
        await Permission.location.isRestricted ||
        await Permission.location.isGranted)) {
      await Permission.location.request();
    }
    if ((await Permission.location.isLimited ||
        await Permission.location.isRestricted ||
        await Permission.location.isGranted)) {
      return true;
    } else {
      Get.defaultDialog(title: "错误",content: const Text("无法获取位置信息，请手动设置权限后重启app"));
      return false;
    }
  }
}
```

这段直接引用了另外一个同学的代码，我自己用 get 插件的GetxController 成功封装过一次，不过现在想想封装逻辑较之不是很清晰。



### 2.由此引申的so文件

在实现了上述的location的封装以及应用之后，想要自己做一个类似于百度地图app，故而尝试调用了百度地图api。

```
BMFMapOptions mapOptions = BMFMapOptions(
        center: BMFCoordinate(39.917215, 116.380341),
        zoomLevel: 12,
        mapPadding: BMFEdgeInsets(left: 30, top: 0, right: 30, bottom: 0));
Container(
      height: screenSize.height,
      width: screenSize.width,
      child: BMFMapWidget(
        onBMFMapCreated: (controller) {
          onBMFMapCreated(controller);
        },
        mapOptions: mapOptions,
      ),
    );
```

成功按照文档配置好环境以后，出现了地图黑屏的问题（此时并没有退出）。然而在网上一些社区csdn 掘金 stackoverflow，并没有找到解决方案。观察控制台的报错，发现是 缺少了 libgnustl_shared.zip文件。 找了好久找到了下载地址：https://ava3.androidfilehost.com/dl/JjPZ-RTGo8BAooDv19LIJQ/1705286685/24588232905720518/libgnustl_shared.zip?  然而按照网络上的方法配置到项目里后，没有用，故放弃。

以下是so文件的简述以及作用：

```
".so" 文件是一种共享库（Shared Object Library）文件的后缀名。这种文件格式通常在类Unix操作系统（如Linux）中使用。共享库包含一组预编译的可执行代码和数据，可以被多个程序共享，以提供共享的功能和资源。

这些文件通常包含编译后的二进制代码，可以被动态链接到程序中，而不是静态地嵌入在每个程序中。这样做有助于减小程序文件的大小，同时允许多个程序共享相同的代码库，提高系统的效率。

在Linux系统中，共享库文件通常存储在 "/lib" 或 "/usr/lib" 目录下，而应用程序通过动态链接器在运行时加载这些库。这种动态链接的方式有助于减少内存占用，同时简化程序的维护和更新。
```


## 3.网易云api

对接百度api失败之后有点烦，于是...

涉及到的知识点：docker  、serveless 、nodejs跨域

感谢开源项目：

​		1.github地址：git@github.com:Binaryify/NeteaseCloudMusicApi.git

​		2.官方网站 :https://docs.neteasecloudmusicapi.binaryify.com/

算是一个总结，也算是一个分享：

```
 1.克隆仓库并运行项目
 git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
 cd NeteaseCloudMusicApi
 npm install
 
 node app.js
 //之后可以在默认3000端口访问到

 set PORT=4000 && node app.js
```



### 1.docker 部署

docker 是在我大一下学期接触到的，当时一并学了vim，堪称利器。然而docker对当时的我相当于降维打击，很多概念都无法理解。现在则一学就会，验证了认识的螺旋上升性。

```
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi && cd NeteaseCloudMusicApi

$ sudo docker build . -t netease-music-api

$ sudo docker run -d -p 3000:3000 netease-music-api
```

可视化版本的，在docker应用里的”dev enviroments“里添加任务夹即可

不过部署之后在客户端请求会遇到跨域问题，这点我们之后再说

### 2. 跨域问题

因为本人是打算做一个flutter的android项目的，所以会遇到跨域问题

以下是我在掘金上搜索到的node js解决代码， 不过我在本地运行之后并没有解决跨域，权且当一个记录，量变引起质变，或许早晚会用到

```
const http = require('http');

// 第一步：接受客户端请求
const server = http.createServer((request, response) => {
	
    // 代理服务器，直接和浏览器直接交互，也需要设置：CORS 的首部字段
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',  // 设置 optins 方法允许所有服务器访问 
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
    });
	
    // 第二步：将请求转发给服务器
    const proxyRequest = http.request({
        host: '127.0.0.1',
        port: 4000,
        url: '/',
        method: request.method,
        headers: request.headers
    }, (serverResponse) => {
        
        // 第三步：收到服务器的响应
        var body = '';

        serverResponse.on('data', (chunk) => {
            body += chunk;
        });

        serverResponse.on('end', () => {
            console.log('The data is ' + body );
            
            // 第四步：将响应结果转发给浏览器
            response.end(body);
        })

    }).end();

});

server.listen(3000, () => {
    console.log('The proxyServer is running at http://localhost:3000');
});
```


### 3.serveless部署

网址： https://console.cloud.tencent.com/sls

以下是步骤：

1. fork 此项目

2. 在腾讯云serverless应用管理页面( https://console.cloud.tencent.com/sls ),点击`新建应用`

3. 顶部`创建方式`选择 `Web 应用`

4. 选择 `Express框架`,点击底部`下一步按钮`

5. 输入`应用名`,上传方式选择`代码仓库`,进行GitHub授权(如已授权可跳过这一步),代码仓库选择刚刚fork的项目

6. 启动文件填入:

   ```
   #!/bin/bash
   export PORT=9000
   /var/lang/node16/bin/node app.js
   ```

7. 点击`完成`,等待部署完成,点击`资源列表`的 `API网关` 里的 `URL`,正常情况会打开文档地址,点击文档`例子`可查看接口调用效果

在serveless部署之后，跨域问题解决了。



