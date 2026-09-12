---
id: CAS-retrieval-reasoning-dual-task-load
type: 案例单元
title: "检索—推理双任务负担：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "检索—推理双任务负担"
  - "Retrieval–Reasoning Dual-Task Load"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "检索—推理双任务负担"
case_summary: "假设分析师让模型从整座合同库找违约条款并判断责任；另一组先由检索器给出三页相关条款，再让同一模型做相同判断，结果稳定性明显不同。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》：原文用 focused/full 对照把同一次调用中先检索、再推理的额外负担单独呈现。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-retrieval-reasoning-dual-task-load
    note: "本案例用来说明「检索—推理双任务负担」"
---

## 核心内容

**场景（假设场景）**：假设分析师让模型从整座合同库找违约条款并判断责任；另一组先由检索器给出三页相关条款，再让同一模型做相同判断，结果稳定性明显不同。

**来源里的真实依据**：本卡只采用以下来源范围：《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》：原文用 focused/full 对照把同一次调用中先检索、再推理的额外负担单独呈现。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/retrieval-reasoning-dual-task-load.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-retrieval-reasoning-dual-task-load]] —— 本案例用来说明「检索—推理双任务负担」
- [[CON-retrieval-reasoning-dual-task-load_检索—推理双任务负担]]

## 备注

不要把假设场景当真实复盘引用。
