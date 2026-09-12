---
id: CAS-human-escalation-tool-call
type: 案例单元
title: "人类升级工具调用：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "人类升级工具调用"
  - "Human Escalation Tool Call"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "人类升级工具调用"
case_summary: "假设采购 Agent 遇到超预算报价，它暂停下单，把差额、备选方案和截止时间组成审批请求；负责人选择方案后，流程从原步骤恢复。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》：原文明确提出把请求人类判断建模为 Agent 循环中的普通工具调用，而不是流程外异常。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-human-escalation-tool-call
    note: "本案例用来说明「人类升级工具调用」"
---

## 核心内容

**场景（假设场景）**：假设采购 Agent 遇到超预算报价，它暂停下单，把差额、备选方案和截止时间组成审批请求；负责人选择方案后，流程从原步骤恢复。

**来源里的真实依据**：本卡只采用以下来源范围：《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》：原文明确提出把请求人类判断建模为 Agent 循环中的普通工具调用，而不是流程外异常。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/human-escalation-tool-call.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-human-escalation-tool-call]] —— 本案例用来说明「人类升级工具调用」
- [[CON-human-escalation-tool-call_人类升级工具调用]]

## 备注

不要把假设场景当真实复盘引用。
