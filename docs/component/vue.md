## Vue-cli

文件目录:

```js:line-numbers
📁vue-cli
│
├─ 📁node_modules // 安装的依赖包
├─ 📁public
│  ├─ 📄favicon.ico // 项目logo
│  └─ 📄index.html  // 打包所使用的模板
│
├─ 📁src
│  ├─ 📁assets  // 资源文件夹，放一些图片
│  │  └─ 📄logo.png
│  ├─ 📁components  // 组件
│  │   └─ 📄HelloWorld.vue
│  ├─ 📄App.vue
│  └─ 📄main.js // 入口文件
│
├─ 📄.browserslistrc  // 适配浏览器
├─ 📄.gitignore   // git 忽略文件
├─ 📄babel.config.js
├─ 📄jsconfig.json  // vscode配置，可以提供更合适的代码提示
├─ 📄package-lock.json
├─ 📄package.json
├─ 📄README.md
└─ 📄vue.config.js
```

## v-for 遍历对象&数字

v-for 可以遍历可迭代对象(Iterable)

遍历对象时，支持有 1，2，3 个参数：

:::details 查看代码

```vue:line-numbers
<template>
  <!-- 一个参数 -->
  <ul>
    <li v-for="item in info">{{item}}</li>
  </ul>
    <!-- 输出：
      aaa
      18
      男 -->

  <!-- 俩参数 -->
  <ul>
    <li v-for="(value,key) in info">{{key}}-{{value}}</li>
  </ul>
    <!-- 输出：
      name-aaa
      age-18
      sex-男 -->

  <!-- 仨参数 -->
  <ul>
    <li v-for="(value,key,index) in info">{{index}}-{{key}}-{{value}}</li>
  </ul>
    <!-- 输出：
      0-name-aaa
      1-age-18
      2-sex-男 -->
</template>

<script>
  ...
  info:
    {
      name: 'aaa',
      age: 18,
      sex: '男'
    },
</script>
```

:::

遍历数字时，item 是从 1 开始的数字：

:::details 查看代码

```vue:line-numbers
<template>
  <!-- 遍历数字 -->
  <ul>
    <li v-for="item in 10">{{item}}</li>
  </ul>
    <!-- 输出：
      1
      2
      3
      4
      5
      6
      7
      8
      9
      10
    -->
</template>

```

:::

---

## 虚拟 DOM

:::tip 虚拟 DOM

虚拟 DOM 简称 VNode, 其实是一棵以 JavaScript 对象作为基础的树，是对真实 DOM 的抽象。虚拟 DOM 经过一系列转换可以变成真实
DOM 并渲染到页面上。

:::

**为什么要有虚拟 DOM?**

1. 为了 diff 算法。
2. 为了跨平台。可以将虚拟 DOM 转化成不同平台的真实 DOM。

我们可以用虚拟 DOM 来描述一个简单的 vue 组件，如下所示：

:::details 查看案例

```js:line-numbers
<template>
  <span class="demo" v-show="isShow"> This is a span. </span>
</template>
```

对应的 VNode 如下：

```json:line-numbers
{
    tag: 'span',
    data: {
        /* 指令集合数组 */
        directives: [
            {
                /* v-show指令 */
                rawName: 'v-show',
                expression: 'isShow',
                name: 'show',
                value: true
            }
        ],
        /* 静态class */
        staticClass: 'demo'
    },
    text: undefined,
    children: [
        /* 子节点是一个文本VNode节点 */
        {
            tag: undefined,
            data: undefined,
            text: 'This is a span.',
            children: undefined
        }
    ]
}
```

:::

---

## Diff 算法

对操作前后的 DOM 树同一层的节点进行对比，一层一层对比

![Diff](/vue/diff.png)

## v-for 中 key 的作用

:::tip :key="唯一标识"

v-for 中 key 的作用就是让每个被循环元素有一个唯一的身份标识，这样 Vue 就可以更加精准的追踪到每个元素，从而更加高效的更新
页面。当然如果没有 key 程序也不会报错，只不过此时的程序变得非常的“笨”。

:::

加 key 和不加 key 的区别：

:::details 查看图解

