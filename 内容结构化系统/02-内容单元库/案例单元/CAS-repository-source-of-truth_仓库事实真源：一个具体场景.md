---
id: CAS-repository-source-of-truth
type: 案例单元
title: "仓库事实真源：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "仓库事实真源"
  - "Repository as Source of Truth"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "仓库事实真源"
case_summary: "假设新人 Agent 从仓库读到任务范围、权威文档和验证命令，发现聊天里的旧要求与最新决定冲突，于是按明确覆盖关系执行。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Harness 工程学习仓库：从原始文献到能跑的 skill》：这段将仓库内可读取文件设为 Agent 指令、状态和范围的共同事实入口，排除口头与个人记忆作为运行依赖。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-repository-source-of-truth
    note: "本案例用来说明「仓库事实真源」"
---

## 核心内容

**场景（假设场景）**：假设新人 Agent 从仓库读到任务范围、权威文档和验证命令，发现聊天里的旧要求与最新决定冲突，于是按明确覆盖关系执行。

**来源里的真实依据**：本卡只采用以下来源范围：《Harness 工程学习仓库：从原始文献到能跑的 skill》：这段将仓库内可读取文件设为 Agent 指令、状态和范围的共同事实入口，排除口头与个人记忆作为运行依赖。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/repository-source-of-truth.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-repository-source-of-truth]] —— 本案例用来说明「仓库事实真源」
- [[CON-repository-source-of-truth_仓库事实真源]]

## 备注

不要把假设场景当真实复盘引用。
