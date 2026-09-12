---
id: CON-subagent-orchestration
type: 概念单元
title: "子 Agent 编排"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "子 Agent 编排"
  - "Subagent Orchestration"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "把边界明确的探索或执行任务分派给子 Agent，再将其压缩结果、证据或状态带回主流程的组织机制。"
concept_function: "解释「子 Agent 编排」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜子 Agent 的创建、调度和结果回传由外层执行系统组织。"
  - type: 回应
    target: CON-agent-handoff
    note: "原 kind=used-with｜把任务移交给专家 Agent 以及把结果带回主流程都需要交接合同。"
  - type: 回应
    target: CON-context-compaction
    note: "原 kind=used-with｜来源强调子 Agent 深度探索后返回压缩摘要，以降低主上下文负担。"
---

## 核心内容

**定义（remember）**：把边界明确的探索或执行任务分派给子 Agent，再将其压缩结果、证据或状态带回主流程的组织机制。

**费曼一下**：分工不只是多请两个人；每个人都要重新培训、配工具，最后主管还要把所有人的完整报告再读一遍。

**边界（明确不成立的用法）**
- 它不等同于只启动更多 Agent；编排还需定义任务边界、结果回传与主流程如何消费结果。
- 子 Agent 的并行或深度探索会增加协调成本，并可能在压缩回传时损失信息。
- 每个子 Agent 还可能复制独立启动底座，主流程摄入返回记录时会形成第二次上下文放大。
- 当前证据缺口：当前证据未比较单 Agent、并行子 Agent 与顺序移交的适用阈值和信息损耗。

**迁移问题**：当子任务之间共享大量背景且会修改同一文件时，并行编排仍值得吗；你会怎样估算协调成本？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/subagent-orchestration.yaml`（name_en: Subagent Orchestration）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Agent Harness 的本质：把模型放进可控的执行系统》：逐字列出子 Agent 的调用与移交模式，并说明把探索结果压缩回传以降低主上下文负担的机制价值；《Claude Code 在读提示词前为何已发送 3.3 万 Token》：这段补足子 Agent 编排的成本边界：每个 Worker 复制独立启动底座，Parent 还会再次摄入返回 Transcript。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜子 Agent 的创建、调度和结果回传由外层执行系统组织。
- [回应] [[CON-agent-handoff]] —— 原 kind=used-with｜把任务移交给专家 Agent 以及把结果带回主流程都需要交接合同。
- [回应] [[CON-context-compaction]] —— 原 kind=used-with｜来源强调子 Agent 深度探索后返回压缩摘要，以降低主上下文负担。
- [[CON-agent-harness_Agent Harness]]
- [[CON-agent-handoff_Agent 交接]]
- [[CON-context-compaction_上下文压缩]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
