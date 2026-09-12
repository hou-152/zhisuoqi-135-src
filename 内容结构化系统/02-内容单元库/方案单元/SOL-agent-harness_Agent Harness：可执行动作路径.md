---
id: SOL-agent-harness
type: 方案单元
title: "Agent Harness：可执行动作路径"
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
target_problem: "避免这个误区：Agent Harness 不等于模型；模型负责生成判断或工具请求，Harness 负责执行、回灌、状态与控制。"
solution_summary: "排查 Agent 失败时，分别检查模型判断、循环、工具、状态、Context、权限、错误处理和验证，避免把所有问题都归因于模型能力。"
action_steps:
  - "排查 Agent 失败时，分别检查模型判断、循环、工具、状态、Context、权限、错误处理和验证，避免把所有问题都归因于模型能力。"
  - "更换 Harness 组件时固定模型、任务和输入，再比较轨迹与结果，才能判断改动实际影响了什么。"
  - "先定义 Harness 在当前系统中的边界，再讨论厚薄；不要让同一个词一会儿指完整非模型架构，一会儿只指 while 循环。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-harness
    note: "本方案是「Agent Harness」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Agent Harness 不等于模型；模型负责生成判断或工具请求，Harness 负责执行、回灌、状态与控制。

**动作路径（how_to，逐条照抄源数据）**
1. 排查 Agent 失败时，分别检查模型判断、循环、工具、状态、Context、权限、错误处理和验证，避免把所有问题都归因于模型能力。
2. 更换 Harness 组件时固定模型、任务和输入，再比较轨迹与结果，才能判断改动实际影响了什么。
3. 先定义 Harness 在当前系统中的边界，再讨论厚薄；不要让同一个词一会儿指完整非模型架构，一会儿只指 while 循环。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-harness.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-harness]] —— 本方案是「Agent Harness」的落地动作
- [[CON-agent-harness_Agent Harness]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
