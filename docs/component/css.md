## Flex & Grid 布局

[点此练习](https://codepip.com/games/)

---

## 文本溢出

### 单行文本溢出

```css
width: 300px;
white-space: nowrap; // 文本不会换行。
overflow: hidden; // 溢出多余裁剪
text-overflow: ellipsis; // 显示省略符号来代表被修剪的文本。
```

### 多行文本溢出

```css
display: -webkit-box; // 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示
-webkit-box-orient: vertical; // 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式
-webkit-line-clamp: 3; // 用来限制在一个块元素显示的文本的行数，根据需要写。
overflow: hidden; // 溢出多余裁剪
```

---

## 元素水平垂直居中

1. **水平居中**

   行内元素： `text-align: center`

   块级元素：`margin: 0 auto`

   通用：`absolute + transform`

   通用：`flex + justify-content: center`

2. **垂直居中**

   行内元素：`line-height: height`

   通用：`absolute + transform`

   通用：`flex + align-items: center`

   通用：`table`

3. **div 上下左右居中**

   ```css
   // 整个div定位
   position: absolute;
   left: 50%;
   top: 50%;
   // 根据自身div大小偏移
   transform: translate(-50%, -50%);
   ```

---

## 伪类和伪元素

**CSS3 规定用于区分伪元素，伪类使用 `:` 伪元素使用 `::` 。**

::: tip 伪类

用于已有元素处于某种状态时为其添加对应的样式，这个状态是根据用户行为而动态变化的
。主要是用来描述用户的行为。

:::

| 属性         | 描述                                     |
| ------------ | ---------------------------------------- |
| :active      | 向被激活的元素添加样式。                 |
| :focus       | 向拥有键盘输入焦点的元素添加样式。       |
| :hover       | 当鼠标悬浮在元素上方时，向元素添加样式。 |
| :link        | 向未被访问的链接添加样式。               |
| :visited     | 向已被访问的链接添加样式。               |
| :first-child | 向元素的第一个子元素添加样式。           |
| :lang        | 向带有指定 lang 属性的元素添加样式。     |

::: tip 伪元素

用于创建一些不在 DOM 树中的元素，并为其添加样式。主要用于扩展 DOM。一些简单的样
式可以用伪元素实现，减少项目中图片资源的请求。

:::

| 属性           | 描述                             |
| -------------- | -------------------------------- |
| ::first-letter | 向文本的第一个字母添加特殊样式。 |
| ::first-line   | 向文本的首行添加特殊样式。       |
| ::before       | 在元素之前添加内容。             |
| ::after        | 在元素之后添加内容。             |

---

## 盒模型

::: tip W3C 标准盒模型

内容的宽度 = 设置的宽度(width)

盒子的宽度 = 内容的宽度 + 内边距(padding)\*2 + 外边框(border)\*2

:::

::: details 查看示例图

![W3C盒模型](/html&css/W3C-Box.png)

:::

::: tip IE 盒模型

内容的宽度 = 设置的宽度(width) - 内边距(padding)*2 - 外边框(border)*2

盒子的宽度 = 设置的宽度(width)

:::

::: details 查看示例图

![IE盒模型](/html&css/IE-Box.png)

:::

**总结：** 默认是标准盒模型，当设置 `box-sizing: border-box` 时，div 就会变成 IE
盒模型。两种盒模型的区别就是有没有把 padding 和 border 包含在内（不包含 margin）
，如果包含在内就是 IE 盒模型，否则就是标准盒模型。

---

## 阻止事件冒泡

- event.stopPropagation()

---

## 阻止默认行为

- event.preventDefault() // 比如 a 链接，阻止跳转这种

---

## 常用选择器

![选择器](/html&css/selector.png)

---

## --------CSS3 新特性---------

- CSS3 新增选择器：包括新增属性选择器、子元素伪类选择器、UI 伪类选择器。
- 文本阴影：使用 text-shadow 属性给文本内容设置阴影效果。
- 文本溢出：使用 text-overflow 属性设置当内容溢出容器时，在页面上的显示方式。
- 圆角边框：使用 border-radius 属性设置圆角边框。
- 盒子阴影：使用 box-shadow 属性给元素添加阴影效果。
- 背景属性：包括
  background-size、background-image、background-position、background-repeat。
- 渐变属性：包括线性渐变（linear-gradient）和径向渐变（radial-gradient）。
- 元素转换：包括元素旋转（rotate）、元素移动（translate）、元素缩放（scale）。
- 过渡属性：使用 transition 属性过渡的效果。
- 动画：使用 @keyframes 来定义动画。

---

## 属性选择器

| 选择器        | 描述                                                        |
| ------------- | ----------------------------------------------------------- |
| E[attr^=“xx”] | 选择元素 E，其中 E 元素的 attr 属性是以 xx 开头的任何字符。 |
| E[attr$=“xx”] | 选择元素 E，其中 E 元素的 attr 属性是以 xx 结尾的任何字符。 |
| E[attr*=“xx”] | 选择元素 E，其中 E 元素的 attr 属性是包含 xx 的任何字符。   |

---

## 子元素伪类选择器

| 选择器                | 描述                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------- |
| E:first-child         | 选择元素 E 的**第一个子元素**。                                                               |
| E:last-child          | 选择元素 E 的**最后一个子元素**。                                                             |
| E:nth-child(n)        | 选择元素 E 的**第 n 个子元素**，n 有三种取值，数字、odd 和 even。注意第一个子元素的下标是 1。 |
| E:only-child          | 选择元素 E 下**唯一的子元素**。                                                               |
| E:first-of-type       | 选择父元素下**第一个 E 类型的子元素**。                                                       |
| E:last-of-type        | 选择父元素下**最后一个 E 类型的子元素**。                                                     |
| E:nth-of-type(n)      | 选择父元素下**第 n 个 E 类型的子元素**，n 有三种取值，数字、odd 和 even。                     |
| E:only-of-type        | 选择父元素**唯一的 E 类型的子元素**。                                                         |
| E:nth-last-child(n)   | 选择所有 E 元素**倒数的第 n 个子元素**。                                                      |
| E:nth-last-of-type(n) | 选择所有 E 元素**倒数的第 n 个为 E 的子元素**。                                               |

---

## UI 伪类选择器

| 选择器      | 描述                                 |
| ----------- | ------------------------------------ |
| :focus      | 给获取焦点的元素设置样式。           |
| ::selection | 给页面中被选中的文本内容设置样式。   |
| :checked    | 给被选中的单选框或者复选框设置样式。 |
| :enabled    | 给可用的表单设置样式。               |
| :disabled   | 给不可用的表单设置样式。             |
| :read-only  | 给只读表单设置样式。                 |
| :read-write | 给可读写的表单元素设置样式。         |
| :valid      | 验证有效。                           |
| :invalid    | 验证无效。                           |

---

## 文本阴影

```css
text-shadow: x-offset y-offset blur color;
```

| 值       | 说明                                    |
| -------- | --------------------------------------- |
| x-offset | 必选，沿 x 轴方向的偏移距离，允许负值。 |
| y-offset | 必选，沿 y 轴方向的偏移距离，允许负值。 |
| blur     | 可选，阴影的模糊程度。                  |
| color    | 可选，阴影的颜色。                      |

---

## 盒子阴影

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

| 值       | 说明                             |
| -------- | -------------------------------- |
| h-shadow | 必选，水平阴影的位置，允许负值。 |
| v-shadow | 必选，垂直阴影的位置，允许负值。 |
| blur     | 可选，模糊距离。                 |
| spread   | 可选，阴影的大小。               |
| color    | 可选，阴影的颜色。               |
| inset    | 可选，将外部阴影改为内部阴影。   |

---

## 背景属性

`background-size` 属性可以用来控制背景图像的显示大小。语法如下：

```css
background-size: length|percentage|cover|contain;
```

| 值         | 描述                                                                                                                    |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| length     | 设置背景图片高度和宽度。第一个值设置宽度，第二个值设置高度。如果只给出一个值，第二个是设置为 **auto**（自动）。         |
| percentage | 将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置高度。如果只给出一个值，第二个是设置为"auto（自动）" 。 |
| cover      | 此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。                                                  |
| contain    | 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。                                                      |

**多图背景**

在 CSS3 中，`background-image` 属性的属性值可以包含多个图片的地址。语法如下：

```css
/*图片地址*/
background-image: url(), url(), ..., url();
```

若想让图片放在我们想要的位置，可以使用 `background-position` 属性设置图片显示的
位置。语法如下：

```css
/*图片显示的位置*/
background-position: position1, position2, ..., positionN;
```

若想要设置图片是否重复显示在页面上，我们可以添加 `background-repeat` 属性。语法
如下：

```css
/*图片是否重复*/
background-repeat: repeat1, repeat2, ..., repeatN;
```

---

## 渐变属性

**线性渐变**

线性渐变是向下、向上、向左、向右、对角方向的颜色渐变。

```css
background-image: linear-gradient(side-or-corner|angle, linear-color-stop);
```

| 值                | 描述                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| side-or-corner    | 描述渐变线的起始位置，包含两个关键词：第一个指出水平位置 left or right，第二个指出垂直位置 top or bottom。 |
| angle             | 用角度值来指定渐变的方向。                                                                                 |
| linear-color-stop | 设置渐变的颜色值。                                                                                         |

::: details 查看案例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #linear {
        display: flex;
      }
      /*从上到下线性渐变*/
      .gradient1 {
        width: 100px;
        height: 100px;
        background-image: linear-gradient(#ff577f, #c6c9ff);
      }
      /*从左到右线性渐变*/
      .gradient2 {
        margin-left: 10px;
        width: 100px;
        height: 100px;
        background-image: linear-gradient(to right, #ff9d72, #c6c9ff);
      }
      /*从左上角到右下角的渐变*/
      .gradient3 {
        margin-left: 10px;
        width: 100px;
        height: 100px;
        background-image: linear-gradient(to bottom right, #8ad7c1, #c6c9ff);
      }
      /*定义角度的渐变*/
      .gradient4 {
        margin-left: 10px;
        width: 100px;
        height: 100px;
        background-image: linear-gradient(50deg, #bc6ff1, #ffd5cd);
      }
    </style>
  </head>
  <body>
    <div id="linear">
      <div class="gradient1"></div>
      <div class="gradient2"></div>
      <div class="gradient3"></div>
      <div class="gradient4"></div>
    </div>
  </body>
</html>
```

:::

**重复性线性渐变**

重复性线性渐变是用重复的线性渐变组成的 `<image>`，它与线性渐变的区别在于，它会在
所有方向上重复渐变来覆盖整个元素。

```css
background-image: repeating-linear-gradient(side-or-corner|angle, color-stop);
```

| 值             | 描述                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| side-or-corner | 描述渐变线的起始位置，它包含 to 和两个关键词：第一个指出水平位置 left or right，第二个指出垂直位置 top or bottom。 |
| angle          | 用角度值来指定渐变的方向。                                                                                         |
| color-stop     | 由一个 `<color>` 组成，并且跟随一个可选的终点位置。                                                                |

:::details 查看案例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        width: 200px;
        height: 200px;
        display: inline-block;
        margin-left: 20px;
        margin-top: 20px;
      }
      .item1 {
        background-image: repeating-linear-gradient(
          45deg,
          #8843f8 0%,
          #ef2f88 5%,
          #f47340 10%,
          #f9d371 15%
        );
      }
      .item2 {
        background-image: repeating-linear-gradient(
          to left top,
          #8843f8 0%,
          #ef2f88 5%,
          #f47340 10%,
          #f9d371 15%
        );
      }
    </style>
  </head>
  <body>
    <div class="item1"></div>
    <div class="item2"></div>
  </body>
</html>
```

:::

**径向渐变**

径向渐变是由元素中间定义的渐变。

```css
background-image: radial-gradient(shape, color-stop);
```

| 值         | 描述                                                           |
| ---------- | -------------------------------------------------------------- |
| shape      | 设置渐变的形状，其取值有 `circle`（圆形） 和 `ellipse`（椭圆） |
| color-stop | 设置某个确定位置的颜色值。                                     |

:::details 查看案例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #radial {
        display: flex;
      }
      /*均匀分布径向渐变*/
      .gradient1 {
        width: 100px;
        height: 100px;
        background-image: radial-gradient(#ff577f, #c6c9ff, #8ad7c1);
      }
      /*不均匀渐变*/
      .gradient2 {
        margin-left: 10px;
        width: 100px;
        height: 100px;
        background-image: radial-gradient(#8bcdcd 5%, #ff9d72, #c6c9ff);
      }
      /*椭圆形渐变*/
      .gradient3 {
        margin-left: 10px;
        width: 100px;
        height: 100px;
        background-image: radial-gradient(ellipse, #8ad7c1, #c6c9ff, #fce2ce);
      }
      /*圆形渐变*/
      .gradient4 {
        margin-left: 10px;
        width: 100px;
        height: 100px;
        background-image: radial-gradient(circle, #bc6ff1, #ffd5cd, #b6eb7a);
      }
    </style>
  </head>
  <body>
    <div id="radial">
      <div class="gradient1"></div>
      <div class="gradient2"></div>
      <div class="gradient3"></div>
      <div class="gradient4"></div>
    </div>
  </body>
</html>
```

:::

**重复性径向渐变**

重复性径向渐变是用重复性的径向渐变组成的图像。它与径向渐变的区别在于，它会从原点
开始重复径向渐变来覆盖整个元素。

```css
background: repeating-radial-gradient(extent-keyword, color-stop);
```

| 值             | 描述                                                                   |
| -------------- | ---------------------------------------------------------------------- |
| extent-keyword | 描述边缘轮廓的具体位置，关键字常量如下所示 ![](/html&css/gradient.png) |
| color-stop     | 设置某个确定位置的颜色值。                                             |

:::details 查看案例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        width: 200px;
        height: 200px;
        display: inline-block;
        margin-left: 20px;
        margin-top: 20px;
      }
      .gradient1 {
        background: repeating-radial-gradient(
          closest-corner,
          #8843f8 0%,
          #ef2f88 5%,
          #f47340 10%,
          #f9d371 15%
        );
      }
      .gradient2 {
        background: repeating-radial-gradient(
          farthest-side,
          #8843f8,
          #ef2f88,
          #f47340,
          #f9d371
        );
      }
    </style>
  </head>
  <body>
    <div class="gradient1"></div>
    <div class="gradient2"></div>
  </body>
</html>
```

:::

---

## 元素转换

**旋转函数（rotate）**

```css
transform: rotate(角度); /*元素按原点旋转，正数顺时针，负数逆时针*/
transform: rotateX(角度); /*元素按X轴旋转*/
transform: rotateY(角度); /*元素按Y轴旋转*/
```

**移动函数（translate）**

```css
transform: translate(移动值); /*元素按照指定值沿着 X 轴和 Y 轴移动*/
transform: translateX(移动值); /*元素按照指定值沿着 X 轴移动*/
transform: translateY(移动值); /*元素按照指定值沿着 Y 轴移动*/
```

**缩放函数（scale）**

```css
transform: scale(缩放值); /*元素按照指定值沿着 X 轴和 Y 轴缩放*/
transform: scaleX(缩放值); /*元素按照指定值沿着 X 轴缩放*/
transform: scaleY(缩放值); /*元素按照指定值沿着 Y 轴缩放*/
```

---

## 过渡

CSS3 过渡是元素从一种样式逐渐过渡到另一种样式。

```css
transition: 指定属性 持续时间 速度曲线 开始时间;
```

它是一个复合属性，也可以如下分开使用这几个属性。

```css
transition-property: 属性值; /*指定属性名*/
transition-duration: 属性值; /*完成过渡这一过程的时间*/
transition-timing-function: 属性值; /*速度曲线*/
transition-delay: 属性值; /*过渡的开始时间*/
```

`transition-timing-function` 属性用来设置过渡效果从开始到结束的时间曲线，它有很
多可用属性值，常用属性值如下表所示。

| 属性值                    | 说明                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| ease                      | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。                       |
| linear                    | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。                                      |
| ease-in                   | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。                                             |
| ease-out                  | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。                                             |
| ease-in-out               | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。                                    |
| steps(int,start 或者 end) | steps() 有两个参数，第一个为步长，其值必须为整数，第二个值为可选值，它有两个取值，分别是 start 和 end。 |
| step-start                | 相当于 steps(1, start)。                                                                                |
| step-end                  | 相当于 steps(1, end)。                                                                                  |
| cubic-bezier(n,n,n,n)     | 规定在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。                                  |
| initial                   | 规定使用默认值。                                                                                        |
| inherit                   | 规定从父元素继承该属性值。                                                                              |

---

## 动画

`@keyframes` 被称为关键帧，它能够设置一些元素的样式，让该元素可以从原来的样式渐
渐过渡到新的样式中。其语法格式如下所示：

```css
@keyframes 动画名
{
    0% {样式属性：属性值;}
    25% {样式属性：属性值;}
    50% {样式属性：属性值;}
    100% {样式属性：属性值;}
}
```

这里的百分比是用来规定动画发生变化的时间的，`0%` 代表动画的开始，`100%` 代表动画
的结束，中间的可以自定义。

将 `@keyframes` 创建的动画绑定到选择器上，通过 `animation` 属性就能实现动画效果
了，其语法格式为：

```css
animation: 动画名 完成动画的周期 是否重复;
```

`animation` 属性是一个复合属性，它的子属性如下所示。

| 属性                      | 描述                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| animation-name            | 规定 @keyframes 动画的名称。                                                             |
| animation-duration        | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。                                         |
| animation-timing-function | 规定动画的速度曲线。默认是 "ease"。                                                      |
| animation-fill-mode       | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 |
| animation-delay           | 规定动画何时开始。默认是 0。                                                             |
| animation-iteration-count | 规定动画被播放的次数。默认是 1。                                                         |
| animation-direction       | 规定动画是否在下一周期逆向地播放。默认是 "normal"。                                      |

---

## 弹性盒子 flex

:::tip 弹性盒子

在 CSS3 中给 display 属性增加了新的属性值 flex，如果一个元素被设置
display:flex，说明该元素为弹性布局，也就是个弹性盒子。

:::

flex 主要由两个轴来控制布局（main axis 是主轴，cross axis 是交叉轴），如下图所示
。

![弹性盒子](/html&css/flex.png)

在这个弹性盒子中，提供了一些属性来操作这些元素，如下：

- **flex-direction 属性**

  `flex-direction` 属性指定了弹性子元素在父容器中的排列方向和顺序。

  ```css
  flex-direction: row | row-reverse | column | column-reverse;
  ```

  | 属性值         | 描述                                                     |
  | -------------- | -------------------------------------------------------- |
  | row            | 横向从左到右排列（左对齐），默认的排列方式。             |
  | row-reverse    | 反转横向排列（右对齐），从后往前排，最后一项排在最前面。 |
  | column         | 纵向排列                                                 |
  | column-reverse | 反转纵向排列，从后往前排，最后一项排在最上面。           |

- **flex-wrap 属性**

  `flex-wrap` 属性用于指定弹性盒子的子元素换行方式。

  ```css
  flex-wrap: nowrap|wrap|wrap-reverse|initial|inherit;
  ```

  | 属性值       | 描述                                                                           |
  | ------------ | ------------------------------------------------------------------------------ |
  | nowrap       | 默认， 弹性容器为单行。该情况下弹性子项可能会溢出容器。                        |
  | wrap         | 弹性容器为多行。该情况下弹性子项溢出的部分会被放置到新行，子项内部会发生断行。 |
  | wrap-reverse | 反转 wrap 排列。                                                               |

- **align-items 属性**

  `align-items` 属性是用来设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式。

  ```css
  align-items: flex-start | flex-end | center | baseline | stretch;
  ```

  | 属性值     | 描述                                                                                                                                    |
  | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
  | flex-start | 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。                                                                      |
  | flex-end   | 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。                                                                      |
  | center     | 弹性盒子元素在该行的侧轴（纵轴）上居中放置。                                                                                            |
  | baseline   | 如弹性盒子元素的行内轴与侧轴为同一条，则该值与 `flex-start` 等效。其它情况下，该值将参与基线对齐。                                      |
  | stretch    | 如果指定侧轴大小的属性值为 `auto`，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照 `min/max-width/height` 属性的限制。 |

- **align-content 属性**

  `align-content` 属性可以用于控制多行的对齐方式，如果只有一行则不会起作用。

  ```css
  align-content: flex-start | flex-end | center | space-between | space-around |
    stretch;
  ```

  | 属性值        | 描述                                                                   |
  | ------------- | ---------------------------------------------------------------------- |
  | stretch       | 默认。各行将会伸展以占用剩余的空间。                                   |
  | flex-start    | 各行向弹性盒容器的起始位置堆叠。                                       |
  | flex-end      | 各行向弹性盒容器的结束位置堆叠。                                       |
  | center        | 各行向弹性盒容器的中间位置堆叠。                                       |
  | space-between | 各行在弹性盒容器中平均分布。                                           |
  | space-around  | 各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。 |
