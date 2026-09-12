---
id: SOL-agent
type: 方案单元
title: "AI Agent：可执行动作路径"
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
target_problem: "避免这个误区：Agent 不等于 LLM；模型负责推理与生成，工具执行、状态维护、权限和循环来自外部系统。"
solution_summary: "识别一个系统是否真的具有 Agent 行为时，检查它能否围绕目标根据结果选择下一步，而不只看是否使用了 Agent 名称。"
action_steps:
  - "识别一个系统是否真的具有 Agent 行为时，检查它能否围绕目标根据结果选择下一步，而不只看是否使用了 Agent 名称。"
  - "排错时把问题拆成模型判断、工具能力、状态、权限、循环和验证，避免笼统归因于“Agent 不聪明”。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent
    note: "本方案是「AI Agent」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Agent 不等于 LLM；模型负责推理与生成，工具执行、状态维护、权限和循环来自外部系统。

**动作路径（how_to，逐条照抄源数据）**
1. 识别一个系统是否真的具有 Agent 行为时，检查它能否围绕目标根据结果选择下一步，而不只看是否使用了 Agent 名称。
2. 排错时把问题拆成模型判断、工具能力、状态、权限、循环和验证，避免笼统归因于“Agent 不聪明”。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent]] —— 本方案是「AI Agent」的落地动作
- [[CON-agent_AI Agent]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
