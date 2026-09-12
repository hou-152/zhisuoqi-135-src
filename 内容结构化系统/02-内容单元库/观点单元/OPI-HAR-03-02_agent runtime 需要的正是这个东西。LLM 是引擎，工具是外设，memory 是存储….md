---
id: OPI-HAR-03-02
type: 观点单元
title: "agent runtime 需要的正是这个东西。LLM 是引擎，工具是外设，memory 是存储…"
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
core_claim: "agent runtime 需要的正是这个东西。LLM 是引擎，工具是外设，memory 是存储——但把它们连起来的是什么？第五轮迭代 LLM 超时的时候，谁来接住这次失败？谁防止两条消息相撞？谁把一个 webhook 事件路由到正确的 handler、再路由到正确的回复频道？"
claim_scope: "出自《你的 agent 需要的是 harness，不是又一个框架》清单编号 03 的第 2 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-03
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-tool
    note: "这条观点用到了「工具」"
---

## 核心内容

**核心判断（原文照抄）**：agent runtime 需要的正是这个东西。LLM 是引擎，工具是外设，memory 是存储——但把它们连起来的是什么？第五轮迭代 LLM 超时的时候，谁来接住这次失败？谁防止两条消息相撞？谁把一个 webhook 事件路由到正确的 handler、再路由到正确的回复频道？

## 来源依据

- `SRC-EXT-002`：`你的 agent 需要的是 harness，不是又一个框架` 的「核心观点」第 2 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-tool]] —— 用到「工具」
- [[QST-HAR-03_你的 agent 需要的是 harness，不是又一个框架]]
- [[CON-tool_工具]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
