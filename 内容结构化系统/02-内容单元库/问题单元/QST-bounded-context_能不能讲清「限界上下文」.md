---
id: QST-bounded-context
type: 问题单元
title: "能不能讲清「限界上下文」"
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
question_text: "当两个团队都使用“账户”一词时，你会依据哪些业务规则判断它们应共享一个模型，还是需要两个限界上下文？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "信息如何进入工作台"
relationships:
  - type: 解释
    target: CON-bounded-context
    note: "这个问题用来检验「限界上下文」是否真的讲明白了"
---

## 核心内容

**问题原句**：当两个团队都使用“账户”一词时，你会依据哪些业务规则判断它们应共享一个模型，还是需要两个限界上下文？

这是图鉴站给「限界上下文」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-bounded-context]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/bounded-context.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-bounded-context]]
- [[CON-bounded-context_限界上下文]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
