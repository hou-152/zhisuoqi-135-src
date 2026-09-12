---
id: OPI-HAR-03-06
type: 观点单元
title: "「universally triggered」这个词是实指：Telegram/Slack web…"
source_documents:
  - "SRC-EXT-002"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Harness Engineering"
keywords:
  - "你的 agent 需要的是 harness，不是"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "「universally triggered」这个词是实指：Telegram/Slack webhook、cron 定时、子 agent 调用、函数间事件——agent 不知道也不关心自己是被什么激活的。触发与工作解耦。明天加一个 Slack bot，agent loop 一行不改，harness 负责路由。"
claim_scope: "出自《你的 agent 需要的是 harness，不是又一个框架》清单编号 03 的第 6 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-03
    note: "这一条是该篇核心观点之一"
---

## 核心内容

**核心判断（原文照抄）**：「universally triggered」这个词是实指：Telegram/Slack webhook、cron 定时、子 agent 调用、函数间事件——agent 不知道也不关心自己是被什么激活的。触发与工作解耦。明天加一个 Slack bot，agent loop 一行不改，harness 负责路由。

## 来源依据

- `SRC-EXT-002`：`你的 agent 需要的是 harness，不是又一个框架` 的「核心观点」第 6 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- （未匹配到已收录概念）
- [[QST-HAR-03_你的 agent 需要的是 harness，不是又一个框架]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
