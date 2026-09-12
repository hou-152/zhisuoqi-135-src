---
id: CAS-tool-schema-tax
type: 案例单元
title: "工具 Schema 税：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具 Schema 税"
  - "Tool Schema Tax"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "工具 Schema 税"
case_summary: "假设简单问答请求每轮都附带五十个工具的名称、参数和说明；模型尚未读用户问题，固定工具载荷已占去大段窗口。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Claude Code 在读提示词前为何已发送 3.3 万 Token》：逐字把随每次请求携带的工具 Schema 大小识别为静态 Token 负担，并指出工具越多负担越高。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-tool-schema-tax
    note: "本案例用来说明「工具 Schema 税」"
---

## 核心内容

**场景（假设场景）**：假设简单问答请求每轮都附带五十个工具的名称、参数和说明；模型尚未读用户问题，固定工具载荷已占去大段窗口。

**来源里的真实依据**：本卡只采用以下来源范围：《Claude Code 在读提示词前为何已发送 3.3 万 Token》：逐字把随每次请求携带的工具 Schema 大小识别为静态 Token 负担，并指出工具越多负担越高。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool-schema-tax.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-tool-schema-tax]] —— 本案例用来说明「工具 Schema 税」
- [[CON-tool-schema-tax_工具 Schema 税]]

## 备注

不要把假设场景当真实复盘引用。
