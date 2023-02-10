# 实现深拷贝

## 最简单版本

```js
JSON.parse(JSON.stringify(obj));
```

适用于拷贝简单对象，且要注意使用后不会出现副作用。

> 这种方式存在弊端：
>
> 1. 会忽略 undefined、Symbol 和函数
> 2. NaN、Infinity、-Infinity 也会被转化为 null
> 3. 如果出现循环引用，此方法会直接报错

::: details 查看案例

```js
/* 正常代码 */
const obj = {
  person: {
    name: "lin",
  },
};
const newObj = JSON.parse(JSON.stringify(obj)); // 深拷贝
obj.person.name = "xxx"; // 改变原来的深层对象
console.log(newObj); // { person: { name: 'lin' } } 新的深层对象不变

/* 问题1 */
const obj = {
  a: undefined,
  b: Symbol("b"),
  c: function () {},
};
const newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj); // {}

/* 问题2 */
const obj = {
  a: NaN,
  b: Infinity,
  c: -Infinity,
};
const newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj); // { a: null, b: null, c: null }

/* 问题3 */
const obj = {
  a: 1,
};
obj.obj = obj;
const newObj = JSON.parse(JSON.stringify(obj)); // Uncaught TypeError: Converting circular structure to JSON
```

:::

## 基础版本

::: details 查看案例

```js
function deepClone(target) {
  if (typeof target !== "object") {
    // 如果是原始类型，无需继续拷贝，直接返回
    return target;
  }
  // 如果是引用类型，递归实现每一层的拷贝
  const cloneTarget = {}; // 定义一个克隆对象
  for (const key in target) {
    // 遍历原对象
    cloneTarget[key] = deepClone(target[key]); // 递归拷贝每一层
  }
  return cloneTarget; // 返回克隆对象
}
```

:::

### 处理数组、日期、正则、null

上述基础版本没有处理 null 这种原始类型，也没有处理数组、日期和正则这些比较常用的
引用类型。如：

```js
const obj = {
  a: [],
  b: new Date(),
  c: /abc/,
  d: null,
};
```

优化后的代码如下：

::: details 查看案例

```js
function deepClone(target) {
  if (target === null) return target; // 处理 null
  if (target instanceof Date) return new Date(target); // 处理日期
  if (target instanceof RegExp) return new RegExp(target); // 处理正则

  if (typeof target !== "object") return target; // 处理原始类型

  // 处理对象和数组
  const cloneTarget = new target.constructor(); // 创建一个新的克隆对象或克隆数组
  for (const key in target) {
    // 递归拷贝每一层
    cloneTarget[key] = deepClone(target[key]);
  }
  return cloneTarget;
}

---------------------------------------------------------------------


<!-- 代码解释 -->
const cloneTarget = new target.constructor(); // 创建一个新的克隆对象或克隆数组
深拷贝函数里，就不用在拷贝时去判断数组类型了，原对象是对象，就创建一个新的克隆对象，原对象是数组，就创建一个新的克隆数组。

class Person {}
const p1 = new Person();

console.log(p1.constructor === Person); // true
console.log([].constructor === Array); // true
console.log({}.constructor === Object); // true

console.log(new {}.constructor()); // {}
等价于;
console.log(new Object()); // {}

console.log(new [].constructor()); // {}
等价于;
console.log(new Array()); // []
```

:::
