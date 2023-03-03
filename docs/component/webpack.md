## 作用

1. 模块打包
2. 编译兼容。通过 webpack 的 Loader 机制，可以便宜转换如.less、.vue、.jsx 这类浏
   览器无法识别的文件，让开发可以使用新特性和信誉发
3. 能力扩展。通过 webpack 的 Plugin 机制，可以进一步实现诸如按需加载，代码压缩等
   一系列功能

---

## 执行流程

![执行流程](/webpack/process.png)

## 常见配置

- **模式（mode）**：可选值：development, production 或 none，默认为 production
- **入口（entry）**：指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图
  (dependency graph) 的开始。
- **输出（output）**：告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些
  文件。
- **loader**：只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力
  。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应
  用程序使用，以及被添加到依赖图中。
- **插件（plugin）**：loader 用于转换某些类型的模块，而插件则可以用于执行范围更
  广的任务。包括：打包优化，资源管理，注入环境变量。

::: details 简单使用

```js
//webpack.config.js
const path = require("path");

module.exports = {
  // 入口文件
  entry: "./src/index",
  mode: "development",
  devtool: false,
  // 输出文件
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "/dist"),
  },
};
```

:::

::: details 完整代码

```js
//webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口文件
  entry: "./src/index",
  // 如果不写，默认是production
  mode: "production",
  // 开启tree-shaking,需要把mode设置为production
  optimization: {
    usedExport: true,
  },
  devtool: false,
  // 模块热替换
  devServer: {
    hot: true,
  },
  // 持续监听文件变化，持续构建
  watch: true,
  // 输出文件
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "/dist"),
  },
  module: {
    rules: [
      {
        // 过滤条件，满足才会处理(此处也可以处理less，sass等文件)
        test: /\.css$/,
        // 使用以下两个loader一起处理.css后缀的文件
        use: ["style-loader", "css-loader"],
      },
      {
        // 使用babel-loader处理js文件
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env"]],
            },
          },
        ],
      },
    ],
  },
  // 自动生成html文件
  plugins: [new HtmlWebpackPlugin()],
};
```

:::

## Loader

::: tip 介绍

Loader——为了处理非标准 JS 资源，设计出资源翻译模块。用于将资源翻译为标准 JS.

Webpack 内部默认只能够处理 JS 模块代码，在打包过程中，会默认把所有遇到的文件都当
作 JavaScript 代码进行解析，因此当项目存在非 JS 类型文件时，我们需要先对其进行必
要的转换，才能继续执行打包任务，这也是 Loader 机制存在的意义。

:::

**基本使用**

针对每个文件类型，loader 支持以数组的形式配置多个。当 Webpack 在转换该文件类型的
时候，会按顺序链式调用每一个 loader，前一个 loader 返回的内容会作为下一个 loader
的入参。

```js
// webpack.config.js
module.exports = {
  // ...other config
  module: {
    rules: [
      {
        test: /^your-regExp$/,
        use: [
          {
            loader: "loader-name-A",
          },
          {
            loader: "loader-name-B",
          },
        ],
      },
    ],
  },
};
```

::: details 处理 less 文件

> 首先安装依赖（`npm add -D css-loader style-loader less-loader`）,其次配置
> webpack.config.文件

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
```

> `less-loader` :实现 less => css 的转换
>
> `css-loader` :将 CSS 包装成类似 `module.exports = "${css}"` 的内容，包装后的内
> 容符合 JavaScript 语法
>
> `style-loader` :将 css 模块包进 require 语句，并在运行时调用 `injectStyle` 等
> 函数将内容注入到页面的 style 标签

:::

**编写 loader**

loader 的开发需要遵循一些规范，比如返回值必须是标准的 JS 代码字符串，以保证下一
个 loader 能够正常工作，同时在开发上需要严格遵循“单一职责”，只关心 loader 的输入
以及对应的输出。

```js
/* 基本结构如下 */
module.exports = function (source, sourceMap?, data?) {
  // source 为 loader 的输入
  // 可能是文件内容，也可能是上一个 loader 处理结果
  return source;
};
```

---

## Pulgin

负责功能扩展

**基本使用**

使用 HtmlWebpackPlugin 和 DefinePlugin

::: details 查看案例

```js
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //...
  plugins: [
    // 自动生成html文件
    new HtmlWebpackPlugin(),
    // DefinePlugin
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify("5fa3b9"),
    }),
  ],
};
```

:::

**编写 plugin**

1. 插件必须是一个函数或者是一个包含 apply 方法的对象，这样才能访问 compiler 实例
   ；
2. 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改
   了它们身上的属性，会影响后面的插件；
3. 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然
   会卡住。

```js
// 基本结构如下
class MyPlugin {
  apply(compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      // compilation: 当前打包构建流程的上下文
      console.log(compilation);

      // do something...
    });
  }
}
```
