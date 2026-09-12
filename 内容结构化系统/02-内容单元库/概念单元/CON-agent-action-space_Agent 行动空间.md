---
id: CON-agent-action-space
type: 概念单元
title: "Agent 行动空间"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "Agent 行动空间"
  - "Agent Action Space"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Agent 在当前运行环境中可选择的动作集合，以及这些动作向模型呈现的名称、参数、反馈和组合方式。"
concept_function: "解释「Agent 行动空间」是什么、边界在哪；分类：AI 如何接触外部世界（需要时再学）"
relationships:
  - type: 回应
    target: CON-tool-scoping
    note: "原 kind=used-with｜工具收窄是在具体步骤中把行动空间限制到模型当前需要且能处理的范围。"
  - type: 回应
    target: CON-permission-boundary
    note: "原 kind=used-with｜可表达的动作还要经过权限边界，才能成为实际允许执行的动作。"
  - type: 回应
    target: CON-tool
    note: "原 kind=used-with｜工具及其参数结构构成 Agent 行动空间的主要可调用原语。"
---

## 核心内容

**定义（remember）**：Agent 在当前运行环境中可选择的动作集合，以及这些动作向模型呈现的名称、参数、反馈和组合方式。

**费曼一下**：行动空间像一套棋盘规则：不只看有几种棋子，还要看每颗棋子能走哪格、何时能走、走完会看到什么。选项过多但规则含糊，反而更难下对。

**边界（明确不成立的用法）**
- 行动空间不等于工具数量；同一工具的参数、调用时机和组合方式也会改变可行动边界。
- 更大的行动空间不必然更强，超出模型可理解范围的选择会增加混淆和风险。
- 当前证据缺口：当前证据未给出衡量行动空间复杂度或模型工具适配度的统一指标。

**迁移问题**：如果两个系统都暴露五个工具，但一个允许任意路径、另一个只允许项目目录，它们的行动空间为什么不同？

**分类问题**：AI 靠什么读取、计算或改变外部世界？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-action-space.yaml`（name_en: Agent Action Space）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》：原文把行动空间列为构建 Agent 的核心难题，并明确工具集合需要匹配模型能力而非越多越好。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-tool-scoping]] —— 原 kind=used-with｜工具收窄是在具体步骤中把行动空间限制到模型当前需要且能处理的范围。
- [回应] [[CON-permission-boundary]] —— 原 kind=used-with｜可表达的动作还要经过权限边界，才能成为实际允许执行的动作。
- [回应] [[CON-tool]] —— 原 kind=used-with｜工具及其参数结构构成 Agent 行动空间的主要可调用原语。
- [[CON-tool-scoping_工具收窄]]
- [[CON-permission-boundary_权限边界]]
- [[CON-tool_工具]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
