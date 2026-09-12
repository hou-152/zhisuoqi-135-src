---
id: SOL-tool-workflow-fit
type: 方案单元
title: "工具—工作流适配：可执行动作路径"
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
target_problem: "避免这个误区：它不反对共享工具基础设施，而是要求不同产品保留任务特定的工作流层。"
solution_summary: "先写任务锚点、合格证据、允许动作和完成条件，再列工具必须支持的环节。"
action_steps:
  - "先写任务锚点、合格证据、允许动作和完成条件，再列工具必须支持的环节。"
  - "用一条真实任务走完整流程，记录工具说明、返回格式和调用节奏造成的摩擦。"
  - "只调整与失败直接相关的接口或工作流层，并用同一任务重新验证。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-tool-workflow-fit
    note: "本方案是「工具—工作流适配」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不反对共享工具基础设施，而是要求不同产品保留任务特定的工作流层。

**动作路径（how_to，逐条照抄源数据）**
1. 先写任务锚点、合格证据、允许动作和完成条件，再列工具必须支持的环节。
2. 用一条真实任务走完整流程，记录工具说明、返回格式和调用节奏造成的摩擦。
3. 只调整与失败直接相关的接口或工作流层，并用同一任务重新验证。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool-workflow-fit.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-tool-workflow-fit]] —— 本方案是「工具—工作流适配」的落地动作
- [[CON-tool-workflow-fit_工具—工作流适配]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
