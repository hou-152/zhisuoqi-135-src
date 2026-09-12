---
id: QST-change-impact-analysis
type: 问题单元
title: "能不能讲清「变更影响分析」"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "变更影响分析"
  - "Change Impact Analysis"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "面对大量反射和配置驱动的系统，静态影响图之外还要收集什么运行证据，才能决定回归范围？"
question_type: "检验问题"
user_stage: "需要时再学"
applicable_topics:
  - "做完后凭什么相信"
relationships:
  - type: 解释
    target: CON-change-impact-analysis
    note: "这个问题用来检验「变更影响分析」是否真的讲明白了"
---

## 核心内容

**问题原句**：面对大量反射和配置驱动的系统，静态影响图之外还要收集什么运行证据，才能决定回归范围？

这是图鉴站给「变更影响分析」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-change-impact-analysis]] 重讲。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/change-impact-analysis.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-change-impact-analysis]]
- [[CON-change-impact-analysis_变更影响分析]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
