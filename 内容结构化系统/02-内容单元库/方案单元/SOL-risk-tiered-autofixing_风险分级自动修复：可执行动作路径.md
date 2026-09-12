---
id: SOL-risk-tiered-autofixing
type: 方案单元
title: "风险分级自动修复：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "风险分级自动修复"
  - "Risk-Tiered Autofixing"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不是让 Agent 无条件修复并上线；风险分级决定自动化可以推进到哪一层门禁。"
solution_summary: "按可逆性、影响范围、权限、数据敏感度和验证强度定义风险等级。"
action_steps:
  - "按可逆性、影响范围、权限、数据敏感度和验证强度定义风险等级。"
  - "让系统生成修复，但把每一等级可自动推进的最远门禁写死。"
  - "用错分级和越权修复做负测，确认高风险路径会停止并保留候选与证据。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-risk-tiered-autofixing
    note: "本方案是「风险分级自动修复」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不是让 Agent 无条件修复并上线；风险分级决定自动化可以推进到哪一层门禁。

**动作路径（how_to，逐条照抄源数据）**
1. 按可逆性、影响范围、权限、数据敏感度和验证强度定义风险等级。
2. 让系统生成修复，但把每一等级可自动推进的最远门禁写死。
3. 用错分级和越权修复做负测，确认高风险路径会停止并保留候选与证据。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/risk-tiered-autofixing.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-risk-tiered-autofixing]] —— 本方案是「风险分级自动修复」的落地动作
- [[CON-risk-tiered-autofixing_风险分级自动修复]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
