---
id: QST-subagent-orchestration
type: 问题单元
title: "能不能讲清「子 Agent 编排」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "子 Agent 编排"
  - "Subagent Orchestration"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "当子任务之间共享大量背景且会修改同一文件时，并行编排仍值得吗；你会怎样估算协调成本？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "AI 如何持续行动"
relationships:
  - type: 解释
    target: CON-subagent-orchestration
    note: "这个问题用来检验「子 Agent 编排」是否真的讲明白了"
---

## 核心内容

**问题原句**：当子任务之间共享大量背景且会修改同一文件时，并行编排仍值得吗；你会怎样估算协调成本？

这是图鉴站给「子 Agent 编排」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-subagent-orchestration]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/subagent-orchestration.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-subagent-orchestration]]
- [[CON-subagent-orchestration_子 Agent 编排]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
