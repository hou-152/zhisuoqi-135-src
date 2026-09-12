---
id: CAS-llm-token
type: 案例单元
title: "模型词元：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "模型词元"
  - "LLM Token"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "模型词元"
case_summary: "假设中英文长度看起来相近的两段说明进入不同模型，计费和窗口占用差异很大；按字符估算让请求提前撞上上限。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Coding Agent 如何工作：工具循环与上下文工程》：逐字说明 Token 是模型实际消费和生成的输入单位，并连接计费与上下文窗口约束。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-llm-token
    note: "本案例用来说明「模型词元」"
---

## 核心内容

**场景（假设场景）**：假设中英文长度看起来相近的两段说明进入不同模型，计费和窗口占用差异很大；按字符估算让请求提前撞上上限。

**来源里的真实依据**：本卡只采用以下来源范围：《Coding Agent 如何工作：工具循环与上下文工程》：逐字说明 Token 是模型实际消费和生成的输入单位，并连接计费与上下文窗口约束。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/llm-token.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-llm-token]] —— 本案例用来说明「模型词元」
- [[CON-llm-token_模型词元]]

## 备注

不要把假设场景当真实复盘引用。
