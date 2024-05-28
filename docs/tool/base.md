# 常用工具函数

## js 获取路径参数

```js:line-numbers
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

## js 中设置 css 变量

```css:line-numbers
/* css文件 */
:root {
  --aaa: 20px;
}
```

```js
// js文件
document.documentElement.style.setProperty("--aaa", "16px")
```

---

## 封装 axios

```js:line-numbers
import axios from "axios"

import nprogress from "nprogress"
import "nprogress/nprogress.css"

// 创建axios实例
const service = axios.create({
  baseURL: "", // 设置基础请求路径
  timeout: 5000, // 设置超时
})

// 请求拦截器
service.interceptors.request.use((configs) => {
  // 请求头追加token
  if (token) {
    configs.headers.token = token
  }
  // 进度条
  nprogress.start()
  return configs
})

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 成功的回调
    nprogress.done()
    return res.data
  },
  (error) => {
    console.log("error", error)
  }
)
export default service
```

---

## 时间格式 format

- 放到原型上

```js:line-numbers
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substring(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substring(("" + o[k]).length))
  return fmt
}

// 使用如下
new Date().Format("yyyy-MM-dd hh:mm:ss")
```

- 封装单独函数

```js:line-numbers
format = function (date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substring(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substring(("" + o[k]).length))
  return fmt
}

// 使用如下，data传入日期对象
format(new Date(), "yyyy-MM-dd hh:mm:ss")
```

---

## 取消 axios 请求

```js:line-numbers {2,6,18}
//  创建一个CancelToken对象
const source = axios.CancelToken.source();

// 将CancelToken对象传递给请求的config中
axios.get('/api/data', {
  cancelToken: source.token
}).then(response => {
  console.log(response.data);
}).catch(error => {
  if (axios.isCancel(error)) {
    console.log('请求已被取消：', error.message);
  } else {
    console.log('请求出错：', error.message);
  }
})

// 在需要中断请求的地方，调用cancel方法
source.cancel('请求被用户取消');

```

## 扩展低代码开发环境 babel 使开发环境支持 ES20+ 语法（工作）

- 下载新 babel

  ```
  npm install --save @babel/preset-env core-js
  npm install --save-dev @babel/plugin-proposal-optional-chaining @babel/plugin-proposal-nullish-coalescing-operator
  ```

- 下载支持 JSX 语法

  ```
  npm install --save-dev @vue/babel-preset-jsx @babel/plugin-transform-react-jsx
  ```

- 修改 babel.config.js 文件

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
        targets: "> 0.25%, not dead",
      },
    ],
    "@vue/babel-preset-jsx",
  ],
  env: {
    development: {
      plugins: ["dynamic-import-node"],
    },
  },
  plugins: ["@babel/plugin-proposal-optional-chaining", "@babel/plugin-proposal-nullish-coalescing-operator"],
}
```
