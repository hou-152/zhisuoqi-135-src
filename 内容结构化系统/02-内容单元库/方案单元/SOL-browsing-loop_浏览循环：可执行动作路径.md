---
id: SOL-browsing-loop
type: 方案单元
title: "浏览循环：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "浏览循环"
  - "Browsing Loop"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不是所有广泛探索；开放式规划任务可能确实需要先建立较宽的区域理解。"
solution_summary: "在搜索前写下要支持的决定、三个关键未知量和可接受的证据类型。"
action_steps:
  - "在搜索前写下要支持的决定、三个关键未知量和可接受的证据类型。"
  - "每轮浏览后只记录本轮减少了哪个未知量；没有减少就改变查询或停止扩张。"
  - "预先设定覆盖标准、时间预算和停止条件，到点输出证据缺口而不是继续漫游。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-browsing-loop
    note: "本方案是「浏览循环」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不是所有广泛探索；开放式规划任务可能确实需要先建立较宽的区域理解。

**动作路径（how_to，逐条照抄源数据）**
1. 在搜索前写下要支持的决定、三个关键未知量和可接受的证据类型。
2. 每轮浏览后只记录本轮减少了哪个未知量；没有减少就改变查询或停止扩张。
3. 预先设定覆盖标准、时间预算和停止条件，到点输出证据缺口而不是继续漫游。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/browsing-loop.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-browsing-loop]] —— 本方案是「浏览循环」的落地动作
- [[CON-browsing-loop_浏览循环]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
