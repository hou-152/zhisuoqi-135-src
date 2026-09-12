---
id: CAS-observability
type: 案例单元
title: "可观测性：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "可观测性"
  - "Observability"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "可观测性"
case_summary: "一个 Agent 调了错误工具后仍然给出最终答案。运行面板保存每次模型调用、工具参数、状态变化和时延，因此工程师能定位错误发生在哪一步；但这些记录本身不会宣布答案正确。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Harness 工程学习仓库把可观测性列为独立子系统：看不到 Agent 做了什么，就修不了它搞坏的东西。本站据此把它限定为运行证据基础设施，而不是验证结论或流程控制器。"
relationships:
  - type: 解释
    target: CON-observability
    note: "本案例用来说明「可观测性」"
---

## 核心内容

**场景（假设场景）**：一个 Agent 调了错误工具后仍然给出最终答案。运行面板保存每次模型调用、工具参数、状态变化和时延，因此工程师能定位错误发生在哪一步；但这些记录本身不会宣布答案正确。

**来源里的真实依据**：Harness 工程学习仓库把可观测性列为独立子系统：看不到 Agent 做了什么，就修不了它搞坏的东西。本站据此把它限定为运行证据基础设施，而不是验证结论或流程控制器。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/observability.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-observability]] —— 本案例用来说明「可观测性」
- [[CON-observability_可观测性]]

## 备注

不要把假设场景当真实复盘引用。
