---
id: SOL-model-context-protocol
type: 方案单元
title: "模型上下文协议：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "模型上下文协议"
  - "Model Context Protocol"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：MCP 是通信与接入协议，不是某个具体 Tool，也不保证已连接能力一定可用。"
solution_summary: "集成时分别验证 server 可连接、能力可发现、授权有效、当前会话实际可见，以及一次真实调用或读取能返回预期结果。"
action_steps:
  - "集成时分别验证 server 可连接、能力可发现、授权有效、当前会话实际可见，以及一次真实调用或读取能返回预期结果。"
  - "讨论 MCP 时说明具体客户端、server、协议能力类型与版本，避免把“支持 MCP”当作完整能力证明。"
  - "排错时先区分协议连接问题、能力实现问题、权限问题和 Agent 选择问题。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-model-context-protocol
    note: "本方案是「模型上下文协议」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：MCP 是通信与接入协议，不是某个具体 Tool，也不保证已连接能力一定可用。

**动作路径（how_to，逐条照抄源数据）**
1. 集成时分别验证 server 可连接、能力可发现、授权有效、当前会话实际可见，以及一次真实调用或读取能返回预期结果。
2. 讨论 MCP 时说明具体客户端、server、协议能力类型与版本，避免把“支持 MCP”当作完整能力证明。
3. 排错时先区分协议连接问题、能力实现问题、权限问题和 Agent 选择问题。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/model-context-protocol.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-model-context-protocol]] —— 本方案是「模型上下文协议」的落地动作
- [[CON-model-context-protocol_模型上下文协议]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
