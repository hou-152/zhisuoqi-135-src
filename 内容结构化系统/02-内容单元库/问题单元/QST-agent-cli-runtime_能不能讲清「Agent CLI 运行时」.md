---
id: QST-agent-cli-runtime
type: 问题单元
title: "能不能讲清「Agent CLI 运行时」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent CLI 运行时"
  - "Agent CLI Runtime"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "一个流程在 IDE 中依赖隐式打开文件，迁到 CLI 时需要显式补上哪些运行上下文？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "AI 如何持续行动"
relationships:
  - type: 解释
    target: CON-agent-cli-runtime
    note: "这个问题用来检验「Agent CLI 运行时」是否真的讲明白了"
---

## 核心内容

**问题原句**：一个流程在 IDE 中依赖隐式打开文件，迁到 CLI 时需要显式补上哪些运行上下文？

这是图鉴站给「Agent CLI 运行时」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-agent-cli-runtime]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-cli-runtime.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-agent-cli-runtime]]
- [[CON-agent-cli-runtime_Agent CLI 运行时]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
