---
id: SOL-skill-chaining
type: 方案单元
title: "Skill 链式调用：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Skill 链式调用"
  - "Skill Chaining"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：链式调用把灵活性换成自动化；步骤需要独立使用时不应强制串联。"
solution_summary: "为每个 Skill 写清输入、输出、成功条件和可以独立停止的位置。"
action_steps:
  - "为每个 Skill 写清输入、输出、成功条件和可以独立停止的位置。"
  - "定义前一步产物如何映射到下一步，以及失败、重试和人工升级如何处理。"
  - "用一步失败和重复执行做演练，确认不会丢产物或产生重复副作用。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-skill-chaining
    note: "本方案是「Skill 链式调用」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：链式调用把灵活性换成自动化；步骤需要独立使用时不应强制串联。

**动作路径（how_to，逐条照抄源数据）**
1. 为每个 Skill 写清输入、输出、成功条件和可以独立停止的位置。
2. 定义前一步产物如何映射到下一步，以及失败、重试和人工升级如何处理。
3. 用一步失败和重复执行做演练，确认不会丢产物或产生重复副作用。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/skill-chaining.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-skill-chaining]] —— 本方案是「Skill 链式调用」的落地动作
- [[CON-skill-chaining_Skill 链式调用]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
