---
id: CAS-harness-token-floor
type: 案例单元
title: "Harness Token 底座：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "Harness Token 底座"
  - "Harness Token Floor"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Harness Token 底座"
case_summary: "假设用户只发一句“继续”，请求却仍携带系统规则、几十个工具 Schema 和运行说明；短任务的固定前缀比用户内容大得多。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Claude Code 在读提示词前为何已发送 3.3 万 Token》：逐字定义用户任务进入前由系统提示、工具 Schema 与脚手架组成的 Harness Token 固定底座；《Claude Code 在读提示词前为何已发送 3.3 万 Token》：逐字说明缓存命中降低计费却不减少固定底座对上下文窗口的物理占用。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-harness-token-floor
    note: "本案例用来说明「Harness Token 底座」"
---

## 核心内容

**场景（假设场景）**：假设用户只发一句“继续”，请求却仍携带系统规则、几十个工具 Schema 和运行说明；短任务的固定前缀比用户内容大得多。

**来源里的真实依据**：本卡只采用以下来源范围：《Claude Code 在读提示词前为何已发送 3.3 万 Token》：逐字定义用户任务进入前由系统提示、工具 Schema 与脚手架组成的 Harness Token 固定底座；《Claude Code 在读提示词前为何已发送 3.3 万 Token》：逐字说明缓存命中降低计费却不减少固定底座对上下文窗口的物理占用。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-token-floor.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-harness-token-floor]] —— 本案例用来说明「Harness Token 底座」
- [[CON-harness-token-floor_Harness Token 底座]]

## 备注

不要把假设场景当真实复盘引用。
