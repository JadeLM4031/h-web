# HTML5 新增内容

## HTML5 新增的内容有哪些？

- 新增的标签有：布局标签 xxxx、画布 xxx、音视频 xxx、新增 form 表单类型有 xxx、
  同时也废弃了 big、font、s 等标签，在项目中使用 HTML5 规范进行开发对浏览器解析
  HTML 代码更加友好，有利于网站的 SEO；

- 新增的 API 有：DOM 操作相关 xxx、历史记录 xxx、存储 xxx、文件读取、websocket
  等。在实际应用中我使用 xxx API 实现过 xxx 功能，感觉 xxx 还是很强大的。

## 新增标签

1. **布局标签**

> `<header>` 标记定义一个页面或一个区域的头部
>
> `<nav>` 标记定义导航链接
>
> `<section>` 标记定义一个区域
>
> `<aside>` 标记定义页面内容部分的侧边栏
>
> `<article>` 标记定义一篇文章
>
> `<hgroup>` 标记定义文件中一个区块的相关信息
>
> `<figure>` 标记定义一组媒体内容以及它们的标题
>
> `<figcaption>` 标记定义 figure 元素的标题
>
> `<dialog>` 标记定义一个对话框(会话框)类似微信
>
> `<footer>` 标记定义一个页面或一个区域的底部

::: details 查看页面效果

![页面效果](/html&css/htmlLable.png)

:::

2. **表单新增**。新增的 `input` 的类型有：

> `email`：必须输入邮箱地址
>
> `url`：必须输入 url 地址
>
> `number`：必须输入数值
>
> `range`：必须输入一定范围内的数值
>
> `Date Pickers`：日期选择器
>
> `search` 搜索常规的文本域
>
> `color`：颜色选择

3. **canvas 画布**，用来在网页上绘制图像的标签。
4. **video 视频标签**
5. **audio 音频标签**

## 新增 API

1. **DOM 操作**

   获取元素新增 querySelector 及 querySelectorAll

   ::: details 基本使用

   ```html
   <body>
     <p class="ptext">标签</p>
     <p>标签</p>
     <script>
       const ptext = document.querySelector(".ptext"); // 查一个
       const allp = document.querySelectorAll("p"); // 查全部
     </script>
   </body>
   ```

   :::

   类名操作新增 add，remove，toggle，contains

   ::: details 基本使用

   ```js
   Node.classList.add("class"); //添加class
   Node.classList.remove("class"); // 移除class
   Node.classList.toggle("class"); //切换class，有则移除，无则添加
   Node.classList.contains("class"); // 检测是否存在class,有true,无false
   ```

   :::

2. **历史记录 & 缓存**

   **历史记录 window.history**

   ::: tip 介绍

   HTML5 提供了一组强大的 API 用来保存用户在一个会话期间的网站访问记录，并提供相
   应的方法进行追溯（也就是模拟浏览器的前进后退）。

   比较重要的 API 有 history.pushState 可以改变页面的 URL 而不会刷新页面，
   vue-router 及 react-router-dom 这种路由管理库的实现就是基于 history API 进 行
   实现的。

   :::

   - window.history.pushState(stateObj, title, url)——存储当前历史记录点

   > 第一个参数 stateObj 是给 state 的值；
   >
   > 第二个参数 title 为页面的标题，但当前所有浏览器都忽略这个参数，传个空字符串
   > 就好；
   >
   > 第三个参数 url 是你想要去的链接；

   - window.history.replaceState(stateObj, title, url)——替换当前历史记录点

   - popstate 事件——监听历史记录点

   ::: details 查看 pushState 案例

   ```html:line-numbers {24-36}
   <!DOCTYPE html>
   <html lang="en">
     <body>
       <ul>
         <li>
           <a href="/home">首页</a>
           <a href="/about">关于我们</a>
           <div id="routeView"></div>
         </li>
       </ul>
     </body>
   </html>

   <script>
     let routerView = document.querySelector("#routeView");
     // 页面加载完毕立即执行一遍
     window.addEventListener("DOMContentLoaded", onload);

     // 监听url变化后执行
     window.addEventListener("popstate", () => {
       routerView.innerHTML = viewHTMl(location.pathname);
     });

     function onload() {
       // 第一次进入页面时渲染默认内容
       routerView.innerHTML = viewHTMl(location.pathname);
       var linkList = document.querySelectorAll("a");
       linkList.forEach((el) => {
         el.addEventListener("click", function (e) {
           e.preventDefault();
           // 点击时，让浏览器url变为a链接种的内容
           history.pushState(null, "", el.getAttribute("href"));
           routerView.innerHTML = viewHTMl(location.pathname);
         });
       });
     }
     // 根据url 渲染不同内容
     function viewHTMl(url) {
       switch (url) {
         case "/home":
           return `<h1>我是首页<h1>`;
           break;
         case "/about":
           return `<h1>我是关于我们页面<h1>`;
           break;
         default:
           return `<h1>我是首页<h1>`;
           break;
       }
     }
   </script>
   ```

   :::

   **缓存**

   localStorage 和 sessionStorage

