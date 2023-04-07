# 实现 async 函数

## 本节介绍

本节是“实现 `async` 函数”这道题的讲解，按理来说，我们之前的章节不管是广度还是深
度，对于 JavaScript 异步的学习已经足够了，但是为了防止某些面试场景中面试官对
`async/await` 的原理进行深挖，我们就通过这道题来浅尝辄止地介绍一下 `async/await`
的底层原理，大家了解即可，不必深挖。

#### 知识点

- async/await
- Generator

## 题解

在讲解之前，先给出本题的答案，代码如下：

```js
function myAsync(genFn) {
  return new Promise(function (resolve, reject) {
    const gen = genFn();
    function step(nextFn) {
      let next;
      try {
        next = nextFn();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v);
          });
        },
        function (e) {
          step(function () {
            return gen.throw(e);
          });
        }
      );
    }
    step(function () {
      return gen.next();
    });
  });
}
```

## 题解分析

之前我们讲过，`async/await` 是 `Promise` 的语法糖，但其实并不完全准确，准确地来
说，`async` 函数其实是 `Generator` 函数的语法糖，那么我们先从 `Generator` 函数讲
起。

### Generator 函数

[Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)
函数是 ES6 提供的一种异步编程解决方案，它是可以用来控
制[迭代器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#迭代器)的
函数，并且语法与传统的函数完全不同，我们来看下面这个示例：

```js
function printNum() {
  console.log(1);
  console.log(2);
  console.log(3);
}

printNum(); // 程序最终依次输出 1，2，3
```

这是一个正常的函数，如果我们把这个函数改造成 `Generator` 函数，代码如下：

```js
function* printNum() {
  yield console.log(1);
  yield console.log(2);
  yield console.log(3);
}

printNum(); // 这样执行不会有任何反应
```

此时执行 `printNum`，不会有任何反应，加上了 `yield` 关键字后，程序中的打印逻辑都
被中断了。

我们需要调用函数返回值的 `next` 方法，才会生效，代码如下：

```js
function* printNum() {
  yield console.log(1);
  yield console.log(2);
  yield console.log(3);
}

fn = printNum();
fn.next(); // 打印 1
fn.next(); // 打印 2
fn.next(); // 打印 3
```

这样，程序的执行就会变得**可控**，它们可以暂停，然后在需要的时候恢复，小结一下：

- `Generator` 函数比普通函数多一个 `*`。
- 函数内部用 `yield` 来控制暂停代码的执行。
- 函数的返回值通过调用 `next` 来恢复代码的执行。

那么问题来了，`Generator` 函数是如何让函数暂停和恢复的呢？其实这涉及
到[协程](https://baike.baidu.com/item/协程/8652240)的概念。

### 协程

传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做
"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

协程有点像函数，又有点像线程。它的运行流程大致如下：

第一步，协程 A 开始执行。

第二步，协程 A 执行到一半，进入暂停，执行权转移到协程 B。

第三步，（一段时间后）协程 B 交还执行权。

第四步，协程 A 恢复执行。

上面流程的协程 A，就是异步任务，因为它分成两段（或多段）执行。

举例来说，读取文件的协程写法如下。

我们以实际的代码来举例：

```js
function* A() {
  console.log("A");
  yield B(); // 暂停 A，执行 B
  console.log("end");
}
function B() {
  console.log("B");
  return 1; // B 执行完了，返回，继续执行 A
}
let gen = A();
gen.next();
gen.next();

// A
// B
// end
```

上面代码的函数 `A` 是一个协程，它的奥妙就在其中的 `yield` 命令。它表示执行到此处
，执行权将交给其他协程。也就是说，`yield` 命令是异步两个阶段的分界线。

协程遇到 `yield` 命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最
大优点，就是代码的写法非常像同步操作，如果去除 `yield` 命令，简直一模一样。

协程并不受操作系统的控制，完全由用户自定义切换，因此并没有进程/线程上下文切换的
开销，这是高性能的重要原因。著名前端框架 React 中，就有对协程的大量应用，React
Fiber 将虚拟 DOM 由树结构转为链表结构，如果 diff 计算超过了 16.6ms（60 fps 显示
器的一帧），就可以随时中断，减少程序的卡顿。

### async 函数的实现原理

我们知道了 `Generator` 函数的用法，现在用它来处理异步，代码如下：

```js
const fs = require("fs");

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const genFn = function* () {
  const a = yield readFile("a.json");
  const b = yield readFile("b.json");
  console.log(JSON.parse(a));
  console.log(JSON.parse(b));
};
```

上面代码的函数 `genFn` 可以写成 `async` 函数，就是下面这样。

```js
const asyncReadFile = async function () {
  const a = await readFile("a.json");
  const b = await readFile("b.json");
  console.log(JSON.parse(a));
  console.log(JSON.parse(b));
};
```

一比较就会发现，`async` 函数就是将 `Generator` 函数的星号（\*）替换成 `async`，
将 `yield` 替换成 `await`，仅此而已。

但是 `Generator` 函数的执行，每一步都要执行 `next` 方法，非常不方便，能不能让它
一次性执行完毕呢？

上文中的 `genFn` 方法，我们让他执行完，代码如下：

```js
let g = genFn();
// next返回值中有一个 value 值，这个 value 是 yield 后面的结果
g.next().value((err, data1) => {
  g.next(data1).value((err, data2) => {
    g.next(data2);
  });
});
```

注意这里的 `value` 值，是调用 `next` 方法生成的，比如：

```js
function* printNum() {
  yield 1;
  yield 2;
  return 3;
}

fn = printNum();
console.log(fn.next()); // {value: 1, done: false}
console.log(fn.next()); // {value: 2, done: false}
console.log(fn.next()); // {value: 3, done: true}
```

当调用 `next` 方法时，返回一个对象，它的 `value` 属性就是当前 `yield` 表达式的值
，`done` 属性的值表示遍历是否结束。

上文的 `genFn` 方法中，我们只执行了两个异步操作，万一异步操作多起来，又会陷入回
调地狱了，我们把这里的逻辑封装一下：

```js
function step(nextFn) {
  const next = (err, data) => {
    let res = nextFn.next(data);
    // 如果 res.done 为 true，才表示迭代结束，返回
    if (res.done) return;
    // 否则执行递归的逻辑
    res.value(next);
  };
  next();
}
step(genFn());
```

这里有一个递归的过程，我们把这一步封装称为自动执行 `Generator` 函数。

而 `async` 函数的实现原理，就是将 `Generator` 函数和自动执行器，包装在一个函数里
。

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return myAsync(function* () {
    // ...
  });
}
```

我们介绍了这么多，终于回到了本题的 `myAsync` 函数，本题我们要实现 `async` 的功能
，就需要返回一个`Promise` 实例，把 `Generator` 函数中状态为 `done` 的值
`resolve` 出来，把错误的信息 `reject` 出来，最终代码实现如下：

```js
function myAsync(genFn) {
  // 返回一个 Promise 实例
  return new Promise(function (resolve, reject) {
    const gen = genFn();
    // 自动执行器的封装，里面是递归的逻辑
    function step(nextFn) {
      let next;
      //
      try {
        next = nextFn();
      } catch (e) {
        return reject(e);
      }
      // 如果已经到 done 状态了，就 resolve 最终的值
      if (next.done) {
        return resolve(next.value);
      }
      // 不是 done 状态，说明程序还没执行完，就继续递归
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v);
          });
        },
        function (e) {
          // 错误的逻辑 reject 出来
          step(function () {
            return gen.throw(e);
          });
        }
      );
    }
    step(function () {
      return gen.next();
    });
  });
}
```

这样我们就实现了 `myAsync` 函数，但实现这个函数并不是重点，重点是学习
`Generator` 函数的用法以及理解 `async` 是如何通过 `Generator` 函数来实现的。

## 本节总结

本节大量参考了[阮一峰老师](https://www.ruanyifeng.com/)的《ES6 标准入门》的
`Generator` 函数章节，但他在书中讲的概念实在太细太多，我只介绍了其中的一些重点内
容，如果对这一块儿还想有更深的了解，可以直接去读原文。

- [纸质书](https://book.douban.com/subject/27127030/)
- [电子书](https://es6.ruanyifeng.com/)

本节实验主要给大家介绍了 `async/await` 和 `Generator`，希望同学们好好消化，如果
有觉得学得比较迷糊的点，就再多去看几遍。
