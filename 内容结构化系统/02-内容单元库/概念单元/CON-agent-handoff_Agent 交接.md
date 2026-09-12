---
id: CON-agent-handoff
type: 概念单元
title: "Agent 交接"
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
concept_definition: "Agent Handoff 是把任务控制权连同可恢复的进度、证据、失败和下一步从 Agent A 移交给 Agent B，并由 B 确认接管。"
concept_function: "解释「Agent 交接」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 回应
    target: CON-agent-lifecycle
    note: "原 kind=used-with（反向）｜Handoff 是生命周期中改变责任主体的交接协议。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Agent Handoff 是 Agent Harness 编排控制权与上下文交接的组成部分。"
  - type: 解释
    target: CON-state-management
    note: "原 kind=prerequisite（反向）｜State Management 为 Agent Handoff 提供可读、可追加的进度与下一步。"
  - type: 回应
    target: CON-subagent-orchestration
    note: "原 kind=used-with（反向）｜把任务移交给专家 Agent 以及把结果带回主流程都需要交接合同。"
---

## 核心内容

**定义（remember）**：Agent Handoff 是把任务控制权连同可恢复的进度、证据、失败和下一步从 Agent A 移交给 Agent B，并由 B 确认接管。

**费曼一下**：它不像给同事发一条“你继续”的消息，更像正式交班。上一班要交出做到哪、什么已经验证、哪里失败、下一步该做什么；下一班读完后明确接管，任务所有权才真正换手。缺了交接包，B 只能重猜；缺了接管确认，双方都可能以为对方负责。

**边界（明确不成立的用法）**
- 把子 Agent 当工具调用后拿回结果，不等于把当前任务的控制权完整交给另一个 Agent。
- Handoff artifact 是可恢复的任务状态，不是把整段聊天或全部上下文原样倾倒给下一位 Agent。
- 发出交接请求不等于完成交接；接收方应核对证据、真实状态与责任范围后确认接管。
- 交接能延续工作，不保证前一位 Agent 的判断正确；关键事实仍需对真实文件、测试或外部状态复核。

**迁移问题**：如果 Agent A 只说“剩下的你继续”，Agent B 也没有确认责任范围，任务真的完成交接了吗？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-handoff.yaml`（name_en: Agent Handoff）
- 源证据范围（卡片自述）：Awesome Harness Engineering 将 long-running agent handoff 描述为跨上下文窗口、跨阶段延续任务的机制，依赖 initializer agents、handoff artifacts、feature lists 与 context condensation。本站进一步把所有权转移与接管确认列为必要边界。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-agent-lifecycle]] —— 原 kind=used-with（反向）｜Handoff 是生命周期中改变责任主体的交接协议。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Agent Handoff 是 Agent Harness 编排控制权与上下文交接的组成部分。
- [解释] [[CON-state-management]] —— 原 kind=prerequisite（反向）｜State Management 为 Agent Handoff 提供可读、可追加的进度与下一步。
- [回应] [[CON-subagent-orchestration]] —— 原 kind=used-with（反向）｜把任务移交给专家 Agent 以及把结果带回主流程都需要交接合同。
- [[CON-agent-lifecycle_Agent 生命周期]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-state-management_状态管理]]
- [[CON-subagent-orchestration_子 Agent 编排]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
