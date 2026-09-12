---
id: QST-context-rot
type: 问题单元
title: "能不能讲清「上下文腐烂」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文腐烂"
  - "Context Rot"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "如果模型在 100K 输入里偶尔漏答，但把相同证据放到 10K 输入就稳定，下一步应先查模型容量，还是查输入增长带来的利用退化？"
question_type: "检验问题"
user_stage: "现在就要懂"
applicable_topics:
  - "信息如何进入工作台"
relationships:
  - type: 解释
    target: CON-context-rot
    note: "这个问题用来检验「上下文腐烂」是否真的讲明白了"
---

## 核心内容

**问题原句**：如果模型在 100K 输入里偶尔漏答，但把相同证据放到 10K 输入就稳定，下一步应先查模型容量，还是查输入增长带来的利用退化？

这是图鉴站给「上下文腐烂」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-context-rot]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-rot.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-context-rot]]
- [[CON-context-rot_上下文腐烂]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
