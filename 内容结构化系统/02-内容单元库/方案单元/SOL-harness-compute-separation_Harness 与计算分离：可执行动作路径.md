---
id: SOL-harness-compute-separation
type: 方案单元
title: "Harness 与计算分离：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Harness 与计算分离"
  - "Harness-Compute Separation"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它是运行架构分层，不是把 Harness 或沙箱从 Agent 系统中移除。"
solution_summary: "列出状态、凭据、控制决策与不可信计算，分别指定所属层和通信接口。"
action_steps:
  - "列出状态、凭据、控制决策与不可信计算，分别指定所属层和通信接口。"
  - "让执行环境只获得当前动作所需的短期能力，并限制文件、网络和资源。"
  - "销毁计算环境后恢复任务，再用越权读取演练检查凭据没有泄漏。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-harness-compute-separation
    note: "本方案是「Harness 与计算分离」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它是运行架构分层，不是把 Harness 或沙箱从 Agent 系统中移除。

**动作路径（how_to，逐条照抄源数据）**
1. 列出状态、凭据、控制决策与不可信计算，分别指定所属层和通信接口。
2. 让执行环境只获得当前动作所需的短期能力，并限制文件、网络和资源。
3. 销毁计算环境后恢复任务，再用越权读取演练检查凭据没有泄漏。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-compute-separation.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-harness-compute-separation]] —— 本方案是「Harness 与计算分离」的落地动作
- [[CON-harness-compute-separation_Harness 与计算分离]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
