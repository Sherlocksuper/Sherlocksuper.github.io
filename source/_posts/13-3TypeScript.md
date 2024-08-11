---
title: TypeScript All
date: ':year-:month-:day :hour:00:00'
updated:
description: 对于前两部分typescript较为精华的部分的总结
top_img:
tags:
  - 本手
---

# ☆☆接口和类型别名☆☆

interface和type

1. 接口创建了一个新的名字，可以在其他地方使用，类型别名不创建新的名字，而是类型的引用
2. 类型别名不能被或者extends、implements其他类型，interface对于拓展是开放的
3. 多个同名的interface会合并（相同属性声明为不同类型时候会报错），type则会报错
4. type可以表示联合类型和交叉类型，interface则会报错
5. 使用tsc编译之后,type不会存在，因为他只是“引用”,interface也不会存在，因为他只是“规范”
6. 如果使用type something = string，type依旧不会存在

    ```jsx
    type Animal = "fish" | "cow"
    interface Animal = "fish" | "cow" //报错
    ```
   

# ★★反向映射★★

```jsx
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

***★★可能会将编译为★★***

```jsx
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A"
```

# ★★高级技巧★★

声明类时

```jsx
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```

创建了一个构造函数，会在new创建实例的时候调用。

上面的代码被编译之后：

```jsx
let Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```

回顾：**使用new函数会发生什么？**

1. 创建一个空对象，成为newInstance（新的实例）
2. 如果构造函数的prototype是一个对象，那么把newInstance的原型指向prototype，否则newInstance为一个普通对象，原型为Object.prototype
3. 使用给定参数执行构造函数，并把newInstance绑定为this上下文
4. 如果构造函数返回非原始值，则返回值为new的结果，否则返回newInstance

# any 和 unknow的区别

1. unknow是类型安全的any，unknow类型的值只能赋值给unknow和any类型的变量
2. any类型的值可以赋值给任何类型的变量
3. any 类型是TypeScript中最不安全的类型，它允许赋值给任何类型，也可以从任何类型赋值过来。这意味着使用 any 类型时，TypeScript不会进行任何类型检查，这基本上和使用JavaScript的动态类型特性一样。 
4. unknown 类型是TypeScript中安全类型的一种，它是 any 类型的类型安全版本。使用 unknown 类型时，你必须先对变量进行检查或类型守卫，才能访问其属性或调用其方法。

举个例子
```javascript
function processAny(value: any) {
    console.log(value.toUpperCase()); // 假设 value 是一个字符串
    return value * 10; // 这里 TypeScript 不会报错，即使 value 不是数字
}
function processUnknow(value: unknow) {
   console.log(value.toUpperCase()); // 假设 value 是一个字符串
   return value * 10; // 这里 TypeScript 不会报错，即使 value 不是数字
}
processAny(123)
processAny("123")
processUnknow(123)
processUnknow("123")
```

在这个例子里，processAny的两个都不会报错
processUnknown的两个调用都会报错，如果不希望报错
我们需要：
```javascript
function processUnknow(value: unknow) {
  if (typeof value === "string"){
     console.log(value.toUpperCase()); // 假设 value 是一个字符串
  }
  if (typeof value === "number"){
     return value * 10; // 这里 TypeScript 不会报错，即使 value 不是数字
  }
  return "1"
}
```
在调用之前进行类型断言

# typescript 是怎么进行类型检查的，在哪个阶段发挥作用

TypeScript 代码首先通过 TypeScript 编译器（tsc）进行编译。编译过程主要包括以下几个阶段：

1. 解析：将 TypeScript 代码解析成抽象语法树（AST）。 
2. 类型检查：在 AST 上进行类型检查，确保代码符合类型系统的要求。
3. 转换：将 TypeScript 代码转换成等价的 JavaScript 代码。包括: 处理 TypeScript 特有的语法，如类型注解、接口、类等，并将其转换为 JavaScript 语法。
4. 输出：生成编译后的 JavaScript 代码，通常是一个或多个 .js 文件。


