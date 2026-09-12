---
id: SOL-state-management
type: 方案单元
title: "状态管理：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "状态管理"
  - "State Management"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：State 是任务当前可描述的执行事实；State Management 是记录、更新、持久化和恢复这些事实的实践。"
solution_summary: "明确哪些变量决定下一步，并在每次状态转换时原子地记录当前阶段、完成证据和待处理项。"
action_steps:
  - "明确哪些变量决定下一步，并在每次状态转换时原子地记录当前阶段、完成证据和待处理项。"
  - "为暂停、恢复和回溯分别定义入口；恢复后先核对外部世界，再继续执行。"
  - "避免把会话历史、业务状态和执行状态混成一个不可审计的大对象。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-state-management
    note: "本方案是「状态管理」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：State 是任务当前可描述的执行事实；State Management 是记录、更新、持久化和恢复这些事实的实践。

**动作路径（how_to，逐条照抄源数据）**
1. 明确哪些变量决定下一步，并在每次状态转换时原子地记录当前阶段、完成证据和待处理项。
2. 为暂停、恢复和回溯分别定义入口；恢复后先核对外部世界，再继续执行。
3. 避免把会话历史、业务状态和执行状态混成一个不可审计的大对象。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/state-management.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-state-management]] —— 本方案是「状态管理」的落地动作
- [[CON-state-management_状态管理]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
