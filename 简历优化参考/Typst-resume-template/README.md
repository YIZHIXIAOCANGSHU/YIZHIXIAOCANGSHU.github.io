# Typst 简历模板与参考说明

这份目录用于生成和维护正式投递简历。

## 适用内容

- `resume_base.typ`：通用 PDF 与岗位化草稿共用的 Typst 样式与模块。
- `heluwn_resume_robot_control.typ`：机器人控制工程师投递版。
- `heluwn_resume_product_manager.typ`：产品经理投递版。
- `heluwn_resume.typ`：当前通用投递版入口，生成根目录唯一简历 PDF。
- `no_profile_picture.typ`：无头像版参考模板。
- `with_profile_picture.typ`：有头像版参考模板。

## 版式标准

- 纸张：A4。
- 边距：左右 15mm，上下 12mm。
- 字体：微软雅黑 + 宋体。
- 主色：浅钢蓝 `#4682b4`。
- 顺序：个人信息、教育背景、项目经历、荣誉证书。
- 头像：继续使用 `public/images/new_tou_xiang.jpg`。

## 投递版本

网页简历只保留 `/resume` 一份综合版；根目录 PDF 不写求职意向。

当前根目录唯一交付文件为 `贺禄文-简历.pdf`，内容兼顾机器人运动控制、机械结构、硬件联调和项目推进，不写岗位意向。

## 使用方式

1. 用 VS Code 打开 `.typ` 文件。
1. 安装 Tinymist Typst 插件。
1. 先预览，再导出 PDF。也可以在仓库根目录运行：

```powershell
typst compile --root . "简历优化参考\Typst-resume-template\heluwn_resume.typ" "贺禄文-简历.pdf"
```

## 注意事项

- 未确认的信息不要硬写；当前作品集主页为 `https://yizhixiaocangshu.github.io/`。
- 简历正文尽量短句化，优先写做了什么、结果是什么、用了什么方法。
- 项目名尽量和网页保持一致，方便以后同步更新。
- 正式投递前用 PDF 预览检查头像、页边距、角色栏换行和荣誉区是否在 A4 页面内完整显示。
