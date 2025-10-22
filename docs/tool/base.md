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
  npm install --save-dev @babel/plugin-proposal-optional-chaining @babel/plugin-proposal-nullish-coalescing-operator @babel/plugin-proposal-logical-assignment-operators
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
  plugins: [
    "@babel/plugin-proposal-optional-chaining", // 支持 ?.
    "@babel/plugin-proposal-nullish-coalescing-operator", // 支持 ??
    "@babel/plugin-proposal-logical-assignment-operators", // 支持 ||= &&= ??=
  ],
  env: {
    development: {
      plugins: ["dynamic-import-node"],
    },
  },
}
```

## 地图瓦片批量下载合并成一张图 核心代码

:::details 查看案例

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

:::

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

## 获取一年每周起止日期

- 获取一年有多少周、每周的起止日期以及现在是第几周

:::details 查看案例

```js:line-numbers
getWeekList() {
  const now = new Date()
  const year = now.getFullYear()

  const firstDateOfYear = new Date(year, 0, 1)
  const lastDateOfYear = new Date(year, 11, 31)

  // 找到1月1日所在周的周一作为第一周的开始（即使是上一年）
  const firstMonday = new Date(firstDateOfYear)
  const day = firstMonday.getDay()
  firstMonday.setDate(firstMonday.getDate() - (day === 0 ? 6 : day - 1)) // 周日要变成上一周的周一

  const weekDates = []
  let weekStart = new Date(firstMonday)
  let weekNum = 1
  let currentWeek = 0

  while (weekStart <= lastDateOfYear) {
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    // 如果这周有至少一天在今年，就纳入统计
    if (weekStart.getFullYear() === year || weekEnd.getFullYear() === year) {
      const startDateStr = weekStart.toISOString().split("T")[0]
      const endDateStr = weekEnd.toISOString().split("T")[0]

      // 判断当前日期是否在这周中
      if (now >= weekStart && now <= weekEnd) {
        currentWeek = weekNum
      }

      weekDates.push({
        weekNum,
        weekName: `第${weekNum}周`,
        startDate: this.formatDate(weekStart),
        endDate: this.formatDate(weekEnd),
      })

      weekNum++
    }

    weekStart.setDate(weekStart.getDate() + 7)
  }


  console.log("全年周数据：", weekDates)
  console.log("当前是第几周：", currentWeek)
  console.log("当前周起止日期：", weekDates[currentWeek - 1].startDate, weekDates[currentWeek - 1].endDate)
}
```

:::

---

## 批量根据经纬度获取地址

- 使用天地图 api 获取地址，免费 key 有次数限制

:::details 查看案例

```js:line-numbers

<el-button type="primary" :loading="exportBtnLoading" @click="handleExportClickTemp">临时导出</el-button>


const ExcelJS = require("exceljs")


async handleExportClickTemp() {
  this.exportBtnLoading = true

  try {
    // **1. 获取 7000 条数据**
    let res = await request({
      url: `/api/example/BaseTower/simpleTowerList`,
      method: "post",
      data: {},
    })

    let arr = res.data.slice(11500, 16500)
    const MAX_BATCH_SIZE = 10 // **每批请求 10 个**
    let results = []

    // **2. 按批量执行**
    for (let i = 0; i < arr.length; i += MAX_BATCH_SIZE) {
      let batch = arr.slice(i, i + MAX_BATCH_SIZE)
      let batchRequests = batch.map((item) => this.fetchLocation(item))
      let batchResults = await Promise.allSettled(batchRequests)
      results.push(...batchResults)

      // **3. 防止 API 限制，每批请求后暂停 500ms**
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    // **4. 处理返回数据**
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        arr[index].location = result.value
      } else {
        arr[index].location = ""
      }
    })

    this.exportBtnLoading = false
    console.log("所有请求已完成", arr)
    this.exportToExcelNew(arr)
  } catch (error) {
    this.exportBtnLoading = false
    console.error("请求失败：", error)
  }
}

// **封装单个请求**
async fetchLocation(item) {
  if (!item.lng || !item.lat) {
    item.lng = 0
    item.lat = 0
  }

  try {
    let response = await axios({
      method: "get",
      url: "http://api.tianditu.gov.cn/geocoder",
      params: {
        postStr: JSON.stringify({ lon: item.lng, lat: item.lat, ver: 1 }),
        type: "geocode",
        tk: "此处填写天地图key",
      },
    })

    return response.data.result.formatted_address || ""
  } catch (error) {
    console.warn(`地址请求失败:`, error)
    return "获取失败"
  }
}

exportToExcelNew(list) {
  let workbook = new ExcelJS.Workbook() // 创建一个新的工作簿
  let worksheet = workbook.addWorksheet("Sheet1") // 添加一个新的工作表

  // 设置标题样式
  // const titleRow = worksheet.addRow(["所属任务：" + this.taskList.find((item) => item.id == this.query.taskId).name])
  // titleRow.font = { size: 12, bold: false }
  // worksheet.mergeCells(1, 1, 1, this.activeName == "bumen" ? 5 : 6) // 根据条件合并单元格
  // titleRow.alignment = { vertical: "middle", horizontal: "center" }

  // 添加列头
  let headers = ["序号", "电压等级", "线路名称", "杆塔号", "所属区、镇、村", "村书记姓名", "村书记联系方式"]
  let columnWidth = [10, 20, 20, 20, 40, 20, 20]
  worksheet.addRow(headers)

  // 添加数据行
  list.forEach((item, index) => {
    let row = [index + 1, item.voltageLevel, item.lineName, "#" + item.towerNo, item.location, "", ""]
    worksheet.addRow(row)
  })

  // 设置单元格样式
  worksheet.columns.forEach((column, index) => {
    column.eachCell((cell, cellIndex) => {
      cell.alignment = { vertical: "middle", horizontal: "center" }
      cell.border = {
        top: { style: cellIndex == 1 ? "thick" : "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      }
    })
    column.width = columnWidth[index]
  })

  console.log("表格样式", worksheet)

  // return

  // 保存 Excel 文件
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = URL.createObjectURL(blob)
    // 创建一个链接用于下载
    const downloadLink = document.createElement("a")
    downloadLink.href = url
    downloadLink.download = "线路台账.xlsx" // 文件名
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  })
}
```

:::
