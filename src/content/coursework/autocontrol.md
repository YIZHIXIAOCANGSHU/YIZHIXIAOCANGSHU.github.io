---
title: '自动控制原理：创意台灯控制系统'
date: 2026-01-15
summary: '以创意台灯为载体完成 Buck 变换器建模、闭环 PI 控制、STM32 ADC/PWM 实现、WebBluetooth 交互和整机验证。'
cover: '/images/coursework/autocontrol/system-block.jpg'
tags:
  - '自动控制'
  - 'Buck 变换器'
  - 'STM32'
  - 'PI 控制'
---

## 把反馈控制落到一盏台灯里

自动控制原理课程项目的载体是一套创意台灯控制系统。报告不是单独做一个“能亮”的灯，而是把 Buck 变换器、离散 PI 控制、STM32 采样与 PWM 输出、WebBluetooth 上位机、无影照明结构和多任务控制放到同一个系统中。对我来说，这个项目最有价值的地方，是把课程里的被控对象、反馈、稳定性、频域分析和数字控制实现，压到一条能被验证的工程链路里。

项目分为基础项目和综合项目两层。基础项目以直流 Buck 电源为对象，实现对输出电压的稳压控制；综合项目再把电源控制、照明调光、关节结构和网页控制端集成到创意台灯中。团队报告中写明了可量化控制目标，例如输出稳态误差、调节时间、超调、纹波、电流和温升保护等约束。网页里不展开所有公式，而是按照“电源对象怎么建模，控制器怎么闭环，STM32 怎么执行，台灯系统怎么验证”的顺序，把课程成果写成一个完整的控制系统经历。

<figure class="report-figure report-figure--wide">
  <img src="/images/coursework/autocontrol/system-block.jpg" alt="创意台灯控制系统总体框图" />
  <figcaption><strong>图 1 创意台灯控制系统总体框图。</strong>这张图把 WebBluetooth 上位机、BLE 通信、MCU 数字控制、Buck/LED 功率级、LED 光源和传感反馈放在同一张图里，说明项目不是单一电路作业，而是系统集成任务。</figcaption>
</figure>

Buck 变换器适合用来训练控制思维，因为它的控制输入清楚，PWM 占空比会改变电感、电容和负载构成的能量传递过程。项目中输入电压、输出电压、电感、电容、开关频率、负载电流和纹波指标都需要被纳入设计。课程报告里给出了 15V 输入、12V 输出、3A 额定负载、100kHz PWM 等设计点，也围绕电感电流纹波、输出电压纹波和电容 ESR 做了计算。这个阶段让我理解，被控对象不是公式中的一个 G(s) 符号，它来自真实元器件、开关节点、电流路径和采样条件。

<div class="report-pair">
  <figure>
    <img src="/images/coursework/autocontrol/buck-topology.jpg" alt="Buck 变换器基本拓扑" />
    <figcaption><strong>图 2 Buck 变换器拓扑。</strong>拓扑图展示开关管、续流二极管、滤波电感、电容和负载的关系，是后续建模、采样和控制器设计的物理起点。</figcaption>
  </figure>
  <figure>
    <img src="/images/coursework/autocontrol/switch-waveform.jpg" alt="Buck 开关节点和栅极驱动波形" />
    <figcaption><strong>图 3 开关节点与栅极驱动波形。</strong>波形图来自主电路调试阶段，用来验证功率级工作状态，说明闭环控制前必须先确认硬件波形可靠。</figcaption>
  </figure>
</div>

控制设计从开环仿真开始。开环模型可以观察功率级本身的输出响应和纹波，也能暴露参数选择对动态过程的影响。随后再加入 PI 控制形成闭环，让输出电压反馈进入控制器，控制器根据误差调节占空比。比例项提高响应速度，积分项消除稳态误差，但积分过强会带来迟滞、超调甚至振荡风险。这个取舍把自动控制课上的参数整定变成了真实工程问题：控制器不能只在仿真中看起来稳定，还要考虑 PWM 分辨率、ADC 噪声、计算周期和功率器件非理想特性。

<div class="report-pair">
  <figure>
    <img src="/images/coursework/autocontrol/open-loop-sim.jpg" alt="Buck 开环仿真电路" />
    <figcaption><strong>图 4 Buck 开环仿真。</strong>开环仿真用于观察功率级本身的输出波形和动态特征，为闭环控制器整定提供基准。</figcaption>
  </figure>
  <figure>
    <img src="/images/coursework/autocontrol/closed-loop-sim.jpg" alt="Buck 闭环仿真电路" />
    <figcaption><strong>图 5 Buck 闭环仿真。</strong>闭环仿真加入反馈和控制器，验证输出电压能否在参考变化或负载扰动后回到目标值。</figcaption>
  </figure>
</div>

建模部分把 Buck 功率级抽象成小信号平均模型，并用控制到输出传递函数支撑稳定性分析。报告中使用劳斯判据、根轨迹、奈奎斯特判据和波特图分析闭环稳定性与频域裕度。网页不把公式逐条搬进来，而保留它们的工程作用：劳斯判据回答系统是否稳定，根轨迹观察参数变化怎样影响极点，波特图提供带宽、相位裕度和增益裕度的判断。这样写，是为了让读者看到控制理论怎样服务系统设计，而不是把课程内容抄成公式堆。

