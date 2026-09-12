---
id: SOL-agent-handoff
type: 方案单元
title: "Agent 交接：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent 交接"
  - "Agent Handoff"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：把子 Agent 当工具调用后拿回结果，不等于把当前任务的控制权完整交给另一个 Agent。"
solution_summary: "交接包至少写清目标、当前进度、已验证证据、失败与阻塞、关键位置、未完成项和明确下一步。"
action_steps:
  - "交接包至少写清目标、当前进度、已验证证据、失败与阻塞、关键位置、未完成项和明确下一步。"
  - "标明哪些是事实、推测和未知，并给出可复查的文件、命令、运行 ID 或其他证据指针。"
  - "Agent B 接手后先读取交接包并核对真实状态，再明确记录“已接管”的范围与发现的差异。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-handoff
    note: "本方案是「Agent 交接」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：把子 Agent 当工具调用后拿回结果，不等于把当前任务的控制权完整交给另一个 Agent。

**动作路径（how_to，逐条照抄源数据）**
1. 交接包至少写清目标、当前进度、已验证证据、失败与阻塞、关键位置、未完成项和明确下一步。
2. 标明哪些是事实、推测和未知，并给出可复查的文件、命令、运行 ID 或其他证据指针。
3. Agent B 接手后先读取交接包并核对真实状态，再明确记录“已接管”的范围与发现的差异。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-handoff.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-handoff]] —— 本方案是「Agent 交接」的落地动作
- [[CON-agent-handoff_Agent 交接]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
