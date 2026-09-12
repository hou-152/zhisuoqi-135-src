---
id: SOL-agent-lifecycle
type: 方案单元
title: "Agent 生命周期：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent 生命周期"
  - "Agent Lifecycle"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Lifecycle 定义阶段、转换和交接责任，不等于 Agent Loop 的逐步推理与工具调用循环。"
solution_summary: "为开工、运行、暂停、恢复和收尾分别定义入口条件、必要动作、产出证据与退出条件。"
action_steps:
  - "为开工、运行、暂停、恢复和收尾分别定义入口条件、必要动作、产出证据与退出条件。"
  - "在关键转换点用 Hook 或中间件执行必须发生的确定性动作，例如环境检查、状态落盘、验证与清理。"
  - "收尾时明确已完成、未完成、未验证和下一步，避免把一次运行结束冒充任务完成。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-lifecycle
    note: "本方案是「Agent 生命周期」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Lifecycle 定义阶段、转换和交接责任，不等于 Agent Loop 的逐步推理与工具调用循环。

**动作路径（how_to，逐条照抄源数据）**
1. 为开工、运行、暂停、恢复和收尾分别定义入口条件、必要动作、产出证据与退出条件。
2. 在关键转换点用 Hook 或中间件执行必须发生的确定性动作，例如环境检查、状态落盘、验证与清理。
3. 收尾时明确已完成、未完成、未验证和下一步，避免把一次运行结束冒充任务完成。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-lifecycle.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-lifecycle]] —— 本方案是「Agent 生命周期」的落地动作
- [[CON-agent-lifecycle_Agent 生命周期]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
