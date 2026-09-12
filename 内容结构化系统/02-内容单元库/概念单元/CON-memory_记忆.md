---
id: CON-memory
type: 概念单元
title: "记忆"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "记忆"
  - "Memory"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Memory 是为跨步骤、跨窗口或跨会话保持连续性而保存、并可在需要时取回的信息；保存过不等于当前看得见，也不等于仍然正确。"
concept_function: "解释「记忆」是什么、边界在哪；分类：信息平时放在哪里（现在就要懂）"
relationships:
  - type: 冲突
    target: CON-state-management
    note: "原 kind=contrast｜常可按知识历史与执行位置区分，但内容与介质可能重叠。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Memory 是 Agent Harness 管理跨步骤与跨会话信息的组成部分。"
  - type: 回应
    target: CON-context-compaction
    note: "原 kind=used-with（反向）｜Context Compaction 与外部 Memory 配合，缩短窗口而保留可恢复原文。"
  - type: 回应
    target: CON-context-selection
    note: "原 kind=used-with（反向）｜Context Selection 从 Memory 等候选信息中选择当前步骤真正需要的内容。"
  - type: 回应
    target: CON-progressive-disclosure
    note: "原 kind=used-with｜Memory 可用路由文档与主题文件按 Progressive Disclosure 分层加载。"
  - type: 回应
    target: CON-context-window
    note: "原 kind=used-with｜Memory 把进度写出 Context Window，并在后续需要时重新取回。"
  - type: 冲突
    target: CON-llm-statelessness
    note: "原 kind=contrast（反向）｜模型调用本身无状态，Memory 是外部保存并可按需取回的信息层。"
  - type: 冲突
    target: CON-persistent-code-graph
    note: "原 kind=contrast（反向）｜持久化代码图谱保存可查询的代码结构关系，Memory 是更广义的跨步骤或跨会话信息层。"
---

## 核心内容

**定义（remember）**：Memory 是为跨步骤、跨窗口或跨会话保持连续性而保存、并可在需要时取回的信息；保存过不等于当前看得见，也不等于仍然正确。

**费曼一下**：Memory 像工作室外的档案柜。你可以把过去的事实、经验和笔记存进去，但模型这一次真正能用到什么，取决于系统有没有把相关档案取回当前工作台。取回的内容仍要核对，因为旧记录可能已经过时。

**边界（明确不成立的用法）**
- Memory 被存储在外部，不代表它已进入当前 Context；只有取回并装配后，模型本轮才可见。
- 记忆是历史线索，不自动等于当前事实；行动前仍应核对真实状态与来源时效。
- Memory 常偏向保存知识与经历，State Management 常偏向追踪当前执行位置与恢复点；但待办、进度、依赖、文件和数据库都可能同时承载两类内容，不能只按介质或字段名硬分。

**迁移问题**：一个 Agent 说“我记得上次的配置”，但今天执行仍失败，你应先核对记忆是否被取回、是否过时，还是任务状态是否丢失？

**分类问题**：哪些信息会被保留，任务进度又记在哪里？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/memory.yaml`（name_en: Memory）
- 源证据范围（卡片自述）：Anthropic 以结构化记事说明 agentic memory：Agent 把笔记写到上下文窗口之外的持久存储，之后再按需拉回窗口。来源中的待办、进度和依赖也可能承担执行状态职责，因此本站不把 Memory 与 State Management 写成互斥类别。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-state-management]] —— 原 kind=contrast｜常可按知识历史与执行位置区分，但内容与介质可能重叠。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Memory 是 Agent Harness 管理跨步骤与跨会话信息的组成部分。
- [回应] [[CON-context-compaction]] —— 原 kind=used-with（反向）｜Context Compaction 与外部 Memory 配合，缩短窗口而保留可恢复原文。
- [回应] [[CON-context-selection]] —— 原 kind=used-with（反向）｜Context Selection 从 Memory 等候选信息中选择当前步骤真正需要的内容。
- [回应] [[CON-progressive-disclosure]] —— 原 kind=used-with｜Memory 可用路由文档与主题文件按 Progressive Disclosure 分层加载。
- [回应] [[CON-context-window]] —— 原 kind=used-with｜Memory 把进度写出 Context Window，并在后续需要时重新取回。
- [冲突] [[CON-llm-statelessness]] —— 原 kind=contrast（反向）｜模型调用本身无状态，Memory 是外部保存并可按需取回的信息层。
- [冲突] [[CON-persistent-code-graph]] —— 原 kind=contrast（反向）｜持久化代码图谱保存可查询的代码结构关系，Memory 是更广义的跨步骤或跨会话信息层。
- [[CON-state-management_状态管理]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-context-compaction_上下文压缩]]
- [[CON-context-selection_上下文选择]]
- [[CON-progressive-disclosure_渐进式披露]]
- [[CON-context-window_上下文窗口]]
- [[CON-llm-statelessness_LLM 无状态性]]
- [[CON-persistent-code-graph_持久化代码图谱]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
