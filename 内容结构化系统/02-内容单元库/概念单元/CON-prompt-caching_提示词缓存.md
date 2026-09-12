---
id: CON-prompt-caching
type: 概念单元
title: "提示词缓存"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "提示词缓存"
  - "Prompt Caching"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "复用多次模型请求中未变化输入前缀的已处理计算，以降低重复输入的成本和首字延迟的机制。"
concept_function: "解释「提示词缓存」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 冲突
    target: CON-context-compaction
    note: "原 kind=contrast｜Prompt Caching 复用稳定前缀的计算，Context Compaction 缩短历史表示；短而频繁变化的摘要仍可能破坏缓存。"
  - type: 回应
    target: CON-observability
    note: "原 kind=used-with｜缓存收益需要通过读写 Token、命中率和首字延迟等运行指标持续观测。"
  - type: 回应
    target: CON-system-prompt
    note: "原 kind=used-with｜稳定的系统提示通常构成高复用缓存前缀的一部分。"
---

## 核心内容

**定义（remember）**：复用多次模型请求中未变化输入前缀的已处理计算，以降低重复输入的成本和首字延迟的机制。

**费曼一下**：提示词缓存就是让模型别每轮都重新处理那段已经处理过、又几乎没变的输入前缀。它省下的不是回答本身，而是重复阅读同一大段上下文的计算成本。

**边界（明确不成立的用法）**
- 缓存的是稳定输入前缀的处理结果，不是上一轮答案，也不是按语义相似检索整段对话。
- 首次写入可能更贵，收益取决于后续复用次数、前缀稳定性、模型门槛与缓存有效期。
- 当前证据缺口：需要按当前各模型提供方文档核对缓存匹配粒度、计价与失效规则。

**迁移问题**：某段历史语义完全相同但序列化顺序变化时，为什么缓存仍可能失效；应在哪一层稳定它？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt-caching.yaml`（name_en: Prompt Caching）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《提示词缓存不是小优化，而是 agent 成本结构的关键变量》：逐字定义提示词缓存复用稳定输入前缀的计算结果，并把它放在长对话与 Agent 的成本结构中。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-context-compaction]] —— 原 kind=contrast｜Prompt Caching 复用稳定前缀的计算，Context Compaction 缩短历史表示；短而频繁变化的摘要仍可能破坏缓存。
- [回应] [[CON-observability]] —— 原 kind=used-with｜缓存收益需要通过读写 Token、命中率和首字延迟等运行指标持续观测。
- [回应] [[CON-system-prompt]] —— 原 kind=used-with｜稳定的系统提示通常构成高复用缓存前缀的一部分。
- [[CON-context-compaction_上下文压缩]]
- [[CON-observability_可观测性]]
- [[CON-system-prompt_系统提示]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
