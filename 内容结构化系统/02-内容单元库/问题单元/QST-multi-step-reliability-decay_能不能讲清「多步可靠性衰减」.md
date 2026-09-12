---
id: QST-multi-step-reliability-decay
type: 问题单元
title: "能不能讲清「多步可靠性衰减」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "多步可靠性衰减"
  - "Multi-Step Reliability Decay"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "当两个步骤会被同一网络故障同时影响时，为什么不能直接相乘；还需要收集什么联合失败数据？"
question_type: "检验问题"
user_stage: "现在就要懂"
applicable_topics:
  - "做完后凭什么相信"
relationships:
  - type: 解释
    target: CON-multi-step-reliability-decay
    note: "这个问题用来检验「多步可靠性衰减」是否真的讲明白了"
---

## 核心内容

**问题原句**：当两个步骤会被同一网络故障同时影响时，为什么不能直接相乘；还需要收集什么联合失败数据？

这是图鉴站给「多步可靠性衰减」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-multi-step-reliability-decay]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/multi-step-reliability-decay.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-multi-step-reliability-decay]]
- [[CON-multi-step-reliability-decay_多步可靠性衰减]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
