---
id: CAS-risk-tiered-autofixing
type: 案例单元
title: "风险分级自动修复：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "风险分级自动修复"
  - "Risk-Tiered Autofixing"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "风险分级自动修复"
case_summary: "假设检查器发现文档错别字和数据库迁移问题；前者自动修复后轻量复核，后者只生成候选补丁并停止在人工审查门前。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Harness Engineering：AI-First 组织的信任机制重构》：这段呈现了按改动风险决定自动修复后的审查深度，使自动修复与人类门禁形成分级机制。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-risk-tiered-autofixing
    note: "本案例用来说明「风险分级自动修复」"
---

## 核心内容

**场景（假设场景）**：假设检查器发现文档错别字和数据库迁移问题；前者自动修复后轻量复核，后者只生成候选补丁并停止在人工审查门前。

**来源里的真实依据**：本卡只采用以下来源范围：《Harness Engineering：AI-First 组织的信任机制重构》：这段呈现了按改动风险决定自动修复后的审查深度，使自动修复与人类门禁形成分级机制。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/risk-tiered-autofixing.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-risk-tiered-autofixing]] —— 本案例用来说明「风险分级自动修复」
- [[CON-risk-tiered-autofixing_风险分级自动修复]]

## 备注

不要把假设场景当真实复盘引用。
