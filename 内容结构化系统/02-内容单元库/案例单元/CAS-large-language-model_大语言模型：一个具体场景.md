---
id: CAS-large-language-model
type: 案例单元
title: "大语言模型：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "大语言模型"
  - "Large Language Model"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "大语言模型"
case_summary: "你让模型补全一段函数，它能生成代码；如果还要读取仓库、运行测试并根据结果继续修改，就需要模型外的 Agent 系统来执行这些动作。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Simon Willison 用“根据已有文本预测后续内容”的最小机制解释 coding agent 的模型底座；这个解释用于划清模型层与外部执行系统的边界，不是完整的模型百科定义。"
relationships:
  - type: 解释
    target: CON-large-language-model
    note: "本案例用来说明「大语言模型」"
---

## 核心内容

**场景（假设场景）**：你让模型补全一段函数，它能生成代码；如果还要读取仓库、运行测试并根据结果继续修改，就需要模型外的 Agent 系统来执行这些动作。

**来源里的真实依据**：Simon Willison 用“根据已有文本预测后续内容”的最小机制解释 coding agent 的模型底座；这个解释用于划清模型层与外部执行系统的边界，不是完整的模型百科定义。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/large-language-model.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-large-language-model]] —— 本案例用来说明「大语言模型」
- [[CON-large-language-model_大语言模型]]

## 备注

不要把假设场景当真实复盘引用。
