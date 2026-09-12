---
id: CON-context
type: 概念单元
title: "上下文"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "上下文"
  - "Context"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "上下文是模型在当前一次推理中实际能看到并用来生成结果的信息、状态与工具描述。"
concept_function: "解释「上下文」是什么、边界在哪；分类：眼前真正有什么（现在就要懂）"
relationships:
  - type: 冲突
    target: CON-context-window
    note: "原 kind=contrast｜Context 是内容；窗口是承载与处理边界。"
  - type: 回应
    target: CON-agent-harness
    note: "原 kind=used-with（反向）｜Agent Harness 负责运行并在每轮装配 Context；前者是运行系统，后者是模型当前可见信息。"
  - type: 解释
    target: CON-system-prompt
    note: "原 kind=part-of（反向）｜System Prompt 是模型生成响应前可见 Context 的组成之一。"
  - type: 回应
    target: CON-tool
    note: "原 kind=used-with（反向）｜Tool 定义与结果都会成为模型当前 Context 的一部分。"
  - type: 回应
    target: CON-llm-statelessness
    note: "原 kind=used-with（反向）｜外部历史只有重新装配进当前 Context 后才对本次模型调用可见。"
  - type: 冲突
    target: CON-bounded-context
    note: "原 kind=contrast（反向）｜限界上下文规定领域语言的适用边界，LLM 上下文则是当前推理可获得的信息集合。"
  - type: 冲突
    target: CON-tacit-knowledge
    note: "原 kind=contrast（反向）｜隐性知识在未被外化、选择并提供给模型之前，还不是模型当前可见的 Context。"
  - type: 回应
    target: CON-repository-source-of-truth
    note: "原 kind=used-with（反向）｜仓库是真源入口，具体任务仍需从中选择并装配当前所需 Context。"
---

## 核心内容

**定义（remember）**：上下文是模型在当前一次推理中实际能看到并用来生成结果的信息、状态与工具描述。

**费曼一下**：把模型想成坐在桌前做事的人。桌上摊开的指令、对话、取回资料、工具说明和输出要求，才是它此刻能用的上下文；资料即使存进了柜子，没有被取出放到桌上，也不会自动影响这一轮回答。

**边界（明确不成立的用法）**
- Context 是当前可见的信息集合，不等于承载它的 Context Window；窗口更大也不保证所需信息已经进入或能被可靠使用。
- Memory 中已保存但未被取回的内容，不属于当前 Context；会话历史若已随本轮输入送入，则属于当前 Context。
- Tool 的名称、说明和参数 schema 可以进入 Context，但真实 Tool Execution 发生在模型外。
- 本卡采用 LLM 运行时语境，不声称覆盖普适计算与 HCI 对 Context 的全部广义定义。

**迁移问题**：一份正确资料已经存在知识库里，却没有被检索进本轮输入；它算当前 Context 吗？

**分类问题**：模型此刻到底看见了什么，又能处理多少？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context.yaml`（name_en: Context）
- 源证据范围（卡片自述）：Philipp Schmid 将 LLM 运行时的 Context 解释为模型生成响应前看到的一切，并列出系统提示、用户提示、历史、长期记忆取回结果、RAG 信息、工具定义与输出格式。本站主卡采用这一运行时口径；HCI 中更广义的情境定义仍作为另一观察框架保留。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-context-window]] —— 原 kind=contrast｜Context 是内容；窗口是承载与处理边界。
- [回应] [[CON-agent-harness]] —— 原 kind=used-with（反向）｜Agent Harness 负责运行并在每轮装配 Context；前者是运行系统，后者是模型当前可见信息。
- [解释] [[CON-system-prompt]] —— 原 kind=part-of（反向）｜System Prompt 是模型生成响应前可见 Context 的组成之一。
- [回应] [[CON-tool]] —— 原 kind=used-with（反向）｜Tool 定义与结果都会成为模型当前 Context 的一部分。
- [回应] [[CON-llm-statelessness]] —— 原 kind=used-with（反向）｜外部历史只有重新装配进当前 Context 后才对本次模型调用可见。
- [冲突] [[CON-bounded-context]] —— 原 kind=contrast（反向）｜限界上下文规定领域语言的适用边界，LLM 上下文则是当前推理可获得的信息集合。
- [冲突] [[CON-tacit-knowledge]] —— 原 kind=contrast（反向）｜隐性知识在未被外化、选择并提供给模型之前，还不是模型当前可见的 Context。
- [回应] [[CON-repository-source-of-truth]] —— 原 kind=used-with（反向）｜仓库是真源入口，具体任务仍需从中选择并装配当前所需 Context。
- [[CON-context-window_上下文窗口]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-system-prompt_系统提示]]
- [[CON-tool_工具]]
- [[CON-llm-statelessness_LLM 无状态性]]
- [[CON-bounded-context_限界上下文]]
- [[CON-tacit-knowledge_隐性知识]]
- [[CON-repository-source-of-truth_仓库事实真源]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
