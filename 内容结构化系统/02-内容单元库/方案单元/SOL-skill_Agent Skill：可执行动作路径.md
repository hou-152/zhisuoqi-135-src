---
id: SOL-skill
type: 方案单元
title: "Agent Skill：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent Skill"
  - "Agent Skill"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Skill 沉淀的是可复用方法与任务上下文，不是可直接执行外部动作的 Tool。"
solution_summary: "把稳定、重复、可检查的做法写进 Skill，并明确什么时候用、输入是什么、步骤怎样走、什么算完成。"
action_steps:
  - "把稳定、重复、可检查的做法写进 Skill，并明确什么时候用、输入是什么、步骤怎样走、什么算完成。"
  - "保持 Skill 边界单一；需要外部行动时显式说明依赖哪些 Tool 与权限。"
  - "用一个全新任务验证 Skill 是否真的被发现、加载并按预期执行，不以文件存在代替运行证据。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-skill
    note: "本方案是「Agent Skill」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Skill 沉淀的是可复用方法与任务上下文，不是可直接执行外部动作的 Tool。

**动作路径（how_to，逐条照抄源数据）**
1. 把稳定、重复、可检查的做法写进 Skill，并明确什么时候用、输入是什么、步骤怎样走、什么算完成。
2. 保持 Skill 边界单一；需要外部行动时显式说明依赖哪些 Tool 与权限。
3. 用一个全新任务验证 Skill 是否真的被发现、加载并按预期执行，不以文件存在代替运行证据。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/skill.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-skill]] —— 本方案是「Agent Skill」的落地动作
- [[CON-skill_Agent Skill]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
