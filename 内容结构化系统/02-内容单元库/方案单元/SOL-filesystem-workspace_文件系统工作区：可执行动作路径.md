---
id: SOL-filesystem-workspace
type: 方案单元
title: "文件系统工作区：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "文件系统工作区"
  - "Filesystem Workspace"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：文件系统是稳定载体，不等于 Memory 或 State Management；后两者描述保存与恢复哪些信息的职责。"
solution_summary: "规划输入、生成物、临时文件和回执的目录边界与命名规则。"
action_steps:
  - "规划输入、生成物、临时文件和回执的目录边界与命名规则。"
  - "对写入采用可审查格式和原子更新，记录来源、状态与恢复入口。"
  - "在新会话中只读取工作区尝试续做，并独立检查权限和沙箱边界。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-filesystem-workspace
    note: "本方案是「文件系统工作区」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：文件系统是稳定载体，不等于 Memory 或 State Management；后两者描述保存与恢复哪些信息的职责。

**动作路径（how_to，逐条照抄源数据）**
1. 规划输入、生成物、临时文件和回执的目录边界与命名规则。
2. 对写入采用可审查格式和原子更新，记录来源、状态与恢复入口。
3. 在新会话中只读取工作区尝试续做，并独立检查权限和沙箱边界。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/filesystem-workspace.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-filesystem-workspace]] —— 本方案是「文件系统工作区」的落地动作
- [[CON-filesystem-workspace_文件系统工作区]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
