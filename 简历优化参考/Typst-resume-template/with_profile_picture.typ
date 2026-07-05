// with_profile_picture

// 页面全局设置
#set page(paper: "a4", margin: (x: 15mm, y: 12mm))

// 文本与段落基础设置
#set text(font: ("Microsoft YaHei", "SimSun"), size: 10.5pt, lang: "zh")
#set par(first-line-indent: 0pt, leading: 0.65em, justify: true)
#set list(indent: 1em, body-indent: 1em, marker: [·])

// 自定义模块标题样式
#let section-title(title) = {
  v(0.4em)
  text(12pt, weight: "bold", fill: rgb("#4682b4"))[#title]
  line(length: 100%, stroke: (paint: rgb("#4682b4"), thickness: 0.5pt))
  v(0.2em)
}

// ========== 正文开始 ==========
// 左列信息区 + 右列头像区
#grid(
  columns: (4fr, 1fr),
  column-gutter: 8mm,
  // 左列：姓名、院校、基本信息全内容
  [
    // 姓名行（与求职意向同列，下底面平齐）
    #grid(
      columns: (auto, 1fr),
      column-gutter: 0.8em,
      // 姓名
      align(bottom)[#text(18pt, weight: "bold")[姓名]],
      // 求职意向
      align(bottom)[#text(10.5pt, weight: "regular")[*求职意向：* XXXXX]]
    )

    // 基本信息模块
    #section-title[基本信息]

    // 基本信息第一行：
    #grid(
      columns: (1fr, 1fr, 2fr),
      gutter: 0.5em,
      [*性别：* XX],
      [*年龄：* XX],
      [*联系电话：* XXX-XXX-XXXX]
    )
    
    // 基本信息第二行：
    #grid(
      columns: (1fr, 1.5fr, 1.5fr),
      gutter: 0.5em,
      [*住址：* XXXXX],
      [*个人主页/GitHub/邮箱：* #link("链接")[文字]],
    )
  ],
  // 右列：右上角头像，顶部对齐
  align(top + right)[
    #image("image.png", width: 26mm, height: auto)
  ]
)

// 教育背景
#section-title[教育背景]
#grid(
  columns: (1.2fr, 2.5fr, 2fr),
  [*入学时间-至今*],
  align(center)[*院校名称*],
  align(right)[专业名称 | 本科]
)
#v(0.15em)
*核心课程*：XXXXX

// 实习经历
#section-title[实习经历]
#grid(
  columns: (1.8fr, 2fr, 1.5fr),
  [*实习时间*],
  [*XXXXX*],
  align(right)[XXXXX]
)
- XXXXX
- XXXXX

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
  gutter: 0.5em,
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
  [*获奖年份*], [XXXXX竞赛],align(right)[XXXXX奖项],
)