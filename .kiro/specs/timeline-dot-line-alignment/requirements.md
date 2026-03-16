# Requirements Document

## Introduction

本文档定义了时间轴组件中节点（dot/node）和连接线（line）对齐关系优化的需求。当前实现中，节点和线的定位使用独立的硬编码值（`top: 50px` 和 `top: -56px`），导致维护困难、响应式设计中需要多处修改，且容易出现对齐问题。本优化旨在通过CSS变量建立点和线之间的关联关系，实现更好的对齐和协调。

## Glossary

- **Timeline_Node**: 时间轴上的圆形节点，通过 `::before` 伪元素实现，表示时间点
- **Timeline_Line**: 连接所有节点的水平线，使用 `.horizontal-timeline-line` 类
- **CSS_Variable**: CSS自定义属性，用于在样式表中定义可复用的值
- **Alignment_System**: 基于CSS变量的对齐系统，确保节点和线的位置关联
- **Breakpoint**: 响应式设计中的断点，当前有768px和480px两个断点

## Requirements

### Requirement 1: CSS变量定义

**User Story:** As a developer, I want to use CSS variables to define timeline positioning values, so that I can maintain consistent alignment between nodes and lines.

#### Acceptance Criteria

1. THE Alignment_System SHALL define a CSS variable `--timeline-line-top` to control the line's vertical position
2. THE Alignment_System SHALL define a CSS variable `--timeline-node-size` to control the node's diameter
3. THE Alignment_System SHALL define a CSS variable `--timeline-node-border-width` to control the node's border thickness
4. THE Alignment_System SHALL calculate the node's top position based on `--timeline-line-top` and `--timeline-node-size`

### Requirement 2: 节点与线的对齐关系

**User Story:** As a developer, I want the node position to be automatically calculated from the line position, so that they always remain aligned.

#### Acceptance Criteria

1. WHEN the Timeline_Line position changes, THE Timeline_Node SHALL automatically adjust its position to remain centered on the line
2. THE Timeline_Node vertical center SHALL align with the Timeline_Line vertical center
3. THE Alignment_System SHALL use CSS `calc()` function to derive node position from line position and node size

### Requirement 3: 响应式设计支持

**User Story:** As a developer, I want to change only the CSS variables at breakpoints, so that responsive adjustments are simplified.

#### Acceptance Criteria

1. WHEN the viewport width is at or below 768px, THE Alignment_System SHALL update only the CSS variables to adjust positioning
2. WHEN the viewport width is at or below 480px, THE Alignment_System SHALL update only the CSS variables to adjust positioning
3. THE Timeline_Node and Timeline_Line SHALL automatically recalculate their positions based on updated CSS variables at each breakpoint

### Requirement 4: 向后兼容性

**User Story:** As a developer, I want the optimized alignment system to maintain the same visual appearance, so that existing pages are not affected.

#### Acceptance Criteria

1. THE Alignment_System SHALL produce the same visual output as the current implementation at default viewport size
2. THE Alignment_System SHALL produce the same visual output as the current implementation at 768px breakpoint
3. THE Alignment_System SHALL produce the same visual output as the current implementation at 480px breakpoint
4. THE Timeline_Node hover and active states SHALL continue to function correctly with the new alignment system

### Requirement 5: 代码可维护性

**User Story:** As a developer, I want all positioning values to be defined in a single location, so that future adjustments are easier.

#### Acceptance Criteria

1. THE Alignment_System SHALL define all positioning-related CSS variables in a single CSS rule block
2. WHEN a developer needs to adjust the line position, THE developer SHALL only need to modify the `--timeline-line-top` variable
3. WHEN a developer needs to adjust the node size, THE developer SHALL only need to modify the `--timeline-node-size` variable

### Requirement 6: 时间轴分组系统

**User Story:** As a developer, I want to organize timeline positioning variables into logical groups, so that related values are easier to find and maintain.

#### Acceptance Criteria

1. THE Alignment_System SHALL group all line-related CSS variables together with a clear comment header
2. THE Alignment_System SHALL group all node-related CSS variables together with a clear comment header
3. THE Alignment_System SHALL group all spacing-related CSS variables together with a clear comment header
4. WHEN defining CSS variables, THE Alignment_System SHALL use consistent naming conventions with prefixes (e.g., `--timeline-line-*`, `--timeline-node-*`)
5. THE Alignment_System SHALL include inline comments explaining the relationship between dependent variables
