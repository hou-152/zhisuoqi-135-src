---
id: CAS-context-selection
type: 案例单元
title: "上下文选择：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文选择"
  - "Context Selection"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "上下文选择"
case_summary: "Agent 准备修复支付错误时，先列出长期记忆、代码检索结果和工具定义等候选来源，再只纳入相关模块、最近失败记录与必要工具；旧项目笔记和无关工具留在窗口之外。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Hua 等人的综述把 Context Selection 概括为“Attention Before Attention”：模型自身的注意力只能作用于已经进入窗口的 token，因此系统还需要在此之前从草稿、记忆、工具定义与 RAG 结果中作选择。文中提到的约 50% 窗口填充度属于经验观察，不是受控实验得出的通用阈值，本站不据此设定固定上限。"
relationships:
  - type: 解释
    target: CON-context-selection
    note: "本案例用来说明「上下文选择」"
---

## 核心内容

**场景（假设场景）**：Agent 准备修复支付错误时，先列出长期记忆、代码检索结果和工具定义等候选来源，再只纳入相关模块、最近失败记录与必要工具；旧项目笔记和无关工具留在窗口之外。

**来源里的真实依据**：Hua 等人的综述把 Context Selection 概括为“Attention Before Attention”：模型自身的注意力只能作用于已经进入窗口的 token，因此系统还需要在此之前从草稿、记忆、工具定义与 RAG 结果中作选择。文中提到的约 50% 窗口填充度属于经验观察，不是受控实验得出的通用阈值，本站不据此设定固定上限。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-selection.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-context-selection]] —— 本案例用来说明「上下文选择」
- [[CON-context-selection_上下文选择]]

## 备注

不要把假设场景当真实复盘引用。
