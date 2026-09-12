---
id: CAS-context
type: 案例单元
title: "上下文：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "上下文"
  - "Context"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "上下文"
case_summary: "你让 Agent 安排会议时，当前请求、日历摘要、联系人信息、可用工具说明和输出格式一起进入模型；它们共同构成这一轮的 Context。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Philipp Schmid 将 LLM 运行时的 Context 解释为模型生成响应前看到的一切，并列出系统提示、用户提示、历史、长期记忆取回结果、RAG 信息、工具定义与输出格式。本站主卡采用这一运行时口径；HCI 中更广义的情境定义仍作为另一观察框架保留。"
relationships:
  - type: 解释
    target: CON-context
    note: "本案例用来说明「上下文」"
---

## 核心内容

**场景（假设场景）**：你让 Agent 安排会议时，当前请求、日历摘要、联系人信息、可用工具说明和输出格式一起进入模型；它们共同构成这一轮的 Context。

**来源里的真实依据**：Philipp Schmid 将 LLM 运行时的 Context 解释为模型生成响应前看到的一切，并列出系统提示、用户提示、历史、长期记忆取回结果、RAG 信息、工具定义与输出格式。本站主卡采用这一运行时口径；HCI 中更广义的情境定义仍作为另一观察框架保留。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-context]] —— 本案例用来说明「上下文」
- [[CON-context_上下文]]

## 备注

不要把假设场景当真实复盘引用。
