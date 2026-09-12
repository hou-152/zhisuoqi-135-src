---
id: SOL-permission-boundary
type: 方案单元
title: "权限边界：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "权限边界"
  - "Permission Boundary"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Permission Boundary 决定动作是否获准；Sandbox 限制获准动作在哪里执行、影响能扩散到哪里，二者不能互相替代。"
solution_summary: "按工具、参数、路径、网络目标与副作用划分授权规则，并对高风险动作设置明确的人类确认点。"
action_steps:
  - "按工具、参数、路径、网络目标与副作用划分授权规则，并对高风险动作设置明确的人类确认点。"
  - "在执行前检查权限，在结果中保留允许、确认或拒绝的原因和实际参数。"
  - "用正反例测试边界：该放行的动作能通过，该拦截的动作不能靠改写提示绕过。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-permission-boundary
    note: "本方案是「权限边界」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Permission Boundary 决定动作是否获准；Sandbox 限制获准动作在哪里执行、影响能扩散到哪里，二者不能互相替代。

**动作路径（how_to，逐条照抄源数据）**
1. 按工具、参数、路径、网络目标与副作用划分授权规则，并对高风险动作设置明确的人类确认点。
2. 在执行前检查权限，在结果中保留允许、确认或拒绝的原因和实际参数。
3. 用正反例测试边界：该放行的动作能通过，该拦截的动作不能靠改写提示绕过。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/permission-boundary.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-permission-boundary]] —— 本方案是「权限边界」的落地动作
- [[CON-permission-boundary_权限边界]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
