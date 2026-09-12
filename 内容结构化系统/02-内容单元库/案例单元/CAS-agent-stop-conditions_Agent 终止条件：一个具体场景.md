---
id: CAS-agent-stop-conditions
type: 案例单元
title: "Agent 终止条件：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent 终止条件"
  - "Agent Stop Conditions"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Agent 终止条件"
case_summary: "假设排障 Agent 连续三轮提出同类改动且验证没有改善；Harness 达到无进展阈值后停止自动尝试并把证据交给人。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《一次关于 Loop 的工程争论》：这段把最大迭代、无进展检测与成本上限并列为生产循环必须显式设计的终止边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-agent-stop-conditions
    note: "本案例用来说明「Agent 终止条件」"
---

## 核心内容

**场景（假设场景）**：假设排障 Agent 连续三轮提出同类改动且验证没有改善；Harness 达到无进展阈值后停止自动尝试并把证据交给人。

**来源里的真实依据**：本卡只采用以下来源范围：《一次关于 Loop 的工程争论》：这段把最大迭代、无进展检测与成本上限并列为生产循环必须显式设计的终止边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-stop-conditions.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-agent-stop-conditions]] —— 本案例用来说明「Agent 终止条件」
- [[CON-agent-stop-conditions_Agent 终止条件]]

## 备注

不要把假设场景当真实复盘引用。
