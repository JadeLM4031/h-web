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

   > 基本数据类型变量存放在**栈内存**中，如果在一个函数中声明基本类型的变量，则
   > 函数执行完毕，变量自动销毁。
   >
   > 引用类型的变量名保存在**栈内存**中，变量值存储在**堆内存**，引用类型的变量
   > 不会自动销毁，当没有引用变量引用它时，系统的垃圾回收机制会回收它。

   ::: details 堆栈区别

   > 1. 堆空间大，栈运行速度快。
   > 2. 堆内存是无序存储，可以根据引用直接获取。
   > 3. 基础数据类型比较稳定，相对来说占用的内存小。
   > 4. 引用数据类型大小是动态的，而且是无限的。

   :::

2. 赋值不同

   > 基本类型的赋值相当于**深拷贝**，赋值后又开辟一个新的内存空间，两者互不影响
   > 。
   >
   > 引用类型赋值相当于**浅拷贝**，对对象进行操作时，操作的只是对象的引用。

---

## 深拷贝 & 浅拷贝

**浅拷贝**: (拷贝一层) 如果对象的属性是基本类型，拷贝的就是基本类型的值,如果属性
是引用类型, 拷贝的就是内存地址,两个对象用的是同一个内存,修改其中一个的值,另一个
也跟着改变.

**深拷贝**: (拷贝全部层级)只有内存地址不一样,其他完全一样,修改之后不会影响到原来
的对象.

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
  const arr = [1, 2, 3]
  const newArr = arr.slice(0)
  arr[2] = 100 // 改变原来的数组
  console.log(newArr) // [1, 2, 3] // 新数组不变
  console.log(arr == newArr) // false 两者指向不同地址
  ```

  :::

- `concat`（数组）

  ::: details 查看案例

  ```js
  const arr = [1, 2, 3]
  const newArr = [].concat(arr)
  arr[2] = 100 // 改变原来的数组
  console.log(newArr) // [1, 2, 3] // 新数组不变
  console.log(arr == newArr) // false 两者指向不同地址
  ```

  :::

- `Array.from`（数组）

  > 将一个类数组对象（有 length 属性的）或者可遍历对象转换成一个真正的数组

  ::: details 查看案例

  ```js
  const arr = [1, 2, 3]
  const newArr = Array.from(arr)
  arr[2] = 100 // 改变原来的数组
  console.log(newArr) // [1, 2, 3] // 新数组不变
  console.log(arr == newArr) // false 两者指向不同地址
  ```

  :::

---

## 原型及原型链

::: tip 介绍

每个函数都有 `prototype` 属性，每个对象都有 `__proto__` 属性(这个属性称之为原型
)，在我们执行 new 的时候，对象的 `__proto__` 指向这个构造函数的 `prototype`

:::

### 函数.prototype.constructor === 函数

每个函数都有个 prototype 属性，这个属性指向函数的原型对象，同时 prototype 里面有
个 constructor 属性回指到该函数。

```js
function Demo() {}
Demo.prototype.constructor === Demo // true
```

::: details 查看 Demo.prototype 结构
![Demo.prototype](/javascript/demo-prototype.png)

:::

### 实例对象.`__proto__` === 函数.prototype

使用 new 创建一个实例对象 d（使用 new 操作符后 Demo 就变成了构造函数）。d 是对象
，自然有 `__proto__` (原型),此时原型指向构造函数 Demo 的 prototype。

```js
function Demo() {}
const d = new Demo()
d.__proto__ === Demo.prototype // true
```

### 原型链执行流程

当我们访问一个对象属性时，程序会先去这个对象里面找，如果没有找到就会去这个对象的
原型上找。

::: details 查看案例

```js
function Demo() {
  this.name = "蓝桥"
}
Demo.prototype.say = function () {
  console.log("我是", this.name)
}

const d = new Demo()

// 虽然 Demo 上没有 say 方法，但是因为Demo的prototype上有此方法，所以下面的调用可以正常打印。

d.say() // 我是蓝桥
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

## 改变函数上下文的 this

**优先级:** new 调用 > call、apply、bind 调用 > 对象上的函数调用 > 普通函数调用

