---
id: CON-tacit-knowledge
type: 概念单元
title: "隐性知识"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "隐性知识"
  - "Tacit Knowledge"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "尚未被外化的推理过程、权衡与默会前提；决策结果可能已记录，但这些决定为何成立仍只存在于人的经验中。"
concept_function: "解释「隐性知识」是什么、边界在哪；分类：信息平时放在哪里（现在就要懂）"
relationships:
  - type: 回应
    target: CON-context-engineering
    note: "原 kind=used-with｜Context Engineering 需要识别并外化任务所需的隐性推理与权衡，才能让其进入后续选择和装配流程。"
  - type: 冲突
    target: CON-context
    note: "原 kind=contrast｜隐性知识在未被外化、选择并提供给模型之前，还不是模型当前可见的 Context。"
---

## 核心内容

**定义（remember）**：尚未被外化的推理过程、权衡与默会前提；决策结果可能已记录，但这些决定为何成立仍只存在于人的经验中。

**费曼一下**：菜谱写了“煎到合适”，老师傅看颜色就知道，学徒却无从下手。隐性知识藏在判断依据和权衡里；只记录最后选了什么，无法教会下一个人为什么这样选。

**边界（明确不成立的用法）**
- 隐性知识不是所有未写文档的信息，重点是难以从结果本身恢复的判断依据与经验。
- 录制会议只产生可挖掘材料，不证明知识已被完整、准确地外化为 Agent 可用 Context。
- 当前证据缺口：需要更强证据比较会议提取、访谈与决策记录对隐性知识外化的保真度。

**迁移问题**：会议录像完整保存后，哪些步骤仍必须做，才能把其中的经验变成 Agent 可用而非仅可搜索的材料？

**分类问题**：哪些信息会被保留，任务进度又记在哪里？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tacit-knowledge.yaml`（name_en: Tacit Knowledge）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《上下文工程：AI 时代的核心能力》：这段以未被记录的推理、权衡和默会前提界定隐性知识，并指出它进入 Agent Context 所需的外化过程。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-context-engineering]] —— 原 kind=used-with｜Context Engineering 需要识别并外化任务所需的隐性推理与权衡，才能让其进入后续选择和装配流程。
- [冲突] [[CON-context]] —— 原 kind=contrast｜隐性知识在未被外化、选择并提供给模型之前，还不是模型当前可见的 Context。
- [[CON-context-engineering_上下文工程]]
- [[CON-context_上下文]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
