---
id: CON-ubiquitous-language
type: 概念单元
title: "统一语言"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "统一语言"
  - "Ubiquitous Language"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "在一个领域范围内，由领域专家、开发者、代码、文档与 AI 共同使用并持续校准的词汇体系，使同一个词稳定指向同一个业务对象或规则。"
concept_function: "解释「统一语言」是什么、边界在哪；分类：信息如何进入工作台（现在就要懂）"
relationships:
  - type: 回应
    target: CON-bounded-context
    note: "原 kind=used-with｜统一语言只有在声明的领域边界内才能保持稳定含义。"
  - type: 回应
    target: CON-context-engineering
    note: "原 kind=used-with｜把领域语言沉淀为可读取资产，可减少跨会话重复解释并改善上下文对齐。"
---

## 核心内容

**定义（remember）**：在一个领域范围内，由领域专家、开发者、代码、文档与 AI 共同使用并持续校准的词汇体系，使同一个词稳定指向同一个业务对象或规则。

**费曼一下**：团队像在合写一本会运行的词典：会议里说“会员”，代码、表格和规则里也必须指向同一对象。词义一漂，系统就会把语言分歧执行成业务错误。

**边界（明确不成立的用法）**
- 它不是全局通用词典；同一词在不同限界上下文中可以有不同含义。
- 它不要求一次性达到完美，而要让命名、代码和讨论中的差异可被发现并更新。
- 「统一语言」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。

**迁移问题**：当市场团队和风控团队必须保留不同的“有效客户”定义时，怎样维护统一语言而不强行统一词义？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/ubiquitous-language.yaml`（name_en: Ubiquitous Language）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《从 /grill-me 到 /grill-with-docs：用对话先对齐领域语言》：原文给出统一语言在领域专家、开发者、代码与 AI 之间保持同一术语含义的定义与用途。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-bounded-context]] —— 原 kind=used-with｜统一语言只有在声明的领域边界内才能保持稳定含义。
- [回应] [[CON-context-engineering]] —— 原 kind=used-with｜把领域语言沉淀为可读取资产，可减少跨会话重复解释并改善上下文对齐。
- [[CON-bounded-context_限界上下文]]
- [[CON-context-engineering_上下文工程]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
