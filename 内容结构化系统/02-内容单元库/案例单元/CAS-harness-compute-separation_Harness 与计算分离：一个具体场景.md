---
id: CAS-harness-compute-separation
type: 案例单元
title: "Harness 与计算分离：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Harness 与计算分离"
  - "Harness-Compute Separation"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "Harness 与计算分离"
case_summary: "假设控制层保存任务状态和云端凭据，模型生成的代码只在可销毁沙箱中运行；沙箱崩溃后重建，任务仍能从控制层恢复。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》：这段直接给出控制层与执行层分离的架构做法及其凭据隔离目的；《Harness engineering：把 agent 能力落到工具、约束和循环里》：这段从 runtime 与 Harness 的职责区分补充执行环境和可靠工作循环不能混为一层的证据。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-harness-compute-separation
    note: "本案例用来说明「Harness 与计算分离」"
---

## 核心内容

**场景（假设场景）**：假设控制层保存任务状态和云端凭据，模型生成的代码只在可销毁沙箱中运行；沙箱崩溃后重建，任务仍能从控制层恢复。

**来源里的真实依据**：本卡只采用以下来源范围：《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》：这段直接给出控制层与执行层分离的架构做法及其凭据隔离目的；《Harness engineering：把 agent 能力落到工具、约束和循环里》：这段从 runtime 与 Harness 的职责区分补充执行环境和可靠工作循环不能混为一层的证据。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-compute-separation.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-harness-compute-separation]] —— 本案例用来说明「Harness 与计算分离」
- [[CON-harness-compute-separation_Harness 与计算分离]]

## 备注

不要把假设场景当真实复盘引用。
