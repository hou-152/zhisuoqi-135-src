---
id: OPI-HAR-06-02
type: 观点单元
title: "答案是一个多 agent harness：它在一台大 Linux VM 上连续跑了一周，几乎包办…"
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
core_claim: "答案是一个多 agent harness：它在一台大 Linux VM 上连续跑了一周，几乎包办了这个研究项目的绝大多数 commit，峰值约 1,000 commits/hour、一周内 10M 次工具调用，启动之后不需要人工干预。"
claim_scope: "出自《Cursor 谈「会自动驾驶的代码库」：多 agent 研究 harness 开放预览》清单编号 06 的第 2 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-06
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-tool
    note: "这条观点用到了「工具」"
---

## 核心内容

**核心判断（原文照抄）**：答案是一个多 agent harness：它在一台大 Linux VM 上连续跑了一周，几乎包办了这个研究项目的绝大多数 commit，峰值约 1,000 commits/hour、一周内 10M 次工具调用，启动之后不需要人工干预。

## 来源依据

- `SRC-EXT-002`：`Cursor 谈「会自动驾驶的代码库」：多 agent 研究 harness 开放预览` 的「核心观点」第 2 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-tool]] —— 用到「工具」
- [[QST-HAR-06_Cursor 谈「会自动驾驶的代码库」：多 agent 研究 harness 开放预览]]
- [[CON-tool_工具]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
