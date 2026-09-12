---
id: SOL-context-engineering
type: 方案单元
title: "上下文工程：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文工程"
  - "Context Engineering"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不等于 Prompt Engineering；提示词工程主要处理指令怎样表达，上下文工程管理每轮整体信息怎样进入模型。"
solution_summary: "从任务决策倒推模型这一轮必须知道什么、可以稍后再取什么、什么应留在窗口外。"
action_steps:
  - "从任务决策倒推模型这一轮必须知道什么、可以稍后再取什么、什么应留在窗口外。"
  - "为进入模型的资料设计清楚格式、来源和更新时间，并在任务阶段变化时重新装配。"
  - "用真实失败检查是信息缺失、选择错误、格式失真还是运行系统问题，不要把所有失败都归因于模型。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-context-engineering
    note: "本方案是「上下文工程」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不等于 Prompt Engineering；提示词工程主要处理指令怎样表达，上下文工程管理每轮整体信息怎样进入模型。

**动作路径（how_to，逐条照抄源数据）**
1. 从任务决策倒推模型这一轮必须知道什么、可以稍后再取什么、什么应留在窗口外。
2. 为进入模型的资料设计清楚格式、来源和更新时间，并在任务阶段变化时重新装配。
3. 用真实失败检查是信息缺失、选择错误、格式失真还是运行系统问题，不要把所有失败都归因于模型。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-engineering.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-context-engineering]] —— 本方案是「上下文工程」的落地动作
- [[CON-context-engineering_上下文工程]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
