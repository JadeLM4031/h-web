## 数据类型

### 基本类型

- string（字符串）
- boolean （布尔）
- number（数字）
- undefined（undefined）
- null（null）
- symbol（代表创建后独一无二且不可变的数据类型）

### 引用类型

- Object（对象）
- Array（数组）
- Function（函数）

### 两种数据类型的区别

1. 存放位置不同

   > 基本数据类型变量存放在**栈内存**中，如果在一个函数中声明基本类型的变量，则函数执行完毕，变量自动销毁。
   >
   > 引用类型的变量名保存在**栈内存**中，变量值存储在**堆内存**，引用类型的变量不会自动销毁，当没有引用变量引用它时，系
   > 统的垃圾回收机制会回收它。

   ::: details 堆栈区别

   > 1. 堆空间大，栈运行速度快。
   > 2. 堆内存是无序存储，可以根据引用直接获取。
   > 3. 基础数据类型比较稳定，相对来说占用的内存小。
   > 4. 引用数据类型大小是动态的，而且是无限的。

   :::

2. 赋值不同

   > 基本类型的赋值相当于**深拷贝**，赋值后又开辟一个新的内存空间，两者互不影响。
   >
   > 引用类型赋值相当于**浅拷贝**，对对象进行操作时，操作的只是对象的引用。

---

## 深拷贝 & 浅拷贝

**浅拷贝**: (拷贝一层) 如果对象的属性是基本类型，拷贝的就是基本类型的值,如果属性是引用类型, 拷贝的就是内存地址,两个对象
用的是同一个内存,修改其中一个的值,另一个也跟着改变.

**深拷贝**: (拷贝全部层级)只有内存地址不一样,其他完全一样,修改之后不会影响到原来的对象.

**实现浅拷贝的方法:**

- `Object.assign`（对象、数组）

  > 参数：
  >
  > target--->目标对象
  >
  > source--->源对象
  >
  > 返回值 ：target，即目标对象

  ::: details 查看案例

  ```js
  <!-- 对象 -->
  const obj = {
    name: "lin",
  };
  const newObj = Object.assign({}, obj);
  obj.name = "xxx"; // 改变原来的对象
  console.log(newObj); // { name: 'lin' } 新对象不变
  console.log(obj == newObj); // false 两者指向不同地址


  <!-- 数组 -->
  const arr = [1, 2, 3];
  const newArr = Object.assign([], arr);
  arr[2] = 100; // 改变原来的数组
  console.log(newArr); // [1, 2, 3] // 新数组不变
  console.log(arr == newArr); // false 两者指向不同地址
  ```

  :::

- `扩展运算符`（对象、数组）

  ::: details 查看案例

  ```js
  <!-- 对象 -->
  const obj = {
    name: "lin",
  };
  const newObj = { ...obj };
  obj.name = "xxx"; // 改变原来的对象
  console.log(newObj); // { name: 'lin' } // 新对象不变
  console.log(obj == newObj); // false 两者指向不同地址

  <!-- 数组 -->
  const arr = [1, 2, 3];
  const newArr = [...arr];
  arr[2] = 100; // 改变原来的数组
  console.log(newArr); // [1, 2, 3] // 新数组不变
  console.log(arr == newArr); // false 两者指向不同地址
  ```

  :::

- `slice`（数组）

  > 参数:
  >
  > start:开始位置的索引
  >
  > end:结束位置的索引(但不包含该索引位置的元素)

  ::: details 查看案例

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.slice(0);
  arr[2] = 100; // 改变原来的数组
  console.log(newArr); // [1, 2, 3] // 新数组不变
  console.log(arr == newArr); // false 两者指向不同地址
  ```

  :::

- `concat`（数组）

  ::: details 查看案例

  ```js
  const arr = [1, 2, 3];
  const newArr = [].concat(arr);
  arr[2] = 100; // 改变原来的数组
  console.log(newArr); // [1, 2, 3] // 新数组不变
  console.log(arr == newArr); // false 两者指向不同地址
  ```

  :::

- `Array.from`（数组）

  > 将一个类数组对象（有 length 属性的）或者可遍历对象转换成一个真正的数组

  ::: details 查看案例

  ```js
  const arr = [1, 2, 3];
  const newArr = Array.from(arr);
  arr[2] = 100; // 改变原来的数组
  console.log(newArr); // [1, 2, 3] // 新数组不变
  console.log(arr == newArr); // false 两者指向不同地址
  ```

  :::

---

## 原型及原型链

::: tip 介绍

每个函数都有 `prototype` 属性，每个对象都有 `__proto__` 属性(这个属性称之为原型 )，在我们执行 new 的时候，对象的
`__proto__` 指向这个构造函数的 `prototype`

:::

### 函数.prototype.constructor === 函数

每个函数都有个 prototype 属性，这个属性指向函数的原型对象，同时 prototype 里面有个 constructor 属性回指到该函数。

```js
function Demo() {}
Demo.prototype.constructor === Demo; // true
```

::: details 查看 Demo.prototype 结构 ![Demo.prototype](/javascript/demo-prototype.png)

:::

### 实例对象.`__proto__` === 函数.prototype

使用 new 创建一个实例对象 d（使用 new 操作符后 Demo 就变成了构造函数）。d 是对象，自然有 `__proto__` (原型),此时原型指向
构造函数 Demo 的 prototype。

```js
function Demo() {}
const d = new Demo();
d.__proto__ === Demo.prototype; // true
```

### 原型链执行流程

当我们访问一个对象属性时，程序会先去这个对象里面找，如果没有找到就会去这个对象的原型上找。

::: details 查看案例

```js
function Demo() {
  this.name = "蓝桥";
}
Demo.prototype.say = function () {
  console.log("我是", this.name);
};

