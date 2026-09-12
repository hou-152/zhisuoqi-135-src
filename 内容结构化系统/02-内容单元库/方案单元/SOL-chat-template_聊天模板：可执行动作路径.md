---
id: SOL-chat-template
type: 方案单元
title: "聊天模板：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "聊天模板"
  - "Chat Template"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：聊天模板制造连续对话的输入格式，不会让无状态模型本身获得持久状态。"
solution_summary: "核对目标模型要求的角色标记、起止符和生成提示位置。"
action_steps:
  - "核对目标模型要求的角色标记、起止符和生成提示位置。"
  - "用最短的系统、用户、助手三轮样本渲染模板，检查最终输入字节与角色顺序。"
  - "加入长历史和工具消息做回归，确认模板只负责格式，不承担持久存储。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-chat-template
    note: "本方案是「聊天模板」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：聊天模板制造连续对话的输入格式，不会让无状态模型本身获得持久状态。

**动作路径（how_to，逐条照抄源数据）**
1. 核对目标模型要求的角色标记、起止符和生成提示位置。
2. 用最短的系统、用户、助手三轮样本渲染模板，检查最终输入字节与角色顺序。
3. 加入长历史和工具消息做回归，确认模板只负责格式，不承担持久存储。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/chat-template.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-chat-template]] —— 本方案是「聊天模板」的落地动作
- [[CON-chat-template_聊天模板]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
