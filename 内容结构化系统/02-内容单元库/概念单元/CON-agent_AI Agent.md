---
id: CON-agent
type: 概念单元
title: "AI Agent"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "AI Agent"
  - "AI Agent"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "AI Agent 是围绕目标持续选择下一步、借助工具行动并根据结果继续推进的系统，不是裸模型的别名。"
concept_function: "解释「AI Agent」是什么、边界在哪；分类：AI 如何持续行动（现在就要懂）"
relationships:
  - type: 解释
    target: CON-large-language-model
    note: "原 kind=part-of（反向）｜模型提供推理与生成，Agent 还需要外部运行系统。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of（反向）｜来源提出 Agent = Model + Harness；本站在运行组成轴接纳该关系，同时保留 Agent 与 Agent Harness 不同义的行为视角。"
---

## 核心内容

**定义（remember）**：AI Agent 是围绕目标持续选择下一步、借助工具行动并根据结果继续推进的系统，不是裸模型的别名。

**费曼一下**：模型像负责想和说的部分，Agent 则像一个朝目标前进的行动者。它每走一步都会看当前结果，再决定下一步要回答、调用工具、修正方向还是停止。你看到的这种连续行为，通常由模型与外部 Harness 共同产生。

**边界（明确不成立的用法）**
- Agent 不等于 LLM；模型负责推理与生成，工具执行、状态维护、权限和循环来自外部系统。
- “能调用一次工具”是重要分界，但生产级 Agent 通常还需要错误处理、验证、停止条件与状态管理。
- Agent 与 Agent Harness 不是同义词；前者描述呈现出来的行动系统，后者强调产生和约束这种行为的运行机器。

**迁移问题**：一个聊天机器人只回答一次，而另一个系统会查资料、执行操作并根据结果继续，二者最关键的系统差别是什么？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent.yaml`（name_en: AI Agent）
- 源证据范围（卡片自述）：Simon Willison 给出最小组成视角：LLM、system prompt、工具与工具结果回灌循环可以构成基础 Agent。本站同时保留行为视角：用户感知到的是围绕目标持续行动的系统，而不是单独的模型对象。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-large-language-model]] —— 原 kind=part-of（反向）｜模型提供推理与生成，Agent 还需要外部运行系统。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of（反向）｜来源提出 Agent = Model + Harness；本站在运行组成轴接纳该关系，同时保留 Agent 与 Agent Harness 不同义的行为视角。
- [[CON-large-language-model_大语言模型]]
- [[CON-agent-harness_Agent Harness]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
