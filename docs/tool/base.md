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

## 地图瓦片批量下载合并成一张图 核心代码

```js:line-numbers

import { createCanvas, loadImage } from "canvas"



async downloadAndMergeTiles() {
  const zoomLevel = 13
  const tileUrls = []
  const startX = 6790 // 设置实际的起始瓦片x
  const endX = 6825 // 设置实际的结束瓦片x
  const startY = 3220 // 设置实际的起始瓦片y
  const endY = 3245 // 设置实际的结束瓦片y

  // 生成瓦片的 URL 列表
  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      const url = `https://t7.tianditu.gov.cn/DataServer?T=cia_w&x=${x}&y=${y}&l=${zoomLevel}&tk=xxxxx` // 你的实际瓦片 URL
      tileUrls.push({ x, y, url })
    }
  }

  // 下载瓦片并拼接
  const tileSize = 256 // 天地图的瓦片大小为256x256
  const canvasWidth = (endX - startX + 1) * tileSize
  const canvasHeight = (endY - startY + 1) * tileSize
  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext("2d")

  for (const tile of tileUrls) {
    try {
      const response = await axios.get(tile.url, { responseType: "arraybuffer" })
      // 将 ArrayBuffer 转换为 Blob 对象
      const blob = new Blob([response.data], { type: "image/png" }) // 确保类型与实际数据匹配

      // 使用 URL.createObjectURL 将 Blob 转换为可以被 <img> 加载的 URL
      const imageUrl = URL.createObjectURL(blob)

      // 加载图片
      const img = await loadImage(imageUrl)

      // 释放 URL 对象
      URL.revokeObjectURL(imageUrl)
      const posX = (tile.x - startX) * tileSize
      const posY = (tile.y - startY) * tileSize
      ctx.drawImage(img, posX, posY, tileSize, tileSize)
    } catch (error) {
      console.error(`Failed to download tile at ${tile.url}`, error)
    }
  }

  function saveCanvasAsImage(canvas, filename = "rizhao_map.png") {
    // 检查 canvas 对象是否存在
    if (!canvas) {
      console.error("Canvas element is not provided.")
      return
    }

    // 使用 toBlob 方法将 canvas 转换为 Blob
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to convert canvas to Blob.")
        return
      }

      // 创建一个临时 URL
      const url = URL.createObjectURL(blob)

      // 创建一个下载链接
      const link = document.createElement("a")
      link.href = url
      link.download = filename

      // 模拟点击链接，触发下载
      link.click()

      // 释放 URL 资源
      URL.revokeObjectURL(url)
      console.log(`Map image saved as ${filename}`)
    }, "image/png") // 设置图片格式
  }

  saveCanvasAsImage(canvas)
}

```

---

## mapboxgl 设置本地离线字体

::: tip 注意事项

字体文件夹文件夹名： `Open Sans Regular,Arial Unicode MS Regular`

图层字体中代码的配置：`'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular']`

初始化时 glyphs 字段： `'xxx/{fontstack}/{range}.pbf'`

:::

![glyphs写法](/tool/mapboxgl_glyphs.png)

::: details 批量下载 代码

```js:line-numbers
// 注： 此代码仅能简单实现批量下载的功能，可继续优化下载速率
let end = 0
let start = 0
function downloadFile(url) {
    const a = document.createElement("a")
    a.setAttribute("download", "")
    a.setAttribute("href", url)
    a.click()
  }
for (let index = 0; index < 65536 / 256; index++) {
  setTimeout(() => {
    start = index * 256
    end = start + 255
    downloadFile(
      `https://iserver.supermap.io/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/Open%20Sans%20Regular,Arial%20Unicode%20MS%20Regular/${start}-${end}.pbf?access_token=pk.eyJ1IjoiaHVtYXBib3gxIiwiYSI6ImNrcDg1eWRuaTA0MHUydm5ya3V2anV3YnoifQ.zOVmy8D0-vZSQ2BzWJdAKg`
    )
  }, 1000 * index) // 时间需要控制下，避免浏览器反应不过来造成文件缺失
}
```

:::

---
