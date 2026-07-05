---
title: '七轴机械臂调试'
date: 2026-06-10
summary: '实验室阶段成果总页，整合七自由度机械臂阻抗控制、直接控制、摩擦辨识、全参辨识和 payload 在线辨识。'
cover: '/images/lab/seven-axis/impedance-sim.jpg'
tags:
  - '实验室成果'
  - '七轴机械臂'
  - '阻抗控制'
  - '直接控制'
  - '动力学辨识'
featured: true
links:
  - label: '完整 PDF'
    url: '/files/embodied-intelligence-practice-report.pdf'
---

## 从仿真控制到真机调试链路

七轴机械臂调试这一页被整理成实验室阶段成果总页。它不再拆成“直接控制、摩擦辨识、全参辨识、在线辨识”四个单独小页面，而是把这些内容放回同一条工程主线：先让机械臂模型、控制器和硬件接口能够闭环运行，再逐步处理关节摩擦、动力学参数和末端负载变化。后续新增的七自由度机械臂阻抗控制也被并入这条主线，因为它处理的是同一个问题的另一面：机械臂不只是到达目标位姿，还要在接触、扰动和模型误差存在时表现出更可控的动态响应。

<div class="report-brief">
  <span><strong>目标</strong>让七自由度机械臂从仿真控制走到可部署、可记录、可辨识的调试闭环。</span>
  <span><strong>我的工作</strong>整理阻抗控制、直接控制、摩擦辨识、全参辨识和 payload 在线辨识链路。</span>
  <span><strong>关键证据</strong>模型对比、代码迁移、真机视频帧、质量矩阵、benchmark 和 best config。</span>
  <span><strong>工程价值</strong>把控制公式、嵌入式周期、串口数据和参数质量评价放到同一套复查口径。</span>
</div>

项目的起点是阻抗控制。七自由度机械臂如果只按位置闭环运行，在接触任务或外界扰动下容易显得“硬”，控制器既要保证轨迹跟踪，又要在末端受力或模型误差出现时给出合理的柔顺响应。我先在仿真中建立阻抗控制链路，把目标轨迹、期望质量阻尼刚度、末端误差和关节力矩输出连接起来。这个阶段的重点不是做一个漂亮动画，而是让控制逻辑可以复查：目标从哪里来，误差如何进入阻抗模型，输出如何映射到关节，仿真结果怎样与模型参数对应。

<figure class="report-figure">
  <img src="/images/lab/seven-axis/impedance-sim.jpg" alt="七自由度机械臂阻抗控制仿真结果" />
  <figcaption><strong>图 1 七自由度机械臂阻抗控制仿真。</strong>仿真图对应阻抗控制从概念进入可运行模型的节点，用来检查机械臂在目标轨迹和柔顺参数下的响应是否符合预期。</figcaption>
</figure>

阻抗控制真正进入工程实现后，问题迅速从公式转向模型和部署细节。URDF/MuJoCo 参数需要修正，关节方向、惯量、质量分布和限位要与仿真环境一致，否则控制器输出再合理，也会被错误模型放大成异常结果。我在这一部分整理了模型对比和参数修正过程，同时把控制代码从 Python 原型逐步迁移到 C++/C 方向，为后续 STM32H743 平台适配做准备。跨语言迁移不是简单翻译语法，关键是把矩阵计算、周期调度、UART 通信、状态更新和安全限幅重新组织到嵌入式可运行的结构里。

<div class="report-pair">
  <figure>
    <img src="/images/lab/seven-axis/model-compare.jpg" alt="URDF 与 MuJoCo 模型参数对比" />
    <figcaption><strong>图 2 URDF/MuJoCo 模型对比。</strong>模型一致性是阻抗控制和动力学辨识的基础，关节方向、惯量和限位错误都会直接影响后续控制结果。</figcaption>
  </figure>
  <figure>
    <img src="/images/lab/seven-axis/cross-language-code.jpg" alt="Python、C++ 与 C 控制代码迁移" />
    <figcaption><strong>图 3 控制代码跨语言迁移。</strong>代码从高层验证逐步走向嵌入式部署，说明工作重点已经从算法表达进入实时运行和硬件接口适配。</figcaption>
  </figure>
</div>