> **需求：** 把一个数组 [A,B,C] 变成 [A,D,B,C] 同时页面也更新
>
> 不加 key，一共做了两次更新一次插入操作。
>
> ![不加key](/vue/diff-nokey.png)
>
> 加 key，只执行了一次插入操作。
>
> ![加key](/vue/diff-key.png)

:::

---

## Vue2 生命周期

- **beforeCreate()**（创建前）
  > 在实例初始化之后，数据观察 (data observer) 和 event/watcher 事件配置之前被调用。
- **created()**（创建后）
  > 在实例创建完成后被立即调用。在这一步，实例已完成以下 的配置：数据观察 (data observer)，属性和方法的运算，watch/event
  > 事件回调。这时 ，挂载阶段还没开始，$el 属性目前尚不可用。
- **beforeMount()**（载入前）
  > 在挂载开始之前被调用，相关的 render 函数首次被调 用，该钩子函数在服务器渲染期间不被调用。
- **mounted()**（载入后）
  > 实例被挂载后调用，这时 $el 被新创建的 vm.$el 替换了。 如果根实例挂载到了一个文档内的元素上，当 mounted() 被调用时
  > vm.$el 也在文档内 。
- **beforeUpdate()**（更新前）
  > 是在 DOM 树生成之前、虚拟 DOM 树生成之后调用，调 用条件是这个 vm 实例已经 mounted()过。该钩子函数在服务器渲染期间不
  > 被调用。
- **updated()**（更新后）
  > 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后 会调用该钩子。
- **beforeDestroy()**（销毁前）
  > 实例销毁之前调用。在这一步，实例仍然完全可用。
- **destroyed()**（销毁后）
  > 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有 指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

::: details 查看图解

![Vue2声明周期](/vue/vue2live.png)

:::

---

## Vue3 生命周期

1. beforeCreate() 和 created() 均被 **setup()** 替代了
2. 多个钩子函数被重命名：

   beforeMount -> **onBeforeMount()**

   mounted() -> **onMounted()**

   beforeUpdate() -> **onBeforeUpdate()**

   updated() -> **onUpdated()**

   beforeDestroy() -> **onBeforeUnmount()**

   destroyed() -> **onUnmounted()**

3. 新添两个 debug 钩子函数，这两个函数都会接收一个 DebuggerEvent 作为参数：

   **onRenderTracked()**

   **onRenderTriggered()**

   ::: details 查看案例

   ```js
   export default {
     onRenderTriggered(e) {
       debugger;
       // inspect which dependency is causing the component to re-render
       // (检查是哪个依赖关系导致了组件的重新渲染)
     },
   };
   ```

   :::

**生命周期函数的执行顺序？**

Vue3 兼容 Vue2 语法，在 Vue3 中也可以使用 Vue2 的回调函数（beforeDestroy() 和 destroyed() 除外），混合使用时，Vue3 的生
命周期会优先于 Vue2 执行。

::: details 查看答案

> **1. setup**
>
> **2. onBeforeMount**
>
> **3. onRenderTracked**
>
> **4. onMounted**
>
> **5. mounted**
>
> **6. onRenderTriggered**
>
> **7. onBeforeUpdate**
>
> **8. onRenderTracked**
>
> **9. onUpdated**
>
> **10. onBeforeUnmount**
>
> **11. onUnmounted**

```html
<!-- LifeHook.html-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>LifeHook</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <!-- 最新 CDN：https://unpkg.com/vue@next -->
    <script src="https://labfile.oss.aliyuncs.com/courses/2495/vue.global.js"></script>
  </head>

  <body>
    <div id="app">
      <input type="text" v-model="message" name="" id="" />
      <div>{{message}}</div>
    </div>
    <script>
      const {
        createApp,
        ref,
        onBeforeMount,
        onMounted,
        onBeforeUpdate,
        onUpdated,
        onBeforeUnmount,
        onUnmounted,
        onRenderTracked,
        onRenderTriggered,
      } = Vue;
      const App = {
        setup() {
          const message = ref("LifeCycle Hook!");
          console.log("setup");
          onBeforeMount(() => {
            console.log("onBeforeMount");
          });
          onMounted(() => {
            console.log("onMounted");
          });
          onBeforeUpdate(() => {
            console.log("onBeforeUpdate");
          });
          onUpdated(() => {
            console.log("onUpdated");
          });
          onBeforeUnmount(() => {
            console.log("onBeforeUnmount");
          });
          onUnmounted(() => {
            console.log("onUnmounted");
          });
          onRenderTracked(() => {
            console.log("onRenderTracked");
          });
          onRenderTriggered(() => {
            console.log("onRenderTriggered");
          });
          return {
            message,
          };
        },
      };
      createApp(App).mount("#app");
    </script>
  </body>
</html>
```

