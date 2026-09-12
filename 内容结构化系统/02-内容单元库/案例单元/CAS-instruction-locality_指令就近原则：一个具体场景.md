---
id: CAS-instruction-locality
type: 案例单元
title: "指令就近原则：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "指令就近原则"
  - "Instruction Locality"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "指令就近原则"
case_summary: "假设工具参数的使用限制既写在系统提示又写在工具描述，两处更新不同步；模型按旧的全局说明调用了已经变更的接口。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《Claude 5 世代的上下文工程，规则变了》：这段把工具专属说明从系统提示移到工具描述，给出“指令靠近作用对象”的具体放置方法；《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》：这段直接命名指令就近原则，并以系统提示与工具描述的去重说明其操作边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-instruction-locality
    note: "本案例用来说明「指令就近原则」"
---

## 核心内容

**场景（假设场景）**：假设工具参数的使用限制既写在系统提示又写在工具描述，两处更新不同步；模型按旧的全局说明调用了已经变更的接口。

**来源里的真实依据**：本卡只采用以下来源范围：《Claude 5 世代的上下文工程，规则变了》：这段把工具专属说明从系统提示移到工具描述，给出“指令靠近作用对象”的具体放置方法；《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》：这段直接命名指令就近原则，并以系统提示与工具描述的去重说明其操作边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/instruction-locality.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-instruction-locality]] —— 本案例用来说明「指令就近原则」
- [[CON-instruction-locality_指令就近原则]]

## 备注

不要把假设场景当真实复盘引用。
