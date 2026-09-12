---
id: SOL-human-escalation-tool-call
type: 方案单元
title: "人类升级工具调用：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "人类升级工具调用"
  - "Human Escalation Tool Call"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不是把人当作无条件执行器；调用应包含清晰问题、必要证据和权限范围。"
solution_summary: "明确哪些风险、金额或责任判断必须升级给人，并把它们编码成可触发条件。"
action_steps:
  - "明确哪些风险、金额或责任判断必须升级给人，并把它们编码成可触发条件。"
  - "请求中只放决策问题、必要证据、可选项和不回应的后果，避免让人重新调查全案。"
  - "保存等待状态和关联任务，收到答复后从断点继续，并把决定写入回执。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-human-escalation-tool-call
    note: "本方案是「人类升级工具调用」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不是把人当作无条件执行器；调用应包含清晰问题、必要证据和权限范围。

**动作路径（how_to，逐条照抄源数据）**
1. 明确哪些风险、金额或责任判断必须升级给人，并把它们编码成可触发条件。
2. 请求中只放决策问题、必要证据、可选项和不回应的后果，避免让人重新调查全案。
3. 保存等待状态和关联任务，收到答复后从断点继续，并把决定写入回执。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/human-escalation-tool-call.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-human-escalation-tool-call]] —— 本方案是「人类升级工具调用」的落地动作
- [[CON-human-escalation-tool-call_人类升级工具调用]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
