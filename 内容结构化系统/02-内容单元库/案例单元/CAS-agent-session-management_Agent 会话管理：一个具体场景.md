---
id: CAS-agent-session-management
type: 案例单元
title: "Agent 会话管理：一个具体场景"
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
case_subject: "Agent 会话管理"
case_summary: "假设一次修复会话已经读入错误分支、长日志和多次失败尝试；新需求与原问题只有一个文件相关，团队必须决定继续、压缩还是另开会话。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Claude Code 的 1M Context 让会话管理变成核心技能》：逐字定义会话管理为在继续、回退、压缩、清空与子 Agent 之间管理上下文的能力。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-agent-session-management
    note: "本案例用来说明「Agent 会话管理」"
---

## 核心内容

**场景（假设场景）**：假设一次修复会话已经读入错误分支、长日志和多次失败尝试；新需求与原问题只有一个文件相关，团队必须决定继续、压缩还是另开会话。

**来源里的真实依据**：本卡只采用以下来源范围：《Claude Code 的 1M Context 让会话管理变成核心技能》：逐字定义会话管理为在继续、回退、压缩、清空与子 Agent 之间管理上下文的能力。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-session-management.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-agent-session-management]] —— 本案例用来说明「Agent 会话管理」
- [[CON-agent-session-management_Agent 会话管理]]

## 备注

不要把假设场景当真实复盘引用。
