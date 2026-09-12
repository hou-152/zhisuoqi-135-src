---
id: CAS-harness-overfitting
type: 案例单元
title: "Harness 过拟合：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "Harness 过拟合"
  - "Harness Overfitting"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Harness 过拟合"
case_summary: "假设同一模型在原生工具协议上完成率很高，换成能力等价、名称和反馈格式不同的 Harness 后大幅下降。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《LangChain 解剖 agent harness：Agent = 模型 + harness》：原文说明模型与 Harness 共同后训练可能造成对特定工具逻辑的依赖，并把它明确称为过拟合；《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》：第二篇文章再次明确模型可能对原生 Harness 过拟合，并以跨 Harness 表现差异支撑其可检验性。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-harness-overfitting
    note: "本案例用来说明「Harness 过拟合」"
---

## 核心内容

**场景（假设场景）**：假设同一模型在原生工具协议上完成率很高，换成能力等价、名称和反馈格式不同的 Harness 后大幅下降。

**来源里的真实依据**：本卡只采用以下来源范围：《LangChain 解剖 agent harness：Agent = 模型 + harness》：原文说明模型与 Harness 共同后训练可能造成对特定工具逻辑的依赖，并把它明确称为过拟合；《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》：第二篇文章再次明确模型可能对原生 Harness 过拟合，并以跨 Harness 表现差异支撑其可检验性。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-overfitting.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-harness-overfitting]] —— 本案例用来说明「Harness 过拟合」
- [[CON-harness-overfitting_Harness 过拟合]]

## 备注

不要把假设场景当真实复盘引用。
