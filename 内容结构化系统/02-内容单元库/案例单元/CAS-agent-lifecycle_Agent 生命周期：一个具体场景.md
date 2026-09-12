---
id: CAS-agent-lifecycle
type: 案例单元
title: "Agent 生命周期：一个具体场景"
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
case_subject: "Agent 生命周期"
case_summary: "Coding Agent 开工时运行环境检查并读取进度，执行中持续验证；临时暂停前保存当前状态，恢复后核对工作区，收尾时记录未完成项并留下干净的下一次入口。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Harness 工程学习仓库把会话组织为开工、选择、执行、收尾的结构化生命周期，并要求状态持久化、验证和干净交接。本站将暂停／恢复显式加入主卡，以表达长任务会跨会话继续；Lifecycle Hook 只作为在阶段转换点触发确定性动作的实现手段，不独立成概念。"
relationships:
  - type: 解释
    target: CON-agent-lifecycle
    note: "本案例用来说明「Agent 生命周期」"
---

## 核心内容

**场景（假设场景）**：Coding Agent 开工时运行环境检查并读取进度，执行中持续验证；临时暂停前保存当前状态，恢复后核对工作区，收尾时记录未完成项并留下干净的下一次入口。

**来源里的真实依据**：Harness 工程学习仓库把会话组织为开工、选择、执行、收尾的结构化生命周期，并要求状态持久化、验证和干净交接。本站将暂停／恢复显式加入主卡，以表达长任务会跨会话继续；Lifecycle Hook 只作为在阶段转换点触发确定性动作的实现手段，不独立成概念。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-lifecycle.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-agent-lifecycle]] —— 本案例用来说明「Agent 生命周期」
- [[CON-agent-lifecycle_Agent 生命周期]]

## 备注

不要把假设场景当真实复盘引用。
