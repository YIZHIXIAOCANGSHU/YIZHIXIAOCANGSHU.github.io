---
permalink: /markdown/
title: "使用指南"
author_profile: true
redirect_from: 
  - /md/
  - /markdown.html
---

{% include toc %}

## 关键文件/目录的位置

* 基本配置选项：_config.yml
* 顶部导航栏配置：_data/navigation.yml
* 单个页面：_pages/
* 页面集合是以下目录中的.md或.html文件：
  * _publications/
  * _portfolio/
  * _posts/
  * _teaching/
  * _talks/

## 配置网站

整个网站的配置在_config.yml中完成。

### 站点范围的配置

_config.yml文件中的前几行定义站点范围的变量：
```
title                    : "您的网站标题"
email                    : "您的邮箱地址"
description              : "网站简短描述"
baseurl                  : ""
url                      : "http://您的用户名.github.io"
repository               : "您的用户名/您的用户名.github.io"
```

### 出版物配置

在_config.yml文件中定义了出版物分类：
```
publication_category:
  books:
    title: '书籍'
  manuscripts:
    title: '期刊文章'    
  conferences:
    title: '会议论文'
```

### 作者信息配置

作者信息也在_config.yml中定义：
```
author:
  name       : "您的姓名"
  avatar     : "您的头像文件名.jpg"
  email      : "您的邮箱地址"
  location   : "您的位置"
  employer   : "您的雇主"
```

## 创建和发布内容

### 创建页面

页面是独立的内容，如首页、关于页面等。要创建新页面：

1. 在_pages目录中创建新文件（.md格式）
2. 在文件顶部添加YAML头信息：
```
---
layout: archive
title: "页面标题"
permalink: /页面路径/
author_profile: true
---
```

### 创建博客文章

博客文章放在_posts目录中，文件名格式为：YYYY-MM-DD-文章标题.md

在文件顶部添加YAML头信息：
```
---
layout: single
title: "文章标题"
date: YYYY-MM-DD
categories:
  - 分类名
tags:
  - 标签名1
  - 标签名2
---
```

### 创建作品集项目

作品集项目放在_portfolio目录中，文件名格式为：项目标题.md

在文件顶部添加YAML头信息：
```
---
layout: single
title: "项目标题"
collection: portfolio
---
```

## Markdown语法指南

### 标题

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 文本格式

```
*斜体文本*
**粗体文本**
***粗斜体文本***
~~删除线文本~~
```

### 列表

无序列表：
```
* 项目1
* 项目2
* 项目3
```

有序列表：
```
1. 项目1
2. 项目2
3. 项目3
```

### 链接和图片

链接：
```
[链接文本](http://example.com)
```

图片：
```
![替代文本](/images/图片文件名.jpg)
```

### 代码

行内代码：
```
使用 `code` 来表示行内代码。
```

代码块：
```
```
代码块内容
```
```

### 表格

```
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
```

### 引用

```
> 这是一个引用块。
```

## 定制网站

### 更改主题

在_config.yml中更改主题：
```
site_theme: "default"  # 或 "dark"
```

### 添加新页面到导航栏

编辑_data/navigation.yml文件：
```
main:
  - title: "新页面"
    url: /新页面路径/
```

### 自定义CSS

在assets/css/main.scss中添加自定义CSS样式。

## 部署网站

1. 将更改推送到GitHub仓库
2. 等待几分钟让GitHub Pages完成构建
3. 访问 https://您的用户名.github.io 查看网站
