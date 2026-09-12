---
id: CON-agent-harness
type: 概念单元
title: "Agent Harness"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent Harness"
  - "Agent Harness"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Agent Harness 是包裹模型、组织循环并落实工具、状态、权限和错误处理的模型外运行系统；它让模型能够持续且受控地行动。"
concept_function: "解释「Agent Harness」是什么、边界在哪；分类：AI 如何持续行动（现在就要懂）"
relationships:
  - type: 解释
    target: CON-agent-handoff
    note: "原 kind=part-of（反向）｜Agent Handoff 是 Agent Harness 编排控制权与上下文交接的组成部分。"
  - type: 回应
    target: CON-context
    note: "原 kind=used-with｜Agent Harness 负责运行并在每轮装配 Context；前者是运行系统，后者是模型当前可见信息。"
  - type: 解释
    target: CON-agent-loop
    note: "原 kind=part-of（反向）｜Agent Harness 负责组织模型、工具与观察之间的运行循环。"
  - type: 解释
    target: CON-context-compaction
    note: "原 kind=part-of（反向）｜Context Compaction 是 Agent Harness 管理长会话的中间件。"
  - type: 解释
    target: CON-error-handling
    note: "原 kind=part-of（反向）｜Error Handling 是 Agent Harness 控制失败路径的组成部分。"
  - type: 解释
    target: CON-agent
    note: "原 kind=part-of｜来源提出 Agent = Model + Harness；本站在运行组成轴接纳该关系，同时保留 Agent 与 Agent Harness 不同义的行为视角。"
  - type: 解释
    target: CON-durable-execution
    note: "原 kind=part-of（反向）｜Durable Execution 是 Agent Harness 提供可靠重试与恢复的组成部分。"
  - type: 解释
    target: CON-guardrails
    note: "原 kind=part-of（反向）｜Guardrails 是 Agent Harness 约束输入、输出与行动路径的组成部分。"
  - type: 解释
    target: CON-memory
    note: "原 kind=part-of（反向）｜Memory 是 Agent Harness 管理跨步骤与跨会话信息的组成部分。"
  - type: 解释
    target: CON-model-context-protocol
    note: "原 kind=part-of（反向）｜MCP 是 Agent Harness 接入外部工具与服务的组成部分。"
  - type: 解释
    target: CON-observability
    note: "原 kind=part-of（反向）｜Observability 是 Agent Harness 留下可查询运行证据的组成部分。"
  - type: 解释
    target: CON-permission-boundary
    note: "原 kind=part-of（反向）｜Permission Boundary 是 Agent Harness 控制可执行动作范围的组成部分。"
  - type: 解释
    target: CON-sandbox
    note: "原 kind=part-of（反向）｜Sandbox 是 Agent Harness 隔离执行环境的组成部分。"
  - type: 解释
    target: CON-skill
    note: "原 kind=part-of（反向）｜Skill 是 Agent Harness 按需提供方法与能力的组成部分。"
  - type: 解释
    target: CON-state-management
    note: "原 kind=part-of（反向）｜State Management 是 Agent Harness 保存进度与恢复点的组成部分。"
  - type: 解释
    target: CON-system-prompt
    note: "原 kind=part-of（反向）｜System Prompt 是 Agent Harness 配置模型行为的组成部分。"
  - type: 解释
    target: CON-tool
    note: "原 kind=part-of（反向）｜Tool 是 Agent Harness 暴露能力并执行动作的组成部分。"
  - type: 解释
    target: CON-verification-loop
    note: "原 kind=part-of（反向）｜Verification Loop 是 Agent Harness 检查结果并回灌反馈的组成部分。"
  - type: 解释
    target: CON-tool-workflow-fit
    note: "原 kind=part-of（反向）｜工具说明与任务工作流的适配属于 Harness 对模型行为的运行约束。"
  - type: 回应
    target: CON-harness-token-floor
    note: "原 kind=used-with（反向）｜Token 底座由 Agent Harness 随每次模型请求附带的静态运行信息产生，但它是负担指标而非 Harness 组件。"
  - type: 解释
    target: CON-subagent-orchestration
    note: "原 kind=part-of（反向）｜子 Agent 的创建、调度和结果回传由外层执行系统组织。"
  - type: 回应
    target: CON-harness-compute-separation
    note: "原 kind=used-with（反向）｜该模式把 Harness 保留在控制侧，避免与模型生成代码的执行环境混成同一信任域。"
  - type: 回应
    target: CON-agent-cli-runtime
    note: "原 kind=used-with（反向）｜CLI runtime 可作为 Harness 暴露 Agent 工作流执行能力的一种入口，但不承担 Harness 的全部职责。"
  - type: 解释
    target: CON-filesystem-workspace
    note: "原 kind=part-of（反向）｜文件系统工作区是 Harness 可提供的基础运行载体。"
