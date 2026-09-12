---
id: QST-state-management
type: 问题单元
title: "能不能讲清「状态管理」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "状态管理"
  - "State Management"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "如果进程重启后知道用户说过什么，却不知道前三步是否已经执行，缺的是 Memory，还是可恢复的执行 State？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "信息平时放在哪里"
relationships:
  - type: 解释
    target: CON-state-management
    note: "这个问题用来检验「状态管理」是否真的讲明白了"
---

## 核心内容

**问题原句**：如果进程重启后知道用户说过什么，却不知道前三步是否已经执行，缺的是 Memory，还是可恢复的执行 State？

这是图鉴站给「状态管理」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-state-management]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/state-management.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-state-management]]
- [[CON-state-management_状态管理]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
