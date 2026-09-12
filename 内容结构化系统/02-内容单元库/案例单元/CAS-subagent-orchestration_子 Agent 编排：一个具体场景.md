---
id: CAS-subagent-orchestration
type: 案例单元
title: "子 Agent 编排：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "子 Agent 编排"
  - "Subagent Orchestration"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "子 Agent 编排"
case_summary: "假设主 Agent 把依赖调查交给子 Agent；子任务只返回相关文件、证据和不确定项，主流程据此继续修改，而不是接收整段探索历史。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Agent Harness 的本质：把模型放进可控的执行系统》：逐字列出子 Agent 的调用与移交模式，并说明把探索结果压缩回传以降低主上下文负担的机制价值；《Claude Code 在读提示词前为何已发送 3.3 万 Token》：这段补足子 Agent 编排的成本边界：每个 Worker 复制独立启动底座，Parent 还会再次摄入返回 Transcript。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-subagent-orchestration
    note: "本案例用来说明「子 Agent 编排」"
---

## 核心内容

**场景（假设场景）**：假设主 Agent 把依赖调查交给子 Agent；子任务只返回相关文件、证据和不确定项，主流程据此继续修改，而不是接收整段探索历史。

**来源里的真实依据**：本卡只采用以下来源范围：《Agent Harness 的本质：把模型放进可控的执行系统》：逐字列出子 Agent 的调用与移交模式，并说明把探索结果压缩回传以降低主上下文负担的机制价值；《Claude Code 在读提示词前为何已发送 3.3 万 Token》：这段补足子 Agent 编排的成本边界：每个 Worker 复制独立启动底座，Parent 还会再次摄入返回 Transcript。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/subagent-orchestration.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-subagent-orchestration]] —— 本案例用来说明「子 Agent 编排」
- [[CON-subagent-orchestration_子 Agent 编排]]

## 备注

不要把假设场景当真实复盘引用。