const d = new Demo();

// 虽然 Demo 上没有 say 方法，但是因为Demo的prototype上有此方法，所以下面的调用可以正常打印。

d.say(); // 我是蓝桥
```

![原型链基本流程](/javascript/proto-process.png)

:::

---

## var、let、const 的区别

|                                      | var        | let        | cosnt            |
| ------------------------------------ | ---------- | ---------- | ---------------- |
| 变量提升                             | 是         | 否         | 否               |
| 作用域                               | 函数作用域 | 块级作用域 | 块级作用域       |
| 作为全局变量时，是否成为 window 属性 | 是         | 否         | 否               |
| 是否可以重复声明                     | 是         | 否         | 否               |
| 值是否可改变                         | 是         | 是         | 简单类型不可修改 |

---

## 暂时性死区

::: tip 介绍

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，
才可以获取和使用该变量。

:::

let 或 const 声明的变量拥有暂时性死区（TDZ）：当进入它的作用域，它不能被访问（获取或设置）直到执行到达声明。

首先看看不具有暂时性死区的 var：

> 1.  当进入 var 变量的作用域（包围它的函数），立即为它创建（绑定）存储空间。变量会立即被初始化并赋值为 undefined。
> 2.  当执行到变量声明的时候，如果变量定义了值则会被赋值。

通过 let 声明的变量拥有暂时性死区，生命周期如下：

> 1.  当进入 let 变量的作用域（包围它的语法块），立即为它创建（绑定）存储空间。此时变量仍是未初始化的。
> 2.  获取或设置未初始化的变量将抛出异常 ReferenceError。
> 3.  当执行到变量声明的时候，如果变量定义了值则会被赋值。如果没有定义值，则赋值为 undefined。

const 工作方式与 let 类似，但是定义的时候必须赋值并且不能改变。

::: details 查看案例

> var 声明变量没有暂时性死区

```js
(() => {
  console.log(i); // undefined
  var i = 1;
  console.log(i); // 1
})();
```

> let 声明变量有暂时性死区

```js
(() => {
  console.log(i); // Cannot access 'i' before initialization
  let i = 1;
  console.log(i); // 1
})();
```

:::

---

## 作用域 & 闭包

es6 之前 JavaScript 只有函数级作用域，没有块级作用域。

::: details 查看案例

```js
function demo() {
  var a = "蓝桥";
  console.log(a); // 蓝桥
}
console.log(a); //a is not defined

if (true) {
  var b = "bbb";
}
console.log(b); // bbb(如果if条件为false则输出undefined)
```

:::

**经典题型**

请问以下代码打印的结果是？

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

::: details 查看答案

> 执行结果: **输出 10 次 10**
>
> 执行过程：
>
> 1. 代码执行 for 循环，i 依次从 0 加到 9，循环十次。
> 2. 代码等待定时器 1 秒钟时间到，执行定时的里面的内容。
> 3. 执行打印 i 语句，因为定时器函数中没有声明 i 变量，所以代码只能去定时器函数外的作用域(也就是 window)去查找。
> 4. 在外部找到了 i 此时 i 已经变成了 10，所以打印 10 次 10。
>
> **如果在当前作用域中没有发现此变量的声明，程序就会去父作用域查找，直到找到为止。在浏览器中最外层作用域是 window，如果
> 在 window 上也没有找到，就返回 xxx is not defined 查找结束。**

:::

### 闭包

::: tip 介绍

（closure）指有权访问另一个函数作用域中变量的函数——JavaScript 高级程序设计

可以延申变量的作用范围 容易造成内存泄漏（因为一直不销毁变量）

:::

闭包就是可以让外部访问到函数内部的变量

```js
function demo() {
  var a = "aaa";
  return function () {
    return a;
  };
}
const d = demo();
console.log(d()); // aaa
```

通过在 demo 函数中返回一个函数，在返回的函数中再返回这个变量，然后当我们在外部去调用这个返回出来的函数时就可以得到这个变
量的值。也就是说 d 函数 保存了对 a 的引用，这就形成了闭包。

**还是上面经典例题: 运用闭包知识,让函数输出 0-9**

::: details 查看答案

> **方法一:** 用 let 声明变量 i(不能用 const,因为常量不能修改),let 是块级作用域, 块内部的函数也在作用域内,可以访问到 i
> 的值.

```js
for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

