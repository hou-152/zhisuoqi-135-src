---
id: OPI-HAR-28-01
type: 观点单元
title: "大多数人把 agent 想象成「一个模型外面栓了几把工具」，真实架构恰好把这个关系倒过来：模型被…"
source_documents:
  - "SRC-EXT-002"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Harness Engineering"
keywords:
  - "工具"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "大多数人把 agent 想象成「一个模型外面栓了几把工具」，真实架构恰好把这个关系倒过来：模型被刻意做薄（deliberately thin），智能被推到外面，由 harness 在运行时组装。"
claim_scope: "出自《一个被 harness 套住的 LLM agent：这个词到底指什么》清单编号 28 的第 1 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-28
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-tool
    note: "这条观点用到了「工具」"
---

## 核心内容

**核心判断（原文照抄）**：大多数人把 agent 想象成「一个模型外面栓了几把工具」，真实架构恰好把这个关系倒过来：模型被刻意做薄（deliberately thin），智能被推到外面，由 harness 在运行时组装。

## 来源依据

- `SRC-EXT-002`：`一个被 harness 套住的 LLM agent：这个词到底指什么` 的「核心观点」第 1 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-tool]] —— 用到「工具」
- [[QST-HAR-28_一个被 harness 套住的 LLM agent：这个词到底指什么]]
- [[CON-tool_工具]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
