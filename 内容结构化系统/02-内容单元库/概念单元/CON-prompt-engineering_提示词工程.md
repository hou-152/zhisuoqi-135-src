---
id: CON-prompt-engineering
type: 概念单元
title: "提示词工程"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "提示词工程"
  - "Prompt Engineering"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "提示词工程是设计、组织和测试模型指令，让当前任务更容易被正确理解和完成的实践。"
concept_function: "解释「提示词工程」是什么、边界在哪；分类：人如何控制 AI（现在就要懂）"
relationships:
  - type: 冲突
    target: CON-context-engineering
    note: "原 kind=contrast｜一个主要设计指令，一个持续装配整轮信息。"
---

## 核心内容

**定义（remember）**：提示词工程是设计、组织和测试模型指令，让当前任务更容易被正确理解和完成的实践。

**费曼一下**：如果 Prompt 是递给模型的一张输入纸，提示词工程就是动手整理这张纸：把目标说清楚，补上必要条件，安排示例和输出要求，再用实际结果检验措辞是否有效。它主要解决“怎么说”，不独自负责长期记忆、工具执行和整个运行系统。

**边界（明确不成立的用法）**
- 提示词工程不等于 Context Engineering；前者主要处理指令表达，后者管理模型在每轮能看到的整体信息。
- 它也不等于 Harness Engineering；工具执行、状态、权限、错误处理和生命周期属于更外层的运行系统。
- 好措辞能提高期望结果的概率，但不能保证模型每次正确，也不能替代验证。

**迁移问题**：如果模型已经听懂要求，却因为缺少最新资料而答错，继续改措辞还是改 Context，哪个更对症？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt-engineering.yaml`（name_en: Prompt Engineering）
- 源证据范围（卡片自述）：Anthropic 将 prompt engineering 描述为编写与组织指令的离散任务，并把它与每轮持续策展整体信息状态的 context engineering 区分。其文章称后者为自然演进，而不是宣布前者被淘汰。
- 定义状态：industry-common｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-context-engineering]] —— 原 kind=contrast｜一个主要设计指令，一个持续装配整轮信息。
- [[CON-context-engineering_上下文工程]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
