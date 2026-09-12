---
id: CAS-context-window
type: 案例单元
title: "上下文窗口：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "上下文窗口"
  - "Context Window"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "上下文窗口"
case_summary: "系统把几十份文档全部塞进一个大窗口，关键规则确实装得下，却仍被模型漏用。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "来源文章用 Claude Code 的长窗口讨论会话管理；本站只采用“单次推理容量与处理边界”的稳定口径，不继承具体产品阈值。"
relationships:
  - type: 解释
    target: CON-context-window
    note: "本案例用来说明「上下文窗口」"
---

## 核心内容

**场景（假设场景）**：系统把几十份文档全部塞进一个大窗口，关键规则确实装得下，却仍被模型漏用。

**来源里的真实依据**：来源文章用 Claude Code 的长窗口讨论会话管理；本站只采用“单次推理容量与处理边界”的稳定口径，不继承具体产品阈值。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-window.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-context-window]] —— 本案例用来说明「上下文窗口」
- [[CON-context-window_上下文窗口]]

## 备注

不要把假设场景当真实复盘引用。
