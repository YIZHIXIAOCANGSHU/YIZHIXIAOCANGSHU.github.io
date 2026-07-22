# Luwen He Portfolio

Astro 多页个人工程工作档案，以项目为主线展示个人成果、实验室成果、课程成果与完整经历。站点部署到 GitHub Pages，构建产物由 GitHub Actions 生成。

线上地址：<https://yizhixiaocangshu.github.io/>

## 技术栈

- Astro 6
- TypeScript
- Astro Content Collections
- 原生 CSS
- GitHub Pages + GitHub Actions

## 页面结构

- `/` - 项目优先的个人工程档案首页
- `/resume` - 完整简历
- `/competitions` - 个人成果
- `/coursework` - 课程成果
- `/lab` - 实验室成果
- `/timeline` - 全部内容时间线

## 内容维护

结构化个人信息在 `src/data/profile.ts`。

Markdown 内容在：

- `src/content/competitions/`
- `src/content/coursework/`
- `src/content/lab/`

每篇内容使用统一 frontmatter：

```yaml
---
title: '标题'
date: 2026-01-15
summary: '一句话摘要'
role: '项目角色'
contribution: '个人完成的工作'
outcome: '阶段结果'
tech:
  - 技术或工具
tags:
  - 标签
cover: '/images/category/project/cover.jpg'
featured: true
featuredOrder: 1
---
```

`cover` 与 `featured` 对普通条目可选；首页代表项目必须同时设置 `featured: true`、唯一的 `featuredOrder` 和 `cover`。

静态资源放在：

- `public/images/`
- `public/files/`

## 本地开发

```bash
npm install
npm run dev
```

打开 `http://localhost:4321`。

如果已经安装过依赖，可以直接运行：

```bash
npm run dev -- --host 127.0.0.1
```

## 构建

```bash
npm run build
npm run preview
```

`npm run build` 会先运行 `astro check`，再生成 `dist/`。

## GitHub Pages

`.github/workflows/deploy.yml` 会在推送到 `main` 或 `master` 时自动构建并发布 `dist/`。仓库是用户主页仓库 `YIZHIXIAOCANGSHU.github.io`，因此 `astro.config.mjs` 没有设置 `base`。

在 GitHub 仓库设置中开启发布：

1. 打开 `https://github.com/YIZHIXIAOCANGSHU/YIZHIXIAOCANGSHU.github.io`。
2. 进入 `Settings -> Pages`。
3. 在 `Build and deployment` 中将 `Source` 设为 **GitHub Actions**。
4. 保存后推送到 `master`，或到 `Actions` 页面手动运行 `Deploy to GitHub Pages`。
5. 发布完成后访问 <https://yizhixiaocangshu.github.io/>。

## 简历 PDF

网页简历在 `/resume`，根目录只维护一份通用 PDF 简历，不在 PDF 页首写求职意向。网页端仍保持综合版展示。

通用 PDF 使用 `heluwn_resume.typ` 生成，共用网页最新事实、头像和基础信息：

```powershell
typst compile --root . "简历优化参考\Typst-resume-template\heluwn_resume.typ" "贺禄文-简历.pdf"
```

PDF 采用头像版排布，头像来源为 `public/images/new_tou_xiang.jpg`，主页地址与网页简历统一为 <https://yizhixiaocangshu.github.io/>。岗位化 Typst 源文件保留在模板目录中，不作为根目录当前交付物。

## 课程成果

旧版 `_coursework` 下的课程条目已经迁移为 Astro content collection，并统一放在 `src/content/coursework/`。课程详情页按作品集文章组织，偏向介绍项目背景、目标约束、本人或团队完成的工作链路、结果图证和阶段反思，不写成教程长文。

当前课程栏目包含旧版 10 个课程条目，并新增 `工程数值分析`、`产品制造`、`电动船制作`、`红外寻迹与雷达扫描`、`机器人基础：机械臂写字笔架`、`产品设计：低噪声全向底盘与单 Z 轴方案`、`仿生鱼 / 发条鱼设计`、`弹跳互动装置`，共 18 个条目。课程详情页已经改为更完整的作品集叙事：项目背景、目标约束、工作链路、图证/表证和结果反思，不直接嵌入 PDF/DOCX 原文。

课程相关 PDF、DOCX 和图片放在 `public/files/` 与 `public/images/coursework/`。重点报告类页面参考 `工程数值分析` 的行文与排版标准，使用报告式图表、穿插图注和阶段结果表格呈现证据。

## 个人成果与实验室成果

