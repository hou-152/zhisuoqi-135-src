---
id: CAS-change-impact-analysis
type: 案例单元
title: "变更影响分析：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "变更影响分析"
  - "Change Impact Analysis"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "变更影响分析"
case_summary: "假设开发者修改鉴权函数，文件本身测试通过，但调用它的批处理任务和权限回归测试没有被运行，发布后才暴露连锁影响。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《用持久化代码图谱给 AI Review 精准上下文》：逐字定义 Blast Radius 为一次改动影响到的函数、类、文件和测试范围，可支撑变更影响分析候选。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-change-impact-analysis
    note: "本案例用来说明「变更影响分析」"
---

## 核心内容

**场景（假设场景）**：假设开发者修改鉴权函数，文件本身测试通过，但调用它的批处理任务和权限回归测试没有被运行，发布后才暴露连锁影响。

**来源里的真实依据**：本卡只采用以下来源范围：《用持久化代码图谱给 AI Review 精准上下文》：逐字定义 Blast Radius 为一次改动影响到的函数、类、文件和测试范围，可支撑变更影响分析候选。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/change-impact-analysis.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-change-impact-analysis]] —— 本案例用来说明「变更影响分析」
- [[CON-change-impact-analysis_变更影响分析]]

## 备注

不要把假设场景当真实复盘引用。
