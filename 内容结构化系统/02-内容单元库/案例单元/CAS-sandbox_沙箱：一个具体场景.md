---
id: CAS-sandbox
type: 案例单元
title: "沙箱：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "沙箱"
  - "Sandbox"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "沙箱"
case_summary: "一个代码 Agent 在独立工作区里安装依赖并运行未经验证的脚本；即使脚本破坏了工作区文件，宿主机的其他目录和凭证仍不应自动暴露给它。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "LangChain 的 Agent Harness 文章把 Sandbox 作为默认运行基础设施：它为代码、文件与依赖提供隔离环境，可叠加命令 allow-list 和网络隔离，并支持按需创建与销毁。本站采用“执行位置与影响范围”边界，不把隔离冒充授权或绝对安全。"
relationships:
  - type: 解释
    target: CON-sandbox
    note: "本案例用来说明「沙箱」"
---

## 核心内容

**场景（假设场景）**：一个代码 Agent 在独立工作区里安装依赖并运行未经验证的脚本；即使脚本破坏了工作区文件，宿主机的其他目录和凭证仍不应自动暴露给它。

**来源里的真实依据**：LangChain 的 Agent Harness 文章把 Sandbox 作为默认运行基础设施：它为代码、文件与依赖提供隔离环境，可叠加命令 allow-list 和网络隔离，并支持按需创建与销毁。本站采用“执行位置与影响范围”边界，不把隔离冒充授权或绝对安全。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/sandbox.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-sandbox]] —— 本案例用来说明「沙箱」
- [[CON-sandbox_沙箱]]

## 备注

不要把假设场景当真实复盘引用。