:::

## Vue2 组件通讯

- **父组件向子组件传递数据**

:::details 查看代码

```vue:line-numbers{4,12}
<!-- 父组件 -->
<template>
  <!-- 传递数据 -->
  <child-page :childData="childData"></child-page>
</template>

<script>
  import childPage from "childPage.vue";
  export default {
    data() {
      return {
        childData: [1, 2, 3],
      };
    },
    components: {
      childPage,
    },
  };
</script>
```

---

```vue:line-numbers{5-11}
<!-- 子组件 -->

<script>
  export default {
    props: {
      // 接收数据
      childData: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>
```

:::

- **父组件调用子组件方法**
  1. 设置子组件的 `ref` 属性
  2. 通过 `this.$refs` 进行触发

:::details 查看代码

```vue:line-numbers{5-6,17-20}
<!-- 父组件 -->
<template>
  <div>
    <!-- 设置ref -->
    <child-page ref="child"></child-page>
    <button @click="childFn">调用子组件事件</button>
  </div>
</template>

<script>
  import childPage from "./childPage.vue";
  export default {
    components: {
      childPage,
    },
    methods: {
      childFn() {
        //调用子组件
        this.$refs.child.sendMsg();
      },
    },
  };
</script>
```

---

```vue:line-numbers{9-11}
<!-- 子组件 -->
<template>
  <div></div>
</template>

<script>
  export default {
    methods: {
      sendMsg() {
        console.log("调用子组件方法成功");
      },
    },
  };
</script>

```

:::

- **子组件向父组件传递数据**

  子组件向父组件传递参数只能通过`触发父组件方法`的形式去传递

:::details 查看代码

```vue:line-numbers{4,11-13}
<!--子组件  -->
<template>
  <div>
    <button @click="parentFn">向父组件传递数据</button>
  </div>
</template>

<script>
  export default {
    methods: {
      parentFn() {
        this.$emit("parent", "is son");
      },
    },
  };
</script>
```

---

```vue:line-numbers{4,15-17}
<!--父组件 -->
<template>
  <div>
    <child-page @parent="parentchange"></child-page>
  </div>
</template>

<script>
  import childPage from "./childPage.vue";
  export default {
    components: {
      childPage,
    },
    methods: {
      parentchange(val) {
        console.log("这是子组件传递过来的值：", val);
      },
    },
  };
</script>
```

:::

- **子组件调用父组件的方法**

  和子组件向父组件传递数据方式一样。

