---
id: SOL-dynamic-context-assembly
type: 方案单元
title: "动态上下文装配：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "动态上下文装配"
  - "Dynamic Context Assembly"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：动态装配不等于 Context Selection；选择回答“取什么”，装配还要处理来源、时机、格式、顺序与本轮输入的组合。"
solution_summary: "先列出当前任务真正需要的信息与能力，再为每项明确来源、触发时机和呈现格式。"
action_steps:
  - "先列出当前任务真正需要的信息与能力，再为每项明确来源、触发时机和呈现格式。"
  - "检查最终模型输入，而不只检查上游资料是否存在；资料没被装进本轮 Context 就不会参与判断。"
  - "记录每次装配的来源和取舍，便于排查缺项、过载、旧状态与顺序问题。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-dynamic-context-assembly
    note: "本方案是「动态上下文装配」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：动态装配不等于 Context Selection；选择回答“取什么”，装配还要处理来源、时机、格式、顺序与本轮输入的组合。

**动作路径（how_to，逐条照抄源数据）**
1. 先列出当前任务真正需要的信息与能力，再为每项明确来源、触发时机和呈现格式。
2. 检查最终模型输入，而不只检查上游资料是否存在；资料没被装进本轮 Context 就不会参与判断。
3. 记录每次装配的来源和取舍，便于排查缺项、过载、旧状态与顺序问题。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/dynamic-context-assembly.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-dynamic-context-assembly]] —— 本方案是「动态上下文装配」的落地动作
- [[CON-dynamic-context-assembly_动态上下文装配]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
