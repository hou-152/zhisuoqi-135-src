---
id: SOL-agent-cli-runtime
type: 方案单元
title: "Agent CLI 运行时：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent CLI 运行时"
  - "Agent CLI Runtime"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它是工作流的命令行运行载体，不是工作流定义本身。"
solution_summary: "把流程需要的输入、输出、退出码和环境依赖写成稳定命令接口。"
action_steps:
  - "把流程需要的输入、输出、退出码和环境依赖写成稳定命令接口。"
  - "在本地终端跑通后，再用无交互环境验证路径、权限和失败信号。"
  - "将同一命令接入脚本或 CI，并保留日志与可重复执行参数。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-cli-runtime
    note: "本方案是「Agent CLI 运行时」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它是工作流的命令行运行载体，不是工作流定义本身。

**动作路径（how_to，逐条照抄源数据）**
1. 把流程需要的输入、输出、退出码和环境依赖写成稳定命令接口。
2. 在本地终端跑通后，再用无交互环境验证路径、权限和失败信号。
3. 将同一命令接入脚本或 CI，并保留日志与可重复执行参数。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-cli-runtime.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-cli-runtime]] —— 本方案是「Agent CLI 运行时」的落地动作
- [[CON-agent-cli-runtime_Agent CLI 运行时]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
