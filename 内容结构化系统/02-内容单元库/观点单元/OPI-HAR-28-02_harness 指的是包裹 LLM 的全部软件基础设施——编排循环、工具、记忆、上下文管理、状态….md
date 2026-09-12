---
id: OPI-HAR-28-02
type: 观点单元
title: "harness 指的是包裹 LLM 的全部软件基础设施——编排循环、工具、记忆、上下文管理、状态…"
source_documents:
  - "SRC-EXT-002"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Harness Engineering"
keywords:
  - "错误处理"
  - "上下文"
  - "护栏"
  - "记忆"
  - "工具"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "harness 指的是包裹 LLM 的全部软件基础设施——编排循环、工具、记忆、上下文管理、状态持久化、错误处理、护栏。LangChain 的 Vivek Trivedy 给了一句划界公式：「If you're not the model, you're the harness.」"
claim_scope: "出自《一个被 harness 套住的 LLM agent：这个词到底指什么》清单编号 28 的第 2 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-28
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-error-handling
    note: "这条观点用到了「错误处理」"
  - type: 证明
    target: CON-context
    note: "这条观点用到了「上下文」"
  - type: 证明
    target: CON-guardrails
    note: "这条观点用到了「护栏」"
---

## 核心内容

**核心判断（原文照抄）**：harness 指的是包裹 LLM 的全部软件基础设施——编排循环、工具、记忆、上下文管理、状态持久化、错误处理、护栏。LangChain 的 Vivek Trivedy 给了一句划界公式：「If you're not the model, you're the harness.」

## 来源依据

- `SRC-EXT-002`：`一个被 harness 套住的 LLM agent：这个词到底指什么` 的「核心观点」第 2 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-error-handling]] —— 用到「错误处理」
- [证明] [[CON-context]] —— 用到「上下文」
- [证明] [[CON-guardrails]] —— 用到「护栏」
- [[QST-HAR-28_一个被 harness 套住的 LLM agent：这个词到底指什么]]
- [[CON-error-handling_错误处理]]
- [[CON-context_上下文]]
- [[CON-guardrails_护栏]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
