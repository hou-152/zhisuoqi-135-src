---
id: QST-agent-lifecycle
type: 问题单元
title: "能不能讲清「Agent 生命周期」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent 生命周期"
  - "Agent Lifecycle"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "一个 Agent 会持续调用工具，却每次重启都从头做起，它缺的是循环能力，还是可暂停、恢复和交接的 Lifecycle？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "AI 如何持续行动"
relationships:
  - type: 解释
    target: CON-agent-lifecycle
    note: "这个问题用来检验「Agent 生命周期」是否真的讲明白了"
---

## 核心内容

**问题原句**：一个 Agent 会持续调用工具，却每次重启都从头做起，它缺的是循环能力，还是可暂停、恢复和交接的 Lifecycle？

这是图鉴站给「Agent 生命周期」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-agent-lifecycle]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-lifecycle.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-agent-lifecycle]]
- [[CON-agent-lifecycle_Agent 生命周期]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
