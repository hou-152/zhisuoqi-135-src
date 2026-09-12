---
id: CAS-agent-handoff
type: 案例单元
title: "Agent 交接：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent 交接"
  - "Agent Handoff"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Agent 交接"
case_summary: "Agent A 的上下文即将耗尽，它把已完成范围、测试证据、当前失败、关键文件和下一步写入结构化交接包。Agent B 先核对真实仓库状态，再确认接管并从未完成处继续。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Awesome Harness Engineering 将 long-running agent handoff 描述为跨上下文窗口、跨阶段延续任务的机制，依赖 initializer agents、handoff artifacts、feature lists 与 context condensation。本站进一步把所有权转移与接管确认列为必要边界。"
relationships:
  - type: 解释
    target: CON-agent-handoff
    note: "本案例用来说明「Agent 交接」"
---

## 核心内容

**场景（假设场景）**：Agent A 的上下文即将耗尽，它把已完成范围、测试证据、当前失败、关键文件和下一步写入结构化交接包。Agent B 先核对真实仓库状态，再确认接管并从未完成处继续。

**来源里的真实依据**：Awesome Harness Engineering 将 long-running agent handoff 描述为跨上下文窗口、跨阶段延续任务的机制，依赖 initializer agents、handoff artifacts、feature lists 与 context condensation。本站进一步把所有权转移与接管确认列为必要边界。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-handoff.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-agent-handoff]] —— 本案例用来说明「Agent 交接」
- [[CON-agent-handoff_Agent 交接]]

## 备注

不要把假设场景当真实复盘引用。