在部署侧，我围绕 STM32H743、UART 通信和 1 kHz 控制周期整理实现路径。嵌入式平台上，控制器不能依赖桌面环境里的高层库，也不能无限制打印和保存日志。每个周期都需要在固定时间内完成状态读取、控制计算、限幅、通信帧组织和输出更新。UART 接口既要保证数据帧解析可靠，也要处理丢帧、异常值和状态不同步问题。阻抗控制部分因此形成了一条从仿真验证、模型修正、代码迁移到嵌入式适配的链路，而不是只停留在单个控制公式。

<figure class="report-figure">
  <img src="/images/lab/seven-axis/deploy-platform.jpg" alt="STM32H743 与通信部署平台" />
  <figcaption><strong>图 4 阻抗控制部署平台。</strong>STM32H743、UART 通信和实时控制周期共同决定算法能否离开仿真环境。它对应的是 1 kHz 控制验证和硬件接口适配，而不是静态代码展示。</figcaption>
</figure>

当阻抗控制链路的模型和部署问题被整理清楚后，直接控制部分承担的是更基础的闭环调试职责：把 TCP 位姿目标转成机械臂可以执行的关节输出，并保留可复查日志。我把控制链路从目标位姿开始，先生成五次 S 曲线参考和姿态插值，再通过任务空间 PD、Jacobian 映射、`g(q)+c(q,qdot)` 动力学前馈和力矩合成进入控制周期。为了让仿真结果能走向真机观察，我同步加入幅值限幅、变化率限幅、关节/速度/通信异常处理和安全状态机。这样控制器在遇到异常目标、速度突变或通信问题时有边界，而不是只在理想输入下运行。

<figure class="report-figure">
  <img src="/images/lab/seven-axis/direct-logic.jpg" alt="七轴机械臂直接控制运行逻辑" />
  <figcaption><strong>图 5 直接控制运行逻辑。</strong>目标输入、状态反馈、控制核心、安全输出和数据记录被接入同一闭环，说明后续辨识工作的入口是一条可复查的调试链路。</figcaption>
</figure>

直接控制阶段还保留了工作空间和真机观察证据。500k 工作空间采样用于判断目标是否落在机械臂可达区域，10 s 闭环日志用于检查目标、反馈和力矩输出的时间关系，MuJoCo 截图用于确认仿真姿态，左臂真机部署视频帧用于记录硬件接入状态。相比只给出控制方程，这些证据更能说明实际工作内容：目标从哪里来，控制量怎样生成，运行状态如何保存，真机观察能否回到同一套数据口径。

<div class="report-pair">
  <figure>
    <img src="/images/lab/seven-axis/direct-workspace.jpg" alt="七轴机械臂工作空间采样和闭环数据" />
    <figcaption><strong>图 6 工作空间采样与闭环日志。</strong>工作空间和日志用于检查目标范围、轨迹连续性和控制周期内的状态变化。</figcaption>
  </figure>
  <figure>
    <img src="/images/lab/seven-axis/direct-real-video.jpg" alt="七轴机械臂真机部署视频帧" />
    <figcaption><strong>图 7 真机观察证据。</strong>视频帧记录了控制链路接入左臂真机后的运行状态，使仿真、日志和硬件观察可以互相对照。</figcaption>
  </figure>
</div>

当直接控制能稳定运行后，摩擦问题会在低速起转、换向和目标附近微动时暴露出来。七轴机械臂的关节摩擦不是统一常数，不同电机在低速区、换向区和中速区会呈现不同阻力特征。如果不先建立可重复的数据采集和求解流程，后续调参很容易停留在凭经验补偿的状态。我整理的摩擦辨识流程从 zeroing 统一初始条件开始，用 multisine 激励覆盖低速、换向和中速区间，再通过串口帧解析、`motor_id` 过滤、capture 保存、静态 `tanh/Ridge` 求解和 LuGre 接口，把采集、求解、质量评价连成闭环。

<figure class="report-figure">
  <img src="/images/lab/seven-axis/friction-logic.jpg" alt="摩擦辨识运行流程" />
  <figcaption><strong>图 8 摩擦辨识运行流程。</strong>流程从串口帧解析到参数求解和 summary 评价，保证每一轮采集都能回到具体电机、命令、反馈和保存文件。</figcaption>
</figure>