<figure class="report-split">
  <div>
    <h3>从连续控制到 MCU 离散实现</h3>
    <p>连续模型给出控制思路，但 STM32 执行的是离散采样和离散输出。ADC 需要把输出电压映射到 3.3V 量程内，PWM 只能按定时器分辨率更新占空比，控制任务还要考虑采样周期和任务调度。</p>
    <p>这个转换是项目里最能体现工程落地的一步。控制器在仿真中可以连续计算，到了 MCU 上就必须处理量化、延迟、噪声、限幅和异常保护。公式只是入口，调试才决定它能否在电路上稳定工作。</p>
  </div>
  <figure>
    <img src="/images/coursework/autocontrol/control-model.jpg" alt="Buck 建模与控制框图" />
    <figcaption><strong>图 6 Buck 建模与控制框图。</strong>模型图对应报告中的小信号建模和闭环推导，说明项目把功率级从电路拓扑进一步抽象为可分析的被控对象。</figcaption>
  </figure>
</figure>

综合项目把 Buck 控制和台灯系统结合起来。台灯的创新不止是调光，还包括多光源几何布局和漫反射实现无影照明，多自由度摩擦关节机构保持灯头姿态，以及 WebBluetooth 控制端实现跨平台连接、指令下发和实时数据监控。网页控制端采用双向 16 字节定长帧，通过帧头和帧尾区分上下行，既能下发开灯、呼吸灯和调光指令，也能回传空气质量、环境光和台灯亮度等数据。这个设计让课程项目从“电源稳压”扩展成“电源、传感、结构和交互”的整机系统。

<figure class="report-figure">
  <img src="/images/coursework/autocontrol/webbluetooth-timing.jpg" alt="WebBluetooth 通信时序图" />
  <figcaption><strong>图 7 WebBluetooth 通信时序。</strong>图中展示浏览器扫描、连接、服务发现、通知订阅和定长帧通信过程，证明上位机交互也被纳入系统设计，而不是停留在硬件演示。</figcaption>
</figure>

调试阶段按“先单模块、后联调；先低功率、后满功率；先功能、后稳定性”的顺序推进。硬件侧检查 12V 输入、Buck 输出、3.3V 数字电源、LED 亮度一致性、传感器量程、舵机限位和长时间运行温升；软件侧通过串口日志、OLED 和网页端观察状态，验证采样滤波、模式管理、PI 调光、舵机控制和通信回显。报告里还设置了整机满亮运行、亮度阶跃、负载扰动和结构悬停等验证项目，这让课程成果具备了可复查的工程证据链。

<figure class="report-split">
  <div>
    <h3>验证指标把“能用”说清楚</h3>
    <p>报告中用照明均匀度、阴影对比度、亮度阶跃调节时间、负载扰动恢复、关节可调范围、悬停漂移和长时运行状态评价整机。这样的指标比“效果不错”更能说明系统达到什么阶段。</p>
    <p>其中亮度阶跃调节时间、负载突变恢复和输出纹波与控制系统直接相关；均匀度、阴影和关节稳定性则说明台灯作为产品载体也经过结构和光学层面的验证。</p>
  </div>
  <figure>
    <img src="/images/coursework/autocontrol/performance-radar.jpg" alt="创意台灯系统性能验证雷达图" />
    <figcaption><strong>图 8 系统性能综合验证。</strong>雷达图把照明、调光响应、结构稳定和可靠性放在同一张图里，用于说明最终成果已经从单模块验证推进到整机评价。</figcaption>
  </figure>
</figure>

这个项目最终形成了包含功率级建模、仿真分析、闭环 PI 控制、STM32 实现、WebBluetooth 上位机和整机系统验证的课程报告。我的网页表述保守地区分了个人工作和团队成果：课程报告由团队共同完成，我在这个条目里重点呈现自己对 Buck 建模、闭环控制、嵌入式执行和系统整合链路的理解与整理。它训练我的不是单一公式，而是把控制理论放进电路、传感、执行器、通信和机械结构共同组成的系统里。

<figure class="report-table">
  <figcaption><strong>表 1 自动控制项目工作链路。</strong>表格把页面中的图证收束成课程经历，说明项目怎样从控制理论走向台灯系统。</figcaption>
  <table>
    <thead>
      <tr><th>阶段</th><th>关键工作</th><th>工程意义</th></tr>
    </thead>
    <tbody>
      <tr><td>Buck 功率级</td><td>分析拓扑、器件参数、纹波和开关波形，完成主电路调试</td><td>把被控对象建立在真实电路和波形验证之上</td></tr>
      <tr><td>控制建模</td><td>建立小信号模型，使用稳定判据、根轨迹和波特图分析闭环特性</td><td>把课程理论用于控制器设计和稳定性判断</td></tr>
      <tr><td>数字实现</td><td>通过 STM32 ADC/PWM 完成采样和执行，处理采样、量化、限幅和任务调度</td><td>把连续控制问题落到 MCU 可运行的离散系统中</td></tr>
      <tr><td>整机集成</td><td>结合 WebBluetooth、LED 光源、传感器和关节结构完成创意台灯系统</td><td>形成电源、控制、交互和结构一体化的课程成果</td></tr>
    </tbody>
  </table>
</figure>
