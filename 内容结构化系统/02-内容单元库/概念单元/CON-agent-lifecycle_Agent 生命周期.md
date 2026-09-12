---
id: CON-agent-lifecycle
type: 概念单元
title: "Agent 生命周期"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent 生命周期"
  - "Agent Lifecycle"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Agent 生命周期把一次运行组织成有边界的开工、运行、暂停／恢复与收尾，让每次状态转换都可检查、可交接。"
concept_function: "解释「Agent 生命周期」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 回应
    target: CON-agent-handoff
    note: "原 kind=used-with｜Handoff 是生命周期中改变责任主体的交接协议。"
  - type: 回应
    target: CON-state-management
    note: "原 kind=used-with｜Agent Lifecycle 通过进度文件记录开工、执行、验证与收尾位置。"
---

## 核心内容

**定义（remember）**：Agent 生命周期把一次运行组织成有边界的开工、运行、暂停／恢复与收尾，让每次状态转换都可检查、可交接。

**费曼一下**：把一次 Agent 运行想成一班值班。上岗先读规则、检查环境和接收交接；值班中执行、验证并记录状态；需要中断时留下可恢复位置；下岗前清理现场、登记未完成项并交给下一班。Lifecycle 管的是这些阶段怎样转换，不是 Agent 此刻具体写哪段内容。

**边界（明确不成立的用法）**
- Lifecycle 定义阶段、转换和交接责任，不等于 Agent Loop 的逐步推理与工具调用循环。
- 暂停不是结束，恢复也不是重新开始；二者需要可读状态、环境核对和明确所有权。
- Hook 是在生命周期事件上执行检查、通知或清理的一种实现方式，不是 Lifecycle 的同义词，也不能替代阶段设计。

**迁移问题**：一个 Agent 会持续调用工具，却每次重启都从头做起，它缺的是循环能力，还是可暂停、恢复和交接的 Lifecycle？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-lifecycle.yaml`（name_en: Agent Lifecycle）
- 源证据范围（卡片自述）：Harness 工程学习仓库把会话组织为开工、选择、执行、收尾的结构化生命周期，并要求状态持久化、验证和干净交接。本站将暂停／恢复显式加入主卡，以表达长任务会跨会话继续；Lifecycle Hook 只作为在阶段转换点触发确定性动作的实现手段，不独立成概念。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-agent-handoff]] —— 原 kind=used-with｜Handoff 是生命周期中改变责任主体的交接协议。
- [回应] [[CON-state-management]] —— 原 kind=used-with｜Agent Lifecycle 通过进度文件记录开工、执行、验证与收尾位置。
- [[CON-agent-handoff_Agent 交接]]
- [[CON-state-management_状态管理]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
