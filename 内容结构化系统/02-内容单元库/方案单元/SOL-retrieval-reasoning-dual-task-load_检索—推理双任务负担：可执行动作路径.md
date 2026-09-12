---
id: SOL-retrieval-reasoning-dual-task-load
type: 方案单元
title: "检索—推理双任务负担：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "检索—推理双任务负担"
  - "Retrieval–Reasoning Dual-Task Load"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它描述检索与推理被捆在一次调用中的复合负担，不表示所有检索增强都会降低表现。"
solution_summary: "准备答案与推理难度相同的任务，分别提供完整材料和已聚焦证据。"
action_steps:
  - "准备答案与推理难度相同的任务，分别提供完整材料和已聚焦证据。"
  - "记录模型引用了哪些证据、是否漏检，以及在证据已给定时推理是否正确。"
  - "根据差异决定把检索拆成独立步骤、增加证据排序，还是保留一次调用。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-retrieval-reasoning-dual-task-load
    note: "本方案是「检索—推理双任务负担」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它描述检索与推理被捆在一次调用中的复合负担，不表示所有检索增强都会降低表现。

**动作路径（how_to，逐条照抄源数据）**
1. 准备答案与推理难度相同的任务，分别提供完整材料和已聚焦证据。
2. 记录模型引用了哪些证据、是否漏检，以及在证据已给定时推理是否正确。
3. 根据差异决定把检索拆成独立步骤、增加证据排序，还是保留一次调用。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/retrieval-reasoning-dual-task-load.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-retrieval-reasoning-dual-task-load]] —— 本方案是「检索—推理双任务负担」的落地动作
- [[CON-retrieval-reasoning-dual-task-load_检索—推理双任务负担]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
