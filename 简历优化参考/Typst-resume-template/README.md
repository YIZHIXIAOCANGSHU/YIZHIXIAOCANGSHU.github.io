# Typst 简历模板与参考说明

这份目录用于生成和维护正式简历。

## 适用内容
- `no_profile_picture.typ`：无头像版
- `with_profile_picture.typ`：有头像版
- `heluwn_resume.typ`：头像版正式投递草稿，按当前已确认信息整理；两个模板文件只作为版式参考

## 版式标准
- 纸张：A4
- 边距：左右 15mm，上下 12mm
- 字体：微软雅黑 + 宋体
- 主色：浅钢蓝 `#4682b4`
- 顺序：个人信息、教育背景、核心技能、项目经历、荣誉证书

## 使用方式
1. 用 VS Code 打开 `.typ` 文件。
2. 安装 Tinymist Typst 插件。
3. 先预览，再导出 PDF。也可以在仓库根目录运行：

```powershell
typst compile --root . "简历优化参考\Typst-resume-template\heluwn_resume.typ" "贺禄文-简历.pdf"
```

## 注意事项
- 未确认的信息不要硬写；当前作品集主页为 `https://yizhixiaocangshu.github.io/`。
- 简历正文尽量短句化，优先写做了什么、结果是什么、用了什么方法。
- 项目名尽量和网页保持一致，方便以后同步更新。
- 正式投递前用 PDF 预览检查头像、页边距和项目经历是否在 A4 页面内完整显示。