> **方法二:** 在 setTimeout 外边套一层自执行函数,把每次循环的 i 结果保存在当前作用域下,当执行定时器的时候,可以去当前作用
> 域找 i 的值.

```js
for (var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  })(i);
}
```

:::

---

## ES6 新特性

- **let 和 const**
- **解构 & 扩展运算符**

  ::: details 查看案例

  ```js
  const people = {
    name: "张三",
    love: "吃饭",
  };
  // 把 name 和 love 解构出来
  const { name, love } = people;
  console.log(name, love); // 张三 吃饭
  // 扩展运算符
  const user = { ...people };
  console.log(user); // {name: '张三', love: '吃饭'}
  ```

  :::

- **函数可以设置默认参数 (函数的 legnth 属性会失效)**

  ::: details 查看案例

  > 通过 length 可以获取函数参数的个数

  ```js
  function demo(name = "张三") {
    console.log("我是" + name);
  }
  console.log(demo.length); // 输出0 实际是有一个参数
  ```

  :::

- **Symbol**

  基本数据类型,表示独一无二的值. Symbol 值通过 `symbol` 函数生成

  ```js
  const fnName = Symbol();
  typeof fnName; // "symbol"
  ```

- **Set 和 Map 数据结构**

  Set 类似数组,值唯一.

  ::: details 查看使用方法

  > **基本使用**

  ```js
  const arr = new Set([1, 2, 3]);

  arr.add(4); // 向arr中添加元素
  arr.delete(1); // 删除数据为1的元素
  arr.size; // 返回arr长度
  arr.has(2); // 判断arr中是否有2这个元素
  arr.clear(); // 清除所有元素
  ```

  > **数组去重**

  ```js
  const arr = [1, 2, 3, 4, 1, 2, 3];
  const arr2 = [...new Set(arr)];

  console.log(arr2); // [1,2,3,4]
  ```

  :::

  Map 类似对象,也通过键值对存储,区别是 Object 中的键只能是字符串,而 Map 中的键可以是任意数据类型.

  ::: details 查看使用方法

  > **基本使用**

  ```js
  const m = new Map();

  m.set("name", "张三"); // 设置元素
  m.get("name"); // 张三
  m.has("name"); // 判断有没有这个元素
  m.size; // 获取map的长度
  ```

  > **键为 object 类型**

  ```js
  const m = new Map();
  const k = {
    name: "张三",
  };
  m.set(k, 18);
  m.get(k); // 18
  ```

  :::

- **Promise**

  没有 Promise 之前使用回调函数实现异步变成,回调函数多的话会产生回调地狱 ,Promise 可以解决回调地狱.

  ::: details 基本使用

  ```js
  const promise = new Promise(function(resolve,reject){
    if(/*异步程序成功*/){
        resolve(res)
    }else{
        reject(error)
    }
  })

  promise.then(function(res){},function(error){})
  ```

  :::

  常用方法:

  1.  `Promise.prototype.then()` Promise 实例添加状态改变时的回调函数.
  2.  `Promise.prototype.catch()` 发生错误时的回调函数.
  3.  `Promise.all()` 可以将多个 Promise 实例包装成一个新的 Promise 实例.

      返回值: 成功和失败的返回值不同,成功返回一个结果数组,失败则返回最先被 reject 的值.

  4.  `Promise.race()` 可以将多个 Promise 实例包装成一个新的 Promise 实例.

      返回值: 哪个结果获得的快,就返回哪个结果,不管结果本身时成功状态还是失败状态 .

---

## 宏任务 & 微任务

### 宏任务

JavaScript 是单线程,但浏览器是多线程的,JavaScript 执行在浏览器中，在 V8 里跑着的一直是一个一个的宏任务.

宏任务代表: 主线程、定时器.

::: details 查看案例

