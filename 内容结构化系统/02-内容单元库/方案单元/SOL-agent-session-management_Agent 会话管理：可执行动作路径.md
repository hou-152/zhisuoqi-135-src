---
id: SOL-agent-session-management
type: 方案单元
title: "Agent 会话管理：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "Agent 会话管理"
  - "Agent Session Management"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：会话管理不只是开关聊天窗口，而是管理历史、工具输出、错误路径与后续任务是否仍应共享同一上下文。"
solution_summary: "检查当前目标、已加载历史、错误路径和未落盘状态是否仍服务于下一步。"
action_steps:
  - "检查当前目标、已加载历史、错误路径和未落盘状态是否仍服务于下一步。"
  - "按情况选择继续、回退、压缩、清空或分派，并记录选择理由与保留信息。"
  - "在切换后验证新会话能恢复必要状态，同时不再携带已判定无关的噪声。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-agent-session-management
    note: "本方案是「Agent 会话管理」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：会话管理不只是开关聊天窗口，而是管理历史、工具输出、错误路径与后续任务是否仍应共享同一上下文。

**动作路径（how_to，逐条照抄源数据）**
1. 检查当前目标、已加载历史、错误路径和未落盘状态是否仍服务于下一步。
2. 按情况选择继续、回退、压缩、清空或分派，并记录选择理由与保留信息。
3. 在切换后验证新会话能恢复必要状态，同时不再携带已判定无关的噪声。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-session-management.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-agent-session-management]] —— 本方案是「Agent 会话管理」的落地动作
- [[CON-agent-session-management_Agent 会话管理]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
