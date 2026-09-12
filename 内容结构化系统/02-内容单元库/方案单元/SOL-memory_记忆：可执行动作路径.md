---
id: SOL-memory
type: 方案单元
title: "记忆：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "记忆"
  - "Memory"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Memory 被存储在外部，不代表它已进入当前 Context；只有取回并装配后，模型本轮才可见。"
solution_summary: "先区分“已经保存”“已经取回”“已经进入当前 Context”和“已经核实”四个状态。"
action_steps:
  - "先区分“已经保存”“已经取回”“已经进入当前 Context”和“已经核实”四个状态。"
  - "给记忆保留来源、时间和适用范围；取回后优先验证会变化的事实。"
  - "当问题是任务不知道做到哪里时，同时检查 State Management，不要把所有连续性问题都归为 Memory。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-memory
    note: "本方案是「记忆」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Memory 被存储在外部，不代表它已进入当前 Context；只有取回并装配后，模型本轮才可见。

**动作路径（how_to，逐条照抄源数据）**
1. 先区分“已经保存”“已经取回”“已经进入当前 Context”和“已经核实”四个状态。
2. 给记忆保留来源、时间和适用范围；取回后优先验证会变化的事实。
3. 当问题是任务不知道做到哪里时，同时检查 State Management，不要把所有连续性问题都归为 Memory。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/memory.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-memory]] —— 本方案是「记忆」的落地动作
- [[CON-memory_记忆]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
