---
id: CAS-agent
type: 案例单元
title: "AI Agent：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "AI Agent"
  - "AI Agent"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "AI Agent"
case_summary: "你让 Agent 修复测试失败。它先读取报错，定位文件，修改代码，运行测试，再依据新结果决定继续修还是结束；这些连续动作不是一次模型回复就能独立完成的。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Simon Willison 给出最小组成视角：LLM、system prompt、工具与工具结果回灌循环可以构成基础 Agent。本站同时保留行为视角：用户感知到的是围绕目标持续行动的系统，而不是单独的模型对象。"
relationships:
  - type: 解释
    target: CON-agent
    note: "本案例用来说明「AI Agent」"
---

## 核心内容

**场景（假设场景）**：你让 Agent 修复测试失败。它先读取报错，定位文件，修改代码，运行测试，再依据新结果决定继续修还是结束；这些连续动作不是一次模型回复就能独立完成的。

**来源里的真实依据**：Simon Willison 给出最小组成视角：LLM、system prompt、工具与工具结果回灌循环可以构成基础 Agent。本站同时保留行为视角：用户感知到的是围绕目标持续行动的系统，而不是单独的模型对象。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-agent]] —— 本案例用来说明「AI Agent」
- [[CON-agent_AI Agent]]

## 备注

不要把假设场景当真实复盘引用。
