---
id: CAS-multi-step-reliability-decay
type: 案例单元
title: "多步可靠性衰减：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "多步可靠性衰减"
  - "Multi-Step Reliability Decay"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "多步可靠性衰减"
case_summary: "假设五步流程每步单测都约九成九成功，端到端运行仍偶发失败；加入相关故障和重试后，简单相乘已无法描述真实可靠性。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《一个被 harness 套住的 LLM agent：这个词到底指什么》：这段用连续步骤成功率的乘积说明微小单步失败会在长流程中累积为显著端到端损失。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-multi-step-reliability-decay
    note: "本案例用来说明「多步可靠性衰减」"
---

## 核心内容

**场景（假设场景）**：假设五步流程每步单测都约九成九成功，端到端运行仍偶发失败；加入相关故障和重试后，简单相乘已无法描述真实可靠性。

**来源里的真实依据**：本卡只采用以下来源范围：《一个被 harness 套住的 LLM agent：这个词到底指什么》：这段用连续步骤成功率的乘积说明微小单步失败会在长流程中累积为显著端到端损失。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/multi-step-reliability-decay.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-multi-step-reliability-decay]] —— 本案例用来说明「多步可靠性衰减」
- [[CON-multi-step-reliability-decay_多步可靠性衰减]]

## 备注

不要把假设场景当真实复盘引用。
