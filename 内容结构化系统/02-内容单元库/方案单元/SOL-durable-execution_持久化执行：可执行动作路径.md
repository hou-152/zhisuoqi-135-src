---
id: SOL-durable-execution
type: 方案单元
title: "持久化执行：可执行动作路径"
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
target_problem: "避免这个误区：Durable Execution 不等于 checkpoint；保存恢复点是必要部件之一，却不能单独保证续跑正确。"
solution_summary: "把长任务拆成有明确输入、输出和提交边界的步骤，并把运行状态存到短命计算环境之外。"
action_steps:
  - "把长任务拆成有明确输入、输出和提交边界的步骤，并把运行状态存到短命计算环境之外。"
  - "为每一步声明重放策略、幂等键与已提交证据；恢复时先对账，再决定跳过、重试、补偿或暂停。"
  - "用故障注入验证进程退出、容器过期和网络超时后，任务既能继续，也不会重复产生副作用。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-durable-execution
    note: "本方案是「持久化执行」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Durable Execution 不等于 checkpoint；保存恢复点是必要部件之一，却不能单独保证续跑正确。

**动作路径（how_to，逐条照抄源数据）**
1. 把长任务拆成有明确输入、输出和提交边界的步骤，并把运行状态存到短命计算环境之外。
2. 为每一步声明重放策略、幂等键与已提交证据；恢复时先对账，再决定跳过、重试、补偿或暂停。
3. 用故障注入验证进程退出、容器过期和网络超时后，任务既能继续，也不会重复产生副作用。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/durable-execution.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-durable-execution]] —— 本方案是「持久化执行」的落地动作
- [[CON-durable-execution_持久化执行]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
