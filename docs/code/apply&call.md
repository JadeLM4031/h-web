## 手写 call

:::tip 注意：

能用 `call` 解决的问题也能用 `apply` 解决，它们俩只是传参形式不同，`call` 接收多个参数，`apply` 接收
一个数组。

:::

`call` 是写到 `Function.prototype` 上的方法

我们尝试来实现一下显式改变 `this` 指向的功能，调用对象中的函数，`this` 指向为这个对象，所以我们需要
做的操作是：

> 1. 把函数 `fn` 挂载到要指向的对象 `context` 上。
>
> 2. 执行 `context.fn`，执行完了删除 `context` 上的 `fn` 函数，避免对传入对象的属性造成污染。

不过这里面有一些其他细节需要处理，比如：

> 1. 要处理 `context` 不传值的情况，传一个默认值 `window`。
>
> 2. 处理函数 `fn` 的参数，执行 `fn` 函数时把参数携带进去。
>
> 3. 获取执行函数 `fn` 产生的返回值，最终返回这个返回值。

实现代码如下：

```js
// 要处理 context 不传值的情况，传一个默认值 window。
function myCall(fn, context = window) {
  context.fn = fn;

  // 处理函数 fn 的参数，执行 fn 函数时把参数携带进去。
  const args = [...arguments].slice(2);

  // 获取执行函数 fn 产生的返回值。
  const res = context.fn(...args);
  delete context.fn;

  // 最终返回这个返回值
  return res;
}
```

测试一下：

```js
const obj = {
  count: 10,
};

function fn(x, y, z) {
  console.log(this.count + x + y + z);
}

myCall(fn, obj, 1, 2, 3); // 执行函数 fn，输出 16
```

这样就实现了 `call` 函数该有的功能，原生的 `call` 函数是写到 `Function.prototype` 上的方法，我们也尝
试在函数的原型上实现一个 `myCall` 函数，只需稍加改造即可，代码实现如下：

```js
// 写到函数的原型上，就不需要把要执行的函数当作参数传递进去
Function.prototype.myCall = function (context = window) {
  // 这里的 this 就是这个要执行的函数
  context.fn = this;
  // 参数少了一个，slice(2) 改为 slice(1)
  const args = [...arguments].slice(1);
  const res = context.fn(...args);
  delete context.fn;
  return res;
};
```

测试一下：

```js
const obj = {
  count: 10,
};

function fn(x, y, z) {
  console.log(this.count + x + y + z);
}

fn.myCall(obj, 1, 2, 3); // 执行函数 fn，输出 16
```

## ------处理边缘情况------

## 指向原始值

上文在函数原型上实现的 `myCall` 函数，还有优化的空间，有一些边缘的情况，可能会导致报错，比如把要指向
的对象指向一个原始值，代码如下：

```js
fn.myCall(0); // Uncaught TypeError: context.fn is not a function
```

这时，就需要参考一下原生的 `call` 函数是如何解决的这个问题：

`undefined` 和 `null` 指向了 `window`，原始类型和引用类型都是 `undefined`。

其实是因为，原始类型指向对应的包装类型，引用类型就指向这个引用类型，之所以输出值都是 `undefined`，是
因为这些对象上都没有 `userName` 属性。

改造一下我们的 `myCall` 函数，实现原始类型的兼容，代码如下：

```js
Function.prototype.myCall = function (context = window) {
  if (context === null || context === undefined) {
    context = window; // undefined 和 null 指向 window
  } else {
    context = Object(context); // 原始类型就包装一下
  }
  context.fn = this;
  const args = [...arguments].slice(1);
  const res = context.fn(...args);
  delete context.fn;
  return res;
};
```

## 重名（完整代码）

还有另外一种边缘情况，假设对象上本来就有一个 `fn` 属性，执行下面的调用，对象上的 `fn` 属性会被删除，
代码如下：

```js
const person = {
  userName: "zhangsan",
  fn: 123,
};

function fn() {
  console.log(this.userName);
}

fn.myCall(person);

console.log(person.fn); // 输出 undefined，本来应该输出 123
```

因为对象上本来的 `fn` 属性和 `myCall` 函数内部临时定义的 `fn` 属性重名了。

还记得 `Symbol` 的作用吗，可以用 `Symbol` 来防止对象属性名冲突问题，继续改造 `myCall` 函数，代码实现
如下：

```js
Function.prototype.myCall = function (context = window) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }
  const fn = Symbol("fn"); // 用 symbol 处理一下
  context[fn] = this;
  const args = [...arguments].slice(1);
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
```

至此，一个功能尽可能完善的 `myCall` 函数，终于写完了。

## --------使用场景--------

`call` 的使用场景非常多，所有调用 `call` 的使用场景都是为了显式地改变 `this` 的指向，能用 `call` 解
决的问题也能用 `apply` 解决，因为它们俩只是传参形式不同。下面一起来看 `call` 常用的四个使用场景。

## 1.精准判断一个数据类型

精准地判断一个数据的类型，可以用到 `Object.prototype.toString.call(xxx)`。

