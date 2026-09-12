---
id: SOL-code-execution
type: 方案单元
title: "代码执行：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "代码执行"
  - "Code Execution"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：代码执行是 Tool 的一类高通用能力，不等于模型本身在执行代码。"
solution_summary: "明确允许的运行时、目录、网络、凭据、资源上限和超时。"
action_steps:
  - "明确允许的运行时、目录、网络、凭据、资源上限和超时。"
  - "让 Agent 先写代码和预期副作用，再在隔离环境执行并捕获退出码与产物。"
  - "对结果运行确定性检查，失败时保留代码、输入和日志供复现。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-code-execution
    note: "本方案是「代码执行」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：代码执行是 Tool 的一类高通用能力，不等于模型本身在执行代码。

**动作路径（how_to，逐条照抄源数据）**
1. 明确允许的运行时、目录、网络、凭据、资源上限和超时。
2. 让 Agent 先写代码和预期副作用，再在隔离环境执行并捕获退出码与产物。
3. 对结果运行确定性检查，失败时保留代码、输入和日志供复现。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/code-execution.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-code-execution]] —— 本方案是「代码执行」的落地动作
- [[CON-code-execution_代码执行]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
