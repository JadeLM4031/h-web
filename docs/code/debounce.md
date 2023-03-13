## 防抖

:::tip 介绍

触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算
时间。适用于可以多次触发但触发只生效**最后一次**的场景。

:::

**应用场景：**

1. 输入框搜索，用户不断输入时，用防抖节约请求资源。
2. window 触发 resize，不断调整浏览器窗口大小会一直触发 resize，使用防抖让其只触
   发一次。

```js:line-numbers
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
```
