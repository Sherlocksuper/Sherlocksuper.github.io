---
title: TypeScript精华汇总
date: ':year-:month-:day :hour:00:00'
updated:
description:
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

