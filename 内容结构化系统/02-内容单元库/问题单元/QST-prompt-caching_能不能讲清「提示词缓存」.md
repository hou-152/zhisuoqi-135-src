---
id: QST-prompt-caching
type: 问题单元
title: "能不能讲清「提示词缓存」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "提示词缓存"
  - "Prompt Caching"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "某段历史语义完全相同但序列化顺序变化时，为什么缓存仍可能失效；应在哪一层稳定它？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "AI 如何持续行动"
relationships:
  - type: 解释
    target: CON-prompt-caching
    note: "这个问题用来检验「提示词缓存」是否真的讲明白了"
---

## 核心内容

**问题原句**：某段历史语义完全相同但序列化顺序变化时，为什么缓存仍可能失效；应在哪一层稳定它？

这是图鉴站给「提示词缓存」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-prompt-caching]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt-caching.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-prompt-caching]]
- [[CON-prompt-caching_提示词缓存]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
