---
id: SOL-context
type: 方案单元
title: "上下文：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "上下文"
  - "Context"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Context 是当前可见的信息集合，不等于承载它的 Context Window；窗口更大也不保证所需信息已经进入或能被可靠使用。"
solution_summary: "排查回答错误时，先列出模型在出错那一轮实际看到了什么，不要用“系统里存着什么”替代这份清单。"
action_steps:
  - "排查回答错误时，先列出模型在出错那一轮实际看到了什么，不要用“系统里存着什么”替代这份清单。"
  - "分开检查缺失信息、无关噪声、冲突信息和过期信息，再决定取回、删除或更新哪些材料。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-context
    note: "本方案是「上下文」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Context 是当前可见的信息集合，不等于承载它的 Context Window；窗口更大也不保证所需信息已经进入或能被可靠使用。

**动作路径（how_to，逐条照抄源数据）**
1. 排查回答错误时，先列出模型在出错那一轮实际看到了什么，不要用“系统里存着什么”替代这份清单。
2. 分开检查缺失信息、无关噪声、冲突信息和过期信息，再决定取回、删除或更新哪些材料。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-context]] —— 本方案是「上下文」的落地动作
- [[CON-context_上下文]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
