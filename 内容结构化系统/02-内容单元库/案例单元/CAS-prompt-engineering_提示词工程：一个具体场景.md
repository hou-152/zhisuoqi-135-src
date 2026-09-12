---
id: CAS-prompt-engineering
type: 案例单元
title: "提示词工程：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "提示词工程"
  - "Prompt Engineering"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "提示词工程"
case_summary: "你要模型把客服记录分类，于是明确类别定义、提供少量示例、规定输出格式，并用一组未见样本检查结果；这属于提示词工程。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Anthropic 将 prompt engineering 描述为编写与组织指令的离散任务，并把它与每轮持续策展整体信息状态的 context engineering 区分。其文章称后者为自然演进，而不是宣布前者被淘汰。"
relationships:
  - type: 解释
    target: CON-prompt-engineering
    note: "本案例用来说明「提示词工程」"
---

## 核心内容

**场景（假设场景）**：你要模型把客服记录分类，于是明确类别定义、提供少量示例、规定输出格式，并用一组未见样本检查结果；这属于提示词工程。

**来源里的真实依据**：Anthropic 将 prompt engineering 描述为编写与组织指令的离散任务，并把它与每轮持续策展整体信息状态的 context engineering 区分。其文章称后者为自然演进，而不是宣布前者被淘汰。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt-engineering.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-prompt-engineering]] —— 本案例用来说明「提示词工程」
- [[CON-prompt-engineering_提示词工程]]

## 备注

不要把假设场景当真实复盘引用。
