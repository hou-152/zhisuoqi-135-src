---
id: SOL-error-handling
type: 方案单元
title: "错误处理：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "错误处理"
  - "Error Handling"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Error Handling 不等于 retry；对权限拒绝、无效输入或不可重复副作用盲目重试，可能扩大损失。"
solution_summary: "至少区分瞬时、模型可恢复、用户可修复、意外和安全类错误，并为每类规定次数、退避、超时与退出条件。"
action_steps:
  - "至少区分瞬时、模型可恢复、用户可修复、意外和安全类错误，并为每类规定次数、退避、超时与退出条件。"
  - "保留原始错误、步骤、输入摘要和已发生副作用，避免重试把证据覆盖掉。"
  - "对不确定是否已执行成功的外部动作先查询或对账，再决定是否重试。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-error-handling
    note: "本方案是「错误处理」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Error Handling 不等于 retry；对权限拒绝、无效输入或不可重复副作用盲目重试，可能扩大损失。

**动作路径（how_to，逐条照抄源数据）**
1. 至少区分瞬时、模型可恢复、用户可修复、意外和安全类错误，并为每类规定次数、退避、超时与退出条件。
2. 保留原始错误、步骤、输入摘要和已发生副作用，避免重试把证据覆盖掉。
3. 对不确定是否已执行成功的外部动作先查询或对账，再决定是否重试。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/error-handling.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-error-handling]] —— 本方案是「错误处理」的落地动作
- [[CON-error-handling_错误处理]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
