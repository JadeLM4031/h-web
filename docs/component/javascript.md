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

2. 赋值不同

   > 基本类型的赋值相当于**深拷贝**，赋值后又开辟一个新的内存空间，两者互不影响
   > 。
   >
   > 引用类型赋值相当于**浅拷贝**，对对象进行操作时，操作的只是对象的引用。

---

## 深拷贝&浅拷贝

**浅拷贝**: (拷贝一层) 如果对象的属性是基本类型,拷贝的就是基本类型的值,如果属性
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

每个函数都有 `prototype` 属性，每个对象都有 `__proto__` 属性(这个属性称之为原型
)，在我们执行 new 的时候，对象的 `__proto__` 指向这个构造函数的 `prototype`

:::

### 函数.prototype.constructor === 函数

每个函数都有个 prototype 属性，这个属性指向函数的原型对象，同时 prototype 里面有
个 constructor 属性回指到该函数。

```js
function Demo() {}
Demo.prototype.constructor === Demo; // true
```

::: details 查看 Demo.prototype 结构
![Demo.prototype](/javascript/demo-prototype.png)

:::

### 实例对象.`__proto__` === 函数.prototype

使用 new 创建一个实例对象 d（使用 new 操作符后 Demo 就变成了构造函数）。d 是对象
，自然有 `__proto__` (原型),此时原型指向构造函数 Demo 的 prototype。

```js
function Demo() {}
const d = new Demo();
d.__proto__ === Demo.prototype; // true
```

### 原型链执行流程

当我们访问一个对象属性时，程序会先去这个对象里面找，如果没有找到就会去这个对象的
原型上找。

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
