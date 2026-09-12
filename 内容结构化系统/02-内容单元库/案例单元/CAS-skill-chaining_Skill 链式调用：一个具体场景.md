---
id: CAS-skill-chaining
type: 案例单元
title: "Skill 链式调用：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Skill 链式调用"
  - "Skill Chaining"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Skill 链式调用"
case_summary: "假设文章整理 Skill 完成后自动把结构化稿件交给排版 Skill，再交给检查 Skill；第二步失败时链条保留中间稿等待重试。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《用 Skills 在 Claude Code 里搭建验证闭环》：逐字定义一个 Skill 在结尾调用下一个 Skill 的链式机制，并说明其端到端验证用途。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-skill-chaining
    note: "本案例用来说明「Skill 链式调用」"
---

## 核心内容

**场景（假设场景）**：假设文章整理 Skill 完成后自动把结构化稿件交给排版 Skill，再交给检查 Skill；第二步失败时链条保留中间稿等待重试。

**来源里的真实依据**：本卡只采用以下来源范围：《用 Skills 在 Claude Code 里搭建验证闭环》：逐字定义一个 Skill 在结尾调用下一个 Skill 的链式机制，并说明其端到端验证用途。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/skill-chaining.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-skill-chaining]] —— 本案例用来说明「Skill 链式调用」
- [[CON-skill-chaining_Skill 链式调用]]

## 备注

不要把假设场景当真实复盘引用。
