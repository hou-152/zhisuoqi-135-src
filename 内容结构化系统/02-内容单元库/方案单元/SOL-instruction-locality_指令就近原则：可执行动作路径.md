---
id: SOL-instruction-locality
type: 方案单元
title: "指令就近原则：可执行动作路径"
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
target_problem: "避免这个误区：它回答指令应放在哪里，不回答信息应在何时加载，因此不等同于渐进式披露。"
solution_summary: "为每条指令标出它直接约束的对象、维护者和生效位置。"
action_steps:
  - "为每条指令标出它直接约束的对象、维护者和生效位置。"
  - "把对象专属说明移动到工具描述、目录规则或接口旁，删除上层重复副本。"
  - "修改一次对象规则并追踪所有读取路径，确认不存在陈旧镜像。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-instruction-locality
    note: "本方案是「指令就近原则」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它回答指令应放在哪里，不回答信息应在何时加载，因此不等同于渐进式披露。

**动作路径（how_to，逐条照抄源数据）**
1. 为每条指令标出它直接约束的对象、维护者和生效位置。
2. 把对象专属说明移动到工具描述、目录规则或接口旁，删除上层重复副本。
3. 修改一次对象规则并追踪所有读取路径，确认不存在陈旧镜像。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/instruction-locality.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-instruction-locality]] —— 本方案是「指令就近原则」的落地动作
- [[CON-instruction-locality_指令就近原则]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
