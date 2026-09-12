---
id: SOL-runnable-evidence
type: 方案单元
title: "可运行证据：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "可运行证据"
  - "Runnable Evidence"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：它不同于 Agent 对结果的文字总结或自信声明。"
solution_summary: "把每项完成声明转换成别人可执行的命令、输入、预期结果和失败信号。"
action_steps:
  - "把每项完成声明转换成别人可执行的命令、输入、预期结果和失败信号。"
  - "在干净或独立环境重跑，保存版本、退出码和必要产物而非只截一张绿图。"
  - "检查证据覆盖范围，把机器未验证的用户价值和发布判断继续标为未知。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-runnable-evidence
    note: "本方案是「可运行证据」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不同于 Agent 对结果的文字总结或自信声明。

**动作路径（how_to，逐条照抄源数据）**
1. 把每项完成声明转换成别人可执行的命令、输入、预期结果和失败信号。
2. 在干净或独立环境重跑，保存版本、退出码和必要产物而非只截一张绿图。
3. 检查证据覆盖范围，把机器未验证的用户价值和发布判断继续标为未知。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/runnable-evidence.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-runnable-evidence]] —— 本方案是「可运行证据」的落地动作
- [[CON-runnable-evidence_可运行证据]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
