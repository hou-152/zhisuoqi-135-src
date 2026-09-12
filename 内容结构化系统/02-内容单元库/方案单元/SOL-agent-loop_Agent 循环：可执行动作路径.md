---
id: SOL-agent-loop
type: 方案单元
title: "Agent 循环：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent 循环"
  - "Agent Loop"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Agent Loop 只描述单个 Agent 内部“选择—执行—观察—再选择”的行动心跳，不等于外层持续工作流、多 Agent 编排或 Loop Engineering。"
solution_summary: "记录每一轮的输入、模型选择、工具参数、工具结果和停止原因，定位空转、早停与错误回灌。"
action_steps:
  - "记录每一轮的输入、模型选择、工具参数、工具结果和停止原因，定位空转、早停与错误回灌。"
  - "为每个循环设置清楚的退出条件、最大回合或预算，并提供用户中断路径。"
  - "当循环重复同一动作却没有新证据时，触发无进展检测，而不是继续消耗预算。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-loop
    note: "本方案是「Agent 循环」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Agent Loop 只描述单个 Agent 内部“选择—执行—观察—再选择”的行动心跳，不等于外层持续工作流、多 Agent 编排或 Loop Engineering。

**动作路径（how_to，逐条照抄源数据）**
1. 记录每一轮的输入、模型选择、工具参数、工具结果和停止原因，定位空转、早停与错误回灌。
2. 为每个循环设置清楚的退出条件、最大回合或预算，并提供用户中断路径。
3. 当循环重复同一动作却没有新证据时，触发无进展检测，而不是继续消耗预算。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-loop.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-loop]] —— 本方案是「Agent 循环」的落地动作
- [[CON-agent-loop_Agent 循环]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
