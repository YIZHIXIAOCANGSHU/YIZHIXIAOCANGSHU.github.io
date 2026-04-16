# 个人作品集网站

基于 [Academic Pages](https://github.com/academicpages/academicpages.github.io) 搭建的个人网站，用来整理比赛经历、课程作业、实验室工作、简历与时间轴内容。当前版本已经把三个入口页与所有详情页统一为一套更接近简历页的视觉与写法，方便展示，也方便持续维护。

仓库地址：<https://github.com/YIZHIXIAOCANGSHU/YIZHIXIAOCANGSHU.github.io>  
站点类型：`Jekyll + GitHub Pages`

![网站预览](images/homepage.png)

## 网站内容

当前站点主要包含以下板块：

- `比赛经历`：机器人竞赛与工程复刻项目展示
- `课程作业`：课程设计、实验项目与系统实现记录
- `实验室工作`：实验室方向整理、方案分析与研究记录
- `简历`：教育背景、核心优势、重点项目、实验室与课程实践总览
- `时间轴`：综合经历的时间维度整理

对应导航配置见 `_data/navigation.yml`。

## 统一页面体系

为了让三个子页面和简历页保持一致，目前站点采用两层结构：

1. `Hub 页面`：对应 `_pages/projects.html`、`_pages/coursework.html`、`_pages/labwork.html`，负责总览展示。
2. `Detail 页面`：对应 `_projects/`、`_coursework/`、`_labwork/` 下的具体 Markdown 文件，负责详细记录。

三个 Hub 页面统一使用卡片化布局、摘要标签、行动按钮和简介区块；所有 Detail 页面统一使用同一套详情布局，并按模板撰写为：

- `页面简介`
- `主要内容`
- `进展 / 结果`
- `相关链接`
- `技术细节与补充记录（可选）`

这样做的好处是：

- 首页入口风格统一，和 `/cv/` 的视觉语言更接近。
- 详情页不再依赖默认博客样式，整体更像作品集而不是归档页。
- 后续新增页面时，只需要照着模板写即可，维护成本更低。

## 关键文件

### 页面与布局

- `_pages/projects.html`：比赛经历总览页
- `_pages/coursework.html`：课程作业总览页
- `_pages/labwork.html`：实验室工作总览页
- `_pages/cv.md`：简历数据入口页
- `_layouts/subpage-hub.html`：三个总览页共用布局
- `_layouts/subpage-detail.html`：项目 / 课程 / 实验室详情页共用布局
- `_includes/subpage-hub.html`：Hub 页内容组件
- `_drafts/subpage-template.md`：新增详情页时的推荐模板

### 样式与组件

- `assets/css/subpage-layout.css`：三个总览页与详情页的统一样式
- `assets/css/cv-layout.css`：简历页专属样式
- `_includes/hr-resume.html`：简历页主体模板
- `_includes/horizontal-timeline.html`：时间轴组件

### 内容目录

- `_projects/`：比赛经历详情页
- `_coursework/`：课程作业详情页
- `_labwork/`：实验室工作详情页
- `images/`：图片资源
- `files/`：PDF、附件等下载文件

## 技术栈

- `Jekyll`：静态站点生成
- `GitHub Pages`：托管与部署
- `Sass / CSS`：样式管理
- `JavaScript` + `jQuery`：前端交互
- `Bundler` / `npm`：依赖与构建脚本管理

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

实际执行命令为：

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

### 新增比赛经历 / 课程作业 / 实验室页面

推荐步骤：

1. 复制 `_drafts/subpage-template.md`。
2. 放到正确目录：`_projects/`、`_coursework/` 或 `_labwork/`。
3. 修改 `title`、`excerpt`、`collection`、`permalink`、`tags`。
4. 按统一章节填写内容。
5. 如果内容很多，可以在模板基础上继续追加图文、表格、PDF 或附录。

### 维护三个总览页

三个 Hub 页面现在采用“页面数据 + 共用组件”的方式维护：

- 数据入口：`_pages/projects.html`、`_pages/coursework.html`、`_pages/labwork.html`
- 共用组件：`_includes/subpage-hub.html`
- 共用样式：`assets/css/subpage-layout.css`

常见修改入口：

- 修改某个总览页的 Hero 文案、标签、统计卡片：编辑对应 `_pages/*.html` 中的 `subpage:` 数据
- 调整三个总览页和详情页的统一视觉：编辑 `assets/css/subpage-layout.css`
- 调整 Hub 页面结构：编辑 `_includes/subpage-hub.html`
- 调整详情页公共头部和底部行为：编辑 `_layouts/subpage-detail.html`

### 维护简历页

简历页仍采用数据、模板、样式分离方式：

- 数据：`_pages/cv.md`
- 模板：`_includes/hr-resume.html`
- 样式：`assets/css/cv-layout.css`

### 修改站点全局信息

编辑 `_config.yml`，可调整：

- 网站标题、语言、主题
- 作者头像、简介、邮箱、社交链接
- 集合输出规则与默认布局
- 插件与 SEO 配置

当前与本次改版相关的默认集合布局为：

```yaml
defaults:
  - scope:
      type: projects
    values:
      layout: subpage-detail
  - scope:
      type: coursework
    values:
      layout: subpage-detail
  - scope:
      type: labwork
    values:
      layout: subpage-detail
```

站点当前支持 `light`、`dark`、`geek` 三套主题，新的总览页与详情页会跟随主题切换显示不同配色。

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
