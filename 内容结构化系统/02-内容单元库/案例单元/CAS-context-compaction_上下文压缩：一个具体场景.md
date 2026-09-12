---
id: CAS-context-compaction
type: 案例单元
title: "上下文压缩：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文压缩"
  - "Context Compaction"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "上下文压缩"
case_summary: "一个代码 Agent 的对话接近窗口上限，系统把已确认的架构决定、未解决错误和当前进度整理成摘要，保留相关文件路径，再用这份摘要开启新窗口；冗长工具输出不再整段携带。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Anthropic 从构建 Agent 的实践者与平台方视角，把 compaction 作为长时程任务的第一根杠杆：接近窗口上限时摘要旧对话并重新初始化窗口。来源同时强调压缩取舍与过度压缩风险；这不是无损保证，也不是适合所有任务的唯一方案。"
relationships:
  - type: 解释
    target: CON-context-compaction
    note: "本案例用来说明「上下文压缩」"
---

## 核心内容

**场景（假设场景）**：一个代码 Agent 的对话接近窗口上限，系统把已确认的架构决定、未解决错误和当前进度整理成摘要，保留相关文件路径，再用这份摘要开启新窗口；冗长工具输出不再整段携带。

**来源里的真实依据**：Anthropic 从构建 Agent 的实践者与平台方视角，把 compaction 作为长时程任务的第一根杠杆：接近窗口上限时摘要旧对话并重新初始化窗口。来源同时强调压缩取舍与过度压缩风险；这不是无损保证，也不是适合所有任务的唯一方案。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-compaction.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-context-compaction]] —— 本案例用来说明「上下文压缩」
- [[CON-context-compaction_上下文压缩]]

## 备注

不要把假设场景当真实复盘引用。
