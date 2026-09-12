---
id: CAS-memory
type: 案例单元
title: "记忆：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "记忆"
  - "Memory"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "记忆"
case_summary: "一个研究 Agent 上周把来源线索写进项目记忆；今天继续任务时，它先取回相关笔记，再打开原链接核对现状，而不是把旧笔记直接当成最新事实。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Anthropic 以结构化记事说明 agentic memory：Agent 把笔记写到上下文窗口之外的持久存储，之后再按需拉回窗口。来源中的待办、进度和依赖也可能承担执行状态职责，因此本站不把 Memory 与 State Management 写成互斥类别。"
relationships:
  - type: 解释
    target: CON-memory
    note: "本案例用来说明「记忆」"
---

## 核心内容

**场景（假设场景）**：一个研究 Agent 上周把来源线索写进项目记忆；今天继续任务时，它先取回相关笔记，再打开原链接核对现状，而不是把旧笔记直接当成最新事实。

**来源里的真实依据**：Anthropic 以结构化记事说明 agentic memory：Agent 把笔记写到上下文窗口之外的持久存储，之后再按需拉回窗口。来源中的待办、进度和依赖也可能承担执行状态职责，因此本站不把 Memory 与 State Management 写成互斥类别。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/memory.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-memory]] —— 本案例用来说明「记忆」
- [[CON-memory_记忆]]

## 备注

不要把假设场景当真实复盘引用。
