# 常用工具函数

## js 获取路径参数

```js
getParam (key) {
  const URL = window.location.href.split('?')[1];
  let obj = {}; // 声明参数对象
  let arr = URL.split("&");
  for (let i = 0; i < arr.length; i++) {
    let arrNew = arr[i].split("=");
    obj[arrNew[0]] = arrNew[1];
  }
  return obj[key]
},
```

--- 
