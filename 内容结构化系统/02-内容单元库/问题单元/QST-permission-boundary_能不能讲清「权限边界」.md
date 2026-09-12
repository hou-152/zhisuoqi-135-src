---
id: QST-permission-boundary
type: 问题单元
title: "能不能讲清「权限边界」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "权限边界"
  - "Permission Boundary"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "如果删除动作被允许进入一个隔离沙箱，它已经通过了哪一层，又仍需要哪一层来限制影响范围？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "人如何控制 AI"
relationships:
  - type: 解释
    target: CON-permission-boundary
    note: "这个问题用来检验「权限边界」是否真的讲明白了"
---

## 核心内容

**问题原句**：如果删除动作被允许进入一个隔离沙箱，它已经通过了哪一层，又仍需要哪一层来限制影响范围？

这是图鉴站给「权限边界」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-permission-boundary]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/permission-boundary.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-permission-boundary]]
- [[CON-permission-boundary_权限边界]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
