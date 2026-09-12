---
id: SOL-multi-step-reliability-decay
type: 方案单元
title: "多步可靠性衰减：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "多步可靠性衰减"
  - "Multi-Step Reliability Decay"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：各步独立时可用成功率乘积作简化估计；存在相关失败、重试或恢复路径时必须按真实条件概率与流程图计算。"
solution_summary: "画出步骤、条件分支、重试和恢复路径，并测量每条边的条件成功率。"
action_steps:
  - "画出步骤、条件分支、重试和恢复路径，并测量每条边的条件成功率。"
  - "在独立假设成立时先计算乘积基线，再用端到端重复运行校准。"
  - "找出贡献最大的失败节点，优先缩短链路、增强验证或增加恢复。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-multi-step-reliability-decay
    note: "本方案是「多步可靠性衰减」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：各步独立时可用成功率乘积作简化估计；存在相关失败、重试或恢复路径时必须按真实条件概率与流程图计算。

**动作路径（how_to，逐条照抄源数据）**
1. 画出步骤、条件分支、重试和恢复路径，并测量每条边的条件成功率。
2. 在独立假设成立时先计算乘积基线，再用端到端重复运行校准。
3. 找出贡献最大的失败节点，优先缩短链路、增强验证或增加恢复。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/multi-step-reliability-decay.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-multi-step-reliability-decay]] —— 本方案是「多步可靠性衰减」的落地动作
- [[CON-multi-step-reliability-decay_多步可靠性衰减]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
