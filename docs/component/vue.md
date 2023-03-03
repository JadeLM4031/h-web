## Vue2 生命周期

- **beforeCreate()**（创建前）
  > 在实例初始化之后，数据观察 (data observer) 和 event/watcher 事件配置之前被调
  > 用。
- **created()**（创建后）
  > 在实例创建完成后被立即调用。在这一步，实例已完成以下 的配置：数据观察 (data
  > observer)，属性和方法的运算，watch/event 事件回调。这时 ，挂载阶段还没开始
  > ，$el 属性目前尚不可用。
- **beforeMount()**（载入前）
  > 在挂载开始之前被调用，相关的 render 函数首次被调 用，该钩子函数在服务器渲染
  > 期间不被调用。
- **mounted()**（载入后）
  > 实例被挂载后调用，这时 $el 被新创建的 vm.$el 替换了。 如果根实例挂载到了一个
  > 文档内的元素上，当 mounted() 被调用时 vm.$el 也在文档内 。
- **beforeUpdate()**（更新前）
  > 是在 DOM 树生成之前、虚拟 DOM 树生成之后调用，调 用条件是这个 vm 实例已经
  > mounted()过。该钩子函数在服务器渲染期间不被调用。
- **updated()**（更新后）
  > 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后 会调用该钩子。
- **beforeDestroy()**（销毁前）
  > 实例销毁之前调用。在这一步，实例仍然完全可用。
- **destroyed()**（销毁后）
  > 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有 指令都被解绑，所有的事件
  > 监听器被移除，所有的子实例也都被销毁。

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

Vue3 兼容 Vue2 语法，在 Vue3 中也可以使用 Vue2 的回调函数（beforeDestroy() 和
destroyed() 除外），混合使用时，Vue3 的生命周期会优先于 Vue2 执行。

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

## customRef()

自定义 ref，用来显式控制其依赖项的跟踪和更新触发，接收 `track()` 和 `trigger()`
作为参数。可以使用这个 API 来控制视图更新时间，以及动态控制处理设置值.

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

## markRaw()

`markRaw()` 方法标记一个对象，使其永远不会被转换为代理（Proxy），而是返回对象本
身。

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

## toRaw()

使一个 proxy 只读对象或者 reactive 对象还原为普通对象，可用于临时读取，而不会引
起代理访问/跟踪开销或写入而不会触发更改。

::: details 基本用法

```js
const foo = {};
// 创建一个响应式对象
const reactiveFoo = reactive(foo);

console.log(toRaw(reactiveFoo) === foo); // true
```

> 官网提醒：不建议持有对原始对象的持久性引用，需要我们谨慎使用这个 API。

:::
