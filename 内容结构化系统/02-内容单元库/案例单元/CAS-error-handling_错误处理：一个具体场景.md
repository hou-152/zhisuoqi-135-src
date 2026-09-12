---
id: CAS-error-handling
type: 案例单元
title: "错误处理：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "错误处理"
  - "Error Handling"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "错误处理"
case_summary: "Agent 调用支付接口超时后，Harness 先查询请求是否已成功，再按幂等策略有限重试；如果仍无法确认，就暂停并上报，而不是无限重放付款。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Akshay 的 Harness 拆解把错误分为临时性、模型可恢复、用户可修复和意外错误，并强调 Harness 要决定重试、向模型反馈、等待人类或上报调试。本站将“先分类再路由”作为稳定主线，不继承任何框架的固定重试次数。"
relationships:
  - type: 解释
    target: CON-error-handling
    note: "本案例用来说明「错误处理」"
---

## 核心内容

**场景（假设场景）**：Agent 调用支付接口超时后，Harness 先查询请求是否已成功，再按幂等策略有限重试；如果仍无法确认，就暂停并上报，而不是无限重放付款。

**来源里的真实依据**：Akshay 的 Harness 拆解把错误分为临时性、模型可恢复、用户可修复和意外错误，并强调 Harness 要决定重试、向模型反馈、等待人类或上报调试。本站将“先分类再路由”作为稳定主线，不继承任何框架的固定重试次数。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/error-handling.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-error-handling]] —— 本案例用来说明「错误处理」
- [[CON-error-handling_错误处理]]

## 备注

不要把假设场景当真实复盘引用。
