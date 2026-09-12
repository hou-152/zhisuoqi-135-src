---
id: SOL-observation-masking
type: 方案单元
title: "观察掩码：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "观察掩码"
  - "Observation Masking"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：掩码不是删除整个交互历史；调用痕迹仍可保留，沉重的观察内容不再反复进入当前输入。"
solution_summary: "标出已经完成作用、但不必继续逐字可见的旧工具输出。"
action_steps:
  - "标出已经完成作用、但不必继续逐字可见的旧工具输出。"
  - "保留调用时间、工具名、结论和回取引用，把沉重正文移出当前输入。"
  - "继续任务并设置恢复触发条件，验证需要细节时能重新取得原输出。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-observation-masking
    note: "本方案是「观察掩码」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：掩码不是删除整个交互历史；调用痕迹仍可保留，沉重的观察内容不再反复进入当前输入。

**动作路径（how_to，逐条照抄源数据）**
1. 标出已经完成作用、但不必继续逐字可见的旧工具输出。
2. 保留调用时间、工具名、结论和回取引用，把沉重正文移出当前输入。
3. 继续任务并设置恢复触发条件，验证需要细节时能重新取得原输出。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/observation-masking.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-observation-masking]] —— 本方案是「观察掩码」的落地动作
- [[CON-observation-masking_观察掩码]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
