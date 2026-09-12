---
id: CON-filesystem-workspace
type: 概念单元
title: "文件系统工作区"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "文件系统工作区"
  - "Filesystem Workspace"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "为 Agent 提供可读写的数据、代码与中间产物空间，使工作能够外置、跨会话延续，并为人和多个 Agent 提供共同协作面。"
concept_function: "解释「文件系统工作区」是什么、边界在哪；分类：信息平时放在哪里（现在就要懂）"
relationships:
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜文件系统工作区是 Harness 可提供的基础运行载体。"
  - type: 冲突
    target: CON-sandbox
    note: "原 kind=contrast｜文件系统工作区提供持久协作面，Sandbox 主要限制执行位置与影响范围。"
---

## 核心内容

**定义（remember）**：为 Agent 提供可读写的数据、代码与中间产物空间，使工作能够外置、跨会话延续，并为人和多个 Agent 提供共同协作面。

**费曼一下**：文件系统工作区像团队共用的工作台：草稿、代码和中间产物能留在桌上，下一班人可以接着做。但桌子本身不会决定该记什么，也不会自动把危险工具关进笼子。

**边界（明确不成立的用法）**
- 文件系统是稳定载体，不等于 Memory 或 State Management；后两者描述保存与恢复哪些信息的职责。
- 工作区可持久不等于安全隔离；Sandbox 还要限定执行环境和影响范围。
- 当前证据缺口：需补充无本地文件系统的远程 Agent 实现，以校准载体边界。

**迁移问题**：当多个 Agent 共用一个工作区时，怎样区分可共享事实、会话私有状态和需要隔离的执行产物？

**分类问题**：哪些信息会被保留，任务进度又记在哪里？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/filesystem-workspace.yaml`（name_en: Filesystem Workspace）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《LangChain 解剖 agent harness：Agent = 模型 + harness》：原文将文件系统明确列为基础 harness 原语，并给出工作区、卸载、持久状态与协作面的稳定职责。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜文件系统工作区是 Harness 可提供的基础运行载体。
- [冲突] [[CON-sandbox]] —— 原 kind=contrast｜文件系统工作区提供持久协作面，Sandbox 主要限制执行位置与影响范围。
- [[CON-agent-harness_Agent Harness]]
- [[CON-sandbox_沙箱]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
