---
id: QST-prompt-injection
type: 问题单元
title: "能不能讲清「提示注入」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "提示注入"
  - "Prompt Injection"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "如果外部文档中的一句话与用户目标完全一致，系统仍应依据什么决定它是证据还是可执行指令？"
question_type: "检验问题"
user_stage: "现在就要懂"
applicable_topics:
  - "做完后凭什么相信"
relationships:
  - type: 解释
    target: CON-prompt-injection
    note: "这个问题用来检验「提示注入」是否真的讲明白了"
---

## 核心内容

**问题原句**：如果外部文档中的一句话与用户目标完全一致，系统仍应依据什么决定它是证据还是可执行指令？

这是图鉴站给「提示注入」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-prompt-injection]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt-injection.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-prompt-injection]]
- [[CON-prompt-injection_提示注入]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
