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

用于已有元素处于某种状态时为其添加对应的样式，这个状态是根据用户行为而动态变化的。主要是用来描述用户的行为。

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

用于创建一些不在 DOM 树中的元素，并为其添加样式。主要用于扩展 DOM。一些简单的样式可以用伪元素实现，减少项目中图片资源的
请求。

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

**总结：** 默认是标准盒模型，当设置 `box-sizing: border-box` 时，div 就会变成 IE 盒模型。两种盒模型的区别就是有没有把
padding 和 border 包含在内（不包含 margin），如果包含在内就是 IE 盒模型，否则就是标准盒模型。

---

## 常用选择器

![选择器](/html&css/selector.png)

## 阻止事件冒泡

- event.stopPropagation()

## 阻止默认行为

- event.preventDefault() // 比如 a 链接，阻止跳转这种
