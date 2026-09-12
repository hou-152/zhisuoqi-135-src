---
id: QST-agent-stop-conditions
type: 问题单元
title: "能不能讲清「Agent 终止条件」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent 终止条件"
  - "Agent Stop Conditions"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "一个任务仍在产生新输出却没有减少关键不确定性时，终止条件应看活动量还是进展量，怎样量化？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "人如何控制 AI"
relationships:
  - type: 解释
    target: CON-agent-stop-conditions
    note: "这个问题用来检验「Agent 终止条件」是否真的讲明白了"
---

## 核心内容

**问题原句**：一个任务仍在产生新输出却没有减少关键不确定性时，终止条件应看活动量还是进展量，怎样量化？

这是图鉴站给「Agent 终止条件」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-agent-stop-conditions]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-stop-conditions.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-agent-stop-conditions]]
- [[CON-agent-stop-conditions_Agent 终止条件]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
