---
id: CAS-system-prompt
type: 案例单元
title: "系统提示：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "系统提示"
  - "System Prompt"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "系统提示"
case_summary: "一个代码助手的系统提示要求它先检查仓库规则、按约定格式请求工具并避免越权修改；用户随后要求改文件。模型会同时接收这些分层输入，而真正是否允许写入仍由工具权限决定。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Simon Willison 将 system prompt 描述为 Agent 的隐形操作手册，可覆盖角色、任务边界、工具协议与安全约束；同时，来源明确说明模型只是请求工具，真实执行由 Harness 完成。不同 API 的消息角色与拼接优先级可能不同。"
relationships:
  - type: 解释
    target: CON-system-prompt
    note: "本案例用来说明「系统提示」"
---

## 核心内容

**场景（假设场景）**：一个代码助手的系统提示要求它先检查仓库规则、按约定格式请求工具并避免越权修改；用户随后要求改文件。模型会同时接收这些分层输入，而真正是否允许写入仍由工具权限决定。

**来源里的真实依据**：Simon Willison 将 system prompt 描述为 Agent 的隐形操作手册，可覆盖角色、任务边界、工具协议与安全约束；同时，来源明确说明模型只是请求工具，真实执行由 Harness 完成。不同 API 的消息角色与拼接优先级可能不同。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/system-prompt.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-system-prompt]] —— 本案例用来说明「系统提示」
- [[CON-system-prompt_系统提示]]

## 备注

不要把假设场景当真实复盘引用。
