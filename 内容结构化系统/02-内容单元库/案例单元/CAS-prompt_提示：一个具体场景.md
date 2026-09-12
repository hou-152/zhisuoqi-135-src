---
id: CAS-prompt
type: 案例单元
title: "提示：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "提示"
  - "Prompt"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "提示"
case_summary: "你在聊天框输入“把这段文字改短”，这是用户提示；应用实际调用模型时，还可能把系统规则、工具定义和对话历史一起拼进完整输入。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Simon Willison 把 prompt 与 completion 作为模型交互的基本单位，并指出聊天、工具调用和系统提示会被外部软件编排成更复杂的模型输入。不同产品与文献对 Prompt 的范围并不完全一致。"
relationships:
  - type: 解释
    target: CON-prompt
    note: "本案例用来说明「提示」"
---

## 核心内容

**场景（假设场景）**：你在聊天框输入“把这段文字改短”，这是用户提示；应用实际调用模型时，还可能把系统规则、工具定义和对话历史一起拼进完整输入。

**来源里的真实依据**：Simon Willison 把 prompt 与 completion 作为模型交互的基本单位，并指出聊天、工具调用和系统提示会被外部软件编排成更复杂的模型输入。不同产品与文献对 Prompt 的范围并不完全一致。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-prompt]] —— 本案例用来说明「提示」
- [[CON-prompt_提示]]

## 备注

不要把假设场景当真实复盘引用。