![this指向](/javascript/this.png)

### call

[Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

:::details 查看案例

```js
function fn() {
  console.log(this.name)
}

const obj = {
  name: "zhangsan",
}
fn.call(obj) // 指定 this 为 obj，输出 'zhangsan'
```

:::

### apply

[Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
方法调用一个具有给定 `this` 值的函数，以及以一个数组（或类数组对象）的形式提供的
参数。

`apply` 和 `call` 的功能完全一样，只是传参形式不一样，`call` 是传多个参数
，`apply` 是只传参数集合。

:::details 查看案例

```js
function add(x, y, z) {
  return this.x + this.y + this.z
}

const obj = {
  x: 1,
  y: 2,
  z: 3,
}

console.log(add.call(obj, 1, 2, 3)) // 输出 6
console.log(add.apply(obj, [1, 2, 3])) // 输出 6，只是传参形式不同而已
```

:::

### bind

[Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为
`bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

`bind` 和 `call`、`apply` 的区别是，函数调用 `call` 和 `apply` 会直接调用，而调
用 `bind` 是创建一个新的函数，必须手动去再调用一次，才会生效。

:::details 查看案例

```js
function add(x, y, z) {
  return this.x + this.y + this.z
}

const obj = {
  x: 1,
  y: 2,
  z: 3,
}

const add1 = add.bind(obj, 1, 2, 3) // bind 会返回一个新的函数
console.log(add1()) // 执行新的函数，输出 6
```

:::

---

## 暂时性死区

::: tip 介绍

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可
获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

:::

let 或 const 声明的变量拥有暂时性死区（TDZ）：当进入它的作用域，它不能被访问（获
取或设置）直到执行到达声明。

首先看看不具有暂时性死区的 var：

> 1.  当进入 var 变量的作用域（包围它的函数），立即为它创建（绑定）存储空间。变
>     量会立即被初始化并赋值为 undefined。
> 2.  当执行到变量声明的时候，如果变量定义了值则会被赋值。

通过 let 声明的变量拥有暂时性死区，生命周期如下：

> 1.  当进入 let 变量的作用域（包围它的语法块），立即为它创建（绑定）存储空间。
>     此时变量仍是未初始化的。
> 2.  获取或设置未初始化的变量将抛出异常 ReferenceError。
> 3.  当执行到变量声明的时候，如果变量定义了值则会被赋值。如果没有定义值，则赋值
>     为 undefined。

const 工作方式与 let 类似，但是定义的时候必须赋值并且不能改变。

::: details 查看案例

> var 声明变量没有暂时性死区

```js
;(() => {
  console.log(i) // undefined
  var i = 1
  console.log(i) // 1
})()
```

> let 声明变量有暂时性死区

```js
;(() => {
  console.log(i) // Cannot access 'i' before initialization
  let i = 1
  console.log(i) // 1
})()
```

:::

---

## 作用域 & 闭包

es6 之前 JavaScript 只有函数级作用域，没有块级作用域。

::: details 查看案例

```js
function demo() {
  var a = "蓝桥"
  console.log(a) // 蓝桥
}
console.log(a) //a is not defined

if (true) {
  var b = "bbb"
}
console.log(b) // bbb(如果if条件为false则输出undefined)
```

:::

**经典题型**

请问以下代码打印的结果是？

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1000)
}
```

::: details 查看答案

> 执行结果: **输出 10 次 10**
>
> 执行过程：
>
> 1. 代码执行 for 循环，i 依次从 0 加到 9，循环十次。
> 2. 代码等待定时器 1 秒钟时间到，执行定时的里面的内容。
> 3. 执行打印 i 语句，因为定时器函数中没有声明 i 变量，所以代码只能去定时器函数
>    外的作用域(也就是 window)去查找。
> 4. 在外部找到了 i 此时 i 已经变成了 10，所以打印 10 次 10。
>
> **如果在当前作用域中没有发现此变量的声明，程序就会去父作用域查找，直到找到为止
> 。在浏览器中最外层作用域是 window，如果在 window 上也没有找到，就返回 xxx is
> not defined 查找结束。**

:::

### 闭包

::: tip 介绍

（closure）指有权访问另一个函数作用域中变量的函数——JavaScript 高级程序设计

可以延申变量的作用范围 容易造成内存泄漏（因为一直不销毁变量）

:::

闭包就是可以让外部访问到函数内部的变量

```js
function demo() {
  var a = "aaa"
  return function () {
    return a
  }
}
const d = demo()
console.log(d()) // aaa
```

通过在 demo 函数中返回一个函数，在返回的函数中再返回这个变量，然后当我们在外部去
调用这个返回出来的函数时就可以得到这个变量的值。也就是说 d 函数 保存了对 a 的引
用，这就形成了闭包。

**还是上面经典例题: 运用闭包知识,让函数输出 0-9**

::: details 查看答案

> **方法一:** 用 let 声明变量 i(不能用 const,因为常量不能修改),let 是块级作用域,
> 块内部的函数也在作用域内,可以访问到 i 的值.

```js
for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1000)
}
```

> **方法二:** 在 setTimeout 外边套一层自执行函数,把每次循环的 i 结果保存在当前作
> 用域下,当执行定时器的时候,可以去当前作用域找 i 的值.

```js
for (var i = 0; i < 10; i++) {
  ;(function (i) {
    setTimeout(function () {
      console.log(i)
    }, 1000)
  })(i)
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
  }
  // 把 name 和 love 解构出来
  const { name, love } = people
  console.log(name, love) // 张三 吃饭
  // 扩展运算符
  const user = { ...people }
  console.log(user) // {name: '张三', love: '吃饭'}
  ```

  :::

- **函数可以设置默认参数 (函数的 legnth 属性会失效)**

  ::: details 查看案例

  > 通过 length 可以获取函数参数的个数

  ```js
  function demo(name = "张三") {
    console.log("我是" + name)
  }
  console.log(demo.length) // 输出0 实际是有一个参数
  ```

  :::

- **Symbol**

  基本数据类型,表示独一无二的值. Symbol 值通过 `symbol` 函数生成

  ```js
  const fnName = Symbol()
  typeof fnName // "symbol"
  ```

- **Set 和 Map 数据结构**

  Set 类似数组,值唯一.

  ::: details 查看使用方法

  > **基本使用**

  ```js
  const arr = new Set([1, 2, 3])

  arr.add(4) // 向arr中添加元素
  arr.delete(1) // 删除数据为1的元素
  arr.size // 返回arr长度
  arr.has(2) // 判断arr中是否有2这个元素
  arr.clear() // 清除所有元素
  ```

  > **数组去重**

  ```js
  const arr = [1, 2, 3, 4, 1, 2, 3]
  const arr2 = [...new Set(arr)]

  console.log(arr2) // [1,2,3,4]
  ```

  :::

  Map 类似对象,也通过键值对存储,区别是 Object 中的键只能是字符串,而 Map 中的键可
  以是任意数据类型.

  ::: details 查看使用方法

  > **基本使用**

  ```js
  const m = new Map()

  m.set("name", "张三") // 设置元素
  m.get("name") // 张三
  m.has("name") // 判断有没有这个元素
  m.size // 获取map的长度
  ```

  > **键为 object 类型**

  ```js
  const m = new Map()
  const k = {
    name: "张三",
  }
  m.set(k, 18)
  m.get(k) // 18
  ```

  :::

- **Promise**

  没有 Promise 之前使用回调函数实现异步变成,回调函数多的话会产生回调地狱
  ,Promise 可以解决回调地狱.

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

      返回值: 成功和失败的返回值不同,成功返回一个结果数组,失败则返回最先被
      reject 的值.

  4.  `Promise.race()` 可以将多个 Promise 实例包装成一个新的 Promise 实例.

      返回值: 哪个结果获得的快,就返回哪个结果,不管结果本身时成功状态还是失败状态
      .

---

## 宏任务 & 微任务 （老）

### 宏任务

JavaScript 是单线程,但浏览器是多线程的,JavaScript 执行在浏览器中，在 V8 里跑着的
一直是一个一个的宏任务.

宏任务代表: 主线程、定时器.

::: details 查看案例

> 浏览器在执行下面代码时会先执行主线程代码（宏任务 1）然后再执行 setTimeout 里面
> 的代码。虽然 setTimeout 的定时时间为 0，但是浏览器在处理的时候会把它当做下一个
> 宏任务进行处理

![宏任务](/javascript/macrotask.png)

:::

### 微任务

当浏览器执行完一个宏任务后,就会检查有没有可执行的微任务,如果有,先把当前微任务执
行完, 再去执行下一个宏任务.

微任务代表: ajax、回调函数、和 Promise.

流程如下:

:::details 查案图解

![微任务](/javascript/microtask.png)

:::

**经典例题**

以下代码的执行结果是?

```js
console.log(1)
setTimeout(() => {
  console.log(2)
})

new Promise((res, req) => {
  console.log(3)
  res()
}).then(() => {
  console.log(4)
})

console.log(5)
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

> **注意**: 只有 Promise then 或者 catch 里面的方法是微任务，Promise 里面的回调
> 是当作主程序的宏任务进行处理的。

:::

---

## 消息队列 & 微队列（新）

任务没有优先级，但是**消息队列**有优先级

::: info 根据 W3C 的最新解释:

1. 每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以
   分属于不同的队列。在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出
   任务执行。
2. 浏览器必须准备好一个微队列，微队列中的任务优先所有其他任务执行

[官网链接](https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint)

:::

> 随着浏览器的复杂度急剧提升，W3C 不再使用宏队列的说法

:::tip 在目前 chrome 的实现中,至少包含了下面的队列:

微队列：用户存放需要最快执行的任务，优先级「最高」

交互队列：用于存放用户操作后产生的事件处理任务，优先级「高」

延时队列：用于存放计时器到达后的回调任务，优先级「中」

:::

:::details 查看图解

![消息队列](/javascript/message-loop.png)

:::

添加任务到微队列的主要方式主要是使用 Promise、MutationObserver，（async 函数里遇
到 await 之前的代码是同步里的，遇到 await 时，会执行 await 后面的函数，然后返回
一个 promise，把 await 下面的代码放入微队列，并且退出这个 async 函数。） 例如：

```js
// 立即把一个函数添加到微队列
Promise.resolve().then(函数)
```

---

## map 和 forEach 的区别

**相同点：**

1. 只能遍历数组，且循环遍历数组中的每一项
2. 每次执行匿名函数都支持三个参数，参数分别为 item（当前项），index（索引值）
   ，arr（原数组）
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
3. for-of 是 es6 新增的遍历方法，只限于迭代器(iterator)，不可以遍历普通对象(obj
   is not iterable).
4. 可以正确响应 break、continue 和 return 语句

可迭代的对象：包括 Array, Map, Set, String, TypedArray, arguments 对象等有迭代器
对象的集合

---

## Set、Map、WeakSet 和 WeakMap 的区别

**Set**

Set 是一个可以存储数据的对象，可以在其中添加或者删除数据，并循环访问 Set。但是
Set 中没有索引，也不能存放重复的值，数组与之相反。

1. 成员不能重复
2. 类似数组，只有键值，没有键名
3. 可以遍历，方法有 add、delete、has

**WeakSet**

    如果将其存储的对象设为了 null，相当于是删除了该对象，当垃圾回收机运行时，会释放
    掉被删除对象占用的空间。

1. WeakSet 的成员只能是对象且都是弱引用。

   > 在 WeakSet 中，add() 方法中不能传入非对象参数，若传入会报错。

2. 在 WeakSet 中，给 has() 和 delete() 方法传入非对象参数，虽然不会报错，但是会
   返回 false。

3. WeakSet 对象没有 size 属性，不能被遍历。

   > 由于 WeakSet 里面存储的都是弱引用，内部有多少个成员，取决于垃圾回收机制有没
   > 有运行。运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测
   > 的，因此 ES6 规定 WeakSet 不可遍历。

**Map**

:::tip Map

Map 是 ES6 中一种存储许多键值对的有序列表，其键值对可以是任意数据类型。Map 是有
序的，它会按照键值插入的顺序来排列。

:::

1. Map 可以创建任意数据类型的键值对，打破了对象键名类型限制的局限性。
2. 我们可以使用 forEach() 方法来遍历 Map，而对象不能。
3. 我们可以使用 set()、get()、has()、delete()、clear() 等方法来操作 Map。

常用方法：

`set()` 传入 key:value，如：`.set(3, "化妆品")`，添加一条数据

`get()` 获取指定 key 对应的值

`has()` 用来判断指定键名对应的数据是否存在于当前集合中。

`delete()` 用来删除指定键名的数据。

`clear()` 用来清空集合中的数据。

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

## Promise.all 方法

（可以用来隐藏加载动画）

`Promise.all` 方法中的参数是一个数组，数组中的每个元素是实例化后的 `Promise` 对
象，格式如下代码：

```javascript
Promise.all([p1,p2,p3,...]).then(res=>{
  // 所有请求成功后的操作步骤
},error=>{
  // 某一个请求失败后的操作步骤
});
```

:::info 成功

上述代码中，p1、p2、p3 都是实例化后的 `Promise` 对象，当全部的实例化对象都执行成
功后，进入 `then` 方法的第一个执行成功的回调函数中，函数参数是**每个任务执行成功
后的结果，以数组形式保存**。

:::

:::info 失败

如果在调用 `Promise.all` 方法时，有一个 `Promise` 实例对象（比如：p1）的任务执行
失败了，则会**直接进入** `Promise.all` 后的 `then` 方法的失败回调函数中。

:::

> 通过 `Promise.all` 方法可以并列完成多个异步的请求，只有当全部请求成功后，才进
> 入 `then` 方法中的成功回调函数中，否则，进入失败的回调函数中，因此，当首次加载
> 页面时，可以将各种的异步请求放入 `Promise.all` 方法中，如果全部完成，则在
> `then` 方法中的成功回调函数中执行下步操作，否则，直接进入失败回调函数中。

---

## Promise.race 方法

与 `Promise.all` 方法不同，`Promise.race` 方法是多个 `Promise` 实例化对象在比赛
， **执行最快的那个任务的结果**，将返回给 `then` 方法中的对应回调函数中.

（通过这种方式，可以检测页面中某个请求是否超时，并输出相关的提示信息。）

与 `Promise.all` 方法一样，`Promise.race` 中的参数也是一个数组，每个元素也是实例
化后的 `Promise` 对象，格式如下代码：

```js
Promise.race([p1,p2,p3,...]).then(
    function(v){
      //获取最快任务成功时的返回值
  },
  function(){
      //获取最快任务失败时的返回值
  }
)
```

## -----------内置对象--------------

## 数学对象

JavaScript 中的数学对象为 Math，它的内部有一些数学的属性和函数方法。

Math 的常用属性如下表所示：

| 属性       | 描述           |
| ---------- | -------------- |
| Math.E     | 自然对数的底数 |
| Math.LN2   | 2 的自然对数   |
| Math.PI    | 圆周率         |
| Math.SQRT2 | 2 的平方根     |

Math 的常用方法如下表所示：

| 属性           | 描述                             |
| -------------- | -------------------------------- |
| Math.abs(x)    | 返回一个数的绝对值。             |
| Math.pow(x, y) | 返回一个数的 y 次幂。            |
| Math.random()  | 返回一个 0 到 1 之间的伪随机数。 |
| Math.sqrt(x)   | 返回一个数的平方根。             |
| Math.round()   | 返回四舍五入后的整数。           |
| Math.exp(x)    | 返回欧拉常数的参数次方。         |

## 日期对象

在 JavaScript 中，日期对象是 Date，用于处理日期和时间。

其常用方法如下所示：

| 方法                 | 描述                           |
| -------------------- | ------------------------------ |
| getFullYear()        | 年 (2023)                      |
| getMonth()           | 月 (0-11)                      |
| getDate()            | 日 (1-31)                      |
| getDay()             | 星期几 (0-6，0 代表星期天)     |
| getHours()           | 小时 (0-23)                    |
| getMinutes()         | 分钟 (0-59)                    |
| getSeconds()         | 秒 (0-59)                      |
| getMilliseconds()    | 当前毫秒 (0-999)               |
| getTime()            | 时间戳 (1970.1.1 开始的毫秒数) |
| toLocaleDateString() | 当前日期 (2023/11/30)          |
| toLocaleTimeString() | 当前时间 (12:00:00)            |
| toLocaleString()     | 日期时间 (2023/11/30 12:00:00) |

## 数组对象——常用方法

- **slice()**

  > 取数组中下标从 2 到 4 的值
  >
  > ```js
  > arr.slice(2, 4)
  > ```

- **unshift()**

  > 在数组的头部增加新元素。
  >
  > ```js
  > arr.unshift(待添加项)
  > ```

- **shift()**

> 删除数组的首元素。
>
> ```js
> arr.shift()
> ```

- **sort()**

> 给数组中的元素从小到大进行排序。
>
> ```js
> arr.sort()
> ```

- **reverse()**

  > 将数组中的元素进行逆序排列。
  >
  > ```js
  > arr.reverse()
  > ```

- **join()**

  > 将数组中的字符拼接成字符串。
  >
  > ```js
  > arr.join()
  > ```

- **concat()**

  > 将两个数组拼接在一起。
  >
  > ```js
  > // 将 数组2 拼接到 数组1 里
  > 数组1.concat(数组2)
  > ```

- **includes()**

  > 用来判断该数组中是否包含某个元素。
  >
  > ```js
  > arr.includes(元素)
  > ```

- **toString()**

> 将数组中的值转换成字符串类型。
>
> ```js
> arr.toString()
> ```

- **indexOf()**

  > 用来查找指定元素的下标值。（如果查找到多个匹配的元素时，返回的是第一个匹配的
  > 元素下标。如果找不到，返回 -1。）
  >
  > ```js
  > arr.indexOf(元素)
  > ```

- **Array.from()**

  > 可以将以下两类对象转为数组。(返回一个新数组)
  >
  > 1. 类似数组的对象（array-like-object）。
  > 2. 可遍历的对象（iterable-object）。
  >
  > ```js
  > Array.from(待转换的对象)
  > ```

- **find()**

  > [find()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
  > 方法是用于从数组中寻找一个符合指定条件的值，该方法返回的是第一个符合条件的元
  > 素，如果没找到，则返回 undefined.
  >
  > ```js
  > array.find(callback(value, index, arr), thisValue)
  > ```
  >
  > 参数说明如下：
  >
  > `callback` 是数组中每个元素执行的回调函数。
  >
  > `value` 是当前元素的值，它是一个必须参数。
  >
  > `index` 是数组元素的下标，它是一个可选参数。
  >
  > `arr` 是被 find() 方法操作的数组，它是一个可选参数。
  >
  > `thisValue` 是执行回调时用作 this 的对象，它是一个可选参数。

- **findIndex()**

> [findIndex()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
> 方法返回数组中第一个符合指定条件的元素的索引下标值，如果整个数组没有符合条件的
> 元素，则返回 -1。
>
> 注意：执行回调函数时，会自动传入 value、index、arr 这三个参数
>
> ```js
> array.findIndex(callback(value, index, arr), thisArg)
> ```
>
> 参数说明如下：
>
> `callback` 是数组中每个元素都会执行的回调函数。
>
> `value` 是当前元素的值，它是一个必须参数。
>
> `index` 是数组元素的下标，它是一个必须参数。
>
> `arr` 是被 findIndex() 方法操作的数组，它是一个必须参数。
>
> `thisArg` 是执行回调时用作 this 的对象，它是一个可选参数。

- **fill()**

> [fill()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
> 方法是用指定的值来填充原始数组的元素。
>
> 注意：如果不指定 start 和 end 参数，该方法会默认填充整个数组的值。
>
> ```js
> array.fill(value, start, end)
> ```
>
> 其参数说明如下：
>
> `value` 是用来填充数组的值，它是一个必须参数。
>
> `start` 是被填充数组的索引起始值，它是一个可选参数。
>
> `end` 是被填充数组的索引结束值，它是一个可选参数。

- **entries()、keys()、values()**

> [entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)、[keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)、[values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
> 是 ES6 中三种数组的遍历方法，三个方法返回的都是 Array Iterator 对象。
>
> entries() 方法以**键/值对**的形式返回数组的 [index,value]，也就是索引和值。其
> 语法格式为：
>
> ```js
> array.entries()
> ```
>
> 三种方法使用均需要`...`展开
>
> ```js
> let arr = ["🐱", "🐶", "🐰", "🐍", "🐦", "🐟"]
> let result = arr.entries()
> let result = arr.keys()
> let result = arr.values()
> console.log(...result)
> ```

## 字符串对象——常用方法

- **toLowerCase()**

  > 把字符串的大写字母转换成小写字母。
  >
  > ```js
  > 字符串.toLowerCase()
  > ```

- **toUpperCase()**

  > 把字符串中的小写字母转换成大写字母。
  >
  > ```js
  > 字符串.toUpperCase()
  > ```

- **charAt()**

  > 根据指定下标从一个字符串中返回指定的字符。（类似数组的 arr[0] ）
  >
  > ```js
  > 字符串.charAt(下标值)
  > ```

- **substring()**

  > 获取下标为 7-10 的字符
  >
  > ```js
  > 字符串.substring(7, 10)
  > ```

- **replace()**

  > 替换指定字符串的内容。
  >
  > ```js
  > 字符串.replace(待替换的字符串, 新的字符串)
  > ```

- **split()**

  > 可以使用指定的分隔符将一个字符串分割成子字符串数组。
  >
  > ```js
  > 字符串.split(",") // 以逗号划分字符串
  > ```

- **indexOf()**

  > 寻找某个字符在字符串中首次出现的位置。
  >
  > ```js
  > 字符串.indexOf(字符)
  > ```

- **includes()**

  > 判断是否包含指定字符串，如果包含返回 true，反之 false。

- **startsWith()**

  > 判断当前字符串是否以指定的子字符串开头，如果是则返回 true，反之 false。

- **endsWith()**

  > 判断当前字符串是否以指定的子字符串结尾，如果是则返回 true，反之 false。

- **repeat(n)**

  > 方法用于返回一个重复 n 次原字符串的新字符串，其参数 n 为整数，如果设置 n 为
  > 小数，会自动转换为整数
  >
  > ```js
  > let str = "HELLO"
  > console.log(str.repeat(4)) // HELLOHELLOHELLOHELLO
  > ```

---

## -------------问题----------------

## 如何理解 JS 的异步？

:::tip 答

JS 是一门单线程语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个
。而渲染主线程承担着诸多任务，渲染页面、执行 JS 都在其中运行。

如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任
务无法执行。这样一来，一方面回到是繁忙的主线程白白的消耗时间，另一方面导致页面无
法及时更新，给用户造成卡死现象。

所以浏览器采用异步的方式来避免，具体做法是当某些任务发生时，比如计时器、网络、事
件监听、主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码
，当其他线程完成时，将实现传递的回调函数包装成任务，加入到消息队列的末尾排队，等
待主线程调度执行。

在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。

:::

---

## 阐述一下 JS 的事件循环

:::tip 答

事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。

在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一
个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。

过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取
而代之的是一种更加灵活多变的处理方式。

根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的
任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自
行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优
先级，必须优先调度执行。

:::

---

## JS 中的计时器能做到精确计时吗？为什么？

:::tip 不能

1. 计算机硬件没有原子钟,无法做到精确计时
2. 操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调用的是操作系统的函
   数，也就携带了这些偏差
3. 按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的
   最少时间，这样在计时时间少于 4 毫秒时又带来了偏差
4. （重要）受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来
   了偏差

:::

---

## -----javascript 骚操作-----

## 交换数组中的两项值

```js:line-numbers{2}
let arr = [0,1,2,3,4,5,6,7,8,9,10];
[arr[6],arr[8]] = [arr[8],arr[6]]
console.log(arr)
// [0, 1, 2, 3, 4, 5, 8, 7, 6, 9, 10]

```
