---
id: CAS-minimal-sufficient-context
type: 案例单元
title: "最小充分上下文：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "最小充分上下文"
  - "Minimal Sufficient Context"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "最小充分上下文"
case_summary: "修一个登录故障时，Agent 收到报错、相关配置、认证流程和目标测试，而不是整个公司文档库；若缺少关键环境差异，就必须补入，不能为了短而删掉。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Anthropic 将有效 Context Engineering 的指导原则表述为寻找能最大化期望结果概率的最小高信号 token 集合，并明确 minimal 不一定意味着 short；《Context Engineering 2.0》也把充分性而非体量视为 Context 的价值所在。"
relationships:
  - type: 解释
    target: CON-minimal-sufficient-context
    note: "本案例用来说明「最小充分上下文」"
---

## 核心内容

**场景（假设场景）**：修一个登录故障时，Agent 收到报错、相关配置、认证流程和目标测试，而不是整个公司文档库；若缺少关键环境差异，就必须补入，不能为了短而删掉。

**来源里的真实依据**：Anthropic 将有效 Context Engineering 的指导原则表述为寻找能最大化期望结果概率的最小高信号 token 集合，并明确 minimal 不一定意味着 short；《Context Engineering 2.0》也把充分性而非体量视为 Context 的价值所在。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/minimal-sufficient-context.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-minimal-sufficient-context]] —— 本案例用来说明「最小充分上下文」
- [[CON-minimal-sufficient-context_最小充分上下文]]

## 备注

不要把假设场景当真实复盘引用。
