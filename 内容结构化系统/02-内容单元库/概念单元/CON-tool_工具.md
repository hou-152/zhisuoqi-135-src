---
id: CON-tool
type: 概念单元
title: "工具"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具"
  - "Tool"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Tool 是让 Agent 读取、计算或改变外部世界的结构化能力接口；模型提出调用，外层系统负责校验、执行并把结果送回来。"
concept_function: "解释「工具」是什么、边界在哪；分类：AI 如何接触外部世界（现在就要懂）"
relationships:
  - type: 冲突
    target: CON-model-context-protocol
    note: "原 kind=contrast｜Tool 是能力接口；MCP 是标准化接入协议。"
  - type: 冲突
    target: CON-skill
    note: "原 kind=contrast｜Tool 提供能力，Skill 组织完成工作的可复用方法。"
  - type: 回应
    target: CON-tool-scoping
    note: "原 kind=used-with（反向）｜工具收窄决定当前步骤暴露哪些 Tool。"
  - type: 回应
    target: CON-error-handling
    note: "原 kind=used-with（反向）｜Error Handling 规定 Tool 失败、空结果与不确定性后的收敛动作。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Tool 是 Agent Harness 暴露能力并执行动作的组成部分。"
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with｜Agent Loop 通过 Tool 调用行动，并把观察结果送回下一轮。"
  - type: 回应
    target: CON-progressive-disclosure
    note: "原 kind=used-with（反向）｜Progressive Disclosure 可延迟加载 Tool 定义，直到当前步骤真正需要。"
  - type: 回应
    target: CON-permission-boundary
    note: "原 kind=used-with（反向）｜Permission Boundary 在 Tool 执行前检查动作是否被允许。"
  - type: 回应
    target: CON-sandbox
    note: "原 kind=used-with（反向）｜Tool 在 Sandbox 中执行，以隔离副作用并捕获结果。"
  - type: 回应
    target: CON-context
    note: "原 kind=used-with｜Tool 定义与结果都会成为模型当前 Context 的一部分。"
  - type: 解释
    target: CON-agent-tool-contract
    note: "原 kind=part-of（反向）｜契约是 Agent 工具接口的一部分，规定模型意图与确定性执行如何衔接。"
  - type: 回应
    target: CON-agent-action-space
    note: "原 kind=used-with（反向）｜工具及其参数结构构成 Agent 行动空间的主要可调用原语。"
  - type: 回应
    target: CON-instruction-locality
    note: "原 kind=used-with（反向）｜来源用工具说明举例，要求把工具用法放在对应 tool description 中。"
  - type: 解释
    target: CON-code-execution
    note: "原 kind=part-of（反向）｜代码执行是 Harness 向 Agent 暴露的一类通用工具能力。"
---

## 核心内容

**定义（remember）**：Tool 是让 Agent 读取、计算或改变外部世界的结构化能力接口；模型提出调用，外层系统负责校验、执行并把结果送回来。

**费曼一下**：模型本身只能生成内容，Tool 像装在它身边的一只机械臂。模型可以按规定格式说“用这只手做什么”，但真正伸手、检查参数、执行动作和收回结果的是 Harness。有没有这只手，和模型知不知道该怎么用这只手，是两件事。

**边界（明确不成立的用法）**
- Tool Definition、Tool Call、Tool Execution 与 Tool Result 是连续但不同的环节；看到调用请求不等于动作已经执行成功。
- Tool 是具体能力接口，MCP 是连接一组外部能力的标准协议；二者不能互作同义词。
- Skill 主要沉淀“怎么做”的可复用方法，它可以指导调用 Tool，但不是 Tool 本身。
- 工具存在不保证 Agent 会选对工具、填对参数或获得权限；这些问题要分别检查。

**迁移问题**：当模型能准确描述如何读取文件，却始终拿不到文件内容时，你应该先检查模型知识，还是 Tool 的注册、权限与执行链？

**分类问题**：AI 靠什么读取、计算或改变外部世界？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool.yaml`（name_en: Tool）
- 源证据范围（卡片自述）：Akshay 对 Agent Harness 的拆解把工具称为 Agent 的“双手”：工具以名称、描述和参数类型暴露给模型，工具层负责注册、校验、参数提取、沙箱执行、结果捕获与观察格式化。该来源用于划清模型请求与外层执行的边界。
- 定义状态：industry-common｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-model-context-protocol]] —— 原 kind=contrast｜Tool 是能力接口；MCP 是标准化接入协议。
- [冲突] [[CON-skill]] —— 原 kind=contrast｜Tool 提供能力，Skill 组织完成工作的可复用方法。
- [回应] [[CON-tool-scoping]] —— 原 kind=used-with（反向）｜工具收窄决定当前步骤暴露哪些 Tool。
- [回应] [[CON-error-handling]] —— 原 kind=used-with（反向）｜Error Handling 规定 Tool 失败、空结果与不确定性后的收敛动作。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Tool 是 Agent Harness 暴露能力并执行动作的组成部分。
- [回应] [[CON-agent-loop]] —— 原 kind=used-with｜Agent Loop 通过 Tool 调用行动，并把观察结果送回下一轮。
- [回应] [[CON-progressive-disclosure]] —— 原 kind=used-with（反向）｜Progressive Disclosure 可延迟加载 Tool 定义，直到当前步骤真正需要。
- [回应] [[CON-permission-boundary]] —— 原 kind=used-with（反向）｜Permission Boundary 在 Tool 执行前检查动作是否被允许。
- [回应] [[CON-sandbox]] —— 原 kind=used-with（反向）｜Tool 在 Sandbox 中执行，以隔离副作用并捕获结果。
- [回应] [[CON-context]] —— 原 kind=used-with｜Tool 定义与结果都会成为模型当前 Context 的一部分。
- [解释] [[CON-agent-tool-contract]] —— 原 kind=part-of（反向）｜契约是 Agent 工具接口的一部分，规定模型意图与确定性执行如何衔接。
- [回应] [[CON-agent-action-space]] —— 原 kind=used-with（反向）｜工具及其参数结构构成 Agent 行动空间的主要可调用原语。
- [回应] [[CON-instruction-locality]] —— 原 kind=used-with（反向）｜来源用工具说明举例，要求把工具用法放在对应 tool description 中。
- [解释] [[CON-code-execution]] —— 原 kind=part-of（反向）｜代码执行是 Harness 向 Agent 暴露的一类通用工具能力。
- [[CON-model-context-protocol_模型上下文协议]]
- [[CON-skill_Agent Skill]]
- [[CON-tool-scoping_工具收窄]]
- [[CON-error-handling_错误处理]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-agent-loop_Agent 循环]]
- [[CON-progressive-disclosure_渐进式披露]]
- [[CON-permission-boundary_权限边界]]
- [[CON-sandbox_沙箱]]
- [[CON-context_上下文]]
- [[CON-agent-tool-contract_Agent 工具契约]]
- [[CON-agent-action-space_Agent 行动空间]]
- [[CON-instruction-locality_指令就近原则]]
- [[CON-code-execution_代码执行]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
