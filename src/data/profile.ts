export const profile = {
  name: 'Luwen He',
  chineseName: '贺禄文',
  location: '重庆 / 南京',
  email: '2752722697@qq.com',
  phone: '13776417332',
  homepage: 'https://yizhixiaocangshu.github.io/',
  gpaRank: '3.67 / 排名 6',
  avatar: '/images/new_tou_xiang.jpg',
  bio: '重庆大学机器人工程（明月班）本科在读，聚焦机器人运动控制、机械结构设计与仿真调试，具备半人形机械臂开发、嵌入式部署和智能硬件项目推进经历。',
  education: [
    {
      school: '重庆大学（985）',
      college: '国家卓越工程师学院',
      degree: '本科',
      major: '机器人工程（明月班）',
      period: '2023 - 2027',
      courses: ['机器人学', '自动控制原理', '工程数值分析', '微电路设计', '产品制造'],
    },
  ],
};

export const resumeExperiences = [
  {
    title: '半人形机械臂运动控制与调试',
    period: '2026',
    role: '国家级项目书 / 运动控制 / 实际开发',
    href: '/lab/seven-axis-arm-debugging',
    bullets: [
      '参与实验室国家级项目的项目书编写和半人形机械臂实际开发，整理控制路线、硬件接口、验证计划并推进开发任务。',
      '修正 URDF/MuJoCo 模型参数，搭建笛卡尔空间阻抗控制与动力学补偿流程，完成仿真侧参数校准。',
      '推进 Python、C++、C 代码迁移，在 1kHz 下验证计算一致性，完成 STM32H743、UART 接口适配并推进实机部署验证。',
    ],
  },
  {
    title: 'RC足式技术工作',
    period: '2026',
    role: '机械组长 / 队内协同推进',
    href: '/competitions/rc-legged',
    bullets: [
      '承担队内协同推进工作，负责进度管控、财务管理、赛事规划与调度；按阶段拆分机械、控制与装配任务，跟进关键节点。期间，队伍取得全国一等奖 1 项、全国二等奖 3 项。',
      '重建队伍知识库，完善设计、加工、装配、调试文档和复盘制度；作为机械组长负责机械组教学、任务分配与进度监督。',
      '个人完成队伍第一代行星减速箱和四轴机械臂设计，建立串联腿、并联腿运动参数模型并完成整机运动参数优化。',
    ],
  },
  {
    title: '智能车完全模型组硬件与机械设计',
    period: '2025',
    role: '硬件设计 / 机械设计 / 整车联调',
    href: '/competitions/smart-car',
    bullets: [
      '负责主控板、驱动板、电源管理、强弱电隔离与大电流 PCB 的方案梳理和接口联调，核对供电路径与板间连接约束。',
      '推动车壳 5-6 版迭代，调整板卡固定、线束出口和装配空间，结合整车联调定位硬件与机械耦合问题。',
    ],
  },
  {
    title: '点足机器人机械结构设计与仿真',
    period: '2025',
    role: '机械结构 / 动力学仿真',
    href: '/competitions/point-foot-robot',
    bullets: [
      '围绕髋关节、膝关节、腿部传力路径、关节限位和装配空间完成结构拆解与方案设计，并搭建外围调试框架。',
      '使用 Fusion 360 完成静力学检查，使用 Adams 分析机构运动与动力学响应，定位承载、干涉和运动范围问题。',
      '以 MuJoCo 辅助对照结构参数与实机差异，复盘装配间隙、接触关系和落足姿态，为后续结构修改提供依据。',
    ],
  },
  {
    title: 'Robomaster 机器人机械设计经历',
    period: '2023 - 2025',
    role: '底盘 / 云台 / 控制器',
    href: '/competitions/robomaster',
    bullets: [
      '参与英雄云台除发射机构外的结构再设计，处理安装基准、运动空间、连接结构、线束布置、装配顺序和维护可达性。',
      '完成工程机器人整机底盘、取矿与兑矿机构设计，核对主体承载、底盘空间、电气件布置和维护空间；基于学长初始方案完成自定义控制器改进设计与装配，使其适配多轴机械臂操作需求。',
    ],
  },
];

export const resumeHonors = [
  {
    year: '2024 - 2025',
    name: 'Robocon 足式',
    result: '全国一等奖',
  },
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
