---
title: '自动控制原理 - 创意台灯控制系统'
date: 2026-01-15
collection: coursework
permalink: /coursework/autocontrol/
tags:
  - 自动控制
  - Buck变换器
  - STM32
  - 嵌入式
  - PID控制
excerpt: '围绕"创意台灯控制系统"课程综合项目，完成了系统级的控制需求分析、Buck变换器设计与调试，以及闭环稳压/调光控制的建模与实验验证。'
---

# 自动控制原理 课程项目报告

# 创意台灯控制系统设计与分析

![封面图](/images/autocontrol/224aea3699c62839da4636161bee106d4d234ca7d0594abd367c3e236d5eeb7d.jpg)

**姓名**：洪竞权、贺禄文、周志鹏、王令凯、郭钟心

**学号**：20234262、20234232、20230647、20225188、20233852

**专业**：明月科创实验班

**单位**：重庆大学国家卓越工程师学院

**日期**：2026年1月

---

## 摘要

本项目面向"创意台灯控制系统"课程综合项目，围绕无影照明、多自由度关节可调与智能物联网交互三大核心需求，完成了系统级的控制需求分析、功率变换环节（Buck变换器）设计与调试，以及闭环稳压/调光控制的建模与实验验证。

在控制层面，以输出电压（或等效亮度）为被控量，采用离散PI作为基础控制器，结合采样同步、PWM生成与多重保护逻辑，分析了在参考输入阶跃与负载扰动下的稳定性与动态性能指标。在机械层面，完成了整体结构与关节剖视设计，并对关节摩擦保持、限位机构与装配工艺对控制性能的影响进行了定性分析。

**本项目的核心创新点包括：**

1. 基于多光源几何布局与漫反射原理的无影照明设计，有效消除传统点光源产生的硬阴影；  
2. 采用摩擦保持与机械限位相结合的多自由度关节机构，实现灯头姿态的连续可调与稳定保持；  
3. 基于WebBluetooth技术的跨平台上位机控制终端，无需安装原生应用即可通过浏览器实现设备连接、指令下发与实时数据监控；  
4. 自研WebBluetooth通信协议：采用双向16字节定长帧（帧头/帧尾区分方向）实现指令下发与环境数据实时回传，并为手势/语音/追踪/光敏/空气质量等功能扩展提供统一承载。

**关键词**：Buck变换器；离散PI控制；PWM调光；无影照明；关节机构；WebBluetooth；物联网

---

## 目录

