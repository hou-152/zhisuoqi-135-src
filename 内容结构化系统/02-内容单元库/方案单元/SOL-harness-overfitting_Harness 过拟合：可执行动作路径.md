---
id: SOL-harness-overfitting
type: 方案单元
title: "Harness 过拟合：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "Harness 过拟合"
  - "Harness Overfitting"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：与原生 Harness 协同良好不自动等于过拟合；只有跨等价接口的泛化下降才支持该判断。"
solution_summary: "固定模型、任务、权限和评分，准备两套能力尽量等价的 Harness 接口。"
action_steps:
  - "固定模型、任务、权限和评分，准备两套能力尽量等价的 Harness 接口。"
  - "交叉运行并记录工具选择、参数错误、恢复路径和最终成功率。"
  - "逐项对齐能力差异后再判断是否存在接口依赖，避免把实现缺陷误叫过拟合。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-harness-overfitting
    note: "本方案是「Harness 过拟合」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：与原生 Harness 协同良好不自动等于过拟合；只有跨等价接口的泛化下降才支持该判断。

**动作路径（how_to，逐条照抄源数据）**
1. 固定模型、任务、权限和评分，准备两套能力尽量等价的 Harness 接口。
2. 交叉运行并记录工具选择、参数错误、恢复路径和最终成功率。
3. 逐项对齐能力差异后再判断是否存在接口依赖，避免把实现缺陷误叫过拟合。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-overfitting.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-harness-overfitting]] —— 本方案是「Harness 过拟合」的落地动作
- [[CON-harness-overfitting_Harness 过拟合]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