`/competitions` 页面显示为个人成果，当前包含 RC 足式技术工作、Robomaster、智能车完全模型组硬件与机械设计、点足机器人、RMBC 校内机器人基础训练赛、SRTP 无人机机械臂立项、电赛学习与电阻测量复刻、美赛建模与图表、拓展坞 PCB。RC 足式页内合并展示四轴机械臂、舵下轮端 NW 行星减速箱和轮足机器人参数优化。

`/lab` 保留为实验室成果，目前将七自由度机械臂阻抗控制、直接控制、摩擦辨识、全参辨识和 payload 在线辨识合并到 `七轴机械臂调试` 一篇长报告中。

内容页图片使用 `markdown/*/images/` 中提取出来的单独图片、流程图、表格图和实物图，迁移到 `public/images/...` 的稳定路径后再引用。页面正文不引用 `markdown/` 原路径，也不把整页 PDF 截图作为正文图片。

## Markdown 资料候选池

`markdown/` 下的新资料先作为候选池维护，确认分类后再新增正式页面。整理口径是：能自然并入现有页面的先补强，不能并入的再新增 `/competitions` 或 `/coursework` 条目。

| 建议分类 | 资料来源 | 可新增条目 | 可补强页面 | 图片数量 | 需要确认的问题 |
| --- | --- | --- | --- | ---: | --- |
| 课程候选 | `工程数值分析/main_robot_arm.pdf-...` | 六自由度机械臂避障路径规划 | 工程数值分析 | 129 | 独立成课程条目，还是作为工程数值分析的第二个成果？ |
| 课程候选 | `概率论/课程报告-贺禄文-20234232.pdf-...` | 概率论机器学习建模 | 人脸识别课程项目 | 29 | 是否和现有人脸识别合并，还是新建概率论机器学习页？ |
| 课程候选 | `概率论/产品管理系统报告.pdf-...` | 产品管理系统统计分析 | 进出货系统开发 | 40 | 是否作为进出货系统的统计分析补充？ |
| 课程候选 | `产品设计/会议拍摄机器人.pdf-...` 与 PPTX | 会议拍摄机器人 | 产品设计相关课程页 | 80 | 是否新建产品设计条目，还是并入低噪声全向底盘页？ |
| 课程候选 | `数理报告.docx-...` | 振动柔光布数理建模 | 暂无 | 10 | 归课程成果还是个人建模成果？ |
| 课程候选 | `工程原理/寻迹报告.docx-...` | 工程原理寻迹实践 | 红外寻迹与雷达扫描 | 12 | 是否并入现有红外寻迹页？ |
| 课程候选 | `QEA1/报告.docx-...` | QEA1 建模与实体制造 | QEA2 心电检测系统 | 9 | QEA1 是否单独成页？ |
| 课程补强 | `斯特林发动机/工程设计报告-...` 与最终汇报 | 暂不新增 | 斯特林发动机设计与制作 | 135 | 需要确认是否强调个人实物制作职责。 |
| 课程补强 | `自动控制原理_课程项目报告.pdf-...` | 暂不新增 | 自动控制原理：创意台灯控制系统 | 109 | 已有页可继续补图表和控制链路。 |
| 课程补强 | `微电路设计结项汇报.pdf-...`、`微电路小组报告.pdf-...` | 暂不新增 | 微电路设计小组报告 | 55 | 可补充汇报图、硬件逻辑和测试图。 |
| 课程补强 | `ecg-report.pdf-...` | 暂不新增 | QEA2 心电检测系统 | 11 | 可补上位机、滤波、R 波检测和显示图。 |
| 课程补强 | `机器人基础课程报告 贺禄文.docx-...` | 暂不新增 | 机器人基础：机械臂写字笔架 | 41 | 是否只保留综合实践部分，弱化通识综述？ |
| 课程补强 | `按摩机芯设计与制造-...docx-...` | 暂不新增 | 产品制造 | 26 | 可继续补材料、工艺链和仿真图证。 |
| 课程/个人成果补强 | `个性化实践 贺禄文 20234232.docx-...`、`个性化实践报告...pdf-...` | 暂不新增 | 点足机器人、Robomaster、智能车、课程旧条目 | 97 | 该资料覆盖范围宽，后续按页面拆分引用。 |
| 个人成果/实验室补强 | `具身智能实验室个性化实践融合报告.pdf-...`、`技术轨-个性化实践.pdf-...` | 暂不新增 | RC足式技术工作、七轴机械臂调试 | 214 | 继续只抽单图，不引用整页 PDF 截图。 |

## 迁移说明

旧 Jekyll/Academic Pages 源文件已经清理，当前仓库只保留 Astro 站点源码、公开静态资源和 GitHub Pages 部署配置。旧课程内容以 Astro 课程成果栏目的形式恢复。
