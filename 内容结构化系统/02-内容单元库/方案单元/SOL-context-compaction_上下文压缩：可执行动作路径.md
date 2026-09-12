---
id: SOL-context-compaction
type: 方案单元
title: "上下文压缩：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文压缩"
  - "Context Compaction"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：压缩不等于删除最旧消息；它要提炼当前仍重要的状态、决定与未决事项。"
solution_summary: "先以召回率为优先，确保架构决定、当前目标、未决问题、重要约束与下一步没有被漏掉。"
action_steps:
  - "先以召回率为优先，确保架构决定、当前目标、未决问题、重要约束与下一步没有被漏掉。"
  - "给摘要附上文件路径、记录 ID 或其他可恢复引用，让后续 Agent 能按需回到原证据。"
  - "用压缩前后的关键问题做回归检查，再逐步删除冗余工具输出以提高精确率。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-context-compaction
    note: "本方案是「上下文压缩」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：压缩不等于删除最旧消息；它要提炼当前仍重要的状态、决定与未决事项。

**动作路径（how_to，逐条照抄源数据）**
1. 先以召回率为优先，确保架构决定、当前目标、未决问题、重要约束与下一步没有被漏掉。
2. 给摘要附上文件路径、记录 ID 或其他可恢复引用，让后续 Agent 能按需回到原证据。
3. 用压缩前后的关键问题做回归检查，再逐步删除冗余工具输出以提高精确率。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-compaction.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-context-compaction]] —— 本方案是「上下文压缩」的落地动作
- [[CON-context-compaction_上下文压缩]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
