---
id: QST-agent-tool-contract
type: 问题单元
title: "能不能讲清「Agent 工具契约」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "Agent 工具契约"
  - "Agent Tool Contract"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "如果把同一个 Agent 从工单系统迁到财务系统，哪些接口约定必须重写，哪些执行责任仍应留在确定性代码中？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "AI 如何接触外部世界"
relationships:
  - type: 解释
    target: CON-agent-tool-contract
    note: "这个问题用来检验「Agent 工具契约」是否真的讲明白了"
---

## 核心内容

**问题原句**：如果把同一个 Agent 从工单系统迁到财务系统，哪些接口约定必须重写，哪些执行责任仍应留在确定性代码中？

这是图鉴站给「Agent 工具契约」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-agent-tool-contract]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-tool-contract.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-agent-tool-contract]]
- [[CON-agent-tool-contract_Agent 工具契约]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
