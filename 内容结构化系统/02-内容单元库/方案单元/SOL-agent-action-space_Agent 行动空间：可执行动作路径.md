---
id: SOL-agent-action-space
type: 方案单元
title: "Agent 行动空间：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "Agent 行动空间"
  - "Agent Action Space"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：行动空间不等于工具数量；同一工具的参数、调用时机和组合方式也会改变可行动边界。"
solution_summary: "枚举当前环境允许的动作、参数范围、前置条件和返回反馈。"
action_steps:
  - "枚举当前环境允许的动作、参数范围、前置条件和返回反馈。"
  - "用任务样本检查模型能否区分近似动作，并标出高混淆或高风险组合。"
  - "收窄无用选项、拆分危险能力或增加确认，再比较成功率和误调用率。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-action-space
    note: "本方案是「Agent 行动空间」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：行动空间不等于工具数量；同一工具的参数、调用时机和组合方式也会改变可行动边界。

**动作路径（how_to，逐条照抄源数据）**
1. 枚举当前环境允许的动作、参数范围、前置条件和返回反馈。
2. 用任务样本检查模型能否区分近似动作，并标出高混淆或高风险组合。
3. 收窄无用选项、拆分危险能力或增加确认，再比较成功率和误调用率。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-action-space.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-action-space]] —— 本方案是「Agent 行动空间」的落地动作
- [[CON-agent-action-space_Agent 行动空间]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
