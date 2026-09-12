---
id: SOL-llm-statelessness
type: 方案单元
title: "LLM 无状态性：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "LLM 无状态性"
  - "LLM Statelessness"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：无状态性描述调用接口的连续性边界，不表示模型没有训练所得知识。"
solution_summary: "在客户端显式保存任务状态、消息和必要工具结果，不依赖模型自行记住。"
action_steps:
  - "在客户端显式保存任务状态、消息和必要工具结果，不依赖模型自行记住。"
  - "组装下一次请求时，只重新提供完成当前步骤所需的信息。"
  - "用去掉历史的对照请求验证哪些连续性来自外部状态，哪些只是模型知识。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-llm-statelessness
    note: "本方案是「LLM 无状态性」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：无状态性描述调用接口的连续性边界，不表示模型没有训练所得知识。

**动作路径（how_to，逐条照抄源数据）**
1. 在客户端显式保存任务状态、消息和必要工具结果，不依赖模型自行记住。
2. 组装下一次请求时，只重新提供完成当前步骤所需的信息。
3. 用去掉历史的对照请求验证哪些连续性来自外部状态，哪些只是模型知识。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/llm-statelessness.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-llm-statelessness]] —— 本方案是「LLM 无状态性」的落地动作
- [[CON-llm-statelessness_LLM 无状态性]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
