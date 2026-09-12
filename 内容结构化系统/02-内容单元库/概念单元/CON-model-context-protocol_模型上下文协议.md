---
id: CON-model-context-protocol
type: 概念单元
title: "模型上下文协议"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "模型上下文协议"
  - "Model Context Protocol"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "MCP 是让 AI 应用以标准方式连接外部能力的协议；这些能力不只包括工具，也包括资源和提示。"
concept_function: "解释「模型上下文协议」是什么、边界在哪；分类：AI 如何接触外部世界（需要时再学）"
relationships:
  - type: 冲突
    target: CON-tool
    note: "原 kind=contrast（反向）｜Tool 是能力接口；MCP 是标准化接入协议。"
  - type: 回应
    target: CON-system-prompt
    note: "原 kind=used-with｜MCP 接入暴露的工具列表与描述会进入 System Prompt，影响模型可见能力。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜MCP 是 Agent Harness 接入外部工具与服务的组成部分。"
  - type: 回应
    target: CON-tool-scoping
    note: "原 kind=used-with（反向）｜Tool Scoping 可关闭当前不用的 MCP 工具面，减少误选与 Context 占用。"
  - type: 回应
    target: CON-persistent-code-graph
    note: "原 kind=used-with（反向）｜来源通过 MCP 工具把图谱查询能力暴露给 Claude。"
---

## 核心内容

**定义（remember）**：MCP 是让 AI 应用以标准方式连接外部能力的协议；这些能力不只包括工具，也包括资源和提示。

**费曼一下**：把 AI 应用想成一台设备，把外部能力想成不同厂商提供的配件。MCP 像统一的插接与通信规范：应用不用为每个配件重新发明接法，就能发现并使用工具、读取资源或取得提示内容；能力本身仍在协议两端，协议不替它们做事。

**边界（明确不成立的用法）**
- MCP 是通信与接入协议，不是某个具体 Tool，也不保证已连接能力一定可用。
- MCP 的范围不只等于工具调用；资源与提示也是当前项目采用口径中的独立能力类型。
- 连接成功不等于能力已经投影到当前 Agent 会话；还要检查客户端、server、授权、会话工具面与运行策略。
- MCP 不负责 Agent 是否选对能力、是否遵守权限或是否正确理解返回内容。

**迁移问题**：一个 MCP server 探测成功，但 Agent 当前会话里看不到对应能力，这证明协议坏了，还是还需要检查会话投影与权限？

**分类问题**：AI 靠什么读取、计算或改变外部世界？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/model-context-protocol.yaml`（name_en: Model Context Protocol）
- 源证据范围（卡片自述）：当前项目证据把 MCP 作为外部能力标准化接入 Harness 的方式，并用它区分框架内置工具与外部能力；本站据项目已有证据保留 tools、resources、prompts 三类协议能力，避免把 MCP 窄化为工具调用。官网协议边界由正式 sources 登记校准，具体版本能力以届时登记的官方规范为准。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-tool]] —— 原 kind=contrast（反向）｜Tool 是能力接口；MCP 是标准化接入协议。
- [回应] [[CON-system-prompt]] —— 原 kind=used-with｜MCP 接入暴露的工具列表与描述会进入 System Prompt，影响模型可见能力。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜MCP 是 Agent Harness 接入外部工具与服务的组成部分。
- [回应] [[CON-tool-scoping]] —— 原 kind=used-with（反向）｜Tool Scoping 可关闭当前不用的 MCP 工具面，减少误选与 Context 占用。
- [回应] [[CON-persistent-code-graph]] —— 原 kind=used-with（反向）｜来源通过 MCP 工具把图谱查询能力暴露给 Claude。
- [[CON-tool_工具]]
- [[CON-system-prompt_系统提示]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-tool-scoping_工具收窄]]
- [[CON-persistent-code-graph_持久化代码图谱]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
