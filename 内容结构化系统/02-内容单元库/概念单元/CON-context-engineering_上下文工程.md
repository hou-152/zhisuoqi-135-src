---
id: CON-context-engineering
type: 概念单元
title: "上下文工程"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文工程"
  - "Context Engineering"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "上下文工程是设计动态系统，在正确时机以合适格式选择、装配并更新模型所需的信息与工具描述。"
concept_function: "解释「上下文工程」是什么、边界在哪；分类：信息如何进入工作台（现在就要懂）"
relationships:
  - type: 冲突
    target: CON-prompt-engineering
    note: "原 kind=contrast（反向）｜一个主要设计指令，一个持续装配整轮信息。"
  - type: 解释
    target: CON-harness-engineering
    note: "原 kind=part-of｜本站工程范围轴采用 Harness Engineering 通常包住 Context Engineering。"
  - type: 回应
    target: CON-harness-engineering
    note: "原 kind=used-with（反向）｜Harness 管运行，并在运行时装配 Context。"
  - type: 解释
    target: CON-context-compaction
    note: "原 kind=part-of（反向）｜Context Compaction 是 Context Engineering 管理窗口内容的实践之一。"
  - type: 回应
    target: CON-context-window
    note: "原 kind=used-with｜Context Engineering 决定 Context Window 里放什么、怎样放与何时放。"
  - type: 解释
    target: CON-dynamic-context-assembly
    note: "原 kind=part-of（反向）｜Dynamic Context Assembly 是 Context Engineering 按任务即时生成输入的实践。"
  - type: 解释
    target: CON-just-in-time-retrieval
    note: "原 kind=part-of（反向）｜Just-in-Time Retrieval 是 Context Engineering 的生产策略之一。"
  - type: 回应
    target: CON-agent-elicitation
    note: "原 kind=used-with（反向）｜信息引出用于补齐会改变任务判断的缺失上下文。"
  - type: 回应
    target: CON-ubiquitous-language
    note: "原 kind=used-with（反向）｜把领域语言沉淀为可读取资产，可减少跨会话重复解释并改善上下文对齐。"
  - type: 回应
    target: CON-tacit-knowledge
    note: "原 kind=used-with（反向）｜Context Engineering 需要识别并外化任务所需的隐性推理与权衡，才能让其进入后续选择和装配流程。"
---

## 核心内容

**定义（remember）**：上下文工程是设计动态系统，在正确时机以合适格式选择、装配并更新模型所需的信息与工具描述。

**费曼一下**：它不像反复润色一张固定便条，更像每次开工前都重新布置工作台：从资料池里挑出这项任务真正需要的东西，整理成模型容易使用的形式，再送到它眼前。任务变了，工作台也随之变化。

**边界（明确不成立的用法）**
- 它不等于 Prompt Engineering；提示词工程主要处理指令怎样表达，上下文工程管理每轮整体信息怎样进入模型。
- Context 是被管理的对象，Context Engineering 是持续选择、装配、更新这一对象的工程实践。
- 工程范围轴上，本站采用 Harness Engineering 通常包住 Context Engineering；系统职责轴上，Context 侧主要管信息，Harness 侧主要管运行。两条轴不能混成单一包含关系。
- “提供完成任务所需的一切”不表示把所有可用资料一次性塞入窗口，也不保证模型输出必然正确。

**迁移问题**：同一条 Prompt 没变，只把过期长日志换成当前任务的日历摘要和工具说明，为什么结果可能显著改善？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-engineering.yaml`（name_en: Context Engineering）
- 源证据范围（卡片自述）：Philipp Schmid 把 Context Engineering 定义为设计并构建动态系统，在正确时间、以正确格式提供正确的信息与工具，让 LLM 拥有完成任务所需的一切；这一定义强调它是主模型调用前运行的系统，而不是一条静态字符串。
- 定义状态：industry-common｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-prompt-engineering]] —— 原 kind=contrast（反向）｜一个主要设计指令，一个持续装配整轮信息。
- [解释] [[CON-harness-engineering]] —— 原 kind=part-of｜本站工程范围轴采用 Harness Engineering 通常包住 Context Engineering。
- [回应] [[CON-harness-engineering]] —— 原 kind=used-with（反向）｜Harness 管运行，并在运行时装配 Context。
- [解释] [[CON-context-compaction]] —— 原 kind=part-of（反向）｜Context Compaction 是 Context Engineering 管理窗口内容的实践之一。
- [回应] [[CON-context-window]] —— 原 kind=used-with｜Context Engineering 决定 Context Window 里放什么、怎样放与何时放。
- [解释] [[CON-dynamic-context-assembly]] —— 原 kind=part-of（反向）｜Dynamic Context Assembly 是 Context Engineering 按任务即时生成输入的实践。
- [解释] [[CON-just-in-time-retrieval]] —— 原 kind=part-of（反向）｜Just-in-Time Retrieval 是 Context Engineering 的生产策略之一。
- [回应] [[CON-agent-elicitation]] —— 原 kind=used-with（反向）｜信息引出用于补齐会改变任务判断的缺失上下文。
- [回应] [[CON-ubiquitous-language]] —— 原 kind=used-with（反向）｜把领域语言沉淀为可读取资产，可减少跨会话重复解释并改善上下文对齐。
- [回应] [[CON-tacit-knowledge]] —— 原 kind=used-with（反向）｜Context Engineering 需要识别并外化任务所需的隐性推理与权衡，才能让其进入后续选择和装配流程。
- [[CON-prompt-engineering_提示词工程]]
- [[CON-harness-engineering_Harness 工程]]
- [[CON-context-compaction_上下文压缩]]
- [[CON-context-window_上下文窗口]]
- [[CON-dynamic-context-assembly_动态上下文装配]]
- [[CON-just-in-time-retrieval_即时检索]]
- [[CON-agent-elicitation_Agent 信息引出]]
- [[CON-ubiquitous-language_统一语言]]
- [[CON-tacit-knowledge_隐性知识]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