3. **文件读取**

   FileReader 接口将文件读入内存，并提供相应的方法，来读取文件中的数据
   ，FileReader 提供的方法和事件有：

   | 方法                         | 描述                                                                                                                                                                |
   | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | readAsText(file, [encoding]) | 将文件读取为文本 该方法有两个参数，其中第二个参数是文本的编码方式，默认值为 UTF-8。这个方法非常容易理解，将文件以文本方式读取，读取的结果即是这个文本文件中的内容。 |
   | readAsBinaryString(file)     | 将文件读取二进制码 通常我们将它传送到后端，后端可以通过这段字符串存储文件                                                                                           |
   | readAsDataURL(file)          | 将文件读取为 DataURL 将文件读取为一串 Data URL 字符串，将小文件以一种特殊格式的 URL 地址直接读入页面。小文件指图像与 html 等格式的文件。                            |
   | abort                        | 中断读取                                                                                                                                                            |

   ***

   | 事件             | 描述                                                    |
   | ---------------- | ------------------------------------------------------- |
   | onabort          | 数据读取中断时触发                                      |
   | onerror          | 数据读取出错时触发                                      |
   | onloadstart      | 数据读取开始时触发                                      |
   | onload/onloadend | 数据读取成功完成时触发/数据读取完成时触发，无论成功失败 |

   ***

   ::: details 查看案例

   ```js:line-numbers{10,13-27}
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>文件上传</title>
      </head>
      <body>
        <input type="file" id="files" onchange="fileChange()" />
        <img src="" id="onImg" alt="" width="200px" height="200px" />
        <script>
          function fileChange() {
            var selecFile = document.querySelector("#files").files[0];
            var onImg = document.querySelector("#onImg");
            var name = selecFile.name;
            var size = selecFile.size;
            console.log(name, size); // 获得上传文件的名称和大小 可以根据项目进行判断， 如果上传的图片大小必须小于200kb
            // 创建 FileReader 对象
            var reader = new FileReader();
            // 转化格式为base64输出
            reader.readAsDataURL(selecFile);
            // 把上传完毕的图片信息给到img标签进行渲染
            reader.onload = function () {
              onImg.src = this.result;
            };
          }
        </script>
      </body>
    </html>
   ```

   :::

4. **websocket**

   ::: tip 介绍

   websocket 是一种前后端通信技术，我们熟悉的前后端通信技术有 http/https 但是它
   们的工作方式只能由**客户端发起，服务端响应，响应结束后就断开（短链接）**。而
   websocket 技术可以让**服务端主动发消息给客户端**，并且浏览器和服务器只需要完
   成一次握手，两者之间就直接可以创建**持久性的连接**，并进行双向数据传输。

   :::

   ::: details 基本使用

   ```js:line-numbers{4,6,12,17}
   function WebSocketTest() {
      if ("Websocket" in window) {
          alert("您的浏览器支持 WebSocket!")
          var ws = new WebSocket("ws://localhost:9998/echo")

          ws.onopen = function () {
              // Web Socket 已连接上，使用 send() 方法发送数据
              ws.send("发送数据");
              alert("数据发送中...");
          }

          ws.onmessage = function (e) {
              var received_msg = e.data;
              alert("数据已接收...");
          }

          ws.onclose = function () {
              // 关闭 websocket
              alert("连接已关闭...");
          };
      }
   }
   ```

   :::
