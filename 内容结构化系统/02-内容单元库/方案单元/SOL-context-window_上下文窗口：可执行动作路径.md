---
id: SOL-context-window
type: 方案单元
title: "上下文窗口：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "上下文窗口"
  - "Context Window"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：容量边界不等于实际 Context 内容。"
solution_summary: "同时检查窗口上限与当前实际占用。"
action_steps:
  - "同时检查窗口上限与当前实际占用。"
  - "检查关键内容的位置、干扰项和利用可靠性。"
  - "不要只用“还装得下”判断 Context 质量。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-context-window
    note: "本方案是「上下文窗口」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：容量边界不等于实际 Context 内容。

**动作路径（how_to，逐条照抄源数据）**
1. 同时检查窗口上限与当前实际占用。
2. 检查关键内容的位置、干扰项和利用可靠性。
3. 不要只用“还装得下”判断 Context 质量。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-window.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-context-window]] —— 本方案是「上下文窗口」的落地动作
- [[CON-context-window_上下文窗口]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
