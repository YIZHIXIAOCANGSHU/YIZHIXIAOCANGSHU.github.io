# Design Document: Timeline Dot-Line Alignment

## Overview

本设计文档描述了时间轴组件中节点（dot/node）和连接线（line）对齐关系的优化方案。核心思路是通过CSS变量建立点和线之间的数学关系，使节点位置能够根据线的位置自动计算，从而简化维护并确保对齐一致性。

### 当前问题分析

当前实现中存在以下问题：
- 线的位置 `top: 50px` 和节点的位置 `top: -56px` 是独立的硬编码值
- 响应式断点（768px、480px）需要分别修改这两个值
- 没有明确的数学关系说明这两个值如何关联
- 修改一个值时容易忘记修改另一个，导致对齐问题

### 解决方案

建立基于CSS变量的对齐系统：
1. 定义基础变量（线位置、节点尺寸）
2. 使用 `calc()` 函数派生节点位置
3. 在响应式断点只需修改基础变量

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CSS Variable System                       │
├─────────────────────────────────────────────────────────────┤
│  :root / .horizontal-timeline                                │
│  ├── Line Variables Group                                    │
│  │   ├── --timeline-line-top: 50px                          │
│  │   └── --timeline-line-height: 4px                        │
│  ├── Node Variables Group                                    │
│  │   ├── --timeline-node-size: 24px                         │
│  │   ├── --timeline-node-border-width: 4px                  │
│  │   └── --timeline-node-top: calc(derived)                 │
│  └── Spacing Variables Group                                 │
│      └── --timeline-container-padding-top: calc(derived)    │
├─────────────────────────────────────────────────────────────┤
│                    Derived Calculations                      │
│  node-top = line-top - (node-size / 2) - container-padding  │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### CSS Variable Definitions

变量将在 `.horizontal-timeline` 选择器中定义，按逻辑分组：

```scss
.horizontal-timeline {
  /* ========================================
     Line Variables Group
     ======================================== */
  --timeline-line-top: 50px;           /* 线距离容器顶部的距离 */
  --timeline-line-height: 4px;         /* 线的高度 */
  
  /* ========================================
     Node Variables Group
     ======================================== */
  --timeline-node-size: 24px;          /* 节点直径 */
  --timeline-node-border-width: 4px;   /* 节点边框宽度 */
  
  /* ========================================
     Derived Position (自动计算)
     节点top = 线top - 容器padding - 节点半径
     ======================================== */
  --timeline-node-offset: calc(var(--timeline-line-top) - var(--timeline-node-size) / 2);
}
```

### Position Calculation Logic

节点需要垂直居中于线上。计算公式：

```
节点中心 = 线中心
节点top + 节点半径 = 线top + 线高度/2

由于线使用 transform: translateY(-50%)，线的视觉中心就是 line-top
所以：节点top = line-top - node-size/2

但节点是相对于卡片定位的（使用负top值），需要考虑容器padding：
节点top（相对于卡片）= -(容器padding - line-top + node-size/2)
```

### Responsive Breakpoint Strategy

```scss
/* 默认值 */
.horizontal-timeline {
  --timeline-line-top: 50px;
  --timeline-node-size: 24px;
  --timeline-node-border-width: 4px;
  padding: 100px 0 50px;
}

/* 768px 断点 - 只需修改变量 */
@media screen and (max-width: 768px) {
  .horizontal-timeline {
    --timeline-line-top: 40px;
    --timeline-node-size: 20px;
    padding: 80px 0 30px;
  }
}

/* 480px 断点 - 只需修改变量 */
@media screen and (max-width: 480px) {
  .horizontal-timeline {
    --timeline-line-top: 35px;
    --timeline-node-size: 18px;
    --timeline-node-border-width: 3px;
    padding: 70px 0 20px;
  }
}
```

## Data Models

### CSS Variable Schema

| Variable Name | Type | Default | Description |
|--------------|------|---------|-------------|
| `--timeline-line-top` | length | 50px | 线距离容器顶部的距离 |
| `--timeline-line-height` | length | 4px | 线的高度 |
| `--timeline-node-size` | length | 24px | 节点直径 |
| `--timeline-node-border-width` | length | 4px | 节点边框宽度 |
| `--timeline-node-offset` | calc | derived | 节点相对于卡片的偏移量 |

### Breakpoint Values Matrix

| Breakpoint | line-top | node-size | node-border | container-padding |
|------------|----------|-----------|-------------|-------------------|
| Default    | 50px     | 24px      | 4px         | 100px 0 50px      |
| ≤768px     | 40px     | 20px      | 4px         | 80px 0 30px       |
| ≤480px     | 35px     | 18px      | 3px         | 70px 0 20px       |



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, the following testable properties have been identified:

### Property 1: Node-Line Alignment Invariant

*For any* valid combination of `--timeline-line-top` and `--timeline-node-size` values, the vertical center of the Timeline_Node SHALL equal the vertical center of the Timeline_Line.

Mathematical expression: `node_top + (node_size / 2) = line_top`

**Validates: Requirements 2.1, 2.2**

### Property 2: Backward Compatibility at Breakpoints

*For any* of the three viewport configurations (default, ≤768px, ≤480px), the computed visual positions of the Timeline_Node and Timeline_Line SHALL match the expected values from the current implementation.

Expected values:
- Default: line-top=50px, node positioned at -56px relative to card
- 768px: line-top=40px, node positioned at -46px relative to card  
- 480px: line-top=35px (adjusted), node positioned at -40px relative to card

**Validates: Requirements 4.1, 4.2, 4.3**

## Error Handling

### Invalid CSS Variable Values

如果CSS变量被设置为无效值（如负数或非长度值），浏览器将回退到初始值或继承值。设计中应确保：

1. 所有变量都有合理的默认值
2. `calc()` 表达式在变量缺失时不会产生无效结果
3. 使用CSS `@supports` 或回退值确保旧浏览器兼容性

### Browser Compatibility

CSS自定义属性（CSS Variables）在以下浏览器中支持：
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

对于不支持的浏览器，可以提供硬编码的回退值。

## Testing Strategy

### Unit Tests (Example-based)

1. **CSS Variable Existence Test**: 验证所有必需的CSS变量已定义
2. **Breakpoint Value Test**: 验证每个断点的变量值正确
3. **Hover/Active State Test**: 验证交互状态样式保持正常

### Property-Based Tests

由于这是CSS样式优化，传统的property-based testing框架（如fast-check）不直接适用。但可以通过以下方式验证属性：

1. **Visual Regression Testing**: 使用工具如Percy或Chromatic进行视觉回归测试
2. **Computed Style Verification**: 使用JavaScript获取计算后的样式值，验证对齐关系

### Manual Testing Checklist

- [ ] 默认视口下节点与线对齐
- [ ] 768px断点下节点与线对齐
- [ ] 480px断点下节点与线对齐
- [ ] 节点hover效果正常
- [ ] 节点active状态正常
- [ ] 动画效果正常（GSAP和CSS fallback）
- [ ] 减少动画偏好设置下正常显示
