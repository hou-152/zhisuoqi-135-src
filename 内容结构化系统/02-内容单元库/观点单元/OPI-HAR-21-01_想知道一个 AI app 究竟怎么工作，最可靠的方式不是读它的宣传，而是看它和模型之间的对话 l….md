---
id: OPI-HAR-21-01
type: 观点单元
title: "想知道一个 AI app 究竟怎么工作，最可靠的方式不是读它的宣传，而是看它和模型之间的对话 l…"
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
core_claim: "想知道一个 AI app 究竟怎么工作，最可靠的方式不是读它的宣传，而是看它和模型之间的对话 log。作者用 custom endpoint 把 Claude Code 的请求截下来，直接读到了它的 system prompt、工具清单和背后的小模型调用。"
claim_scope: "出自《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》清单编号 21 的第 1 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-21
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-tool
    note: "这条观点用到了「工具」"
---

## 核心内容

**核心判断（原文照抄）**：想知道一个 AI app 究竟怎么工作，最可靠的方式不是读它的宣传，而是看它和模型之间的对话 log。作者用 custom endpoint 把 Claude Code 的请求截下来，直接读到了它的 system prompt、工具清单和背后的小模型调用。

## 来源依据

- `SRC-EXT-002`：`拆开 Claude Code：一个编码 agent 的 harness 内部长什么样` 的「核心观点」第 1 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-tool]] —— 用到「工具」
- [[QST-HAR-21_拆开 Claude Code：一个编码 agent 的 harness 内部长什么样]]
- [[CON-tool_工具]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
