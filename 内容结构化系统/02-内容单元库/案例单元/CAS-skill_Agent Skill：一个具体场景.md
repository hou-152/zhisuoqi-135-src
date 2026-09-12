---
id: CAS-skill
type: 案例单元
title: "Agent Skill：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent Skill"
  - "Agent Skill"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Agent Skill"
case_summary: "团队把“修改前端后如何跑端到端检查、发现问题后怎样修复并复验”写成一个 Skill。以后 Agent 遇到对应任务时可以加载这套方法，并调用浏览器和测试 Tool 执行检查。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Anthropic 的 Agent Skills 实践把重复步骤编码成可复用指令单元，并可带上执行所需的资源；本站以 Agent Skill 为主名称，保留 Skill 与“技能”为 Alias，同时明确不同产品在格式、发现、加载和工具授权上的实现并不一致。"
relationships:
  - type: 解释
    target: CON-skill
    note: "本案例用来说明「Agent Skill」"
---

## 核心内容

**场景（假设场景）**：团队把“修改前端后如何跑端到端检查、发现问题后怎样修复并复验”写成一个 Skill。以后 Agent 遇到对应任务时可以加载这套方法，并调用浏览器和测试 Tool 执行检查。

**来源里的真实依据**：Anthropic 的 Agent Skills 实践把重复步骤编码成可复用指令单元，并可带上执行所需的资源；本站以 Agent Skill 为主名称，保留 Skill 与“技能”为 Alias，同时明确不同产品在格式、发现、加载和工具授权上的实现并不一致。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/skill.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-skill]] —— 本案例用来说明「Agent Skill」
- [[CON-skill_Agent Skill]]

## 备注

不要把假设场景当真实复盘引用。
