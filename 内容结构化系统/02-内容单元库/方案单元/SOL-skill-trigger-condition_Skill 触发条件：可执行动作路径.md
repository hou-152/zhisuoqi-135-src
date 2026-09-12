---
id: SOL-skill-trigger-condition
type: 方案单元
title: "Skill 触发条件：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "Skill 触发条件"
  - "Skill Trigger Condition"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：触发条件决定何时被考虑，不等同于 Skill 的任务步骤或工具权限。"
solution_summary: "从真实请求中列出应该触发、容易混淆和明确不应触发的样本。"
action_steps:
  - "从真实请求中列出应该触发、容易混淆和明确不应触发的样本。"
  - "用用户可观察的场景、对象和动作写描述，避免只写宽泛能力名。"
  - "回放正负样本，分别统计漏触发和误触发，再收窄或补充条件。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-skill-trigger-condition
    note: "本方案是「Skill 触发条件」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：触发条件决定何时被考虑，不等同于 Skill 的任务步骤或工具权限。

**动作路径（how_to，逐条照抄源数据）**
1. 从真实请求中列出应该触发、容易混淆和明确不应触发的样本。
2. 用用户可观察的场景、对象和动作写描述，避免只写宽泛能力名。
3. 回放正负样本，分别统计漏触发和误触发，再收窄或补充条件。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/skill-trigger-condition.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-skill-trigger-condition]] —— 本方案是「Skill 触发条件」的落地动作
- [[CON-skill-trigger-condition_Skill 触发条件]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
