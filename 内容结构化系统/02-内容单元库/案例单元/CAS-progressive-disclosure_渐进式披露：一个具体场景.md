---
id: CAS-progressive-disclosure
type: 案例单元
title: "渐进式披露：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "渐进式披露"
  - "Progressive Disclosure"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "渐进式披露"
case_summary: "项目的 AGENTS.md 只列出当前任务该读的真源与目录；Agent 先打开相关文档索引，遇到实现问题再进入对应架构章节，需要精确细节时才读取具体文件，而不是一开始加载全部资料。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Anthropic 的 Effective Context Engineering 描述 Agent 利用文件路径、命名、大小和时间戳等元数据自主导航，通过探索增量发现相关 context。本站把 Progressive Disclosure 定义为信息的分层组织与逐步发现策略。"
relationships:
  - type: 解释
    target: CON-progressive-disclosure
    note: "本案例用来说明「渐进式披露」"
---

## 核心内容

**场景（假设场景）**：项目的 AGENTS.md 只列出当前任务该读的真源与目录；Agent 先打开相关文档索引，遇到实现问题再进入对应架构章节，需要精确细节时才读取具体文件，而不是一开始加载全部资料。

**来源里的真实依据**：Anthropic 的 Effective Context Engineering 描述 Agent 利用文件路径、命名、大小和时间戳等元数据自主导航，通过探索增量发现相关 context。本站把 Progressive Disclosure 定义为信息的分层组织与逐步发现策略。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/progressive-disclosure.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-progressive-disclosure]] —— 本案例用来说明「渐进式披露」
- [[CON-progressive-disclosure_渐进式披露]]

## 备注

不要把假设场景当真实复盘引用。
