---
id: CAS-agent-loop
type: 案例单元
title: "Agent 循环：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent 循环"
  - "Agent Loop"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Agent 循环"
case_summary: "Agent 先搜索仓库，看到结果后打开相关文件，再修改代码并运行测试；测试失败成为下一轮观察，测试通过且任务满足条件时退出循环。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Simon Willison 说明 coding agent 的实际工作方式是模型提出下一步、Harness 执行工具、结果重新进入上下文，模型再决定回答、继续调用工具或调整方案。本站补充生产边界：循环还要受停止条件、预算和用户中断约束。"
relationships:
  - type: 解释
    target: CON-agent-loop
    note: "本案例用来说明「Agent 循环」"
---

## 核心内容

**场景（假设场景）**：Agent 先搜索仓库，看到结果后打开相关文件，再修改代码并运行测试；测试失败成为下一轮观察，测试通过且任务满足条件时退出循环。

**来源里的真实依据**：Simon Willison 说明 coding agent 的实际工作方式是模型提出下一步、Harness 执行工具、结果重新进入上下文，模型再决定回答、继续调用工具或调整方案。本站补充生产边界：循环还要受停止条件、预算和用户中断约束。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-loop.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-agent-loop]] —— 本案例用来说明「Agent 循环」
- [[CON-agent-loop_Agent 循环]]

## 备注

不要把假设场景当真实复盘引用。
