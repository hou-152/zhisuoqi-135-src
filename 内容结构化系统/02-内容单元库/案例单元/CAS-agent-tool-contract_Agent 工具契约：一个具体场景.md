---
id: CAS-agent-tool-contract
type: 案例单元
title: "Agent 工具契约：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "Agent 工具契约"
  - "Agent Tool Contract"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Agent 工具契约"
case_summary: "假设客服 Agent 要发起退款：模型只提交“退款”意图、订单号和金额，执行器先过权限门再调用接口，最后只回传状态、流水号与失败原因。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》：原文把工具明确界定为 Agent 与信息／行动空间之间的契约，并列出自包含、健壮、清晰和 token 效率要求；《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》：原文从执行侧补充工具契约：模型只产生结构化意图，确定性代码承担实际执行与正确性责任；《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》：这段补充说明结构化模型结果必须由确定性程序承接，支持工具契约中的意图表达与执行责任边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-agent-tool-contract
    note: "本案例用来说明「Agent 工具契约」"
---

## 核心内容

**场景（假设场景）**：假设客服 Agent 要发起退款：模型只提交“退款”意图、订单号和金额，执行器先过权限门再调用接口，最后只回传状态、流水号与失败原因。

**来源里的真实依据**：本卡只采用以下来源范围：《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》：原文把工具明确界定为 Agent 与信息／行动空间之间的契约，并列出自包含、健壮、清晰和 token 效率要求；《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》：原文从执行侧补充工具契约：模型只产生结构化意图，确定性代码承担实际执行与正确性责任；《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》：这段补充说明结构化模型结果必须由确定性程序承接，支持工具契约中的意图表达与执行责任边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-tool-contract.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-agent-tool-contract]] —— 本案例用来说明「Agent 工具契约」
- [[CON-agent-tool-contract_Agent 工具契约]]

## 备注

不要把假设场景当真实复盘引用。
