---
id: OPI-HAR-07-02
type: 观点单元
title: "真正的瓶颈不是单个 agent 的能力，而是协调架构。让地位平等的 agent 通过共享文件加锁…"
source_documents:
  - "SRC-EXT-002"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Harness Engineering"
keywords:
  - "Cursor：让 coding agent 连续"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "真正的瓶颈不是单个 agent 的能力，而是协调架构。让地位平等的 agent 通过共享文件加锁自协调，会同时坏在两个层面：机制层面（持锁不放、崩溃时不释放、绕过锁写入）和激励层面（没有层级，agent 变得风险规避、只做小而安全的改动、无人对端到端负责）。"
claim_scope: "出自《Cursor：让 coding agent 连续自治运行数周的工程经验》清单编号 07 的第 2 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-07
    note: "这一条是该篇核心观点之一"
---

## 核心内容

**核心判断（原文照抄）**：真正的瓶颈不是单个 agent 的能力，而是协调架构。让地位平等的 agent 通过共享文件加锁自协调，会同时坏在两个层面：机制层面（持锁不放、崩溃时不释放、绕过锁写入）和激励层面（没有层级，agent 变得风险规避、只做小而安全的改动、无人对端到端负责）。

## 来源依据

- `SRC-EXT-002`：`Cursor：让 coding agent 连续自治运行数周的工程经验` 的「核心观点」第 2 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- （未匹配到已收录概念）
- [[QST-HAR-07_Cursor：让 coding agent 连续自治运行数周的工程经验]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
