---
id: CON-bounded-context
type: 概念单元
title: "限界上下文"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "限界上下文"
  - "Bounded Context"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "一个领域模型和统一语言保持同一含义的明确适用范围；跨出该范围后，相同术语、实体或规则可以采用另一套定义。"
concept_function: "解释「限界上下文」是什么、边界在哪；分类：信息如何进入工作台（需要时再学）"
relationships:
  - type: 冲突
    target: CON-context
    note: "原 kind=contrast｜限界上下文规定领域语言的适用边界，LLM 上下文则是当前推理可获得的信息集合。"
  - type: 回应
    target: CON-ubiquitous-language
    note: "原 kind=used-with（反向）｜统一语言只有在声明的领域边界内才能保持稳定含义。"
---

## 核心内容

**定义（remember）**：一个领域模型和统一语言保持同一含义的明确适用范围；跨出该范围后，相同术语、实体或规则可以采用另一套定义。

**费曼一下**：同一个“订单”，销售团队关心承诺了什么，履约团队关心包裹走到哪；词没变，规则和对象已经换了房间。限界上下文就是给每套含义画门牌，过门时再明确翻译。

**边界（明确不成立的用法）**
- 它来自领域驱动设计，不等于 LLM 的 Context 或 Context Window。
- 仓库目录可以承载边界，但目录结构本身不会自动形成清晰的领域边界。
- 「限界上下文」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。

**迁移问题**：当两个团队都使用“账户”一词时，你会依据哪些业务规则判断它们应共享一个模型，还是需要两个限界上下文？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/bounded-context.yaml`（name_en: Bounded Context）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《从 /grill-me 到 /grill-with-docs：用对话先对齐领域语言》：原文明确把 bounded context 定义为应用中使用同一套语言的一块范围，并说明大型仓库可存在多个边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-context]] —— 原 kind=contrast｜限界上下文规定领域语言的适用边界，LLM 上下文则是当前推理可获得的信息集合。
- [回应] [[CON-ubiquitous-language]] —— 原 kind=used-with（反向）｜统一语言只有在声明的领域边界内才能保持稳定含义。
- [[CON-context_上下文]]
- [[CON-ubiquitous-language_统一语言]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
