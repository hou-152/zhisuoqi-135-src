---
id: SOL-agent-tool-contract
type: 方案单元
title: "Agent 工具契约：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "Agent 工具契约"
  - "Agent Tool Contract"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不是工具能力本身，而是模型如何选择、调用并接收工具结果的责任边界。"
solution_summary: "列出模型可以表达的操作意图，并为每种意图限定必填参数和可选参数。"
action_steps:
  - "列出模型可以表达的操作意图，并为每种意图限定必填参数和可选参数。"
  - "把鉴权、参数校验、真实执行和重试放进确定性代码，不让模型口头模拟成功。"
  - "用缺参数、越权参数和超长返回各跑一次，检查错误是否可解释、回执是否足够紧凑。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-tool-contract
    note: "本方案是「Agent 工具契约」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不是工具能力本身，而是模型如何选择、调用并接收工具结果的责任边界。

**动作路径（how_to，逐条照抄源数据）**
1. 列出模型可以表达的操作意图，并为每种意图限定必填参数和可选参数。
2. 把鉴权、参数校验、真实执行和重试放进确定性代码，不让模型口头模拟成功。
3. 用缺参数、越权参数和超长返回各跑一次，检查错误是否可解释、回执是否足够紧凑。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-tool-contract.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-tool-contract]] —— 本方案是「Agent 工具契约」的落地动作
- [[CON-agent-tool-contract_Agent 工具契约]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
