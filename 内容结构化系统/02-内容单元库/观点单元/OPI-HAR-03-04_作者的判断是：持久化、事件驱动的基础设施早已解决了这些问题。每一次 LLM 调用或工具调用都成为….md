---
id: OPI-HAR-03-04
type: 观点单元
title: "作者的判断是：持久化、事件驱动的基础设施早已解决了这些问题。每一次 LLM 调用或工具调用都成为…"
source_documents:
  - "SRC-EXT-002"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Harness Engineering"
keywords:
  - "可观测性"
  - "工具"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "作者的判断是：持久化、事件驱动的基础设施早已解决了这些问题。每一次 LLM 调用或工具调用都成为一个 step——一个可独立重试的工作单元；进程在第五轮死掉，前四轮的结果已经落盘。事件在函数之间路由触发，并发控制防止碰撞，step 级 trace 给你对 agent loop 每一轮的完整可观测性。基础设施本身就是 harness。"
claim_scope: "出自《你的 agent 需要的是 harness，不是又一个框架》清单编号 03 的第 4 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-03
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-observability
    note: "这条观点用到了「可观测性」"
  - type: 证明
    target: CON-tool
    note: "这条观点用到了「工具」"
---

## 核心内容

**核心判断（原文照抄）**：作者的判断是：持久化、事件驱动的基础设施早已解决了这些问题。每一次 LLM 调用或工具调用都成为一个 step——一个可独立重试的工作单元；进程在第五轮死掉，前四轮的结果已经落盘。事件在函数之间路由触发，并发控制防止碰撞，step 级 trace 给你对 agent loop 每一轮的完整可观测性。基础设施本身就是 harness。

## 来源依据

- `SRC-EXT-002`：`你的 agent 需要的是 harness，不是又一个框架` 的「核心观点」第 4 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-observability]] —— 用到「可观测性」
- [证明] [[CON-tool]] —— 用到「工具」
- [[QST-HAR-03_你的 agent 需要的是 harness，不是又一个框架]]
- [[CON-observability_可观测性]]
- [[CON-tool_工具]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
