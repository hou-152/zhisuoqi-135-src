---
id: SOL-guardrails
type: 方案单元
title: "护栏：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "护栏"
  - "Guardrails"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Guardrails 不等于 Permission Boundary；权限边界回答“这个主体是否被授权”，护栏还可检查内容、参数、结果和运行条件。"
solution_summary: "先明确每条护栏检查什么对象、依据什么规则、在何时运行，以及触发后是阻断单次调用还是停止整个 Agent。"
action_steps:
  - "先明确每条护栏检查什么对象、依据什么规则、在何时运行，以及触发后是阻断单次调用还是停止整个 Agent。"
  - "对通过、误报、漏报和超时分别测试，并在日志中记录触发原因与恢复路径。"
  - "高风险动作同时使用权限控制、沙箱和人工确认，不把一条模型式分类护栏当成完整安全架构。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-guardrails
    note: "本方案是「护栏」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Guardrails 不等于 Permission Boundary；权限边界回答“这个主体是否被授权”，护栏还可检查内容、参数、结果和运行条件。

**动作路径（how_to，逐条照抄源数据）**
1. 先明确每条护栏检查什么对象、依据什么规则、在何时运行，以及触发后是阻断单次调用还是停止整个 Agent。
2. 对通过、误报、漏报和超时分别测试，并在日志中记录触发原因与恢复路径。
3. 高风险动作同时使用权限控制、沙箱和人工确认，不把一条模型式分类护栏当成完整安全架构。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/guardrails.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-guardrails]] —— 本方案是「护栏」的落地动作
- [[CON-guardrails_护栏]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
