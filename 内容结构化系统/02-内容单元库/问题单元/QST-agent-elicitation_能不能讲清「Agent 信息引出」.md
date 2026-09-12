---
id: QST-agent-elicitation
type: 问题单元
title: "能不能讲清「Agent 信息引出」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent 信息引出"
  - "Agent Elicitation"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "当用户不愿回答偏好问题时，Agent 应采用可逆默认值继续，还是停止等待；你会用哪些风险条件判断？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "人如何控制 AI"
relationships:
  - type: 解释
    target: CON-agent-elicitation
    note: "这个问题用来检验「Agent 信息引出」是否真的讲明白了"
---

## 核心内容

**问题原句**：当用户不愿回答偏好问题时，Agent 应采用可逆默认值继续，还是停止等待；你会用哪些风险条件判断？

这是图鉴站给「Agent 信息引出」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-agent-elicitation]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-elicitation.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-agent-elicitation]]
- [[CON-agent-elicitation_Agent 信息引出]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
