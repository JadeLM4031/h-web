import { defineConfig } from "vitepress"
import { mdPlugin } from "./config/plugins"
export default defineConfig({
  base: "/h-web",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/h-web/favicon.png",
      },
    ],
  ],
  themeConfig: {
    logo: "/favicon.png",
    siteTitle: "H-web",
    description: "一个前端常见面试题整理的网站",
    // 目录层级
    // outline: [1, 3],
    outlineTitle: "目录",
    // 顶部菜单栏
    nav: [
      {
        text: "首页",
        activeMatch: "",
        link: "/",
      },

      {
        text: "基础文档",
        activeMatch: "/component",
        link: "/component/javascript",
      },
      {
        text: "手撕代码",
        activeMatch: "/code",
        link: "/code/cloneDeep",
      },
      {
        text: "工具函数",
        activeMatch: "/tool",
        link: "/tool/base",
      },
      {
        text: "1.2.6",
        items: [
          // {
          //   text: "更新日志",
          //   link: "https://github.com/ChaiMayor/hview-ui/blob/dev/CHANGELOG.md",
          // },
          { text: "作者", link: "https://github.com/JadeLM4031" },
        ],
      },
    ],
    // 左侧菜单栏
    sidebar: {
      "/component/": [
        {
          text: "前端基础",
          items: [
            { text: "HTML", link: "/component/html" },
            { text: "CSS", link: "/component/css" },
            { text: "JavaScript", link: "/component/javascript" },
            { text: "浏览器 & HTTP", link: "/component/http" },
            { text: "性能优化", link: "/component/upgrade" },
          ],
        },
        {
          text: "开发框架",
          items: [{ text: "Vue", link: "/component/vue" }],
        },
        {
          text: "开发工具",
          items: [{ text: "Webpack", link: "/component/webpack" }],
        },
      ],
      "/code/": [
        {
          text: "手写函数",
          items: [
            { text: "实现深拷贝", link: "/code/cloneDeep" },
            { text: "节流", link: "/code/throttle" },
            { text: "防抖", link: "/code/debounce" },
            { text: "draggable 拖拽", link: "/code/draggable" },
            { text: "手写 apply&call", link: "/code/apply&call" },
            { text: "实现 async 函数", link: "/code/async" },
          ],
        },
      ],
      "/tool/": [
        {
          text: "工具函数",
          items: [
            { text: "常用工具", link: "/tool/base" },
          ],
        },
      ],
    },
    // 搜索
    algolia: {
      apiKey: "5668312912db676c6c8630be7af16d3b",
      indexName: "h-web-search",
      // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
      appId: "LOVXDQ8JXB",
      placeholder: "搜索文档",
      buttonText: "搜索文档",
      translations: {
        button: {
          buttonText: "搜索文档",
          buttonAriaLabel: "搜索文档",
        },
        modal: {
          searchBox: {
            resetButtonTitle: "清除查询条件",
            resetButtonAriaLabel: "清除查询条件",
            cancelButtonText: "取消",
            cancelButtonAriaLabel: "取消",
          },
          startScreen: {
            recentSearchesTitle: "搜索历史",
            noRecentSearchesText: "没有搜索历史",
            saveRecentSearchButtonTitle: "保存至搜索历史",
            removeRecentSearchButtonTitle: "从搜索历史中移除",
            favoriteSearchesTitle: "收藏",
            removeFavoriteSearchButtonTitle: "从收藏中移除",
          },
          errorScreen: {
            titleText: "无法获取结果",
            helpText: "你可能需要检查你的网络连接",
          },
          footer: {
            selectText: "选择",
            navigateText: "切换",
            closeText: "关闭",
            searchByText: "搜索提供者",
          },
          noResultsScreen: {
            noResultsText: "无法找到相关结果",
            suggestedQueryText: "你可以尝试查询",
            reportMissingResultsText: "你认为该查询应该有结果？",
            reportMissingResultsLinkText: "点击反馈",
          },
        },
      },
      // locales: {
      //   root: {
      //     placeholder: "搜索文档",
      //     translations: {
      //       button: {
      //         buttonText: "搜索文档",
      //         buttonAriaLabel: "搜索文档",
      //       },
      //       modal: {
      //         searchBox: {
      //           resetButtonTitle: "清除查询条件",
      //           resetButtonAriaLabel: "清除查询条件",
      //           cancelButtonText: "取消",
      //           cancelButtonAriaLabel: "取消",
      //         },
      //         startScreen: {
      //           recentSearchesTitle: "搜索历史",
      //           noRecentSearchesText: "没有搜索历史",
      //           saveRecentSearchButtonTitle: "保存至搜索历史",
      //           removeRecentSearchButtonTitle: "从搜索历史中移除",
      //           favoriteSearchesTitle: "收藏",
      //           removeFavoriteSearchButtonTitle: "从收藏中移除",
      //         },
      //         errorScreen: {
      //           titleText: "无法获取结果",
      //           helpText: "你可能需要检查你的网络连接",
      //         },
      //         footer: {
      //           selectText: "选择",
      //           navigateText: "切换",
      //           closeText: "关闭",
      //           searchByText: "搜索提供者",
      //         },
      //         noResultsScreen: {
      //           noResultsText: "无法找到相关结果",
      //           suggestedQueryText: "你可以尝试查询",
      //           reportMissingResultsText: "你认为该查询应该有结果？",
      //           reportMissingResultsLinkText: "点击反馈",
      //         },
      //       },
      //     },
      //   },
      // },
    },
  },
  markdown: {
    // dark-plus vscode
    // css-variables custom
    theme: "css-variables",
    config: (md) => mdPlugin(md),
  },

  // srcDir: "./component",
  cleanUrls: true,
})
