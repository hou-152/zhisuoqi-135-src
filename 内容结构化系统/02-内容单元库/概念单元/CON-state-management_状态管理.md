---
id: CON-state-management
type: 概念单元
title: "状态管理"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "状态管理"
  - "State Management"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "状态管理负责记录任务当前阶段、变量、进度与恢复点，让系统知道做到哪里，并能追踪、暂停、恢复或回溯。"
concept_function: "解释「状态管理」是什么、边界在哪；分类：信息平时放在哪里（需要时再学）"
relationships:
  - type: 冲突
    target: CON-memory
    note: "原 kind=contrast（反向）｜常可按知识历史与执行位置区分，但内容与介质可能重叠。"
  - type: 解释
    target: CON-durable-execution
    note: "原 kind=prerequisite｜可持久化状态是耐久执行的必要条件之一。"
  - type: 回应
    target: CON-agent-lifecycle
    note: "原 kind=used-with（反向）｜Agent Lifecycle 通过进度文件记录开工、执行、验证与收尾位置。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜State Management 是 Agent Harness 保存进度与恢复点的组成部分。"
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with｜State Management 保存 Agent Loop 每一步决策、结果与恢复位置。"
  - type: 解释
    target: CON-agent-handoff
    note: "原 kind=prerequisite｜State Management 为 Agent Handoff 提供可读、可追加的进度与下一步。"
  - type: 回应
    target: CON-llm-statelessness
    note: "原 kind=used-with（反向）｜长任务的连续执行依赖外部状态管理记录并恢复当前进度。"
  - type: 回应
    target: CON-repository-source-of-truth
    note: "原 kind=used-with（反向）｜版本化仓库为进度、任务范围和交接状态提供可持续读取的载体。"
---

## 核心内容

**定义（remember）**：状态管理负责记录任务当前阶段、变量、进度与恢复点，让系统知道做到哪里，并能追踪、暂停、恢复或回溯。

**费曼一下**：把任务想成一列沿轨道运行的小车。状态管理不只是保存一份文件，而是持续记录小车停在哪一段、车上有哪些变量、哪些步骤已经完成，以及从哪个保存点可以继续。没有这些记录，中断后系统只知道“做过事”，却不知道该从哪里接上。

**边界（明确不成立的用法）**
- State 是任务当前可描述的执行事实；State Management 是记录、更新、持久化和恢复这些事实的实践。
- Checkpoint 只是保存某个恢复点的机制之一；有 checkpoint 不代表变量完整、恢复正确或外部副作用安全。
- State Management 常偏向当前执行位置与恢复点，Memory 常偏向过去保存的知识与经历；但两者可共用文件、数据库，也会在待办、进度和依赖上重叠。

**迁移问题**：如果进程重启后知道用户说过什么，却不知道前三步是否已经执行，缺的是 Memory，还是可恢复的执行 State？

**分类问题**：哪些信息会被保留，任务进度又记在哪里？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/state-management.yaml`（name_en: State Management）
- 源证据范围（卡片自述）：Akshay 的 Harness 拆解把状态描述为流经节点的结构化数据，并列出 checkpoint、会话、提交和进度文件等恢复与追踪策略。本站把这些视为状态管理的不同实现，不把 checkpoint 与 State Management 当作同义词。
- 定义状态：industry-common｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-memory]] —— 原 kind=contrast（反向）｜常可按知识历史与执行位置区分，但内容与介质可能重叠。
- [解释] [[CON-durable-execution]] —— 原 kind=prerequisite｜可持久化状态是耐久执行的必要条件之一。
- [回应] [[CON-agent-lifecycle]] —— 原 kind=used-with（反向）｜Agent Lifecycle 通过进度文件记录开工、执行、验证与收尾位置。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜State Management 是 Agent Harness 保存进度与恢复点的组成部分。
- [回应] [[CON-agent-loop]] —— 原 kind=used-with｜State Management 保存 Agent Loop 每一步决策、结果与恢复位置。
- [解释] [[CON-agent-handoff]] —— 原 kind=prerequisite｜State Management 为 Agent Handoff 提供可读、可追加的进度与下一步。
- [回应] [[CON-llm-statelessness]] —— 原 kind=used-with（反向）｜长任务的连续执行依赖外部状态管理记录并恢复当前进度。
- [回应] [[CON-repository-source-of-truth]] —— 原 kind=used-with（反向）｜版本化仓库为进度、任务范围和交接状态提供可持续读取的载体。
- [[CON-memory_记忆]]
- [[CON-durable-execution_持久化执行]]
- [[CON-agent-lifecycle_Agent 生命周期]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-agent-loop_Agent 循环]]
- [[CON-agent-handoff_Agent 交接]]
- [[CON-llm-statelessness_LLM 无状态性]]
- [[CON-repository-source-of-truth_仓库事实真源]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
