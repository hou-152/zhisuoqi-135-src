---
id: CON-event-driven-agent-automation
type: 概念单元
title: "事件驱动的 Agent 自动化"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "事件驱动的 Agent 自动化"
  - "Event-Driven Agent Automation"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "由新事件进入系统自动触发 Agent 工作流，使其立即处理新增上下文并执行预设动作的运行机制。"
concept_function: "解释「事件驱动的 Agent 自动化」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with｜事件负责触发运行，Agent 循环负责在触发后持续观察、行动与更新状态。"
  - type: 回应
    target: CON-dynamic-context-assembly
    note: "原 kind=used-with｜新事件进入时通常需要围绕该事件装配当次运行所需上下文。"
---

## 核心内容

**定义（remember）**：由新事件进入系统自动触发 Agent 工作流，使其立即处理新增上下文并执行预设动作的运行机制。

**费曼一下**：不用等人有空来处理，事情一发生就自动开跑。新问题一进来，系统立刻去归类、去查重、去补充关联信息，甚至直接动手。把"人来了才处理"变成"事一来就处理"，等待时间被压到接近零。

**边界（明确不成立的用法）**
- 事件触发只决定何时启动，不自动保证后续动作正确、幂等或安全。
- 它不同于持续轮询，也不同于由人手动发起一次 Agent 会话。
- 当前证据缺口：当前证据未覆盖重复事件、失败重试和副作用控制。

**迁移问题**：当事件频繁更新同一对象时，系统应每次立即启动、合并窗口还是取消重跑；依据是什么？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/event-driven-agent-automation.yaml`（name_en: Event-Driven Agent Automation）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《产品开发的下一阶段由上下文与行动能力驱动》：逐字说明由新事件触发 Agent 工作流并立即精炼、综合或行动的机制。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-agent-loop]] —— 原 kind=used-with｜事件负责触发运行，Agent 循环负责在触发后持续观察、行动与更新状态。
- [回应] [[CON-dynamic-context-assembly]] —— 原 kind=used-with｜新事件进入时通常需要围绕该事件装配当次运行所需上下文。
- [[CON-agent-loop_Agent 循环]]
- [[CON-dynamic-context-assembly_动态上下文装配]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
