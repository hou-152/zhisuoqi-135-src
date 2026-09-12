---
id: CON-agent-loop
type: 概念单元
title: "Agent 循环"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent 循环"
  - "Agent Loop"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Agent Loop 是模型选择下一步、Harness 执行工具、观察结果回到模型，再重复或退出的运行循环。"
concept_function: "解释「Agent 循环」是什么、边界在哪；分类：AI 如何持续行动（现在就要懂）"
relationships:
  - type: 回应
    target: CON-verification-loop
    note: "原 kind=used-with｜行动循环产生结果，验证循环用外部证据决定修正或退出。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Agent Harness 负责组织模型、工具与观察之间的运行循环。"
  - type: 回应
    target: CON-context-compaction
    note: "原 kind=used-with（反向）｜Agent Loop 更新 Context 时可触发 Context Compaction，再继续下一轮。"
  - type: 回应
    target: CON-durable-execution
    note: "原 kind=used-with（反向）｜Durable Execution 把 Agent Loop 的每次模型与工具调用变成可独立重试步骤。"
  - type: 回应
    target: CON-error-handling
    note: "原 kind=used-with（反向）｜Error Handling 把失败转成 Agent Loop 下一轮可利用的反馈。"
  - type: 回应
    target: CON-skill
    note: "原 kind=used-with（反向）｜Agent Loop 调用经过测试的 Skill，形成可复用、可复利的工作流。"
  - type: 回应
    target: CON-state-management
    note: "原 kind=used-with（反向）｜State Management 保存 Agent Loop 每一步决策、结果与恢复位置。"
  - type: 回应
    target: CON-tool
    note: "原 kind=used-with（反向）｜Agent Loop 通过 Tool 调用行动，并把观察结果送回下一轮。"
  - type: 回应
    target: CON-agent-elicitation
    note: "原 kind=used-with（反向）｜提问工具可阻塞当前循环，等待用户回答后再恢复下一轮决策。"
  - type: 回应
    target: CON-agent-stop-conditions
    note: "原 kind=used-with（反向）｜持续循环需要显式终止、转交或重规划边界，不能只依赖模型主观判断。"
  - type: 回应
    target: CON-event-driven-agent-automation
    note: "原 kind=used-with（反向）｜事件负责触发运行，Agent 循环负责在触发后持续观察、行动与更新状态。"
---

## 核心内容

**定义（remember）**：Agent Loop 是模型选择下一步、Harness 执行工具、观察结果回到模型，再重复或退出的运行循环。

**费曼一下**：模型先看当前信息并选择下一步。如果它请求工具，外部系统就执行工具，把结果作为新观察交还模型；模型根据这个新结果决定继续、换一种做法，或给出最终答案。循环的关键不是绕圈，而是每次观察都会影响下一步，并且有明确的退出条件。

**边界（明确不成立的用法）**
- Agent Loop 只描述单个 Agent 内部“选择—执行—观察—再选择”的行动心跳，不等于外层持续工作流、多 Agent 编排或 Loop Engineering。
- 模型生成工具调用请求，不是模型亲自执行工具；执行和结果封装由 Harness 完成。
- 退出不能只依赖模型随口说“完成”；真实系统还应有最大回合、预算、无进展、权限拒绝与用户中断等边界。
- 循环持续运行不等于任务已经正确完成，仍需独立验证结果。

**迁移问题**：一个系统反复调用工具，却从不把结果送回模型，这还构成完整的 Agent Loop 吗？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-loop.yaml`（name_en: Agent Loop）
- 源证据范围（卡片自述）：Simon Willison 说明 coding agent 的实际工作方式是模型提出下一步、Harness 执行工具、结果重新进入上下文，模型再决定回答、继续调用工具或调整方案。本站补充生产边界：循环还要受停止条件、预算和用户中断约束。
- 定义状态：industry-common｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-verification-loop]] —— 原 kind=used-with｜行动循环产生结果，验证循环用外部证据决定修正或退出。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Agent Harness 负责组织模型、工具与观察之间的运行循环。
- [回应] [[CON-context-compaction]] —— 原 kind=used-with（反向）｜Agent Loop 更新 Context 时可触发 Context Compaction，再继续下一轮。
- [回应] [[CON-durable-execution]] —— 原 kind=used-with（反向）｜Durable Execution 把 Agent Loop 的每次模型与工具调用变成可独立重试步骤。
- [回应] [[CON-error-handling]] —— 原 kind=used-with（反向）｜Error Handling 把失败转成 Agent Loop 下一轮可利用的反馈。
- [回应] [[CON-skill]] —— 原 kind=used-with（反向）｜Agent Loop 调用经过测试的 Skill，形成可复用、可复利的工作流。
- [回应] [[CON-state-management]] —— 原 kind=used-with（反向）｜State Management 保存 Agent Loop 每一步决策、结果与恢复位置。
- [回应] [[CON-tool]] —— 原 kind=used-with（反向）｜Agent Loop 通过 Tool 调用行动，并把观察结果送回下一轮。
- [回应] [[CON-agent-elicitation]] —— 原 kind=used-with（反向）｜提问工具可阻塞当前循环，等待用户回答后再恢复下一轮决策。
- [回应] [[CON-agent-stop-conditions]] —— 原 kind=used-with（反向）｜持续循环需要显式终止、转交或重规划边界，不能只依赖模型主观判断。
- [回应] [[CON-event-driven-agent-automation]] —— 原 kind=used-with（反向）｜事件负责触发运行，Agent 循环负责在触发后持续观察、行动与更新状态。
- [[CON-verification-loop_验证循环]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-context-compaction_上下文压缩]]
- [[CON-durable-execution_持久化执行]]
- [[CON-error-handling_错误处理]]
- [[CON-skill_Agent Skill]]
- [[CON-state-management_状态管理]]
- [[CON-tool_工具]]
- [[CON-agent-elicitation_Agent 信息引出]]
- [[CON-agent-stop-conditions_Agent 终止条件]]
- [[CON-event-driven-agent-automation_事件驱动的 Agent 自动化]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