---

## 核心内容

**定义（remember）**：Agent Harness 是包裹模型、组织循环并落实工具、状态、权限和错误处理的模型外运行系统；它让模型能够持续且受控地行动。

**费曼一下**：模型像只负责判断下一步的核心，Harness 像围在外面的运行机器。它把任务和当前状态送给模型，执行模型请求的工具，把观察结果送回去，并在每一步检查权限、错误与停止条件。用户看到的是 Agent 在行动，背后让动作真正发生并受到约束的是 Harness。

**边界（明确不成立的用法）**
- Agent Harness 不等于模型；模型负责生成判断或工具请求，Harness 负责执行、回灌、状态与控制。
- Agent Harness 也不等于用户感知到的 Agent；本站用 Agent 描述围绕目标持续行动的系统表现，用 Harness 描述产生并治理这种表现的运行机器。
- “模型外一切”是便于划界的广义口径；工程实践中也有只把循环、工具分发与状态处理称为 Harness 的薄口径，讨论时要先声明范围。
- Harness 会与 Context Engineering 交叉，因为它必须在运行时装配信息；但 Context 负责“模型看到什么”，Harness 负责“系统怎样持续、受控地运行”，不能静默压成一条轴。

**迁移问题**：如果模型完全没变，只因换了工具执行、状态和验证机制就能完成长任务，能力提升主要发生在哪一层？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-harness.yaml`（name_en: Agent Harness）
- 源证据范围（卡片自述）：Akshay 将 Harness 描述为包裹 LLM 的完整软件基础设施，并用循环、工具、记忆、上下文管理、状态持久化、错误处理和护栏说明其广义范围。本站采用“模型外运行系统”作为主口径，同时承认不同团队会把 Harness 说得更广或更薄。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-agent-handoff]] —— 原 kind=part-of（反向）｜Agent Handoff 是 Agent Harness 编排控制权与上下文交接的组成部分。
- [回应] [[CON-context]] —— 原 kind=used-with｜Agent Harness 负责运行并在每轮装配 Context；前者是运行系统，后者是模型当前可见信息。
- [解释] [[CON-agent-loop]] —— 原 kind=part-of（反向）｜Agent Harness 负责组织模型、工具与观察之间的运行循环。
- [解释] [[CON-context-compaction]] —— 原 kind=part-of（反向）｜Context Compaction 是 Agent Harness 管理长会话的中间件。
- [解释] [[CON-error-handling]] —— 原 kind=part-of（反向）｜Error Handling 是 Agent Harness 控制失败路径的组成部分。
- [解释] [[CON-agent]] —— 原 kind=part-of｜来源提出 Agent = Model + Harness；本站在运行组成轴接纳该关系，同时保留 Agent 与 Agent Harness 不同义的行为视角。
- [解释] [[CON-durable-execution]] —— 原 kind=part-of（反向）｜Durable Execution 是 Agent Harness 提供可靠重试与恢复的组成部分。
- [解释] [[CON-guardrails]] —— 原 kind=part-of（反向）｜Guardrails 是 Agent Harness 约束输入、输出与行动路径的组成部分。
- [解释] [[CON-memory]] —— 原 kind=part-of（反向）｜Memory 是 Agent Harness 管理跨步骤与跨会话信息的组成部分。
- [解释] [[CON-model-context-protocol]] —— 原 kind=part-of（反向）｜MCP 是 Agent Harness 接入外部工具与服务的组成部分。
- [解释] [[CON-observability]] —— 原 kind=part-of（反向）｜Observability 是 Agent Harness 留下可查询运行证据的组成部分。
- [解释] [[CON-permission-boundary]] —— 原 kind=part-of（反向）｜Permission Boundary 是 Agent Harness 控制可执行动作范围的组成部分。
- [解释] [[CON-sandbox]] —— 原 kind=part-of（反向）｜Sandbox 是 Agent Harness 隔离执行环境的组成部分。
- [解释] [[CON-skill]] —— 原 kind=part-of（反向）｜Skill 是 Agent Harness 按需提供方法与能力的组成部分。
- [解释] [[CON-state-management]] —— 原 kind=part-of（反向）｜State Management 是 Agent Harness 保存进度与恢复点的组成部分。
- [解释] [[CON-system-prompt]] —— 原 kind=part-of（反向）｜System Prompt 是 Agent Harness 配置模型行为的组成部分。
- [解释] [[CON-tool]] —— 原 kind=part-of（反向）｜Tool 是 Agent Harness 暴露能力并执行动作的组成部分。
- [解释] [[CON-verification-loop]] —— 原 kind=part-of（反向）｜Verification Loop 是 Agent Harness 检查结果并回灌反馈的组成部分。
- [解释] [[CON-tool-workflow-fit]] —— 原 kind=part-of（反向）｜工具说明与任务工作流的适配属于 Harness 对模型行为的运行约束。
- [回应] [[CON-harness-token-floor]] —— 原 kind=used-with（反向）｜Token 底座由 Agent Harness 随每次模型请求附带的静态运行信息产生，但它是负担指标而非 Harness 组件。
- [解释] [[CON-subagent-orchestration]] —— 原 kind=part-of（反向）｜子 Agent 的创建、调度和结果回传由外层执行系统组织。
- [回应] [[CON-harness-compute-separation]] —— 原 kind=used-with（反向）｜该模式把 Harness 保留在控制侧，避免与模型生成代码的执行环境混成同一信任域。
- [回应] [[CON-agent-cli-runtime]] —— 原 kind=used-with（反向）｜CLI runtime 可作为 Harness 暴露 Agent 工作流执行能力的一种入口，但不承担 Harness 的全部职责。
- [解释] [[CON-filesystem-workspace]] —— 原 kind=part-of（反向）｜文件系统工作区是 Harness 可提供的基础运行载体。
- [[CON-agent-handoff_Agent 交接]]
- [[CON-context_上下文]]
- [[CON-agent-loop_Agent 循环]]
- [[CON-context-compaction_上下文压缩]]
- [[CON-error-handling_错误处理]]
- [[CON-agent_AI Agent]]
- [[CON-durable-execution_持久化执行]]
- [[CON-guardrails_护栏]]
- [[CON-memory_记忆]]
- [[CON-model-context-protocol_模型上下文协议]]
- [[CON-observability_可观测性]]
- [[CON-permission-boundary_权限边界]]
- [[CON-sandbox_沙箱]]
- [[CON-skill_Agent Skill]]
- [[CON-state-management_状态管理]]
- [[CON-system-prompt_系统提示]]
- [[CON-tool_工具]]
- [[CON-verification-loop_验证循环]]
- [[CON-tool-workflow-fit_工具—工作流适配]]
- [[CON-harness-token-floor_Harness Token 底座]]
- [[CON-subagent-orchestration_子 Agent 编排]]
- [[CON-harness-compute-separation_Harness 与计算分离]]
- [[CON-agent-cli-runtime_Agent CLI 运行时]]
- [[CON-filesystem-workspace_文件系统工作区]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
