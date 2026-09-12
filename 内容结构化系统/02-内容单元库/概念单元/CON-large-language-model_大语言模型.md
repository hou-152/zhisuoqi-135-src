---
id: CON-large-language-model
type: 概念单元
title: "大语言模型"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "大语言模型"
  - "Large Language Model"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "大语言模型负责根据当前输入生成后续内容；它本身不等于一个会持续行动的 Agent。"
concept_function: "解释「大语言模型」是什么、边界在哪；分类：眼前真正有什么（现在就要懂）"
relationships:
  - type: 解释
    target: CON-agent
    note: "原 kind=part-of｜模型提供推理与生成，Agent 还需要外部运行系统。"
  - type: 回应
    target: CON-reasoning-effort
    note: "原 kind=used-with（反向）｜推理强度控制一次模型运行中分配给推理过程的额外计算预算。"
---

## 核心内容

**定义（remember）**：大语言模型负责根据当前输入生成后续内容；它本身不等于一个会持续行动的 Agent。

**费曼一下**：把它想成一台读过大量文字的续写机。你递给它一段输入，它会根据训练中学到的规律，预测接下来更可能出现什么。它能写得像在理解，也能产出代码或工具调用请求，但真正保存状态、执行工具和循环工作的是模型外的软件系统。

**边界（明确不成立的用法）**
- “续写机”是帮助理解生成机制的比喻，不表示模型只会逐字机械复制，也不概括训练、推理与多模态能力的全部细节。
- 模型生成工具调用请求，不等于模型亲自执行了工具；执行、权限与结果回灌由外部软件负责。
- Claude、Codex 等产品的整体表现同时受模型、提示、工具、状态、权限和循环设计影响，不能全部归因为裸模型能力。

**迁移问题**：如果同一个模型换了一套工具和循环后突然能完成长任务，变化主要发生在模型本身，还是模型外的系统？

**分类问题**：模型此刻到底看见了什么，又能处理多少？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/large-language-model.yaml`（name_en: Large Language Model）
- 源证据范围（卡片自述）：Simon Willison 用“根据已有文本预测后续内容”的最小机制解释 coding agent 的模型底座；这个解释用于划清模型层与外部执行系统的边界，不是完整的模型百科定义。
- 定义状态：relatively-stable｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-agent]] —— 原 kind=part-of｜模型提供推理与生成，Agent 还需要外部运行系统。
- [回应] [[CON-reasoning-effort]] —— 原 kind=used-with（反向）｜推理强度控制一次模型运行中分配给推理过程的额外计算预算。
- [[CON-agent_AI Agent]]
- [[CON-reasoning-effort_推理强度]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
