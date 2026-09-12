---
id: SOL-prompt
type: 方案单元
title: "提示：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "提示"
  - "Prompt"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：本站同时标明狭义“用户提示”和广义“完整模型输入”两种常见口径，不把其中一种静默冒充唯一行业定义。"
solution_summary: "讨论 Prompt 时先说清是在改用户消息、系统消息，还是模型最终接收的完整输入。"
action_steps:
  - "讨论 Prompt 时先说清是在改用户消息、系统消息，还是模型最终接收的完整输入。"
  - "排错时保存实际发送给模型的输入结构；只看聊天框内容可能遗漏系统层、工具定义与历史。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-prompt
    note: "本方案是「提示」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：本站同时标明狭义“用户提示”和广义“完整模型输入”两种常见口径，不把其中一种静默冒充唯一行业定义。

**动作路径（how_to，逐条照抄源数据）**
1. 讨论 Prompt 时先说清是在改用户消息、系统消息，还是模型最终接收的完整输入。
2. 排错时保存实际发送给模型的输入结构；只看聊天框内容可能遗漏系统层、工具定义与历史。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-prompt]] —— 本方案是「提示」的落地动作
- [[CON-prompt_提示]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
