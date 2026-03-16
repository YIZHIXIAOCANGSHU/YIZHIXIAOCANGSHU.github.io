# Implementation Plan: Timeline Redesign

## Overview

本实现计划将时间轴组件重构为使用GSAP动画的现代化组件，支持三种主题（亮色、暗色、极客）自动切换。实现采用渐进式方法，先建立样式基础，再添加动画功能。

## Tasks

- [x] 1. 创建时间轴专用样式文件和CSS变量
  - [x] 1.1 创建 `_sass/_timeline.scss` 文件，定义时间轴基础样式
    - 使用CSS变量定义所有颜色
    - 实现纯CSS连接线（不使用JavaScript计算）
    - 定义卡片、节点、日期标签样式
    - _Requirements: 1.1, 1.5, 4.1_
  
  - [x] 1.2 在 `_sass/theme/_default.scss` 中添加时间轴CSS变量
    - 定义亮色主题的时间轴颜色变量
    - _Requirements: 1.2, 1.6_
  
  - [x] 1.3 在 `_sass/theme/_dark.scss` 中添加时间轴CSS变量
    - 定义暗色主题的时间轴颜色变量
    - _Requirements: 1.3, 1.6_
  
  - [x] 1.4 在 `_sass/theme/_geek.scss` 中添加时间轴CSS变量
    - 定义极客主题的时间轴颜色变量
    - 添加霓虹发光效果变量
    - _Requirements: 1.4, 1.6_
  
  - [x] 1.5 验证无硬编码颜色
    - **Property 1: No Hardcoded Colors**
    - **Validates: Requirements 1.1, 1.5**

- [x] 2. Checkpoint - 确保样式基础完成
  - 确保所有测试通过，如有问题请询问用户

- [x] 3. 重构HTML模板
  - [x] 3.1 重构 `_includes/horizontal-timeline.html`
    - 移除旧的JavaScript线条计算代码
    - 添加纯CSS连接线元素
    - 添加GSAP脚本引用
    - _Requirements: 4.1, 2.1_
  
  - [x] 3.2 重构 `_includes/horizontal-timeline-item.html`
    - 添加动画相关的data属性
    - 优化HTML结构
    - _Requirements: 3.1, 3.2_
  
  - [x] 3.3 创建 `_includes/timeline-scripts.html`
    - 加载GSAP和ScrollTrigger CDN
    - 实现动画初始化逻辑
    - 实现GSAP加载失败降级方案
    - _Requirements: 2.1, 2.2, 6.4, 6.5_

- [x] 4. 实现GSAP动画
  - [x] 4.1 实现时间轴项目入场动画
    - 从下方滑入并淡入
    - 实现错开动画效果
    - _Requirements: 3.1, 2.4_
  
  - [x] 4.2 实现节点缩放动画
    - 节点从0缩放到1
    - 使用弹性缓动效果
    - _Requirements: 3.2_
  
  - [x] 4.3 实现连接线绘制动画
    - 从左到右绘制效果
    - _Requirements: 4.2_
  
  - [x] 4.4 实现ScrollTrigger滚动触发
    - 配置视口触发点
    - 实现滚动进度关联
    - _Requirements: 2.3, 2.5_

- [x] 5. Checkpoint - 确保动画功能完成
  - 确保所有测试通过，如有问题请询问用户

- [x] 6. 添加交互效果和响应式支持
  - [x] 6.1 实现悬停效果
    - 卡片上浮效果
    - 主题相关的发光效果
    - _Requirements: 3.3_
  
  - [x] 6.2 实现响应式样式
    - 768px断点适配
    - 触摸滚动优化
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [x] 6.3 实现减少动画偏好支持
    - CSS媒体查询
    - JavaScript检测
    - _Requirements: 3.5_

- [x] 7. 集成和清理
  - [x] 7.1 在主样式文件中导入时间轴样式
    - 确保样式正确加载
    - _Requirements: 6.3_
  
  - [x] 7.2 清理旧的时间轴样式代码
    - 从 `_sass/_collapse.scss` 移除旧样式
    - _Requirements: 6.1_
  
  - [x] 7.3 验证主题CSS变量完整性
    - **Property 2: Theme CSS Variables Completeness**
    - **Validates: Requirements 1.6, 4.3**
  
  - [x] 7.4 验证纯CSS连接线实现
    - **Property 3: CSS-Only Connector Line**
    - **Validates: Requirements 4.1**

- [x] 8. Final Checkpoint - 确保所有功能完成
  - 确保所有测试通过，如有问题请询问用户

## Notes

- 所有任务均为必需，包括测试验证任务
- 每个任务都引用了具体的需求条款以便追溯
- 检查点确保增量验证
- 属性测试验证通用正确性属性
