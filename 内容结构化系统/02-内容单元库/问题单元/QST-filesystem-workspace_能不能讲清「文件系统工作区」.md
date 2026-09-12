---
id: QST-filesystem-workspace
type: 问题单元
title: "能不能讲清「文件系统工作区」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "文件系统工作区"
  - "Filesystem Workspace"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "当多个 Agent 共用一个工作区时，怎样区分可共享事实、会话私有状态和需要隔离的执行产物？"
question_type: "检验问题"
user_stage: "现在就要懂"
applicable_topics:
  - "信息平时放在哪里"
relationships:
  - type: 解释
    target: CON-filesystem-workspace
    note: "这个问题用来检验「文件系统工作区」是否真的讲明白了"
---

## 核心内容

**问题原句**：当多个 Agent 共用一个工作区时，怎样区分可共享事实、会话私有状态和需要隔离的执行产物？

这是图鉴站给「文件系统工作区」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-filesystem-workspace]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/filesystem-workspace.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-filesystem-workspace]]
- [[CON-filesystem-workspace_文件系统工作区]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
