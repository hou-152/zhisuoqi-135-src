---
id: SOL-repository-source-of-truth
type: 方案单元
title: "仓库事实真源：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "仓库事实真源"
  - "Repository as Source of Truth"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不表示所有组织知识都必须进入仓库，只要求运行所依赖的事实不能仅存在于口头、个人脑中或不可定位的聊天记录。"
solution_summary: "把运行必需的规则、范围、状态和验收入口放入版本化、可定位的文件。"
action_steps:
  - "把运行必需的规则、范围、状态和验收入口放入版本化、可定位的文件。"
  - "声明权威顺序、维护者和过期处理，避免多份文档无声冲突。"
  - "从空白会话仅依赖仓库执行一次任务，记录仍需口头补充的事实并决定是否纳入。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-repository-source-of-truth
    note: "本方案是「仓库事实真源」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不表示所有组织知识都必须进入仓库，只要求运行所依赖的事实不能仅存在于口头、个人脑中或不可定位的聊天记录。

**动作路径（how_to，逐条照抄源数据）**
1. 把运行必需的规则、范围、状态和验收入口放入版本化、可定位的文件。
2. 声明权威顺序、维护者和过期处理，避免多份文档无声冲突。
3. 从空白会话仅依赖仓库执行一次任务，记录仍需口头补充的事实并决定是否纳入。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/repository-source-of-truth.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-repository-source-of-truth]] —— 本方案是「仓库事实真源」的落地动作
- [[CON-repository-source-of-truth_仓库事实真源]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
