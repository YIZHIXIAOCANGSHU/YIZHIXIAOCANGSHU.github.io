# Implementation Plan: Timeline Dot-Line Alignment

## Overview

本实现计划将时间轴组件的点线对齐系统从硬编码值重构为基于CSS变量的动态计算系统。实现将分为三个阶段：定义CSS变量、重构现有样式、更新响应式断点。

## Tasks

- [x] 1. 定义CSS变量系统
  - [x] 1.1 在 `.horizontal-timeline` 中添加分组的CSS变量定义
    - 添加 Line Variables Group（`--timeline-line-top`, `--timeline-line-height`）
    - 添加 Node Variables Group（`--timeline-node-size`, `--timeline-node-border-width`）
    - 添加派生变量 `--timeline-node-offset` 使用 `calc()` 计算
    - 添加清晰的注释说明变量分组和依赖关系
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 6.1, 6.2, 6.4, 6.5_

- [x] 2. 重构线和节点的定位样式
  - [x] 2.1 更新 `.horizontal-timeline-line` 使用CSS变量
    - 将 `top: 50px` 替换为 `top: var(--timeline-line-top)`
    - 将 `height: 4px` 替换为 `height: var(--timeline-line-height)`
    - _Requirements: 2.1, 5.2_
  
  - [x] 2.2 更新 `.horizontal-timeline-track` 使用CSS变量
    - 将 `top: 50px` 替换为 `top: var(--timeline-line-top)`
    - 将 `height: 4px` 替换为 `height: var(--timeline-line-height)`
    - _Requirements: 2.1_
  
  - [x] 2.3 更新 `.horizontal-timeline-item::before` 节点样式使用CSS变量
    - 使用 `calc()` 计算 `top` 值，基于 `--timeline-line-top` 和 `--timeline-node-size`
    - 将 `width` 和 `height` 替换为 `var(--timeline-node-size)`
    - 将 `border-width` 替换为 `var(--timeline-node-border-width)`
    - _Requirements: 1.4, 2.1, 2.2, 2.3, 5.3_

- [x] 3. Checkpoint - 验证默认视口对齐
  - 确保默认视口下节点与线正确对齐
  - 验证hover和active状态正常工作
  - 如有问题请提出

- [x] 4. 更新响应式断点
  - [x] 4.1 重构768px断点样式
    - 只修改CSS变量值（`--timeline-line-top`, `--timeline-node-size`）
    - 移除对 `.horizontal-timeline-line` 和 `.horizontal-timeline-track` 的 `top` 重复定义
    - 移除对 `.horizontal-timeline-item::before` 的 `top`, `width`, `height` 重复定义
    - _Requirements: 3.1, 3.3, 4.2_
  
  - [x] 4.2 重构480px断点样式
    - 只修改CSS变量值（`--timeline-line-top`, `--timeline-node-size`, `--timeline-node-border-width`）
    - 移除对节点定位的重复定义
    - _Requirements: 3.2, 3.3, 4.3_

- [x] 5. 更新动画和特殊状态样式
  - [x] 5.1 更新hover状态使用CSS变量
    - 确保 `.horizontal-timeline-item:hover::before` 的 `transform` 正确
    - _Requirements: 4.4_
  
  - [x] 5.2 更新active状态使用CSS变量
    - 确保 `.horizontal-timeline-item.is-active::before` 的 `transform` 正确
    - _Requirements: 4.4_
  
  - [x] 5.3 更新reduced-motion媒体查询
    - 确保 `prefers-reduced-motion` 下的样式使用CSS变量
    - _Requirements: 4.4_
  
  - [x] 5.4 更新touch设备样式
    - 确保 `hover: none` 媒体查询下的样式使用CSS变量
    - _Requirements: 4.4_

- [x] 6. Final Checkpoint - 完整验证
  - 验证所有断点下节点与线对齐正确
  - 验证所有交互状态正常
  - 验证动画效果正常
  - 如有问题请提出

## Notes

- 所有修改仅涉及 `_sass/_timeline.scss` 文件
- 保持向后兼容性是关键，视觉效果应与修改前完全一致
- CSS变量的命名遵循 `--timeline-{group}-{property}` 模式
