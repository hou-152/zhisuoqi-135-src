---
id: QST-persistent-code-graph
type: 问题单元
title: "能不能讲清「持久化代码图谱」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "持久化代码图谱"
  - "Persistent Code Graph"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "如果图谱查询很快但落后主分支三天，Agent 应如何判断它还能用于影响分析还是必须重建？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "信息平时放在哪里"
relationships:
  - type: 解释
    target: CON-persistent-code-graph
    note: "这个问题用来检验「持久化代码图谱」是否真的讲明白了"
---

## 核心内容

**问题原句**：如果图谱查询很快但落后主分支三天，Agent 应如何判断它还能用于影响分析还是必须重建？

这是图鉴站给「持久化代码图谱」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-persistent-code-graph]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/persistent-code-graph.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-persistent-code-graph]]
- [[CON-persistent-code-graph_持久化代码图谱]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
