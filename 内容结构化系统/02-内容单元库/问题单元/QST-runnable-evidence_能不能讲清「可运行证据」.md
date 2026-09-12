---
id: QST-runnable-evidence
type: 问题单元
title: "能不能讲清「可运行证据」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "可运行证据"
  - "Runnable Evidence"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "当验证依赖昂贵外部服务无法随时重跑时，怎样提供仍可独立检查、又不冒充实时结果的证据？"
question_type: "检验问题"
user_stage: "现在就要懂"
applicable_topics:
  - "做完后凭什么相信"
relationships:
  - type: 解释
    target: CON-runnable-evidence
    note: "这个问题用来检验「可运行证据」是否真的讲明白了"
---

## 核心内容

**问题原句**：当验证依赖昂贵外部服务无法随时重跑时，怎样提供仍可独立检查、又不冒充实时结果的证据？

这是图鉴站给「可运行证据」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-runnable-evidence]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/runnable-evidence.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-runnable-evidence]]
- [[CON-runnable-evidence_可运行证据]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
