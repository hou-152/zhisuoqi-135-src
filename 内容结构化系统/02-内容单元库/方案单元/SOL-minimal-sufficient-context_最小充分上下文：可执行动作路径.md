---
id: SOL-minimal-sufficient-context
type: 方案单元
title: "最小充分上下文：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "最小充分上下文"
  - "Minimal Sufficient Context"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：“最小”不等于字符最少、摘要最短或固定 token 配额；任何缺失后会破坏任务的关键信息都不该被删。"
solution_summary: "先写出完成当前决策必需的证据、约束、工具说明和输出要求，再删除无法说明用途的材料。"
action_steps:
  - "先写出完成当前决策必需的证据、约束、工具说明和输出要求，再删除无法说明用途的材料。"
  - "用缺失测试检查充分性：拿掉某项后是否会让任务不可解、容易误判或无法验证。"
  - "为稍后可能需要的资料保留可回取引用，不必把全部原文常驻当前窗口。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-minimal-sufficient-context
    note: "本方案是「最小充分上下文」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：“最小”不等于字符最少、摘要最短或固定 token 配额；任何缺失后会破坏任务的关键信息都不该被删。

**动作路径（how_to，逐条照抄源数据）**
1. 先写出完成当前决策必需的证据、约束、工具说明和输出要求，再删除无法说明用途的材料。
2. 用缺失测试检查充分性：拿掉某项后是否会让任务不可解、容易误判或无法验证。
3. 为稍后可能需要的资料保留可回取引用，不必把全部原文常驻当前窗口。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/minimal-sufficient-context.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-minimal-sufficient-context]] —— 本方案是「最小充分上下文」的落地动作
- [[CON-minimal-sufficient-context_最小充分上下文]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
