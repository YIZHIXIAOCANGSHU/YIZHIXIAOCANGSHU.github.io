#let accent = rgb("#4682b4")
#let homepage = "https://yizhixiaocangshu.github.io/"

#let section_title(title) = {
  v(0.48em)
  text(12pt, weight: "bold", fill: accent)[#title]
  line(length: 100%, stroke: (paint: accent, thickness: 0.5pt))
  v(0.22em)
}

#let resume_header(job_title: none) = {
  grid(
    columns: (1fr, 26mm),
    column-gutter: 8mm,
    [
      #text(20pt, weight: "bold")[贺禄文]
      #if job_title != none {
        v(0.2em)
        text(10.8pt, weight: "bold")[求职意向：#job_title]
      }
      #v(0.52em)
      #text(9.2pt)[
        #grid(
          columns: (1fr, 1fr),
          column-gutter: 4mm,
          row-gutter: 0.34em,
          [电话：13776417332],
          [邮箱：#link("mailto:2752722697@qq.com")[#raw("2752722697@qq.com")]],
          [所在地：重庆 / 南京],
          [主页：#link(homepage)[#raw("yizhixiaocangshu.github.io")]],
          [GPA / 排名：3.67 / 排名 6],
        )
      ]
    ],
    align(top + right)[
      #image("../../public/images/new_tou_xiang.jpg", width: 26mm, height: 26mm, fit: "cover")
    ],
  )
  v(0.26em)
}

#let entry(time, name, role) = {
  grid(
    columns: (0.9fr, 4.2fr, 1.2fr),
    column-gutter: 0.62em,
    [#strong[#time]],
    [#strong[#name]],
    align(right)[#role],
  )
}

#let bullet(body) = {
  grid(
    columns: (3mm, 1fr),
    column-gutter: 0.8mm,
    align(top)[#text(fill: accent)[•]],
    [#body],
  )
  v(0.08em)
}

#let education_block() = {
  section_title[教育背景]
  grid(
    columns: (28mm, 1fr, 54mm),
    column-gutter: 0.62em,
    [#strong[2023 - 2027]],
    [#strong[重庆大学 国家卓越工程师学院]],
    align(right)[机器人工程（明月班） / 本科],
  )
  v(0.2em)
  [核心课程：机器人学、自动控制原理、工程数值分析、微电路设计、产品制造。]
}

#let honor_row(time, name, result) = {
  grid(
    columns: (0.9fr, 3.2fr, 2fr),
    column-gutter: 0.62em,
    [#strong[#time]],
    [#name],
    align(right)[#result],
  )
  v(0.14em)
}

#let honors_block() = {
  section_title[荣誉证书]
  honor_row([2024 - 2025], [Robocon 足式], [全国一等奖])
  honor_row([2025], [智能车省一], [省级一等奖])
  honor_row([2025], [美赛 S 奖], [Successful Participant])
}
