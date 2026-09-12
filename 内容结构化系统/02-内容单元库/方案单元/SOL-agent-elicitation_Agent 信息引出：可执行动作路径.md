---
id: SOL-agent-elicitation
type: 方案单元
title: "Agent 信息引出：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent 信息引出"
  - "Agent Elicitation"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：信息引出不是无条件多问；只有缺失信息会改变答案、风险或下一步时才值得打断用户。"
solution_summary: "在行动前列出会改变答案、风险或权限的未知量。"
action_steps:
  - "在行动前列出会改变答案、风险或权限的未知量。"
  - "优先询问影响最大的一个缺口，并提供容易选择的回答格式和默认含义。"
  - "把答案写回原任务状态，确认新信息已解除阻塞，再继续执行。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-elicitation
    note: "本方案是「Agent 信息引出」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：信息引出不是无条件多问；只有缺失信息会改变答案、风险或下一步时才值得打断用户。

**动作路径（how_to，逐条照抄源数据）**
1. 在行动前列出会改变答案、风险或权限的未知量。
2. 优先询问影响最大的一个缺口，并提供容易选择的回答格式和默认含义。
3. 把答案写回原任务状态，确认新信息已解除阻塞，再继续执行。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-elicitation.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-elicitation]] —— 本方案是「Agent 信息引出」的落地动作
- [[CON-agent-elicitation_Agent 信息引出]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
