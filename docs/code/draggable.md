# Html5 新增属性 draggable

::: tip draggable

全局属性 draggable 是一个枚举类型的属性，用于标识元素是否允许使用拖放操作拖动。

:::

它的取值如下：

> true：表示元素可以被拖动。
>
> false：表示元素不可以被拖动。

带有属性 draggable 的可拖放元素可用的拖放事件 api 如下：

## 拖动事件

| 事件      | 事件处理程序 | 触发时刻                                                                         |
| --------- | ------------ | -------------------------------------------------------------------------------- |
| dragstart | ondragstart  | 当用户开始拖拽一个元素或选中的文本时触发（光标变为禁用）（常用，保存元素或数据） |
| drag      | ondrag       | 当拖拽元素或选中的文本时触发。                                                   |
| dragend   | ondragend    | 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键)                               |

## 放置事件

| 事件      | 事件处理程序 | 触发时刻                                                                                                                                   |
| --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| dragenter | ondragenter  | 当拖拽元素或选中的文本到一个可释放目标时触发                                                                                               |
| dragover  | ondragover   | 当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次）                                                                      |
| dragleave | ondragleave  | 当拖拽元素或选中的文本离开一个可释放目标时触发。                                                                                           |
| drop      | ondrop       | 当元素或选中的文本在可释放目标上被释放时触发，想要 ondrop 能正确触发，有时需要在前置 dragover 事件中禁用默认行为（常用，放置元素或取数据） |

每个 drag event 都有一个 dataTransfer 属性，其中保存着事件的数据。这个属性
（DataTransfer 对象）也有管理拖拽数据的方法。setData() 方法为拖拽数据添加一个项
，其用法如下所示：

```js
function dragstart_handler(ev) {
  // 添加拖拽数据，key 可以为任意字符串
  ev.dataTransfer.setData("key", "value");
  const data = ev.dataTransfer.getData("key");
}
```

## 拖拽实现流程

设置两个角色，拖动 A 进入 B。

1. 拖动的元素要赋予 draggable 属性，属性值为 true
2. 被拖进的元素要在 dragover 事件中阻止默认行为。(开始拖拽之后，光标变为禁用状态
   ，当元素放入目标元素时，组织默认行为，光标取消禁用)

   ::: details 查看伪代码

   ```js:line-numbers{11-14,16-18,20-23}
    <body>
      <div draggable="true" id="Adiv" class="A">
        A---拖拽的元素
      </div>
      <div id="Bdiv" class="B">
        B---A被拖进的元素
      </div>
    </body>

    <script>
      Adiv.ondragstart = function(e){
        // 保存数据或元素
        e.dataTransfer.setData("key", "value");
      }

      Bdiv.ondragover = function(e){
        e.preventDefault();
      }
      <!-- 此时A元素可以拖入到B元素里面 -->
      Bdiv.ondrop = function(e){
        // 取数据或放置元素
        const data = e.dataTransfer.getData("key");
      }
    </script>
   ```

   :::
