---
id: QST-harness-compute-separation
type: 问题单元
title: "能不能讲清「Harness 与计算分离」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Harness 与计算分离"
  - "Harness-Compute Separation"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "哪些中间状态必须留在 Harness 才能安全恢复，哪些放进沙箱反而更便于隔离和复现？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "人如何控制 AI"
relationships:
  - type: 解释
    target: CON-harness-compute-separation
    note: "这个问题用来检验「Harness 与计算分离」是否真的讲明白了"
---

## 核心内容

**问题原句**：哪些中间状态必须留在 Harness 才能安全恢复，哪些放进沙箱反而更便于隔离和复现？

这是图鉴站给「Harness 与计算分离」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-harness-compute-separation]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-compute-separation.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-harness-compute-separation]]
- [[CON-harness-compute-separation_Harness 与计算分离]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
