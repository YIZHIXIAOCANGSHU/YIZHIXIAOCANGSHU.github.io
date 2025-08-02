---
title: "带内容的归档布局"
layout: archive
permalink: /archive-layout-with-content/
---

各种常见的标记展示主题样式。

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 引用

单行引用：

> 引用很酷。

## 表格

| 条目             | 项目   |                                                              |
| --------         | ------ | ------------------------------------------------------------ |
| [张三](#)        | 2016   | 列表中项目的描述                                             |
| [李四](#)        | 2019   | 列表中项目的描述                                             |
| [王五](#)        | 2022   | 列表中项目的描述                                             |

| 表头1 | 表头2 | 表头3 |
|:--------|:-------:|--------:|
| 单元格1   | 单元格2   | 单元格3   |
| 单元格4   | 单元格5   | 单元格6   |
|-----------------------------|
| 单元格1   | 单元格2   | 单元格3   |
| 单元格4   | 单元格5   | 单元格6   |
|=============================|
| 表尾1   | 表尾2   | 表尾3   |

## 定义列表

定义列表标题
:   定义列表分区。

初创公司
:   初创公司或初创企业是为寻找可重复和可扩展的商业模式而设计的公司或临时组织。

#努力工作
:   由Rob Dyrdek和他的私人保镖Christopher "Big Black" Boykins创造，"Do Work"作为自我激励器，激励你的朋友。

现场直播
:   我会让Bill O'Reilly来[解释](https://www.youtube.com/watch?v=O_HyZ5aW76c "We'll Do It Live")这个。

## 无序列表（嵌套）

  * 列表项一 
      * 列表项一 
          * 列表项一
          * 列表项二
          * 列表项三
          * 列表项四
      * 列表项二
      * 列表项三
      * 列表项四
  * 列表项二
  * 列表项三
  * 列表项四

## 有序列表（嵌套）

  1. 列表项一 
      1. 列表项一 
          1. 列表项一
          2. 列表项二
          3. 列表项三
          4. 列表项四
      2. 列表项二
      3. 列表项三
      4. 列表项四
  2. 列表项二
  3. 列表项三
  4. 列表项四

## 按钮

通过应用`.btn`类使任何链接更加突出。

## 通知

**小心！** 您也可以通过在段落末尾添加`{: .notice}`来添加通知。
{: .notice}

## HTML标签

### 地址标签

<address>
  1 Infinite Loop<br /> Cupertino, CA 95014<br /> 美国
</address>

### 锚标签（即链接）

这是一个[链接](http://github.com "GitHub")的例子。

### 缩写标签

CSS代表"Cascading Style Sheets"。

*[CSS]: 层叠样式表

### 引用标签

"代码就是诗歌。" ---<cite>Automattic</cite>

### 代码标签

在这些测试的后面你会学到`word-wrap: break-word;`将成为你最好的朋友。

### 删除线标签

这个标签可以让你<strike>删除文本</strike>。

### 强调标签

强调标签应该将文本设为_斜体_。

### 插入标签

这个标签应该表示<ins>插入的</ins>文本。

### 键盘标签

这个鲜为人知的标签模拟<kbd>键盘文本</kbd>，通常样式类似于`<code>`标签。

### 预格式化标签

这个标签用于大型代码块。

<pre>
.post-title {
  margin: 0 0 5px;
  font-weight: bold;
  font-size: 38px;
  line-height: 1.2;
  and here's a line of some really, really, really, really long text, just to see how the PRE tag handles it and to find out how it overflows;
}
</pre>

### 引用标签

<q>开发者，开发者，开发者&#8230;</q> &#8211;Steve Ballmer

### 粗体标签

这个标签显示**粗体文本**。

### 下标标签

通过H<sub>2</sub>O进行科学样式设计，应该将"2"向下推。

### 上标标签

仍然坚持科学和艾萨克·牛顿的E = MC<sup>2</sup>，应该将2向上提。

### 变量标签

这允许你表示<var>变量</var>。

{% include base_path %}
{% for post in site.pages %}
{% include archive-single.html %}
{% endfor %}