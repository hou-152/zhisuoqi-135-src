---
id: CAS-tool
type: 案例单元
title: "工具：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具"
  - "Tool"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "工具"
case_summary: "一个代码 Agent 想读取文件，会按文件工具的名称和参数结构提出调用；工具层检查路径与权限，实际读取文件，再把内容作为结果返回给模型。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Akshay 对 Agent Harness 的拆解把工具称为 Agent 的“双手”：工具以名称、描述和参数类型暴露给模型，工具层负责注册、校验、参数提取、沙箱执行、结果捕获与观察格式化。该来源用于划清模型请求与外层执行的边界。"
relationships:
  - type: 解释
    target: CON-tool
    note: "本案例用来说明「工具」"
---

## 核心内容

**场景（假设场景）**：一个代码 Agent 想读取文件，会按文件工具的名称和参数结构提出调用；工具层检查路径与权限，实际读取文件，再把内容作为结果返回给模型。

**来源里的真实依据**：Akshay 对 Agent Harness 的拆解把工具称为 Agent 的“双手”：工具以名称、描述和参数类型暴露给模型，工具层负责注册、校验、参数提取、沙箱执行、结果捕获与观察格式化。该来源用于划清模型请求与外层执行的边界。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-tool]] —— 本案例用来说明「工具」
- [[CON-tool_工具]]

## 备注

不要把假设场景当真实复盘引用。
