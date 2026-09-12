---
id: CAS-prompt-caching
type: 案例单元
title: "提示词缓存：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "提示词缓存"
  - "Prompt Caching"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "提示词缓存"
case_summary: "假设客服 Agent 的系统规则和工具说明连续十轮不变，只有末尾用户消息变化；把动态时间戳放到最前面后，缓存收益突然消失。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《提示词缓存不是小优化，而是 agent 成本结构的关键变量》：逐字定义提示词缓存复用稳定输入前缀的计算结果，并把它放在长对话与 Agent 的成本结构中。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-prompt-caching
    note: "本案例用来说明「提示词缓存」"
---

## 核心内容

**场景（假设场景）**：假设客服 Agent 的系统规则和工具说明连续十轮不变，只有末尾用户消息变化；把动态时间戳放到最前面后，缓存收益突然消失。

**来源里的真实依据**：本卡只采用以下来源范围：《提示词缓存不是小优化，而是 agent 成本结构的关键变量》：逐字定义提示词缓存复用稳定输入前缀的计算结果，并把它放在长对话与 Agent 的成本结构中。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt-caching.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-prompt-caching]] —— 本案例用来说明「提示词缓存」
- [[CON-prompt-caching_提示词缓存]]

## 备注

不要把假设场景当真实复盘引用。