- **兄弟及跨组件传参**

  1.  provide / inject

      > 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的
      > 时间里始终生效。 ——vue 官方文档

      :::details 查看代码

      ```vue:line-numbers{5-9}
      <!-- 在父组件中定义-->
      <script>
        export default {
          name: "App",
          provide: {
            userInfo: {
              name: "蓝桥",
            },
          },
          components: {
            HelloWorld,
          },
        };
      </script>
      ```

      ***

      ```vue:line-numbers{8}
      <!-- 在任意一个子组件(跨级组件)中使用 -->
      <template>
        <div>{{ userInfo.name }}</div>
      </template>

      <script>
        export default {
          inject: ["userInfo"],
        };
      </script>
      ```

      :::

  2.  EventBus（事件总线）

      > 使用 Provider/inject 只能是父组件派发数据，子组件接受数据。如果要想父子组件都可以派发数据那就 需要使用
      > EventBus（事件总线）。
      >
      > 原理就是在 Vue 的 `prototype` 上在 new 出来一个 vue，通过 `$emit` 和 `$on` 来进行数据通讯。

      :::details 查看代码

      ```js:line-numbers{8}
      // main.js
      import Vue from "vue";
      import App from "./App.vue";

      Vue.config.productionTip = false;

      //  设置EventBus
      Vue.prototype.EventBus = new Vue();

      new Vue({
        render: (h) => h(App),
      }).$mount("#app");
      ```

      ***

      ```vue:line-numbers{4,11-13}
      <!-- 兄弟组件1 -->
      <template>
        <div>
          <button @click="siblingsFn">传递参数到兄弟组件</button>
        </div>
      </template>

      <script>
        export default {
          methods: {
            siblingsFn() {
              this.EventBus.$emit("test", "ChildItem");
            },
          },
        };
      </script>
      ```

      ***

      ```vue:line-numbers{8-10}
      <!-- 兄弟组件2 -->
      <template> </template>

      <script>
        export default {
          created() {
            // 数据监听
            this.EventBus.$on("test", (val) => {
              console.log(val);
            });
          },
        };
      </script>
      ```

      :::

  3.  Vuex

      如果项目中有大量的数据需要跨组件进行通讯，最好使用专门的数据管理库 Vuex 进行数据管理，具体的使用方式参照
      [Vuex 官方文档](https://vuex.vuejs.org/)。

---

## Vue3 组件通讯

::: tip

Vue3 的通讯方式和 Vue2 类似，因为 component-api 没有了 this，所以在写法上有所区别。

:::

- **父组件向子组件传递数据**

:::details 查看代码

```vue:line-numbers{4,17}
<!-- 父组件 -->
<template>
  <div>
    <child-page :childData="childData"> </child-page>
  </div>
</template>

<script>
  import { ref, defineComponent } from "vue";
  import childPage from "./childPage";

  export default defineComponent({
    components: {
      childPage,
    },
    setup() {
      const childData = ref([1, 2, 3]);
      return {
        childData,
      };
    },
  });
</script>
```

---

```vue:line-numbers{8-16}
<!-- 子组件 -->
<template>
  <div v-for="v in childData" :key="v">{{ v }}</div>
</template>
<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    props: {
      childData: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      console.log(props);
    },
  });
</script>
```

:::

- **父组件调用子组件方法**

  还是通过 `ref` 来完成

:::details 查看代码

```vue:line-numbers{4-5,18-22}
<!-- 父组件 -->
<template>
  <div>
    <child-page ref="chilData"> </child-page>
    <button @click="childFn">调用子组件里面的方法</button>
  </div>
</template>

<script>
  import { ref, defineComponent } from "vue";
  import childPage from "./childPage";

  export default defineComponent({
    components: {
      childPage,
    },
    setup() {
      // 在使用ref定义变量的时候，把变量名称和上面的ref=“xxx”对应起来就可以获取到子组件的实例
      const chilData = ref(null);
      const childFn = () => {
        chilData.value.myFn();
      };
      return {
        chilData,
        childFn,
      };
    },
  });
</script>
```

---

```vue:line-numbers{7-9}
<!-- 子组件 -->
<template><div></div> </template>
<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    setup() {
      const myFn = () => {
        console.log("子组件方法");
      };
      return {
        myFn,
      };
    },
  });
</script>
```

:::

- **子组件向父组件传递数据**

  同样也是通过 `emit` 派发事件的方式进行传递

:::details 查看代码

```vue:line-numbers{4,12-16}
<!-- 子组件 -->
<template>
  <div>
    <button @click="parentFn">调用父组件方法</button>
  </div>
</template>

<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    setup(props, { emit }) {
      const parentFn = () => {
        // 触发父组件中的方法
        emit("par", "from parent ");
      };
      return {
        parentFn,
      };
    },
  });
</script>
```

---

```vue:line-numbers{4,17-19}
<!-- 父组件 -->
<template>
  <div>
    <child-page ref="chilData" @par="parFn"> </child-page>
  </div>
</template>

<script>
  import { ref, defineComponent } from "vue";
  import childPage from "./childPage";

  export default defineComponent({
    components: {
      childPage,
    },
    setup() {
      const parFn = (val) => {
        console.log(val);
      };
      return {
        parFn,
      };
    },
  });
</script>
```

:::

- **子组件调用父组件的方法**

  和子组件向父组件传递数据方式一样。

- **兄弟及跨组件传参**

  1.  provide / inject

      用于跨组件传递，使用上和 Vue2 一致。

  2.  **mitt**（事件总线）

      作用和 Vue2 的 EventBus 一样。只不过现在需要借助于 mitt 插件来完成这件事.

      ```js
      // 安装 mitt
      npm install mitt -S | yarn add miss -S
      ```

      使用 mitt 需要配合 provide/inject 一块使用

      :::details 查看代码

      ```vue:line-numbers{8-9,12-14,19}
      <!-- app.vue -->
      <template>
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
      </template>
      <script>
        import HelloWorld from "./components/HelloWorld.vue";
        import Mitt from "mitt";
        const mitt = Mitt();
        export default {
          name: "App",
          provide: {
            mitt,
          },
          components: {
            HelloWorld,
          },
          setup() {
            mitt.emit("text", "蓝桥");
          },
        };
      </script>
      ```

      ***

      ```vue:line-numbers{10-13}
      <!-- 任意一个子组件 -->
      <template>
        <div>childPage</div>
      </template>

      <script>
        import { inject } from "vue";
        export default {
          setup() {
            const mitt = inject("mitt");
            mitt.on("text", (val) => {
              console.log(val);
            });
          },
        };
      </script>
      ```

      :::

  3.  **Vuex-next**

      Vuex-next 是 Vue3 版本的 Vuex, 具体的使用方式可以看 [Vuex 官方文档](https://vuex.vuejs.org/)。

  4.  **Pinia**

      Pinia 也是 Vue3 的状态管理框架，和 vuex-next 作用类似，但在使用上比 vuex-next 更加简洁，且 Pinia 对 TypeScript 项
      目更加友好， [Pinia 官方文档](https://pinia.vuejs.org/)。

---

## computed 和 watch 区别

**computed 计算属性**

1. 支持缓存，只有依赖数据发生改变，才会重新进行计算
2. 不支持异步，当 computed 内有异步操作时无效，无法监听数据的变化
3. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用 computed

**watch 侦听器**

1. 不支持缓存，数据变，直接会触发相应的操作
2. watch 支持异步
3. 监听数据必须是 data 中声明过或者父组件传递过来的 props 中的数据，当数据变化时，触发其他操作

在 Vue2 和 Vue3 中的使用方式有所不同，如下所示：

:::details 查看代码

```vue:line-numbers{13-18,23-25,27-34,37-39,41-43,45-51,53-55}
<!-- Vue2 中使用 computed 和 watch -->
<template>
  <div>
    <input type="text" v-model="name" />
    <div>{{ myName }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: "",
        info: {
          name: 'aaa',
          age: 18,
          sex: '男'
        },
      };
    },
    computed: {
      // 语法糖写法
      myName() {
        return `我的名字是${this.name}`;
      },
      // 完整写法
      myName:{
        get: function(){
          return `我的名字是${this.name}`
        },
        set:function(value){
          this.name = value
        }
      }
    },
    watch: {
      name(newValue,oldValue) {
        if (newValue.length > 4) alert("您输入的名字过长");
      },
      // 如果监听的是对象类型，则newValue，oldValue值为proxy对象
      info: function (newValue, oldValue) {
        ...
      },
      // 完整写法
      info: {
        handle(newValue, oldValue) {
          console.log(newValue === oldValue) // true
        },
        deep: true, // 对象深度监听，默认为 false
        immediate: true //首次加载立刻执行
      },
      // 深度监听另一种写法,只监听 name 属性
      "info.name":function(newValue, oldValue){
        ...
      }
    },
  };
</script>
```

---

```vue:line-numbers
<!-- Vue3 中使用 computed 和 watch -->
<template>
  <div>
    <input type="text" v-model="name" />
    <div>{{ myName }}</div>
  </div>
</template>

<script>
  import { ref, watch } from "vue";
  export default {
    setup() {
      const name = ref("");
      const myName = computed(() => `我的名字是${name.value}`);
      watch(
        () => name,
        () => {
          if (val.length > 3) alert("您输入的名字过长");
        }
      );
      return {
        name,
        myName,
      };
    },
  };
</script>
```

:::

---

## Vue3 新特性

- **component-api**

component-api 主要是为了解决组件逻辑之间的复用问题，也是 Vue3 最重要的新特性。 在 Vue2 中处理逻辑之间复用关系最常用的就
是混入（Mixin），但是使用 Mixin 有以下弊端：

> 1. 命名空间冲突；
> 2. 如果一个组件使用多个 mixin 的模板时，很难看出某个数据是从哪一个 mixin 中注入的。

- **生命周期的变化**

[Vue2-生命周期](#vue2-生命周期) | [Vue3-生命周期](#vue3-生命周期)

- **Teleport**

Teleport 能够将我们的模板移动到 DOM 中 Vue app 之外的其他位置。

> 比如我们现在嵌套了很多层组件，这个时候需要最里面的组件弹出一个全局的弹框，这个时候可能就会出现弹窗被遮挡的问题，而
> Teleport 可以让我们的弹框挂载到任意的 DOM 元素上，这样就从根本上解决了这个问题。使用方式如下所示：
>
> ```vue
> <teleport to="#targetId">你的弹窗组件</teleport>
> ```

- **根结点**

> 在 2.x 中，不支持多根组件，当用户意外创建多根组件时会发出警告，因此，为了修复此错误，许多组件被包装在一个 `<div>` 中.
>
> 在 3.x 中，组件可以有多个根节点.

- **`<script setup>` 及 `<style> v-bind`**

在 Vue3.2 版本中 setup 可以直接写在 script 标签上面，而且在 style 中可以用 v-bind 方法去使用 script 中的变量.

:::details 查看代码

```vue:line-numbers
<template>
  <button @click="color = color === 'red' ? 'green' : 'red'">
    Color is: {{ color }}
  </button>
</template>

<script setup>
  import { ref } from "vue";
  const color = ref("red");
</script>

<style scoped>
button {
  color: v-bind(color);
}
</style>
```

:::

---

## 不常用的 Composition API

### customRef()

自定义 ref，用来显式控制其依赖项的跟踪和更新触发，接收 `track()` 和 `trigger()` 作为参数。可以使用这个 API 来控制视图更
新时间，以及动态控制处理设置值.

::: details 基本用法

```js
// 显式控制其依赖项跟踪和更新触发
function TestcustomRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        // 触发 get 后，控制台打印信息
        console.log("get" + value);
        return value;
      },
      set(newValue) {
        value = newValue + " set";
        // 触发 set 后，控制台打印信息
        console.log("set" + value);
        // 可以通过这一步控制视图更新时间
        setTimeout(() => {
          trigger();
        }, 1000);
      },
    };
  });
}
```

:::

### markRaw()

`markRaw()` 方法标记一个对象，使其永远不会被转换为代理（Proxy），而是返回对象本身。

::: details 基本用法

```js
const msg = markRaw({
  value: "markraw",
});
// 作为参照
const op = reactive({
  value: "reactive",
});

const setmsg = () => {
  // isReactive()：判断一个某个值是否为 reactive() 创建出来的对象
  console.log("markRaw " + isReactive(reactive(msg))); // false
  console.log("reactive " + isReactive(op)); // true
  msg.value = "";
  console.log(msg); // 一个普通对象
  console.log(op); // 一个经过 Proxy 加工的响应式对象
};
```

:::

### toRaw()

使一个 proxy 只读对象或者 reactive 对象还原为普通对象，可用于临时读取，而不会引起代理访问/跟踪开销或写入而不会触发更改。

::: details 基本用法

```js
const foo = {};
// 创建一个响应式对象
const reactiveFoo = reactive(foo);

console.log(toRaw(reactiveFoo) === foo); // true
```

> 官网提醒：不建议持有对原始对象的持久性引用，需要我们谨慎使用这个 API。

:::

---

## -------注意事项-------

## Vue2 中 methods 内不能用箭头函数

- this 必须有值。 如果在 methods 里使用 data 返回对象中的数据，那么 this 必须是有值的，并且可以通过 this 获取到 data 中
  数据。
- this 不能是 window。window 中无法拿到 data 返回对象中的数据，如果使用箭头函数，this 就会绑定父级作用域的上下文，指向
  window 了。

---

## v-bind 直接绑定对象

组件传值的时候可以直接绑定对象，v-bind 会自动遍历对象内的值，将所有的 key：value 绑定到元素或组件上

:::details 查看代码

```vue:line-numbers{2}
<template>
  <p v-bind="props"></p>
  <!-- 渲染结果 -->
  <!-- <p name:"aaa" age=18 sex="男"></p> -->
</template>

<script>
props = {
  name:"aaa",
  age=18,
  sex="男"
}
</script>
```

:::

---

## 事件监听传递参数

绑定事件时传递明确参数和 event 参数，使用$event

:::details 查看代码

```vue:line-numbers{2}
<template>
  <button @click="add('aaa', 18, $event)">按钮</button>
</template>

<script>
add(name,age,event){
  // name:aaa   age:18   event:点击事件对象
}
</script>
```

:::

---

## v-on 修饰符

![修饰符](/vue/v-on.png)

:::details 查看代码

```vue:line-numbers{2,8}
<template>
  <button @click.stop="add">按钮</button>
</template>

<script>
add(event){
  //  效果等同
  event.stopPropagations()
}
</script>
```

:::

---

## v-if 和 v-show 区别

1. v-show 不支持 template 标签（因为需要设置 display:none，template 不存在，所以无法设置）
2. v-show 会渲染 DOM，通过设置 `display:none` 让其不显示，v-if 为 `false` 时不会渲染 DOM

---

## 数组变化侦测

Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。这些变更方法包括：

`push()` `pop()` `shift()` `unshift()` `splice()` `sort()` `reverse()`

**替换一个数组**

变更方法，顾名思义，就是会对调用它们的原数组进行变更。相对地，也有一些不可变 (immutable) 方法，例如
`filter()`，`concat()` 和 `slice()`，这些都不会更改原数组，而总是返回一个新数组。

当遇到的是非变更方法时，我们需要将旧的数组替换为新的：

```js
this.items = this.items.filter((item) => item.message.match(/Foo/));
```

---

## v-model 修饰符

可以同时使用多个修饰符，如：`v-model.lazy.number.trim`

**.lazy**

> 默认情况下，`v-model` 双向绑定时绑定的是`input`事件，当输入框内容改变时，直接触发。
>
> 而 `v-model.lazy` 会绑定`change`事件，只有输入完之后失去焦点或者点击回车才出发。

**.number**

> `v-model.number`自动将输入的文本转为数字

**.trim**

> `v-model.trim`自动去除文本前后的空格

---

## props 类型如果是 Object 或 Array

props 接受父组件传值类型如果是 Object，则需要使用函数

:::details 查看代码

```vue:line-numbers
<script>
  export default {
    // 可以使用数组
    props:['name','age','sex']

    // 常用写法
    props:{
      name:{
        type: String,
        required: true, // 是否必填，默认为false
        default:'默认值'
      },
      age:{
        type: [Number,String], // 多个可能的类型
        default: 0
      },
      // 类型如果是Object，默认值需要用函数返回一个对象，Array同理
      info:{
        type: Object,
        default: ()=>({name:'默认值',age:0})
      },
      list:{
        type: Array,
        default() {
            return [1,2,3]
          }
      }
    }
  }
</script>

```

:::

---

## 非 Props 的 Attribute

::: tip 介绍

当传递给一个组件某个属性，但是该属性并没有定义对应的 props 或 emits ，称为非 Props 的 Attribute。

:::

当子组件只有单个根节点时，非 Props 的 Attribute 会自动把属性挂到根节点上。

当子组件有多个根节点时，需要显式的绑定，如：`v-bind="$attr"`

:::details 查看案例

```vue:line-numbers
<!-- 父组件 -->
<template>
  <child class='active'> </child>
</template>
```

---

```vue:line-numbers
<!-- 子组件 -->

<!-- 单个根节点，自动挂到根节点上 -->
<template>
  <div>
    <h1></h1>
    <h1></h1>
  </div>
</template>
  渲染结果： <div class="active">xxx</div>

<!-- 多个根节点，需要显式绑定 -->
<template>
  <div class="one" :class="$attr.class">
    <h1></h1>
    <h1></h1>
  </div>
  <div class="two">
    <h1></h1>
    <h1></h1>
  </div>
</template>
  渲染结果： <div class="one active">xxx</div>
            <div class="two">xxx</div>
```

:::
