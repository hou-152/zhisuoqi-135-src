---
id: CAS-event-driven-agent-automation
type: 案例单元
title: "事件驱动的 Agent 自动化：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "事件驱动的 Agent 自动化"
  - "Event-Driven Agent Automation"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "事件驱动的 Agent 自动化"
case_summary: "假设新工单进入队列就自动触发分类、查重和补充资料；同一事件被重复投递时，系统差点创建两份处理任务。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《产品开发的下一阶段由上下文与行动能力驱动》：逐字说明由新事件触发 Agent 工作流并立即精炼、综合或行动的机制。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-event-driven-agent-automation
    note: "本案例用来说明「事件驱动的 Agent 自动化」"
---

## 核心内容

**场景（假设场景）**：假设新工单进入队列就自动触发分类、查重和补充资料；同一事件被重复投递时，系统差点创建两份处理任务。

**来源里的真实依据**：本卡只采用以下来源范围：《产品开发的下一阶段由上下文与行动能力驱动》：逐字说明由新事件触发 Agent 工作流并立即精炼、综合或行动的机制。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/event-driven-agent-automation.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-event-driven-agent-automation]] —— 本案例用来说明「事件驱动的 Agent 自动化」
- [[CON-event-driven-agent-automation_事件驱动的 Agent 自动化]]

## 备注

不要把假设场景当真实复盘引用。
