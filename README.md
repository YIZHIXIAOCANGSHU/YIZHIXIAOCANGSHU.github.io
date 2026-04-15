# 个人作品集网站

基于 [Academic Pages](https://github.com/academicpages/academicpages.github.io) 搭建的个人网站，用来整理我的比赛经历、课程作业、实验室工作和个人简历。

仓库地址：<https://github.com/YIZHIXIAOCANGSHU/YIZHIXIAOCANGSHU.github.io>  
站点类型：Jekyll + GitHub Pages

![网站预览](images/homepage.png)

## 网站内容

当前站点主要包含以下几个板块：

- `比赛经历`：机器人与竞赛项目展示，例如点足机器人、RoboMaster、RC 足式、智能车等
- `课程作业`：课程设计与实践记录，例如自动控制创意台灯、心电检测系统、人脸识别系统等
- `实验室工作`：实验室阶段性项目与研究记录
- `简历`：教育背景、技能、项目经历与综合时间轴

对应导航配置见 `_data/navigation.yml`。

## 技术栈

- `Jekyll`：静态站点生成
- `GitHub Pages`：托管与部署
- `Sass`：样式管理
- `JavaScript` + `jQuery` + `FitVids`：前端交互
- `Bundler` / `npm`：依赖与构建脚本管理

## 目录结构

```text
.
├── _config.yml          # 站点主配置
├── _data/               # 导航、文案等数据文件
├── _pages/              # 静态页面
├── _projects/           # 比赛经历 / 项目内容
├── _coursework/         # 课程作业内容
├── _labwork/            # 实验室工作内容
├── _includes/           # 页面组件
├── _layouts/            # 布局模板
├── _sass/               # Sass 样式
├── assets/              # CSS / JS / 字体等静态资源
├── images/              # 图片资源
├── files/               # PDF、附件等下载文件
└── start.bat            # Windows 本地启动脚本
```

## 本地运行

### 环境要求

- Ruby
- Bundler
- Node.js
- Git

### 安装依赖

```bash
bundle install
npm install
```

如果 `bundle install` 有权限问题，可以改为本地路径安装：

```bash
bundle config set --local path "vendor/bundle"
bundle install
```

### 启动开发服务器

Windows 下可以直接运行：

```bash
start.bat
```

实际执行的命令为：

```bash
bundle exec jekyll serve --drafts --host 127.0.0.1 --port 4000 --force_polling
```

启动后访问：<http://127.0.0.1:4000>

## 常用命令

```bash
# 本地预览
bundle exec jekyll serve --drafts --host 127.0.0.1 --port 4000 --force_polling

# 生成静态站点
bundle exec jekyll build

# 清理构建产物
bundle exec jekyll clean

# 压缩前端 JS
npm run build:js

# 监听 JS 变更并自动压缩
npm run watch:js
```

## 内容维护

### 新增比赛经历

在 `_projects/` 下新增 Markdown 文件，例如：

```markdown
---
title: "项目名称"
excerpt: "项目简介"
collection: projects
permalink: /projects/project-name/
date: 2026-01-01
---

这里填写项目正文。
```

### 新增课程作业

在 `_coursework/` 下新增 Markdown 文件。

### 新增实验室工作

在 `_labwork/` 下新增 Markdown 文件。

### 修改首页或静态页面

- 首页说明：`_pages/about.md`
- 简历页：`_pages/cv.md`
- 比赛经历列表：`_pages/projects.html`
- 课程作业列表：`_pages/coursework.html`
- 实验室工作列表：`_pages/labwork.html`

### 修改站点全局信息

编辑 `_config.yml`，可调整：

- 网站标题、语言、主题
- 作者头像、简介、邮箱、社交链接
- 集合输出规则
- 插件与 SEO 配置

当前默认主题配置为：

```yaml
locale: "zh-CN"
site_theme: "geek"
title: "作品合集"
```

## 部署说明

本项目适合部署到 GitHub Pages。常规流程如下：

```bash
git add .
git commit -m "Update site content"
git push origin main
```

推送后可通过 GitHub Pages 或 GitHub Actions 自动完成构建与发布。

## 致谢

- 原始模板来源：[Academic Pages](https://github.com/academicpages/academicpages.github.io)
- 主题基础来自 Minimal Mistakes 生态

## 联系方式

- Email: `2752722697@qq.com`
- GitHub: [@YIZHIXIAOCANGSHU](https://github.com/YIZHIXIAOCANGSHU)
