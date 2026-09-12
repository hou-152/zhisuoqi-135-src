---
id: CAS-chat-template
type: 案例单元
title: "聊天模板：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "聊天模板"
  - "Chat Template"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "聊天模板"
case_summary: "假设同一段用户与助手历史在两个模型上直接复用，一边正常续答，另一边把角色标记当正文；换成各自约定的序列化格式后才恢复。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Coding Agent 如何工作：工具循环与上下文工程》：逐字定义聊天模板如何把角色化历史拼成补全提示，并由 Harness 重建连续对话。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-chat-template
    note: "本案例用来说明「聊天模板」"
---

## 核心内容

**场景（假设场景）**：假设同一段用户与助手历史在两个模型上直接复用，一边正常续答，另一边把角色标记当正文；换成各自约定的序列化格式后才恢复。

**来源里的真实依据**：本卡只采用以下来源范围：《Coding Agent 如何工作：工具循环与上下文工程》：逐字定义聊天模板如何把角色化历史拼成补全提示，并由 Harness 重建连续对话。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/chat-template.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-chat-template]] —— 本案例用来说明「聊天模板」
- [[CON-chat-template_聊天模板]]

## 备注

不要把假设场景当真实复盘引用。
