---
layout: posts
title: 简单的防抖及其迭代
subtitle: 一些总
date: 2024-4.20 16.36
updated:
tags:
  - develop
  - js
---

![(可以写关于图片的描述)](/source/_img/bg1.png)

以下情景纯属虚构，如有雷同纯属巧合

## 初相见

这两天小刘被安排到一个项目（被老板pua中），遇到了这样一个问题：在用户登录的时候手抖点了两次，请求了两侧资源设置了两次token，但是真正完成的有效功能只有一次。

```javascript
let login = () => {
    console.log("login")
}
```

### 第一次

本着大国工匠的精神，老板亲自催促小刘优化这个问题

于是小刘把它做成了下面这样

```javascript
    let delay = 500
let timeOut

let login = () => {
    if (timeOut) {
        clearTimeOut(timeOut);
    }
    timeOut = setTimeout(() => {
        console.log("login")
    }, delay)
}
```

不错，很棒，每次点击如果和上一次相差不到0.5秒，那么取消上一次的登录请求，并做一些提示。

但是，过了两天，小刘又遇到了同样的问题，用户的登出方法以及其他的每个按钮好像都需要类似的功能

要知道，小刘是个连骑电车都嫌拿着钥匙麻烦的人

他可不愿意每次都定义好几个delay

```javascript
    let delay = 500
let delay2 = 1000
let delay3 = 1500

let timeOut
let timeOut2
let timeOut3

let login = () => {
    if (timeOut) {
        //做一些提示
        clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
        console.log("login")
    }, delay);
}
```

## 闭包

突然，小刘灵光一闪，既然每份延迟都使用独立的delay和timeout，那我是不是可以用闭包记住上下文的特性，把这种类似的方法单独抽象出来？

```javascript
export function debounce(func, delay) {
    let timeout;

    return function (...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            console.log("debounce")
            func(args);
        }, delay);
    }
}
```

现在，小刘的代码成了这样子

```javascript
  let login = () => {
    console.log("login")
}

let logout = () => {
    console.log("logout")
}

login = debounce(login, 500)
logout = debounce(logout, 500)

return (
    <>
        <button onClick={
            () => {
                login()
            }
        }>Click me
        </button>
        <button onClick={
            () => {
                logout()
            }
        }>
        </button>

    </>
);
```

这样，就不会有那么多delay1.delay2.delay3.delay4......delayn了

小刘兴冲冲把他的代码提交了上去

## 再修改 —— 原型

另一位同事小文兴冲冲地把更新的代码拉了下来，看到了小刘的代码

然后他浑身一颤，想到了项目发展到最后可能出现这样的情况

```javascript
   login = debounce(login, 500)
logout = debounce(logout, 500)
fn = debounce(fn, 500)
fn1 = debounce(fn1, 500)
fn2 = debounce(fn2, 500)
fn3 = debounce(fn3, 500)
```

每个方法执行防抖都要重新赋一个值，每个赋值都需要传入一个可能完全一样的delay

不仅如此，fn1被debounce处理之前的函数也丢失了！

这意味着我们如果想要使用未debounce的函数，就必须要重新定义一个，而且名字还不能一样。

事实上，小文不仅仅是个喝水都懒得张嘴的懒货，而且也是一个无可救药的 ”起名困难户“，

他绝对不能让这种事情发生

所以他想到，

能不能让每个方法都具有一个debounce的方法属性，调用debounce则执行

of course, it can!

```javascript
export function debounce(delay) {
    if (!delay) delay = 500;
    let timeout;
    const func = this;	//这里的this是调用debounce的对象，此处是方法对象

    return function (...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(args);
        }, delay);
    }
}
```

小文首先把debounce工具类函数改成了上面这个样子

然后又添加了这样一句话

```javascript
    Function.prototype.debounce = debounce
```

于是

```javascript
Function.prototype.debounce = debounce

function onClick() {
    console.log("clickme")
}

return (
    <>
        <button onClick={onClick.debounce()}>Click me</button>
    </>
)
```

这样就可以在不影响原始方法的情况下使用它的debounce拉，而且还不需要传delay值!

```javascript
    if (!delay) delay = 500;  //如果delay不存在（null、undefined、0...） 就默认为500
```

