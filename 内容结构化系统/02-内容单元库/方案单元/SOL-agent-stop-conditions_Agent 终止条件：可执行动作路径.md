---
id: SOL-agent-stop-conditions
type: 方案单元
title: "Agent 终止条件：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent 终止条件"
  - "Agent Stop Conditions"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不是任务成功判定的同义词；循环可能因预算、风险或无进展而在未成功时停止。"
solution_summary: "为成功、预算耗尽、风险升级、重复状态和连续无进展分别定义可观测条件。"
action_steps:
  - "为成功、预算耗尽、风险升级、重复状态和连续无进展分别定义可观测条件。"
  - "让 Harness 维护计数、费用和进展信号，并在每轮动作前后检查。"
  - "用永不成功和假装进展的任务做负测，确认能停止、转交并保留恢复材料。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-stop-conditions
    note: "本方案是「Agent 终止条件」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不是任务成功判定的同义词；循环可能因预算、风险或无进展而在未成功时停止。

**动作路径（how_to，逐条照抄源数据）**
1. 为成功、预算耗尽、风险升级、重复状态和连续无进展分别定义可观测条件。
2. 让 Harness 维护计数、费用和进展信号，并在每轮动作前后检查。
3. 用永不成功和假装进展的任务做负测，确认能停止、转交并保留恢复材料。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-stop-conditions.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-stop-conditions]] —— 本方案是「Agent 终止条件」的落地动作
- [[CON-agent-stop-conditions_Agent 终止条件]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
