---
id: CON-prompt
type: 概念单元
title: "提示"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "提示"
  - "Prompt"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Prompt 是一次递交给模型的输入；日常语境常指用户提示，技术语境也可能指模型实际接收的完整输入。"
concept_function: "解释「提示」是什么、边界在哪；分类：人如何控制 AI（现在就要懂）"
relationships:
  - type: 冲突
    target: CON-system-prompt
    note: "原 kind=contrast｜Prompt 有广义与狭义用法；System Prompt 是系统层消息。"
  - type: 回应
    target: CON-chat-template
    note: "原 kind=used-with（反向）｜聊天模板把角色化消息序列化为模型实际接收的 Prompt 格式。"
---

## 核心内容

**定义（remember）**：Prompt 是一次递交给模型的输入；日常语境常指用户提示，技术语境也可能指模型实际接收的完整输入。

**费曼一下**：把 Prompt 想成你递进模型入口的一张输入纸。狭义时，这张纸是你本轮写给模型的话；广义时，它是系统把系统消息、工具说明、历史和用户消息编排后，真正交给模型的整份输入。听到“改 Prompt”时，要先确认说的是哪一层。

**边界（明确不成立的用法）**
- 本站同时标明狭义“用户提示”和广义“完整模型输入”两种常见口径，不把其中一种静默冒充唯一行业定义。
- Prompt 是输入对象；Prompt Engineering 是设计、组织和测试输入的实践。
- System Prompt 是完整输入中的系统层约束，不与用户当前输入等同。

**迁移问题**：当你只改了聊天框里的一句话，却发现模型仍受另一套规则约束时，应该检查 Prompt 的哪种口径？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt.yaml`（name_en: Prompt）
- 源证据范围（卡片自述）：Simon Willison 把 prompt 与 completion 作为模型交互的基本单位，并指出聊天、工具调用和系统提示会被外部软件编排成更复杂的模型输入。不同产品与文献对 Prompt 的范围并不完全一致。
- 定义状态：industry-common｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-system-prompt]] —— 原 kind=contrast｜Prompt 有广义与狭义用法；System Prompt 是系统层消息。
- [回应] [[CON-chat-template]] —— 原 kind=used-with（反向）｜聊天模板把角色化消息序列化为模型实际接收的 Prompt 格式。
- [[CON-system-prompt_系统提示]]
- [[CON-chat-template_聊天模板]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
