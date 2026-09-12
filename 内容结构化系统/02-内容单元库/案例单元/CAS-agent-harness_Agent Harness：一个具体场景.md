---
id: CAS-agent-harness
type: 案例单元
title: "Agent Harness：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent Harness"
  - "Agent Harness"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Agent Harness"
case_summary: "同一个模型接入两套代码 Agent 系统：一套只能偶尔运行命令，另一套能保存进度、限制写入范围、处理工具失败并验证结果。即使模型权重不变，最终表现也会因 Harness 不同而明显不同。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Akshay 将 Harness 描述为包裹 LLM 的完整软件基础设施，并用循环、工具、记忆、上下文管理、状态持久化、错误处理和护栏说明其广义范围。本站采用“模型外运行系统”作为主口径，同时承认不同团队会把 Harness 说得更广或更薄。"
relationships:
  - type: 解释
    target: CON-agent-harness
    note: "本案例用来说明「Agent Harness」"
---

## 核心内容

**场景（假设场景）**：同一个模型接入两套代码 Agent 系统：一套只能偶尔运行命令，另一套能保存进度、限制写入范围、处理工具失败并验证结果。即使模型权重不变，最终表现也会因 Harness 不同而明显不同。

**来源里的真实依据**：Akshay 将 Harness 描述为包裹 LLM 的完整软件基础设施，并用循环、工具、记忆、上下文管理、状态持久化、错误处理和护栏说明其广义范围。本站采用“模型外运行系统”作为主口径，同时承认不同团队会把 Harness 说得更广或更薄。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-harness.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-agent-harness]] —— 本案例用来说明「Agent Harness」
- [[CON-agent-harness_Agent Harness]]

## 备注

不要把假设场景当真实复盘引用。
