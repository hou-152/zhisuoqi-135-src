---
id: CON-agent-session-management
type: 概念单元
title: "Agent 会话管理"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "Agent 会话管理"
  - "Agent Session Management"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "围绕任务边界和上下文质量，决定何时继续、回退、压缩、清空或分派当前 Agent 会话的治理实践。"
concept_function: "解释「Agent 会话管理」是什么、边界在哪；分类：信息如何进入工作台（需要时再学）"
relationships:
  - type: 回应
    target: CON-context-window
    note: "原 kind=used-with｜会话管理决定上下文窗口内哪些历史继续保留、被压缩或被丢弃。"
  - type: 回应
    target: CON-context-rot
    note: "原 kind=used-with｜会话越长越容易积累噪音，Context Rot 是需要主动治理会话的主要原因之一。"
  - type: 回应
    target: CON-context-compaction
    note: "原 kind=used-with｜压缩是长会话减重的一个选择，但需要按下一阶段目标决定保留内容。"
---

## 核心内容

**定义（remember）**：围绕任务边界和上下文质量，决定何时继续、回退、压缩、清空或分派当前 Agent 会话的治理实践。

**费曼一下**：Session Management 不是“开几个聊天窗口”的小技巧，而是 Claude Code 的上下文治理能力。每一个 session 都是一段带着历史、工具输出、文件读取和错误路径的工作记忆。你要决定什么时候继续沿用它，什么时候回退它，什么时候压缩它，什么时候清空它，什么时候把子任务外包给 subagent。1M context 只是把窗口变大；session management 才决定窗口里放什么、丢什么、什么时候换一个干净窗口。

**边界（明确不成立的用法）**
- 会话管理不只是开关聊天窗口，而是管理历史、工具输出、错误路径与后续任务是否仍应共享同一上下文。
- 更大的上下文窗口只推迟容量上限，不会自动消除噪音、错误路径和上下文腐烂。
- 当前证据缺口：当前证据聚焦 Claude Code 命令，需要跨 Agent 产品核对可迁移的会话操作与状态语义。

**迁移问题**：当一个会话掌握关键背景却积累了错误假设时，怎样决定回退、压缩还是重开，而不是只看剩余窗口大小？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-session-management.yaml`（name_en: Agent Session Management）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Claude Code 的 1M Context 让会话管理变成核心技能》：逐字定义会话管理为在继续、回退、压缩、清空与子 Agent 之间管理上下文的能力。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-context-window]] —— 原 kind=used-with｜会话管理决定上下文窗口内哪些历史继续保留、被压缩或被丢弃。
- [回应] [[CON-context-rot]] —— 原 kind=used-with｜会话越长越容易积累噪音，Context Rot 是需要主动治理会话的主要原因之一。
- [回应] [[CON-context-compaction]] —— 原 kind=used-with｜压缩是长会话减重的一个选择，但需要按下一阶段目标决定保留内容。
- [[CON-context-window_上下文窗口]]
- [[CON-context-rot_上下文腐烂]]
- [[CON-context-compaction_上下文压缩]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
