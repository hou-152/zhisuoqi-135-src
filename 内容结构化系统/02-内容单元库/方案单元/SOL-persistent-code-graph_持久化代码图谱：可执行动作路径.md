---
id: SOL-persistent-code-graph
type: 方案单元
title: "持久化代码图谱：可执行动作路径"
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
target_problem: "避免这个误区：它不是一次任务临时生成的代码摘要，也不等同于只按文本相似度检索代码片段。"
solution_summary: "定义要持久化的代码实体、关系类型、版本标识和来源位置。"
action_steps:
  - "定义要持久化的代码实体、关系类型、版本标识和来源位置。"
  - "在提交或索引变更时增量更新，并检测删除、重命名和解析失败。"
  - "用已知调用链和动态依赖抽样核对图谱，过期或低覆盖区域明确降级为未知。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-persistent-code-graph
    note: "本方案是「持久化代码图谱」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不是一次任务临时生成的代码摘要，也不等同于只按文本相似度检索代码片段。

**动作路径（how_to，逐条照抄源数据）**
1. 定义要持久化的代码实体、关系类型、版本标识和来源位置。
2. 在提交或索引变更时增量更新，并检测删除、重命名和解析失败。
3. 用已知调用链和动态依赖抽样核对图谱，过期或低覆盖区域明确降级为未知。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/persistent-code-graph.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-persistent-code-graph]] —— 本方案是「持久化代码图谱」的落地动作
- [[CON-persistent-code-graph_持久化代码图谱]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