摩擦辨识中我重点做了两类质量检查。第一类看采集是否合格，包括目标帧比例、阶段完成状态和串口反馈连续性；第二类看求解是否可信，包括静态参数、验证误差和不同电机之间的质量矩阵。这样可以避免把一次不完整采集误认为真实参数，也能尽早发现某个电机激励不足或反馈异常。当前阶段的摩擦辨识更像是在建立可复查的数据生产线，为后续补偿进入控制器打基础。

<div class="report-pair">
  <figure>
    <img src="/images/lab/seven-axis/friction-quality.jpg" alt="摩擦辨识质量矩阵" />
    <figcaption><strong>图 9 摩擦辨识质量矩阵。</strong>跨电机质量矩阵用于比较采集完成度、目标帧比例和验证误差，让不同关节的辨识质量能放在同一口径下检查。</figcaption>
  </figure>
  <figure>
    <img src="/images/lab/seven-axis/friction-params.jpg" alt="摩擦辨识静态参数面板" />
    <figcaption><strong>图 10 摩擦静态参数面板。</strong>库仑项、粘性项和速度尺度被放在一起，用于判断参数是否具有物理意义。</figcaption>
  </figure>
</div>

摩擦辨识解决的是低速和换向特性，全参辨识进一步面向整机动力学耦合。直接控制中的 `g+c` 前馈质量，取决于质量、质心、惯量、摩擦项、弹性项和力矩偏置等参数是否能被合理解释。这个问题不能靠单个关节数据解决，因为七轴机械臂各关节之间存在耦合，某个姿态下的力矩变化可能来自重力项，也可能来自速度、加速度和模型误差。我基于 URDF 和 Pinocchio 建立动力学模型，围绕 `Y(q, qdot, qddot) theta = tau` 构造回归问题，再设计 Fourier 多关节激励覆盖速度、加速度和耦合方向。

<figure class="report-figure">
  <img src="/images/lab/seven-axis/full-logic.jpg" alt="全参辨识运行逻辑" />
  <figcaption><strong>图 11 全参辨识运行逻辑。</strong>模型建立、激励采集、回归求解和质量评价被串成完整链路，服务于后续动力学前馈质量。</figcaption>
</figure>

求解阶段我使用列归一化、SVD 截断、Ridge 正则和先验约束处理病态方向。这个流程的重点不在于一次性得到完美参数，而是让模型、激励、采集、回归和质量评价都能被检查。图 12 的回归结果汇总把轨迹误差、质量项、COM 项和正则强度放在一起，帮助判断参数结果是否稳定。它也说明全参辨识不是孤立数学推导，而是为了让控制前馈和真机调试具备更可靠的模型基础。

<figure class="report-figure">
  <img src="/images/lab/seven-axis/full-summary.jpg" alt="全参辨识仿真回归结果汇总" />
  <figcaption><strong>图 12 全参辨识回归结果汇总。</strong>轨迹误差、质量项、COM 项和正则强度用于复查参数结果是否稳定，避免把病态方向误认为真实动力学参数。</figcaption>
</figure>

在全参辨识之后，我继续整理 payload 在线辨识。实验室后续任务中，末端可能挂载不同负载，机械臂本体参数不应每次都重新估计；更合理的做法是在已知本体模型基础上估计末端新增负载的质量、质心和惯量变化。我把这个模块理解为 payload-only 问题：先扣除已知本体力矩，再构造局部回归器，只让末端负载参数参与估计。估计器可以持续输出候选 payload 参数，但系统不能把每一次估计都直接用于控制；质量评价需要检查 rank、condition、prediction RMS、控制误差和参数稳定性。

<figure class="report-figure">
  <img src="/images/lab/seven-axis/online-logic.jpg" alt="payload 在线辨识运行逻辑" />
  <figcaption><strong>图 13 payload 在线辨识运行逻辑。</strong>时序采集、payload-only 回归、三类估计器、质量评价和发布控制被分开，避免把候选参数直接等同于可用控制参数。</figcaption>
</figure>

