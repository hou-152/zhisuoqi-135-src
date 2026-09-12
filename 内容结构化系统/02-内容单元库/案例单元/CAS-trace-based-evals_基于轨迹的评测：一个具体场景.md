---
id: CAS-trace-based-evals
type: 案例单元
title: "基于轨迹的评测：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "基于轨迹的评测"
  - "Trace-based Evals"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "基于轨迹的评测"
case_summary: "团队想知道新版 Skill 是否更可靠，于是让旧版与新版分别完成同一批有边界的任务，保留每次工具轨迹，用相同的确定性 verifier 与人工抽查比较成功率、无效步骤和失败类型，而不是凭一次成功下结论。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Awesome Harness Engineering 汇集的 eval 资源强调把 Agent traces 转成 JSONL，配合 bounded tasks、deterministic verifiers、no-skill baselines 和 trajectory review；同时需控制运行环境噪声。本站因此将其放在深入研究层。"
relationships:
  - type: 解释
    target: CON-trace-based-evals
    note: "本案例用来说明「基于轨迹的评测」"
---

## 核心内容

**场景（假设场景）**：团队想知道新版 Skill 是否更可靠，于是让旧版与新版分别完成同一批有边界的任务，保留每次工具轨迹，用相同的确定性 verifier 与人工抽查比较成功率、无效步骤和失败类型，而不是凭一次成功下结论。

**来源里的真实依据**：Awesome Harness Engineering 汇集的 eval 资源强调把 Agent traces 转成 JSONL，配合 bounded tasks、deterministic verifiers、no-skill baselines 和 trajectory review；同时需控制运行环境噪声。本站因此将其放在深入研究层。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/trace-based-evals.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-trace-based-evals]] —— 本案例用来说明「基于轨迹的评测」
- [[CON-trace-based-evals_基于轨迹的评测]]

## 备注

不要把假设场景当真实复盘引用。
