---
id: CAS-guardrails
type: 案例单元
title: "护栏：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "护栏"
  - "Guardrails"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "护栏"
case_summary: "一个客服 Agent 收到包含敏感信息的请求，输入护栏先标记风险；如果运行中又准备调用退款工具，工具护栏会检查金额和授权；最终回复还要经过输出护栏再交付。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "OpenAI Agents SDK 将 Guardrails 作为核心原语，并区分输入、输出与工具护栏；输入或输出检查可以触发 tripwire，工具护栏可在函数工具调用前后检查。具体执行时机、并行方式和异常行为以所用 SDK 版本与配置为准。"
relationships:
  - type: 解释
    target: CON-guardrails
    note: "本案例用来说明「护栏」"
---

## 核心内容

**场景（假设场景）**：一个客服 Agent 收到包含敏感信息的请求，输入护栏先标记风险；如果运行中又准备调用退款工具，工具护栏会检查金额和授权；最终回复还要经过输出护栏再交付。

**来源里的真实依据**：OpenAI Agents SDK 将 Guardrails 作为核心原语，并区分输入、输出与工具护栏；输入或输出检查可以触发 tripwire，工具护栏可在函数工具调用前后检查。具体执行时机、并行方式和异常行为以所用 SDK 版本与配置为准。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/guardrails.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-guardrails]] —— 本案例用来说明「护栏」
- [[CON-guardrails_护栏]]

## 备注

不要把假设场景当真实复盘引用。