我整理了 full10 batch、full10 sliding 和 RLS 三类估计链路，并用 benchmark 比较不同估计器、窗口长度、轨迹类型和随机种子的表现。当前记录总运行数 100 次，best config 为 full10-sliding，窗口长度 2.0000 s，平均质量误差 1.5904e-04%，平均 COM 误差 4.2070e-04 mm，平均更新时间 0.0625 ms。这个结果说明仿真口径下 full10-sliding 在估计精度和更新时间之间取得了较好平衡，但进入控制器前仍需要结合安全门控和真机数据验证。

<div class="report-pair">
  <figure>
    <img src="/images/lab/seven-axis/online-benchmark.jpg" alt="payload 在线辨识 benchmark 汇总" />
    <figcaption><strong>图 14 payload 在线辨识 benchmark。</strong>质量误差、COM 误差、预测残差和更新时间被集中呈现，用于选择更适合在线使用的估计配置。</figcaption>
  </figure>
  <figure>
    <img src="/images/lab/seven-axis/online-best-config.jpg" alt="payload 在线辨识最优配置" />
    <figcaption><strong>图 15 payload 在线辨识最优配置。</strong>best config 结果为后续在线发布策略提供依据，说明估计结果需要通过质量门控再进入控制链路。</figcaption>
  </figure>
</div>

这一整页的阶段成果可以概括为一条从仿真、控制、硬件接口到参数辨识的连续链路。阻抗控制处理接触和柔顺响应，直接控制建立目标到力矩的基础闭环，摩擦辨识补足低速和换向特性，全参辨识支撑动力学前馈，payload 在线辨识面向末端负载变化。对我来说，这组工作最有价值的部分，是把模型、代码、嵌入式部署、真机观察、数据采集和 benchmark 放到同一套证据体系中，使每一次调试都能被追溯、复查和继续迭代。

<div class="result-grid">
  <article><strong>控制链路</strong><p>阻抗控制和直接控制把目标、模型、限幅、力矩输出和日志接到同一闭环，避免只停留在仿真图。</p></article>
  <article><strong>辨识链路</strong><p>摩擦和全参辨识把串口采集、激励、回归求解和质量评价连起来，能追溯每一轮参数结果。</p></article>
  <article><strong>部署链路</strong><p>STM32H743、UART、1 kHz 周期和发布门控让算法进入硬件接口前先经过工程边界检查。</p></article>
</div>

<figure class="report-table">
  <figcaption><strong>表 1 七轴机械臂调试链路阶段结果。</strong>表格把阻抗控制、直接控制、摩擦、全参和在线 payload 放回同一条实验室调试主线，说明每一段工作如何服务下一阶段。</figcaption>
  <table>
    <thead>
      <tr><th>调试环节</th><th>要解决的问题</th><th>我整理或实现的链路</th><th>阶段证据</th></tr>
    </thead>
    <tbody>
      <tr><td>阻抗控制</td><td>在接触和扰动场景下获得更可控的柔顺响应</td><td>URDF/MuJoCo 参数修正，Python/C++/C 迁移，STM32H743、UART 和 1 kHz 控制适配</td><td>仿真图、模型对比、跨语言代码、部署平台</td></tr>
      <tr><td>直接控制</td><td>把 TCP 目标转成可执行关节力矩，并保留可复查日志</td><td>五次 S 曲线、任务空间 PD、Jacobian 映射、`g+c` 前馈、安全限幅和状态机</td><td>控制逻辑图、工作空间采样、闭环日志、真机观察视频帧</td></tr>
      <tr><td>摩擦辨识</td><td>解释低速起转、换向和目标附近微动时的关节阻力</td><td>串口采集、单电机 multisine 激励、静态参数求解、LuGre 接口和质量矩阵</td><td>运行流程图、跨电机质量矩阵、静态参数面板</td></tr>
      <tr><td>全参辨识</td><td>支撑整机动力学前馈，降低模型参数不确定性</td><td>URDF/Pinocchio 建模、Fourier 多关节激励、回归矩阵构造、SVD/Ridge 求解</td><td>全参辨识流程、仿真回归摘要、轨迹误差和正则强度记录</td></tr>
      <tr><td>payload 在线辨识</td><td>在本体模型已知时估计末端新增负载参数</td><td>payload-only 回归、batch/sliding/RLS 估计器、benchmark 和发布前质量门控</td><td>benchmark 汇总、best config、质量误差、COM 误差和更新时间</td></tr>
    </tbody>
  </table>
</figure>
