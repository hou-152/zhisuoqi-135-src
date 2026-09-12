---
id: CAS-browsing-loop
type: 案例单元
title: "浏览循环：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "浏览循环"
  - "Browsing Loop"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "浏览循环"
case_summary: "假设 Agent 为回答“是否更换供应商”连续打开几十篇材料；每篇都带来新名词，却没有补齐价格、稳定性和迁移成本三项决策证据。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《工具更多反而让 Copilot 代码审查变差，GitHub 如何修正》：原文明确命名一种搜索不断扩散、却没有逼近任务证据的 Agent 失败循环。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-browsing-loop
    note: "本案例用来说明「浏览循环」"
---

## 核心内容

**场景（假设场景）**：假设 Agent 为回答“是否更换供应商”连续打开几十篇材料；每篇都带来新名词，却没有补齐价格、稳定性和迁移成本三项决策证据。

**来源里的真实依据**：本卡只采用以下来源范围：《工具更多反而让 Copilot 代码审查变差，GitHub 如何修正》：原文明确命名一种搜索不断扩散、却没有逼近任务证据的 Agent 失败循环。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/browsing-loop.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-browsing-loop]] —— 本案例用来说明「浏览循环」
- [[CON-browsing-loop_浏览循环]]

## 备注

不要把假设场景当真实复盘引用。
