---
id: CAS-persistent-code-graph
type: 案例单元
title: "持久化代码图谱：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "持久化代码图谱"
  - "Persistent Code Graph"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "持久化代码图谱"
case_summary: "假设 Agent 第二天再次分析仓库时，不必重读所有文件，而是查询昨天已建立并按新提交更新的调用与测试关系图。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "本卡只采用以下来源范围：《用持久化代码图谱给 AI Review 精准上下文》：逐字定义持久化代码图谱所映射的代码实体与关系，并说明它可跨任务查询和增量更新。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。"
relationships:
  - type: 解释
    target: CON-persistent-code-graph
    note: "本案例用来说明「持久化代码图谱」"
---

## 核心内容

**场景（假设场景）**：假设 Agent 第二天再次分析仓库时，不必重读所有文件，而是查询昨天已建立并按新提交更新的调用与测试关系图。

**来源里的真实依据**：本卡只采用以下来源范围：《用持久化代码图谱给 AI Review 精准上下文》：逐字定义持久化代码图谱所映射的代码实体与关系，并说明它可跨任务查询和增量更新。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/persistent-code-graph.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-persistent-code-graph]] —— 本案例用来说明「持久化代码图谱」
- [[CON-persistent-code-graph_持久化代码图谱]]

## 备注

不要把假设场景当真实复盘引用。
