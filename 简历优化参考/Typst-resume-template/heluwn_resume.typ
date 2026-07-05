// 贺禄文 - 机器人控制与系统调试方向头像版正式简历

#set page(paper: "a4", margin: (x: 15mm, y: 12mm))
#set text(font: ("Microsoft YaHei", "SimSun"), size: 9.35pt, lang: "zh")
#set par(first-line-indent: 0pt, leading: 0.48em, justify: true)
#set list(indent: 0.9em, body-indent: 0.9em, marker: [·])

#let accent = rgb("#4682b4")
#let homepage = "https://yizhixiaocangshu.github.io/"

#let section-title(title) = {
  v(0.26em)
  text(11.5pt, weight: "bold", fill: accent)[#title]
  line(length: 100%, stroke: (paint: accent, thickness: 0.5pt))
  v(0.12em)
}

#let entry(time, name, role) = {
  grid(
    columns: (1.15fr, 3.2fr, 1.65fr),
    column-gutter: 0.6em,
    strong(time),
    strong(name),
    align(right)[#role],
  )
}

#grid(
  columns: (1fr, 27mm),
  column-gutter: 8mm,
  [
    #text(18pt, weight: "bold")[贺禄文]
    #v(0.08em)
    #text(10.3pt, weight: "bold")[求职意向：机器人控制与系统调试实习 / 机器人硬件与系统集成]
    #v(0.22em)
    #grid(
      columns: (1fr, 1fr),
      column-gutter: 0.7em,
      row-gutter: 0.16em,
      [电话：13776417332],
      [邮箱：#link("mailto:2752722697@qq.com")[#raw("2752722697@qq.com")]],
      [所在地：重庆 / 南京],
      [作品集：#link(homepage)[yizhixiaocangshu.github.io]],
      [GPA/排名：3.67 / 排名 9],
      [英语/证书：CET-4 419],
    )
  ],
  align(top + right)[
    #image("../../public/images/new_tou_xiang.jpg", width: 25mm, height: 25mm, fit: "cover")
  ],
)

#section-title[教育背景]
#grid(
  columns: (1.15fr, 3.2fr, 1.65fr),
  column-gutter: 0.6em,
  [*2023 - 2027*],
  [*重庆大学 国家卓越工程师学院 / 明月科创实验班*],
  align(right)[机器人工程 / 本科],
)
#v(0.08em)
核心课程：机器人学、自动控制原理、工程数值分析、微电路设计、产品制造、机器人基础。

#section-title[专业技能]
- 控制仿真：MuJoCo、Adams、任务空间控制、阻抗控制、动力学前馈、安全限幅。
- 机械结构：Fusion 360、CAD/STEP、结构设计、装配调试、行星减速箱、轮足机构。
- 电控硬件：PCB 设计、STM32、UART、FreeRTOS、电源/驱动板、焊接调试。
- 编程与数据：Python、C/C++、SVD/Ridge、RLS、Benchmark、技术报告。

#section-title[项目经历]
#entry("2026", "七轴机械臂调试", "控制调试 / 动力学辨识 / 嵌入式适配")
- 搭建七自由度机械臂阻抗控制链路，修正 URDF/MuJoCo 参数并推进 Python、C++、C 代码迁移。
- 建立直接控制、摩擦辨识、全参辨识和 payload 在线辨识流程，输出仿真日志、质量矩阵和 benchmark 结果。
- 将控制算法、辨识数据、日志记录和安全限幅接入调试闭环，支持 STM32H743 与 UART 部署验证。

#v(0.12em)
#entry("2026", "RC足式技术工作", "代理队长 / 结构设计 / 传动设计")
- 以代理队长身份协调结构侧任务拆分、加工装配节奏和问题复盘，推动机械臂、减速箱、轮足参数三条工作线推进。
- 设计四轴机械臂构型与末端接口，完成臂长、视觉/气路/吸盘布置和达妙电机参数核对。
- 设计舵下轮端 NW 行星减速箱并对比轮足腿部参数，完成轮端支撑、侧向载荷和运动空间评估。

#v(0.12em)
#entry("2025", "智能车完全模型组硬件与机械设计", "硬件设计 / 机械设计 / 整车联调")
- 参与主控板、驱动板、电源管理、强弱电隔离和大电流 PCB 设计，处理接口可达性与供电路径问题。
- 迭代车壳结构，调整板卡固定、线束出口、打印可行性和整车安装空间。
- 参与失败板复盘、装配干涉排查和整车联调，定位硬件与机械边界问题。

#v(0.12em)
#entry("2025", "点足机器人结构设计与仿真调试", "腿部结构 / 动力学仿真 / 实机复盘")
- 拆解点足机器人髋关节、膝关节和外围调试框架，复盘腿部机构的传力路径、限位关系和落足姿态。
- 使用 Fusion 360 静力学分析结构薄弱区域，结合 Adams 动力学观察机构运动趋势。
- 整理 MuJoCo/Sim2Real 与实机问题，分析装配间隙、接触摩擦、电机延迟对控制效果的影响。

#v(0.12em)
#entry("2023 - 2025", "Robomaster 机器人机械设计经历", "工程主体/底盘 / 英雄云台 / 图纸复原")
- 参与工程机器人主体与底盘结构方案梳理，围绕安装基准、维护空间、线束走向和电气仓布置复查旧工程设计。
- 完成老英雄云台重装与结构复查，核对转动空间、连接件强度、装配顺序和线束余量。
- 设计丝杆连接件多版结构，并复原云台与关键零件图纸，支撑后续加工、维护和版本迭代。

#section-title[荣誉证书]
#grid(
  columns: (1.15fr, 3.2fr, 1.65fr),
  column-gutter: 0.6em,
  row-gutter: 0.14em,
  [*2025*], [智能车省一], align(right)[省级一等奖],
  [*2025*], [美赛 S 奖], align(right)[Successful Participant],
)
