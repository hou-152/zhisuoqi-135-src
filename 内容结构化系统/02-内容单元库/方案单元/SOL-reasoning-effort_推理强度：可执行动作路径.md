---
id: SOL-reasoning-effort
type: 方案单元
title: "推理强度：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "推理强度"
  - "Reasoning Effort"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：更高推理强度通常意味着更多计算预算，但不保证每个任务都更正确。"
solution_summary: "按任务难度、错误代价和时延要求建立几档代表样本。"
action_steps:
  - "按任务难度、错误代价和时延要求建立几档代表样本。"
  - "固定输入与评分，分别测试不同推理强度的质量、耗时和费用。"
  - "为任务类型设默认档和升级条件，并监控分布变化后的失效情况。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-reasoning-effort
    note: "本方案是「推理强度」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：更高推理强度通常意味着更多计算预算，但不保证每个任务都更正确。

**动作路径（how_to，逐条照抄源数据）**
1. 按任务难度、错误代价和时延要求建立几档代表样本。
2. 固定输入与评分，分别测试不同推理强度的质量、耗时和费用。
3. 为任务类型设默认档和升级条件，并监控分布变化后的失效情况。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/reasoning-effort.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-reasoning-effort]] —— 本方案是「推理强度」的落地动作
- [[CON-reasoning-effort_推理强度]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
