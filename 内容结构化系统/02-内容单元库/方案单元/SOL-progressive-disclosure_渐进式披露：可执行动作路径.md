---
id: SOL-progressive-disclosure
type: 方案单元
title: "渐进式披露：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "渐进式披露"
  - "Progressive Disclosure"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Progressive Disclosure 管“先看到哪一层、需要时怎样继续展开”；Just-in-Time Retrieval 管“何时通过工具把数据取回上下文”。"
solution_summary: "在入口文件只放稳定地图、当前必读项和下一层链接，把详细规则交给明确命名的专题文档。"
action_steps:
  - "在入口文件只放稳定地图、当前必读项和下一层链接，把详细规则交给明确命名的专题文档。"
  - "让目录、文件名与摘要成为可利用的导航信号，并保证每层都说明何时需要继续深入。"
  - "用真实任务检查 Agent 能否在最少展开次数内找到关键细节；发现迷路时先修索引和命名。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-progressive-disclosure
    note: "本方案是「渐进式披露」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Progressive Disclosure 管“先看到哪一层、需要时怎样继续展开”；Just-in-Time Retrieval 管“何时通过工具把数据取回上下文”。

**动作路径（how_to，逐条照抄源数据）**
1. 在入口文件只放稳定地图、当前必读项和下一层链接，把详细规则交给明确命名的专题文档。
2. 让目录、文件名与摘要成为可利用的导航信号，并保证每层都说明何时需要继续深入。
3. 用真实任务检查 Agent 能否在最少展开次数内找到关键细节；发现迷路时先修索引和命名。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/progressive-disclosure.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-progressive-disclosure]] —— 本方案是「渐进式披露」的落地动作
- [[CON-progressive-disclosure_渐进式披露]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
