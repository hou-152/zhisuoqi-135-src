---
id: CAS-bounded-context
type: 案例单元
title: "限界上下文：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "限界上下文"
  - "Bounded Context"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "限界上下文"
case_summary: "假设销售模块把“客户”定义为签约主体，客服模块却把每位联系人都叫客户；一次数据合并让两个团队对人数和权限产生了相反结论。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《从 /grill-me 到 /grill-with-docs：用对话先对齐领域语言》：原文明确把 bounded context 定义为应用中使用同一套语言的一块范围，并说明大型仓库可存在多个边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-bounded-context
    note: "本案例用来说明「限界上下文」"
---

## 核心内容

**场景（假设场景）**：假设销售模块把“客户”定义为签约主体，客服模块却把每位联系人都叫客户；一次数据合并让两个团队对人数和权限产生了相反结论。

**来源里的真实依据**：本卡只采用以下来源范围：《从 /grill-me 到 /grill-with-docs：用对话先对齐领域语言》：原文明确把 bounded context 定义为应用中使用同一套语言的一块范围，并说明大型仓库可存在多个边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/bounded-context.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-bounded-context]] —— 本案例用来说明「限界上下文」
- [[CON-bounded-context_限界上下文]]

## 备注

不要把假设场景当真实复盘引用。