- [1 课程项目概况和控制需求分析](#1-课程项目概况和控制需求分析)
- [2 直流Buck电源设计与调试](#2-直流buck电源设计与调试)
- [3 直流Buck电源建模与仿真](#3-直流buck电源建模与仿真)
- [4 直流Buck电源控制性能分析](#4-直流buck电源控制性能分析)
- [5 直流Buck电源闭环控制实验](#5-直流buck电源闭环控制实验)
- [6 创意台灯控制系统](#6-创意台灯控制系统)
- [7 总结与展望](#7-总结与展望)
- [8 参考文献](#8-参考文献)
- [附录](#附录)

---

## 1 课程项目概况和控制需求分析

本章依次介绍课程项目概况、控制需求分析与课程涉及的控制理论基础。

### 1.1 自动控制原理课程简介

自动控制原理研究在扰动与不确定性存在的条件下，如何通过反馈与控制器设计，使系统输出满足既定性能指标。典型连续系统可抽象为

$$
y(s) = G(s) u(s), \quad u(s) = C(s) \big(r(s) - y(s)\big),
$$

其中 $r$ 为参考输入，$y$ 为输出，$u$ 为控制输入，$G(s)$ 为被控对象传递函数，$C(s)$ 为控制器。课程关注的核心指标通常包括：稳定性（渐近稳定/相对稳定）、稳态误差、动态响应（超调量、调节时间、上升时间）、鲁棒性（对参数摄动与外扰的敏感性）以及噪声抑制能力。

![典型负反馈闭环控制系统框图](/images/autocontrol/496c0d21c27317a483c637ef4270b12f364473e6ee5c133e16a414e6eaceffc5.jpg)
*图1：典型负反馈闭环控制系统框图*

### 1.2 项目概况

#### 1.2.1 基础项目：直流电源（Buck变换器）控制分析与设计

基础项目以降压型直流变换器（Buck）为对象，实现对输出电压的稳定调节。系统由功率级（开关管、续流二极管、滤波电感电容）、采样与驱动级（电压采样、栅极驱动）、以及数字控制器（STM32F103C8，ADC+PWM）组成。

#### 1.2.2 综合项目：创意台灯控制系统

综合项目以"创意台灯"为载体，将电源控制、调光控制与机械结构设计进行系统集成。本项目突出特点为：无影照明与关节结构设计。

![系统总体框图](/images/autocontrol/e6459bc09aef3181fcfb6d582059ab29bd4eaf501e95b93886259c1ff0cbe538.jpg)
*图2：系统总体框图*

### 1.3 控制需求分析

本项目的控制需求可从"被控量—执行量—扰动/噪声—约束"四元组进行形式化表述。

| 指标类别 | 指标定义 | 目标值/约束 |
|---------|---------|------------|
| 稳态精度 | \|ess\|或\|vo-vo*\| | ≤0.12V(1%) |
| 动态性能 | tr, ts, Mp | tr≤1ms, ts≤5ms, Mp≤10% |
| 抗扰性能 | 负载/输入扰动恢复时间与最大偏差 | 恢复时间≤3ms, 最大偏差≤0.5V |
| 纹波/闪烁保护与安全 | Δvo、亮度波动幅度/频率 | Δvo≤100mV, 无可见闪烁 |

### 1.4 课程涉及控制理论基础

本项目主要使用以下控制理论工具链：

- **建模与线性化**：基于平均化模型与小信号线性化获得 $G_{vd}(s)$ 等关键传递函数
- **稳定性判据**：劳斯判据、根轨迹与奈奎斯特判据
- **频域指标**：波特图中的增益裕度/相位裕度与带宽
- **PI 控制**：通过比例项提高响应速度、积分项消除稳态误差

### 1.5 本章小结

本章从系统目标出发，提出了可量化的控制指标与安全约束，并明确了后续章节的技术路线。

---

## 2 直流Buck电源设计与调试

### 2.1 Buck变换器拓扑原理分析

Buck变换器通过高频开关将输入直流电压 $V_{\mathrm{in}}$ 变换为较低的输出直流电压 $V_{o}$。在连续电感电流模式（CCM）下，其稳态电压变换比为

$$
V_{o} \approx D V_{\mathrm{in}},
$$

其中 $D \in (0,1)$ 为PWM占空比。

![Buck变换器基本拓扑](/images/autocontrol/a0ea14f8b2c5e170aa01a485d3cfa3cbe5bfd4ac5f6c66f8d28e3aa27096d1ef.jpg)
*图3：Buck变换器基本拓扑*

![CCM模式下Buck变换器关键波形](/images/autocontrol/953f4e9750549d39935120377d533d0b8b69ac33c45f6a2ba57955ac632ee729.jpg)
*图4：CCM模式下Buck变换器关键波形*

### 2.2 Buck变换器元器件选型及参数选择

| 项目 | 符号/规格 | 取值/型号 |
|-----|---------|----------|
| 输入电压 | Vin | 15V |
| 输出电压 | Vo | 12V |
| 输出电流 | I0 | 3A |
| PWM频率 | fs | 100kHz |
| 电感 | L | 100μH |
| 输出电容 | C, rESR | 100μF，ESR约0.05Ω |
| 控制器 | MCU型号 | STM32F103C8 |

![Buck主电路原理图](/images/autocontrol/dbed2dbcad2e550370a7aa55b3af953e01b3fac2b089ea1ceccaff0d0e372a5e.jpg)
*图5：Buck主电路原理图*

### 2.3 Buck变换器实物调试

![开关节点电压与栅极驱动波形](/images/autocontrol/2ff013a887a574ab46ae3bba972701620304ca8ad242cb9a6450295dceed29e9.jpg)
*图6：开关节点电压与栅极驱动波形*

### 2.4 本章小结

本章完成了Buck功率级的拓扑分析与元器件选型，并记录了实物调试过程。

---

## 3 直流Buck电源建模与仿真

### 3.1 Buck变换器仿真

**开环仿真：**

![Buck开环仿真电路](/images/autocontrol/f1396bcf728d2eee65fc71a5b897fb207913636837fa6966577935351430f948.jpg)

![Buck开环仿真结果](/images/autocontrol/dc0f33e9da046328f9ebda499f99be00f4c6202ecc15a0673f98c03005ae33b1.jpg)
*图7-8：Buck开环仿真*

**闭环仿真：**

![Buck闭环仿真电路](/images/autocontrol/f86bd17e28eab6751fd75421b6f8bfb137960c42d29367083e589f39a7e886c1.jpg)

![Buck闭环仿真结果](/images/autocontrol/53d9a4bd62d7276aaeab28ccb314ac73092899c13c7f183cb4b9c1201d8d2bfa.jpg)
*图9-10：Buck闭环仿真*

### 3.2 Buck变换器建模

根据小信号平均模型推导，主电路控制到输出的传递函数可写为二阶形式：

$$
G_{vd}(s) = \frac{V_{\text{in}}}{1 + sRC + s^{2}LC}.
$$

![Buck变换器建模与控制框图](/images/autocontrol/92536a22fc4e4a9ef4ac02b0efc7b12e0834a268a269092629ce66ca6c2f224a.jpg)

![Buck变换器小信号模型框图](/images/autocontrol/c4428a706c44e2f04828cc73295dc225ee0c2978a29bfb80a9e80275f93a960c.jpg)
*图11-12：Buck变换器建模*

![Buck变换器电压模式控制框图](/images/autocontrol/9dfb1f48fb41724ceb555351bed7679271f8340e4bca000cb6d55214c7754b48.jpg)

![Buck变换器关键传递函数](/images/autocontrol/1e1a0e5bb77bbd7ddf2740c415b24e92cba3aaee03c6dac1b668040cd309ce89.jpg)
*图13：Buck变换器关键传递函数*

### 3.3 输出电压纹波计算

![输出电压纹波计算](/images/autocontrol/aa8b7e093e03430886fabee17c5b40362653aa988ca060db0ad4e052c5489230.jpg)

![输出电压波形](/images/autocontrol/92516c9dfd60bb33a4af0d6a85f509825a0c129170ac5a94a2e7f996dbb795b9.jpg)
*图14-15：输出电压纹波计算*

### 3.4 电容寄生电阻计算

![电容寄生电阻计算电路](/images/autocontrol/5cdc19ec2a822858a9a566b4e214296f06f1ba1695c6d31a2c576469e8eae5ce.jpg)

![电容寄生电阻计算波形](/images/autocontrol/ff6c235933fcf68ccc6f363e69a51b7695324371ae76b5766237196c0856e811.jpg)

![电容寄生电阻计算结果](/images/autocontrol/07e987c66ae75f1bcb375abe69a5d29b02a9f7f5e40a7db67d1f805c15097e82.jpg)
*图16-18：电容寄生电阻计算*

### 3.5 本章小结

本章建立了Buck变换器的平均化小信号模型，并通过PSIM仿真验证了开环/闭环特性与纹波/ESR计算结果。

---

## 4 直流Buck电源控制性能分析

### 4.1 劳斯稳定判据分析

闭环系统的特征方程分母为

$$
10^{-7}s^{3} + 2 \times 10^{-4}s^{2} + 1.0002s + 2 \times 10^{-3} = 0,
$$

其系数全为正，且劳斯表首列中 $b_{1} \approx 1.000199 > 0$，因此闭环系统满足劳斯稳定判据。

![参数稳定域](/images/autocontrol/71cba4eb5c097569013fba7812bd5fb3ef109bc4b330f71af4c30d184209204d.jpg)
*图20：$(K_{p}, K_{i})$ 参数平面上的稳定域*

### 4.2 根轨迹分析

![根轨迹与参数影响](/images/autocontrol/20292dd834cd5055109f4cd393a93d1d32bdbe7d9e1bb4db54504dec1e5709b6.jpg)
*图21：根轨迹与参数影响说明*

### 4.3 奈奎斯特稳定判据分析

![奈奎斯特曲线](/images/autocontrol/b7d5f649b2a1965f120fe993263d733cd0f22dfd86af8b4b6b2f9e5f4acbd746.jpg)
*图22：奈奎斯特曲线与稳定性判据*

### 4.4 波特图分析

![波特图](/images/autocontrol/82ef10be4221a46aecb12518a7da98b6a04a221a8dfb85ab856a3311ba850f41.jpg)
*图23：开环/闭环波特图及裕度标注*

### 4.5 闭环负载稳定边界计算及仿真验证

最终稳定边界：$0.5\Omega < R < 10\Omega$

![闭环负载稳定边界仿真](/images/autocontrol/b581f3f3f0b5facf70c5caa36d13e3b27714f37ce169f0c94262a780e6bc5ef5.jpg)
*图24：闭环负载稳定边界仿真*

### 4.6 考虑寄生参数的波特图分析

![考虑寄生参数的波特图](/images/autocontrol/d2e4b75a83756ccf8ec330e8d4f65369d4d8668bba1a633b150e28bf3aa7744d.jpg)
*图25：考虑寄生参数的波特图对比*

### 4.7 PSIM仿真扫频波特图

![PSIM扫频波特图](/images/autocontrol/1ff090515348caa952f63eec3215962f2be5d54dda379a41fb8a7d0f33c1893d.jpg)

![PSIM扫频波特图细节](/images/autocontrol/7d21c7416075f25e2038d3ba8b678d8c09871987dc525f7303d702885da7b91a.jpg)
*图26-27：PSIM扫频波特图*

### 4.8 本章小结

本章从时域（根轨迹）与频域（奈奎斯特/波特图）两个维度分析了闭环稳定性与鲁棒性。

---

## 5 直流Buck电源闭环控制实验

### 5.1 KEIL5软件环境安装及创建

![Keil MDK-ARM工具链](/images/autocontrol/8995ee4eec5e9afcc776271c1fd8da2419bc516d6e8336f81f8388b23145ae3a.jpg)
*图28(a)：Keil MDK-ARM工具链*

![Keil μVision5 IDE](/images/autocontrol/fe0d98a5c9706b65c62ab83e219e37e1f88b28012ff04ec3379b2ce0d4dcd5e1.jpg)
*图28(b)：Keil μVision5 IDE*

![STM32CubeMX](/images/autocontrol/68d96b56a79b0476647641911208b1dee40d82ba17022b17628038550966f118.jpg)
*图28(c)：STM32CubeMX*

![STM32CubeMonitor](/images/autocontrol/ef91682533b639730c898eb09d707d1d46c401ffab9e6d5a43d654b970bd5e4c.jpg)
*图28(d)：STM32CubeMonitor*

![工程结构示意](/images/autocontrol/0cb5c4d0bf339c6dbaf068dc3bf6fefc12d0a440b35a55c349e4e0e38f3e8163.jpg)
*图29：工程结构示意*

### 5.2 ADC采样及PWM生成原理

![ADC采样与PWM同步时序](/images/autocontrol/6d8da155df5438266d792902ee6309d20f4b519f32b6321dbf1a739063a8698b.jpg)
*图30：ADC采样与PWM同步时序*

### 5.3 基本PI控制理论及程序

![PI/PID结构示意](/images/autocontrol/033c124b9cb01a79862b9d32a9d302592dd225683d020ddf416ddfec5cd59462.jpg)
*图31：PI/PID结构示意*

![离散PI控制流程图](/images/autocontrol/b03b61dae7a5252ff3f4bbf5bc2ce5b1e996e6a71c94ba90261f21dfef114d99.jpg)
*图32：离散PI控制流程图*

### 5.4 闭环PI稳压调控输出

![闭环稳压波形](/images/autocontrol/98bf125c98e52bf1c7b8809991b8f3439371946d5540875a6c5e3c7602c02d77.jpg)

![稳态统计](/images/autocontrol/b884d6a48115d29089e4654058cd1f912c1371dc67e74ce475312f3dec596b1e.jpg)
*图33：闭环稳压波形与稳态统计*

### 5.5 闭环参考电压跳变实验与分析

![参考阶跃响应](/images/autocontrol/0b659e7d92d9b9d0b4073c60d9941e80fbd6050586bef4117ee90a2e0e46f6d9.jpg)
*图34：参考阶跃响应 10V↔12V*

![不同PI参数下的阶跃响应对比](/images/autocontrol/a1771755031f791b7ce9d05863d16005cbbda798faedce88ee28a3f260c257fa.jpg)
*图35：不同PI参数下的阶跃响应对比*

![负载突变实验](/images/autocontrol/76c937a7ec91a41d1323f514f84492751a107dff27d5c0de051be7fb189598c1.jpg)
*图36：负载突变实验*

### 5.6 FreeRTOS综合任务控制

![FreeRTOS实时操作系统](/images/autocontrol/95b40aa00d436daeea28d8037fedf99418919ffc821c87e0043e703358950cf3.jpg)
*图37：FreeRTOS实时操作系统*

![FreeRTOS任务协同](/images/autocontrol/feb3f080f6f02a46aa97b24c8f6e2e44492416bff8bd6b881d07c5ceea5c7665.jpg)
*图38：FreeRTOS任务协同*

### 5.7 本章小结

本章从工具链搭建、PWM/ADC驱动、采样滤波、PI控制整定到FreeRTOS任务化集成，记录了直流Buck闭环控制实验的完整流程。

---

## 6 创意台灯控制系统

![创意台灯项目概览](/images/autocontrol/919d1f792af60b593c9b03be502e324e543f8810829a8ef31df4ff6f5c2197b3.jpg)
*图39：创意台灯项目概览*

### 6.1 项目概述

#### 6.1.1 设计要求

- 满足日常学习/办公场景的照明需求，照射区域尽量减小阴影干扰
- 台灯姿态可调且可稳定悬停，兼顾可调范围与调节手感
- 集成多模块并保证结构布置合理、布线规整与安全可靠

#### 6.1.2 需求调研与证据

![用户调研结果](/images/autocontrol/2542736f8219f6b55fc7c8779c95a3b8c9d2ae2b9f1a2f93d8032577458fd12e.jpg)
*图40：用户调研结果（Top5）*

### 6.2 设计思路

| 方案项 | 可实现性 | 性能潜力 | 成本/复杂度 | 综合得分 |
|-------|---------|---------|------------|---------|
| 光源:三边+斜向补光 | 5 | 4 | 4 | 4.4 |
| 关节:密封圈压紧 | 4 | 4 | 4 | 3.9 |
| 交互:WebBluetooth网页端 | 5 | 4 | 4 | 4.4 |

### 6.3 台灯结构设计

![台灯结构设计概览](/images/autocontrol/b8428b518473c7ba8f31c79545ef675c35267b92b50b01a151ef1997314b7159.jpg)
*图41：台灯结构设计概览*

![整机机械总装示意](/images/autocontrol/6e727c3807c8d2d93ac89abdddc81723317d6f5dd43f8ae3f68edeb48b4b80e8.jpg)
*图42：整机机械总装示意*

![关节剖视结构](/images/autocontrol/aaf2fba92505142d90c9a618f13ece564f1685ed7a6ac16cf78536c6ea497704.jpg)
*图43：关节剖视结构*

![整体结构组成](/images/autocontrol/13a1a38f91cc01aa50a892b875994cfcf70a092bea7389ab267d725728e7d512.jpg)
*图44：整体结构组成与连接示意*

**底座模块：**

![底座正面交互区](/images/autocontrol/98621c9a190d282dc859166953aff872fa3fa3bf6b4756ce2a7b69b6c67b3ecf.jpg)
*图45：底座正面交互区*

![底座上方模块布局](/images/autocontrol/fe2a535b40453fe923c6a67612a12d2ee411c0841828b4fb55b6e26d65329ddd.jpg)
*图46：底座上方模块布局*

![底座上方模块布局细节](/images/autocontrol/2cf15ed76649d2ae677876f59f43c676ee8e6806c7c2366c4e800e167e63e1cb.jpg)
*图47：底座上方模块布局（细节）*

![底座背部接口](/images/autocontrol/d501bbf63d80151c97fdecdf6833d2b4f7456304c133836cb7528136b53e74d3.jpg)
*图48：底座背部接口与传感器布置*

**灯管模块：**

![灯管模块与舵机旋转调控](/images/autocontrol/1b9fb253f9b1fb102db9e1a81c63d504d756df3cef75b9377395308672b031a7.jpg)
*图49：灯管模块与舵机旋转调控示意*

![灯管角度调节结构](/images/autocontrol/742d5e981be2b901cc408001c61afe250f10d70d98a5e8e576537d0871fcd4aa.jpg)

![灯管角度调节结构细节](/images/autocontrol/0edfb20ecfdc0b4253289e8c9bc9aa0890d130ec12e36cecf52bda3ed463206a.jpg)
*图50-51：灯管角度调节结构*

![三边式光源布局与补光结构](/images/autocontrol/78c062d765b46cfa83cf9fe7df8718dd3793183619852463975ee8c5fe342023.jpg)
*图52：三边式光源布局与补光结构*

### 6.4 控制方案设计

![OLED本地显示界面](/images/autocontrol/73325e8d20bb74984b28c133f1c4ed0106cd9f729484bc3b879080411f4bc91f.jpg)
*图53：OLED本地显示界面示意*

### 6.5 无影灯设计方案

#### 6.5.1 无影设计原理

![无影设计原理](/images/autocontrol/a1ab6491d823fc5522f3395411d08dddfbea7e6f46267d311e5b3a86842e3df1.jpg)
*图54：无影设计原理示意*

#### 6.5.2 光源阵列设计

![光源布局优化](/images/autocontrol/2c132c7c3315a31487ed51889ea78ffd0b8fbbb15971e27c21505e9eb8122ad7.jpg)

![光源布局优化细节](/images/autocontrol/ad20a83d4da7602e6393cca2471e598c1dfa5b92fd2f1ca1601f2ed52aa48ed8.jpg)
*图55-56：光源布局优化示意*

![光源阵列布局俯视](/images/autocontrol/61086d7d48800d3f8e4f01a5980ad131c4176d19ac4f34bd08d0174e4e26d257.jpg)
*图57：光源阵列布局俯视示意*

**光源角度调节：**

![传统角度调节方案问题](/images/autocontrol/47ba32c0cbcb0fdf8e70b60bfc3eabb3917daa2cab698d0275232557bb3c9cba.jpg)
*图58：传统角度调节方案问题示意*

![密封圈压紧结构角度调节方案](/images/autocontrol/6917772fbd82a5b21d089f262aacd74869fca4c381b4bb7caaf063438a6f1c35.jpg)
*图60：密封圈压紧结构角度调节方案*

![密封圈压紧结构角度调节方案细节](/images/autocontrol/ae41e5da41376c59c9982e5b24fc158076f7117ba19a7cce9b327d1ca82104f8.jpg)
*图61：密封圈压紧结构角度调节方案（细节）*

#### 6.5.3 光学组件设计

![光学组件](/images/autocontrol/8d74b6a12af4ead34d270c7bdc4a648d851494a6e24a0fd44282c6ce079ecddc.jpg)
*图62：光学组件：LED灯带与扩散板*

#### 6.5.4 无影效果验证

![无影效果验证热力图](/images/autocontrol/e21a6aef0cfbb3b13e69748ae4ce61628d08e8623d11af2ca450fe24dffa5219.jpg)

![无影效果验证剖面图](/images/autocontrol/47432a75abe657e664840c57d56b31348cda8aea95cb226857e9a9aa5701d2db.jpg)

![无影效果验证对比](/images/autocontrol/7198176c4d3c49a90dfc62bd5d53116157e90c0cfb92400574730953b3437fb6.jpg)
*图63-64：无影效果验证*

| 工况 | Eavg(lux) | U1=Emin/Eavg | U2=Emin/Emax | 阴影对比度C |
|-----|----------|-------------|-------------|-----------|
| 补光前 | 520 | 0.73 | 0.58 | 0.31 |
| 补光后 | 640 | 0.82 | 0.72 | 0.09 |

### 6.6 系统调试与性能验证

| 维度 | 指标 | 目标 | 结果 |
|-----|-----|-----|-----|
| 照明效果 | 均匀度 U1 | ≥0.80 | 0.82 |
| 照明效果 | 阴影对比度C | ≤0.10 | 0.09 |
| 响应性能 | 调节时间 ts | ≤5ms | 4.2ms |
| 结构性能 | 悬停稳定 | ≤2° | 约1.2° |

![系统性能综合验证评分](/images/autocontrol/0ca187d2a7da8ae97f5b04c3b0e3bfba0bc86291e050029f2de84d2f6d9456d4.jpg)
*图65：系统性能综合验证评分*

### 6.7 成本预算与物料清单

| 物料名称 | 数量 | 单价(元) | 小计(元) |
|---------|------|---------|---------|
| STM32F103C8T6 最小系统板 | 1 | 15 | 15 |
| Buck 电源模块 | 1 | 8 | 8 |
| LED 灯带 (5050, 1m) | 2 | 12 | 24 |
| SG90 舵机 | 2 | 8 | 16 |
| HC-05 蓝牙模块 | 1 | 18 | 18 |
| 0.96 寸 OLED 显示屏 | 1 | 12 | 12 |
| 其他物料 | - | - | 139 |
| **合计** | | | **232** |

---

## 7 总结与展望

### 7.1 课程小结

本项目围绕"创意台灯控制系统"课程综合项目，完成了从需求分析到系统实现的全流程工作：

1. **控制需求系统化**：以可量化指标刻画系统性能需求
2. **功率级建模与分析**：完成了平均化小信号建模
3. **数字控制实现**：完成了离散PI控制器的设计与调试
4. **创意系统集成**：形成"七大创新"

### 7.2 课程收获及建议

本项目强化了以下能力：
- 理论到工程的闭环思维
- 系统集成能力
- 调试与权衡意识

---

## 8 参考文献

[1] 智能台灯控制终端（WebBluetooth上位机）  
[2] Ogata K. Modern Control Engineering (5th Edition)  
[3] Franklin G F, et al. Feedback Control of Dynamic Systems (8th Edition)  
[4] 胡寿松. 自动控制原理（第七版）  
[5] Erickson R W, Maksimovic D. Fundamentals of Power Electronics (3rd Edition)  
[6] STMicroelectronics. STM32 Reference Manual  
[7] W3C. Web Bluetooth Community Group Draft Report

---

## 附录

### A. WebBluetooth通信协议

![WebBluetooth通信时序](/images/autocontrol/eae9ef4faf561f94857249130e66ff17d22649729b662681de89acae26f26557.jpg)
*图66：WebBluetooth通信时序*

**下行控制帧（16字节）：**

![下行控制帧](/images/autocontrol/20883f1f653012be6ab70f8ce909c8f1e8052ffaa288dc3aa69c46b399aba878.jpg)

**上行数据帧（16字节）：**

![上行数据帧](/images/autocontrol/3e8889f61aa3aaad4cb15dec2883c5c9322855235ffd54b9fe8f66cf0fcab4da.jpg)
*图67：双向16字节通信帧结构*

