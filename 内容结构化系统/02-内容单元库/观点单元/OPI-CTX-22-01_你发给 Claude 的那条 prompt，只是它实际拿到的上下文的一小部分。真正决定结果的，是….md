---
id: OPI-CTX-22-01
type: 观点单元
title: "你发给 Claude 的那条 prompt，只是它实际拿到的上下文的一小部分。真正决定结果的，是…"
source_documents:
  - "SRC-EXT-001"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Context Engineering"
keywords:
  - "上下文工程"
  - "系统提示"
  - "上下文"
  - "提示"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "你发给 Claude 的那条 prompt，只是它实际拿到的上下文的一小部分。真正决定结果的，是由系统提示词、Skills、CLAUDE.md 文件、memory 等来源拼装起来的整体上下文——作者把这件事称为上下文工程（context engineering）。"
claim_scope: "出自《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》清单编号 22 的第 1 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-CTX-22
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-context-engineering
    note: "这条观点用到了「上下文工程」"
  - type: 证明
    target: CON-system-prompt
    note: "这条观点用到了「系统提示」"
  - type: 证明
    target: CON-context
    note: "这条观点用到了「上下文」"
---

## 核心内容

**核心判断（原文照抄）**：你发给 Claude 的那条 prompt，只是它实际拿到的上下文的一小部分。真正决定结果的，是由系统提示词、Skills、CLAUDE.md 文件、memory 等来源拼装起来的整体上下文——作者把这件事称为上下文工程（context engineering）。

## 来源依据

- `SRC-EXT-001`：`Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%` 的「核心观点」第 1 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-context-engineering]] —— 用到「上下文工程」
- [证明] [[CON-system-prompt]] —— 用到「系统提示」
- [证明] [[CON-context]] —— 用到「上下文」
- [[QST-CTX-22_Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%]]
- [[CON-context-engineering_上下文工程]]
- [[CON-system-prompt_系统提示]]
- [[CON-context_上下文]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
