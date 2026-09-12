---
id: CAS-attention-budget
type: 案例单元
title: "注意力预算：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "注意力预算"
  - "Attention Budget"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "注意力预算"
case_summary: "代码 Agent 同时收到完整仓库树、长日志、旧讨论和当前报错；关键错误信息虽然在其中，却可能因大量竞争材料而没有被可靠利用。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Anthropic 用 Attention Budget 类比模型处理大量 Context 时的有限能力，并主张把 Context 当作珍贵资源。本站把它作为帮助设计与诊断的工程解释框架，不把“每个 token 支取一点预算”的比喻冒充统一、可精确测量的物理机制。"
relationships:
  - type: 解释
    target: CON-attention-budget
    note: "本案例用来说明「注意力预算」"
---

## 核心内容

**场景（假设场景）**：代码 Agent 同时收到完整仓库树、长日志、旧讨论和当前报错；关键错误信息虽然在其中，却可能因大量竞争材料而没有被可靠利用。

**来源里的真实依据**：Anthropic 用 Attention Budget 类比模型处理大量 Context 时的有限能力，并主张把 Context 当作珍贵资源。本站把它作为帮助设计与诊断的工程解释框架，不把“每个 token 支取一点预算”的比喻冒充统一、可精确测量的物理机制。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/attention-budget.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-attention-budget]] —— 本案例用来说明「注意力预算」
- [[CON-attention-budget_注意力预算]]

## 备注

不要把假设场景当真实复盘引用。
