---
id: QST-attention-budget
type: 问题单元
title: "能不能讲清「注意力预算」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "注意力预算"
  - "Attention Budget"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "一个窗口还能继续装 token，是否就表示加入更多日志不会挤压模型对关键证据的利用？"
question_type: "检验问题"
user_stage: "现在就要懂"
applicable_topics:
  - "眼前真正有什么"
relationships:
  - type: 解释
    target: CON-attention-budget
    note: "这个问题用来检验「注意力预算」是否真的讲明白了"
---

## 核心内容

**问题原句**：一个窗口还能继续装 token，是否就表示加入更多日志不会挤压模型对关键证据的利用？

这是图鉴站给「注意力预算」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-attention-budget]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/attention-budget.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-attention-budget]]
- [[CON-attention-budget_注意力预算]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
