## 深拷贝&浅拷贝

**浅拷贝**: (拷贝一层) 如果对象的属性是基本类型,拷贝的就是基本类型的值,如果属性
是引用类型, 拷贝的就是内存地址,两个对象用的是同一个内存,修改其中一个的值,另一个
也跟着改变.

**深拷贝**: (拷贝全部层级)只有内存地址不一样,其他完全一样,修改之后不会影响到原来
的对象.

实现浅拷贝的方法:

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
