---
id: SOL-system-prompt
type: 方案单元
title: "系统提示：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "系统提示"
  - "System Prompt"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：System Prompt 是输入层约束，不是模型权重、长期记忆或不可违抗的内部人格。"
solution_summary: "在系统层写稳定的角色、边界、工具规则和成功标准，避免塞入容易过时的长篇资料。"
action_steps:
  - "在系统层写稳定的角色、边界、工具规则和成功标准，避免塞入容易过时的长篇资料。"
  - "让约束足够具体以指导行为，又保留模型处理例外的空间；不要把脆弱的复杂 if-else 全写进提示。"
  - "用真实运行记录测试冲突与越权情形，并把关键权限落实在模型外的执行层。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-system-prompt
    note: "本方案是「系统提示」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：System Prompt 是输入层约束，不是模型权重、长期记忆或不可违抗的内部人格。

**动作路径（how_to，逐条照抄源数据）**
1. 在系统层写稳定的角色、边界、工具规则和成功标准，避免塞入容易过时的长篇资料。
2. 让约束足够具体以指导行为，又保留模型处理例外的空间；不要把脆弱的复杂 if-else 全写进提示。
3. 用真实运行记录测试冲突与越权情形，并把关键权限落实在模型外的执行层。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/system-prompt.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-system-prompt]] —— 本方案是「系统提示」的落地动作
- [[CON-system-prompt_系统提示]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
