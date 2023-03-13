## 节流

:::tip 介绍

高频事件触发，但在 n 秒内只会执行一次，如果 n 秒内触发多次函数，只有一次生效，节
流会稀释函数的执行频率。

:::

**应用场景：**

1. 滚动事件，页面触底加载数据。
2. 鼠标事件，鼠标位置改变 mousemove。

```js:line-numbers
function throttle(func, delay) {
  var valid = false; // 节流阀
  return function () {
    if (valid) return; // 当前有任务了，直接返回
    setTimeout(function () {
      func.apply(this, arguments);
      valid  = false;
    }, delay);
    valid = true;
  };
}
```