调用该方法，统一返回格式 `[object Xxx]` 的字符串，用来表示该对象。

```js
// 引用类型
console.log(Object.prototype.toString.call({})); // '[object Object]'
console.log(Object.prototype.toString.call(function () {})); // "[object Function]'
console.log(Object.prototype.toString.call(/123/g)); // '[object RegExp]'
console.log(Object.prototype.toString.call(new Date())); // '[object Date]'
console.log(Object.prototype.toString.call(new Error())); // '[object Error]'
console.log(Object.prototype.toString.call([])); // '[object Array]'
console.log(Object.prototype.toString.call(new Map())); // '[object Map]'
console.log(Object.prototype.toString.call(new Set())); // '[object Set]'
console.log(Object.prototype.toString.call(new WeakMap())); // '[object WeakMap]'
console.log(Object.prototype.toString.call(new WeakSet())); // '[object WeakSet]'

// 原始类型
console.log(Object.prototype.toString.call(1)); // '[object Number]'
console.log(Object.prototype.toString.call("abc")); // '[object String]'
console.log(Object.prototype.toString.call(true)); // '[object Boolean]'
console.log(Object.prototype.toString.call(1n)); // '[object BigInt]'
console.log(Object.prototype.toString.call(null)); // '[object Null]'
console.log(Object.prototype.toString.call(undefined)); // '[object Undefined]'
console.log(Object.prototype.toString.call(Symbol("a"))); // '[object Symbol]'
```

这里需要调用 `call` 就是为了显式地改变 `this` 指向为我们的目标变量。

如果不改变 `this` 指向为我们的目标变量 `xxx`，`this` 将永远指向调用的 `Object.prototype`，也就是原型
对象，对原型对象调用 `toString` 方法，结果永远都是 `[object Object]`，如下代码所示：

```js
Object.prototype.toString([]); // 输出 '[object Object]'  不调用 call，this 指向 Object.prototype，判断类型为 Object。
Object.prototype.toString.call([]); // 输出 '[object Array]'   调用 call，this 指向 []，判断类型为 Array

Object.prototype.toString(1); // 输出 '[object Object]' 不调用 call，this 指向 Object.prototype，判断类型为 Object。
Object.prototype.toString.call(1); // 输出 '[object Number]' 调用 call，this 指向包装对象 Number {1}，判断类型为 Number
```

## 2.伪数组转数组

伪数组转数组，在 es6 之前，可以使用 `Array.prototype.slice.call(xxx)`。

```js
function add() {
  const args = Array.prototype.slice.call(arguments);
  // 也可以这么写 const args = [].slice.call(arguments)
  args.push(1); // 可以使用数组上的方法了
}

add(1, 2, 3);
```

原理同精准判断一个数据类型相同，如果不改变 `this` 指向为目标伪数组，`this` 将永远指向调用的
`Array.prototype`，就不会生效。

```js
// 从 slice 方法原理理解为什么要调用 call
Array.prototype.slice = function (start, end) {
  const res = [];
  start = start || 0;
  end = end || this.length;
  for (let i = start; i < end; i++) {
    res.push(this[i]); // 这里的 this 就是伪数组，所以要调用 call
  }
  return res;
};
```

## 3.ES5 实现继承

在一个子构造函数中，你可以通过调用父构造函数的 `call` 方法来实现继承。

```js
function Person(name) {
  this.name = name;
}

function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}

const p1 = new Person("zhangsan");
const s1 = new Student("zhangsan", 100);
```

上面的代码示例中，构造函数 `Student` 中会拥有构造函数 `Person` 中的 `name` 属性，`grade` 属性是
`Student` 自己的。

这里的代码如果换成 ES6 的，就等价于下面的代码：

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}

const p1 = new Person("zhangsan");
const s1 = new Student("zhangsan", 100);
```

关于继承，同学们掌握 ES6 的实现方式就好，ES5 的做了解即可，因为现在大家基本上都用 ES6 的写法了，如果
想对 ES5 的继承有深入研究，可以去看一下《JavaScript 高级程序设计（第 4 版）》原型和原型链相关的章节
。

## 4.处理回调函数 this 丢失问题

执行下面的代码，回调函数会导致 `this` 丢失。

```js
const obj = {
  userName: "zhangsan",
  sayName() {
    console.log(this.userName);
  },
};

obj.sayName(); // 输出 'zhangsan'

function fn(callback) {
  if (typeof callback === "function") {
    callback();
  }
}

fn(obj.sayName); // 输出 undefined
```

导致这样现象的原因是回调函数执行的时候 `this` 指向已经是 `window` 了，所以输出 `undefined`。

可以使用 `call` 改变 `this` 指向，代码如下：

```js
const obj = {
  userName: "zhangsan",
  sayName() {
    console.log(this.userName);
  },
};

obj.sayName(); // 输出 'zhangsan'

function fn(callback, context) {
  // 定义一个 context 参数，可以把上下文传进去
  if (typeof callback === "function") {
    callback.call(context); // 显式改变 this 值，指向传入的 context
  }
}

fn(obj.sayName, obj); // 输出 'zhangsan'
```
