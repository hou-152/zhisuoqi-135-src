---
id: QST-skill-trigger-condition
type: 问题单元
title: "能不能讲清「Skill 触发条件」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "Skill 触发条件"
  - "Skill Trigger Condition"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "一个 Skill 同时服务“读取”和“编辑”两类任务时，触发条件应合并还是拆分；你会依据什么失败样本决定？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "信息如何进入工作台"
relationships:
  - type: 解释
    target: CON-skill-trigger-condition
    note: "这个问题用来检验「Skill 触发条件」是否真的讲明白了"
---

## 核心内容

**问题原句**：一个 Skill 同时服务“读取”和“编辑”两类任务时，触发条件应合并还是拆分；你会依据什么失败样本决定？

这是图鉴站给「Skill 触发条件」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-skill-trigger-condition]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/skill-trigger-condition.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-skill-trigger-condition]]
- [[CON-skill-trigger-condition_Skill 触发条件]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
