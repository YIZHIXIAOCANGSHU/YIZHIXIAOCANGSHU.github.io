# Requirements Document

## Introduction

本文档定义了网站时间轴组件重构的需求。目标是使用GSAP动画库重新设计横向时间轴，实现更炫酷的滚动触发动画效果，并支持随网站主题（亮色/暗色）自动切换。

## Glossary

- **Timeline_Component**: 横向时间轴组件，用于在CV页面展示项目、课程作业和实验室工作的时间线
- **Timeline_Item**: 时间轴上的单个条目，包含标题、日期和描述信息
- **GSAP**: GreenSock Animation Platform，业界领先的JavaScript动画库
- **ScrollTrigger**: GSAP的滚动触发插件，用于实现滚动驱动的动画效果
- **Theme_System**: 网站的三主题切换系统，支持亮色(light)、暗色(dark)和极客(geek)三种模式，通过CSS变量和`html[data-theme]`属性实现
- **Light_Theme**: 默认亮色主题，不设置data-theme属性
- **Dark_Theme**: 暗色主题，通过`html[data-theme="dark"]`选择器激活
- **Geek_Theme**: 极客/赛博朋克主题，通过`html[data-theme="geek"]`选择器激活，具有霓虹绿、青色等特殊配色
- **CSS_Variable**: CSS自定义属性，用于定义可复用的颜色和样式值

## Requirements

### Requirement 1: 主题适配

**User Story:** 作为网站访问者，我希望时间轴能够随网站主题自动切换颜色，以便在亮色、暗色和极客三种模式下都有良好的视觉体验。

#### Acceptance Criteria

1. THE Timeline_Component SHALL use CSS variables from the Theme_System for all color definitions
2. WHEN the website theme is set to Light_Theme, THE Timeline_Component SHALL display with light background and standard accent colors
3. WHEN the website theme changes to Dark_Theme, THE Timeline_Component SHALL automatically update all colors to match the dark theme
4. WHEN the website theme changes to Geek_Theme, THE Timeline_Component SHALL display with cyberpunk styling including neon glow effects
5. THE Timeline_Component SHALL NOT use any hardcoded color values (such as #007acc)
6. THE Timeline_Component SHALL define theme-specific CSS variables for timeline-specific colors (accent color, card background, shadow colors, glow effects)

### Requirement 2: GSAP动画集成

**User Story:** 作为网站访问者，我希望时间轴具有流畅的滚动触发动画，以便获得更好的视觉体验和交互感受。

#### Acceptance Criteria

1. THE Timeline_Component SHALL load GSAP and ScrollTrigger libraries from CDN
2. WHEN the page loads, THE Timeline_Component SHALL initialize GSAP animations
3. WHEN a Timeline_Item enters the viewport, THE Timeline_Component SHALL trigger an entrance animation for that item
4. THE Timeline_Component SHALL implement staggered animations so items animate sequentially with a delay between each
5. THE Timeline_Component SHALL animate the timeline connector line as the user scrolls

### Requirement 3: 时间轴项目动画效果

**User Story:** 作为网站访问者，我希望每个时间轴项目都有独特的动画效果，以便时间轴看起来更加生动有趣。

#### Acceptance Criteria

1. WHEN a Timeline_Item enters the viewport, THE Timeline_Component SHALL animate it from below with opacity fade-in
2. WHEN a Timeline_Item enters the viewport, THE Timeline_Component SHALL animate its node point with a scale effect
3. WHEN a user hovers over a Timeline_Item, THE Timeline_Component SHALL apply a subtle lift and glow effect
4. THE Timeline_Component SHALL ensure all animations are smooth with appropriate easing functions
5. IF the user has reduced motion preferences enabled, THEN THE Timeline_Component SHALL disable or reduce animations

### Requirement 4: 时间轴连接线动画

**User Story:** 作为网站访问者，我希望时间轴的连接线有动态效果，以便更好地展示时间的流动感。

#### Acceptance Criteria

1. THE Timeline_Component SHALL render the connector line using CSS without JavaScript calculations
2. WHEN the page loads, THE Timeline_Component SHALL animate the connector line drawing from left to right
3. THE Timeline_Component SHALL apply a gradient effect to the connector line that matches the current theme
4. WHEN a Timeline_Item becomes active (in viewport), THE Timeline_Component SHALL highlight the corresponding section of the connector line

### Requirement 5: 响应式设计

**User Story:** 作为移动设备用户，我希望时间轴在小屏幕上也能正常显示和交互。

#### Acceptance Criteria

1. THE Timeline_Component SHALL maintain horizontal scrolling behavior on all screen sizes
2. WHEN viewed on screens smaller than 768px, THE Timeline_Component SHALL adjust item widths appropriately
3. THE Timeline_Component SHALL provide smooth touch scrolling on mobile devices
4. THE Timeline_Component SHALL ensure animations perform well on mobile devices without causing lag

### Requirement 6: 代码架构

**User Story:** 作为开发者，我希望时间轴组件的代码结构清晰，便于维护和扩展。

#### Acceptance Criteria

1. THE Timeline_Component SHALL separate concerns into distinct files: HTML template, SCSS styles, and JavaScript logic
2. THE Timeline_Component SHALL use the existing Jekyll include pattern for templates
3. THE Timeline_Component SHALL integrate SCSS styles into the existing theme system
4. THE Timeline_Component SHALL provide fallback behavior if GSAP fails to load
5. IF GSAP fails to load, THEN THE Timeline_Component SHALL display items with basic CSS animations
