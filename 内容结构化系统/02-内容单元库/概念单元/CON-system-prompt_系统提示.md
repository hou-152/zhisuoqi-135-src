---
id: CON-system-prompt
type: 概念单元
title: "系统提示"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "系统提示"
  - "System Prompt"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "System Prompt 是应用在系统层放入模型输入的高优先级约束，用来设定角色、边界和工具规则，但不是能绝对支配模型的意志。"
concept_function: "解释「系统提示」是什么、边界在哪；分类：人如何控制 AI（现在就要懂）"
relationships:
  - type: 冲突
    target: CON-prompt
    note: "原 kind=contrast（反向）｜Prompt 有广义与狭义用法；System Prompt 是系统层消息。"
  - type: 回应
    target: CON-model-context-protocol
    note: "原 kind=used-with（反向）｜MCP 接入暴露的工具列表与描述会进入 System Prompt，影响模型可见能力。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜System Prompt 是 Agent Harness 配置模型行为的组成部分。"
  - type: 解释
    target: CON-context
    note: "原 kind=part-of｜System Prompt 是模型生成响应前可见 Context 的组成之一。"
  - type: 回应
    target: CON-harness-token-floor
    note: "原 kind=used-with（反向）｜系统提示是 Harness Token 底座的固定组成之一。"
  - type: 回应
    target: CON-prompt-caching
    note: "原 kind=used-with（反向）｜稳定的系统提示通常构成高复用缓存前缀的一部分。"
  - type: 解释
    target: CON-system-prompt-altitude
    note: "原 kind=part-of（反向）｜抽象高度是设计系统提示时需要校准的一个属性。"
  - type: 回应
    target: CON-chat-template
    note: "原 kind=used-with（反向）｜系统提示通常作为特定角色消息被聊天模板纳入最终输入。"
  - type: 冲突
    target: CON-instruction-locality
    note: "原 kind=contrast（反向）｜工具专属说明应靠近工具，而不是在系统提示中重复；系统提示仍承担更通用的产品级语境。"
---

## 核心内容

**定义（remember）**：System Prompt 是应用在系统层放入模型输入的高优先级约束，用来设定角色、边界和工具规则，但不是能绝对支配模型的意志。

**费曼一下**：一次模型调用像把几层纸叠在一起交进去：系统层先规定工作身份和基本边界，工具层说明可用能力，历史与用户层再提供当前任务。系统层通常优先级更高，却仍只是模型要解释的输入；它可能与其他内容冲突，也不能替代外部权限检查和真实执行控制。

**边界（明确不成立的用法）**
- System Prompt 是输入层约束，不是模型权重、长期记忆或不可违抗的内部人格。
- 高优先级不等于绝对保证；冲突、提示注入、模型误解或实现差异仍可能导致偏离。
- 安全与授权不能只靠 System Prompt；高风险动作还需要工具权限、沙箱、护栏和人工确认。
- 不同模型 API 对 system、developer、user 等角色的支持与优先级并不完全相同，应以实际接口和运行日志为准。

**迁移问题**：如果系统提示写着“禁止删除文件”，但工具仍允许无确认删除，真正需要补强的是哪一层控制？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/system-prompt.yaml`（name_en: System Prompt）
- 源证据范围（卡片自述）：Simon Willison 将 system prompt 描述为 Agent 的隐形操作手册，可覆盖角色、任务边界、工具协议与安全约束；同时，来源明确说明模型只是请求工具，真实执行由 Harness 完成。不同 API 的消息角色与拼接优先级可能不同。
- 定义状态：industry-common｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-prompt]] —— 原 kind=contrast（反向）｜Prompt 有广义与狭义用法；System Prompt 是系统层消息。
- [回应] [[CON-model-context-protocol]] —— 原 kind=used-with（反向）｜MCP 接入暴露的工具列表与描述会进入 System Prompt，影响模型可见能力。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜System Prompt 是 Agent Harness 配置模型行为的组成部分。
- [解释] [[CON-context]] —— 原 kind=part-of｜System Prompt 是模型生成响应前可见 Context 的组成之一。
- [回应] [[CON-harness-token-floor]] —— 原 kind=used-with（反向）｜系统提示是 Harness Token 底座的固定组成之一。
- [回应] [[CON-prompt-caching]] —— 原 kind=used-with（反向）｜稳定的系统提示通常构成高复用缓存前缀的一部分。
- [解释] [[CON-system-prompt-altitude]] —— 原 kind=part-of（反向）｜抽象高度是设计系统提示时需要校准的一个属性。
- [回应] [[CON-chat-template]] —— 原 kind=used-with（反向）｜系统提示通常作为特定角色消息被聊天模板纳入最终输入。
- [冲突] [[CON-instruction-locality]] —— 原 kind=contrast（反向）｜工具专属说明应靠近工具，而不是在系统提示中重复；系统提示仍承担更通用的产品级语境。
- [[CON-prompt_提示]]
- [[CON-model-context-protocol_模型上下文协议]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-context_上下文]]
- [[CON-harness-token-floor_Harness Token 底座]]
- [[CON-prompt-caching_提示词缓存]]
- [[CON-system-prompt-altitude_系统提示抽象高度]]
- [[CON-chat-template_聊天模板]]
- [[CON-instruction-locality_指令就近原则]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
