---
id: CAS-model-context-protocol
type: 案例单元
title: "模型上下文协议：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "模型上下文协议"
  - "Model Context Protocol"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "模型上下文协议"
case_summary: "一个 AI 应用连接某个 MCP server 后，可以通过同一协议发现可调用工具、可读取资源和可取得的提示模板，再把请求送出并接收结果或内容。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "当前项目证据把 MCP 作为外部能力标准化接入 Harness 的方式，并用它区分框架内置工具与外部能力；本站据项目已有证据保留 tools、resources、prompts 三类协议能力，避免把 MCP 窄化为工具调用。官网协议边界由正式 sources 登记校准，具体版本能力以届时登记的官方规范为准。"
relationships:
  - type: 解释
    target: CON-model-context-protocol
    note: "本案例用来说明「模型上下文协议」"
---

## 核心内容

**场景（假设场景）**：一个 AI 应用连接某个 MCP server 后，可以通过同一协议发现可调用工具、可读取资源和可取得的提示模板，再把请求送出并接收结果或内容。

**来源里的真实依据**：当前项目证据把 MCP 作为外部能力标准化接入 Harness 的方式，并用它区分框架内置工具与外部能力；本站据项目已有证据保留 tools、resources、prompts 三类协议能力，避免把 MCP 窄化为工具调用。官网协议边界由正式 sources 登记校准，具体版本能力以届时登记的官方规范为准。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/model-context-protocol.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-model-context-protocol]] —— 本案例用来说明「模型上下文协议」
- [[CON-model-context-protocol_模型上下文协议]]

## 备注

不要把假设场景当真实复盘引用。
