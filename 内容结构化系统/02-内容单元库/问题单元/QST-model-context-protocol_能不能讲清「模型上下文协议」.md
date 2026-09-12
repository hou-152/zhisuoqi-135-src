---
id: QST-model-context-protocol
type: 问题单元
title: "能不能讲清「模型上下文协议」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "模型上下文协议"
  - "Model Context Protocol"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "一个 MCP server 探测成功，但 Agent 当前会话里看不到对应能力，这证明协议坏了，还是还需要检查会话投影与权限？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "AI 如何接触外部世界"
relationships:
  - type: 解释
    target: CON-model-context-protocol
    note: "这个问题用来检验「模型上下文协议」是否真的讲明白了"
---

## 核心内容

**问题原句**：一个 MCP server 探测成功，但 Agent 当前会话里看不到对应能力，这证明协议坏了，还是还需要检查会话投影与权限？

这是图鉴站给「模型上下文协议」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-model-context-protocol]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/model-context-protocol.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-model-context-protocol]]
- [[CON-model-context-protocol_模型上下文协议]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
