---
id: OPI-CTX-03-01
type: 观点单元
title: "人们默认模型是均匀地处理上下文的——第 10000 个 token 应该和第 100 个 tok…"
source_documents:
  - "SRC-EXT-001"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Context Engineering"
keywords:
  - "上下文"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "人们默认模型是均匀地处理上下文的——第 10000 个 token 应该和第 100 个 token 一样可靠。Chroma 的实测结论是：这个假设不成立。"
claim_scope: "出自《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》清单编号 03 的第 1 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-CTX-03
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-context
    note: "这条观点用到了「上下文」"
---

## 核心内容

**核心判断（原文照抄）**：人们默认模型是均匀地处理上下文的——第 10000 个 token 应该和第 100 个 token 一样可靠。Chroma 的实测结论是：这个假设不成立。

## 来源依据

- `SRC-EXT-001`：`Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠` 的「核心观点」第 1 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-context]] —— 用到「上下文」
- [[QST-CTX-03_Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠]]
- [[CON-context_上下文]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
