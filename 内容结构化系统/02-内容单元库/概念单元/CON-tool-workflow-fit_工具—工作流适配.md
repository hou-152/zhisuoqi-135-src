---
id: CON-tool-workflow-fit
type: 概念单元
title: "工具—工作流适配"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具—工作流适配"
  - "Tool–Workflow Fit"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Agent 的工具能力、说明和调用节奏必须与当前任务的锚点、证据标准和停止条件相匹配；工具更强或更通用不会自动改善任务结果。"
concept_function: "解释「工具—工作流适配」是什么、边界在哪；分类：AI 如何接触外部世界（现在就要懂）"
relationships:
  - type: 回应
    target: CON-tool-scoping
    note: "原 kind=used-with｜工具收窄决定暴露哪些能力，工作流适配决定这些能力在任务中以什么节奏和证据标准被使用。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜工具说明与任务工作流的适配属于 Harness 对模型行为的运行约束。"
---

## 核心内容

**定义（remember）**：Agent 的工具能力、说明和调用节奏必须与当前任务的锚点、证据标准和停止条件相匹配；工具更强或更通用不会自动改善任务结果。

**费曼一下**：好工具不会自动带来好结果。锤子很锋利，也要知道当前是在钉钉子还是拆墙；任务姿势不匹配，能力越强可能浪费越多。

**边界（明确不成立的用法）**
- 它不反对共享工具基础设施，而是要求不同产品保留任务特定的工作流层。
- 一项工具在某任务中不适配，不代表工具本身实现错误或在其他任务中无效。
- 「工具—工作流适配」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。

**迁移问题**：同一个搜索工具在热点追踪中好用、在法律研究中失效，差异最可能来自能力本身还是工作流适配？你会看什么证据？

**分类问题**：AI 靠什么读取、计算或改变外部世界？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool-workflow-fit.yaml`（name_en: Tool–Workflow Fit）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《工具更多反而让 Copilot 代码审查变差，GitHub 如何修正》：原文把共享工具能力与任务特定工作流分开，说明工具替换只有在行为流程适配后才产生收益。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-tool-scoping]] —— 原 kind=used-with｜工具收窄决定暴露哪些能力，工作流适配决定这些能力在任务中以什么节奏和证据标准被使用。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜工具说明与任务工作流的适配属于 Harness 对模型行为的运行约束。
- [[CON-tool-scoping_工具收窄]]
- [[CON-agent-harness_Agent Harness]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
