---
id: QST-tool
type: 问题单元
title: "能不能讲清「工具」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具"
  - "Tool"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "当模型能准确描述如何读取文件，却始终拿不到文件内容时，你应该先检查模型知识，还是 Tool 的注册、权限与执行链？"
question_type: "检验问题"
user_stage: "现在就要懂"
applicable_topics:
  - "AI 如何接触外部世界"
relationships:
  - type: 解释
    target: CON-tool
    note: "这个问题用来检验「工具」是否真的讲明白了"
---

## 核心内容

**问题原句**：当模型能准确描述如何读取文件，却始终拿不到文件内容时，你应该先检查模型知识，还是 Tool 的注册、权限与执行链？

这是图鉴站给「工具」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-tool]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-tool]]
- [[CON-tool_工具]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
