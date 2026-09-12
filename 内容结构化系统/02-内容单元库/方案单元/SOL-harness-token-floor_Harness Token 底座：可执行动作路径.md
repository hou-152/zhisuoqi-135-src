---
id: SOL-harness-token-floor
type: 方案单元
title: "Harness Token 底座：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "Harness Token 底座"
  - "Harness Token Floor"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Token 底座不是一次性启动费；在无服务端状态的调用中，它会被每次请求重发或缓存读取。"
solution_summary: "在 API 边界分别计算系统提示、工具定义、脚手架、历史和用户输入的 Token。"
action_steps:
  - "在 API 边界分别计算系统提示、工具定义、脚手架、历史和用户输入的 Token。"
  - "连续发出几条短请求，确认哪些固定内容每轮重发或以缓存形式读取。"
  - "删除未使用工具或下沉说明后复测窗口占用、费用和任务成功率。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-harness-token-floor
    note: "本方案是「Harness Token 底座」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Token 底座不是一次性启动费；在无服务端状态的调用中，它会被每次请求重发或缓存读取。

**动作路径（how_to，逐条照抄源数据）**
1. 在 API 边界分别计算系统提示、工具定义、脚手架、历史和用户输入的 Token。
2. 连续发出几条短请求，确认哪些固定内容每轮重发或以缓存形式读取。
3. 删除未使用工具或下沉说明后复测窗口占用、费用和任务成功率。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-token-floor.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-harness-token-floor]] —— 本方案是「Harness Token 底座」的落地动作
- [[CON-harness-token-floor_Harness Token 底座]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
