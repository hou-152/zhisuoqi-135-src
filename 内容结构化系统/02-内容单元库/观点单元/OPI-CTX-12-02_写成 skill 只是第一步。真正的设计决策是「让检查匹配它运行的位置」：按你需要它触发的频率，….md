---
id: OPI-CTX-12-02
type: 观点单元
title: "写成 skill 只是第一步。真正的设计决策是「让检查匹配它运行的位置」：按你需要它触发的频率，…"
source_documents:
  - "SRC-EXT-001"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Context Engineering"
keywords:
  - "用 Skills 在 Claude Code 里"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "写成 skill 只是第一步。真正的设计决策是「让检查匹配它运行的位置」：按你需要它触发的频率，从 standalone（独立调用）→ embedded（嵌入）→ chained（链式）→ on every PR（每个 PR 上）四种接入方式里选一种，这是一条由松到紧、由手动到自动的升级阶梯。"
claim_scope: "出自《用 Skills 在 Claude Code 里搭建验证闭环》清单编号 12 的第 2 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-CTX-12
    note: "这一条是该篇核心观点之一"
---

## 核心内容

**核心判断（原文照抄）**：写成 skill 只是第一步。真正的设计决策是「让检查匹配它运行的位置」：按你需要它触发的频率，从 standalone（独立调用）→ embedded（嵌入）→ chained（链式）→ on every PR（每个 PR 上）四种接入方式里选一种，这是一条由松到紧、由手动到自动的升级阶梯。

## 来源依据

- `SRC-EXT-001`：`用 Skills 在 Claude Code 里搭建验证闭环` 的「核心观点」第 2 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- （未匹配到已收录概念）
- [[QST-CTX-12_用 Skills 在 Claude Code 里搭建验证闭环]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
