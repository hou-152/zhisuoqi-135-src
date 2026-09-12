---
id: SOL-verifiable-goal
type: 方案单元
title: "可验证目标：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "可验证目标"
  - "Verifiable Goal"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不同于测试本身；目标说明要达到什么，验证机制提供判定证据。"
solution_summary: "把成功写成可重复输入、明确判定和允许误差，并列出不可接受路径。"
action_steps:
  - "把成功写成可重复输入、明确判定和允许误差，并列出不可接受路径。"
  - "准备至少一个应通过和一个应失败的样本，验证判定器不是恒绿。"
  - "让 Agent 每轮运行证据，根据结果修正、停止或如实报告无法达到。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-verifiable-goal
    note: "本方案是「可验证目标」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不同于测试本身；目标说明要达到什么，验证机制提供判定证据。

**动作路径（how_to，逐条照抄源数据）**
1. 把成功写成可重复输入、明确判定和允许误差，并列出不可接受路径。
2. 准备至少一个应通过和一个应失败的样本，验证判定器不是恒绿。
3. 让 Agent 每轮运行证据，根据结果修正、停止或如实报告无法达到。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/verifiable-goal.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-verifiable-goal]] —— 本方案是「可验证目标」的落地动作
- [[CON-verifiable-goal_可验证目标]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
