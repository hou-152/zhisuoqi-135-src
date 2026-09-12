---
id: CAS-restorable-compression
type: 案例单元
title: "可恢复压缩：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "可恢复压缩"
  - "Restorable Compression"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "可恢复压缩"
case_summary: "假设一次排障产生了两万行日志；当前会话只保留故障结论、日志文件路径、时间区间和 Hash，需要复核时再取回原片段。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Manus 的上下文工程实战：几轮重写换来的一组局部最优》：原文明确给出压缩后保留 URL 或路径、使被省略内容仍可回取的可恢复性原则。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-restorable-compression
    note: "本案例用来说明「可恢复压缩」"
---

## 核心内容

**场景（假设场景）**：假设一次排障产生了两万行日志；当前会话只保留故障结论、日志文件路径、时间区间和 Hash，需要复核时再取回原片段。

**来源里的真实依据**：本卡只采用以下来源范围：《Manus 的上下文工程实战：几轮重写换来的一组局部最优》：原文明确给出压缩后保留 URL 或路径、使被省略内容仍可回取的可恢复性原则。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/restorable-compression.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-restorable-compression]] —— 本案例用来说明「可恢复压缩」
- [[CON-restorable-compression_可恢复压缩]]

## 备注

不要把假设场景当真实复盘引用。
