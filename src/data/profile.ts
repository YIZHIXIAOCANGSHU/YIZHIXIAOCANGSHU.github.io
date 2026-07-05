export const profile = {
  name: 'Luwen He',
  chineseName: '贺禄文',
  title: '机器人控制与系统调试实习',
  jobTarget: '机器人控制与系统调试实习 / 机器人硬件与系统集成',
  location: '重庆 / 南京',
  email: '2752722697@qq.com',
  phone: '13776417332',
  homepage: 'https://yizhixiaocangshu.github.io/',
  gpaRank: '3.67 / 排名 9',
  englishCert: 'CET-4 419',
  avatar: '/images/new_tou_xiang.jpg',
  bio: '重庆大学机器人工程本科在读，面向机器人控制与系统调试实习，具备机械结构、电控硬件、仿真控制和整机调试经历。',
  links: [
    {
      label: 'Bilibili',
      url: 'https://space.bilibili.com/509745475',
    },
  ],
  education: [
    {
      school: '重庆大学',
      college: '国家卓越工程师学院 / 明月科创实验班',
      degree: '本科',
      major: '机器人工程',
      period: '2023 - 2027',
      courses: ['机器人学', '自动控制原理', '工程数值分析', '微电路设计', '产品制造', '机器人基础'],
    },
  ],
  skillGroups: [
    {
      name: '控制与仿真',
      skills: ['MuJoCo', 'Adams', '任务空间控制', '阻抗控制', '动力学前馈', '安全限幅'],
    },
    {
      name: '机械结构',
      skills: ['CAD/STEP', 'Fusion 360', '结构设计', '装配调试', '行星减速箱', '轮足机构'],
    },
    {
      name: '电控硬件',
      skills: ['PCB 设计', 'STM32', 'UART', 'FreeRTOS', '电源/驱动板', '焊接调试'],
    },
    {
      name: '编程与数据',
      skills: ['Python', 'C/C++', 'SVD/Ridge', 'RLS', 'Benchmark', '技术报告'],
    },
  ],
  focusAreas: ['控制与系统调试', '机械臂调试', '仿真与动力学辨识', '机械结构与 PCB'],
  downloads: [
    {
      label: '个性化实践融合报告 PDF',
      url: '/files/embodied-intelligence-practice-report.pdf',
    },
  ],
};

export const resumeHighlights = [
  {
    title: '七轴机械臂调试',
    meta: '实验室成果 / 控制与辨识 / 2026',
    description:
      '搭建阻抗控制、直接控制、摩擦辨识、全参辨识和 payload 在线辨识链路，覆盖模型修正、跨语言迁移、嵌入式适配和 benchmark 验证。',
    href: '/lab/seven-axis-arm-debugging',
  },
  {
    title: 'RC足式技术工作',
    meta: '个人成果 / 代理队长 / 2026',
    description:
      '以代理队长身份推进四轴机械臂、舵下轮端 NW 行星减速箱和轮足机器人参数优化，覆盖任务拆分、结构设计、载荷校核和制造复盘。',
    href: '/competitions/rc-legged',
  },
  {
    title: '智能车完全模型组硬件与机械设计',
    meta: '个人成果 / 硬件与机械 / 2025',
    description:
      '围绕主控板、驱动板、电源管理、强弱电隔离、大电流 PCB、车壳迭代和整车联调完成硬件与机械链路整理。',
    href: '/competitions/smart-car',
  },
  {
    title: '点足机器人结构设计与仿真调试',
    meta: '个人成果 / 腿式机器人 / 2025',
    description:
      '拆解髋关节、膝关节和外围调试框架，结合 Fusion 360 静力学、Adams 动力学、MuJoCo 仿真和实机问题复盘腿式机器人链路。',
    href: '/competitions/point-foot-robot',
  },
  {
    title: 'Robomaster 机器人机械设计经历',
    meta: '个人成果 / 机械设计 / 2023 - 2025',
    description:
      '参与工程主体与底盘结构梳理、英雄云台重装、丝杆连接件多版本设计和图纸复原，重点训练复杂机器人机械设计判断。',
    href: '/competitions/robomaster',
  },
];

export const resumeExperiences = [
  {
    title: '七轴机械臂调试',
    period: '2026',
    role: '控制调试 / 动力学辨识 / 嵌入式适配',
    href: '/lab/seven-axis-arm-debugging',
    bullets: [
      '搭建七自由度机械臂阻抗控制链路，修正 URDF/MuJoCo 参数并推进 Python、C++、C 代码迁移。',
      '建立直接控制、摩擦辨识、全参辨识和 payload 在线辨识流程，输出仿真日志、质量矩阵和 benchmark 结果。',
      '将控制算法、辨识数据、日志记录和安全限幅接入调试闭环，支持 STM32H743 与 UART 部署验证。',
    ],
  },
  {
    title: 'RC足式技术工作',
    period: '2026',
    role: '代理队长 / 结构设计 / 传动设计 / 参数优化',
    href: '/competitions/rc-legged',
    bullets: [
      '以代理队长身份协调结构侧任务拆分、加工装配节奏和问题复盘，推动机械臂、减速箱、轮足参数三条工作线推进。',
      '设计四轴机械臂构型与末端接口，完成臂长、视觉/气路/吸盘布置和达妙电机参数核对。',
      '设计舵下轮端 NW 行星减速箱并对比轮足腿部参数，完成轮端支撑、侧向载荷和运动空间评估。',
    ],
  },
  {
    title: '智能车完全模型组硬件与机械设计',
    period: '2025',
    role: '硬件设计 / 机械设计 / 整车联调',
    href: '/competitions/smart-car',
    bullets: [
      '参与主控板、驱动板、电源管理、强弱电隔离和大电流 PCB 设计，处理接口可达性与供电路径问题。',
      '迭代车壳结构，调整板卡固定、线束出口、打印可行性和整车安装空间。',
      '参与失败板复盘、装配干涉排查和整车联调，定位硬件与机械边界问题。',
    ],
  },
  {
    title: '点足机器人结构设计与仿真调试',
    period: '2025',
    role: '腿部结构 / 动力学仿真 / 实机复盘',
    href: '/competitions/point-foot-robot',
    bullets: [
      '拆解点足机器人髋关节、膝关节和外围调试框架，复盘腿部机构的传力路径、限位关系和落足姿态。',
      '使用 Fusion 360 静力学分析结构薄弱区域，结合 Adams 动力学观察机构运动趋势。',
      '整理 MuJoCo/Sim2Real 与实机问题，分析装配间隙、接触摩擦、电机延迟对控制效果的影响。',
    ],
  },
  {
    title: 'Robomaster 机器人机械设计经历',
    period: '2023 - 2025',
    role: '工程主体/底盘设计 / 英雄云台 / 图纸复原',
    href: '/competitions/robomaster',
    bullets: [
      '参与工程机器人主体与底盘结构方案梳理，围绕安装基准、维护空间、线束走向和电气仓布置复查旧工程设计。',
      '完成老英雄云台重装与结构复查，核对转动空间、连接件强度、装配顺序和线束余量。',
      '设计丝杆连接件多版结构，并复原云台与关键零件图纸，支撑后续加工、维护和版本迭代。',
    ],
  },
];

export const resumeHonors = [
  {
    year: '2025',
    name: '智能车省一',
    result: '省级一等奖',
  },
  {
    year: '2025',
    name: '美赛 S 奖',
    result: 'Successful Participant',
  },
];
