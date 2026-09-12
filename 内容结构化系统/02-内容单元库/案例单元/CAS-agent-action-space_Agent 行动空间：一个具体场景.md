---
id: CAS-agent-action-space
type: 案例单元
title: "Agent 行动空间：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "Agent 行动空间"
  - "Agent Action Space"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Agent 行动空间"
case_summary: "假设文件 Agent 只有一个“操作文件”工具，却可通过参数读取、覆盖、移动或删除；工具数量没变，参数范围扩大后风险和选择难度都变了。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》：原文把行动空间列为构建 Agent 的核心难题，并明确工具集合需要匹配模型能力而非越多越好。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-agent-action-space
    note: "本案例用来说明「Agent 行动空间」"
---

## 核心内容

**场景（假设场景）**：假设文件 Agent 只有一个“操作文件”工具，却可通过参数读取、覆盖、移动或删除；工具数量没变，参数范围扩大后风险和选择难度都变了。

**来源里的真实依据**：本卡只采用以下来源范围：《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》：原文把行动空间列为构建 Agent 的核心难题，并明确工具集合需要匹配模型能力而非越多越好。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-action-space.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-agent-action-space]] —— 本案例用来说明「Agent 行动空间」
- [[CON-agent-action-space_Agent 行动空间]]

## 备注

不要把假设场景当真实复盘引用。
