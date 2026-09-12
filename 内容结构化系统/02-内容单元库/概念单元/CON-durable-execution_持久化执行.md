---
id: CON-durable-execution
type: 概念单元
title: "持久化执行"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "持久化执行"
  - "Durable Execution"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "持久化执行让长任务在进程或计算环境中断后，能依据外置状态重放并继续，同时避免已经发生的外部副作用被无意重复。"
concept_function: "解释「持久化执行」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 解释
    target: CON-state-management
    note: "原 kind=prerequisite（反向）｜可持久化状态是耐久执行的必要条件之一。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Durable Execution 是 Agent Harness 提供可靠重试与恢复的组成部分。"
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with｜Durable Execution 把 Agent Loop 的每次模型与工具调用变成可独立重试步骤。"
  - type: 回应
    target: CON-sandbox
    note: "原 kind=used-with（反向）｜Sandbox 与 Durable Execution 配合，让环境失效后仍能从检查点恢复。"
  - type: 回应
    target: CON-human-escalation-tool-call
    note: "原 kind=used-with（反向）｜等待人类回复的工作流需要持久保存状态并在结果到达后恢复。"
  - type: 回应
    target: CON-agent-cli-runtime
    note: "原 kind=used-with（反向）｜进入脚本与 CI/CD 后，长任务仍需持久化执行机制处理恢复和重试。"
---

## 核心内容

**定义（remember）**：持久化执行让长任务在进程或计算环境中断后，能依据外置状态重放并继续，同时避免已经发生的外部副作用被无意重复。

**费曼一下**：它不只是给游戏存一张档。真正恢复时，系统还要知道哪些步骤可以安全重放、哪些付款或消息已经真的发出、再次执行会不会重复扣款。只有把状态、重放规则和副作用处理一起设计，任务才算能可靠续跑。

**边界（明确不成立的用法）**
- Durable Execution 不等于 checkpoint；保存恢复点是必要部件之一，却不能单独保证续跑正确。
- 重放必须区分纯计算、可幂等调用和不可安全重复的外部副作用；不能假设所有步骤都能再跑一次。
- “状态已恢复”不代表外部世界回到旧状态；工单、付款、邮件、文件写入等副作用要靠幂等键、事务、补偿或人工确认处理。

**迁移问题**：一个工作流能从 checkpoint 启动，却在恢复后重复发送邮件，为什么它仍不能称为可靠的 Durable Execution？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/durable-execution.yaml`（name_en: Durable Execution）
- 源证据范围（卡片自述）：OpenAI 的 Agents SDK 更新以 Harness 与 Compute 分离支撑长任务：状态外置后，原沙箱失效可在新环境中通过 snapshotting 与 rehydration 从 checkpoint 继续。本站进一步明确，checkpoint 只回答“从哪里恢复”，完整 Durable Execution 还要定义重放、幂等和外部副作用的恢复语义。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-state-management]] —— 原 kind=prerequisite（反向）｜可持久化状态是耐久执行的必要条件之一。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Durable Execution 是 Agent Harness 提供可靠重试与恢复的组成部分。
- [回应] [[CON-agent-loop]] —— 原 kind=used-with｜Durable Execution 把 Agent Loop 的每次模型与工具调用变成可独立重试步骤。
- [回应] [[CON-sandbox]] —— 原 kind=used-with（反向）｜Sandbox 与 Durable Execution 配合，让环境失效后仍能从检查点恢复。
- [回应] [[CON-human-escalation-tool-call]] —— 原 kind=used-with（反向）｜等待人类回复的工作流需要持久保存状态并在结果到达后恢复。
- [回应] [[CON-agent-cli-runtime]] —— 原 kind=used-with（反向）｜进入脚本与 CI/CD 后，长任务仍需持久化执行机制处理恢复和重试。
- [[CON-state-management_状态管理]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-agent-loop_Agent 循环]]
- [[CON-sandbox_沙箱]]
- [[CON-human-escalation-tool-call_人类升级工具调用]]
- [[CON-agent-cli-runtime_Agent CLI 运行时]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
