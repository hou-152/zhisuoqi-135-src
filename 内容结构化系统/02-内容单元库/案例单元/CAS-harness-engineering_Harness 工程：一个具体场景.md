---
id: CAS-harness-engineering
type: 案例单元
title: "Harness 工程：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Harness 工程"
  - "Harness Engineering"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Harness 工程"
case_summary: "一个代码 Agent 经常在工具报错后空转。团队不换模型，而是让错误以结构化观察回到循环、增加无进展停止条件，并在结束前运行测试；这属于 Harness Engineering。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Akshay 用三层工程说明 Prompt Engineering 打磨指令、Context Engineering 管理模型看到什么与何时看到，而 Harness Engineering 在工程范围上通常覆盖前两者并加入工具编排、状态、错误恢复、验证、安全与生命周期。本站另用系统职责轴说明 Context 管信息、Harness 管运行。"
relationships:
  - type: 解释
    target: CON-harness-engineering
    note: "本案例用来说明「Harness 工程」"
---

## 核心内容

**场景（假设场景）**：一个代码 Agent 经常在工具报错后空转。团队不换模型，而是让错误以结构化观察回到循环、增加无进展停止条件，并在结束前运行测试；这属于 Harness Engineering。

**来源里的真实依据**：Akshay 用三层工程说明 Prompt Engineering 打磨指令、Context Engineering 管理模型看到什么与何时看到，而 Harness Engineering 在工程范围上通常覆盖前两者并加入工具编排、状态、错误恢复、验证、安全与生命周期。本站另用系统职责轴说明 Context 管信息、Harness 管运行。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-engineering.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-harness-engineering]] —— 本案例用来说明「Harness 工程」
- [[CON-harness-engineering_Harness 工程]]

## 备注

不要把假设场景当真实复盘引用。
