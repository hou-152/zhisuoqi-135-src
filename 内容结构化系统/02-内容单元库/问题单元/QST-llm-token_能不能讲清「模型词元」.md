---
id: QST-llm-token
type: 问题单元
title: "能不能讲清「模型词元」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "模型词元"
  - "LLM Token"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "当两个提示的 Token 数相同但任务表现不同，为什么不能据此断言它们占用了相同的有效注意力？"
question_type: "检验问题"
user_stage: "现在就要懂"
applicable_topics:
  - "眼前真正有什么"
relationships:
  - type: 解释
    target: CON-llm-token
    note: "这个问题用来检验「模型词元」是否真的讲明白了"
---

## 核心内容

**问题原句**：当两个提示的 Token 数相同但任务表现不同，为什么不能据此断言它们占用了相同的有效注意力？

这是图鉴站给「模型词元」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-llm-token]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/llm-token.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-llm-token]]
- [[CON-llm-token_模型词元]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
