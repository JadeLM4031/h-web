## Vue 项目性能优化

- **webpack 分包**

  默认情况下，组件和组件之间时通过模块化直接依赖的，webpack 打包时会将组件打包到一个 app.js 文件里，
  随着项目不断庞大，会造成首屏加载变慢。

  对于没必要立即使用的组件，可以单独拆分成小的代码块 chunk.js，这些 chunk.js 会在需要时从服务器加载
  下来，并运行代码。

  方法：使用异步组件

  :::details 查看用法

  ```vue:line-numbers{5,7,15}
  <script>
    <!-- defineAsyncComponent 接收两种类型的参数：
              类型一：工厂函数，该工厂函数需要返回一个Promise对象
              类型二：接收一个对象类型，对异步函数进行配置（不常用） -->
    import { defineAsyncComponent } from 'vue'
    // import()为异步函数，返回promise对象，而 defineAsyncComponent() 将promise对象转为组件
    const AsyncMore = defineAsyncComponent(()=> import("./view/More.vue"))
    //正常导入
    import Home from './view/Home.vue'
    import About from './view/About.vue'
    export default {
      components:{
        Home,
        About,
        More: AsyncMore
      }
    }
  </script>
  ```

  :::

- **路由懒加载**

  只有在跳转到当前路由才加载对应组件，缩短首屏加载事件

  ::: details 查看案例

  ```js:line-numbers{11}
  const router = createRouter({
    // hash模式，带#
    // history: createWebHashHistory(),
    //history模式，不带#
    history: createWebHistory(),
    routes: [
      { path: "/", redirect: "/home" },
      {
        path: "/home",
        // webpack3.x开始支持对分包进行命名
        component: () => import(/* webpackChunkName: "home-chunk" */ "../view/Home.vue"),
      },
    ],
  });
  ```

  :::