> 浏览器在执行下面代码时会先执行主线程代码（宏任务 1）然后再执行 setTimeout 里面的代码。虽然 setTimeout 的定时时间为 0，
> 但是浏览器在处理的时候会把它当做下一个宏任务进行处理

![宏任务](/javascript/macrotask.png)

:::

### 微任务

当浏览器执行完一个宏任务后,就会检查有没有可执行的微任务,如果有,先把当前微任务执行完, 再去执行下一个宏任务.

微任务代表: ajax、回调函数、和 Promise.

流程如下: ![微任务](/javascript/microtask.png)

**经典例题**

以下代码的执行结果是?

```js
console.log(1);
setTimeout(() => {
  console.log(2);
});

new Promise((res, req) => {
  console.log(3);
  res();
}).then(() => {
  console.log(4);
});

console.log(5);
```

::: details 查看答案

> 代码从上到下执行
>
> ⬇
>
> 打印 1
>
> ⬇
>
> 遇到 setTimeout 是下一个宏任务，目前先不处理
>
> ⬇
>
> 遇到 Promise 打印出 3 then 回调函数是微任务，先不处理
>
> ⬇
>
> 打印 5 且第一个宏任务执行完毕
>
> ⬇
>
> 开始执行微任务队列
>
> ⬇
>
> 打印 4 微任务队列执行完毕
>
> ⬇
>
> 开始执行下一个宏任务
>
> ⬇
>
> 打印 2
>
> ⬇
>
> 程序结束

> **注意**: 只有 Promise then 或者 catch 里面的方法是微任务，Promise 里面的回调是当作主程序的宏任务进行处理的。

:::

---

## map 和 forEach 的区别

**相同点：**

1. 只能遍历数组，且循环遍历数组中的每一项
2. 每次执行匿名函数都支持三个参数，参数分别为 item（当前项），index（索引值），arr（原数组）
3. 匿名函数中的 this 都指向 window

**不同点：**

1. map()会分配内存空间存储新数组并返回，forEach()不会返回数据
2. forEach()允许回调更改原始数组的元素

---

## for...in & for...of

**for...in**

1. 遍历获取索引
2. 会遍历整个原型链
3. 对于数组遍历，会返回数组中所有可枚举的属性(包括原型链上的可枚举属性 )

::: details for-in 案例

> 基本使用

```js
// 在原型链上的Object上自定义一个myFunc方法
Object.prototype.myFunc01 = function () {
    console.log('1');
}

// 在原型链上的Array上自定义一个myFunc方法
Array.prototype.myFunc02 = function (value) {
   console.log('2');
}

let b = [1, 2, 3, 4]
for (let i in b) {
    console.log(i);
}

打印结果：0 1 2 3 myFunc02 myFunc01
```

> 如何只遍历自身属性？ （for-in 中增加 hasOwnProperty 判断）

```js
// 在原型链上的Object上自定义一个myFunc方法
Object.prototype.myFunc01 = function () {
    console.log('1');
}

// 在原型链上的Array上自定义一个myFunc方法
Array.prototype.myFunc02 = function (value) {
   console.log('2');
}

let b = [1, 2, 3, 4]
for (let key in b) {
    if(b.hasOwnProperty(key)){
        console.log(key);
    }
}
打印结果：0 1 2 3

```

:::

**for...of**

1. 遍历获取值
2. 只遍历当前对象，不会遍历原型链
3. for-of 是 es6 新增的遍历方法，只限于迭代器(iterator)，不可以遍历普通对象(obj is not iterable).
4. 可以正确响应 break、continue 和 return 语句

可迭代的对象：包括 Array, Map, Set, String, TypedArray, arguments 对象等有迭代器对象的集合

---

## Set、Map、WeakSet 和 WeakMap 的区别

**Set**

1. 成员不能重复
2. 类似数组，只有键值，没有键名
3. 可以遍历，方法有 add、delete、has

**WeakSet**

1. 成员都是对象（引用）
2. 成员都是弱引用，随时可以消失（不计入垃圾回收机制）。可以用来保存 DOM 节点，不容易造成内存泄露
3. 不能遍历，方法有 add、delete、has

**Map**

1. 类似对象，有键值对，key 值可以为任意类型
2. 可以遍历，方法很多，可以跟各种数据格式转换

**WeakMap**

1. 只接受对象为键名（null 除外），不接受其他类型的值作为键名
2. 键名指向的对象，不计入垃圾回收机制
3. 不能遍历，方法同 get、set、has、delete；

---

## 内存泄漏的几种情况

1. 意外的全局变量
2. 闭包
3. 未被清空的定时器
4. 未被销毁的事件监听
5. DOM 引用

---
