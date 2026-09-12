---
id: SOL-restorable-compression
type: 方案单元
title: "可恢复压缩：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "可恢复压缩"
  - "Restorable Compression"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不同于把原文不可逆地浓缩成摘要；核心要求是仍存在可用回取路径。"
solution_summary: "把准备移出窗口的原文保存到稳定载体，并记录可校验的定位信息。"
action_steps:
  - "把准备移出窗口的原文保存到稳定载体，并记录可校验的定位信息。"
  - "在当前上下文留下内容摘要、移除原因、回取入口和何时需要恢复。"
  - "用一个空白会话实际按引用取回材料，核对权限、完整性和定位精度。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-restorable-compression
    note: "本方案是「可恢复压缩」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不同于把原文不可逆地浓缩成摘要；核心要求是仍存在可用回取路径。

**动作路径（how_to，逐条照抄源数据）**
1. 把准备移出窗口的原文保存到稳定载体，并记录可校验的定位信息。
2. 在当前上下文留下内容摘要、移除原因、回取入口和何时需要恢复。
3. 用一个空白会话实际按引用取回材料，核对权限、完整性和定位精度。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/restorable-compression.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-restorable-compression]] —— 本方案是「可恢复压缩」的落地动作
- [[CON-restorable-compression_可恢复压缩]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
