---
id: CAS-tool-scoping
type: 案例单元
title: "工具收窄：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具收窄"
  - "Tool Scoping"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "工具收窄"
case_summary: "一个 Agent 先做资料检索时只看到搜索与读取工具，进入代码修改阶段后才看到编辑和测试工具；部署工具在没有进入发布步骤前始终不暴露。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Akshay 的 Harness 术语解释把 Tool Scoping 列为七项设计决策之一，并给出“只暴露当前步骤所需最小工具集”的原则。来源同时用删减工具与懒加载案例说明工具过多可能带来误选和 Context 成本；具体效果仍需在真实任务上验证。"
relationships:
  - type: 解释
    target: CON-tool-scoping
    note: "本案例用来说明「工具收窄」"
---

## 核心内容

**场景（假设场景）**：一个 Agent 先做资料检索时只看到搜索与读取工具，进入代码修改阶段后才看到编辑和测试工具；部署工具在没有进入发布步骤前始终不暴露。

**来源里的真实依据**：Akshay 的 Harness 术语解释把 Tool Scoping 列为七项设计决策之一，并给出“只暴露当前步骤所需最小工具集”的原则。来源同时用删减工具与懒加载案例说明工具过多可能带来误选和 Context 成本；具体效果仍需在真实任务上验证。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool-scoping.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-tool-scoping]] —— 本案例用来说明「工具收窄」
- [[CON-tool-scoping_工具收窄]]

## 备注

不要把假设场景当真实复盘引用。
