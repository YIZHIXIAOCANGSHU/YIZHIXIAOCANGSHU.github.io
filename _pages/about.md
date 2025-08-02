---
permalink: /
title: "个人作品合集网站"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

这是我个人的一个作品合集。仅供HR对我过往做过的东西进行一个介绍。
这是由[Academic Pages模板](https://github.com/academicpages/academicpages.github.io)驱动的网站的首页，并托管在GitHub pages上。[GitHub pages](https://pages.github.com)是一项免费服务，网站从存储在GitHub仓库中的代码和数据构建和托管，当仓库有新提交时会自动更新。此模板是从Michael Rose创建的[Minimal Mistakes Jekyll Theme](https://mmistakes.github.io/minimal-mistakes/)派生而来，然后扩展以支持学术内容：出版物、演讲、教学、作品集、博客文章和动态生成的简历。顺便说一下，这些功能也使它成为任何需要展示专业模板的人的绝佳选择！

您可以立即派生[此模板](https://github.com/academicpages/academicpages.github.io)，修改配置和Markdown文件，添加您自己的PDF和其他内容，并免费拥有自己的网站，无广告！

数据驱动的个人网站
======
像许多其他基于Jekyll的GitHub Pages模板一样，Academic Pages使您能够将网站的内容与形式分离。网站的内容和元数据在结构化的Markdown文件中，而其他各种文件构成主题，指定如何将这些内容和元数据转换为HTML页面。您将这些Markdown(.md)、YAML(.yml)、HTML和CSS文件保存在公共GitHub仓库中。每次您提交并推送更新到仓库时，[GitHub pages](https://pages.github.com/)服务会基于这些文件创建静态HTML页面，这些页面托管在GitHub的服务器上，免费提供。

动态内容管理系统（如Wordpress）的许多功能都可以通过这种方式实现，使用一小部分计算资源，且更不容易受到黑客攻击和DDoS攻击。您还可以随意修改主题而不触及网站内容。如果您到了在Jekyll/HTML/CSS中破坏了某些东西无法修复的地步，描述您的演讲、出版物等的Markdown文件是安全的。您可以回滚更改甚至删除仓库并重新开始——只需确保保存Markdown文件！您还可以编写处理网站上结构化数据的脚本，例如[这个](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb)分析演讲页面中的元数据以显示[您发表演讲的每个地点的地图](https://academicpages.github.io/talkmap.html)。

对于需要更高级功能的用户，模板还支持以下流行工具：
- [MathJax](https://www.mathjax.org/) 用于数学方程式
- [Mermaid](https://mermaid.js.org/) 用于图表
- [Plotly](https://plotly.com/javascript/) 用于绘图

入门指南
======
1. 如果您没有GitHub账户，请注册一个并确认您的电子邮件（必需！）
1. 通过点击右上角的"Use this template"按钮派生[此模板](https://github.com/academicpages/academicpages.github.io)。
1. 转到仓库设置（以"Code"开头的标签中的最右边项目，应该在"Unwatch"下方）。将仓库重命名为"[your GitHub username].github.io"，这也将是您的网站URL。
1. 设置站点范围的配置并创建内容和元数据（见下文——另请参见[这组差异](http://archive.is/3TPas)显示为用户名为"getorg-testacct"的用户设置[示例站点](https://getorg-testacct.github.io)时更改了哪些文件）
1. 将任何文件（如PDF、.zip文件等）上传到files/目录。它们将出现在https://[your GitHub username].github.io/files/example.pdf。
1. 通过转到仓库设置，在"GitHub pages"部分检查状态

站点范围的配置
------
站点的主要配置文件在基础目录中的[_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml)，它定义了侧边栏中的内容和其他站点范围的功能。您需要将默认变量替换为关于您自己和您的站点GitHub仓库的变量。顶部菜单的配置文件在[_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml)中。例如，如果您没有作品集或博客文章，可以从navigation.yml文件中删除这些项目以从页眉中删除它们。

创建内容和元数据
------
对于站点内容，每种类型的内容都有一个Markdown文件，存储在目录中，如_publications、_talks、_posts、_teaching或_pages。例如，每次演讲都是_talks目录中的一个Markdown文件。在每个Markdown文件的顶部是关于演讲的YAML结构化数据，主题将解析这些数据来做很多很酷的事情。关于演讲的相同结构化数据用于生成[Talks页面](https://academicpages.github.io/talks)上的演讲列表，每个[单独页面](https://academicpages.github.io/talks/2012-03-01-talk-1)用于特定演讲，[CV页面](https://academicpages.github.io/cv)的演讲部分，以及[您发表演讲地点的地图](https://academicpages.github.io/talkmap.html)（如果您运行此[python文件](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py)或[Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb)，它基于_talks目录的内容创建地图的HTML）。

<embed src="/files/心电测试报告-贺禄文-20234232.pdf" type="application/pdf" width="100%" height="600px" />
<iframe src="/files/心电测试报告-贺禄文-20234232.pdf" width="100%" height="600px"></iframe>
**Markdown生成器**

仓库包含[一组Jupyter notebooks](https://github.com/academicpages/academicpages.github.io/tree/master/markdown_generator)，将包含有关演讲或演示文稿的结构化数据的CSV转换为将正确格式化的单个Markdown文件，以适应Academic Pages模板。该目录中的示例CSV是我用来创建自己在stuartgeiger.com的个人网站的。我的通常工作流程是保持一个我的出版物和演讲的电子表格，然后运行这些笔记本中的代码生成Markdown文件，然后提交并推送到GitHub仓库。

如何编辑您站点的GitHub仓库
------
许多人使用git客户端在本地计算机上创建文件，然后将它们推送到GitHub的服务器。如果您不熟悉git，可以直接在github.com界面中直接编辑这些配置和Markdown文件。导航到一个文件（如[这个](https://github.com/academicpages/academicpages.github.io/blob/master/_talks/2012-03-01-talk-1.md），然后点击内容预览右上角的铅笔图标（在"Raw | Blame | History"按钮的右侧）。您可以通过点击铅笔图标右侧的垃圾桶图标删除文件。您还可以通过导航到目录并点击"Create new file"或"Upload files"按钮来创建新文件或上传文件。

示例：编辑演讲的Markdown文件

