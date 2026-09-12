---
id: SOL-just-in-time-retrieval
type: 方案单元
title: "即时检索：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "即时检索"
  - "Just-in-Time Retrieval"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：即时检索不等于把所有可能相关资料预先塞进 Context；关键差别是按任务进展触发取回。"
solution_summary: "在 Context 中保留稳定且轻量的文件路径、查询、网页链接或记录 ID，而不是完整对象。"
action_steps:
  - "在 Context 中保留稳定且轻量的文件路径、查询、网页链接或记录 ID，而不是完整对象。"
  - "为 Agent 提供范围可控、返回精简的搜索和局部读取工具，并明确何时应该继续深入。"
  - "检查被取回内容是否真的与当前步骤相关，同时记录延迟、漏检和 Context 消耗。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-just-in-time-retrieval
    note: "本方案是「即时检索」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：即时检索不等于把所有可能相关资料预先塞进 Context；关键差别是按任务进展触发取回。

**动作路径（how_to，逐条照抄源数据）**
1. 在 Context 中保留稳定且轻量的文件路径、查询、网页链接或记录 ID，而不是完整对象。
2. 为 Agent 提供范围可控、返回精简的搜索和局部读取工具，并明确何时应该继续深入。
3. 检查被取回内容是否真的与当前步骤相关，同时记录延迟、漏检和 Context 消耗。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/just-in-time-retrieval.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-just-in-time-retrieval]] —— 本方案是「即时检索」的落地动作
- [[CON-just-in-time-retrieval_即时检索]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
