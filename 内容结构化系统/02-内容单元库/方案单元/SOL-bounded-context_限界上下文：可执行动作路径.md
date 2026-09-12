---
id: SOL-bounded-context
type: 方案单元
title: "限界上下文：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "限界上下文"
  - "Bounded Context"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它来自领域驱动设计，不等于 LLM 的 Context 或 Context Window。"
solution_summary: "找出一个经常引发争议的业务词，分别记录各团队用它做什么决定。"
action_steps:
  - "找出一个经常引发争议的业务词，分别记录各团队用它做什么决定。"
  - "对比该词对应的对象、规则和生命周期，把含义稳定的一组工作圈成边界。"
  - "为跨边界交换的数据写明转换规则，避免直接复用同名字段制造假一致。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-bounded-context
    note: "本方案是「限界上下文」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它来自领域驱动设计，不等于 LLM 的 Context 或 Context Window。

**动作路径（how_to，逐条照抄源数据）**
1. 找出一个经常引发争议的业务词，分别记录各团队用它做什么决定。
2. 对比该词对应的对象、规则和生命周期，把含义稳定的一组工作圈成边界。
3. 为跨边界交换的数据写明转换规则，避免直接复用同名字段制造假一致。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/bounded-context.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-bounded-context]] —— 本方案是「限界上下文」的落地动作
- [[CON-bounded-context_限界上下文]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
