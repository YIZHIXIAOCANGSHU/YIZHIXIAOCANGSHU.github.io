// no_profile_picture

// 页面全局设置
#set page(paper: "a4", margin: (x: 15mm, y: 12mm))

// 文本与段落基础设置
#set text(font: ("Microsoft YaHei", "SimSun"), size: 10.5pt, lang: "zh")
#set par(first-line-indent: 0pt, leading: 0.65em, justify: true)
#set list(indent: 1em, body-indent: 1em, marker: [·])

// 自定义模块标题样式
#let section-title(title) = {
  v(0.4em)
  text(12pt, weight: "bold", fill: rgb("#4682b4"))[#title] // 浅钢蓝色
  line(length: 100%, stroke: (paint: rgb("#4682b4"), thickness: 0.5pt)) // 分割线同色
  v(0.2em)
}

// ========== 正文开始 ==========
#align(center)[
  #text(18pt, weight: "bold")[姓名]
  #v(0.15em)
  #text(11pt, weight: "bold")[求职意向：岗位（实习）]
]

#v(0.4em)
#grid(
  columns: (1fr, 1fr, 1fr),
  align: center,
  [📞 联系电话],
  [📧 #raw("电子邮箱")],
  [📍 所在地区（接受异地）]
)

// 教育背景
#section-title[教育背景]
#grid(
  columns: (1.2fr, 2.5fr, 2fr),
  [*入学时间-至今*],
  align(center)[*院校名称*],
  align(right)[专业 | 本科]
)
#v(0.15em)
*核心课程*：XXXXX

// 项目经历
#section-title[项目经历]
#grid(
  columns: (1.8fr, 2fr, 1.5fr),
  [*项目时间*],
  [*XXXXX竞赛/项目*],
  align(right)[XXXXX]
)
- XXXXX
- XXXXX

#v(0.2em)
#grid(
  columns: (1.8fr, 2fr, 1.5fr),
  [*项目时间*],
  [*XXXXX机器人/项目*],
  align(right)[XXXXX]
)
- XXXXX
- XXXXX

#v(0.2em)
#grid(
  columns: (1.8fr, 2fr, 1.5fr),
  [*项目时间*],
  [*XXXXX机器人/项目*],
  align(right)[XXXXX]
)
- XXXXX

// 专业技能
#section-title[专业技能]
- XXXXX
- XXXXX
- XXXXX
- XXXXX

// 荣誉证书
#section-title[荣誉证书]
#grid(
  columns: (2fr, 8fr, 2fr),
  gutter: 0.5em, // 关键修改：增加行间距
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛 ],align(right)[XXXXX奖项],
)