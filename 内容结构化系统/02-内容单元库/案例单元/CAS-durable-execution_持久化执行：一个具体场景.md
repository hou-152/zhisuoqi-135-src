---
id: CAS-durable-execution
type: 案例单元
title: "持久化执行：一个具体场景"
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
case_subject: "持久化执行"
case_summary: "Agent 在创建工单后容器崩溃。新容器读取外置状态，确认工单已经创建，只重放尚未完成的后续步骤，并用幂等键避免再创建一张重复工单。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "OpenAI 的 Agents SDK 更新以 Harness 与 Compute 分离支撑长任务：状态外置后，原沙箱失效可在新环境中通过 snapshotting 与 rehydration 从 checkpoint 继续。本站进一步明确，checkpoint 只回答“从哪里恢复”，完整 Durable Execution 还要定义重放、幂等和外部副作用的恢复语义。"
relationships:
  - type: 解释
    target: CON-durable-execution
    note: "本案例用来说明「持久化执行」"
---

## 核心内容

**场景（假设场景）**：Agent 在创建工单后容器崩溃。新容器读取外置状态，确认工单已经创建，只重放尚未完成的后续步骤，并用幂等键避免再创建一张重复工单。

**来源里的真实依据**：OpenAI 的 Agents SDK 更新以 Harness 与 Compute 分离支撑长任务：状态外置后，原沙箱失效可在新环境中通过 snapshotting 与 rehydration 从 checkpoint 继续。本站进一步明确，checkpoint 只回答“从哪里恢复”，完整 Durable Execution 还要定义重放、幂等和外部副作用的恢复语义。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/durable-execution.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-durable-execution]] —— 本案例用来说明「持久化执行」
- [[CON-durable-execution_持久化执行]]

## 备注

不要把假设场景当真实复盘引用。
