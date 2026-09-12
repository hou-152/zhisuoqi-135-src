---
id: OPI-CTX-05-03
type: 观点单元
title: "context 必须被当成有限资源看待，且边际收益递减。LLM 和人一样有一份「注意力预算」（a…"
source_documents:
  - "SRC-EXT-001"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Context Engineering"
keywords:
  - "注意力预算"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "context 必须被当成有限资源看待，且边际收益递减。LLM 和人一样有一份「注意力预算」（attention budget），每多一个 token 就从中支取一点。"
claim_scope: "出自《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》清单编号 05 的第 3 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-CTX-05
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-attention-budget
    note: "这条观点用到了「注意力预算」"
---

## 核心内容

**核心判断（原文照抄）**：context 必须被当成有限资源看待，且边际收益递减。LLM 和人一样有一份「注意力预算」（attention budget），每多一个 token 就从中支取一点。

## 来源依据

- `SRC-EXT-001`：`Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集` 的「核心观点」第 3 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-attention-budget]] —— 用到「注意力预算」
- [[QST-CTX-05_Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集]]
- [[CON-attention-budget_注意力预算]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
