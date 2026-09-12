---
id: SOL-system-prompt-altitude
type: 方案单元
title: "系统提示抽象高度：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "系统提示抽象高度"
  - "System Prompt Altitude"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不是越具体或越简短越好，而是在任务、模型和失败模式之间校准颗粒度。"
solution_summary: "收集高频任务、真实失败样本和必须统一的行为边界。"
action_steps:
  - "收集高频任务、真实失败样本和必须统一的行为边界。"
  - "把规则写成可判断的原则、关键例外和升级条件，删除不必要的微步骤。"
  - "用未见过的边缘案例测试，观察模型是能据原则判断，还是出现自由发挥或机械执行。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-system-prompt-altitude
    note: "本方案是「系统提示抽象高度」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不是越具体或越简短越好，而是在任务、模型和失败模式之间校准颗粒度。

**动作路径（how_to，逐条照抄源数据）**
1. 收集高频任务、真实失败样本和必须统一的行为边界。
2. 把规则写成可判断的原则、关键例外和升级条件，删除不必要的微步骤。
3. 用未见过的边缘案例测试，观察模型是能据原则判断，还是出现自由发挥或机械执行。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/system-prompt-altitude.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-system-prompt-altitude]] —— 本方案是「系统提示抽象高度」的落地动作
- [[CON-system-prompt-altitude_系统提示抽象高度]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
