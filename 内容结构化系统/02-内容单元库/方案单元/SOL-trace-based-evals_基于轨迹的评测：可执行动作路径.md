---
id: SOL-trace-based-evals
type: 方案单元
title: "基于轨迹的评测：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "基于轨迹的评测"
  - "Trace-based Evals"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Observability 负责产生可回放轨迹；Trace-based Evals 负责用固定任务、基线与 verifier 对多次轨迹作比较判断。"
solution_summary: "先固定有边界的任务集、成功条件、对照基线、运行配置与 verifier，再开始采样轨迹。"
action_steps:
  - "先固定有边界的任务集、成功条件、对照基线、运行配置与 verifier，再开始采样轨迹。"
  - "对每个版本运行多次，保留结构化轨迹与最终结果，并把确定性检查和人工轨迹复核分开记录。"
  - "比较任务结果、无效步骤、工具误用、恢复能力与稳定性，同时标注环境噪声和不确定性。"
  - "只有可重复差异才进入 Harness 改动判断；单次漂亮路径或单个总分不作为充分证据。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-trace-based-evals
    note: "本方案是「基于轨迹的评测」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Observability 负责产生可回放轨迹；Trace-based Evals 负责用固定任务、基线与 verifier 对多次轨迹作比较判断。

**动作路径（how_to，逐条照抄源数据）**
1. 先固定有边界的任务集、成功条件、对照基线、运行配置与 verifier，再开始采样轨迹。
2. 对每个版本运行多次，保留结构化轨迹与最终结果，并把确定性检查和人工轨迹复核分开记录。
3. 比较任务结果、无效步骤、工具误用、恢复能力与稳定性，同时标注环境噪声和不确定性。
4. 只有可重复差异才进入 Harness 改动判断；单次漂亮路径或单个总分不作为充分证据。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/trace-based-evals.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-trace-based-evals]] —— 本方案是「基于轨迹的评测」的落地动作
- [[CON-trace-based-evals_基于轨迹的评测]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
