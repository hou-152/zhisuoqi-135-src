---
id: SOL-harness-engineering
type: 方案单元
title: "Harness 工程：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Harness 工程"
  - "Harness Engineering"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：工程范围轴上，本站采用 Prompt Engineering → Context Engineering → Harness Engineering 的范围递增表达，Harness Engineering 通常包住前两者。"
solution_summary: "先固定模型、任务与评测条件，再逐项改变循环、工具、状态、权限、错误恢复或验证，避免多变量一起变化后无法归因。"
action_steps:
  - "先固定模型、任务与评测条件，再逐项改变循环、工具、状态、权限、错误恢复或验证，避免多变量一起变化后无法归因。"
  - "为每次运行保留输入、工具调用、状态迁移、错误、验证结果和停止原因，让“改得更好”可以被复查。"
  - "用工程范围轴讨论“包含哪些工作”，用系统职责轴讨论“Context 与 Harness 分别管什么”，不要在同一句无轴关系里混用。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-harness-engineering
    note: "本方案是「Harness 工程」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：工程范围轴上，本站采用 Prompt Engineering → Context Engineering → Harness Engineering 的范围递增表达，Harness Engineering 通常包住前两者。

**动作路径（how_to，逐条照抄源数据）**
1. 先固定模型、任务与评测条件，再逐项改变循环、工具、状态、权限、错误恢复或验证，避免多变量一起变化后无法归因。
2. 为每次运行保留输入、工具调用、状态迁移、错误、验证结果和停止原因，让“改得更好”可以被复查。
3. 用工程范围轴讨论“包含哪些工作”，用系统职责轴讨论“Context 与 Harness 分别管什么”，不要在同一句无轴关系里混用。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-engineering.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-harness-engineering]] —— 本方案是「Harness 工程」的落地动作
- [[CON-harness-engineering_Harness 工程]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
