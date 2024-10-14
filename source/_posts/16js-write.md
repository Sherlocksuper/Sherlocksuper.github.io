---
title: JavaScript手写
tags: [
  "JavaScript"
]
categories: [
  "本手"
]
date: 2024-10-14 10:56:16
description:
  JavaScript常用函数方法手写实现，包括map、reduce、call、apply、bind、Object.create、new、instance、单例模式、深拷贝
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

## Map

1.回调函数的参数、返回值
map的参数：当前值、index、原始数组。
map可以通过第三个传递值(原始数组的引用)更改原始数组

```javascript
Array.prototype.MyMap = function (fn, context) {
  let arr = Array.from(this)
  const result = []

  for (let i = 0; i < arr.length; i++) {
    result.push(fn.call(context, arr[i], i, this))
  }

  return result
}

```

## Reduce

和map一样，可以通过原始数组this更改原始数组

```javascript
Array.prototype.MyReduce = function (fn, initValue) {
  const arr = Array.from(this)
  let res = initValue ? initValue : arr[0]
  const startIndex = initValue ? 0 : 1
  for (let i = startIndex; i < arr.length; i++) {
    res = fn.call(null, res, arr[i], i, this)
  }
  return res
}
```

## call/apply

```javascript
Function.prototype.MyCall = function (context = window, ...args) {
  const fn = this
  const key = Symbol("fn")
  context[key] = fn

  const res = context[fn](...args)
  delete context[key]
  return res
}
```

## bind

```javascript
Function.prototype.myBind = function (context, ...args) {
// 保存当前函数
  const fn = this;

// 返回一个新的函数
  return function (...newArgs) {
// 调用原函数，并把 this 指向 context，合并参数
    return fn.apply(context, [...args, ...newArgs]);
  };
};
```

## Object.create

创建一个原型为proto的对象

```javascript
function create(proto) {
  function F() {
  }

  F.prototype = proto
  F.prototype.constructor = F
  return new F()
}

```

## New关键字

```javascript
const MyNew = (constructor, ...args) => {
  const instance = Object.create(constructor.prototype)
  const res = constructor.apply(instance, args)
  return typeof res === 'object' ? res : instance
}

```

## instance关键字

按照原型链向上查找，如果instance的原型是constructor的prototype，那么就是

```javascript
const MyInstance = (instance, constructor) => {
  let proto = Object.getPrototypeOf(instance)
  while (true) {
    if (proto === null) return false
    if (proto === constructor.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```

## 单例模式

使用proxy进行代理proxy

```javascript
const proxy = (func) => {
  let instance
  let handler = {
    constructor(target, argumentList, newTarget) {
      if (!instance) {
        // Reflect相当于一个规范化的Object对象，用于操作对象
        instance = Reflect.construct(target, argumentList, newTarget)
      }
      return instance
    }
  }
  return new Proxy(func, handler)
}

```

## 深拷贝

考虑循环引用以及Array、正则、Date等情况

```javascript
function deepClone(obj, hash = new WeakMap()) {
// 1. 基本类型：直接返回（null、undefined、布尔值、数字、字符串、Symbol）
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

// 2. 检查循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

// 3. 处理特殊对象类型
  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  if (obj instanceof Function) {
// 函数拷贝：这里简单处理为返回同一函数，保持函数的原始引用
    return obj;
  }

  if (obj instanceof Map) {
    const mapClone = new Map();
    hash.set(obj, mapClone);
    obj.forEach((value, key) => {
      mapClone.set(deepClone(key, hash), deepClone(value, hash));
    });
    return mapClone;
  }

  if (obj instanceof Set) {
    const setClone = new Set();
    hash.set(obj, setClone);
    obj.forEach(value => {
      setClone.add(deepClone(value, hash));
    });
    return setClone;
  }

// 4. 创建拷贝对象并保存到哈希表中（处理循环引用）
  const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clone);

// 5. 拷贝 Symbol 属性
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  symbolKeys.forEach(symKey => {
    clone[symKey] = deepClone(obj[symKey], hash);
  });

// 6. 拷贝普通属性
  const keys = Object.keys(obj);
  keys.forEach(key => {
    clone[key] = deepClone(obj[key], hash);
  });

  return clone;
}
```

