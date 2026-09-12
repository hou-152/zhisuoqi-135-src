---
id: QST-progressive-disclosure
type: 问题单元
title: "能不能讲清「渐进式披露」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "渐进式披露"
  - "Progressive Disclosure"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "一个系统运行时才取文件，但每次都把整棵目录和全部正文塞进上下文，它做到了 JIT，却做到了渐进式披露吗？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "信息如何进入工作台"
relationships:
  - type: 解释
    target: CON-progressive-disclosure
    note: "这个问题用来检验「渐进式披露」是否真的讲明白了"
---

## 核心内容

**问题原句**：一个系统运行时才取文件，但每次都把整棵目录和全部正文塞进上下文，它做到了 JIT，却做到了渐进式披露吗？

这是图鉴站给「渐进式披露」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-progressive-disclosure]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/progressive-disclosure.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-progressive-disclosure]]
- [[CON-progressive-disclosure_渐进式披露]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
