---
id: OPI-HAR-12-01
type: 观点单元
title: "Claude Managed Agents 是一套预置、可配置的 agent harness，跑…"
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
core_claim: "Claude Managed Agents 是一套预置、可配置的 agent harness，跑在托管的基础设施上：你把 agent 定义成一个模板（模型、system prompt、工具、skills、文件与仓库），harness 和 infra 由 Anthropic 提供。"
claim_scope: "出自《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》清单编号 12 的第 1 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-12
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-tool
    note: "这条观点用到了「工具」"
---

## 核心内容

**核心判断（原文照抄）**：Claude Managed Agents 是一套预置、可配置的 agent harness，跑在托管的基础设施上：你把 agent 定义成一个模板（模型、system prompt、工具、skills、文件与仓库），harness 和 infra 由 Anthropic 提供。

## 来源依据

- `SRC-EXT-002`：`Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍` 的「核心观点」第 1 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-tool]] —— 用到「工具」
- [[QST-HAR-12_Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍]]
- [[CON-tool_工具]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
