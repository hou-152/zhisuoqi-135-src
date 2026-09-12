---
id: SOL-large-language-model
type: 方案单元
title: "大语言模型：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "大语言模型"
  - "Large Language Model"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：“续写机”是帮助理解生成机制的比喻，不表示模型只会逐字机械复制，也不概括训练、推理与多模态能力的全部细节。"
solution_summary: "判断一次能力来自哪里时，先问“这是模型生成的内容，还是外部系统执行并反馈的动作？”"
action_steps:
  - "判断一次能力来自哪里时，先问“这是模型生成的内容，还是外部系统执行并反馈的动作？”"
  - "比较模型表现时，同时记录输入、模型版本和外部 Harness 条件，避免把系统差异误判成模型差异。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-large-language-model
    note: "本方案是「大语言模型」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：“续写机”是帮助理解生成机制的比喻，不表示模型只会逐字机械复制，也不概括训练、推理与多模态能力的全部细节。

**动作路径（how_to，逐条照抄源数据）**
1. 判断一次能力来自哪里时，先问“这是模型生成的内容，还是外部系统执行并反馈的动作？”
2. 比较模型表现时，同时记录输入、模型版本和外部 Harness 条件，避免把系统差异误判成模型差异。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/large-language-model.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-large-language-model]] —— 本方案是「大语言模型」的落地动作
- [[CON-large-language-model_大语言模型]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