**需要注意的是，将 `debounce` 函数添加到 `Function.prototype`
上并不是一个好的实践，因为它会改变所有函数的行为，可能导致其他依赖于 `Function.prototype` 的代码出现问题。**
此处仅仅是一个示范，如果没有严谨的文档和规约不建议在项目中使用

## 特殊的环境

不久，小文就被优化了，他的代码流到了一位更年轻，技术更好的小刀身上，

小刀是一位资深的java工程师，非常喜欢用类、对象表示一切

不久，他就发现了这样一个问题：

```javascript
    // eslint-disable-next-line no-extend-native
Function.prototype.debounce = debounce

let user = {
    name: "John",
    sayHi() {
        console.log("Hi, " + this.name);
    },
};

return (
    <>
        <button onClick={() => {
            user.sayHi.debounce(1000)()
        }}>Click me
        </button>
    </>
)    
```

当使用user里的sayHi调用debounce时，会报错！

```
Uncaught TypeError: Cannot convert undefined or null to object
```

小文刀当即力断，立刻反应出来了问题在哪，然后他把debounce改建成了如下这样

```javascript
export function debounce(delay) {
    console.log("debounce");
    if (!delay) delay = 500;
    let timeout;
    const func = this;

    return function (...args) {
        const env = this;  //////新增 生命env为this
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(env, args);  ////新增 绑定func函数的词法环境（上下文）为env
        }, delay);
    }
}
```

不过可惜，他对javascript this机制的了解还是不是很深

深谙javascript八股之道的朋友可能已经发现了，这段代码依旧会报错！

以下是原因

1. 在调用user.sayHi时才会计算this的值
2. 调用过程为： (user.sayHi).debounce()()
   ,在user.sayHi时，this的值并没有成为”user“，而且sayHi也不是一个词法环境，所以在调用debounce，形成闭包并返回函数后，给env赋值的this时undefined

所以 ....

当然，前面说过，小刀技术水平还不错，于是他很自然地想到了，把需要成为this的环境传进去，当然，也需要兼容不需要this的函数

```javascript
export function debounce(delay, env) {
   if (!delay) delay = 500;
   let timeout;
   const func = this;

   return function (...args) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
         if (env) {
            func.apply(env, args);
         } else {
            func(...args);
         }
      }, delay);
   }
}
```

然而，沉溺在修改代码的忙碌中，小刀并没有意识到可以这么做....

```javascript
  <button onClick={user.sayHi.bind(user).debounce(500)}>
   Click me
  </button>
```

bind会返回一个绑定了user的函数

apply则是返回绑定了user的函数执行的结构

## 结尾

说实话，在写这篇文章之前，我只准确地判断了了原型及之前的结果，对于user.sayHi.debouce的运行结果，我理所当然认为也是可以那么运行的。

除去对this的分析之外，还有一点react的小小的收获

```javascript
 let user = {
    name: "John",
    sayHi() {
        console.log("Hi, " + this.name);
    },
};

return (
    <>
        <button onClick={user.sayHi}>Click me</button>
    </>
)
```

在这段代码中调用onClick，是会报错的，因为此处的user.sayHi是一个”函数名“，React会把user.sayHi赋值给onClick，然后再执行onClick()

但是，仔细一想，其实这种逻辑我早就应该知道，如下

```javascript
    let user = {
    name: "John",
    sayHi() {
        console.log("Hi, " + this.name);
    },
};

let animal = {
    name: "Dog",
}

let sayHi = user.sayHi

sayHi()  ///1. 报错，因为this丢失，为undefined
sayHi.apply(user)  //2. Hi, John,成功，使用apply绑定this
user.sayHi.apply(animal)  //3. Hi, Dog,成功，使用apply绑定this	
```

onClick的赋值正是第一种，

解决方法，外部包裹一个箭头函数或者function匿名函数即可，但是要注意的是这种方法对于要调用debounce的onClick却行不通，

```
  <button onClick={()=>{
  	user.sayHi.debounce()()
  }}>Click me</button>
```

因为赋值给onClick的是箭头函数，而不是debounce，所以，每次调用onClick的时候都会重新创建一个debounce

顺便说一句，本来是想用ts写这篇文章的，但是在this赋值的时候会报一堆错，于是改用js
想起来前些日子看到了一篇文章 ”get out typescript“ 好像题目如下，抨击了ts丢失了js最显著的优点：”灵活性“
现在看来，确实如此