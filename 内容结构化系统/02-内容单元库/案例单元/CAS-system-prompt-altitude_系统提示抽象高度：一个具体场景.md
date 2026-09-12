---
id: CAS-system-prompt-altitude
type: 案例单元
title: "系统提示抽象高度：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "系统提示抽象高度"
  - "System Prompt Altitude"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "系统提示抽象高度"
case_summary: "假设客服系统一版提示逐秒规定每句话，遇到新投诉就卡住；另一版只写“友善解决”，又无法稳定处理退款与升级。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》：原文把系统提示的抽象高度定义为过度硬编码与过度含糊之间的可判断区间。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-system-prompt-altitude
    note: "本案例用来说明「系统提示抽象高度」"
---

## 核心内容

**场景（假设场景）**：假设客服系统一版提示逐秒规定每句话，遇到新投诉就卡住；另一版只写“友善解决”，又无法稳定处理退款与升级。

**来源里的真实依据**：本卡只采用以下来源范围：《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》：原文把系统提示的抽象高度定义为过度硬编码与过度含糊之间的可判断区间。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/system-prompt-altitude.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-system-prompt-altitude]] —— 本案例用来说明「系统提示抽象高度」
- [[CON-system-prompt-altitude_系统提示抽象高度]]

## 备注

不要把假设场景当真实复盘引用。
