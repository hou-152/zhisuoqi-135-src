---
id: CAS-dynamic-context-assembly
type: 案例单元
title: "动态上下文装配：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "动态上下文装配"
  - "Dynamic Context Assembly"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "动态上下文装配"
case_summary: "一个助理收到“帮我约下周的同步会”后，系统先识别当前任务，再取得日历、联系人、往来语气和发邀请工具，把这些内容按合适格式组成这一次模型输入；下一项任务会得到另一套组合。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Philipp Schmid 从 Context Engineering 的倡议者视角，把上下文描述为主模型调用前动态系统的输出：正确的信息与工具要在正确时间、以正确格式提供。本站据此抽出“动态装配”机制；这不是来源声称的统一行业标准，也不表示装得越多越好。"
relationships:
  - type: 解释
    target: CON-dynamic-context-assembly
    note: "本案例用来说明「动态上下文装配」"
---

## 核心内容

**场景（假设场景）**：一个助理收到“帮我约下周的同步会”后，系统先识别当前任务，再取得日历、联系人、往来语气和发邀请工具，把这些内容按合适格式组成这一次模型输入；下一项任务会得到另一套组合。

**来源里的真实依据**：Philipp Schmid 从 Context Engineering 的倡议者视角，把上下文描述为主模型调用前动态系统的输出：正确的信息与工具要在正确时间、以正确格式提供。本站据此抽出“动态装配”机制；这不是来源声称的统一行业标准，也不表示装得越多越好。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/dynamic-context-assembly.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-dynamic-context-assembly]] —— 本案例用来说明「动态上下文装配」
- [[CON-dynamic-context-assembly_动态上下文装配]]

## 备注

不要把假设场景当真实复盘引用。
