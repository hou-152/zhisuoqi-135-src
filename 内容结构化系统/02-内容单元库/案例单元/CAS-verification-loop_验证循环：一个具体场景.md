---
id: CAS-verification-loop
type: 案例单元
title: "验证循环：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "验证循环"
  - "Verification Loop"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "验证循环"
case_summary: "一个代码 Agent 改完页面后，独立运行测试并用浏览器检查关键交互。测试失败时，它依据报错继续修正；全部既定检查通过时，它退出修复循环，同时仍把视觉偏好与上线决定留给人审阅。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Delba de Oliveira 展示了把测试、截图或其他检查通路封装进 Skills 的做法；来源策展同时用 guides 与 sensors 区分行动前引导和行动后反馈。本站把 Verification Loop 定义为消费检查结果并控制“修正或退出”的运行内闭环。"
relationships:
  - type: 解释
    target: CON-verification-loop
    note: "本案例用来说明「验证循环」"
---

## 核心内容

**场景（假设场景）**：一个代码 Agent 改完页面后，独立运行测试并用浏览器检查关键交互。测试失败时，它依据报错继续修正；全部既定检查通过时，它退出修复循环，同时仍把视觉偏好与上线决定留给人审阅。

**来源里的真实依据**：Delba de Oliveira 展示了把测试、截图或其他检查通路封装进 Skills 的做法；来源策展同时用 guides 与 sensors 区分行动前引导和行动后反馈。本站把 Verification Loop 定义为消费检查结果并控制“修正或退出”的运行内闭环。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/verification-loop.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-verification-loop]] —— 本案例用来说明「验证循环」
- [[CON-verification-loop_验证循环]]

## 备注

不要把假设场景当真实复盘引用。
